"use client";

import { useState } from "react";
import { Copy, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult } from "@/lib/analytics";

type Platform = "instagram" | "twitter" | "linkedin" | "general";

const PLATFORM_LIMITS: Record<Platform, number> = {
  instagram: 160,
  twitter: 160,
  linkedin: 300,
  general: 300,
};

const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  general: "General / Website",
};

export function BioClient({ tool }: { tool: Tool }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [interests, setInterests] = useState("");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useToolView(tool);

  const generate = async () => {
    if (!name.trim() || !role.trim()) {
      toast.error("Please enter your name and role");
      return;
    }
    setLoading(true);
    setBio("");
    try {
      const res = await fetch("/api/bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), role: role.trim(), interests: interests.trim(), platform }),
      });
      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? "Too many requests. Please wait a moment.");
        return;
      }
      const data = await res.json();
      if (typeof data.bio === "string" && data.bio.trim()) {
        setBio(data.bio.trim());
        toast.success("Bio generated");
        trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "bio" });
      } else {
        toast.error("No bio returned. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(bio).then(() => {
      setCopied(true);
      toast.success("Bio copied to clipboard");
      trackCopyResult({ tool_slug: tool.slug, result_type: "bio" });
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => toast.error("Could not copy. Please copy manually."));
  };

  const maxLen = PLATFORM_LIMITS[platform];
  const charPercent = bio ? Math.min(100, Math.round((bio.length / maxLen) * 100)) : 0;
  const overLimit = bio.length > maxLen;

  return (
    <ToolPageShell
      tool={tool}
      intro="Fill in a few details and get a polished bio tailored to your platform in seconds. Click Generate again to get a different version."
      features={[
        { title: "Platform-specific length", desc: "160 characters for Instagram and Twitter/X. 300 for LinkedIn and general bios." },
        { title: "Multiple versions", desc: "Not happy with the first result? Click Generate again for a different take." },
        { title: "Character counter", desc: "See exactly how many characters the bio uses and whether it fits the platform limit." },
        { title: "No signup needed", desc: "Free to use, with fair-use limits for heavy automated requests." },
      ]}
      howTo={[
        "Enter your name, role and a few interests.",
        "Select your platform to get the right length and tone.",
        "Click Generate, copy the bio, or click Generate again for a different version.",
      ]}
      faqs={[
        { q: "How long will my bio be?", a: "Instagram and Twitter bios are capped at 160 characters. LinkedIn and general bios can go up to 300 characters." },
        { q: "Can I generate multiple versions?", a: "Yes. Try a few versions, then edit the one that sounds most like you. Heavy automated use may be limited." },
        { q: "What if the bio is too long?", a: "The character counter will turn red if the bio exceeds the platform limit. Try a shorter role description or fewer interests." },
        { q: "Can I edit the bio after generating?", a: "Yes. Copy it into any text editor and change what you like. This tool only generates text." },
      ]}
      useCases={[
        { title: "Social media creators", desc: "Write a clear, punchy bio that explains what you do and who you are in under 160 characters." },
        { title: "Job seekers", desc: "Create a concise LinkedIn summary that reflects your professional identity." },
        { title: "Freelancers", desc: "Update your profile bio across platforms without spending time rewriting from scratch." },
        { title: "Small business owners", desc: "Describe your business in a natural, human way for your social profiles." },
      ]}
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="bio-name" className="mb-1.5 block text-sm font-medium">Full name</label>
            <input
              id="bio-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              placeholder="e.g. Alex Johnson"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="bio-role" className="mb-1.5 block text-sm font-medium">Role / Title</label>
            <input
              id="bio-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              maxLength={120}
              placeholder="e.g. UX Designer & Blogger"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bio-interests" className="mb-1.5 block text-sm font-medium">
            Interests <span className="font-normal text-muted-foreground">(comma-separated, optional)</span>
          </label>
          <input
            id="bio-interests"
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            maxLength={250}
            placeholder="e.g. travel, coffee, design"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Platform selector */}
        <div>
          <p className="mb-2 text-sm font-medium">Platform</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PLATFORM_LABELS) as Platform[]).map((p) => (
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
          <p className="mt-1 text-xs text-muted-foreground">Limit: {maxLen} characters</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={generate}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Generating…" : bio ? "Generate again" : "Generate Bio"}
          </button>
          {bio && (
            <button
              onClick={generate}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold transition hover:bg-muted disabled:opacity-60"
              title="Get a different version"
            >
              <RefreshCw className="h-4 w-4" /> Try another
            </button>
          )}
        </div>
      </div>

      {bio && (
        <div className="mt-6 space-y-3">
          <div className={`rounded-xl border p-4 ${overLimit ? "border-destructive bg-destructive/5" : "border-border bg-muted/40"}`}>
            <div className="flex items-start gap-3">
              <p className="flex-1 text-sm leading-relaxed">{bio}</p>
              <button
                onClick={copy}
                className="shrink-0 rounded-lg p-2 transition hover:bg-muted active:scale-95"
                title="Copy bio"
                aria-label="Copy bio"
              >
                <Copy className="h-4 w-4" />
                {copied && <span className="sr-only">Copied</span>}
              </button>
            </div>

            {/* Character progress bar */}
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs">
                <span className={overLimit ? "font-semibold text-destructive" : "text-muted-foreground"}>
                  {bio.length} / {maxLen} characters
                </span>
                {overLimit && <span className="font-semibold text-destructive">Over limit</span>}
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${overLimit ? "bg-destructive" : "bg-primary"}`}
                  style={{ width: `${charPercent}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">AI-generated. Review before publishing.</p>
        </div>
      )}
    </ToolPageShell>
  );
}
