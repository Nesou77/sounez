"use client";

import { useCallback, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import {
  Upload, Download, X, ChevronDown, Shield,
  Loader2, CheckCircle2, AlertCircle, Archive, Settings2,
} from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackDownloadResult } from "@/lib/analytics";

/* ── helpers ── */

function fmt(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
}

function savingsPct(orig: number, compressed: number) {
  return Math.round(((orig - compressed) / orig) * 100);
}

function savingsColor(pct: number) {
  if (pct >= 50) return "text-emerald-600 dark:text-emerald-400";
  if (pct >= 20) return "text-lime-600 dark:text-lime-400";
  return "text-amber-600 dark:text-amber-400";
}

type OutputFormat = "original" | "image/jpeg" | "image/png" | "image/webp";

const FORMAT_EXT: Record<OutputFormat, string> = {
  original: "",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function buildOutputName(original: string, format: OutputFormat): string {
  const ext =
    format === "original"
      ? (original.split(".").pop() ?? "jpg")
      : FORMAT_EXT[format];
  return original.replace(/\.[^.]+$/, `-compressed.${ext}`);
}

/* ── Pure-JS ZIP builder (store-only, no compression needed for images) ── */

let _crcTable: Uint32Array | null = null;
function getCrcTable(): Uint32Array {
  if (_crcTable) return _crcTable;
  _crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    _crcTable[n] = c;
  }
  return _crcTable;
}
function crc32(data: Uint8Array): number {
  const t = getCrcTable();
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) crc = (crc >>> 8) ^ t[(crc ^ data[i]) & 0xff];
  return (crc ^ 0xffffffff) >>> 0;
}
function u16le(n: number): [number, number] { return [n & 0xff, (n >> 8) & 0xff]; }
function u32le(n: number): [number, number, number, number] {
  return [n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >> 24) & 0xff];
}

async function buildZip(files: Array<{ name: string; blob: Blob }>): Promise<Blob> {
  const enc = new TextEncoder();
  const localParts: Uint8Array<ArrayBuffer>[] = [];
  const centralParts: Uint8Array<ArrayBuffer>[] = [];
  let localOffset = 0;

  for (const file of files) {
    const nameBytes = enc.encode(file.name);
    const data = new Uint8Array(await file.blob.arrayBuffer() as ArrayBuffer);
    const crc = crc32(data);
    const size = data.length;

    const local = new Uint8Array(30 + nameBytes.length);
    local.set([
      0x50, 0x4b, 0x03, 0x04, ...u16le(20), ...u16le(0), ...u16le(0),
      ...u16le(0), ...u16le(0), ...u32le(crc), ...u32le(size), ...u32le(size),
      ...u16le(nameBytes.length), ...u16le(0),
    ]);
    local.set(nameBytes, 30);

    const central = new Uint8Array(46 + nameBytes.length);
    central.set([
      0x50, 0x4b, 0x01, 0x02, ...u16le(20), ...u16le(20), ...u16le(0), ...u16le(0),
      ...u16le(0), ...u16le(0), ...u32le(crc), ...u32le(size), ...u32le(size),
      ...u16le(nameBytes.length), ...u16le(0), ...u16le(0), ...u16le(0), ...u16le(0),
      ...u32le(0), ...u32le(localOffset),
    ]);
    central.set(nameBytes, 46);

    localParts.push(local, data);
    centralParts.push(central);
    localOffset += local.length + data.length;
  }

  const centralSize = centralParts.reduce((s, p) => s + p.length, 0);
  const eocd = new Uint8Array(22);
  eocd.set([
    0x50, 0x4b, 0x05, 0x06, ...u16le(0), ...u16le(0),
    ...u16le(files.length), ...u16le(files.length),
    ...u32le(centralSize), ...u32le(localOffset), ...u16le(0),
  ]);

  return new Blob([...localParts, ...centralParts, eocd], { type: "application/zip" });
}

/* ── types ── */

