import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("word-counter")!;
export const Route = createFileRoute("/word-counter")({
  head: () => ({ meta: [
    { title: `${tool.name} — Free Word & Character Counter | Sounez` },
    { name: "description", content: tool.description },
    { property: "og:title", content: tool.name },
    { property: "og:description", content: tool.description },
  ]}),
  component: Page,
});
function Page() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const noSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const reading = Math.max(1, Math.round(words / 200));
    return { words, chars, noSpaces, sentences, reading };
  }, [text]);
  return (
    <ToolPageShell tool={tool}
      intro="Count words, characters, sentences and reading time for any text. Perfect for blog posts, captions and essays."
      features={[
        { title: "Live stats", desc: "Numbers update as you type." },
        { title: "Reading time", desc: "Estimated at 200 wpm — great for blog posts." },
        { title: "Private", desc: "Your text stays on your device." },
      ]}
      howTo={["Paste your text in the editor.", "See live word, character and sentence counts.", "Use the reading time to fit blog or social formats."]}
      faqs={[
        { q: "Is there a character limit?", a: "No — paste as much as you'd like." },
        { q: "How is reading time calculated?", a: "Based on the average adult reading speed of 200 words per minute." },
      ]}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} placeholder="Start typing or paste text…"
        className="w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[["Words", stats.words], ["Characters", stats.chars], ["No spaces", stats.noSpaces], ["Sentences", stats.sentences], ["Reading", `${stats.reading} min`]].map(([k, v]) => (
          <div key={k as string} className="rounded-xl border border-border bg-muted/40 p-3 text-center">
            <div className="text-2xl font-bold">{v}</div>
            <div className="text-xs text-muted-foreground">{k}</div>
          </div>
        ))}
      </div>
    </ToolPageShell>
  );
}
