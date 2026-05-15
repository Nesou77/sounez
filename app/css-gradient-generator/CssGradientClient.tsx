"use client";
import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult } from "@/lib/analytics";

type GradientType = "linear" | "radial" | "conic";

type Preset = { name: string; a: string; b: string; angle: number; type: GradientType };

const PRESETS: Preset[] = [
  { name: "Ocean", a: "#0ea5e9", b: "#6366f1", angle: 135, type: "linear" },
  { name: "Sunset", a: "#f97316", b: "#ec4899", angle: 120, type: "linear" },
  { name: "Forest", a: "#22c55e", b: "#0ea5e9", angle: 160, type: "linear" },
  { name: "Lavender", a: "#a855f7", b: "#6366f1", angle: 135, type: "linear" },
  { name: "Peach", a: "#fb923c", b: "#f472b6", angle: 90, type: "linear" },
  { name: "Midnight", a: "#0f172a", b: "#6366f1", angle: 180, type: "linear" },
  { name: "Radial glow", a: "#6366f1", b: "#0f172a", angle: 0, type: "radial" },
  { name: "Conic spin", a: "#6366f1", b: "#ec4899", angle: 0, type: "conic" },
];

function buildCss(type: GradientType, a: string, b: string, angle: number) {
  if (type === "radial") return `background: radial-gradient(circle, ${a}, ${b});`;
  if (type === "conic") return `background: conic-gradient(from ${angle}deg, ${a}, ${b}, ${a});`;
  return `background: linear-gradient(${angle}deg, ${a}, ${b});`;
}

function buildPreview(type: GradientType, a: string, b: string, angle: number): React.CSSProperties {
  if (type === "radial") return { background: `radial-gradient(circle, ${a}, ${b})` };
  if (type === "conic") return { background: `conic-gradient(from ${angle}deg, ${a}, ${b}, ${a})` };
  return { background: `linear-gradient(${angle}deg, ${a}, ${b})` };
}

export function CssGradientClient({ tool }: { tool: Tool }) {
  const [type, setType] = useState<GradientType>("linear");
  const [a, setA] = useState("#6366F1");
  const [b, setB] = useState("#8B5CF6");
  const [angle, setAngle] = useState(135);

  const css = buildCss(type, a, b, angle);
  const previewStyle = buildPreview(type, a, b, angle);

  useToolView(tool);

  const applyPreset = (p: Preset) => {
    setType(p.type);
    setA(p.a);
    setB(p.b);
    setAngle(p.angle);
    toast.success(`"${p.name}" preset applied`);
  };

  const copy = () => {
    navigator.clipboard.writeText(css);
    toast.success("CSS copied to clipboard");
    trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "css_gradient" });
    trackCopyResult({ tool_slug: tool.slug, result_type: "css_gradient" });
  };

  const copyTailwind = () => {
    const tailwind = type === "radial"
      ? `style={{ background: 'radial-gradient(circle, ${a}, ${b})' }}`
      : type === "conic"
      ? `style={{ background: 'conic-gradient(from ${angle}deg, ${a}, ${b}, ${a})' }}`
      : `className="bg-gradient-to-br" style={{ '--tw-gradient-from': '${a}', '--tw-gradient-to': '${b}' }}`;
    navigator.clipboard.writeText(tailwind);
    toast.success("Tailwind snippet copied");
    trackCopyResult({ tool_slug: tool.slug, result_type: "css_gradient_tailwind" });
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Pick two colors, choose a gradient type and angle, then copy the CSS into your project. Includes presets to get started fast."
      features={[
        { title: "3 gradient types", desc: "Linear, radial and conic — all the CSS gradient types in one place." },
        { title: "Live preview", desc: "Change colors or angle and see the result update immediately." },
        { title: "8 presets", desc: "Start from a curated gradient and tweak from there." },
        { title: "Tailwind snippet", desc: "Copy the equivalent inline style for Tailwind projects." },
      ]}
      howTo={[
        "Choose a gradient type: linear, radial or conic.",
        "Pick your two colors, or click a preset to start from there.",
        "Drag the angle slider to rotate the gradient (linear and conic only).",
        "Copy the CSS and paste it into your stylesheet.",
      ]}
      faqs={[
        { q: "Can I use more than two colors?", a: "This tool supports two color stops. For multi-stop gradients, copy the CSS output and add extra stops manually in your editor." },
        { q: "What is a radial gradient?", a: "A radial gradient spreads outward from a center point, like a spotlight. Useful for backgrounds and glowing effects." },
        { q: "What is a conic gradient?", a: "A conic gradient rotates colors around a center point, like a color wheel or pie chart." },
        { q: "Does this work with Tailwind?", a: "Use the 'Copy Tailwind' button for an inline style snippet, or paste the raw CSS into a Tailwind arbitrary value like bg-[linear-gradient(...)]." },
      ]}
    >
      {/* Preview */}
      <div className="rounded-2xl border border-border" style={{ ...previewStyle, height: 220 }} aria-label="Gradient preview" />

      {/* Type selector */}
      <div className="mt-5">
        <p className="mb-2 text-sm font-medium">Type</p>
        <div className="flex gap-2">
          {(["linear", "radial", "conic"] as GradientType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize transition ${
                type === t ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:bg-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Presets */}
      <div className="mt-4">
        <p className="mb-2 text-sm font-medium">Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              title={p.name}
              className="h-8 w-8 rounded-lg border-2 border-border shadow-soft transition hover:scale-110 hover:border-primary active:scale-95"
              style={buildPreview(p.type, p.a, p.b, p.angle)}
              aria-label={`Apply ${p.name} preset`}
            />
          ))}
        </div>
        <div className="mt-1 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <span key={p.name} className="text-xs text-muted-foreground">{p.name}</span>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <label className="text-sm">
          Color A
          <input type="color" value={a} onChange={(e) => setA(e.target.value)} className="mt-1 h-10 w-full cursor-pointer rounded-lg border border-border" />
        </label>
        <label className="text-sm">
          Color B
          <input type="color" value={b} onChange={(e) => setB(e.target.value)} className="mt-1 h-10 w-full cursor-pointer rounded-lg border border-border" />
        </label>
        {(type === "linear" || type === "conic") && (
          <label className="text-sm">
            Angle: {angle}°
            <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(+e.target.value)} className="mt-3 w-full accent-primary" />
          </label>
        )}
      </div>

      {/* CSS output */}
      <pre className="mt-5 overflow-x-auto rounded-xl bg-muted/60 p-4 text-xs"><code>{css}</code></pre>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={copy}
          className="flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-pop transition active:scale-95"
        >
          <Copy className="h-4 w-4" /> Copy CSS
        </button>
        <button
          onClick={copyTailwind}
          className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-muted active:scale-95"
        >
          <Copy className="h-4 w-4" /> Copy Tailwind
        </button>
      </div>
    </ToolPageShell>
  );
}
