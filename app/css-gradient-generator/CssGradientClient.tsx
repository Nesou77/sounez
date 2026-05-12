"use client";
import { useState } from "react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
export function CssGradientClient({ tool }: { tool: Tool }) {
  const [a, setA] = useState("#6366F1");
  const [b, setB] = useState("#8B5CF6");
  const [angle, setAngle] = useState(135);
  const css = `background: linear-gradient(${angle}deg, ${a}, ${b});`;
  return (
    <ToolPageShell tool={tool}
      intro="Pick two colors, set an angle, and get the CSS gradient code ready to paste into your project."
      features={[
        { title: "Live preview", desc: "Change colors or angle and see the result update immediately." },
        { title: "Copy-ready CSS", desc: "One click copies the code straight to your clipboard." },
        { title: "Free forever", desc: "No signup, no limits." },
      ]}
      howTo={["Pick your two colors.", "Drag the angle slider to rotate the gradient.", "Copy the CSS and paste it into your stylesheet."]}
      faqs={[
        { q: "Can I use more than two colors?", a: "Right now it supports two color stops. Multi-stop gradients are coming soon." },
        { q: "Does this work with Tailwind?", a: "Yes. Paste the CSS value inside an arbitrary class or use the raw hex colors directly." },
      ]}>
      <div className="rounded-2xl" style={{ background: `linear-gradient(${angle}deg, ${a}, ${b})`, height: 220 }} />
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <label className="text-sm">Color A
          <input type="color" value={a} onChange={(e) => setA(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-border" />
        </label>
        <label className="text-sm">Color B
          <input type="color" value={b} onChange={(e) => setB(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-border" />
        </label>
        <label className="text-sm">Angle: {angle}°
          <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(+e.target.value)} className="mt-3 w-full accent-primary" />
        </label>
      </div>
      <pre className="mt-5 overflow-x-auto rounded-xl bg-muted/60 p-4 text-xs"><code>{css}</code></pre>
      <button onClick={() => { navigator.clipboard.writeText(css); toast.success("CSS copied to clipboard"); }} className="mt-3 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-pop transition active:scale-95">Copy CSS</button>
    </ToolPageShell>
  );
}
