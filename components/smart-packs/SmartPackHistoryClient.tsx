"use client";

import { useCallback, useEffect, useState } from "react";
import { SmartLink as Link } from "@/components/smart-link";
import { SMART_PACKS } from "@/data/smartPacks";
import { SmartPackResult } from "./SmartPackResult";
import type { SmartPackOutput } from "@/lib/smart-packs/schemas";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

type HistoryItem = {
  id: string;
  packSlug: string;
  language: string | null;
  tone: string | null;
  createdAt: string;
  updatedAt: string;
  output: SmartPackOutput;
};

export function SmartPackHistoryClient() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");
  const [selected, setSelected] = useState<HistoryItem | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const q = filter ? `?packSlug=${encodeURIComponent(filter)}` : "";
      const res = await fetch(`/api/smart-packs/history${q}`);
      const data = await res.json();
      if (data.ok && Array.isArray(data.items)) {
        setItems(
          data.items.map((row: HistoryItem & { output: unknown }) => ({
            ...row,
            output: row.output as SmartPackOutput,
            createdAt: typeof row.createdAt === "string" ? row.createdAt : new Date(row.createdAt).toISOString(),
          })),
        );
      }
    } catch {
      toast.error("Could not load history");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id: string) => {
    try {
      const res = await fetch(`/api/smart-packs/history/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) {
        toast.error("Could not delete");
        return;
      }
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (selected?.id === id) setSelected(null);
      toast.success("Removed");
    } catch {
      toast.error("Could not delete");
    }
  };

  const packName = (slug: string) => SMART_PACKS.find((p) => p.slug === slug)?.name ?? slug;

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-4">
        <label className="block text-sm font-medium" htmlFor="pack-filter">
          Filter by pack
        </label>
        <select
          id="pack-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="">All packs</option>
          {SMART_PACKS.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
        {loading ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No saved packs on this device yet.{" "}
            <Link href="/smart-packs" className="text-primary hover:underline">
              Generate one
            </Link>
            .
          </p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                    selected?.id === item.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                  }`}
                >
                  <div className="font-semibold">{packName(item.packSlug)}</div>
                  <time className="text-xs text-muted-foreground" dateTime={item.createdAt}>
                    {new Date(item.createdAt).toLocaleString()}
                  </time>
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
      <div>
        {selected ? (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button type="button" variant="outline" size="sm" onClick={() => remove(selected.id)}>
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
            <SmartPackResult
              packSlug={selected.packSlug}
              output={selected.output}
              createdAt={selected.createdAt}
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Select a saved pack to view or copy it again.</p>
        )}
      </div>
    </div>
  );
}
