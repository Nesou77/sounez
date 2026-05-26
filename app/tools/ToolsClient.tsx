"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TOOLS } from "@/data/tools";
import { sortToolsByPopularity } from "@/lib/popularity";
import { matchToolListSearch } from "@/lib/tools-search";
import { ToolCard } from "@/components/ToolCard";
import { trackSearch } from "@/lib/analytics";
import { TOOL_GROUPS, toolsByGroup, type ToolGroupSlug } from "@/lib/tool-groups";
import { getToolGroupEditorial } from "@/lib/tool-group-content";
import { SmartLink as Link } from "@/components/smart-link";

export function ToolsClient() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const list = TOOLS.filter((t) => matchToolListSearch(t, q));
    return sortToolsByPopularity(list);
  }, [q]);

  const isSearching = q.trim().length > 0;

  useEffect(() => {
    const trimmed = q.trim();
    if (!trimmed) return;
    const id = window.setTimeout(() => {
      trackSearch({ search_term: trimmed, result_count: filtered.length });
    }, 400);
    return () => clearTimeout(id);
  }, [q, filtered.length]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link>
        {" / "}
        <span className="text-foreground">Tools</span>
      </nav>

      <header className="mb-8 max-w-2xl">
        <h1 className="text-4xl font-bold sm:text-5xl">All tools</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Pick a category below or search by name. Each tool page explains who it is for, how to use it, and what happens to your data.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Need several assets from one idea? Try{" "}
          <Link href="/smart-packs" className="font-medium text-primary hover:underline">Smart Packs</Link>.
        </p>
      </header>

      <div className="relative mb-10 max-w-xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tools…"
          className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm shadow-soft outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {isSearching ? (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            {filtered.length} result{filtered.length === 1 ? "" : "s"} for &ldquo;{q.trim()}&rdquo;
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <ToolCard key={t.slug} tool={t} searchQuery={q} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">No tools match. Try another keyword or browse a category below.</p>
          )}
        </>
      ) : (
        <div className="space-y-16">
          {TOOL_GROUPS.map((group) => {
            const items = toolsByGroup(group.slug);
            if (items.length === 0) return null;
            const editorial = getToolGroupEditorial(group.slug as ToolGroupSlug);
            return (
              <section key={group.slug} id={group.slug} className="scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight">{group.name}</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{group.description}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {editorial.extendedIntro}
                </p>
                <p className="mt-2 max-w-2xl text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/80">Tip:</span> {editorial.tip}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((t) => (
                    <ToolCard key={t.slug} tool={t} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {!isSearching && (
        <>
          <section className="mt-16 max-w-2xl">
            <h2 className="text-xl font-bold">Before you use a tool</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted-foreground">
              <li>Read the privacy note on the tool page if you are uploading files or using AI.</li>
              <li>Treat AI output as a draft — check facts, prices, and claims before publishing.</li>
              <li>For several assets from one brief, a Smart Pack may save you jumping between pages.</li>
            </ul>
          </section>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Looking for creator, design, or utility collections? See{" "}
            <Link href="/categories" className="font-medium text-primary hover:underline">categories</Link>.
          </p>
        </>
      )}
    </div>
  );
}
