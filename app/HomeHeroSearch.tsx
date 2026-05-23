/**
 * Client component - only the interactive search functionality.
 * This is loaded after the static hero content to improve LCP.
 */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SmartLink as Link } from "@/components/smart-link";
import { Search } from "lucide-react";
import { TOOLS, type Tool } from "@/data/tools";
import { sortToolsByPopularity } from "@/lib/popularity";
import { matchToolHeroSearch } from "@/lib/tools-search";
import { getToolIcon } from "@/lib/tool-icons";
import { trackSearch, trackSelectContent } from "@/lib/analytics";

function filterToolsByQuery(raw: string): Tool[] {
  if (!raw.trim()) return [];
  return sortToolsByPopularity(TOOLS.filter((t) => matchToolHeroSearch(t, raw)));
}

export function HomeHeroSearch() {
  const [q, setQ] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => filterToolsByQuery(q), [q]);

  useEffect(() => {
    setActiveIndex(-1);
    const trimmed = q.trim();
    if (!trimmed) return;
    const id = window.setTimeout(() => {
      const results = filterToolsByQuery(q);
      trackSearch({ search_term: trimmed, result_count: results.length });
    }, 400);
    return () => clearTimeout(id);
  }, [q]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      e.preventDefault();
      setQ("");
      setActiveIndex(-1);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const selected = filtered[activeIndex];
      if (selected) {
        trackSelectContent({ content_type: "tool", item_id: selected.slug, search_term: q.trim() || undefined });
        window.location.href = `/tools/${selected.slug}`;
      }
    }
  }

  return (
    <div className="mx-auto mt-12 max-w-xl">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder={`Search ${TOOLS.length} free tools`}
          aria-label="Search tools"
          aria-autocomplete="list"
          aria-controls={q && filtered.length > 0 ? "search-results" : undefined}
          aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
          role="combobox"
          aria-expanded={q.length > 0}
          className="w-full rounded-2xl border border-border bg-background/80 py-4 pl-11 pr-4 text-sm shadow-soft outline-none backdrop-blur transition focus:border-primary focus:ring-4 focus:ring-primary/15"
        />
      </div>
      {q && filtered.length === 0 && (
          <p
            role="status"
            aria-live="polite"
            className="mt-3 p-3 text-sm text-muted-foreground"
          >
            No tools found.
          </p>
        )}
        {q && filtered.length > 0 && (
          <div
            id="search-results"
            role="listbox"
            aria-label="Search results"
            className="animate-fade-in mt-3 max-h-72 overflow-y-auto rounded-2xl border border-border bg-popover p-2 text-left shadow-pop"
          >
          {filtered.map((t, idx) => {
            const ToolIcon = getToolIcon(t.slug);
            return (
              <Link
                key={t.slug}
                id={`search-option-${idx}`}
                href={`/tools/${t.slug}`}
                role="option"
                aria-selected={idx === activeIndex}
                className={`flex items-center gap-3 rounded-lg p-2.5 text-sm transition hover:bg-accent${idx === activeIndex ? " bg-accent" : ""}`}
                onClick={() =>
                  trackSelectContent({
                    content_type: "tool",
                    item_id: t.slug,
                    search_term: q.trim() || undefined,
                  })
                }
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
  );
}
