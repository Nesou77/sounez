"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/data/tools";
import { sortToolsByPopularity } from "@/lib/popularity";
import { matchToolListSearch } from "@/lib/tools-search";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";
import { trackSearch } from "@/lib/analytics";

export function ToolsClient() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(() => {
    const list = TOOLS.filter(
      (t) => (cat === "all" || t.category === cat) && matchToolListSearch(t, q),
    );
    return sortToolsByPopularity(list);
  }, [q, cat]);

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
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">All Tools</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Every tool on Sounez in one place. Search by name or filter by category.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tools…"
            className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm shadow-soft outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm shadow-soft outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <ToolCard key={t.slug} tool={t} searchQuery={q.trim() ? q : undefined} />
        ))}
      </div>
      {filtered.length === 0 && <p className="py-16 text-center text-muted-foreground">No tools match your search. Try a different keyword.</p>}

      <AdSlot className="mt-12" />
    </div>
  );
}
