/**
 * Pure Node.js PDF → DOCX converter.
 *
 * Uses pdf-parse to extract text and docx to build the Word document.
 * No system binaries required — works on any Node.js runtime including Render free tier.
 *
 * Formatting preserved:
 *   - H1 / H2 / H3 headings (ALL-CAPS, numbered, strict title-case heuristics)
 *   - Bullet and numbered lists
 *   - Bold / italic inline runs (detected via surrounding markers)
 *   - Tables: pipe-delimited (|col|col|), tab-delimited, and space-aligned
 *     — multi-line confirmation prevents false positives on normal paragraph text
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

// ── Text pre-processing ───────────────────────────────────────────────────────
// Normalise common PDF extraction artifacts before any structural analysis.

function preprocessText(raw: string): string {
  return (
    raw
      // Non-breaking spaces → regular space
      .replace(/ /g, " ")
      // Soft hyphens → nothing (invisible formatting character)
      .replace(/­/g, "")
      // PDF hyphenation: "word-\nword" at line wrap → rejoin as "wordword"
      // Only applies when the char before hyphen is a letter and after newline is lowercase
      .replace(/-\n([a-z])/g, "$1")
      // Collapse 4+ consecutive blank lines to 2
      .replace(/\n{4,}/g, "\n\n\n")
      // Trim trailing whitespace from every line
      .split("\n")
      .map((l) => l.trimEnd())
      .join("\n")
  );
}

// ── Heading detection ─────────────────────────────────────────────────────────

type HeadingMatch = { level: 1 | 2 | 3 } | null;

// Short words that are NOT capitalised in standard title case
const TITLE_CONNECTORS = new Set([
  "a", "an", "the", "and", "or", "but", "for", "nor", "so", "yet",
  "at", "by", "in", "of", "on", "to", "up", "as", "is", "are", "via",
]);

function detectHeading(line: string): HeadingMatch {
  const t = line.trim();
  if (!t || t.length > 120) return null;

  // ALL-CAPS short line (e.g. "INTRODUCTION", "CHAPTER 1")
  if (
    t === t.toUpperCase() &&
    t.length >= 3 &&
    t.length <= 60 &&
    /[A-Z]/.test(t) &&
    !/[.!?,;]$/.test(t) &&
    // Must contain at least one actual letter (not just punctuation/numbers)
    /[A-Z]{2,}/.test(t)
  ) {
    return { level: 1 };
  }

  // Numbered section: "1. Title" or "1.1 Title"
  if (/^\d+\.\s+[A-ZÀ-ɏ]/.test(t) && t.length <= 100 && !/[.!?]$/.test(t)) {
    return { level: 2 };
  }
  if (/^\d+\.\d+[\s.]+[A-ZÀ-ɏ]/.test(t) && t.length <= 100 && !/[.!?]$/.test(t)) {
    return { level: 3 };
  }

  // Strict Title Case: short line, nearly ALL meaningful words start with a capital,
  // no trailing punctuation. Threshold raised to 0.9 to avoid false positives on
  // normal sentence-case paragraph starts.
  const words = t.split(/\s+/);
  if (words.length >= 2 && words.length <= 8 && t.length <= 70 && !/[.!?,;]$/.test(t)) {
    const significant = words.filter(
      (w) => w.length > 0 && !TITLE_CONNECTORS.has(w.toLowerCase()),
    );
    const capSig = significant.filter((w) => /^[A-ZÀ-ɏ]/.test(w));
    // Require at least 2 significant words AND 90 % of them capitalized
    if (significant.length >= 2 && capSig.length / significant.length >= 0.9) {
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

type InlineRun = { text: string; bold: boolean; italic: boolean };

function parseInlineRuns(text: string): InlineRun[] {
  const runs: InlineRun[] = [];
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
//
// Three table formats are detected, in priority order:
//   1. Pipe  — "| col1 | col2 | col3 |"  (most reliable — explicit delimiters)
//   2. Tab   — "col1\tcol2\tcol3"         (reliable — tabs rarely appear in prose)
//   3. Space — "col1    col2    col3"      (conservative — require 4+ spaces AND
//                                           multi-line confirmation to avoid false
//                                           positives on normal paragraph text)
//
// Multi-line confirmation: we only start a table block if the CURRENT line AND
// at least one of the next two non-blank lines share the same format. A single
// line that looks like a table row is almost always just prose.

type TableFormat = "pipe" | "tab" | "space";

// ── Pipe table ────────────────────────────────────────────────────────────────

function looksLikePipeRow(line: string): boolean {
  const t = line.trim();
  // Need at least two pipe characters with non-pipe content between them
  return (t.match(/\|/g) ?? []).length >= 2 && /\|[^|]+\|/.test(t);
}

function isPipeRowSeparator(line: string): boolean {
  // Matches "| --- | :--- | ---: |" style separator rows in GFM-style tables
  return /^\|?[\s:]*-{1,}[\s:]*(\|[\s:]*-+[\s:]*)+\|?$/.test(line.trim());
}

function splitPipeRow(line: string): string[] {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|")) s = s.slice(0, -1);
  return s.split("|").map((c) => c.trim()).filter(Boolean);
}

// ── Tab table ─────────────────────────────────────────────────────────────────

function looksLikeTabRow(line: string): boolean {
  return line.includes("\t") && line.split("\t").filter((s) => s.trim()).length >= 2;
}

function splitTabRow(line: string): string[] {
  return line.split("\t").map((c) => c.trim()).filter(Boolean);
}

// ── Space-aligned table ───────────────────────────────────────────────────────
// Require ≥ 4 spaces between non-empty tokens AND at least 2 columns.
// This is stricter than the previous 3-space threshold to cut false positives.

function looksLikeSpaceRow(line: string): boolean {
  const t = line.trim();
  if (!t || t.length > 300) return false;
  const cols = t.split(/\s{4,}/).map((c) => c.trim()).filter(Boolean);
  return cols.length >= 2;
}

function splitSpaceRow(line: string): string[] {
  return line.trim().split(/\s{4,}/).map((c) => c.trim()).filter(Boolean);
}

// ── Format detector ───────────────────────────────────────────────────────────

function detectLineTableFormat(line: string): TableFormat | null {
  if (looksLikePipeRow(line)) return "pipe";
  if (looksLikeTabRow(line)) return "tab";
  if (looksLikeSpaceRow(line)) return "space";
  return null;
}

/**
 * Look-ahead: return the table format only if the current line AND at least one
 * of the next two non-blank lines agree on the same format. This prevents a
 * single "table-like" line from being pulled out of a paragraph.
 */
