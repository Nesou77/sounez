/**
 * Pure Node.js PDF → DOCX converter.
 *
 * Uses pdf-parse to extract text and docx to build the Word document.
 * No system binaries required — works on any Node.js runtime including Render free tier.
 *
 * Formatting preserved:
 *   - H1 / H2 / H3 headings (ALL-CAPS, numbered, title-case heuristics)
 *   - Bullet and numbered lists
 *   - Bold / italic inline runs (detected via surrounding markers)
 *   - Table-like rows (tab or multi-space separated columns)
 *   - Page breaks (separator lines)
 *   - Paragraph spacing and indentation
 *   - Font: Calibri 11pt body, larger for headings
 *
 * Limitations:
 *   - Scanned / image-only PDFs: no text extracted (OCR not available)
 *   - Complex multi-column layouts are linearised to single-column
 *   - Embedded images are not extracted
 */

import pdfParse from "pdf-parse";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageBreak,
  SectionType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  LevelFormat,
  convertInchesToTwip,
} from "docx";

export type ConvertOptions = {
  preserveLayout: boolean;
  useOcr: boolean;
};

export type ConvertResult =
  | { ok: true; buffer: Buffer; pageCount: number }
  | {
      ok: false;
      reason: "encrypted" | "corrupt" | "no_text" | "unknown";
      message: string;
    };

// ── Heading detection ─────────────────────────────────────────────────────────

type HeadingMatch = { level: 1 | 2 | 3 } | null;

function detectHeading(line: string): HeadingMatch {
  const t = line.trim();
  if (!t || t.length > 120) return null;

  // ALL-CAPS short line (e.g. "INTRODUCTION", "CHAPTER 1")
  if (
    t === t.toUpperCase() &&
    t.length >= 3 &&
    t.length <= 60 &&
    /[A-Z]/.test(t) &&
    !/[.!?,;]$/.test(t)
  ) {
    return { level: 1 };
  }

  // Numbered section: "1. Title" or "1.1 Title" or "1.1.1 Title"
  if (/^\d+\.\s+[A-Z\u00C0-\u024F]/.test(t) && t.length <= 100 && !/[.!?]$/.test(t)) {
    return { level: 2 };
  }
  if (/^\d+\.\d+[\s.]+[A-Z\u00C0-\u024F]/.test(t) && t.length <= 100 && !/[.!?]$/.test(t)) {
    return { level: 3 };
  }

  // Title Case: short line, most words capitalised, no trailing punctuation
  const words = t.split(/\s+/);
  if (words.length >= 2 && words.length <= 10 && t.length <= 80 && !/[.!?,;]$/.test(t)) {
    const capCount = words.filter(
      (w) => w.length > 0 && /^[A-Z\u00C0-\u024F]/.test(w),
    ).length;
    const shortWords = words.filter((w) => w.length <= 3).length;
    if ((capCount - shortWords) / Math.max(1, words.length - shortWords) >= 0.7) {
      return { level: 2 };
    }
  }

  return null;
}

// ── Bullet / list detection ───────────────────────────────────────────────────

function isBulletLine(line: string): boolean {
  return /^[\s]*[-•*·▪▸►◆○●‣⁃]\s+/.test(line);
}

function isNumberedListLine(line: string): boolean {
  return /^[\s]*\d+[.)]\s+/.test(line);
}

function stripListPrefix(line: string): string {
  return line
    .replace(/^[\s]*[-•*·▪▸►◆○●‣⁃]\s+/, "")
    .replace(/^[\s]*\d+[.)]\s+/, "")
    .trim();
}

// ── Separator / page-break detection ─────────────────────────────────────────

function isSeparatorLine(line: string): boolean {
  return /^\s*[-=_*~]{3,}\s*$/.test(line);
}

// ── Inline bold/italic detection ──────────────────────────────────────────────
// Handles **bold**, *italic*, __bold__, _italic_ markers

type InlineRun = { text: string; bold: boolean; italic: boolean };

