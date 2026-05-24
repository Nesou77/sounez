"use client";

import { useCallback, useRef, useState } from "react";
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

const FAQS = [
  {
    q: "How does AI background removal work?",
    a: "The AI model analyses the image to identify the foreground subject (person, product, object) and separates it from the background. The result is a transparent PNG with only the subject remaining.",
  },
  {
    q: "Is my image sent to a server?",
    a: "Yes. Your image is sent securely over HTTPS, processed, and immediately deleted. We do not store your images.",
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
  const inputRef = useRef<HTMLInputElement>(null);

  useToolView(tool);

  const accept = (f: File) => {
    if (!isAcceptedImage(f)) {
      toast.error("Please upload a PNG, JPG, JPEG or WEBP image.");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      toast.error(`File too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    setStage("ready");
  };

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
  }, []);

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setPreview(null);
    setResultUrl(null);
    setStage("idle");
    setErrorMsg("");
  };

  const removeBackground = async () => {
    if (!file) return;
    setStage("processing");
    setResultUrl(null);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/background-remove", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data as { error?: string })?.error || "Something went wrong. Please try again.");
        setStage("error");
        return;
      }

      // Response is a PNG binary
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStage("done");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStage("error");
    }
  };

  const downloadResult = () => {
    if (!resultUrl) return;

    // If a background color is selected, composite onto a canvas before downloading
    if (bgColor !== "transparent") {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Fill background
        ctx.fillStyle = resolvedBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (!blob) return;
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "background-removed.png";
          a.click();
        }, "image/png");
      };
      img.src = resultUrl;
    } else {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "background-removed.png";
      a.click();
    }
  };

  const resolvedBg =
    bgColor === "transparent" ? "transparent"
    : bgColor === "white" ? "#ffffff"
    : bgColor === "black" ? "#000000"
    : customColor;

  return (
    <ToolPageShell
      tool={tool}
      intro="Remove image backgrounds automatically with AI. Upload a photo and get a clean transparent PNG ready for products, profiles, presentations and social media."
      features={[
        { title: "AI-Powered Removal", desc: "Deep learning model precisely separates foreground subjects from any background." },
        { title: "Drag & Drop Upload", desc: "Drop your image or click to browse. PNG, JPG, JPEG and WEBP supported." },
        { title: "Before / After Preview", desc: "Compare the original and result side by side before downloading." },
        { title: "Transparent Background", desc: "Output is always a clean transparent PNG ready for design tools." },
        { title: "Background Color Replace", desc: "Optionally fill the removed background with white, black or a custom color." },
        { title: "Privacy First", desc: "Images are processed securely and deleted immediately after download." },
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
    >
      {/* Upload zone */}
      {stage === "idle" && (
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
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
          {/* Image preview */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Original */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Original</p>
              <div className="overflow-hidden rounded-xl border border-border">
                {preview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview}
                    alt="Original"
                    className="h-48 w-full object-contain"
                  />
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
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                )}
                {stage === "done" && resultUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resultUrl}
                    alt="Background removed"
                    className="h-full w-full object-contain"
                  />
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
            <div className="flex items-center gap-2 min-w-0">
              <ImageIcon className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate text-sm font-medium">{file.name}</span>
              <span className="text-xs text-muted-foreground">{fmtSize(file.size)}</span>
            </div>
            {stage === "ready" && (
              <button
                onClick={reset}
                className="ml-2 shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Background color option */}
          {(stage === "ready" || stage === "done") && (
            <div className="space-y-2 rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold">Background fill</p>
              <div className="flex flex-wrap gap-2">
                {(["transparent", "white", "black", "custom"] as BgColor[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setBgColor(opt)}
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

          {/* Remove button */}
          {stage === "ready" && (
            <button
              onClick={removeBackground}
              className="w-full rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:opacity-90 active:scale-95"
            >
              Remove Background
            </button>
          )}

          {/* Error */}
          {stage === "error" && (
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div className="text-sm">
                  <p className="font-semibold text-destructive">Processing failed</p>
                  <p className="mt-1 text-muted-foreground">{errorMsg}</p>
                </div>
              </div>
              <button
                onClick={() => setStage("ready")}
                className="w-full rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:opacity-90 active:scale-95"
              >
                Try Again
              </button>
              <button
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium hover:bg-muted"
              >
                <RotateCcw className="h-4 w-4" /> Try another image
              </button>
            </div>
          )}

          {/* Done */}
          {stage === "done" && (
            <div className="space-y-3">
              <button
                onClick={downloadResult}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:opacity-90 active:scale-95"
              >
                <Download className="h-4 w-4" /> Download PNG
              </button>
              <button
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
          Your image is processed securely. Files are never stored on our servers after processing.
        </span>
      </div>
    </ToolPageShell>
  );
}
