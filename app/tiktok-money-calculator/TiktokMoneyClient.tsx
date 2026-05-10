"use client";
import { useState } from "react";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("tiktok-money-calculator")!;
export function TiktokMoneyClient() {
  const [followers, setFollowers] = useState(50000);
  const [er, setEr] = useState(5);
  const min = Math.round(followers * (er / 100) * 0.01);
  const max = Math.round(followers * (er / 100) * 0.05);
  return (
    <ToolPageShell tool={tool}
      intro="Estimate your potential TikTok earnings per sponsored post based on follower count and engagement rate."
      features={[
        { title: "Quick estimate", desc: "Sliders update earnings instantly." },
        { title: "Realistic ranges", desc: "Industry-standard min/max per post." },
        { title: "Free", desc: "No signup required." },
      ]}
      howTo={["Set your follower count.", "Adjust your engagement rate.", "View the estimated earnings range."]}
      faqs={[
        { q: "Are these numbers exact?", a: "No — they're estimates based on common brand-deal ranges. Real rates vary by niche and region." },
        { q: "What's a good engagement rate?", a: "Above 5% is excellent on TikTok." },
      ]}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm">Followers: {followers.toLocaleString()}
          <input type="range" min={1000} max={5_000_000} step={1000} value={followers} onChange={(e) => setFollowers(+e.target.value)} className="mt-2 w-full accent-primary" />
        </label>
        <label className="text-sm">Engagement rate: {er}%
          <input type="range" min={1} max={20} value={er} onChange={(e) => setEr(+e.target.value)} className="mt-2 w-full accent-primary" />
        </label>
      </div>
      <div className="mt-6 rounded-2xl bg-gradient-soft p-6 text-center">
        <div className="text-sm text-muted-foreground">Estimated earnings per sponsored post</div>
        <div className="mt-1 text-3xl font-bold text-gradient-brand">${min.toLocaleString()} – ${max.toLocaleString()}</div>
      </div>
    </ToolPageShell>
  );
}
