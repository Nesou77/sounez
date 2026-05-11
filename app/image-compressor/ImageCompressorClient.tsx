"use client";

import { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { Upload, Download, ChevronDown, X } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";

const tool = toolBySlug("image-compressor")!;

function fmt(b: number) {
  return b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(2)} MB` : `${(b / 1024).toFixed(0)} KB`;
}

export function ImageCompressorClient() {
  const [open, setOpen] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [out, setOut] = useState<{ url: string; size: number; name: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [quality, setQuality] = useState(0.7);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = (f: File) => { setFile(f); setOut(null); toast.success("Image uploaded successfully"); };
  const compress = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const blob = await imageCompression(file, { maxSizeMB: file.size / 1024 / 1024 * quality, maxWidthOrHeight: 1920, useWebWorker: true, initialQuality: quality });
      setOut({ url: URL.createObjectURL(blob), size: blob.size, name: file.name.replace(/\.(\w+)$/, "-compressed.$1") });
      toast.success("Image compressed", { description: `Saved ${Math.round(((file.size - blob.size) / file.size) * 100)}%` });
    } catch {
      toast.error("Compression failed. Try another image.");
    } finally { setBusy(false); }
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Compress JPG and PNG images right in your browser. Your files never leave your device and nothing gets uploaded."
      features={[
        { title: "Fully private", desc: "Compression runs locally in your browser. No server, no upload." },
        { title: "Quality slider", desc: "Drag the slider to find the right balance between file size and quality." },
        { title: "Instant download", desc: "Save the compressed file with one click." },
      ]}
      howTo={["Click Upload Image to open the panel.", "Drag and drop your file or click Choose File.", "Adjust the quality slider, click Compress, then Download."]}
      faqs={[
        { q: "What formats are supported?", a: "JPG, PNG and WebP." },
        { q: "Is there a file size limit?", a: "It depends on your browser's available memory. It works well for most images up to around 25 MB." },
      ]}
    >
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm font-semibold">
        <span className="flex items-center gap-2"><Upload className="h-4 w-4" /> Upload Image</span>
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="mt-3 rounded-2xl border border-border bg-background p-5 shadow-soft">
          <div
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
            className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition ${drag ? "border-primary bg-primary-soft" : "border-border bg-muted/30"}`}
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">Drag &amp; drop your image here</p>
            <p className="text-xs text-muted-foreground">or</p>
            <button onClick={() => inputRef.current?.click()} className="mt-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-pop">Choose File</button>
            <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && handle(e.target.files[0])} />
          </div>

          {file && (
            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={URL.createObjectURL(file)} alt={file.name} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="truncate text-sm font-medium">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{fmt(file.size)}</div>
                </div>
                <button onClick={() => { setFile(null); setOut(null); }} className="rounded-lg p-2 hover:bg-muted"><X className="h-4 w-4" /></button>
              </div>
              <label className="block text-sm">Quality: {Math.round(quality * 100)}%
                <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(+e.target.value)} className="mt-2 w-full accent-primary" />
              </label>
              <button onClick={compress} disabled={busy} className="w-full rounded-xl bg-gradient-brand px-4 py-3 text-sm font-semibold text-primary-foreground shadow-pop disabled:opacity-60">
                {busy ? "Compressing…" : "Compress Image"}
              </button>
            </div>
          )}

          {out && (
            <div className="mt-5 rounded-xl border border-primary/30 bg-primary-soft p-4">
              <div className="text-sm font-medium">Done! Saved {fmt(file!.size - out.size)} ({Math.round(((file!.size - out.size) / file!.size) * 100)}%)</div>
              <div className="mt-1 text-xs text-muted-foreground">New size: {fmt(out.size)}</div>
              <a href={out.url} download={out.name} onClick={() => toast.success("Download started")} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background transition active:scale-95">
                <Download className="h-4 w-4" /> Download
              </a>
            </div>
          )}
        </div>
      )}
    </ToolPageShell>
  );
}
