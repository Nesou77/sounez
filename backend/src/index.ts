import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { pdfToWordRouter } from "./routes/pdf-to-word";
import { scheduleTempCleanup } from "./lib/temp";
import { isLibreOfficeAvailable } from "./lib/libreoffice";

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);

// ── CORS origins ──────────────────────────────────────────────────────────────
const rawOrigins = process.env.ALLOWED_ORIGINS || "https://www.sounez.com";
const allowedOrigins = rawOrigins
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

if (process.env.NODE_ENV !== "production") {
  allowedOrigins.push(
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
  );
}

// ── Security headers ──────────────────────────────────────────────────────────
app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false, // handled by Vercel on the frontend
  }),
);

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // server-to-server / curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin not allowed — ${origin}`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false,
  }),
);

// ── Global rate limit: 60 req / min per IP ────────────────────────────────────
app.use(
  rateLimit({
    windowMs: 60_000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests. Please wait a moment and try again." },
  }),
);

app.use(express.json({ limit: "512kb" }));

// ── Root route ────────────────────────────────────────────────────────────────
app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "Backend running" });
});

// ── Health checks ─────────────────────────────────────────────────────────────
app.get("/health", async (_req: Request, res: Response) => {
  const libreoffice = await isLibreOfficeAvailable();
  res.json({
    status: "ok",
    service: "sounez-backend",
    libreoffice,
    timestamp: new Date().toISOString(),
  });
});

app.get("/healthz", (_req: Request, res: Response) => {
  res.send("OK");
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/pdf-to-word", pdfToWordRouter);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found." });
});

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[server] Unhandled error:", err.message);
  res.status(500).json({ error: "An unexpected error occurred." });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[server] sounez-backend listening on port ${PORT}`);
  console.log(`[server] NODE_ENV=${process.env.NODE_ENV ?? "development"}`);
  console.log(`[server] Allowed origins: ${allowedOrigins.join(", ")}`);
});

// ── Temp file cleanup: every 30 min ──────────────────────────────────────────
scheduleTempCleanup(30 * 60_000);

export default app;
