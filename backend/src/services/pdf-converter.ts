/**
 * PDF to DOCX conversion service.
 *
 * Strategy:
 * 1. Parse the PDF with `pdf-parse` to extract raw text and page structure.
 * 2. Build a DOCX document with `docx` library, preserving headings and paragraphs.
 *
 * Limitations:
 * - Complex multi-column layouts are linearised to single-column.
 * - Images embedded in PDFs are not extracted (requires additional tooling).
 * - Scanned PDFs (image-only) will produce minimal text without OCR.
 *
 * For production-grade fidelity, consider integrating LibreOffice headless
 * or a third-party API (ConvertAPI, CloudConvert) as a drop-in replacement
 * for the `convertPdfToDocx` function below.
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
} from "docx";

export type ConvertOptions = {
  preserveLayout: boolean;
  useOcr: boolean;
};

// ── Heuristics for detecting headings ────────────────────────────────────────

function looksLikeHeading(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  // Short lines (under 80 chars) that are ALL CAPS or Title Case with no period at end
  if (trimmed.length > 80) return false;
  if (trimmed === trimmed.toUpperCase() && trimmed.length > 2) return true;
  // Title Case: most words start with uppercase
  const words = trimmed.split(/\s+/);
  if (words.length <= 6) {
    const titleCaseCount = words.filter((w) => /^[A-Z]/.test(w)).length;
    if (titleCaseCount / words.length >= 0.7 && !trimmed.endsWith(".")) return true;
  }
  return false;
}

function looksLikePageBreak(line: string): boolean {
  return /^\s*[-=_*]{3,}\s*$/.test(line);
}

// ── Build DOCX paragraphs from extracted text ─────────────────────────────────

function buildParagraphs(text: string, preserveLayout: boolean): Paragraph[] {
  const lines = text.split("\n");
  const paragraphs: Paragraph[] = [];

  let buffer: string[] = [];

  const flushBuffer = () => {
    if (buffer.length === 0) return;
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

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (looksLikePageBreak(line)) {
      flushBuffer();
      if (preserveLayout) {
        paragraphs.push(new Paragraph({ children: [new PageBreak()] }));
      }
      continue;
    }

    if (!line.trim()) {
      flushBuffer();
      continue;
    }

    if (looksLikeHeading(line)) {
      flushBuffer();
      paragraphs.push(
        new Paragraph({
          text: line.trim(),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        }),
      );
      continue;
    }

    // Accumulate regular text lines into paragraphs
    buffer.push(line.trim());
  }

  flushBuffer();
  return paragraphs;
}

// ── Main conversion function ──────────────────────────────────────────────────

export async function convertPdfToDocx(
  pdfBuffer: Buffer,
  options: ConvertOptions,
): Promise<Buffer> {
  // Parse PDF
  let parsed: { text: string; numpages: number; info: Record<string, unknown> };
  try {
    parsed = await pdfParse(pdfBuffer);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.toLowerCase().includes("encrypt")) {
      throw new Error("encrypted PDF");
    }
    throw new Error("invalid PDF: " + msg);
  }

  const { text, numpages, info } = parsed;

  if (!text || text.trim().length < 10) {
    if (options.useOcr) {
      // OCR path: in a full implementation, you'd call Tesseract or a cloud OCR here.
      // For now, return a DOCX with a helpful message.
      throw new Error(
        "This appears to be a scanned PDF. OCR processing is not available in the current deployment. " +
          "Please use a text-based PDF for best results.",
      );
    }
    throw new Error(
      "No text could be extracted from this PDF. It may be a scanned document. " +
        "Try enabling the OCR option.",
    );
  }

  // Build document
  const title = (info?.Title as string) || "Converted Document";
  const paragraphs = buildParagraphs(text, options.preserveLayout);

  const doc = new Document({
    creator: "Sounez PDF to Word Converter",
    title,
    description: `Converted from PDF (${numpages} page${numpages !== 1 ? "s" : ""})`,
    sections: [
      {
        properties: {},
        children: paragraphs.length > 0 ? paragraphs : [new Paragraph({ text: "" })],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}
