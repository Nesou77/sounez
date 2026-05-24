import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { pdfToWordRouter } from "./routes/pdf-to-word";

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);

// ── Allowed origins ───────────────────────────────────────────────────────────
const rawOrigins = process.env.ALLOWED_ORIGINS || "https://www.sounez.com";
const allowedOrigins = rawOrigins
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// Always allow localhost in development
if (process.env.NODE_ENV !== "production") {
  allowedOrigins.push("http://localhost:3000", "http://127.0.0.1:3000");
}

// ── Middleware ────────────────────────────────────────────────────────────────

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. server-to-server, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  }),
);

// Global rate limit — 30 req/min per IP
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests. Please wait a moment and try again." },
  }),
);

app.use(express.json({ limit: "1mb" }));

// ── Health check ──────────────────────────────────────────────────────────────

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Routes ────────────────────────────────────────────────────────────────────

app.use("/api/pdf-to-word", pdfToWordRouter);

// ── 404 handler ───────────────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({ error: "Not found." });
});

// ── Error handler ─────────────────────────────────────────────────────────────

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error("[server] Unhandled error:", err.message);
    res.status(500).json({ error: "An unexpected error occurred." });
  },
);

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`[server] Sounez backend running on port ${PORT}`);
  console.log(`[server] Allowed origins: ${allowedOrigins.join(", ")}`);
});

export default app;
