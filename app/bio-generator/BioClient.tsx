"use client";

import { useState } from "react";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";

const tool = toolBySlug("bio-generator")!;

type Platform = "instagram" | "twitter" | "linkedin" | "general";

const MAX_CHARS: Record<Platform, number> = {
  instagram: 160,
  twitter: 160,
  linkedin: 300,
  general: 300,
};

export function BioClient() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [interests, setInterests] = useState("");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim(),
          interests: interests.trim(),
          platform,
        }),
      });
      const data = await res.json();
      if (typeof data.bio === "string" && data.bio.trim()) {
        setBio(data.bio.trim());
        toast.success("Bio generated");
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
    navigator.clipboard.writeText(bio);
    toast.success("Bio copied");
  };

  const maxLen = MAX_CHARS[platform];

  return (
    <ToolPageShell
      tool={tool}
      intro="Fill in a few details and get a polished bio tailored to your platform in seconds."
      features={[
        {
          title: "Platform-specific length",
          desc: "160 chars for Instagram/Twitter, 300 for LinkedIn.",
        },
        {
          title: "Instant results",
          desc: "No waiting. Your bio is ready to paste.",
        },
        {
          title: "No signup needed",
          desc: "Completely free and anonymous.",
        },
      ]}
      howTo={[
        "Enter your name, role and a few interests.",
        "Select your platform.",
        "Click Generate and copy your new bio.",
      ]}
      faqs={[
        {
          q: "How long will my bio be?",
          a: "Instagram and Twitter bios are capped at 160 characters. LinkedIn and general bios can go up to 300 characters.",
        },
        {
          q: "Can I generate multiple versions?",
          a: "Yes. Click Generate again to get a different result.",
        },
      ]}
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor="bio-name"
              className="mb-1.5 block text-sm font-medium"
            >
              Full name
            </label>
            <input
              id="bio-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Johnson"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label
              htmlFor="bio-role"
              className="mb-1.5 block text-sm font-medium"
            >
              Role / Title
            </label>
            <input
              id="bio-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. UX Designer & Blogger"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="bio-interests"
            className="mb-1.5 block text-sm font-medium"
          >
            Interests{" "}
            <span className="text-muted-foreground font-normal">
              (comma-separated)
            </span>
          </label>
          <input
            id="bio-interests"
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g. travel, coffee, design"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label
            htmlFor="bio-platform"
            className="mb-1.5 block text-sm font-medium"
          >
            Platform
          </label>
          <select
            id="bio-platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter / X</option>
            <option value="linkedin">LinkedIn</option>
            <option value="general">General / Website</option>
          </select>
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Generating…" : "Generate Bio"}
        </button>
      </div>

      {bio && (
        <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
          <div className="flex items-start gap-3">
            <p className="flex-1 text-sm leading-relaxed">{bio}</p>
            <button
              onClick={copy}
              className="shrink-0 rounded-lg p-2 transition hover:bg-muted active:scale-95"
              title="Copy bio"
              aria-label="Copy bio"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {bio.length} / {maxLen} characters
          </p>
        </div>
      )}
    </ToolPageShell>
  );
}
