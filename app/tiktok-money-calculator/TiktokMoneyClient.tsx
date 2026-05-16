"use client";
import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult } from "@/lib/analytics";

type Platform = "tiktok" | "instagram" | "youtube";

const PLATFORM_RATES: Record<Platform, { label: string; minRate: number; maxRate: number; erLabel: string }> = {
  tiktok:    { label: "TikTok",    minRate: 0.01, maxRate: 0.05, erLabel: "Engagement rate (%)" },
  instagram: { label: "Instagram", minRate: 0.01, maxRate: 0.08, erLabel: "Engagement rate (%)" },
  youtube:   { label: "YouTube",   minRate: 1.5,  maxRate: 4.0,  erLabel: "Avg views per video (k)" },
};

function formatCurrency(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n.toLocaleString()}`;
}

export function TiktokMoneyClient({ tool }: { tool: Tool }) {
  const [platform, setPlatform] = useState<Platform>("tiktok");
  const [followers, setFollowers] = useState(50_000);
  const [er, setEr] = useState(5);

  useToolView(tool);

  const { minRate, maxRate } = PLATFORM_RATES[platform];

  // TikTok and Instagram: CPM-style based on follower × ER × rate
  // YouTube: views-based sponsor estimate
  let min: number, max: number;
  if (platform === "youtube") {
    const views = er * 1000; // er slider = views in thousands
    min = Math.round(views * minRate);
    max = Math.round(views * maxRate);
  } else {
    const engaged = followers * (er / 100);
    min = Math.round(engaged * minRate);
    max = Math.round(engaged * maxRate);
  }

  const onInteraction = () => {
    trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "earnings_estimate" });
  };

  const copyEstimate = () => {
    const platformLabel = PLATFORM_RATES[platform].label;
    const text = `${platformLabel} sponsored post estimate: ${formatCurrency(min)} – ${formatCurrency(max)} per post (${followers.toLocaleString()} followers, ${er}${platform === "youtube" ? "k avg views" : "% ER"})`;
    navigator.clipboard.writeText(text);
    toast.success("Estimate copied to clipboard");
    trackCopyResult({ tool_slug: tool.slug, result_type: "earnings_estimate" });
  };

  const { erLabel } = PLATFORM_RATES[platform];
  const maxFollowers = 5_000_000;
  const maxEr = platform === "youtube" ? 500 : 20;
  const erStep = platform === "youtube" ? 5 : 1;

  return (
    <ToolPageShell
      tool={tool}
      intro="See what your social media account could realistically earn per sponsored post. Works for TikTok, Instagram and YouTube. Adjust your numbers and copy the estimate."
      features={[
        { title: "3 platforms", desc: "Estimate for TikTok, Instagram or YouTube Shorts sponsorships." },
        { title: "Instant estimate", desc: "Move the sliders and the earnings range updates right away." },
        { title: "Realistic ranges", desc: "Based on typical industry rates, not inflated numbers." },
        { title: "Copy estimate", desc: "Copy the full summary with one click to share or save." },
      ]}
      howTo={[
        "Choose your platform: TikTok, Instagram or YouTube.",
        "Set your follower count with the first slider.",
        "Adjust your engagement rate (or average views for YouTube).",
        "Read the estimated earnings range, then copy it to share.",
      ]}
      faqs={[
        { q: "Are these numbers exact?", a: "No. They are estimates based on typical brand deal ranges. Your actual rate depends on your niche, audience location, content quality and the brand's budget." },
        { q: "What counts as a good engagement rate?", a: "Above 5% is strong on TikTok and Instagram. YouTube sponsorships are usually calculated per view or per thousand views (CPM)." },
        { q: "How do nano and micro influencers compare?", a: "Smaller accounts (under 50k) often have higher engagement rates and can charge more per engaged follower than mega influencers." },
        { q: "What is a CPM deal?", a: "CPM stands for cost per thousand impressions. YouTube sponsorships often use CPM ($1.50–$4 per 1,000 views is typical for mid-sized channels)." },
      ]}
      useCases={[
        { title: "Content creators", desc: "Set a realistic floor price when brands reach out for partnerships." },
        { title: "Brand managers", desc: "Estimate influencer campaign budgets before outreach." },
        { title: "Agencies", desc: "Quickly calculate expected spend across a list of influencers." },
        { title: "Aspiring creators", desc: "Understand the earnings potential as you grow your audience." },
      ]}
    >
      {/* Platform tabs */}
      <div className="mb-5 flex gap-2">
        {(["tiktok", "instagram", "youtube"] as Platform[]).map((p) => (
          <button
            key={p}
            onClick={() => { setPlatform(p); setEr(p === "youtube" ? 50 : 5); }}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize transition ${
              platform === p ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:bg-muted"
            }`}
          >
            {PLATFORM_RATES[p].label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm">
          Followers: <strong>{followers.toLocaleString()}</strong>
          <input
            type="range"
            min={1_000}
            max={maxFollowers}
            step={1_000}
            value={followers}
            onChange={(e) => setFollowers(+e.target.value)}
            onMouseUp={onInteraction}
            onTouchEnd={onInteraction}
            className="mt-2 w-full accent-primary"
            aria-label={`Followers: ${followers.toLocaleString()}`}
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground"><span>1k</span><span>5M</span></div>
        </label>

        <label className="text-sm">
          {erLabel}: <strong>{platform === "youtube" ? `${er}k` : `${er}%`}</strong>
          <input
            type="range"
            min={platform === "youtube" ? 5 : 1}
            max={maxEr}
            step={erStep}
            value={er}
            onChange={(e) => setEr(+e.target.value)}
            onMouseUp={onInteraction}
            onTouchEnd={onInteraction}
            className="mt-2 w-full accent-primary"
            aria-label={`${erLabel}: ${er}`}
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>{platform === "youtube" ? "5k" : "1%"}</span>
            <span>{platform === "youtube" ? "500k" : "20%"}</span>
          </div>
        </label>
      </div>

      {/* Result */}
      <div className="mt-6 rounded-2xl bg-gradient-soft p-6 text-center">
        <div className="text-sm text-muted-foreground">Estimated earnings per sponsored post</div>
        <div className="mt-1 text-4xl font-bold text-gradient-brand">
          {formatCurrency(min)} – {formatCurrency(max)}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {PLATFORM_RATES[platform].label} · {followers.toLocaleString()} followers ·{" "}
          {platform === "youtube" ? `${er}k avg views` : `${er}% ER`}
        </div>
        <button
          onClick={copyEstimate}
          className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-muted active:scale-95 mx-auto"
        >
          <Copy className="h-4 w-4" /> Copy estimate
        </button>
      </div>

      <p className="mt-3 text-xs text-muted-foreground text-center">
        Estimates based on typical brand deal rates. Actual rates vary by niche, audience and negotiation.
      </p>
    </ToolPageShell>
  );
}
