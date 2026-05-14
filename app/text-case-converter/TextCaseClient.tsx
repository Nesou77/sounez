"use client";
import { useState } from "react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult } from "@/lib/analytics";
const conv: Record<string, (s: string) => string> = {
  UPPER: (s) => s.toUpperCase(),
  lower: (s) => s.toLowerCase(),
  Title: (s) => s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()),
  Sentence: (s) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
  camelCase: (s) => s.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, c) => c.toUpperCase()),
  "kebab-case": (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  snake_case: (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
};
export function TextCaseClient({ tool }: { tool: Tool }) {
  const [text, setText] = useState("Hello world from Sounez!");
  useToolView(tool);
  return (
    <ToolPageShell tool={tool}
      intro="Paste your text and convert it to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, kebab-case or snake_case in one click."
      features={[
        { title: "7 formats", desc: "Covers every common text formatting need in one place." },
        { title: "One-click copy", desc: "Each result has its own copy button so you grab exactly what you need." },
        { title: "Free", desc: "No limits, no signup." },
      ]}
      howTo={["Paste your text into the box.", "All seven conversions appear instantly below.", "Click Copy next to the format you want."]}
      faqs={[
        { q: "Does it work with non-English text?", a: "Mostly yes. Uppercase and lowercase conversions work for any Unicode text." },
        { q: "Is there a character limit?", a: "No. Paste as much text as you need." },
      ]}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4}
        className="w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {Object.entries(conv).map(([name, fn]) => {
          const out = fn(text);
          return (
            <div key={name} className="rounded-xl border border-border bg-muted/30 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{name}</span>
                <button onClick={() => {
                  navigator.clipboard.writeText(out);
                  toast.success(`Copied ${name}`);
                  trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "text_case" });
                  trackCopyResult({ tool_slug: tool.slug, result_type: `text_case_${name.toLowerCase().replace(/[^a-z0-9]/g, "_")}` });
                }} className="text-xs font-medium text-primary transition hover:underline active:scale-95">Copy</button>
              </div>
              <p className="mt-1 break-all text-sm">{out}</p>
            </div>
          );
        })}
      </div>
    </ToolPageShell>
  );
}
