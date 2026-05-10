"use client";

import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";

const tool = toolBySlug("password-generator")!;

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

export function PasswordGeneratorClient() {
  const [len, setLen] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, nums: true, sym: true });
  const [pwd, setPwd] = useState(() => gen(16, { upper: true, lower: true, nums: true, sym: true }));
  const regen = () => { setPwd(gen(len, opts)); toast.success("Generated successfully"); };
  const copy = () => { navigator.clipboard.writeText(pwd); toast.success("Copied to clipboard"); };

  return (
    <ToolPageShell
      tool={tool}
      intro="Generate strong, secure, random passwords with custom length and character rules. Runs entirely in your browser."
      features={[
        { title: "Cryptographically secure", desc: "Uses the browser's secure random API." },
        { title: "Fully customizable", desc: "Choose length and character types." },
        { title: "100% private", desc: "Passwords never leave your device." },
      ]}
      howTo={["Pick a length (12+ recommended).", "Toggle character types you want included.", "Click regenerate, then copy your password."]}
      faqs={[
        { q: "How long should my password be?", a: "16+ characters with mixed case, numbers and symbols is excellent." },
        { q: "Are passwords stored?", a: "Never. They're generated locally and discarded when you leave the page." },
      ]}
    >
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-3">
        <input readOnly value={pwd} className="flex-1 bg-transparent font-mono text-sm outline-none" />
        <button onClick={copy} className="rounded-lg p-2 transition hover:bg-muted active:scale-95" title="Copy"><Copy className="h-4 w-4" /></button>
        <button onClick={regen} className="rounded-lg p-2 hover:bg-muted" title="Regenerate"><RefreshCw className="h-4 w-4" /></button>
      </div>
      <div className="mt-5 space-y-3">
        <div>
          <label className="text-sm font-medium">Length: {len}</label>
          <input type="range" min={6} max={64} value={len} onChange={(e) => setLen(+e.target.value)} className="w-full accent-primary" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(["upper", "lower", "nums", "sym"] as const).map((k) => (
            <label key={k} className="flex items-center gap-2 rounded-xl border border-border p-3 text-sm cursor-pointer">
              <input type="checkbox" checked={opts[k]} onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })} className="accent-primary" />
              {{ upper: "Uppercase", lower: "Lowercase", nums: "Numbers", sym: "Symbols" }[k]}
            </label>
          ))}
        </div>
        <button onClick={regen} className="rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-pop">Generate</button>
      </div>
    </ToolPageShell>
  );
}
