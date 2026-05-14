"use client";

import { useState } from "react";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult } from "@/lib/analytics";

type Platform = "instagram" | "tiktok" | "linkedin";
type Tone = "funny" | "professional" | "inspirational";

export function AiCaptionClient({ tool }: { tool: Tool }) {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [tone, setTone] = useState<Tone>("professional");
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  useToolView(tool);

  const generate = async () => {
    if (!topic.trim()) {
      toast.error("Please describe your photo or topic first");
      return;
    }
    if (topic.trim().length > 500) {
      toast.error("Topic must be 500 characters or fewer.");
      return;
    }
    setLoading(true);
    setCaptions([]);
    try {
      const res = await fetch("/api/ai-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), platform, tone }),
      });
      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? "Too many requests. Please wait a moment.");
        return;
      }
      const data = await res.json();
      if (Array.isArray(data.captions) && data.captions.length > 0) {
        setCaptions(data.captions);
        toast.success("Captions generated");
        trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "captions" });
      } else {
        toast.error("No captions returned. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      toast.success("Caption copied");
      trackCopyResult({ tool_slug: tool.slug, result_type: "caption" });
      setTimeout(() => setCopiedIdx(null), 1500);
    }).catch(() => toast.error("Could not copy. Please copy manually."));
  };

  const copyAll = () => {
    const text = captions.map((c, i) => `${i + 1}. ${c}`).join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAll(true);
      toast.success("All captions copied");
      trackCopyResult({ tool_slug: tool.slug, result_type: "captions_all" });
      setTimeout(() => setCopiedAll(false), 1500);
    }).catch(() => toast.error("Could not copy. Please copy manually."));
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Describe your photo or topic and get 3 ready-to-post captions. Works for Instagram, TikTok and LinkedIn."
      features={[
        { title: "3 captions per click", desc: "Get variety so you can pick the one that fits." },
        { title: "Platform-aware", desc: "Tone and length adapt to Instagram, TikTok or LinkedIn." },
        { title: "Fallback mode", desc: "Works even without an API key using smart templates." },
      ]}
      howTo={[
        "Describe your photo or topic in the box.",
        "Choose your platform and preferred tone.",
        "Click Generate and copy the caption you like best.",
      ]}
      faqs={[
        { q: "Is this free?", a: "Yes, completely free. No account needed." },
        { q: "Does it use AI?", a: "Yes, it uses Gemini AI when configured, and smart templates as a fallback." },
        { q: "Can I edit the captions?", a: "Copy and paste into your favourite editor to tweak them." },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="caption-topic" className="mb-1.5 block text-sm font-medium">
            Photo description or topic
          </label>
          <textarea
            id="caption-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={3}
            maxLength={500}
            placeholder="e.g. sunset at the beach with friends"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">{topic.length}/500</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="caption-platform" className="mb-1.5 block text-sm font-medium">Platform</label>
            <select
              id="caption-platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>
          <div>
            <label htmlFor="caption-tone" className="mb-1.5 block text-sm font-medium">Tone</label>
            <select
              id="caption-tone"
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="funny">Funny</option>
              <option value="professional">Professional</option>
              <option value="inspirational">Inspirational</option>
            </select>
          </div>
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Generating…" : "Generate Captions"}
        </button>
      </div>

      {captions.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">Your captions</p>
            <button
              onClick={copyAll}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition hover:bg-muted active:scale-95"
            >
              <Copy className="h-3.5 w-3.5" />
              {copiedAll ? "Copied!" : "Copy all"}
            </button>
          </div>
          <div className="space-y-3">
            {captions.map((caption, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                <p className="flex-1 text-sm leading-relaxed">{caption}</p>
                <button
                  onClick={() => copy(caption, i)}
                  className="shrink-0 rounded-lg p-2 transition hover:bg-muted active:scale-95"
                  title="Copy caption"
                  aria-label="Copy caption"
                >
                  <Copy className="h-4 w-4" />
                  {copiedIdx === i && <span className="sr-only">Copied</span>}
                </button>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            AI-generated. Review before posting.
          </p>
        </div>
      )}
    </ToolPageShell>
  );
}
