import { Router, Request, Response } from "express";
import multer from "multer";
import { rateLimit } from "express-rate-limit";
import fs from "fs";
import path from "path";
import { convertWithLibreOffice } from "../lib/libreoffice";
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

// ── Multer: memory storage, stream to disk only when conversion starts ────────
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

    const jobDir = createJobDir();
    const originalBase = (req.file.originalname || "document.pdf")
      .replace(/\.pdf$/i, "")
      .replace(/[^a-zA-Z0-9_\-. ]/g, "_")
      .slice(0, 100);
    const pdfPath = path.join(jobDir, `${originalBase}.pdf`);

    try {
      // Write the uploaded PDF buffer to a temp file so LibreOffice can read it
      fs.writeFileSync(pdfPath, req.file.buffer);

      const result = await convertWithLibreOffice(pdfPath, jobDir);

      if (!result.ok) {
        const statusMap: Record<string, number> = {
          not_installed: 503,
          encrypted: 422,
          corrupt: 422,
          no_text: 422,
          timeout: 504,
          unknown: 500,
        };
        res.status(statusMap[result.reason] ?? 500).json({ error: result.message });
        return;
      }

      const docxBuffer = fs.readFileSync(result.docxPath);
      const outputName = `${originalBase}.docx`;

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      );
      res.setHeader("Content-Disposition", `attachment; filename="${outputName}"`);
      res.setHeader("Cache-Control", "no-store");
      res.send(docxBuffer);
    } catch (err) {
      console.error("[pdf-to-word] Unexpected error:", err instanceof Error ? err.message : err);
      res.status(500).json({ error: "Something went wrong. Please try again with a different PDF." });
    } finally {
      cleanupDir(jobDir);
    }
  },
);

export { router as pdfToWordRouter };
