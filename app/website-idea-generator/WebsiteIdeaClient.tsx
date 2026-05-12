"use client";

import { useState } from "react";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";

const tool = toolBySlug("website-idea-generator")!;

type WebsiteType = "blog" | "saas" | "ecommerce" | "community" | "tool";

type Idea = {
  name: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
};

export function WebsiteIdeaClient() {
  const [interests, setInterests] = useState("");
  const [type, setType] = useState<WebsiteType>("blog");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!interests.trim()) {
      toast.error("Please describe your interests or niche");
      return;
    }
    setLoading(true);
    setIdeas([]);
    try {
      const res = await fetch("/api/website-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests: interests.trim(), type }),
      });
      const data = await res.json();
      if (Array.isArray(data.ideas) && data.ideas.length > 0) {
        setIdeas(data.ideas);
        toast.success("Ideas generated");
      } else {
        toast.error("No ideas returned. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyIdea = (idea: Idea) => {
    const text = `${idea.name}\n${idea.tagline}\n\n${idea.description}`;
    navigator.clipboard.writeText(text);
    toast.success(`"${idea.name}" copied`);
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Describe your interests and get unique website concepts with names, taglines and feature ideas."
      features={[
        {
          title: "4 ideas per click",
          desc: "More starting points to compare and combine.",
        },
        {
          title: "Type filter",
          desc: "Blog, SaaS, ecommerce, community or tool.",
        },
        {
          title: "Key features included",
          desc: "Each idea comes with 3 suggested features to build.",
        },
      ]}
      howTo={[
        "Describe your interests or niche.",
        "Choose the type of website you want to build.",
        "Click Generate and explore your ideas.",
      ]}
      faqs={[
        {
          q: "Are these ideas unique?",
          a: "They are generated fresh each time, but similar ideas may already exist. Validate your idea before building.",
        },
        {
          q: "Can I use these commercially?",
          a: "Yes. The ideas are yours to develop however you like.",
        },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="idea-interests"
            className="mb-1.5 block text-sm font-medium"
          >
            Your interests or niche
          </label>
          <input
            id="idea-interests"
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g. sustainable living, personal finance, indie games"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label
            htmlFor="idea-type"
            className="mb-1.5 block text-sm font-medium"
          >
            Website type
          </label>
          <select
            id="idea-type"
            value={type}
            onChange={(e) => setType(e.target.value as WebsiteType)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="blog">Blog</option>
            <option value="saas">SaaS</option>
            <option value="ecommerce">E-commerce</option>
            <option value="community">Community</option>
            <option value="tool">Tool / Utility</option>
          </select>
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Generating…" : "Generate Ideas"}
        </button>
      </div>

      {ideas.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ideas.map((idea, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-muted/40 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold">{idea.name}</h3>
                  <p className="text-xs text-primary font-medium mt-0.5">
                    {idea.tagline}
                  </p>
                </div>
                <button
                  onClick={() => copyIdea(idea)}
                  className="shrink-0 rounded-lg p-1.5 transition hover:bg-muted active:scale-95"
                  title="Copy idea"
                  aria-label={`Copy ${idea.name}`}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {idea.description}
              </p>
              {Array.isArray(idea.keyFeatures) &&
                idea.keyFeatures.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {idea.keyFeatures.slice(0, 3).map((f, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          ))}
        </div>
      )}
    </ToolPageShell>
  );
}
