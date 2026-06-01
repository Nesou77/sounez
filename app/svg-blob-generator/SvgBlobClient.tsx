"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult, trackDownloadResult } from "@/lib/analytics";

function generateBlob(points: number, randomness: number, seed: number): string {
  const rng = (() => {
    let s = seed;
    return () => {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 0xffffffff;
    };
  })();

  const angleStep = (Math.PI * 2) / points;
  const baseRadius = 150;
  const coords: [number, number][] = [];

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const r = baseRadius * (1 - randomness * 0.5 + rng() * randomness);
    coords.push([200 + r * Math.cos(angle), 200 + r * Math.sin(angle)]);
  }

  // Build smooth cubic bezier path
  const n = coords.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const p0 = coords[(i - 1 + n) % n];
    const p1 = coords[i];
    const p2 = coords[(i + 1) % n];
    const p3 = coords[(i + 2) % n];

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

    if (i === 0) d += `M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} `;
    d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `;
  }
  d += "Z";
  return d;
}

export function SvgBlobClient({ tool }: { tool: Tool }) {
  const [points, setPoints] = useState(8);
  const [randomness, setRandomness] = useState(0.4);
  const [fillColor, setFillColor] = useState("#6366f1");
  const [useGradient, setUseGradient] = useState(false);
  const [gradientColor, setGradientColor] = useState("#8b5cf6");
  const [seed, setSeed] = useState(42); // stable initial seed, same on server and client

  // Randomize on first client mount so the initial blob isn't always identical
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100000));
  }, []);

  useToolView(tool);

  const path = generateBlob(points, randomness, seed);

  const svgContent = useGradient
    ? `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${fillColor}"/>
      <stop offset="100%" stop-color="${gradientColor}"/>
    </linearGradient>
  </defs>
  <path d="${path}" fill="url(#blobGrad)"/>
</svg>`
    : `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <path d="${path}" fill="${fillColor}"/>
</svg>`;

  const randomize = useCallback(() => {
    setSeed(Math.floor(Math.random() * 100000));
    toast.success("New blob generated");
    trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "svg_blob" });
  }, [tool]);

  const copySvg = () => {
    navigator.clipboard.writeText(svgContent);
    toast.success("SVG code copied");
    trackCopyResult({ tool_slug: tool.slug, result_type: "svg_blob" });
  };

  const downloadSvg = () => {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blob.svg";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("blob.svg downloaded");
    trackDownloadResult({ tool_slug: tool.slug, result_type: "svg_blob", file_type: "svg" });
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Generate smooth organic SVG blobs for website backgrounds, cards, illustrations and hero sections."
      features={[
        { title: "Random shapes", desc: "Generate fresh organic blobs instantly with one click." },
        { title: "SVG export", desc: "Copy or download clean, valid SVG code." },
        { title: "Customizable design", desc: "Adjust size, color, smoothness and randomness." },
      ]}
      howTo={[
        "Adjust the blob controls to your liking.",
        "Click Randomize to create a new shape.",
        "Copy the SVG code or download the file.",
      ]}
      faqs={[
        { q: "Can I use these blobs commercially?", a: "Yes. The generated SVG shapes are free to use in any project." },
        { q: "Are SVG blobs responsive?", a: "Yes. SVGs scale cleanly at any size without losing quality." },
        { q: "Do I need design software?", a: "No. You can generate and copy the SVG directly from this tool." },
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Preview */}
        <div className="flex items-center justify-center rounded-2xl border border-border bg-muted/30 p-4 min-h-[280px]">
          <svg viewBox="0 0 400 400" className="w-full max-w-[280px]" aria-label="SVG blob preview">
            {useGradient ? (
              <>
                <defs>
                  <linearGradient id="blobGradPreview" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={fillColor} />
                    <stop offset="100%" stopColor={gradientColor} />
                  </linearGradient>
                </defs>
                <path d={path} fill="url(#blobGradPreview)" />
              </>
            ) : (
              <path d={path} fill={fillColor} />
            )}
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-4 text-sm">
          <div>
            <label className="mb-1.5 block font-medium">Points: {points}</label>
            <input type="range" min={5} max={16} value={points} onChange={(e) => setPoints(+e.target.value)} className="w-full accent-primary" />
          </div>
          <div>
            <label className="mb-1.5 block font-medium">Randomness: {Math.round(randomness * 100)}%</label>
            <input type="range" min={0} max={100} value={Math.round(randomness * 100)} onChange={(e) => setRandomness(+e.target.value / 100)} className="w-full accent-primary" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="blob-fill" className="mb-1.5 block font-medium">Fill color</label>
              <input id="blob-fill" type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} className="h-10 w-full rounded-lg border border-border cursor-pointer" />
            </div>
            <div className="flex flex-col">
              <label className="mb-1.5 block font-medium">Gradient</label>
              <label className="flex items-center gap-2 cursor-pointer mt-1">
                <input type="checkbox" checked={useGradient} onChange={(e) => setUseGradient(e.target.checked)} className="accent-primary" />
                <span className="text-xs">Enable gradient</span>
              </label>
            </div>
          </div>
          {useGradient && (
            <div>
              <label htmlFor="blob-grad" className="mb-1.5 block font-medium">Gradient end color</label>
              <input id="blob-grad" type="color" value={gradientColor} onChange={(e) => setGradientColor(e.target.value)} className="h-10 w-full rounded-lg border border-border cursor-pointer" />
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={randomize} className="flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95">
              <RefreshCw className="h-4 w-4" /> Randomize
            </button>
            <button type="button" onClick={copySvg} className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold transition hover:bg-muted active:scale-95">
              <Copy className="h-4 w-4" /> Copy SVG
            </button>
            <button type="button" onClick={downloadSvg} className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold transition hover:bg-muted active:scale-95">
              <Download className="h-4 w-4" /> Download .svg
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">SVG code</p>
        <pre className="overflow-x-auto rounded-xl bg-muted/60 p-4 text-xs leading-relaxed max-h-40"><code>{svgContent}</code></pre>
      </div>
    </ToolPageShell>
  );
}