function parseInlineRuns(text: string): InlineRun[] {
  const runs: InlineRun[] = [];
  // Simple state-machine for **bold**, *italic*, __bold__, _italic_
  const re = /(\*\*|__|\*|_)(.*?)\1/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      runs.push({ text: text.slice(lastIndex, match.index), bold: false, italic: false });
    }
    const marker = match[1];
    const inner = match[2];
    const bold = marker === "**" || marker === "__";
    const italic = marker === "*" || marker === "_";
    runs.push({ text: inner, bold, italic });
    lastIndex = re.lastIndex;
  }

  if (lastIndex < text.length) {
    runs.push({ text: text.slice(lastIndex), bold: false, italic: false });
  }

  return runs.filter((r) => r.text.length > 0);
}

function makeTextRuns(text: string, baseSize = 22): TextRun[] {
  const runs = parseInlineRuns(text);
  if (runs.length === 1 && !runs[0].bold && !runs[0].italic) {
    return [new TextRun({ text: runs[0].text, size: baseSize, font: "Calibri" })];
  }
  return runs.map(
    (r) =>
      new TextRun({
        text: r.text,
        bold: r.bold,
        italics: r.italic,
        size: baseSize,
        font: "Calibri",
      }),
  );
}

// ── Table detection ───────────────────────────────────────────────────────────
// Consecutive lines that look like table rows (tab-separated or aligned columns)

function looksLikeTableRow(line: string): boolean {
  return line.includes("\t") || /\S {3,}\S/.test(line);
}

function splitTableRow(line: string): string[] {
  if (line.includes("\t")) {
    return line.split("\t").map((c) => c.trim()).filter(Boolean);
  }
  return line.split(/\s{3,}/).map((c) => c.trim()).filter(Boolean);
}

function buildTable(rows: string[][]): Table {
  const colCount = Math.max(...rows.map((r) => r.length));
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows.map(
      (cells, ri) =>
        new TableRow({
          tableHeader: ri === 0,
          children: Array.from({ length: colCount }, (_, ci) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: makeTextRuns(cells[ci] ?? "", 20),
                  spacing: { after: 60 },
                }),
              ],
              borders: {
                top: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
                bottom: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
                left: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
                right: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
              },
              shading: ri === 0 ? { fill: "F2F2F2" } : undefined,
            }),
          ),
        }),
    ),
  });
}

// ── Main paragraph builder ────────────────────────────────────────────────────

type DocChild = Paragraph | Table;

