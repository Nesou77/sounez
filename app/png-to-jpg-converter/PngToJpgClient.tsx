"use client";

import { useCallback, useRef, useState } from "react";
import { Download, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";

const tool = toolBySlug("png-to-jpg-converter")!;

function fmt(bytes: number) {
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(2)} MB`
    : `${(bytes / 1024).toFixed(0)} KB`;
}

type Result = { url: string; size: number; filename: string };

export function PngToJpgClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(90);
  const [result, setResult] = useState<Result | null>(null);
  const [converting, setConverting] = useState(false);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevResultUrl = useRef<string | null>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/png")) {
      toast.error("Please drop a PNG file");
      return;
    }
    // Revoke old result URL
    if (prevResultUrl.current) {
      URL.revokeObjectURL(prevResultUrl.current);
      prevResultUrl.current = null;
    }
    setResult(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
    toast.success("PNG loaded — adjust quality and convert");
  };

  const convert = useCallback(() => {
    if (!file) return;
    setConverting(true);

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("Canvas not supported in this browser");
        setConverting(false);
        return;
      }
      // Fill white background (JPG has no transparency)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            toast.error("Conversion failed. Please try another file.");
            setConverting(false);
            return;
          }
          // Revoke previous result URL
          if (prevResultUrl.current) {
            URL.revokeObjectURL(prevResultUrl.current);
          }
          const url = URL.createObjectURL(blob);
          prevResultUrl.current = url;
          const filename = file.name.replace(/\.png$/i, ".jpg");
          setResult({ url, size: blob.size, filename });
          setConverting(false);
          toast.success("Conversion complete — ready to download");
        },
        "image/jpeg",
        quality / 100,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      toast.error("Could not load the image. Please try another file.");
      setConverting(false);
    };
    img.src = objectUrl;
  }, [file, quality]);

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (prevResultUrl.current) URL.revokeObjectURL(prevResultUrl.current);
    prevResultUrl.current = null;
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Drop a PNG and convert it to JPG right in your browser. Runs entirely client-side — your images never leave your device."
      features={[
        {
          title: "Quality control",
          desc: "Slide to pick the perfect balance between file size and clarity.",
        },
        {
          title: "Handles transparency",
          desc: "Transparent backgrounds are filled with white — the JPG standard.",
        },
        {
          title: "Private by design",
          desc: "No upload to any server. Processing happens in your browser.",
        },
      ]}
      howTo={[
        "Drop your PNG file onto the upload area.",
        "Adjust the quality slider if needed.",
        "Click Convert, then Download JPG to save the converted file.",
      ]}
      faqs={[
        {
          q: "Will transparent areas be preserved?",
          a: "No. JPG does not support transparency. Transparent areas are replaced with a white background.",
        },
        {
          q: "What is the maximum file size?",
          a: "There is no enforced limit, but very large files may be slow depending on your device.",
        },
        {
          q: "Does this upload my images?",
          a: "Never. The entire conversion happens inside your browser using the Canvas API.",
        },
      ]}
    >
      {!file ? (
        /* ── Drop zone ── */
        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            const f = e.dataTransfer.files[0];
            if (f) handleFile(f);
          }}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-12 text-center transition ${
            drag ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:border-primary/50"
          }`}
          role="button"
          aria-label="Upload PNG file"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        >
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="font-semibold">Drop your PNG here</p>
            <p className="text-sm text-muted-foreground">or click to browse</p>
          </div>
          <p className="text-xs text-muted-foreground">PNG files only</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/png"
            hidden
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-5">
          {/* File info + remove */}
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt={file.name} className="h-14 w-14 rounded-lg object-cover border border-border" />
            )}
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{fmt(file.size)}</p>
            </div>
            <button
              onClick={reset}
              className="rounded-lg p-2 transition hover:bg-muted"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quality slider */}
          <div>
            <label htmlFor="jpg-quality" className="mb-1.5 block text-sm font-medium">
              Quality: {quality}%
            </label>
            <input
              id="jpg-quality"
              type="range"
              min={1}
              max={100}
              value={quality}
              onChange={(e) => { setQuality(Number(e.target.value)); setResult(null); }}
              className="w-full accent-primary"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Smaller file</span>
              <span>Best quality</span>
            </div>
          </div>

          {/* Convert button */}
          <button
            onClick={convert}
            disabled={converting}
            className="flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {converting ? "Converting…" : "Convert to JPG"}
          </button>

          {/* Before / after comparison */}
          {result && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Original PNG</p>
                  <p className="font-medium">{fmt(file.size)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Converted JPG</p>
                  <p className="font-medium">{fmt(result.size)}</p>
                  {result.size < file.size && (
                    <p className="text-xs text-emerald-600 font-medium">
                      −{Math.round(((file.size - result.size) / file.size) * 100)}% smaller
                    </p>
                  )}
                </div>
              </div>

              {/* Preview comparison */}
              <div className="grid grid-cols-2 gap-3">
                {preview && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Before</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Original PNG" className="w-full rounded-lg border border-border object-contain max-h-40" />
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">After</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={result.url} alt="Converted JPG" className="w-full rounded-lg border border-border object-contain max-h-40" />
                </div>
              </div>

              <a
                href={result.url}
                download={result.filename}
                onClick={() => toast.success("Download started")}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:-translate-y-0.5 active:scale-95"
              >
                <Download className="h-4 w-4" />
                Download JPG
              </a>
            </div>
          )}
        </div>
      )}
    </ToolPageShell>
  );
}
