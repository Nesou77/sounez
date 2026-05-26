/**
 * PDF-to-Word proxy route.
 *
 * Forwards the upload to the Render backend (NEXT_PUBLIC_BACKEND_URL).
 * The backend handles all heavy processing - pdf-parse + docx generation.
 *
 * Why proxy instead of calling the backend directly from the client?
 * - Keeps the backend URL server-side (no CORS issues, no URL exposure)
 * - Allows rate-limiting and validation at the Next.js layer
 * - Single endpoint for the frontend regardless of where processing happens
 */

import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const PDF_RATE_LIMIT = { limit: 5, windowMs: 60 * 1000 };
const MAX_SIZE = 20 * 1024 * 1024; // 20 MB

export async function POST(req: Request) {
  // ── Rate limit ────────────────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = checkRateLimit(`pdf-to-word:${ip}`, PDF_RATE_LIMIT);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  // ── Parse form data ───────────────────────────────────────────────────────
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
    return NextResponse.json({ error: "Please upload a valid PDF file." }, { status: 400 });
  }

  if (pdfFile.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 20 MB." },
      { status: 400 },
    );
  }

  // ── Resolve backend URL ───────────────────────────────────────────────────
  // NEXT_PUBLIC_BACKEND_URL is readable server-side too (it's a NEXT_PUBLIC_ var).
  // We also check the server-only BACKEND_URL as a fallback for environments
  // where the URL should not be exposed to the client bundle.
  const backendUrl =
    (process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? "").trim();

  if (!backendUrl) {
    return NextResponse.json(
      {
        error:
          "PDF conversion is temporarily unavailable. Please try again later or contact support.",
      },
      { status: 503 },
    );
  }

  // ── Proxy to Render backend ───────────────────────────────────────────────
  try {
    // Re-build the FormData to forward to the backend
    const upstream = new FormData();
    upstream.append("pdf", pdfFile, pdfFile.name);
    upstream.append("preserveLayout", formData.get("preserveLayout") ?? "true");
    upstream.append("useOcr", formData.get("useOcr") ?? "false");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 110_000); // 110 s (client has 120 s)

    let backendRes: Response;
    try {
      backendRes = await fetch(`${backendUrl}/api/pdf-to-word`, {
        method: "POST",
        body: upstream,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!backendRes.ok) {
      // Forward user-friendly error from backend, never expose raw stack traces
      const data = await backendRes.json().catch(() => ({}));
      const raw = (data as { error?: string })?.error ?? "";
      const userMsg =
        raw &&
        !raw.toLowerCase().includes("internal") &&
        !raw.toLowerCase().includes("unexpected") &&
        raw.length < 300
          ? raw
          : "We could not convert this PDF. Please try a different file or try again later.";

      return NextResponse.json({ error: userMsg }, { status: backendRes.status });
    }

    // Stream the DOCX binary back to the client
    const docxBuffer = await backendRes.arrayBuffer();
    const outputName = pdfFile.name.replace(/\.pdf$/i, ".docx");

    return new NextResponse(docxBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${outputName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return NextResponse.json(
        {
          error:
            "Conversion is taking longer than expected. Try a smaller PDF or try again later.",
        },
        { status: 504 },
      );
    }
    console.error("[pdf-to-word proxy] Unexpected error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "We could not convert this PDF. Please try again later." },
      { status: 502 },
    );
  }
}
