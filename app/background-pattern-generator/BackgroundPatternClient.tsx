"use client";

import { useState } from "react";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";

type PatternType = "dots" | "grid" | "diagonal" | "checkerboard" | "triangles" | "waves";

const PATTERN_LABELS: Record<PatternType, string> = {
  dots: "Dots",
  grid: "Grid",
  diagonal: "Diagonal lines",
  checkerboard: "Checkerboard",
  triangles: "Triangles",
  waves: "Waves",
};

function buildCss(type: PatternType, bg: string, fg: string, size: number, opacity: number): string {
  const alpha = opacity.toFixed(2);
  // Convert hex to rgba
  const r = parseInt(fg.slice(1, 3), 16);
  const g = parseInt(fg.slice(3, 5), 16);
  const b = parseInt(fg.slice(5, 7), 16);
  const fgRgba = `rgba(${r},${g},${b},${alpha})`;

  switch (type) {
    case "dots":
      return `background-color: ${bg};\nbackground-image: radial-gradient(${fgRgba} 1.5px, transparent 1.5px);\nbackground-size: ${size}px ${size}px;`;
    case "grid":
      return `background-color: ${bg};\nbackground-image:\n  linear-gradient(${fgRgba} 1px, transparent 1px),\n  linear-gradient(90deg, ${fgRgba} 1px, transparent 1px);\nbackground-size: ${size}px ${size}px;`;
    case "diagonal":
      return `background-color: ${bg};\nbackground-image: repeating-linear-gradient(\n  45deg,\n  ${fgRgba},\n  ${fgRgba} 1px,\n  transparent 1px,\n  transparent ${size}px\n);`;
    case "checkerboard":
      return `background-color: ${bg};\nbackground-image:\n  conic-gradient(${fgRgba} 25%, transparent 25%, transparent 75%, ${fgRgba} 75%);\nbackground-size: ${size * 2}px ${size * 2}px;`;
    case "triangles":
      return `background-color: ${bg};\nbackground-image:\n  linear-gradient(120deg, ${fgRgba} 25%, transparent 25%),\n  linear-gradient(240deg, ${fgRgba} 25%, transparent 25%),\n  linear-gradient(0deg, ${fgRgba} 25%, transparent 25%);\nbackground-size: ${size}px ${Math.round(size * 0.866)}px;`;
    case "waves":
      return `background-color: ${bg};\nbackground-image: repeating-radial-gradient(\n  circle at 0 0,\n  transparent 0,\n  ${bg} ${size * 0.5}px\n),\nrepeating-linear-gradient(${fgRgba}, ${fgRgba});\nbackground-size: ${size}px ${size}px;`;
    default:
      return `background-color: ${bg};`;
  }
}

function buildSvgPattern(type: PatternType, bg: string, fg: string, size: number, opacity: number): string {
  const r = parseInt(fg.slice(1, 3), 16);
  const g = parseInt(fg.slice(3, 5), 16);
  const b = parseInt(fg.slice(5, 7), 16);
  const fgRgba = `rgba(${r},${g},${b},${opacity})`;

  if (type === "dots") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="${bg}"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="1.5" fill="${fgRgba}"/>
</svg>`;
  }
  if (type === "grid") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="${bg}"/>
  <path d="M ${size} 0 L 0 0 0 ${size}" fill="none" stroke="${fgRgba}" stroke-width="1"/>
</svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="${bg}"/>
</svg>`;
}

const PATTERNS: PatternType[] = ["dots", "grid", "diagonal", "checkerboard", "triangles", "waves"];

export function BackgroundPatternClient({ tool }: { tool: Tool }) {
  const [type, setType] = useState<PatternType>("dots");
  const [bg, setBg] = useState("#ffffff");
  const [fg, setFg] = useState("#6366f1");
  const [size, setSize] = useState(24);
  const [opacity, setOpacity] = useState(0.5);

  const css = buildCss(type, bg, fg, size, opacity);

  const copyCss = () => {
    navigator.clipboard.writeText(css);
    toast.success("CSS copied");
  };

  const downloadSvg = () => {
    const svgStr = buildSvgPattern(type, bg, fg, size, opacity);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pattern-${type}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`pattern-${type}.svg downloaded`);
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Create lightweight background patterns for websites using CSS gradients or SVG patterns."
      features={[
        { title: "Multiple pattern types", desc: "Dots, grids, lines, waves and more." },
        { title: "Copy CSS", desc: "Use the generated pattern directly in your stylesheet." },
        { title: "Lightweight output", desc: "No image files required for most patterns." },
      ]}
      howTo={[
        "Choose a pattern type.",
        "Customize colors, size and opacity.",
        "Copy the CSS and paste it into your project.",
      ]}
      faqs={[
        { q: "Are CSS patterns better than images?", a: "CSS patterns are often lighter and easier to edit. They scale perfectly at any resolution." },
        { q: "Can I use these patterns commercially?", a: "Yes. The generated code is free to use in any project." },
        { q: "Will patterns slow down my website?", a: "Simple CSS patterns are usually lightweight. Avoid overly complex backgrounds on performance-sensitive pages." },
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Preview */}
        <div
          className="min-h-[240px] rounded-2xl border border-border"
          style={{ cssText: css } as React.CSSProperties}
          aria-label="Pattern preview"
        />

        {/* Controls */}
        <div className="space-y-4 text-sm">
          <div>
            <p className="mb-2 font-medium">Pattern type</p>
            <div className="grid grid-cols-3 gap-2">
              {PATTERNS.map((p) => (
                <button
                  key={p}
                  onClick={() => setType(p)}
                  className={`rounded-lg border px-2 py-1.5 text-xs font-semibold transition ${
                    type === p
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  {PATTERN_LABELS[p]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="pat-bg" className="mb-1.5 block font-medium">Background</label>
              <input id="pat-bg" type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-full rounded-lg border border-border cursor-pointer" />
            </div>
            <div>
              <label htmlFor="pat-fg" className="mb-1.5 block font-medium">Pattern color</label>
              <input id="pat-fg" type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 w-full rounded-lg border border-border cursor-pointer" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block font-medium">Size: {size}px</label>
            <input type="range" min={8} max={80} value={size} onChange={(e) => setSize(+e.target.value)} className="w-full accent-primary" />
          </div>

          <div>
            <label className="mb-1.5 block font-medium">Opacity: {Math.round(opacity * 100)}%</label>
            <input type="range" min={5} max={100} value={Math.round(opacity * 100)} onChange={(e) => setOpacity(+e.target.value / 100)} className="w-full accent-primary" />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button onClick={copyCss} className="flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95">
              <Copy className="h-4 w-4" /> Copy CSS
            </button>
            <button onClick={downloadSvg} className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold transition hover:bg-muted active:scale-95">
              <Download className="h-4 w-4" /> Download SVG tile
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">CSS output</p>
        <pre className="overflow-x-auto rounded-xl bg-muted/60 p-4 text-xs leading-relaxed"><code>{css}</code></pre>
      </div>
    </ToolPageShell>
  );
}
