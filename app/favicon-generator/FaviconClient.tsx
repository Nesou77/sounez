"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Copy, Download, Upload } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";

const tool = toolBySlug("favicon-generator")!;

type Mode = "text" | "emoji" | "image";
type Shape = "square" | "rounded" | "circle";
type FavSize = 16 | 32 | 48 | 180 | 512;

const SIZES: FavSize[] = [16, 32, 48, 180, 512];

export function FaviconClient() {
  const [mode, setMode] = useState<Mode>("text");
  const [input, setInput] = useState("S");
  const [bgColor, setBgColor] = useState("#6366f1");
  const [fgColor, setFgColor] = useState("#ffffff");
  const [shape, setShape] = useState<Shape>("rounded");
  const [size, setSize] = useState<FavSize>(32);
  const [uploadedImg, setUploadedImg] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);

    // Clip shape
    ctx.save();
    if (shape === "circle") {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();
    } else if (shape === "rounded") {
      const r = size * 0.2;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(size - r, 0);
      ctx.quadraticCurveTo(size, 0, size, r);
      ctx.lineTo(size, size - r);
      ctx.quadraticCurveTo(size, size, size - r, size);
      ctx.lineTo(r, size);
      ctx.quadraticCurveTo(0, size, 0, size - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath();
      ctx.clip();
    }

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    if (mode === "image" && uploadedImg) {
      ctx.drawImage(uploadedImg, 0, 0, size, size);
    } else {
      const text = mode === "emoji" ? input : (input.trim().charAt(0) || "?");
      const fontSize = size * 0.55;
      ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
      ctx.fillStyle = fgColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, size / 2, size / 2 + size * 0.03);
    }

    ctx.restore();
  }, [mode, input, bgColor, fgColor, shape, size, uploadedImg]);

  useEffect(() => { draw(); }, [draw]);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    const img = new window.Image();
    img.onload = () => { setUploadedImg(img); };
    img.src = URL.createObjectURL(file);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = `favicon-${size}x${size}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
    toast.success(`favicon-${size}x${size}.png downloaded`);
  };

  const copySnippet = () => {
    const snippet = `<link rel="icon" type="image/png" href="/favicon.png" />\n<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`;
    navigator.clipboard.writeText(snippet);
    toast.success("HTML snippet copied");
  };

  const inputLabel = mode === "text" ? "Letter or character" : mode === "emoji" ? "Emoji" : "Uploaded image";

  return (
    <ToolPageShell
      tool={tool}
      intro="Create a simple favicon for your website from text, emoji, colors or an image. Everything runs in your browser."
      features={[
        { title: "Text, emoji or image", desc: "Start from a letter, emoji or uploaded image." },
        { title: "Multiple sizes", desc: "Export common favicon sizes for websites and apps." },
        { title: "Private by design", desc: "Your image is processed locally in your browser." },
      ]}
      howTo={[
        "Choose text, emoji or image mode.",
        "Customize colors, shape and size.",
        "Download your favicon and copy the HTML snippet.",
      ]}
      faqs={[
        { q: "What is a favicon?", a: "A favicon is the small icon shown in browser tabs, bookmarks and search results." },
        { q: "Does this upload my image?", a: "No. The favicon is generated locally in your browser using the Canvas API." },
        { q: "Can I use PNG instead of ICO?", a: "Yes. Modern browsers support PNG favicons. The HTML snippet uses PNG format." },
      ]}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4 text-sm">
          {/* Mode */}
          <div>
            <p className="mb-2 font-medium">Mode</p>
            <div className="flex gap-2">
              {(["text", "emoji", "image"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize transition ${
                    mode === m
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          {mode !== "image" ? (
            <div>
              <label htmlFor="fav-input" className="mb-1.5 block font-medium">{inputLabel}</label>
              <input
                id="fav-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={mode === "text" ? 2 : 4}
                placeholder={mode === "text" ? "S" : "🚀"}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          ) : (
            <div>
              <p className="mb-1.5 font-medium">Upload image</p>
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-xs font-medium transition hover:border-primary/50"
              >
                <Upload className="h-4 w-4" /> Choose image
              </button>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
            </div>
          )}

          {/* Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="fav-bg" className="mb-1.5 block font-medium">Background</label>
              <input id="fav-bg" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-10 w-full rounded-lg border border-border cursor-pointer" />
            </div>
            {mode !== "image" && (
              <div>
                <label htmlFor="fav-fg" className="mb-1.5 block font-medium">Text / icon color</label>
                <input id="fav-fg" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-10 w-full rounded-lg border border-border cursor-pointer" />
              </div>
            )}
          </div>

          {/* Shape */}
          <div>
            <p className="mb-2 font-medium">Shape</p>
            <div className="flex gap-2">
              {(["square", "rounded", "circle"] as Shape[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize transition ${
                    shape === s
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <p className="mb-2 font-medium">Export size</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                    size === s
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  {s}×{s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview + actions */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preview</p>
            {/* Show at 128px regardless of export size */}
            <div className="flex items-center justify-center rounded-2xl border border-border bg-muted/30 p-8">
              <canvas
                ref={canvasRef}
                style={{ width: 128, height: 128, imageRendering: "pixelated" }}
                className="rounded"
              />
            </div>
            <p className="text-xs text-muted-foreground">Export: {size}×{size}px PNG</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={download}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95"
            >
              <Download className="h-4 w-4" /> Download PNG
            </button>
            <button
              onClick={copySnippet}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold transition hover:bg-muted active:scale-95"
            >
              <Copy className="h-4 w-4" /> Copy HTML snippet
            </button>
          </div>

          <pre className="w-full overflow-x-auto rounded-xl bg-muted/60 p-3 text-xs leading-relaxed">
            <code>{`<link rel="icon" type="image/png"\n  href="/favicon.png" />\n<link rel="apple-touch-icon"\n  href="/apple-touch-icon.png" />`}</code>
          </pre>
        </div>
      </div>
    </ToolPageShell>
  );
}
