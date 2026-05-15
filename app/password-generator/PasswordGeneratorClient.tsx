"use client";

import { useMemo, useState } from "react";
import { Copy, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackCopyResult } from "@/lib/analytics";

function gen(len: number, opts: { upper: boolean; lower: boolean; nums: boolean; sym: boolean }) {
  let chars = "";
  if (opts.upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (opts.lower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (opts.nums) chars += "0123456789";
  if (opts.sym) chars += "!@#$%^&*()-_=+[]{};:,.<>?";
  if (!chars) return "";
  const a = new Uint32Array(len);
  crypto.getRandomValues(a);
  return Array.from(a, (n) => chars[n % chars.length]).join("");
}

type Strength = { label: string; score: 0 | 1 | 2 | 3 | 4; color: string; bg: string };

function getStrength(pwd: string, opts: { upper: boolean; lower: boolean; nums: boolean; sym: boolean }): Strength {
  if (!pwd) return { label: "None", score: 0, color: "text-muted-foreground", bg: "bg-muted" };
  const typeCount = [opts.upper, opts.lower, opts.nums, opts.sym].filter(Boolean).length;
  const len = pwd.length;
  if (len < 8 || typeCount < 2) return { label: "Weak", score: 1, color: "text-red-500", bg: "bg-red-500" };
  if (len < 12 || typeCount < 3) return { label: "Fair", score: 2, color: "text-amber-500", bg: "bg-amber-500" };
  if (len < 16) return { label: "Good", score: 3, color: "text-lime-500", bg: "bg-lime-500" };
  return { label: "Strong", score: 4, color: "text-emerald-500", bg: "bg-emerald-500" };
}

export function PasswordGeneratorClient({ tool }: { tool: Tool }) {
  const [len, setLen] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, nums: true, sym: true });
  const [pwd, setPwd] = useState(() => gen(16, { upper: true, lower: true, nums: true, sym: true }));

  useToolView(tool);

  const strength = useMemo(() => getStrength(pwd, opts), [pwd, opts]);

  const regen = () => {
    const next = gen(len, opts);
    if (!next) { toast.error("Enable at least one character type"); return; }
    setPwd(next);
    toast.success("New password generated");
    trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "password" });
  };

  const copy = () => {
    if (!pwd) return;
    navigator.clipboard.writeText(pwd);
    toast.success("Password copied to clipboard");
    trackCopyResult({ tool_slug: tool.slug, result_type: "password" });
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Create a strong random password in seconds. Choose the length and character types. Everything runs in your browser and nothing is stored."
      features={[
        { title: "Cryptographically secure", desc: "Uses your browser's built-in secure random number generator, not Math.random()." },
        { title: "Strength indicator", desc: "See instantly whether your password is weak, fair, good or strong." },
        { title: "100% private", desc: "Passwords are generated locally and never sent to any server." },
      ]}
      howTo={[
        "Set your preferred password length using the slider (6–64 characters).",
        "Toggle the character types you want: uppercase, lowercase, numbers and symbols.",
        "Click Generate, review the strength meter, then copy your password.",
      ]}
      faqs={[
        { q: "How long should my password be?", a: "16 or more characters with a mix of uppercase, lowercase, numbers and symbols is a solid choice for most accounts." },
        { q: "Are passwords stored anywhere?", a: "No. They are generated in your browser and discarded the moment you leave or refresh the page." },
        { q: "What makes a password strong?", a: "Length matters most. A 20-character password with any character types is generally stronger than a 10-character one with all types." },
        { q: "Should I use a password manager?", a: "Yes. Generating a unique password with this tool, then storing it in a password manager like Bitwarden, 1Password or KeePass, is the safest approach." },
      ]}
      useCases={[
        { title: "Personal accounts", desc: "Generate a unique strong password for each website you sign up for." },
        { title: "Admin panels", desc: "Create a high-entropy password for server, router or CMS admin logins." },
        { title: "API keys & secrets", desc: "Use the full 64-character length with all types for generated secrets." },
        { title: "Developers", desc: "Quickly generate random strings for test data or seed values." },
      ]}
    >
      {/* Password display */}
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-3">
        <input
          readOnly
          value={pwd}
          aria-label="Generated password"
          className="flex-1 bg-transparent font-mono text-sm outline-none"
        />
        <button onClick={copy} className="rounded-lg p-2 transition hover:bg-muted active:scale-95" title="Copy password" aria-label="Copy password">
          <Copy className="h-4 w-4" />
        </button>
        <button onClick={regen} className="rounded-lg p-2 hover:bg-muted active:scale-95" title="Regenerate password" aria-label="Regenerate password">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Strength meter */}
      {pwd && (
        <div className="mt-3 space-y-1.5" aria-label={`Password strength: ${strength.label}`}>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 font-medium text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Strength
            </span>
            <span className={`font-semibold ${strength.color}`}>{strength.label}</span>
          </div>
          <div className="flex gap-1" role="presentation">
            {([1, 2, 3, 4] as const).map((bar) => (
              <div
                key={bar}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  strength.score >= bar ? strength.bg : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="mt-5 space-y-3">
        <div>
          <label htmlFor="pwd-length" className="text-sm font-medium">Length: {len}</label>
          <input
            id="pwd-length"
            type="range"
            min={6}
            max={64}
            value={len}
            onChange={(e) => setLen(+e.target.value)}
            className="mt-1 w-full accent-primary"
            aria-valuenow={len}
            aria-valuemin={6}
            aria-valuemax={64}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>6</span><span>64</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(["upper", "lower", "nums", "sym"] as const).map((k) => (
            <label key={k} className="flex cursor-pointer items-center gap-2 rounded-xl border border-border p-3 text-sm transition hover:bg-muted/40">
              <input
                type="checkbox"
                checked={opts[k]}
                onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })}
                className="accent-primary"
              />
              {{ upper: "Uppercase", lower: "Lowercase", nums: "Numbers", sym: "Symbols" }[k]}
            </label>
          ))}
        </div>

        <button
          onClick={regen}
          className="rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95"
        >
          Generate
        </button>
      </div>
    </ToolPageShell>
  );
}
