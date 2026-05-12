"use client";
import { useMemo, useState } from "react";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
export function WordCounterClient({ tool }: { tool: Tool }) {
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
      intro="Paste your text and see word count, character count, sentence count and reading time update as you type."
      features={[
        { title: "Live stats", desc: "Every number updates the moment you type or paste." },
        { title: "Reading time", desc: "Calculated at 200 words per minute. Useful for blog posts and social captions." },
        { title: "Private", desc: "Your text stays on your device and is never sent anywhere." },
      ]}
      howTo={["Paste or type your text in the editor.", "Word count, characters, sentences and reading time all update live.", "Use the reading time to check if your content fits the format you are writing for."]}
      faqs={[
        { q: "Is there a character limit?", a: "No. Paste as much text as you want." },
        { q: "How is reading time calculated?", a: "It uses the average adult reading speed of 200 words per minute." },
      ]}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} placeholder="Start typing or paste text…"
        className="w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {([["Words", stats.words], ["Characters", stats.chars], ["No spaces", stats.noSpaces], ["Sentences", stats.sentences], ["Reading", `${stats.reading} min`]] as [string, string | number][]).map(([k, v]) => (
          <div key={k} className="rounded-xl border border-border bg-muted/40 p-3 text-center">
            <div className="text-2xl font-bold">{v}</div>
            <div className="text-xs text-muted-foreground">{k}</div>
          </div>
        ))}
      </div>
    </ToolPageShell>
  );
}
