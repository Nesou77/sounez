"use client";
import { useState } from "react";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
export function TiktokMoneyClient({ tool }: { tool: Tool }) {
  const [followers, setFollowers] = useState(50000);
  const [er, setEr] = useState(5);
  const min = Math.round(followers * (er / 100) * 0.01);
  const max = Math.round(followers * (er / 100) * 0.05);
  return (
    <ToolPageShell tool={tool}
      intro="See what your TikTok account could realistically earn per sponsored post. Adjust your follower count and engagement rate to get a range."
      features={[
        { title: "Instant estimate", desc: "Move the sliders and the earnings range updates right away." },
        { title: "Realistic ranges", desc: "Based on common industry rates for brand deals." },
        { title: "Free", desc: "No signup needed." },
      ]}
      howTo={["Set your follower count with the slider.", "Adjust your engagement rate.", "Read the estimated earnings range below."]}
      faqs={[
        { q: "Are these numbers exact?", a: "No. They are estimates based on typical brand deal ranges. Your actual rate will depend on your niche, audience location and the brand." },
        { q: "What counts as a good engagement rate?", a: "Anything above 5% is considered strong on TikTok." },
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
