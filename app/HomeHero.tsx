"use client";

import { useMemo, useRef, useState } from "react";
import { SmartLink as Link } from "@/components/smart-link";
import { Search, ArrowRight, Sparkles, Zap, Shield, Heart } from "lucide-react";
import { TOOLS } from "@/data/tools";
import { getToolIcon } from "@/lib/tool-icons";

export function HomeHero() {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!q) return [];
    const lower = q.toLowerCase();
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(lower) ||
        t.description.toLowerCase().includes(lower) ||
        t.category.includes(lower) ||
        t.keywords.some((k) => k.toLowerCase().includes(lower))
    );
  }, [q]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -top-40 left-1/2 -z-10 h-[28rem] w-[70rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-25 blur-3xl" />
      <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <span className="animate-fade-in inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium text-foreground/80 shadow-soft backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Free tools that actually work.
        </span>
        <h1 className="animate-slide-up mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          Free online tools for{" "}
          <span className="text-gradient-brand">creators</span>, designers <br className="hidden sm:block" />
          &amp; everyday productivity
        </h1>
        <p className="animate-slide-up delay-75 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          No signup. No installs. Just open a tool and use it. Everything runs in your browser and it&apos;s all free.
        </p>

        <div className="animate-slide-up delay-150 mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tools"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-pop transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0"
          >
            Explore all tools
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#popular"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/70 px-6 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-muted"
          >
            See popular
          </a>
        </div>

        {/* Search */}
        <div className="animate-slide-up delay-225 mx-auto mt-12 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${TOOLS.length} free tools…`}
              aria-label="Search tools"
              aria-autocomplete="list"
              aria-controls={q ? "search-results" : undefined}
              role="combobox"
              aria-expanded={q.length > 0}
              className="w-full rounded-2xl border border-border bg-background/80 py-4 pl-11 pr-4 text-sm shadow-soft outline-none backdrop-blur transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          </div>
          {q && (
            <div
              id="search-results"
              role="listbox"
              aria-label="Search results"
              className="animate-fade-in mt-3 max-h-72 overflow-y-auto rounded-2xl border border-border bg-popover p-2 text-left shadow-pop"
            >
              {filtered.length === 0 && (
                <p className="p-3 text-sm text-muted-foreground">No tools found.</p>
              )}
              {filtered.map((t) => {
                const ToolIcon = getToolIcon(t.slug);
                return (
                  <Link
                    key={t.slug}
                    href={`/${t.slug}`}
                    role="option"
                    aria-selected={false}
                    className="flex items-center gap-3 rounded-lg p-2.5 text-sm transition hover:bg-accent"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-soft text-primary ring-1 ring-primary/10">
                      <ToolIcon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{t.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="animate-fade-in delay-300 mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-primary" /> Lightning fast
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" /> Private &amp; secure
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 text-primary" /> 100% free, forever
          </span>
        </div>
      </div>
    </section>
  );
}
