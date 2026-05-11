"use client";
import { useState } from "react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("color-palette-generator")!;
function rand() { return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0"); }
export function ColorPaletteClient() {
  const [cols, setCols] = useState<string[]>(() => Array.from({ length: 5 }, rand));
  return (
    <ToolPageShell tool={tool}
      intro="Generate a fresh color palette in one click. Tap any swatch to copy the hex code and use it anywhere."
      features={[
        { title: "One-click generation", desc: "Hit the button and get five new colors instantly." },
        { title: "Copy hex instantly", desc: "Tap any swatch and the hex code goes to your clipboard." },
        { title: "Free forever", desc: "No signup, no watermarks, no limits." },
      ]}
      howTo={["Click Generate to create a new palette.", "Tap any swatch to copy its hex code.", "Use the colors in Figma, CSS or your brand guidelines."]}
      faqs={[
        { q: "Are the colors random?", a: "Yes. Each click generates a fresh set of swatches. Save the ones you like before generating again." },
        { q: "Can I use them in commercial projects?", a: "Yes. The colors are yours to use in any project, personal or commercial." },
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
