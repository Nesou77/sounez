"use client";

import { useState } from "react";
import { Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";

const tool = toolBySlug("box-shadow-generator")!;

type Preset = { label: string; h: number; v: number; blur: number; spread: number; opacity: number; inset: boolean };

const PRESETS: Preset[] = [
  { label: "Soft", h: 0, v: 4, blur: 24, spread: -4, opacity: 0.12, inset: false },
  { label: "Medium", h: 0, v: 8, blur: 32, spread: -4, opacity: 0.18, inset: false },
  { label: "Large", h: 0, v: 20, blur: 60, spread: -8, opacity: 0.22, inset: false },
  { label: "Sharp", h: 4, v: 4, blur: 0, spread: 0, opacity: 0.25, inset: false },
  { label: "Inner", h: 0, v: 2, blur: 8, spread: 0, opacity: 0.15, inset: true },
];

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export function BoxShadowClient() {
  const [h, setH] = useState(0);
  const [v, setV] = useState(8);
  const [blur, setBlur] = useState(24);
  const [spread, setSpread] = useState(-4);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0.15);
  const [inset, setInset] = useState(false);
  const [radius, setRadius] = useState(16);
  const [bgColor, setBgColor] = useState("#ffffff");

  const { r, g, b } = hexToRgb(color);
  const shadowValue = `${inset ? "inset " : ""}${h}px ${v}px ${blur}px ${spread}px rgba(${r}, ${g}, ${b}, ${opacity.toFixed(2)})`;
  const css = `box-shadow: ${shadowValue};`;

  const applyPreset = (p: Preset) => {
    setH(p.h); setV(p.v); setBlur(p.blur); setSpread(p.spread);
    setOpacity(p.opacity); setInset(p.inset);
    toast.success(`${p.label} preset applied`);
  };

  const reset = () => {
    setH(0); setV(8); setBlur(24); setSpread(-4);
    setColor("#000000"); setOpacity(0.15); setInset(false);
    setRadius(16); setBgColor("#ffffff");
    toast.success("Reset to defaults");
  };

  const copyCss = () => {
    navigator.clipboard.writeText(css);
    toast.success("CSS copied");
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Create and preview CSS box shadows visually, then copy the CSS code into your project."
      features={[
        { title: "Live preview", desc: "See shadow changes instantly as you adjust the controls." },
        { title: "CSS output", desc: "Copy production-ready box-shadow code with one click." },
        { title: "Presets included", desc: "Start from soft, medium, large, sharp or inner shadow styles." },
      ]}
      howTo={[
        "Adjust the shadow sliders or pick a preset.",
        "Preview the card until it looks right.",
        "Copy the generated CSS.",
      ]}
      faqs={[
        { q: "What is box-shadow in CSS?", a: "It is a CSS property used to add shadows around elements, creating depth and visual hierarchy." },
        { q: "Can I create inner shadows?", a: "Yes. Enable the Inset option to create an inner shadow effect." },
        { q: "Should I use strong shadows?", a: "Use shadows carefully. Subtle shadows often look more professional and modern." },
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Preview */}
        <div
          className="flex items-center justify-center rounded-2xl border border-border p-10 min-h-[240px]"
          style={{ backgroundColor: bgColor }}
        >
          <div
            className="flex h-32 w-48 items-center justify-center text-sm font-semibold text-muted-foreground"
            style={{
              boxShadow: shadowValue,
              borderRadius: `${radius}px`,
              backgroundColor: bgColor === "#ffffff" ? "#f8fafc" : "#ffffff",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            Preview card
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3 text-sm">
          {/* Presets */}
          <div>
            <p className="mb-2 font-medium">Presets</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button key={p.label} onClick={() => applyPreset(p)} className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold transition hover:border-primary/50 hover:bg-muted active:scale-95">
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {[
            { label: `Horizontal offset: ${h}px`, min: -100, max: 100, val: h, set: setH },
            { label: `Vertical offset: ${v}px`, min: -100, max: 100, val: v, set: setV },
            { label: `Blur radius: ${blur}px`, min: 0, max: 100, val: blur, set: setBlur },
            { label: `Spread radius: ${spread}px`, min: -50, max: 50, val: spread, set: setSpread },
            { label: `Opacity: ${Math.round(opacity * 100)}%`, min: 0, max: 100, val: Math.round(opacity * 100), set: (v: number) => setOpacity(v / 100) },
            { label: `Border radius: ${radius}px`, min: 0, max: 50, val: radius, set: setRadius },
          ].map(({ label, min, max, val, set }) => (
            <div key={label}>
              <label className="mb-1 block font-medium">{label}</label>
              <input type="range" min={min} max={max} value={val} onChange={(e) => set(+e.target.value)} className="w-full accent-primary" />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="shadow-color" className="mb-1.5 block font-medium">Shadow color</label>
              <input id="shadow-color" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-full rounded-lg border border-border cursor-pointer" />
            </div>
            <div>
              <label htmlFor="bg-color" className="mb-1.5 block font-medium">Background</label>
              <input id="bg-color" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-10 w-full rounded-lg border border-border cursor-pointer" />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} className="accent-primary" />
            <span className="font-medium">Inset shadow</span>
          </label>
        </div>
      </div>

      {/* CSS output */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">CSS output</p>
          <div className="flex gap-2">
            <button onClick={reset} className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition hover:bg-muted active:scale-95">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            <button onClick={copyCss} className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition hover:bg-muted active:scale-95">
              <Copy className="h-3.5 w-3.5" /> Copy CSS
            </button>
          </div>
        </div>
        <pre className="overflow-x-auto rounded-xl bg-muted/60 p-4 text-xs"><code>{css}</code></pre>
      </div>
    </ToolPageShell>
  );
}
