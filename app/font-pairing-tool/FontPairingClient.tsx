"use client";

import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult } from "@/lib/analytics";

type Style = "modern" | "elegant" | "startup" | "editorial" | "minimal" | "playful";

type Pairing = {
  heading: string;
  body: string;
  headingStack: string;
  bodyStack: string;
  googleUrl: string;
};

const PAIRINGS: Record<Style, Pairing[]> = {
  modern: [
    { heading: "Inter", body: "Source Serif 4", headingStack: "'Inter', sans-serif", bodyStack: "'Source Serif 4', Georgia, serif", googleUrl: "https://fonts.google.com/specimen/Inter" },
    { heading: "Manrope", body: "Roboto Slab", headingStack: "'Manrope', sans-serif", bodyStack: "'Roboto Slab', Georgia, serif", googleUrl: "https://fonts.google.com/specimen/Manrope" },
  ],
  elegant: [
    { heading: "Playfair Display", body: "Inter", headingStack: "'Playfair Display', Georgia, serif", bodyStack: "'Inter', sans-serif", googleUrl: "https://fonts.google.com/specimen/Playfair+Display" },
    { heading: "Cormorant Garamond", body: "Lato", headingStack: "'Cormorant Garamond', Georgia, serif", bodyStack: "'Lato', sans-serif", googleUrl: "https://fonts.google.com/specimen/Cormorant+Garamond" },
  ],
  startup: [
    { heading: "Space Grotesk", body: "Inter", headingStack: "'Space Grotesk', sans-serif", bodyStack: "'Inter', sans-serif", googleUrl: "https://fonts.google.com/specimen/Space+Grotesk" },
    { heading: "Poppins", body: "Lora", headingStack: "'Poppins', sans-serif", bodyStack: "'Lora', Georgia, serif", googleUrl: "https://fonts.google.com/specimen/Poppins" },
  ],
  editorial: [
    { heading: "DM Sans", body: "Fraunces", headingStack: "'DM Sans', sans-serif", bodyStack: "'Fraunces', Georgia, serif", googleUrl: "https://fonts.google.com/specimen/DM+Sans" },
    { heading: "Oswald", body: "Open Sans", headingStack: "'Oswald', sans-serif", bodyStack: "'Open Sans', sans-serif", googleUrl: "https://fonts.google.com/specimen/Oswald" },
  ],
  minimal: [
    { heading: "Montserrat", body: "Merriweather", headingStack: "'Montserrat', sans-serif", bodyStack: "'Merriweather', Georgia, serif", googleUrl: "https://fonts.google.com/specimen/Montserrat" },
    { heading: "Nunito", body: "PT Serif", headingStack: "'Nunito', sans-serif", bodyStack: "'PT Serif', Georgia, serif", googleUrl: "https://fonts.google.com/specimen/Nunito" },
  ],
  playful: [
    { heading: "Fredoka One", body: "Nunito", headingStack: "'Fredoka One', cursive", bodyStack: "'Nunito', sans-serif", googleUrl: "https://fonts.google.com/specimen/Fredoka+One" },
    { heading: "Righteous", body: "Quicksand", headingStack: "'Righteous', cursive", bodyStack: "'Quicksand', sans-serif", googleUrl: "https://fonts.google.com/specimen/Righteous" },
  ],
};

const STYLES: Style[] = ["modern", "elegant", "startup", "editorial", "minimal", "playful"];

export function FontPairingClient({ tool }: { tool: Tool }) {
  const [style, setStyle] = useState<Style>("modern");
  const [idx, setIdx] = useState(0);

  useToolView(tool);

  const options = PAIRINGS[style];
  const pairing = options[idx % options.length];

  const generate = () => {
    const next = (idx + 1) % options.length;
    setIdx(next);
    toast.success("New pairing loaded");
    trackToolComplete({
      tool_slug: tool.slug,
      tool_name: tool.name,
      tool_category: tool.category,
      output_type: "font_pairing_css",
    });
  };

  const changeStyle = (s: Style) => {
    setStyle(s);
    setIdx(0);
  };

  const css = `/* Heading font */
font-family: ${pairing.headingStack};

/* Body font */
font-family: ${pairing.bodyStack};`;

  const copyCss = () => {
    navigator.clipboard.writeText(css);
    toast.success("CSS copied");
    trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "font_pairing_css" });
    trackCopyResult({ tool_slug: tool.slug, result_type: "font_pairing_css" });
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Find clean font combinations for websites, landing pages, blogs and brand projects."
      features={[
        { title: "Ready-made pairings", desc: "Start with curated typography combinations." },
        { title: "Live preview", desc: "See heading and body text together instantly." },
        { title: "Copy CSS", desc: "Get a simple CSS snippet for your design." },
      ]}
      howTo={[
        "Choose a design style.",
        "Generate or browse font pairings.",
        "Copy the CSS and apply it to your project.",
      ]}
      faqs={[
        { q: "What makes a good font pairing?", a: "A good pairing usually combines contrast and readability, a strong heading font with a clean body font." },
        { q: "Should I use more than two fonts?", a: "Usually no. Two fonts are enough for most websites. More than two creates visual noise." },
        { q: "Can I use Google Fonts?", a: "Yes. Each pairing links to Google Fonts. Load only the weights you need to keep the site fast." },
      ]}
    >
      {/* Style selector */}
      <div className="mb-5">
        <p className="mb-2 text-sm font-medium">Design style</p>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => changeStyle(s)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize transition ${
                style === s
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-2xl border border-border bg-background p-6 space-y-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Heading, {pairing.heading}</p>
          <p style={{ fontFamily: pairing.headingStack }} className="text-3xl font-bold leading-tight">
            The quick brown fox jumps
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Body, {pairing.body}</p>
          <p style={{ fontFamily: pairing.bodyStack }} className="text-base leading-relaxed text-muted-foreground">
            Good typography makes reading easier. The right font pairing creates visual hierarchy and helps readers scan your content.
          </p>
        </div>
        <div style={{ fontFamily: pairing.bodyStack }} className="flex gap-3">
          <span className="rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground">Get started</span>
          <span className="rounded-lg border border-border px-4 py-2 text-sm font-semibold">Learn more</span>
        </div>
      </div>

      {/* CSS output */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">CSS snippet</p>
          <div className="flex gap-2">
            <button type="button" onClick={generate} className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition hover:bg-muted active:scale-95">
              <RefreshCw className="h-3.5 w-3.5" /> Next pairing
            </button>
            <button type="button" onClick={copyCss} className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition hover:bg-muted active:scale-95">
              <Copy className="h-3.5 w-3.5" /> Copy CSS
            </button>
          </div>
        </div>
        <pre className="overflow-x-auto rounded-xl bg-muted/60 p-4 text-xs leading-relaxed"><code>{css}</code></pre>
        <p className="mt-2 text-xs text-muted-foreground">
          Load fonts from{" "}
          <a href={pairing.googleUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
            Google Fonts
          </a>{" "}
          for web use.
        </p>
      </div>
    </ToolPageShell>
  );
}
