"use client";

import { useState } from "react";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult, trackDownloadResult } from "@/lib/analytics";

type Format = "svg" | "png";

function buildSvg(w: number, h: number, bg: string, fg: string, label: string): string {
  const text = label || `${w}x${h}`;
  const fontSize = Math.max(12, Math.min(Math.floor(Math.min(w, h) * 0.12), 48));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${fontSize}" fill="${fg}">${text}</text>
</svg>`;
}

export function ImagePlaceholderClient({ tool }: { tool: Tool }) {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [bg, setBg] = useState("#e2e8f0");
  const [fg, setFg] = useState("#64748b");
  const [label, setLabel] = useState("");
  const [format, setFormat] = useState<Format>("svg");

  useToolView(tool);

  const clamp = (v: number) => Math.max(1, Math.min(4000, v));
  const w = clamp(width);
  const h = clamp(height);

  const svgString = buildSvg(w, h, bg, fg, label);
  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;

  const copySvg = () => {
    navigator.clipboard.writeText(svgString);
    toast.success("SVG code copied");
    trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "image_placeholder" });
    trackCopyResult({ tool_slug: tool.slug, result_type: "placeholder_svg" });
  };

  const copyDataUrl = () => {
    navigator.clipboard.writeText(svgDataUrl);
    toast.success("Data URL copied");
    trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "image_placeholder" });
    trackCopyResult({ tool_slug: tool.slug, result_type: "placeholder_data_url" });
  };

  const download = () => {
    if (format === "svg") {
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `placeholder-${w}x${h}.svg`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`placeholder-${w}x${h}.svg downloaded`);
      trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "image_placeholder" });
      trackDownloadResult({ tool_slug: tool.slug, result_type: "image_placeholder", file_type: "svg" });
    } else {
      // PNG via canvas
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = new window.Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const a = document.createElement("a");
        a.download = `placeholder-${w}x${h}.png`;
        a.href = canvas.toDataURL("image/png");
        a.click();
        toast.success(`placeholder-${w}x${h}.png downloaded`);
        trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "image_placeholder" });
        trackDownloadResult({ tool_slug: tool.slug, result_type: "image_placeholder", file_type: "png" });
      };
      img.src = svgDataUrl;
    }
  };

  // Preview capped at 400px wide
  const previewW = Math.min(w, 400);
  const previewH = Math.round((h / w) * previewW);

  return (
    <ToolPageShell
      tool={tool}
      intro="Generate quick custom image placeholders for wireframes, mockups and frontend development."
      features={[
        { title: "Custom dimensions", desc: "Set width and height for your layout." },
        { title: "SVG or PNG", desc: "Export the format that fits your workflow." },
        { title: "Local generation", desc: "No external placeholder service required." },
      ]}
      howTo={[
        "Enter your image dimensions.",
        "Customize colors and placeholder text.",
        "Copy or download the generated placeholder.",
      ]}
      faqs={[
        { q: "What is an image placeholder?", a: "A temporary image used while designing or building a page, showing dimensions and a label." },
        { q: "Can I use this in mockups?", a: "Yes. It is useful for wireframes, prototypes and frontend layouts." },
        { q: "Does it require an external image service?", a: "No. The placeholder is generated entirely in your browser." },
      ]}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="ph-width" className="mb-1.5 block font-medium">Width (px)</label>
              <input
                id="ph-width"
                type="number"
                min={1}
                max={4000}
                value={width}
                onChange={(e) => setWidth(+e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label htmlFor="ph-height" className="mb-1.5 block font-medium">Height (px)</label>
              <input
                id="ph-height"
                type="number"
                min={1}
                max={4000}
                value={height}
                onChange={(e) => setHeight(+e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="ph-bg" className="mb-1.5 block font-medium">Background</label>
              <input id="ph-bg" type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-full rounded-lg border border-border cursor-pointer" />
            </div>
            <div>
              <label htmlFor="ph-fg" className="mb-1.5 block font-medium">Text color</label>
              <input id="ph-fg" type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 w-full rounded-lg border border-border cursor-pointer" />
            </div>
          </div>

          <div>
            <label htmlFor="ph-label" className="mb-1.5 block font-medium">
              Label <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <input
              id="ph-label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder={`${w}x${h}`}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <p className="mb-2 font-medium">Format</p>
            <div className="flex gap-2">
              {(["svg", "png"] as Format[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`rounded-lg border px-4 py-1.5 text-xs font-semibold uppercase transition ${
                    format === f
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button onClick={download} className="flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95">
              <Download className="h-4 w-4" /> Download {format.toUpperCase()}
            </button>
            <button onClick={copySvg} className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold transition hover:bg-muted active:scale-95">
              <Copy className="h-4 w-4" /> Copy SVG
            </button>
            <button onClick={copyDataUrl} className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold transition hover:bg-muted active:scale-95">
              <Copy className="h-4 w-4" /> Copy data URL
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preview</p>
          <div className="overflow-hidden rounded-xl border border-border shadow-soft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={svgDataUrl}
              alt={`Placeholder ${w}x${h}`}
              width={previewW}
              height={previewH}
              style={{ display: "block", maxWidth: "100%" }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{w}x{h}px</p>
        </div>
      </div>
    </ToolPageShell>
  );
}
