"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Upload,
  X,
  RotateCcw,
  Shield,
  Download,
  Loader2,
  AlertCircle,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";

// ── On-device AI background removal ──────────────────────────────────────────
// @imgly/background-removal runs fully in the browser via ONNX/WebAssembly.
// No server, no API key, no image uploads - everything happens on-device.
//
// The library fetches its WASM runtime + ONNX model files (~40 MB total) from
// the CDN specified by publicPath. This must match the installed package version
// exactly so the model files are found. The version is pinned in package.json.
const BG_REMOVAL_CDN =
  process.env.NEXT_PUBLIC_BG_REMOVAL_CDN ??
  "https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/";

// Images larger than this dimension are downscaled before processing to reduce
// memory usage and speed up the AI inference. The output quality stays good up
// to this resolution; very large images gain little from higher resolution here.
const MAX_PROCESS_DIMENSION = 1800;

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const ACCEPTED_EXT = [".png", ".jpg", ".jpeg", ".webp"];

type Stage = "idle" | "ready" | "processing" | "done" | "error";
type BgColor = "transparent" | "white" | "black" | "custom";

function isAcceptedImage(file: File) {
  return ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXT.some((e) => file.name.toLowerCase().endsWith(e));
}

function fmtSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

// Map low-level errors to actionable user-facing messages while logging the
// technical detail separately so it appears in the browser/server console.
function classifyError(e: unknown): string {
  const msg = (e instanceof Error ? e.message : String(e)).toLowerCase();
  if (msg.includes("webassembly") || msg.includes("wasm")) {
    return "Your browser does not support WebAssembly, which is required for on-device AI processing. Try a modern browser like Chrome or Firefox.";
  }
  if (msg.includes("fetch") || msg.includes("network") || msg.includes("cdn") || msg.includes("load")) {
    return "Could not load the AI model. Check your internet connection and try again — model files are downloaded from a CDN on first use.";
  }
  if (msg.includes("memory") || msg.includes("allocation") || msg.includes("out of")) {
    return "The image may be too large to process in your browser. Try a smaller image.";
  }
  return "Background removal failed. For best results, use a photo with a clear subject against a plain, contrasting background.";
}

// Resize source image so its longest side ≤ MAX_PROCESS_DIMENSION before
// sending to the AI. Skips resize when not needed. Preserves PNG format for
// images that may contain transparency; converts everything else to JPEG.
async function resizeIfNeeded(source: File): Promise<Blob> {
  return new Promise((resolve) => {
    const tempUrl = URL.createObjectURL(source);
    const img = new window.Image();

    img.onload = () => {
      URL.revokeObjectURL(tempUrl);
      const { naturalWidth: w, naturalHeight: h } = img;

      if (w <= MAX_PROCESS_DIMENSION && h <= MAX_PROCESS_DIMENSION) {
        resolve(source);
        return;
      }

      const scale = MAX_PROCESS_DIMENSION / Math.max(w, h);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(source); return; }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Keep PNG for sources that may have alpha; use JPEG otherwise (smaller).
      const mimeType = source.type === "image/png" ? "image/png" : "image/jpeg";
      canvas.toBlob((blob) => resolve(blob ?? source), mimeType, 0.92);
    };

    img.onerror = () => { URL.revokeObjectURL(tempUrl); resolve(source); };
    img.src = tempUrl;
  });
}

// ── Processing UX constants ───────────────────────────────────────────────────

// Step labels shown inside the result panel while the AI runs.
// Timings are tuned to feel honest: early steps appear quickly, later ones
// acknowledge that the model download and inference take real time.
const PROCESSING_STEPS: { at: number; text: string }[] = [
  { at: 0,     text: "Preparing your image…" },
  { at: 900,   text: "Loading AI model… first run may take a little longer" },
  { at: 5000,  text: "Removing background…" },
  { at: 10000, text: "Cleaning edges…" },
  { at: 16000, text: "Almost done…" },
];

// Simulated progress percentages. Progress intentionally stalls below 90%
// until the real result arrives, at which point it jumps to 100%.
const PROGRESS_STEPS: { at: number; value: number }[] = [
  { at: 0,     value: 8  },
  { at: 1500,  value: 22 },
  { at: 4500,  value: 42 },
  { at: 8000,  value: 58 },
  { at: 13000, value: 72 },
  { at: 20000, value: 82 },
  { at: 28000, value: 86 },
];

