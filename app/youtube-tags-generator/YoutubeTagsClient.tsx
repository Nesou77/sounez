"use client";
import { useState } from "react";
import { Copy, X } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult } from "@/lib/analytics";

const PREFIX_MODS = ["best", "top", "how to", "free", "easy", "complete", "ultimate", "simple", "quick", "pro"];
const SUFFIX_MODS = ["tutorial", "guide", "tips", "2026", "for beginners", "explained", "ideas", "review", "examples", "shorts"];

function makeTags(seed: string): string[] {
  const s = seed.trim().toLowerCase();
  if (!s) return [];
  const base = [s];
  const prefixed = PREFIX_MODS.map((m) => `${m} ${s}`);
  const suffixed = SUFFIX_MODS.map((m) => `${s} ${m}`);
  return [...base, ...prefixed, ...suffixed].slice(0, 25);
}

export function YoutubeTagsClient({ tool }: { tool: Tool }) {
  const [seed, setSeed] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);
  useToolView(tool);

  const make = () => {
    const s = seed.trim();
    if (!s) { toast.error("Enter a keyword first"); return; }
    const result = makeTags(s);
    setTags(result);
    toast.success(`${result.length} tags generated`);
    trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "youtube_tags" });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(tags.join(", "));
    toast.success("All tags copied — paste into YouTube Studio");
    trackCopyResult({ tool_slug: tool.slug, result_type: "youtube_tags" });
  };

  const copyOne = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    toast.success(`Copied: ${tag}`);
    trackCopyResult({ tool_slug: tool.slug, result_type: "youtube_tag_single" });
    setTimeout(() => setCopiedTag(null), 1500);
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Type your video's main keyword and get 25 YouTube tags ready to paste into YouTube Studio. Takes about five seconds."
      features={[
        { title: "25 tags instantly", desc: "One keyword generates a full set of SEO-relevant tags." },
        { title: "Copy all at once", desc: "Paste the full comma-separated list straight into YouTube Studio." },
        { title: "Copy individual tags", desc: "Click any tag to copy just that one. Remove tags you don't need." },
        { title: "Free", desc: "No signup, no limits." },
      ]}
      howTo={[
        "Enter your video's main keyword in the box, then press Enter or click Generate.",
        "Review the tags — remove any that don't fit your video.",
        "Click Copy all and paste them into YouTube Studio under Video Details → Tags.",
      ]}
      faqs={[
        { q: "Do YouTube tags still work in 2026?", a: "Yes. Tags help YouTube understand the context of your video. They matter less than the title and thumbnail, but they still help surface your video in related searches." },
        { q: "How many tags should I use?", a: "10 to 20 relevant tags is a solid range. YouTube allows up to 500 characters total in the tags field. Focus on relevance over quantity." },
        { q: "Should I use long-tail tags?", a: "Yes. A mix of short broad tags (e.g. 'fitness') and longer specific tags (e.g. 'beginner home workout tips') covers more search queries." },
        { q: "Can I use the same tags on every video?", a: "Avoid it. Reusing the exact same tags on every video can dilute your channel's topical relevance. Generate fresh tags for each video based on its specific topic." },
      ]}
      useCases={[
        { title: "YouTubers", desc: "Quickly cover the right search terms without spending time on keyword research for every upload." },
        { title: "Content agencies", desc: "Generate tag sets for clients across multiple niches in seconds." },
        { title: "Educators", desc: "Make sure tutorial videos reach beginners searching for step-by-step guides." },
        { title: "Small businesses", desc: "Improve the discoverability of product demos and how-to videos." },
      ]}
    >
      <div className="flex gap-2">
        <input
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && make()}
          placeholder="e.g. productivity tips"
          aria-label="Video keyword"
          className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button
          onClick={make}
          className="rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95"
        >
          Generate
        </button>
      </div>

      {tags.length > 0 && (
        <>
          <div className="mt-4 flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-muted-foreground">{tags.length} tags</p>
            <button
              onClick={copyAll}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold transition hover:bg-muted active:scale-95"
            >
              <Copy className="h-3.5 w-3.5" /> Copy all
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="group flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium transition hover:bg-accent"
              >
                <button
                  onClick={() => copyOne(t)}
                  title={`Copy: ${t}`}
                  aria-label={`Copy tag: ${t}`}
                  className="hover:text-primary"
                >
                  {copiedTag === t ? "✓" : t}
                </button>
                <button
                  onClick={() => removeTag(t)}
                  title={`Remove tag: ${t}`}
                  aria-label={`Remove tag: ${t}`}
                  className="opacity-0 transition group-hover:opacity-100 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Click a tag to copy it individually. Click × to remove it from the list.</p>
        </>
      )}
    </ToolPageShell>
  );
}
