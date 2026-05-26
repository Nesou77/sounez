"use client";
import { useState } from "react";
import { Copy, X } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult } from "@/lib/analytics";

type Platform = "all" | "instagram" | "tiktok" | "youtube";

const UNIVERSAL = ["tips", "daily", "love", "community", "life", "world", "vibes", "gram", "post", "pro", "viral", "trending", "fyp"];
const INSTAGRAM_MODS = ["official", "lover", "ofinstagram", "oftheday", "addict", "inspo", "style", "aesthetic"];
const TIKTOK_MODS = ["foryou", "foryoupage", "fypシ", "duet", "stitchthis", "viral", "trending", "learnontiktok"];
const YOUTUBE_MODS = ["shorts", "youtubeshorts", "howto", "tutorial", "review", "unboxing", "vlog", "subscribe"];

function makeTags(seed: string, platform: Platform): string[] {
  const s = seed.trim().toLowerCase().replace(/\s+/g, "");
  if (!s) return [];
  const base = [`#${s}`];
  let platformMods: string[];
  switch (platform) {
    case "instagram": platformMods = [...UNIVERSAL, ...INSTAGRAM_MODS]; break;
    case "tiktok":    platformMods = [...UNIVERSAL.slice(0, 6), ...TIKTOK_MODS]; break;
    case "youtube":   platformMods = [...UNIVERSAL.slice(0, 6), ...YOUTUBE_MODS]; break;
    default:          platformMods = UNIVERSAL;
  }
  const withMods = platformMods.map((m) => `#${s}${m}`);
  return [...base, ...withMods].slice(0, 20);
}

const PLATFORM_LABELS: Record<Platform, string> = {
  all: "All platforms",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
};

export function HashtagClient({ tool }: { tool: Tool }) {
  const [seed, setSeed] = useState("");
  const [platform, setPlatform] = useState<Platform>("all");
  const [tags, setTags] = useState<string[]>([]);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);
  useToolView(tool);

  const make = () => {
    const s = seed.trim();
    if (!s) { toast.error("Enter a keyword first"); return; }
    const result = makeTags(s, platform);
    setTags(result);
    toast.success(`${result.length} hashtags generated`);
    trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "hashtags" });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(tags.join(" "));
    toast.success("All hashtags copied");
    trackCopyResult({ tool_slug: tool.slug, result_type: "hashtags" });
  };

  const copyOne = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    toast.success(`Copied: ${tag}`);
    trackCopyResult({ tool_slug: tool.slug, result_type: "hashtag_single" });
    setTimeout(() => setCopiedTag(null), 1500);
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Type a topic and get a ready-to-copy set of hashtags for Instagram, TikTok and YouTube. Pick a platform to get targeted tags."
      features={[
        { title: "Platform-specific sets", desc: "Switch between Instagram, TikTok and YouTube to get tags tailored to each platform's style." },
        { title: "Copy all at once", desc: "One click copies the full set as space-separated hashtags." },
        { title: "Copy or remove individual tags", desc: "Click any tag to copy just that one. Remove tags that don't fit." },
        { title: "Free", desc: "No signup, no limits." },
      ]}
      howTo={[
        "Type your topic keyword, then select a platform.",
        "Press Enter or click Generate to get your hashtags.",
        "Remove any tags that don't fit, then click Copy all.",
        "Paste directly into your post caption or TikTok description.",
      ]}
      faqs={[
        { q: "How many hashtags should I use on Instagram?", a: "Between 5 and 15 relevant hashtags is the current best practice. Instagram's own guidance suggests focusing on relevance over volume." },
        { q: "How many hashtags should I use on TikTok?", a: "3 to 5 highly relevant tags tends to work well. Over-hashtagging on TikTok can look spammy and dilute relevance signals." },
        { q: "Do hashtags work the same on all platforms?", a: "No. Each platform uses hashtags differently. Instagram uses them as a discovery index. TikTok mixes hashtags with its interest graph. YouTube uses them for search filtering in Shorts." },
        { q: "Should I always use the same hashtags?", a: "No. Mix broad and specific hashtags for each post topic. Repeating identical hashtags on every post can reduce reach on Instagram." },
      ]}
      useCases={[
        { title: "Content creators", desc: "Quickly cover relevant hashtags without spending time on manual research." },
        { title: "Small businesses", desc: "Add hashtags to social posts to reach local or niche audiences." },
        { title: "Social media managers", desc: "Generate tag sets for clients across multiple niches in seconds." },
        { title: "Influencers", desc: "Expand reach on posts by adding relevant community hashtags." },
      ]}
    >
      {/* Platform selector */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "instagram", "tiktok", "youtube"] as Platform[]).map((p) => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
              platform === p ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:bg-muted"
            }`}
          >
            {PLATFORM_LABELS[p]}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && make()}
          placeholder="e.g. fitness"
          aria-label="Hashtag topic"
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
            <p className="text-xs font-semibold text-muted-foreground">{tags.length} hashtags</p>
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
                className="group flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition hover:bg-primary/10"
              >
                <button
                  onClick={() => copyOne(t)}
                  title={`Copy ${t}`}
                  aria-label={`Copy hashtag ${t}`}
                  className="hover:text-primary"
                >
                  {copiedTag === t ? "✓" : t}
                </button>
                <button
                  onClick={() => removeTag(t)}
                  title={`Remove ${t}`}
                  aria-label={`Remove hashtag ${t}`}
                  className="opacity-0 transition group-hover:opacity-100 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Click a hashtag to copy it individually. Click x to remove it.</p>
        </>
      )}
    </ToolPageShell>
  );
}
