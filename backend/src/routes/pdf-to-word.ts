import { Router, Request, Response } from "express";
import multer from "multer";
import { rateLimit } from "express-rate-limit";
import fs from "fs";
import path from "path";
import { convertWithLibreOffice, isLibreOfficeAvailable, type ConvertOptions } from "../lib/libreoffice";
import { convertPdfToDocx } from "../services/pdf-converter";
import { createJobDir, cleanupDir } from "../lib/temp";

const router = Router();

// ── Per-route rate limit: 5 conversions / min per IP ─────────────────────────
const convertRateLimit = rateLimit({
  windowMs: 60_000,
  max: 5,
  keyGenerator: (req) => {
    const fwd = req.headers["x-forwarded-for"];
    if (typeof fwd === "string") return fwd.split(",")[0].trim();
    return req.ip ?? "anonymous";
  },
  message: { error: "Too many conversion requests. Please wait a moment and try again." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Multer: memory storage ────────────────────────────────────────────────────
const MAX_MB = parseInt(process.env.MAX_FILE_SIZE_MB || "20", 10);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".pdf")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Please upload a PDF file."));
    }
  },
});

// ── POST /api/pdf-to-word ─────────────────────────────────────────────────────

router.post(
  "/",
  convertRateLimit,
  upload.single("pdf"),
  async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ error: "No PDF file provided." });
      return;
    }

    const preserveLayout = req.body.preserveLayout === "true";
    const useOcr = req.body.useOcr === "true";
    const originalBase = (req.file.originalname || "document.pdf")
      .replace(/\.pdf$/i, "")
      .replace(/[^a-zA-Z0-9_\-. ]/g, "_")
      .slice(0, 100);
    const outputName = `${originalBase}.docx`;

    // ── Try LibreOffice first (high-quality, Docker image required) ───────────
    const libreOfficeAvailable = await isLibreOfficeAvailable();

    if (libreOfficeAvailable) {
      const jobDir = createJobDir();
      const pdfPath = path.join(jobDir, `${originalBase}.pdf`);

      try {
        fs.writeFileSync(pdfPath, req.file.buffer);

        const opts: ConvertOptions = { preserveLayout };
        const result = await convertWithLibreOffice(pdfPath, jobDir, opts);

        if (result.ok) {
          const docxBuffer = fs.readFileSync(result.docxPath);
          res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          );
          res.setHeader("Content-Disposition", `attachment; filename="${outputName}"`);
          res.setHeader("Cache-Control", "no-store");
          res.send(docxBuffer);
          return;
        }

        // LibreOffice found but conversion failed (encrypted, corrupt, timeout…)
        const statusMap: Record<string, number> = {
          encrypted: 422,
          corrupt: 422,
          no_text: 422,
          timeout: 504,
          unknown: 500,
          not_installed: 503,
        };
        res.status(statusMap[result.reason] ?? 500).json({ error: result.message });
        return;
      } catch (err) {
        console.error("[pdf-to-word] LibreOffice unexpected error:", err instanceof Error ? err.message : err);
        res.status(500).json({ error: "Something went wrong. Please try again with a different PDF." });
        return;
      } finally {
        cleanupDir(jobDir);
      }
    }

    // ── Fallback: Node.js converter (works on any runtime, no system deps) ────
    // Used when LibreOffice is not installed (e.g. native Render runtime, local dev).
    // Produces lower-quality DOCX (text flow only, no images) but never errors out.
    console.warn("[pdf-to-word] LibreOffice not available — using Node.js fallback converter.");

    try {
      const fallback = await convertPdfToDocx(req.file.buffer, { preserveLayout, useOcr });

      if (!fallback.ok) {
        const statusMap: Record<string, number> = {
          encrypted: 422,
          corrupt: 422,
          no_text: 422,
          unknown: 500,
        };
        res.status(statusMap[fallback.reason] ?? 500).json({ error: fallback.message });
        return;
      }

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      );
      res.setHeader("Content-Disposition", `attachment; filename="${outputName}"`);
      res.setHeader("Cache-Control", "no-store");
      res.setHeader("X-Conversion-Method", "fallback"); // visible in Render logs
      res.send(fallback.buffer);
    } catch (err) {
      console.error("[pdf-to-word] Fallback converter error:", err instanceof Error ? err.message : err);
      res.status(500).json({ error: "Something went wrong. Please try again with a different PDF." });
    }
  },
);

export { router as pdfToWordRouter };
