"use client";

import { useState } from "react";
import { Copy, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult } from "@/lib/analytics";

type Style = "modern" | "playful" | "professional" | "abstract";

export function BusinessNameClient({ tool }: { tool: Tool }) {
  const [industry, setIndustry] = useState("");
  const [keywords, setKeywords] = useState("");
  const [style, setStyle] = useState<Style>("modern");
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  useToolView(tool);

  const generate = async () => {
    if (!industry.trim()) {
      toast.error("Please enter your industry or niche");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/business-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry: industry.trim(), keywords: keywords.trim(), style }),
      });
      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? "Too many requests. Please wait a moment.");
        return;
      }
      const data = await res.json();
      if (Array.isArray(data.names) && data.names.length > 0) {
        setNames(data.names);
        toast.success("Names generated");
        trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "business_names" });
      } else {
        toast.error("No names returned. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (name: string, idx: number) => {
    navigator.clipboard.writeText(name).then(() => {
      setCopiedIdx(idx);
      toast.success(`"${name}" copied`);
      trackCopyResult({ tool_slug: tool.slug, result_type: "business_name" });
      setTimeout(() => setCopiedIdx(null), 1500);
    }).catch(() => toast.error("Could not copy. Please copy manually."));
  };

  const copyAll = () => {
    const text = names.map((n, i) => `${i + 1}. ${n}`).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAll(true);
      toast.success("All names copied");
      trackCopyResult({ tool_slug: tool.slug, result_type: "business_names_all" });
      setTimeout(() => setCopiedAll(false), 1500);
    }).catch(() => toast.error("Could not copy. Please copy manually."));
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Enter your industry and keywords and get 6 creative, brandable name ideas in seconds."
      features={[
        { title: "6 names per generation", desc: "Plenty of options to compare and riff on." },
        { title: "Style options", desc: "Modern, Playful, Professional or Abstract." },
        { title: "Regenerate anytime", desc: "Not happy? One click gives you a fresh set." },
      ]}
      howTo={[
        "Enter your industry and any keywords you like.",
        "Choose a name style.",
        "Click Generate and copy your favorite name.",
      ]}
      faqs={[
        { q: "Are these names trademarked?", a: "No check is done for trademarks. Always search your country's trademark register before using a name commercially." },
        { q: "Can I use these names for free?", a: "Yes. The generator is free. The names themselves are yours to use." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="biz-industry" className="mb-1.5 block text-sm font-medium">Industry / Niche</label>
          <input
            id="biz-industry"
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            maxLength={120}
            placeholder="e.g. fitness coaching"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label htmlFor="biz-keywords" className="mb-1.5 block text-sm font-medium">
            Keywords <span className="font-normal text-muted-foreground">(optional, comma-separated)</span>
          </label>
          <input
            id="biz-keywords"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            maxLength={250}
            placeholder="e.g. strong, flex, peak"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label htmlFor="biz-style" className="mb-1.5 block text-sm font-medium">Name style</label>
          <select
            id="biz-style"
            value={style}
            onChange={(e) => setStyle(e.target.value as Style)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="modern">Modern</option>
            <option value="playful">Playful</option>
            <option value="professional">Professional</option>
            <option value="abstract">Abstract</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={generate}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Generating…" : "Generate Names"}
          </button>
          {names.length > 0 && (
            <button
              type="button"
              onClick={generate}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold transition hover:bg-muted disabled:opacity-60"
              title="Regenerate"
            >
              <RefreshCw className="h-4 w-4" /> Regenerate
            </button>
          )}
        </div>
      </div>

      {names.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">Generated names</p>
            <button
              type="button"
              onClick={copyAll}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition hover:bg-muted active:scale-95"
            >
              <Copy className="h-3.5 w-3.5" />
              {copiedAll ? "Copied!" : "Copy all"}
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {names.map((name, i) => (
              <div key={i} className="flex items-center justify-between gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3">
                <span className="font-semibold">{name}</span>
                <button
                  type="button"
                  onClick={() => copy(name, i)}
                  className="shrink-0 rounded-lg p-1.5 transition hover:bg-muted active:scale-95"
                  title="Copy name"
                  aria-label={`Copy ${name}`}
                >
                  <Copy className="h-4 w-4" />
                  {copiedIdx === i && <span className="sr-only">Copied</span>}
                </button>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            AI-generated. Check trademark availability before commercial use.
          </p>
        </div>
      )}
    </ToolPageShell>
  );
}
