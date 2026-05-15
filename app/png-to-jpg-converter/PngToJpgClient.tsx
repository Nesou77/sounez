"use client";

import { useCallback, useRef, useState } from "react";
import {
  Download,
  Upload,
  X,
  ImageIcon,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Archive,
  Trash2,
  ZapIcon,
  RefreshCcw,
} from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackDownloadResult } from "@/lib/analytics";

/* ─────────────────────────── helpers ─────────────────────────── */

function fmt(bytes: number) {
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(2)} MB`
    : `${(bytes / 1024).toFixed(0)} KB`;
}

function savings(original: number, converted: number) {
  if (converted >= original) return null;
  return Math.round(((original - converted) / original) * 100);
}

/* ── Pure-JS ZIP builder — no external dependencies ─────────────
   Implements the ZIP local-file + central-directory format (PKZIP
   spec). Files are stored uncompressed (method 0), which is correct
   for JPEGs that are already compressed.
─────────────────────────────────────────────────────────────────── */

/** CRC-32 lookup table (computed once, reused for all files). */
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
  const table = getCrcTable();
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xff];
  return (crc ^ 0xffffffff) >>> 0;
}

function u16le(n: number): [number, number] {
  return [n & 0xff, (n >> 8) & 0xff];
}
function u32le(n: number): [number, number, number, number] {
  return [n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >> 24) & 0xff];
}

async function buildZip(files: Array<{ name: string; blob: Blob }>): Promise<Blob> {
  const enc = new TextEncoder();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let localOffset = 0;

  for (const file of files) {
    const nameBytes = enc.encode(file.name);
    const data = new Uint8Array(await file.blob.arrayBuffer());
    const crc = crc32(data);
    const size = data.length;

    // ── Local file header (30 bytes + filename) ──
    const local = new Uint8Array(30 + nameBytes.length);
    local.set([
      0x50, 0x4b, 0x03, 0x04,       // signature
      ...u16le(20),                  // version needed: 2.0
      ...u16le(0),                   // general-purpose flags
      ...u16le(0),                   // compression: stored
      ...u16le(0), ...u16le(0),      // last mod time/date (zeroed)
      ...u32le(crc),
      ...u32le(size),                // compressed size
      ...u32le(size),                // uncompressed size
      ...u16le(nameBytes.length),
      ...u16le(0),                   // extra field length
    ]);
    local.set(nameBytes, 30);

    // ── Central directory entry (46 bytes + filename) ──
    const central = new Uint8Array(46 + nameBytes.length);
    central.set([
      0x50, 0x4b, 0x01, 0x02,       // signature
      ...u16le(20), ...u16le(20),    // version made by / needed
      ...u16le(0),                   // flags
      ...u16le(0),                   // compression: stored
      ...u16le(0), ...u16le(0),      // last mod time/date
      ...u32le(crc),
      ...u32le(size),
      ...u32le(size),
      ...u16le(nameBytes.length),
      ...u16le(0),                   // extra field length
      ...u16le(0),                   // file comment length
      ...u16le(0),                   // disk number start
      ...u16le(0),                   // internal attributes
      ...u32le(0),                   // external attributes
      ...u32le(localOffset),         // offset of local header
    ]);
    central.set(nameBytes, 46);

    localParts.push(local, data);
    centralParts.push(central);
    localOffset += local.length + data.length;
  }

  const centralSize = centralParts.reduce((s, p) => s + p.length, 0);

  // ── End-of-central-directory record (22 bytes) ──
  const eocd = new Uint8Array(22);
  eocd.set([
    0x50, 0x4b, 0x05, 0x06,         // signature
    ...u16le(0),                     // disk number
    ...u16le(0),                     // disk with central dir
    ...u16le(files.length),          // entries on this disk
    ...u16le(files.length),          // total entries
    ...u32le(centralSize),
    ...u32le(localOffset),           // offset of central dir
    ...u16le(0),                     // comment length
  ]);

  return new Blob([...localParts, ...centralParts, eocd], { type: "application/zip" });
}

/* ─────────────────────────── types ─────────────────────────── */

type Status = "waiting" | "converting" | "done" | "error";

type ImageItem = {
  id: string;
  file: File;
  previewUrl: string;
  status: Status;
  resultUrl?: string;
  resultSize?: number;
  resultFilename?: string;
  errorMsg?: string;
};

/* ─────────────────────────── component ─────────────────────────── */

export function PngToJpgClient({ tool }: { tool: Tool }) {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [quality, setQuality] = useState(90);
  const [drag, setDrag] = useState(false);
  const [convertingAll, setConvertingAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useToolView(tool);

  /* ── add files ── */
  const addFiles = (files: FileList | File[]) => {
    const pngs = Array.from(files).filter((f) => f.type === "image/png");
    const rejected = Array.from(files).length - pngs.length;
    if (rejected > 0) toast.error(`${rejected} file(s) skipped — PNG only`);
    if (pngs.length === 0) return;

    const newItems: ImageItem[] = pngs.map((f) => ({
      id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
      file: f,
      previewUrl: URL.createObjectURL(f),
      status: "waiting",
    }));

    setItems((prev) => [...prev, ...newItems]);
    toast.success(`${pngs.length} file${pngs.length > 1 ? "s" : ""} added`);
  };

  /* ── remove one ── */
  const removeItem = (id: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) {
        URL.revokeObjectURL(item.previewUrl);
        if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  /* ── clear all ── */
  const clearAll = () => {
    setItems((prev) => {
      prev.forEach((i) => {
        URL.revokeObjectURL(i.previewUrl);
        if (i.resultUrl) URL.revokeObjectURL(i.resultUrl);
      });
      return [];
    });
  };

  /* ── convert a single item ── */
  const convertOne = useCallback(
    (item: ImageItem, q: number): Promise<void> =>
      new Promise((resolve) => {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: "converting" } : i))
        );

        const img = new Image();
        const objectUrl = URL.createObjectURL(item.file);

        img.onload = () => {
          URL.revokeObjectURL(objectUrl);
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            setItems((prev) =>
              prev.map((i) =>
                i.id === item.id
                  ? { ...i, status: "error", errorMsg: "Canvas not supported" }
                  : i
              )
            );
            resolve();
            return;
          }
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                setItems((prev) =>
                  prev.map((i) =>
                    i.id === item.id
                      ? { ...i, status: "error", errorMsg: "Conversion failed" }
                      : i
                  )
                );
                resolve();
                return;
              }
              const url = URL.createObjectURL(blob);
              const filename = item.file.name.replace(/\.png$/i, ".jpg");
              setItems((prev) =>
                prev.map((i) =>
                  i.id === item.id
                    ? { ...i, status: "done", resultUrl: url, resultSize: blob.size, resultFilename: filename }
                    : i
                )
              );
              resolve();
            },
            "image/jpeg",
            q / 100
          );
        };

        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? { ...i, status: "error", errorMsg: "Could not load image" }
                : i
            )
          );
          resolve();
        };

        img.src = objectUrl;
      }),
    []
  );

  /* ── convert all (concurrently, capped at 4) ── */
  const convertAll = useCallback(async () => {
    const pending = items.filter((i) => i.status === "waiting" || i.status === "error");
    if (pending.length === 0) return;

    setConvertingAll(true);
    const CONCURRENCY = 4;

    for (let i = 0; i < pending.length; i += CONCURRENCY) {
      const batch = pending.slice(i, i + CONCURRENCY);
      await Promise.all(batch.map((item) => convertOne(item, quality)));
    }

    setConvertingAll(false);

    setItems((current) => {
      const done = current.filter((i) => i.status === "done").length;
      const errors = current.filter((i) => i.status === "error").length;
      if (errors > 0) {
        toast.error(`${errors} file${errors > 1 ? "s" : ""} failed — ${done} converted`);
      } else {
        toast.success(`All ${done} image${done > 1 ? "s" : ""} converted`);
      }
      trackToolComplete({
        tool_slug: tool.slug,
        tool_name: tool.name,
        tool_category: tool.category,
        output_type: "jpg_image",
      });
      return current;
    });
  }, [items, quality, convertOne, tool]);

  /* ── reconvert all done items with new quality ── */
  const reconvertAll = useCallback(async () => {
    setItems((prev) =>
      prev.map((i) => (i.status === "done" ? { ...i, status: "waiting", resultUrl: undefined, resultSize: undefined } : i))
    );
    // small delay so state updates flush
    await new Promise((r) => setTimeout(r, 50));
    await convertAll();
  }, [convertAll]);

  /* ── download all as ZIP (pure-JS, zero dependencies) ── */
  const downloadAll = async () => {
    const done = items.filter((i) => i.status === "done" && i.resultUrl);
    if (done.length === 0) return;

    // Single file → download directly, no ZIP needed
    if (done.length === 1) {
      const item = done[0];
      const a = document.createElement("a");
      a.href = item.resultUrl!;
      a.download = item.resultFilename!;
      a.click();
      trackDownloadResult({ tool_slug: tool.slug, result_type: "jpg_image", file_type: "jpg" });
      return;
    }

    toast.info("Building ZIP…");

    try {
      // Fetch each blob from its object URL then pack with the built-in ZIP writer
      const fileEntries = await Promise.all(
        done.map(async (item) => {
          const res = await fetch(item.resultUrl!);
          const blob = await res.blob();
          return { name: item.resultFilename!, blob };
        })
      );

      const zipBlob = await buildZip(fileEntries);
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted-images.zip";
      a.click();
      // Release the temporary ZIP URL after the browser has had time to start the download
      setTimeout(() => URL.revokeObjectURL(url), 10_000);

      toast.success(`ZIP ready — ${done.length} files`);
      trackDownloadResult({ tool_slug: tool.slug, result_type: "jpg_image", file_type: "zip" });
    } catch (err) {
      console.error("ZIP build failed:", err);
      toast.error("Could not build ZIP. Try downloading files individually.");
    }
  };

  /* ─── derived state ─── */
  const totalItems = items.length;
  const doneItems = items.filter((i) => i.status === "done");
  const waitingItems = items.filter((i) => i.status === "waiting" || i.status === "error");
  const isAnyConverting = items.some((i) => i.status === "converting");
  const totalOriginalSize = items.reduce((acc, i) => acc + i.file.size, 0);
  const totalConvertedSize = doneItems.reduce((acc, i) => acc + (i.resultSize ?? 0), 0);
  const totalSavings = doneItems.length > 0 ? savings(totalOriginalSize, totalConvertedSize) : null;

  /* ─────────────────────────── render ─────────────────────────── */
  return (
    <ToolPageShell
      tool={tool}
      intro="Convert one or many PNG files to JPG right in your browser — no uploads, no account, no limits. All processing runs locally on your device."
      features={[
        {
          title: "Batch conversion",
          desc: "Drop dozens of PNGs at once and convert them all in parallel with a single click.",
        },
        {
          title: "Quality control",
          desc: "One slider controls quality for all images. Change it and re-convert at any time.",
        },
        {
          title: "Download as ZIP",
          desc: "Get all your converted images in a single ZIP file, or download them one by one.",
        },
        {
          title: "Handles transparency",
          desc: "Transparent areas are automatically filled with white — the JPG standard.",
        },
        {
          title: "Private by design",
          desc: "Nothing leaves your device. Conversion happens entirely in your browser.",
        },
      ]}
      howTo={[
        "Drop your PNG files (any amount) onto the upload area, or click to browse.",
        "Adjust the quality slider — lower means smaller files, higher means better quality.",
        "Click Convert All to process every image at once.",
        "Download individual JPGs or click Download ZIP for everything in one file.",
      ]}
      faqs={[
        {
          q: "Is there a limit on how many files I can convert?",
          a: "No. You can convert as many PNG files as you like in one batch. Very large files or hundreds of images may be slow depending on your device.",
        },
        {
          q: "Will transparent areas be preserved?",
          a: "No. JPG does not support transparency. Transparent areas are replaced with a white background automatically.",
        },
        {
          q: "Does this upload my images anywhere?",
          a: "Never. The entire conversion happens inside your browser using the Canvas API. Your files never leave your device.",
        },
        {
          q: "Can I change the quality and re-convert?",
          a: "Yes. Adjust the quality slider at any time and click Re-convert All to regenerate all images with the new setting.",
        },
        {
          q: "What if some conversions fail?",
          a: "Failed files are marked individually. You can retry them without re-doing the ones that already succeeded.",
        },
      ]}
    >
      {/* ── Drop zone (always visible) ── */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload PNG files"
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition select-none ${
          drag
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
        }`}
      >
        <div className={`rounded-xl p-3 transition ${drag ? "bg-primary/10" : "bg-muted"}`}>
          <Upload className={`h-8 w-8 transition ${drag ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <div>
          <p className="font-semibold">
            {totalItems > 0 ? "Drop more PNGs to add them" : "Drop your PNG files here"}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {totalItems > 0 ? "or click to browse" : "Any number of files — or click to browse"}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png"
          multiple
          hidden
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {/* ── Controls + actions bar ── */}
      {totalItems > 0 && (
        <div className="mt-5 space-y-4">
          {/* Quality slider */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="jpg-quality" className="text-sm font-medium">
                Output Quality
              </label>
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-semibold text-primary">
                {quality}%
              </span>
            </div>
            <input
              id="jpg-quality"
              type="range"
              min={1}
              max={100}
              step={1}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Smaller file</span>
              <span>Best quality</span>
            </div>
          </div>

          {/* Stats summary */}
          {doneItems.length > 0 && (
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-xl border border-border bg-muted/30 px-3 py-2.5">
                <p className="text-xs text-muted-foreground">Converted</p>
                <p className="mt-0.5 font-semibold">{doneItems.length} / {totalItems}</p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 px-3 py-2.5">
                <p className="text-xs text-muted-foreground">Original size</p>
                <p className="mt-0.5 font-semibold">{fmt(totalOriginalSize)}</p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 px-3 py-2.5">
                <p className="text-xs text-muted-foreground">Converted size</p>
                <p className="mt-0.5 font-semibold">
                  {fmt(totalConvertedSize)}
                  {totalSavings !== null && (
                    <span className="ml-1 text-xs font-medium text-emerald-600">−{totalSavings}%</span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {waitingItems.length > 0 && (
              <button
                onClick={convertAll}
                disabled={convertingAll || isAnyConverting}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isAnyConverting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />Converting…</>
                ) : (
                  <><ZapIcon className="h-4 w-4" />Convert {waitingItems.length > 1 ? `All ${waitingItems.length}` : "1"}</>
                )}
              </button>
            )}

            {doneItems.length > 0 && waitingItems.length === 0 && (
              <button
                onClick={reconvertAll}
                disabled={isAnyConverting}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium transition hover:bg-muted disabled:opacity-60"
              >
                <RefreshCcw className="h-4 w-4" />
                Re-convert with new quality
              </button>
            )}

            {doneItems.length > 0 && (
              <button
                onClick={downloadAll}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:-translate-y-0.5 active:scale-95"
              >
                {doneItems.length > 1 ? (
                  <><Archive className="h-4 w-4" />Download ZIP ({doneItems.length} files)</>
                ) : (
                  <><Download className="h-4 w-4" />Download JPG</>
                )}
              </button>
            )}

            <button
              onClick={clearAll}
              disabled={isAnyConverting}
              className="ml-auto inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              Clear all
            </button>
          </div>

          {/* ── Image grid ── */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ImageCard
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onDownload={() => {
                  if (item.resultUrl) {
                    const a = document.createElement("a");
                    a.href = item.resultUrl;
                    a.download = item.resultFilename!;
                    a.click();
                    trackDownloadResult({ tool_slug: tool.slug, result_type: "jpg_image", file_type: "jpg" });
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}
    </ToolPageShell>
  );
}

/* ─────────────────────────── ImageCard ─────────────────────────── */

function ImageCard({
  item,
  onRemove,
  onDownload,
}: {
  item: ImageItem;
  onRemove: () => void;
  onDownload: () => void;
}) {
  const savingsPct = item.resultSize ? savings(item.file.size, item.resultSize) : null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-soft">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.status === "done" && item.resultUrl ? item.resultUrl : item.previewUrl}
          alt={item.file.name}
          className="h-full w-full object-cover"
        />

        {/* Status overlay */}
        {item.status === "converting" && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {item.status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-background/70 backdrop-blur-sm">
            <AlertCircle className="h-7 w-7 text-destructive" />
            <p className="text-xs font-medium text-destructive">{item.errorMsg}</p>
          </div>
        )}

        {/* Done badge */}
        {item.status === "done" && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white shadow">
            <CheckCircle2 className="h-3 w-3" /> Done
          </div>
        )}

        {/* Waiting badge */}
        {item.status === "waiting" && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-muted/90 px-2 py-0.5 text-xs font-medium text-muted-foreground shadow">
            <ImageIcon className="h-3 w-3" /> Ready
          </div>
        )}

        {/* Remove button */}
        <button
          onClick={onRemove}
          className="absolute left-2 top-2 rounded-full bg-background/80 p-1 text-muted-foreground opacity-0 shadow transition hover:bg-background hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100"
          aria-label={`Remove ${item.file.name}`}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Info row */}
      <div className="flex items-center gap-2 p-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium" title={item.file.name}>
            {item.file.name.replace(/\.png$/i, ".jpg")}
          </p>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{fmt(item.file.size)}</span>
            {item.resultSize && (
              <>
                <span>→</span>
                <span className="font-medium text-foreground">{fmt(item.resultSize)}</span>
                {savingsPct !== null && (
                  <span className="font-medium text-emerald-600">−{savingsPct}%</span>
                )}
              </>
            )}
          </div>
        </div>

        {item.status === "done" && (
          <button
            onClick={onDownload}
            className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label={`Download ${item.resultFilename}`}
          >
            <Download className="h-4 w-4" />
          </button>
        )}

        <button
          onClick={onRemove}
          className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Remove ${item.file.name}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}