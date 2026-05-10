import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("color-palette-generator")!;
export const Route = createFileRoute("/color-palette-generator")({
  head: () => ({ meta: [
    { title: `${tool.name} — Free Palette Maker | Sounez` },
    { name: "description", content: tool.description },
    { property: "og:title", content: tool.name },
    { property: "og:description", content: tool.description },
  ]}),
  component: Page,
});
function rand() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
}
function Page() {
  const [cols, setCols] = useState<string[]>(() => Array.from({ length: 5 }, rand));
  return (
    <ToolPageShell tool={tool}
      intro="Generate beautiful, harmonious color palettes for your next design project. Click any swatch to copy its hex value."
      features={[
        { title: "One-click generation", desc: "Spin a fresh palette in a single click." },
        { title: "Copy hex instantly", desc: "Tap a swatch to copy its value." },
        { title: "Free forever", desc: "No signup, no watermarks." },
      ]}
      howTo={["Click Generate to create a new palette.", "Tap any swatch to copy its hex code.", "Use it in Figma, CSS or your brand."]}
      faqs={[
        { q: "Are colors random?", a: "Yes — each click generates fresh swatches. Save the ones you love." },
        { q: "Can I use them commercially?", a: "Absolutely. Colors are free to use in any project." },
      ]}>
      <div className="grid grid-cols-5 gap-3">
        {cols.map((c, i) => (
          <button key={i} onClick={() => { navigator.clipboard.writeText(c); toast.success(`Copied ${c.toUpperCase()}`); }}
            className="group flex aspect-[3/4] flex-col items-center justify-end rounded-2xl p-3 text-xs font-mono text-white shadow-soft transition-transform hover:scale-[1.04] active:scale-[0.98]"
            style={{ backgroundColor: c }}>
            <span className="rounded bg-black/30 px-2 py-1 backdrop-blur">{c.toUpperCase()}</span>
          </button>
        ))}
      </div>
      <button onClick={() => { setCols(Array.from({ length: 5 }, rand)); toast.success("New palette generated"); }}
        className="mt-5 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-pop transition active:scale-95">
        Generate new palette
      </button>
    </ToolPageShell>
  );
}
