"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult } from "@/lib/analytics";

export function WordCounterClient({ tool }: { tool: Tool }) {
  const [text, setText] = useState("");
  const completedRef = useRef(false);
  useToolView(tool);

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const noSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
    const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim().length > 0).length;
    const reading = Math.max(1, Math.round(words / 200));
    const wordList = text.trim() ? text.trim().toLowerCase().split(/\s+/) : [];
    const unique = new Set(wordList).size;
    const avgWordLen =
      wordList.length > 0
        ? (wordList.reduce((s, w) => s + w.replace(/[^a-z]/gi, "").length, 0) / wordList.length).toFixed(1)
        : "0";
    return { words, chars, noSpaces, sentences, paragraphs, reading, unique, avgWordLen };
  }, [text]);

  useEffect(() => {
    if (completedRef.current || stats.words === 0) return;
    completedRef.current = true;
    trackToolComplete({
      tool_slug: tool.slug,
      tool_name: tool.name,
      tool_category: tool.category,
      output_type: "word_count_stats",
    });
  }, [stats.words, tool.slug, tool.name, tool.category]);

  const copyStats = () => {
    const summary = [
      `Words: ${stats.words}`,
      `Characters: ${stats.chars}`,
      `Characters (no spaces): ${stats.noSpaces}`,
      `Sentences: ${stats.sentences}`,
      `Paragraphs: ${stats.paragraphs}`,
      `Unique words: ${stats.unique}`,
      `Reading time: ${stats.reading} min`,
    ].join("\n");
    navigator.clipboard.writeText(summary);
    toast.success("Stats copied to clipboard");
    trackCopyResult({ tool_slug: tool.slug, result_type: "word_count_stats" });
  };

  const clear = () => {
    setText("");
    completedRef.current = false;
    toast.success("Cleared");
  };

  const STAT_CELLS: [string, string | number][] = [
    ["Words", stats.words],
    ["Characters", stats.chars],
    ["No spaces", stats.noSpaces],
    ["Sentences", stats.sentences],
    ["Paragraphs", stats.paragraphs],
    ["Unique words", stats.unique],
    ["Avg word length", stats.avgWordLen],
    ["Reading time", `${stats.reading} min`],
  ];

  return (
    <ToolPageShell
      tool={tool}
      intro="Paste your text and see word count, character count, sentence count, paragraph count, and reading time update as you type. No upload, no limit."
      features={[
        { title: "Live stats", desc: "Every number updates the moment you type or paste — no button to press." },
        { title: "8 metrics at once", desc: "Words, characters, sentences, paragraphs, unique words, avg word length and reading time." },
        { title: "Private", desc: "Your text stays on your device and is never sent anywhere." },
      ]}
      howTo={[
        "Paste or type your text in the editor.",
        "All 8 stats update instantly below the text area.",
        "Use the Copy stats button to grab a summary. Use Clear to start fresh.",
      ]}
      faqs={[
        { q: "Is there a character limit?", a: "No. Paste as much text as you want — a blog post, an essay, or an entire chapter." },
        { q: "How is reading time calculated?", a: "It uses the average adult reading speed of 200 words per minute." },
        { q: "What counts as a paragraph?", a: "A paragraph is a block of text separated from the next by a blank line." },
        { q: "Does it count unique words accurately?", a: "It counts unique lowercase words. 'Run' and 'run' are treated as the same word. Punctuation attached to words is stripped." },
        { q: "Is my text stored anywhere?", a: "No. The counter runs entirely in your browser and your text is never sent to any server." },
      ]}
      useCases={[
        { title: "Bloggers & writers", desc: "Check word count against your target length before publishing." },
        { title: "Students", desc: "Make sure essays hit the minimum word count for assignments." },
        { title: "SEO specialists", desc: "Measure content depth and reading time to match your target reader's intent." },
        { title: "Social media managers", desc: "Count characters for caption limits before copy-pasting into apps." },
      ]}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        placeholder="Start typing or paste text here…"
        aria-label="Text to analyse"
        className="w-full rounded-xl border border-border bg-background p-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      {/* Stats grid */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STAT_CELLS.map(([k, v]) => (
          <div key={k} className="rounded-xl border border-border bg-muted/40 p-3 text-center">
            <div className="text-2xl font-bold">{v}</div>
            <div className="text-xs text-muted-foreground">{k}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={copyStats}
          disabled={stats.words === 0}
          className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-muted active:scale-95 disabled:opacity-40"
        >
          <Copy className="h-4 w-4" /> Copy stats
        </button>
        <button
          onClick={clear}
          disabled={text.length === 0}
          className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-muted active:scale-95 disabled:opacity-40"
        >
          <RotateCcw className="h-4 w-4" /> Clear
        </button>
      </div>
    </ToolPageShell>
  );
}