const FAQS = [
  {
    q: "How does AI background removal work?",
    a: "The AI model analyses the image to identify the foreground subject (person, product, object) and separates it from the background. The result is a transparent PNG with only the subject remaining.",
  },
  {
    q: "Is my image sent to a server?",
    a: "No. Your image is processed in your browser using on-device AI (WebAssembly). Sounez does not receive the image file.",
  },
  {
    q: "Why does the first run take longer?",
    a: "The AI model files (~40 MB) are downloaded from a CDN the first time you use the tool and then cached in your browser. Subsequent runs on the same device are significantly faster.",
  },
  {
    q: "What file formats are supported?",
    a: "You can upload PNG, JPG, JPEG and WEBP files up to 10 MB. The output is always a transparent PNG.",
  },
  {
    q: "What kinds of images work best?",
    a: "Images with a clear subject (person, product, animal) and distinct contrast from the background give the best results. Busy or blurred backgrounds may require a second pass.",
  },
  {
    q: "Can I replace the background with a color?",
    a: "Yes. After removal, you can choose a background color (white, black or custom) before downloading, or keep the transparent background.",
  },
  {
    q: "Is the tool free?",
    a: "Yes, background removal is free with no account required.",
  },
];

const CHECKERBOARD =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='10' height='10' fill='%23ccc'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23ccc'/%3E%3Crect x='10' y='0' width='10' height='10' fill='%23f5f5f5'/%3E%3Crect x='0' y='10' width='10' height='10' fill='%23f5f5f5'/%3E%3C/svg%3E\")";

