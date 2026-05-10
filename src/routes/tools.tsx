import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "All Free Online Tools — Sounez" },
      { name: "description", content: "Browse all free online tools on Sounez. Filter by category and search 10+ tools for creators, designers and productivity." },
      { property: "og:title", content: "All Free Online Tools — Sounez" },
      { property: "og:description", content: "Browse and search all free Sounez tools." },
    ],
  }),
  component: ToolsIndex,
});

function ToolsIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(() => {
    return TOOLS.filter((t) =>
      (cat === "all" || t.category === cat) &&
      (q === "" || t.name.toLowerCase().includes(q.toLowerCase()) || t.description.toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, cat]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">All Tools</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Every Sounez tool in one place. Free, fast and made for getting things done.
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
        {filtered.map((t) => <ToolCard key={t.slug} tool={t} />)}
      </div>
      {filtered.length === 0 && <p className="py-16 text-center text-muted-foreground">No tools match your filters.</p>}

      <AdSlot className="mt-12" />
    </div>
  );
}
