import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("css-gradient-generator")!;
export const Route = createFileRoute("/css-gradient-generator")({
  head: () => ({ meta: [
    { title: `${tool.name} — Free CSS Gradient Maker | Sounez` },
    { name: "description", content: tool.description },
    { property: "og:title", content: tool.name },
    { property: "og:description", content: tool.description },
  ]}),
  component: Page,
});
function Page() {
  const [a, setA] = useState("#6366F1");
  const [b, setB] = useState("#8B5CF6");
  const [angle, setAngle] = useState(135);
  const css = `background: linear-gradient(${angle}deg, ${a}, ${b});`;
  return (
    <ToolPageShell tool={tool}
      intro="Build smooth CSS gradients with a live preview, then copy the production-ready code."
      features={[
        { title: "Live preview", desc: "Tweak colors and angle, see results instantly." },
        { title: "Copy-ready CSS", desc: "Paste straight into your stylesheet." },
        { title: "Free forever", desc: "No signup, no limits." },
      ]}
      howTo={["Pick two colors.", "Adjust the angle.", "Copy the CSS."]}
      faqs={[
        { q: "Can I use more than two colors?", a: "Currently two — multi-stop coming soon." },
        { q: "Does this support Tailwind?", a: "Yes — paste the CSS in arbitrary class syntax or use the raw colors." },
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