function peekTableFormat(lines: string[], startIdx: number): TableFormat | null {
  const fmt = detectLineTableFormat(lines[startIdx]);
  if (!fmt) return null;

  // For pipe tables, a separator row (|---|---| immediately after the header)
  // also counts as confirmation.
  for (let j = startIdx + 1; j < Math.min(startIdx + 4, lines.length); j++) {
    const next = lines[j];
    if (!next.trim()) continue; // skip blank lines between rows
    if (detectLineTableFormat(next) === fmt) return fmt;
    if (fmt === "pipe" && isPipeRowSeparator(next)) return fmt;
    break; // first non-blank line didn't match — not a table
  }

  return null;
}

// ── Table builder ─────────────────────────────────────────────────────────────

function buildTable(rows: string[][]): Table {
  const colCount = Math.max(...rows.map((r) => r.length));

  // Proportional column widths: based on the max content length seen in each column.
  // Clamped to a minimum of 8 % so no column becomes invisible.
  const maxLens = Array.from({ length: colCount }, (_, ci) =>
    Math.max(...rows.map((r) => (r[ci] ?? "").length), 4),
  );
  const totalLen = maxLens.reduce((s, l) => s + l, 0) || 1;
  // Widths as integer percentages; last column absorbs any rounding remainder.
  const widthPcts = maxLens.map((l) => Math.max(8, Math.round((l / totalLen) * 100)));
  const sumPcts = widthPcts.reduce((s, p) => s + p, 0);
  widthPcts[widthPcts.length - 1] += 100 - sumPcts; // fix rounding

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows.map(
      (cells, ri) =>
        new TableRow({
          tableHeader: ri === 0,
          children: Array.from({ length: colCount }, (_, ci) =>
            new TableCell({
              width: { size: Math.max(1, widthPcts[ci]), type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  children: makeTextRuns(cells[ci] ?? "", 20),
                  spacing: { after: 60 },
                }),
              ],
              borders: {
                top: { style: BorderStyle.SINGLE, size: 4, color: "BBBBBB" },
                bottom: { style: BorderStyle.SINGLE, size: 4, color: "BBBBBB" },
                left: { style: BorderStyle.SINGLE, size: 4, color: "BBBBBB" },
                right: { style: BorderStyle.SINGLE, size: 4, color: "BBBBBB" },
              },
              // Header row: slightly darker shade; data rows: white
              shading: ri === 0 ? { fill: "DDEEFF" } : ri % 2 === 0 ? { fill: "F7F9FC" } : undefined,
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
    // peekTableFormat confirms ≥ 2 lines share the same format before we commit.
    const tableFormat = peekTableFormat(lines, i);
    if (tableFormat) {
      const tableStartI = i;
      const tableRows: string[][] = [];

      while (i < lines.length) {
        const line = lines[i];
        if (!line.trim()) { i++; break; } // blank line ends the block

        // Skip GFM-style separator rows inside pipe tables
        if (tableFormat === "pipe" && isPipeRowSeparator(line)) { i++; continue; }

        // Stop if the line no longer matches the established format
        if (detectLineTableFormat(line) !== tableFormat) break;

        let cells: string[];
        switch (tableFormat) {
          case "pipe":  cells = splitPipeRow(line);  break;
          case "tab":   cells = splitTabRow(line);   break;
          default:      cells = splitSpaceRow(line); break;
        }

        if (cells.length >= 2) {
          tableRows.push(cells);
        } else {
          // Line doesn't split cleanly — stop collecting
          break;
        }
        i++;
      }

      if (tableRows.length >= 2) {
        children.push(buildTable(tableRows));
        children.push(new Paragraph({ children: [], spacing: { after: 160 } }));
        continue;
      }

      // Fewer than 2 rows collected → not a real table; reset and fall through
      i = tableStartI;
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
          // Continuation of the previous bullet item
          children.push(
            new Paragraph({
              children: makeTextRuns(l.trim()),
              bullet: { level: 0 },
              spacing: { after: 80 },
              indent: { left: convertInchesToTwip(0.25) },
            }),
          );
          i++;
        }
      }
      continue;
    }

    // ── Numbered list ───────────────────────────────────────────────────────
    if (isNumberedListLine(raw)) {
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
          i++;
        } else if (detectHeading(l.trim()) || isSeparatorLine(l)) {
          break;
        } else {
          i++;
        }
      }
      continue;
    }

    // ── Regular paragraph ───────────────────────────────────────────────────
    const paraLines: string[] = [];
    while (i < lines.length) {
      const l = lines[i];
      const lt = l.trim();
      if (!lt) { i++; break; }
      if (
        detectHeading(lt) ||
        isSeparatorLine(l) ||
        isBulletLine(l) ||
        isNumberedListLine(l)
      ) {
        break;
      }
      // Stop if this line would start a confirmed table (don't consume it as paragraph text)
      if (peekTableFormat(lines, i)) break;
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

  const { text: rawText, numpages, info } = parsed;

  if (!rawText || rawText.trim().length < 10) {
    return {
      ok: false,
      reason: "no_text",
      message:
        "No text could be extracted from this PDF. It may be a scanned document. " +
        "For scanned PDFs, please use a dedicated OCR tool before converting.",
    };
  }

  // Normalise PDF extraction artifacts before structural analysis
  const text = preprocessText(rawText);

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
          run: { font: "Calibri", size: 22 }, // 11 pt
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
