import { Router, Request, Response } from "express";
import multer from "multer";
import { rateLimit } from "express-rate-limit";
import path from "path";
import fs from "fs";
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

// ── Multer: disk storage so LibreOffice can read the file ─────────────────────
const MAX_MB = parseInt(process.env.MAX_FILE_SIZE_MB || "20", 10);

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      // Each upload gets its own job directory
      const dir = createJobDir();
      cb(null, dir);
    },
    filename: (_req, file, cb) => {
      // Sanitise filename — keep extension, replace everything else
      const ext = path.extname(file.originalname).toLowerCase() || ".pdf";
      cb(null, `upload${ext}`);
    },
  }),
  limits: { fileSize: MAX_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".pdf")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are accepted."));
    }
  },
});

// ── POST /api/pdf-to-word ─────────────────────────────────────────────────────

router.post(
  "/",
  convertRateLimit,
  upload.single("pdf"),
  async (req: Request, res: Response): Promise<void> => {
    const uploadedFile = req.file;

    if (!uploadedFile) {
      res.status(400).json({ error: "No PDF file provided." });
      return;
    }

    // The job directory is the directory multer wrote the file into
    const jobDir = path.dirname(uploadedFile.path);

    try {
      const result = await convertWithLibreOffice(uploadedFile.path, jobDir);

      if (!result.ok) {
        const statusMap: Record<string, number> = {
          not_installed: 503,
          encrypted: 422,
          corrupt: 422,
          no_text: 422,
          timeout: 504,
          unknown: 500,
        };
        res
          .status(statusMap[result.reason] ?? 500)
          .json({ error: result.message });
        cleanupDir(jobDir);
        return;
      }

      // Build a clean output filename from the original upload name
      const outputName =
        (uploadedFile.originalname || "document.pdf")
          .replace(/\.pdf$/i, "")
          .replace(/[^a-zA-Z0-9_\-. ]/g, "_")
          .slice(0, 100) + ".docx";

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${outputName}"`,
      );
      res.setHeader("Cache-Control", "no-store");

      // Stream the file then clean up
      const readStream = fs.createReadStream(result.docxPath);
      readStream.pipe(res);
      readStream.on("end", () => cleanupDir(jobDir));
      readStream.on("error", (err) => {
        console.error("[pdf-to-word] Stream error:", err.message);
        cleanupDir(jobDir);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to send converted file." });
        }
      });
    } catch (err) {
      cleanupDir(jobDir);
      const message = err instanceof Error ? err.message : "Conversion failed.";
      console.error("[pdf-to-word] Unexpected error:", message);
      res.status(500).json({ error: "Conversion failed. Please try again." });
    }
  },
);

export { router as pdfToWordRouter };