type Status = "idle" | "compressing" | "done" | "error";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  status: Status;
  outUrl?: string;
  outSize?: number;
  outName?: string;
  outBlob?: Blob;
}

const MAX_FILES = 20;

/* ── component ── */

export function ImageCompressorClient({ tool }: { tool: Tool }) {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [quality, setQuality] = useState(0.75);
  const [format, setFormat] = useState<OutputFormat>("original");
  const [maxDim, setMaxDim] = useState(1920);
  const [drag, setDrag] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useToolView(tool);

  const addFiles = useCallback((fileList: FileList | File[]) => {
    const accepted = Array.from(fileList).filter((f) =>
      ["image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp"].includes(f.type),
    );
    const rejected = Array.from(fileList).length - accepted.length;
    if (rejected > 0) toast.error(`${rejected} file(s) skipped. Only JPG, PNG, WebP supported.`);
    if (accepted.length === 0) return;

    setItems((prev) => {
      const combined = [
        ...prev,
        ...accepted.slice(0, Math.max(0, MAX_FILES - prev.length)).map((f) => ({
          id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
          file: f,
          previewUrl: URL.createObjectURL(f),
          status: "idle" as Status,
        })),
      ];
      if (prev.length + accepted.length > MAX_FILES) {
        toast.error(`Max ${MAX_FILES} images at a time. Extra files were skipped.`);
      }
      return combined;
    });
  }, []);

  const compressOne = useCallback(
    async (item: ImageItem): Promise<ImageItem> => {
      try {
        const targetMb = (item.file.size / 1024 / 1024) * quality;
        const outputType = format === "original" ? item.file.type : format;
        const blob = await imageCompression(item.file, {
          maxSizeMB: Math.max(targetMb, 0.02),
          maxWidthOrHeight: maxDim,
          useWebWorker: true,
          initialQuality: quality,
          fileType: outputType as string,
        });
        const outName = buildOutputName(item.file.name, format);
        return {
          ...item,
          status: "done",
          outUrl: URL.createObjectURL(blob),
          outSize: blob.size,
          outName,
          outBlob: blob,
        };
      } catch {
        return { ...item, status: "error" };
      }
    },
    [quality, format, maxDim],
  );

  const compressAll = async () => {
    const toProcess = items.filter((it) => it.status === "idle" || it.status === "error");
    if (toProcess.length === 0) return;
    setProcessing(true);

    setItems((prev) =>
      prev.map((it) =>
        toProcess.some((t) => t.id === it.id) ? { ...it, status: "compressing" } : it,
      ),
    );

    const results = await Promise.all(toProcess.map(compressOne));

    setItems((prev) =>
      prev.map((it) => {
        const r = results.find((res) => res.id === it.id);
        return r ?? it;
      }),
    );

    const doneCount = results.filter((r) => r.status === "done").length;
    const errCount = results.filter((r) => r.status === "error").length;
    if (doneCount > 0) {
      toast.success(
        doneCount === 1
          ? "Image compressed successfully"
          : `${doneCount} images compressed`,
        errCount > 0 ? { description: `${errCount} failed` } : undefined,
      );
      trackToolComplete({
        tool_slug: tool.slug,
        tool_name: tool.name,
        tool_category: tool.category,
        output_type: "compressed_image",
      });
    } else if (errCount > 0) {
      toast.error("Compression failed. Try adjusting quality or format.");
    }
    setProcessing(false);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const item = prev.find((it) => it.id === id);
      if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
      if (item?.outUrl) URL.revokeObjectURL(item.outUrl);
      return prev.filter((it) => it.id !== id);
    });
  };

  const clearAll = () => {
    items.forEach((it) => {
      if (it.previewUrl) URL.revokeObjectURL(it.previewUrl);
      if (it.outUrl) URL.revokeObjectURL(it.outUrl);
    });
    setItems([]);
  };

  const downloadZip = async () => {
    const done = items.filter((it) => it.status === "done" && it.outBlob && it.outName);
    if (done.length === 0) return;
    toast.loading("Building ZIP…", { id: "zip" });
    try {
      const zip = await buildZip(done.map((it) => ({ name: it.outName!, blob: it.outBlob! })));
      const url = URL.createObjectURL(zip);
      const a = document.createElement("a");
      a.href = url;
      a.download = "compressed-images.zip";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("ZIP downloaded", { id: "zip" });
      trackDownloadResult({ tool_slug: tool.slug, result_type: "compressed_images_zip", file_type: "zip" });
    } catch {
      toast.error("Could not build ZIP", { id: "zip" });
    }
  };

  const doneItems = items.filter((it) => it.status === "done");
  const hasIdle = items.some((it) => it.status === "idle" || it.status === "error");
  const allDone = items.length > 0 && items.every((it) => it.status === "done");

  return (
    <ToolPageShell
      tool={tool}
      intro="Compress JPG, PNG and WebP images in your browser. Batch up to 20 files, tune quality, convert formats, resize, and download individually or as a ZIP."
      features={[
        {
          title: "Fully private",
          desc: "All compression runs in your browser using a web worker. Your images are never sent to any server.",
        },
        {
          title: "Batch compression",
          desc: "Add up to 20 images at once and compress them all in one click. Download individually or as a ZIP.",
        },
        {
          title: "Quality control",
          desc: "A simple slider lets you find the right balance between file size and visual quality before you compress.",
        },
        {
          title: "Format conversion",
          desc: "Convert JPG to WebP, PNG to JPG, or any combination. WebP often gives the smallest file for the same quality.",
        },
        {
          title: "Resize on compress",
          desc: "Set a maximum width or height to resize images while compressing. Useful before uploading to a CMS or blog.",
        },
        {
          title: "ZIP download",
          desc: "When compressing multiple images, download all the results as a single ZIP file in one click.",
        },
        {
          title: "No account needed",
          desc: "Free to use with fair-use limits. No signup or watermark on downloads.",
        },
      ]}
      examples={[
        { title: "Blog hero image", desc: "A 2.4 MB JPEG at 82% quality often drops under 400 KB - enough for fast LCP without visible blur." },
        { title: "Shopify product grid", desc: "Batch 12 PNGs, convert to WebP at 75%, and ZIP download for a bulk CMS upload." },
        { title: "Email newsletter", desc: "Resize to max width 1200px while compressing so images stay sharp but under attachment limits." },
      ]}
      mistakes={[
        "Setting quality below 50% on photos with fine detail (faces, hair) - artifacts become obvious.",
        "Converting logos with transparency to JPEG - you will lose the alpha channel.",
        "Compressing the same file repeatedly at low quality - each pass adds more loss.",
      ]}
      privacyNote="Compression runs locally in your browser via a web worker. Images are not uploaded to Sounez servers."
      whenNotToUse="Skip this tool for RAW camera files, animated GIFs, or print-ready CMYK assets - use dedicated software for those workflows."
      howTo={[
        "Drop your images onto the upload zone or click Choose Files to select up to 20 JPG, PNG, or WebP files.",
        "Adjust the Quality slider. Lower values give smaller files; higher values keep more detail.",
        "Open Advanced settings if you want to convert the format or set a maximum image dimension.",
        "Click Compress Images. Each image is processed separately in your browser.",
        "Download each image individually or use Download all as ZIP when batch compressing.",
      ]}
      faqs={[
        {
          q: "What image formats does this compressor support?",
          a: "You can upload JPG, PNG, and WebP images. You can also convert between these formats using the Format option in Advanced settings.",
        },
        {
          q: "Is there a file size limit per image?",
          a: "There is no hard limit, but very large files (above 30 MB) may be slow depending on your device's memory. Most images up to 25 MB work without issues.",
        },
        {
          q: "Are my images uploaded to a server?",
          a: "No. Every image is processed entirely inside your browser using a web worker. Nothing is sent to any external server, and the files are not stored anywhere.",
        },
        {
          q: "How much can I reduce image file size?",
          a: "It depends on the original file and your quality setting. A quality of 75% typically reduces a JPEG by 40 to 70% with no visible change. PNG files often compress more modestly because they are already losslessly encoded.",
        },
        {
          q: "What quality level should I use for websites?",
          a: "For most web images, a quality setting between 70% and 80% gives a good balance of file size and sharpness. For hero images or photos where detail matters, 80% to 85% is a safer choice.",
        },
        {
          q: "Can I compress PNG images?",
          a: "Yes. PNG compression in this tool re-encodes the image with reduced colour data. For the smallest PNG file, try converting to WebP instead, which typically produces smaller files than PNG at the same quality.",
        },
        {
          q: "What is WebP and should I use it?",
          a: "WebP is a modern image format developed by Google. It produces smaller files than JPG and PNG at similar quality, and is supported by all current browsers. If your platform accepts WebP, it is usually the best choice for web images.",
        },
        {
          q: "Can I compress more than one image at a time?",
          a: "Yes. Select or drag in up to 20 images, then click Compress Images to process them all at once. You can download each result separately or use the Download all as ZIP button.",
        },
      ]}
      useCases={[
        {
          title: "Web developers",
          desc: "Reduce image payloads before pushing to production. Smaller images can improve load time and user experience.",
        },
        {
          title: "Bloggers and writers",
          desc: "Shrink photos before uploading to WordPress, Ghost, or any CMS to keep your site fast and storage lean.",
        },
        {
          title: "eCommerce sellers",
          desc: "Compress product photos so your Shopify or WooCommerce store loads quickly on mobile without losing image clarity.",
        },
        {
          title: "Social media creators",
          desc: "Prepare images for Instagram, Pinterest, or LinkedIn posts. Smaller files upload faster and still look sharp.",
        },
      ]}
      proTips={[
        "WebP is usually 25 to 35% smaller than JPG at the same quality. Convert if your platform supports it.",
        "If the compressed result looks blurry, increase quality to 80% and try again.",
        "For product photos on a white background, converting PNG to JPG at 85% quality often halves the file size.",
        "Use the max-dimension resize option before uploading to avoid scaling issues in your CMS.",
        "You can add more images without clearing the ones already done. Mix and match formats in one batch.",
      ]}
    >
      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
        }}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition ${
          drag ? "border-primary bg-primary/5" : "border-border bg-muted/20"
        }`}
      >
        <Upload className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
        <p className="mt-3 text-sm font-medium">Drag images here, or</p>
        <button
          onClick={() => inputRef.current?.click()}
          className="mt-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95"
        >
          Choose Files
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
          multiple
          hidden
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <p className="mt-2 text-xs text-muted-foreground">JPG, PNG, WebP up to 20 files</p>

        {/* Privacy badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 dark:bg-emerald-950/30">
          <Shield className="h-3 w-3 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
            Processed in your browser. No upload.
          </span>
        </div>
      </div>

      {items.length > 0 && (
        <div className="mt-5 space-y-5">
          {/* Settings */}
          <div className="space-y-3 rounded-xl border border-border bg-muted/20 p-4">
            <label className="block text-sm font-medium">
              Quality: <span className="font-bold text-foreground">{Math.round(quality * 100)}%</span>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={quality}
                onChange={(e) => setQuality(+e.target.value)}
                className="mt-2 w-full accent-primary"
                aria-label={`Compression quality: ${Math.round(quality * 100)}%`}
              />
              <span className="mt-0.5 flex justify-between text-xs text-muted-foreground">
                <span>Smallest file</span>
                <span>Best quality</span>
              </span>
            </label>

            {/* Advanced settings */}
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              aria-expanded={showAdvanced}
            >
              <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
              Advanced settings
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {showAdvanced && (
              <div className="grid gap-4 border-t border-border pt-3 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium">
                    Output format
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value as OutputFormat)}
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    >
                      <option value="original">Keep original format</option>
                      <option value="image/jpeg">Convert to JPG</option>
                      <option value="image/png">Convert to PNG</option>
                      <option value="image/webp">Convert to WebP</option>
                    </select>
                  </label>
                  <p className="mt-1 text-xs text-muted-foreground">WebP is smallest for most photos.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Max dimension: <strong>{maxDim}px</strong>
                    <input
                      type="range"
                      min={320}
                      max={4096}
                      step={160}
                      value={maxDim}
                      onChange={(e) => setMaxDim(+e.target.value)}
                      className="mt-1.5 w-full accent-primary"
                      aria-label={`Max image dimension: ${maxDim} pixels`}
                    />
                    <span className="mt-0.5 flex justify-between text-xs text-muted-foreground">
                      <span>320px</span>
                      <span>4096px</span>
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* File list */}
          <ul className="space-y-2" aria-label="Image files">
            {items.map((item) => {
              const pct = item.outSize !== undefined ? savingsPct(item.file.size, item.outSize) : null;
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  {/* Thumbnail */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.previewUrl}
                    alt={item.file.name}
                    className="h-12 w-12 shrink-0 rounded-lg object-cover"
                  />

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{item.file.name}</div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                      <span>{fmt(item.file.size)}</span>
                      {item.outSize !== undefined && (
                        <>
                          <span className="text-muted-foreground/40">to</span>
                          <span>{fmt(item.outSize)}</span>
                          {pct !== null && pct > 0 && (
                            <span className={`font-semibold ${savingsColor(pct)}`}>
                              -{pct}%
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status + download */}
                  <div className="flex shrink-0 items-center gap-1">
                    {item.status === "compressing" && (
                      <Loader2 className="h-4 w-4 animate-spin text-primary" aria-label="Compressing" />
                    )}
                    {item.status === "done" && item.outUrl && (
                      <a
                        href={item.outUrl}
                        download={item.outName}
                        onClick={() =>
                          trackDownloadResult({
                            tool_slug: tool.slug,
                            result_type: "compressed_image",
                            file_type: item.outName?.split(".").pop()?.toLowerCase(),
                          })
                        }
                        className="rounded-lg p-1.5 text-primary hover:bg-primary/10 transition"
                        title="Download compressed image"
                        aria-label={`Download ${item.outName}`}
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                      </a>
                    )}
                    {item.status === "error" && (
                      <AlertCircle className="h-4 w-4 text-destructive" aria-label="Compression failed" />
                    )}
                    {item.status === "done" && item.outUrl && (
                      <a
                        href={item.outUrl}
                        download={item.outName}
                        onClick={() =>
                          trackDownloadResult({
                            tool_slug: tool.slug,
                            result_type: "compressed_image",
                            file_type: item.outName?.split(".").pop()?.toLowerCase(),
                          })
                        }
                        className="rounded-lg p-1.5 text-primary hover:bg-primary/10 transition"
                        title="Download compressed image"
                        aria-label={`Download ${item.outName}`}
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition"
                      title="Remove"
                      aria-label={`Remove ${item.file.name}`}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {hasIdle && (
              <button
                onClick={compressAll}
                disabled={processing}
                className="flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {processing && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {processing ? "Compressing…" : "Compress Images"}
              </button>
            )}
            {doneItems.length > 1 && (
              <button
                onClick={downloadZip}
                className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold transition hover:bg-muted active:scale-95"
              >
                <Archive className="h-4 w-4" aria-hidden="true" />
                Download all as ZIP ({doneItems.length})
              </button>
            )}
            {allDone && doneItems.length === 1 && doneItems[0].outUrl && (
              <a
                href={doneItems[0].outUrl}
                download={doneItems[0].outName}
                onClick={() =>
                  trackDownloadResult({
                    tool_slug: tool.slug,
                    result_type: "compressed_image",
                    file_type: doneItems[0].outName?.split(".").pop()?.toLowerCase(),
                  })
                }
                className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold transition hover:bg-muted active:scale-95"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download
              </a>
            )}
            <button
              onClick={clearAll}
              className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted active:scale-95"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </ToolPageShell>
  );
}
