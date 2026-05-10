import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("text-case-converter")!;
export const Route = createFileRoute("/text-case-converter")({
  head: () => ({ meta: [
    { title: `${tool.name} — UPPER, lower, Title, camelCase | Sounez` },
    { name: "description", content: tool.description },
    { property: "og:title", content: tool.name },
    { property: "og:description", content: tool.description },
  ]}),
  component: Page,
});
const conv = {
  UPPER: (s: string) => s.toUpperCase(),
  lower: (s: string) => s.toLowerCase(),
  Title: (s: string) => s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()),
  Sentence: (s: string) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
  camelCase: (s: string) => s.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, c) => c.toUpperCase()),
  "kebab-case": (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  snake_case: (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
};
function Page() {
  const [text, setText] = useState("Hello world from Sounez!");
  return (
    <ToolPageShell tool={tool}
      intro="Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, kebab-case and snake_case."
      features={[
        { title: "7 cases", desc: "Cover every common formatting need." },
        { title: "One-click copy", desc: "Each result has its own copy button." },
        { title: "Free", desc: "No limits or signup." },
      ]}
      howTo={["Paste your text.", "See all conversions instantly.", "Copy the one you need."]}
      faqs={[
        { q: "Does it work with non-English text?", a: "Mostly — upper/lowercase work for any Unicode text." },
        { q: "Can I convert long text?", a: "Yes, no character limit." },
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
                <button onClick={() => { navigator.clipboard.writeText(out); toast.success(`Copied ${name}`); }} className="text-xs font-medium text-primary transition hover:underline active:scale-95">Copy</button>
              </div>
              <p className="mt-1 break-all text-sm">{out}</p>
            </div>
          );
        })}
      </div>
    </ToolPageShell>
  );
}
