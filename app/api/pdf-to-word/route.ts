import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const PDF_RATE_LIMIT = { limit: 5, windowMs: 60 * 1000 };
const MAX_SIZE = 20 * 1024 * 1024; // 20 MB

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`pdf-to-word:${ip}`, PDF_RATE_LIMIT);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request. Please try again." }, { status: 400 });
  }

  const pdfFile = formData.get("pdf");
  if (!(pdfFile instanceof File)) {
    return NextResponse.json({ error: "No PDF file provided." }, { status: 400 });
  }

  const mimeOk =
    pdfFile.type === "application/pdf" ||
    pdfFile.name.toLowerCase().endsWith(".pdf");
  if (!mimeOk) {
    return NextResponse.json(
      { error: "Please upload a valid PDF file." },
      { status: 400 },
    );
  }

  if (pdfFile.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 20 MB." },
      { status: 400 },
    );
  }

  try {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Dynamically import to avoid issues with Next.js edge/server boundaries
    const pdfParse = (await import("pdf-parse")).default;
    const docx = await import("docx");
    const {
      Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
      Table, TableRow, TableCell, WidthType, BorderStyle,
    } = docx;

    type DocChild = InstanceType<typeof Paragraph> | InstanceType<typeof Table>;

    let pdfData: { text: string; numpages: number };
    try {
      pdfData = await pdfParse(buffer, { max: 0 });
    } catch {
      return NextResponse.json(
        { error: "Could not read this PDF. It may be password-protected or corrupted." },
        { status: 422 },
      );
    }

    const rawText = pdfData.text || "";
    if (!rawText.trim()) {
      return NextResponse.json(
        { error: "This PDF appears to be image-based (scanned). Text extraction is not available for scanned PDFs without OCR." },
        { status: 422 },
      );
    }

    // ── Parse text into structured paragraphs ──────────────────────────────
    const lines = rawText.split("\n");
    const docChildren: DocChild[] = [];

    // Heuristics for heading detection
    function looksLikeHeading(line: string): { level: 1 | 2 | 3 } | null {
      const t = line.trim();
      if (!t || t.length > 120) return null;
      // All-caps short line → H1
      if (t === t.toUpperCase() && t.length <= 60 && /[A-Z]/.test(t)) return { level: 1 };
      // Numbered heading: "1. Title" or "1.1 Title"
      if (/^\d+\.\s+[A-Z]/.test(t) && t.length <= 80) return { level: 2 };
      if (/^\d+\.\d+\s+[A-Z]/.test(t) && t.length <= 80) return { level: 3 };
      // Title-case short line with no period at end
      const words = t.split(" ");
      const titleCase = words.every(
        (w) => !w || w[0] === w[0].toUpperCase() || w.length <= 3,
      );
      if (titleCase && t.length <= 60 && !t.endsWith(".") && words.length >= 2 && words.length <= 8) {
        return { level: 2 };
      }
      return null;
    }

    function looksLikeBullet(line: string): boolean {
      return /^[\s]*[-•*·▪▸►◆○●]\s+/.test(line) || /^[\s]*\d+[.)]\s+/.test(line);
    }

    function stripBulletPrefix(line: string): string {
      return line.replace(/^[\s]*[-•*·▪▸►◆○●]\s+/, "").replace(/^[\s]*\d+[.)]\s+/, "").trim();
    }

    // Group consecutive blank lines and build paragraphs
    let i = 0;
    while (i < lines.length) {
      const raw = lines[i];
      const trimmed = raw.trim();

      // Skip blank lines
      if (!trimmed) {
        i++;
        continue;
      }

      const headingMatch = looksLikeHeading(trimmed);
      if (headingMatch) {
        const levelMap: Record<1 | 2 | 3, typeof HeadingLevel[keyof typeof HeadingLevel]> = {
          1: HeadingLevel.HEADING_1,
          2: HeadingLevel.HEADING_2,
          3: HeadingLevel.HEADING_3,
        };
        docChildren.push(
          new Paragraph({
            text: trimmed,
            heading: levelMap[headingMatch.level],
            spacing: { before: 240, after: 120 },
          }),
        );
        i++;
        continue;
      }

      if (looksLikeBullet(raw)) {
        // Collect consecutive bullet lines
        const bulletItems: string[] = [];
        while (i < lines.length && (looksLikeBullet(lines[i]) || (lines[i].trim() && !looksLikeHeading(lines[i].trim())))) {
          if (looksLikeBullet(lines[i])) {
            bulletItems.push(stripBulletPrefix(lines[i]));
          } else if (lines[i].trim()) {
            // continuation of previous bullet
            if (bulletItems.length > 0) {
              bulletItems[bulletItems.length - 1] += " " + lines[i].trim();
            } else {
              bulletItems.push(lines[i].trim());
            }
          } else {
            break;
          }
          i++;
        }
        for (const item of bulletItems) {
          docChildren.push(
            new Paragraph({
              children: [new TextRun({ text: item })],
              bullet: { level: 0 },
              spacing: { after: 80 },
            }),
          );
        }
        continue;
      }

      // Regular paragraph — accumulate until blank line or heading
      const paraLines: string[] = [];
      while (i < lines.length) {
        const l = lines[i];
        const lt = l.trim();
        if (!lt) { i++; break; }
        if (looksLikeHeading(lt)) break;
        if (looksLikeBullet(l)) break;
        paraLines.push(lt);
        i++;
      }

      const paraText = paraLines.join(" ").trim();
      if (paraText) {
        // Detect if it looks like a table row (tab-separated or multiple spaces)
        const isTableRow = paraText.includes("\t") || /\s{3,}/.test(paraText);
        if (isTableRow) {
          // Split by tabs or multiple spaces
          const cells = paraText.split(/\t|\s{3,}/).map((c) => c.trim()).filter(Boolean);
          if (cells.length >= 2) {
            docChildren.push(
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: cells.map(
                      (cell) =>
                        new TableCell({
                          children: [new Paragraph({ children: [new TextRun({ text: cell })] })],
                          borders: {
                            top: { style: BorderStyle.SINGLE, size: 1 },
                            bottom: { style: BorderStyle.SINGLE, size: 1 },
                            left: { style: BorderStyle.SINGLE, size: 1 },
                            right: { style: BorderStyle.SINGLE, size: 1 },
                          },
                        }),
                    ),
                  }),
                ],
              }),
            );
            continue;
          }
        }

        docChildren.push(
          new Paragraph({
            children: [new TextRun({ text: paraText })],
            spacing: { after: 160 },
            alignment: AlignmentType.LEFT,
          }),
        );
      }
    }

    // Ensure at least one paragraph
    if (docChildren.length === 0) {
      docChildren.push(new Paragraph({ children: [new TextRun({ text: rawText.trim() })] }));
    }

    // ── Build DOCX ─────────────────────────────────────────────────────────
    const doc = new Document({
      styles: {
        default: {
          document: {
            run: { font: "Calibri", size: 24 }, // 12pt
          },
        },
      },
      sections: [
        {
          properties: {},
          children: docChildren,
        },
      ],
    });

    const docxBuffer = await Packer.toBuffer(doc);
    const outputName = pdfFile.name.replace(/\.pdf$/i, ".docx");

    return new NextResponse(new Uint8Array(docxBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${outputName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[pdf-to-word] Unexpected error:", e);
    return NextResponse.json(
      { error: "Conversion failed. Please try a different PDF or try again later." },
      { status: 500 },
    );
  }
}
