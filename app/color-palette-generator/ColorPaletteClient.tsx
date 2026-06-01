"use client";
import { useState } from "react";
import { Copy, Lock, Unlock, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult, trackDownloadResult } from "@/lib/analytics";

function rand() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
}

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function ColorPaletteClient({ tool }: { tool: Tool }) {
  const [cols, setCols] = useState<string[]>(() => Array.from({ length: 5 }, rand));
  const [locked, setLocked] = useState<boolean[]>([false, false, false, false, false]);

  useToolView(tool);

  const generate = () => {
    setCols((prev) => prev.map((c, i) => (locked[i] ? c : rand())));
    toast.success("New palette generated");
    trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "color_palette" });
  };

  const toggleLock = (i: number) => {
    setLocked((prev) => prev.map((l, idx) => (idx === i ? !l : l)));
  };

  const copyHex = (c: string) => {
    navigator.clipboard.writeText(c.toUpperCase());
    toast.success(`Copied ${c.toUpperCase()}`);
    trackCopyResult({ tool_slug: tool.slug, result_type: "hex_color" });
  };

  const copyCssVars = () => {
    const vars = cols.map((c, i) => `  --color-${i + 1}: ${c.toUpperCase()};`).join("\n");
    navigator.clipboard.writeText(`:root {\n${vars}\n}`);
    toast.success("CSS variables copied");
    trackCopyResult({ tool_slug: tool.slug, result_type: "css_vars" });
  };

  const copyJson = () => {
    const obj: Record<string, string> = {};
    cols.forEach((c, i) => { obj[`color${i + 1}`] = c.toUpperCase(); });
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    toast.success("JSON copied");
    trackCopyResult({ tool_slug: tool.slug, result_type: "palette_json" });
  };

  const downloadSvg = () => {
    const W = 100, H = 160;
    const rects = cols.map((c, i) => `<rect x="${i * W}" y="0" width="${W}" height="${H}" fill="${c}"/>`).join("\n  ");
    const labels = cols.map((c, i) => `<text x="${i * W + W / 2}" y="${H - 12}" text-anchor="middle" font-family="monospace" font-size="10" fill="${hexToHsl(c)[2] > 50 ? "#000" : "#fff"}">${c.toUpperCase()}</text>`).join("\n  ");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cols.length * W}" height="${H}">\n  ${rects}\n  ${labels}\n</svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "palette.svg";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("palette.svg downloaded");
    trackDownloadResult({ tool_slug: tool.slug, result_type: "color_palette", file_type: "svg" });
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Generate a five-color palette in one click. Lock colors you like, copy individual hex codes, export as CSS variables or JSON, or download as SVG."
      features={[
        { title: "Lock & refresh", desc: "Lock any color you want to keep, then regenerate the rest." },
        { title: "Copy hex instantly", desc: "Click any swatch to copy its hex code directly." },
        { title: "CSS variables", desc: "Export the whole palette as CSS custom properties ready to drop into your stylesheet." },
        { title: "JSON export", desc: "Copy the palette as a JSON object for use in design tokens or config files." },
      ]}
      howTo={[
        "Click Generate to create a new 5-color palette.",
        "Lock any color you want to keep using the lock icon.",
        "Click Generate again, locked colors stay, the rest change.",
        "Click any swatch to copy its hex code, or use the export buttons below.",
      ]}
      faqs={[
        { q: "Are the colors random?", a: "Yes. Each click generates a fresh set. Lock colors you want to keep before you generate again." },
        { q: "Can I use these colors in commercial projects?", a: "Yes. The generated colors are yours to use in any project, personal or commercial." },
        { q: "What are CSS variables good for?", a: "CSS custom properties let you define your palette once and reuse it across your entire stylesheet. Change one variable and the whole site updates." },
        { q: "Can I pick a specific color?", a: "Click directly on any swatch color tile to edit it with a color picker." },
      ]}
      useCases={[
        { title: "UI designers", desc: "Quickly explore color directions for a new product or brand." },
        { title: "Developers", desc: "Export CSS variables to wire a palette into your design system." },
        { title: "Brand designers", desc: "Generate complementary palettes and download the SVG for presentations." },
        { title: "Anyone", desc: "A random palette is sometimes the fastest way to find a starting point." },
      ]}
    >
      {/* Swatches */}
      <div className="grid grid-cols-5 gap-3">
        {cols.map((c, i) => (
          <div key={i} className="group flex flex-col gap-2">
            {/* Color swatch */}
            <div className="relative">
              <button
                type="button"
                onClick={() => copyHex(c)}
                title={`Copy ${c.toUpperCase()}`}
                aria-label={`Copy color ${c.toUpperCase()}`}
                className="aspect-[3/4] w-full rounded-2xl shadow-soft transition-transform hover:scale-[1.04] active:scale-[0.98]"
                style={{ backgroundColor: c }}
              >
                <span className="absolute bottom-2 left-0 right-0 flex justify-center">
                  <span className="rounded bg-black/30 px-1.5 py-0.5 text-[10px] font-mono text-white backdrop-blur">
                    {c.toUpperCase()}
                  </span>
                </span>
              </button>
              {/* Lock button, always visible when locked, shown on hover when unlocked */}
              <button
                type="button"
                onClick={() => toggleLock(i)}
                title={locked[i] ? "Unlock color" : "Lock color"}
                aria-label={locked[i] ? `Unlock color ${c.toUpperCase()}` : `Lock color ${c.toUpperCase()}`}
                className={`absolute right-1 top-1 rounded-full p-1 text-white backdrop-blur transition ${
                  locked[i]
                    ? "bg-black/50 opacity-100"
                    : "bg-black/30 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                }`}
              >
                {locked[i] ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
              </button>
            </div>
            {/* HSL values */}
            <div className="text-center text-[10px] text-muted-foreground leading-none">
              {(() => { const [h, s, l] = hexToHsl(c); return `${h}° ${s}% ${l}%`; })()}
            </div>
          </div>
        ))}
      </div>

      {/* Primary action */}
      <button
        type="button"
        onClick={generate}
        className="mt-5 flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-pop transition active:scale-95 hover:-translate-y-0.5"
      >
        <RefreshCw className="h-4 w-4" /> Generate new palette
      </button>

      {/* Export options */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={copyCssVars} className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold transition hover:bg-muted active:scale-95">
          <Copy className="h-3.5 w-3.5" /> Copy CSS vars
        </button>
        <button type="button" onClick={copyJson} className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold transition hover:bg-muted active:scale-95">
          <Copy className="h-3.5 w-3.5" /> Copy JSON
        </button>
        <button type="button" onClick={downloadSvg} className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold transition hover:bg-muted active:scale-95">
          <Download className="h-3.5 w-3.5" /> Download SVG
        </button>
      </div>
    </ToolPageShell>
  );
}
