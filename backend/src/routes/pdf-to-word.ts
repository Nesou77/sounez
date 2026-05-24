import { Router, Request, Response } from "express";
import multer from "multer";
import { rateLimit } from "express-rate-limit";
import { convertPdfToDocx } from "../services/pdf-converter";

const router = Router();

// ── Per-route rate limit: 5 conversions/min per IP ───────────────────────────
const convertRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  keyGenerator: (req) => {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
    return req.ip ?? "anonymous";
  },
  message: { error: "Too many conversion requests. Please wait a moment and try again." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Multer: memory storage, 20 MB limit ──────────────────────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
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
    if (!req.file) {
      res.status(400).json({ error: "No PDF file provided." });
      return;
    }

    const preserveLayout = req.body.preserveLayout === "true";
    const useOcr = req.body.useOcr === "true";

    try {
      const docxBuffer = await convertPdfToDocx(req.file.buffer, {
        preserveLayout,
        useOcr,
      });

      const outputName =
        (req.file.originalname || "document.pdf")
          .replace(/\.pdf$/i, "")
          .replace(/[^a-zA-Z0-9_\-. ]/g, "_") + ".docx";

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      res.setHeader("Content-Disposition", `attachment; filename="${outputName}"`);
      res.setHeader("Cache-Control", "no-store");
      res.send(docxBuffer);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Conversion failed.";
      console.error("[pdf-to-word] Conversion error:", message);

      if (message.includes("encrypted") || message.includes("password")) {
        res.status(422).json({ error: "This PDF is password-protected. Please remove the password and try again." });
        return;
      }
      if (message.includes("corrupt") || message.includes("invalid")) {
        res.status(422).json({ error: "The PDF file appears to be corrupted. Please try a different file." });
        return;
      }

      res.status(500).json({ error: "Conversion failed. Please try again or use a different PDF." });
    }
  },
);

export { router as pdfToWordRouter };