export function BackgroundRemoverClient({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [dragging, setDragging] = useState(false);
  const [bgColor, setBgColor] = useState<BgColor>("transparent");
  const [customColor, setCustomColor] = useState("#ffffff");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [imageDimensions, setImageDimensions] = useState<{ w: number; h: number } | null>(null);
  const [progress, setProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState(PROCESSING_STEPS[0].text);
  const [slowWarning, setSlowWarning] = useState(false);

  // Track object URLs in refs so they can be revoked without stale-closure issues.
  const previewUrlRef = useRef<string | null>(null);
  const resultBlobRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useToolView(tool);

  // ── Side-effects ─────────────────────────────────────────────────────────────

  // Detect image dimensions as soon as a preview URL is created.
  useEffect(() => {
    if (!preview) { setImageDimensions(null); return; }
    const img = new window.Image();
    img.onload = () => setImageDimensions({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = preview;
  }, [preview]);

  // Kick off a background import of the JS module once the user has selected
  // an image. The module (~1.1 MB) will be cached so the import inside
  // removeBackground() resolves instantly, removing one serial step from the
  // critical path when the user actually clicks the button.
  useEffect(() => {
    if (stage !== "ready") return;
    const id = setTimeout(() => { void import("@imgly/background-removal"); }, 600);
    return () => clearTimeout(id);
  }, [stage]);

  // Cycle through the human-readable step labels during processing.
  useEffect(() => {
    if (stage !== "processing") {
      setProcessingStep(PROCESSING_STEPS[0].text);
      return;
    }
    setProcessingStep(PROCESSING_STEPS[0].text);
    const timers = PROCESSING_STEPS.slice(1).map(({ at, text }) =>
      setTimeout(() => setProcessingStep(text), at),
    );
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  // Advance the simulated progress bar while processing. The bar deliberately
  // stays below 90% until the real result arrives so it never lies to the user.
  useEffect(() => {
    if (stage !== "processing") { setProgress(0); return; }
    setProgress(PROGRESS_STEPS[0].value);
    const timers = PROGRESS_STEPS.slice(1).map(({ at, value }) =>
      setTimeout(() => setProgress(value), at),
    );
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  // After 10 seconds, tell the user that the wait is normal.
  useEffect(() => {
    if (stage !== "processing") { setSlowWarning(false); return; }
    const id = setTimeout(() => setSlowWarning(true), 10_000);
    return () => clearTimeout(id);
  }, [stage]);

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const accept = useCallback((f: File) => {
    if (!isAcceptedImage(f)) {
      toast.error("Please upload a PNG, JPG, JPEG or WEBP image.");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      toast.error(`File too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }
    // Revoke any previous preview URL to avoid memory leaks.
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);

    const url = URL.createObjectURL(f);
    previewUrlRef.current = url;
    setFile(f);
    setPreview(url);
    setStage("ready");
    setErrorMsg("");
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) accept(f);
    e.target.value = "";
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) accept(f);
  }, [accept]);

  const reset = useCallback(() => {
    if (previewUrlRef.current) { URL.revokeObjectURL(previewUrlRef.current); previewUrlRef.current = null; }
    if (resultBlobRef.current) { URL.revokeObjectURL(resultBlobRef.current); resultBlobRef.current = null; }
    setFile(null);
    setPreview(null);
    setResultUrl(null);
    setStage("idle");
    setErrorMsg("");
    setImageDimensions(null);
  }, []);

  const removeBackground = async () => {
    if (!file || stage === "processing") return;
    setStage("processing");
    setErrorMsg("");
    // Revoke any previous result URL before creating a new one.
    if (resultBlobRef.current) { URL.revokeObjectURL(resultBlobRef.current); resultBlobRef.current = null; }
    setResultUrl(null);

    try {
      // Downscale large images before AI processing for speed and memory.
      const processBlob = await resizeIfNeeded(file);

      // The dynamic import is typically cached from the preload effect above.
      let removeBg: (src: Blob, opts: Record<string, unknown>) => Promise<Blob>;
      try {
        const mod = await import("@imgly/background-removal");
        removeBg = mod.removeBackground as typeof removeBg;
      } catch (e) {
        console.error("[bg-remove] Failed to import module:", e);
        throw new Error("fetch failed: could not load background removal library");
      }

      const blob = await removeBg(processBlob, {
        publicPath: BG_REMOVAL_CDN,
        model: "isnet_fp16",
        output: { format: "image/png", quality: 1 },
      });

      const url = URL.createObjectURL(blob);
      resultBlobRef.current = url;
      setResultUrl(url);
      setProgress(100);
      setStage("done");
    } catch (e) {
      console.error("[bg-remove] Processing failed:", e);
      setErrorMsg(classifyError(e));
      setStage("error");
    }
  };

  const downloadResult = () => {
    if (!resultUrl) return;

    if (bgColor !== "transparent") {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = resolvedBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (!blob) return;
          const dlUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = dlUrl;
          a.download = `${file?.name.replace(/\.[^.]+$/, "") ?? "background-removed"}.png`;
          a.click();
          // Revoke after a short delay to let the browser initiate the download.
          setTimeout(() => URL.revokeObjectURL(dlUrl), 60_000);
        }, "image/png");
      };
      img.src = resultUrl;
    } else {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = `${file?.name.replace(/\.[^.]+$/, "") ?? "background-removed"}.png`;
      a.click();
    }
  };

  const resolvedBg =
    bgColor === "transparent" ? "transparent"
    : bgColor === "white" ? "#ffffff"
    : bgColor === "black" ? "#000000"
    : customColor;

  const isProcessing = stage === "processing";

  return (
    <ToolPageShell
      tool={tool}
      intro="Remove image backgrounds automatically with AI. Upload a photo and get a clean transparent PNG ready for products, profiles, presentations and social media."
      features={[
        { title: "100% On-Device AI", desc: "Powered by ONNX WebAssembly - runs entirely in your browser. No uploads, no server, no API key." },
        { title: "Drag & Drop Upload", desc: "Drop your image or click to browse. PNG, JPG, JPEG and WEBP supported." },
        { title: "Before / After Preview", desc: "Compare the original and result side by side before downloading." },
        { title: "Transparent Background", desc: "Output is always a clean transparent PNG ready for design tools." },
        { title: "Background Color Replace", desc: "Optionally fill the removed background with white, black or a custom color." },
        { title: "Completely Private", desc: "Your image never leaves your device - processed locally with no data sent anywhere." },
      ]}
      howTo={[
        "Click the upload area or drag and drop your image onto the page.",
        "Check the preview to confirm you selected the right image.",
        "Optionally choose a background fill color if you don't want transparency.",
        "Click Remove Background to start the AI processing.",
        "Once done, click Download PNG to save your image with the background removed.",
      ]}
      faqs={FAQS}
      useCases={[
        { title: "E-commerce sellers", desc: "Create clean white-background product photos for Amazon, Etsy or Shopify." },
        { title: "Designers", desc: "Cut out subjects for mockups, posters and social media content." },
        { title: "Marketers", desc: "Create professional headshots and branded visuals without a studio." },
        { title: "Content creators", desc: "Replace backgrounds for YouTube thumbnails, TikTok and Instagram." },
      ]}
      proTips={[
        "Use images with clear contrast between subject and background for best results.",
        "High-resolution images give sharper edges after removal.",
        "Portrait photos of people consistently produce excellent cutouts.",
        "After removal, add a solid color background for a clean studio look.",
      ]}
      examples={[
        { title: "Marketplace listing", desc: "Product on a busy table -> transparent PNG on white for Amazon main image rules." },
        { title: "Profile photo", desc: "Selfie with cluttered room -> cutout for LinkedIn banner composite." },
        { title: "Sticker asset", desc: "Logo PNG with gray backdrop -> transparent file for Slack or Discord emoji." },
      ]}
      mistakes={[
        "Expecting perfect hair on low-contrast backgrounds - fine strands may need touch-up.",
        "Uploading 20 MB RAW files - convert to JPG first; the tool caps at 10 MB.",
        "Downloading JPEG expecting transparency - output is PNG for alpha support.",
      ]}
      privacyNote="Processing runs on your device via WebAssembly. The model files load from a CDN; your image bytes are not uploaded to Sounez."
      whenNotToUse="Skip for multi-person crowd shots, glass reflections, or images you do not have rights to edit."
    >
      {/* Upload zone */}
      {stage === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload image — click or drag and drop"
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); }
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12 text-center transition-colors ${
            dragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/40"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={onFileChange}
          />
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-soft text-primary ring-1 ring-primary/10">
            <Upload className="h-7 w-7" />
          </div>
          <div>
            <p className="text-base font-semibold">Drop your image here, or click to browse</p>
            <p className="mt-1 text-sm text-muted-foreground">
              PNG, JPG, JPEG, WEBP — maximum {MAX_FILE_SIZE_MB} MB
            </p>
          </div>
        </div>
      )}

      {/* Ready / processing / done */}
      {stage !== "idle" && file && (
        <div className="space-y-5">
          {/* Before / after preview */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Original */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Original</p>
              <div className="overflow-hidden rounded-xl border border-border">
                {preview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt="Original" className="h-48 w-full object-contain" />
                )}
              </div>
            </div>
            {/* Result */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Result</p>
              <div
                className="flex h-48 items-center justify-center overflow-hidden rounded-xl border border-border"
                style={{
                  background:
                    stage === "done"
                      ? bgColor === "transparent"
                        ? CHECKERBOARD
                        : resolvedBg
                      : undefined,
                  backgroundColor: stage === "done" ? undefined : "var(--muted)",
                }}
              >
                {stage === "ready" && (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="h-8 w-8" />
                    <span className="text-xs">Result will appear here</span>
                  </div>
                )}

                {stage === "processing" && (
                  <div className="flex w-full flex-col items-center justify-center gap-3 px-6 py-4">
                    <Loader2 className="h-7 w-7 animate-spin text-primary" />
                    <span className="text-center text-xs text-muted-foreground">{processingStep}</span>
                    {/* Progress bar */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-1.5 rounded-full bg-primary transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground/70">{progress}%</span>
                    {slowWarning && (
                      <p className="text-center text-xs text-muted-foreground/60">
                        Still working — large images or first-time model loading can take longer.
                      </p>
                    )}
                  </div>
                )}

                {stage === "done" && resultUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resultUrl} alt="Background removed" className="h-full w-full object-contain" />
                )}

                {stage === "error" && (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                    <span className="px-4 text-center text-xs">Processing failed</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* File info */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <ImageIcon className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate text-sm font-medium">{file.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {fmtSize(file.size)}
                {imageDimensions && (
                  <span className="ml-1.5 opacity-70">{imageDimensions.w}&thinsp;×&thinsp;{imageDimensions.h}</span>
                )}
              </span>
            </div>
            {stage === "ready" && (
              <button
                type="button"
                onClick={reset}
                className="ml-2 shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Background color option — visible when ready or done */}
          {(stage === "ready" || stage === "done") && (
            <div className="space-y-2 rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold">Background fill</p>
              <div className="flex flex-wrap gap-2">
                {(["transparent", "white", "black", "custom"] as BgColor[]).map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setBgColor(opt)}
                    aria-pressed={bgColor === opt}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition ${
                      bgColor === opt
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {opt === "transparent" ? "Transparent" : opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
                {bgColor === "custom" && (
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="h-8 w-14 cursor-pointer rounded-lg border border-border bg-card"
                    aria-label="Custom background color"
                  />
                )}
              </div>
            </div>
          )}

          {/* Remove button — only in ready stage */}
          {stage === "ready" && (
            <button
              type="button"
              onClick={removeBackground}
              disabled={isProcessing}
              className="w-full rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
            >
              Remove Background
            </button>
          )}

          {/* Processing hint below the preview panels */}
          {stage === "processing" && (
            <div className="rounded-xl border border-border bg-card px-4 py-3 text-xs text-muted-foreground">
              Processing on your device — the AI model may take a moment to load for the first time.
            </div>
          )}

          {/* Error state */}
          {stage === "error" && (
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div className="text-sm">
                  <p className="font-semibold text-destructive">Unable to remove background</p>
                  <p className="mt-1 text-muted-foreground">{errorMsg}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStage("ready")}
                className="w-full rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:opacity-90 active:scale-95"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium hover:bg-muted"
              >
                <RotateCcw className="h-4 w-4" /> Try another image
              </button>
            </div>
          )}

          {/* Done state */}
          {stage === "done" && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={downloadResult}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:opacity-90 active:scale-95"
              >
                <Download className="h-4 w-4" /> Download PNG
              </button>
              <button
                type="button"
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium hover:bg-muted"
              >
                <RotateCcw className="h-4 w-4" /> Try another image
              </button>
            </div>
          )}
        </div>
      )}

      {/* Privacy notice */}
      <div className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
        <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <span>
          Your image is processed entirely in your browser using on-device AI — it never leaves your device.
        </span>
      </div>
    </ToolPageShell>
  );
}
