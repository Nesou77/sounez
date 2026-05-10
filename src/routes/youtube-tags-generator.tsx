import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("youtube-tags-generator")!;
export const Route = createFileRoute("/youtube-tags-generator")({
  head: () => ({ meta: [
    { title: `${tool.name} — Free YouTube SEO Tags | Sounez` },
    { name: "description", content: tool.description },
    { property: "og:title", content: tool.name },
    { property: "og:description", content: tool.description },
  ]}),
  component: Page,
});
const MODS = ["best", "top", "2025", "tutorial", "guide", "tips", "free", "review", "how to", "for beginners", "explained", "ideas", "examples", "shorts", "fast"];
function Page() {
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
      intro="Generate optimized YouTube tags from a single keyword to boost video discoverability and rankings."
      features={[
        { title: "Instant suggestions", desc: "Get 25 SEO-friendly tags in one click." },
        { title: "Copy with one tap", desc: "Copy the comma-separated list." },
        { title: "Free", desc: "No signup, no limits." },
      ]}
      howTo={["Enter your video's main keyword.", "Click Generate.", "Copy and paste tags into YouTube Studio."]}
      faqs={[
        { q: "Do tags still work in 2025?", a: "Yes — they help YouTube understand context, even if titles and thumbnails matter more." },
        { q: "How many tags should I use?", a: "10–20 relevant tags works best. Quality over quantity." },
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
