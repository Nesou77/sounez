/**
 * Pure Node.js PDF → DOCX converter.
 *
 * Uses pdf-parse to extract text and docx to build the Word document.
 * No system binaries required — works on any Node.js runtime including Render free tier.
 *
 * Fidelity notes:
 *   - Text-based PDFs: excellent text extraction, heading detection, paragraph grouping.
 *   - Scanned / image-only PDFs: no text extracted (OCR not available in this tier).
 *   - Complex multi-column layouts are linearised to single-column.
 *   - Embedded images are not extracted.
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
} from "docx";

export type ConvertOptions = {
  preserveLayout: boolean;
  useOcr: boolean;
};

export type ConvertResult =
  | { ok: true; buffer: Buffer; pageCount: number }
  | { ok: false; reason: "encrypted" | "corrupt" | "no_text" | "unknown"; message: string };

// ── Heuristics ────────────────────────────────────────────────────────────────

function isHeading(line: string): boolean {
  const t = line.trim();
  if (!t || t.length > 90) return false;
  // ALL CAPS short line
  if (t === t.toUpperCase() && t.length > 2 && /[A-Z]/.test(t)) return true;
  // Title Case: most words capitalised, no trailing period
  const words = t.split(/\s+/);
  if (words.length >= 2 && words.length <= 8) {
    const capCount = words.filter((w) => /^[A-Z]/.test(w)).length;
    if (capCount / words.length >= 0.7 && !t.endsWith(".")) return true;
  }
  return false;
}

function isPageBreakLine(line: string): boolean {
  return /^\s*[-=_*]{3,}\s*$/.test(line);
}

// ── Build DOCX paragraphs ─────────────────────────────────────────────────────

function buildParagraphs(text: string, preserveLayout: boolean): Paragraph[] {
  const lines = text.split("\n");
  const paragraphs: Paragraph[] = [];
  let buffer: string[] = [];

  const flush = () => {
    if (!buffer.length) return;
    const combined = buffer.join(" ").trim();
    if (combined) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: combined, size: 24 })],
          spacing: { after: 120 },
          alignment: AlignmentType.LEFT,
        }),
      );
    }
    buffer = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (isPageBreakLine(line)) {
      flush();
      if (preserveLayout) {
        paragraphs.push(new Paragraph({ children: [new PageBreak()] }));
      }
      continue;
    }

    if (!line.trim()) {
      flush();
      continue;
    }

    if (isHeading(line)) {
      flush();
      paragraphs.push(
        new Paragraph({
          text: line.trim(),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        }),
      );
      continue;
    }

    buffer.push(line.trim());
  }

  flush();
  return paragraphs;
}

// ── Main ──────────────────────────────────────────────────────────────────────

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

  const title = typeof info?.Title === "string" && info.Title ? info.Title : "Converted Document";
  const paragraphs = buildParagraphs(text, options.preserveLayout);

  const doc = new Document({
    creator: "Sounez PDF to Word Converter",
    title,
    description: `Converted from PDF — ${numpages} page${numpages !== 1 ? "s" : ""}`,
    sections: [
      {
        properties: { type: SectionType.CONTINUOUS },
        children: paragraphs.length > 0 ? paragraphs : [new Paragraph({ text: "" })],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return { ok: true, buffer, pageCount: numpages };
}
