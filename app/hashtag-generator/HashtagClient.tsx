"use client";
import { useState } from "react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("hashtag-generator")!;
const MODS = ["", "tips", "daily", "love", "official", "lover", "community", "ofinstagram", "oftheday", "addict", "life", "world", "vibes", "gram", "post", "pro", "2026", "viral", "trending"];
export function HashtagClient() {
  const [seed, setSeed] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const make = () => {
    const s = seed.trim().toLowerCase().replace(/\s+/g, "");
    if (!s) { toast.error("Enter a keyword first"); return setTags([]); }
    setTags(MODS.map((m) => `#${s}${m}`));
    toast.success("Hashtags generated");
  };
  return (
    <ToolPageShell tool={tool}
      intro="Generate trending hashtags for Instagram, TikTok and YouTube in seconds. One keyword in, ready-to-paste hashtags out."
      features={[
        { title: "Instant", desc: "Get 19 hashtags in a click." },
        { title: "Cross-platform", desc: "Works for Instagram, TikTok and Shorts." },
        { title: "Free", desc: "No signup, no limits." },
      ]}
      howTo={["Type your topic keyword.", "Click Generate.", "Copy and paste into your post."]}
      faqs={[
        { q: "How many hashtags should I use?", a: "On TikTok, 3–5 sharp tags. On Instagram, 10–15 mixed-volume tags." },
        { q: "Do hashtags still matter?", a: "Yes — they help platforms categorize your content." },
      ]}>
      <div className="flex gap-2">
        <input value={seed} onChange={(e) => setSeed(e.target.value)} placeholder="e.g. fitness"
          className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        <button onClick={make} className="rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop">Generate</button>
      </div>
      {tags.length > 0 && (
        <>
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => <span key={t} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{t}</span>)}
          </div>
          <button onClick={() => { navigator.clipboard.writeText(tags.join(" ")); toast.success("All hashtags copied"); }} className="mt-4 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-muted active:scale-95">Copy all</button>
        </>
      )}
    </ToolPageShell>
  );
}
