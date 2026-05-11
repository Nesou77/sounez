"use client";
import { useState } from "react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("youtube-tags-generator")!;
const MODS = ["best", "top", "2026", "tutorial", "guide", "tips", "free", "review", "how to", "for beginners", "explained", "ideas", "examples", "shorts", "fast"];
export function YoutubeTagsClient() {
  const [seed, setSeed] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const make = () => {
    const s = seed.trim().toLowerCase();
    if (!s) { toast.error("Enter a keyword first"); return setTags([]); }
    setTags([s, ...MODS.map((m) => `${m} ${s}`), ...MODS.map((m) => `${s} ${m}`)].slice(0, 25));
    toast.success("Tags generated");
  };
  return (
    <ToolPageShell tool={tool}
      intro="Type your video's main keyword and get 25 YouTube tags ready to paste into YouTube Studio. Takes about five seconds."
      features={[
        { title: "25 tags instantly", desc: "One keyword generates a full set of SEO-friendly tags." },
        { title: "Copy with one tap", desc: "Copies the full comma-separated list to your clipboard." },
        { title: "Free", desc: "No signup, no limits." },
      ]}
      howTo={["Enter your video's main keyword in the box.", "Click Generate.", "Copy all tags and paste them into YouTube Studio."]}
      faqs={[
        { q: "Do YouTube tags still work in 2026?", a: "Yes. They help YouTube understand the context of your video, even if titles and thumbnails carry more weight." },
        { q: "How many tags should I use?", a: "Between 10 and 20 relevant tags is a good range. Focus on quality over quantity." },
      ]}>
      <div className="flex gap-2">
        <input value={seed} onChange={(e) => setSeed(e.target.value)} placeholder="e.g. productivity tips"
          className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        <button onClick={make} className="rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop">Generate</button>
      </div>
      {tags.length > 0 && (
        <>
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs">{t}</span>)}
          </div>
          <button onClick={() => { navigator.clipboard.writeText(tags.join(", ")); toast.success("All tags copied"); }} className="mt-4 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-muted active:scale-95">Copy all</button>
        </>
      )}
    </ToolPageShell>
  );
}