function buildDocChildren(text: string, preserveLayout: boolean): DocChild[] {
  const lines = text.split("\n");
  const children: DocChild[] = [];

  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const trimmed = raw.trim();

    // ── Blank line ──────────────────────────────────────────────────────────
    if (!trimmed) {
      i++;
      continue;
    }

    // ── Separator / page break ──────────────────────────────────────────────
    if (isSeparatorLine(raw)) {
      if (preserveLayout) {
        children.push(new Paragraph({ children: [new PageBreak()] }));
      }
      i++;
      continue;
    }

    // ── Heading ─────────────────────────────────────────────────────────────
    const headingMatch = detectHeading(trimmed);
    if (headingMatch) {
      const levelMap: Record<1 | 2 | 3, (typeof HeadingLevel)[keyof typeof HeadingLevel]> = {
        1: HeadingLevel.HEADING_1,
        2: HeadingLevel.HEADING_2,
        3: HeadingLevel.HEADING_3,
      };
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed,
              bold: true,
              size: headingMatch.level === 1 ? 32 : headingMatch.level === 2 ? 28 : 24,
              font: "Calibri",
            }),
          ],
          heading: levelMap[headingMatch.level],
          spacing: { before: headingMatch.level === 1 ? 360 : 240, after: 120 },
        }),
      );
      i++;
      continue;
    }

    // ── Table block ─────────────────────────────────────────────────────────
    if (looksLikeTableRow(raw) && splitTableRow(raw).length >= 2) {
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i].trim() && looksLikeTableRow(lines[i])) {
        const cells = splitTableRow(lines[i]);
        if (cells.length >= 2) tableRows.push(cells);
        else break;
        i++;
      }
      if (tableRows.length >= 1) {
        children.push(buildTable(tableRows));
        // Add spacing after table
        children.push(new Paragraph({ children: [], spacing: { after: 120 } }));
        continue;
      }
    }

    // ── Bullet list ─────────────────────────────────────────────────────────
    if (isBulletLine(raw)) {
      while (i < lines.length) {
        const l = lines[i];
        if (!l.trim()) { i++; break; }
        if (isBulletLine(l)) {
          children.push(
            new Paragraph({
              children: makeTextRuns(stripListPrefix(l)),
              bullet: { level: 0 },
              spacing: { after: 80 },
              indent: { left: convertInchesToTwip(0.25) },
            }),
          );
          i++;
        } else if (detectHeading(l.trim()) || isSeparatorLine(l)) {
          break;
        } else {
          // Continuation of previous bullet
          const last = children[children.length - 1];
          if (last instanceof Paragraph) {
            // Append to last bullet — just add a new bullet for the continuation
            children.push(
              new Paragraph({
                children: makeTextRuns(l.trim()),
                bullet: { level: 0 },
                spacing: { after: 80 },
                indent: { left: convertInchesToTwip(0.25) },
              }),
            );
          }
          i++;
        }
      }
      continue;
    }

    // ── Numbered list ───────────────────────────────────────────────────────
    if (isNumberedListLine(raw)) {
      let listNum = 1;
      while (i < lines.length) {
        const l = lines[i];
        if (!l.trim()) { i++; break; }
        if (isNumberedListLine(l)) {
          children.push(
            new Paragraph({
              children: makeTextRuns(stripListPrefix(l)),
              numbering: { reference: "default-numbering", level: 0 },
              spacing: { after: 80 },
              indent: { left: convertInchesToTwip(0.25) },
            }),
          );
          listNum++;
          i++;
        } else if (detectHeading(l.trim()) || isSeparatorLine(l)) {
          break;
        } else {
          i++;
        }
      }
      void listNum;
      continue;
    }

    // ── Regular paragraph ───────────────────────────────────────────────────
    const paraLines: string[] = [];
    while (i < lines.length) {
      const l = lines[i];
      const lt = l.trim();
      if (!lt) { i++; break; }
      if (detectHeading(lt) || isSeparatorLine(l) || isBulletLine(l) || isNumberedListLine(l)) break;
      if (looksLikeTableRow(l) && splitTableRow(l).length >= 2) break;
      paraLines.push(lt);
      i++;
    }

    const paraText = paraLines.join(" ").trim();
    if (paraText) {
      children.push(
        new Paragraph({
          children: makeTextRuns(paraText),
          spacing: { after: 160 },
          alignment: AlignmentType.LEFT,
        }),
      );
    }
  }

  return children;
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function convertPdfToDocx(
  pdfBuffer: Buffer,
  options: ConvertOptions,
): Promise<ConvertResult> {
  let parsed: { text: string; numpages: number; info: Record<string, unknown> };

  try {
    parsed = await pdfParse(pdfBuffer);
  } catch (err) {
    const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
    if (msg.includes("encrypt") || msg.includes("password")) {
      return {
        ok: false,
        reason: "encrypted",
        message: "This PDF is password-protected. Please unlock it and try again.",
      };
    }
    console.error("[pdf-converter] parse error:", msg);
    return {
      ok: false,
      reason: "corrupt",
      message: "We could not read this PDF. Please check the file and try again.",
    };
  }

  const { text, numpages, info } = parsed;

  if (!text || text.trim().length < 10) {
    return {
      ok: false,
      reason: "no_text",
      message:
        "No text could be extracted from this PDF. It may be a scanned document. " +
        "For scanned PDFs, please use a dedicated OCR tool before converting.",
    };
  }

  const title =
    typeof info?.Title === "string" && info.Title ? info.Title : "Converted Document";

  const docChildren = buildDocChildren(text, options.preserveLayout);

  const doc = new Document({
    creator: "Sounez PDF to Word Converter",
    title,
    description: `Converted from PDF — ${numpages} page${numpages !== 1 ? "s" : ""}`,
    numbering: {
      config: [
        {
          reference: "default-numbering",
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: "%1.",
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: {
                    left: convertInchesToTwip(0.25),
                    hanging: convertInchesToTwip(0.25),
                  },
                },
              },
            },
          ],
        },
      ],
    },
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 22 }, // 11pt
        },
      },
    },
    sections: [
      {
        properties: { type: SectionType.CONTINUOUS },
        children:
          docChildren.length > 0
            ? docChildren
            : [new Paragraph({ children: [new TextRun({ text: "" })] })],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return { ok: true, buffer, pageCount: numpages };
}
