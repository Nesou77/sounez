/**
 * Client component - only the interactive search functionality.
 * This is loaded after the static hero content to improve LCP.
 */
"use client";

import { useMemo, useRef, useState } from "react";
import { SmartLink as Link } from "@/components/smart-link";
import { Search } from "lucide-react";
import { TOOLS } from "@/data/tools";
import { getToolIcon } from "@/lib/tool-icons";

export function HomeHeroSearch() {
  const [q, setQ] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
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

  // Reset active index when results change
  const prevQ = useRef(q);
  if (prevQ.current !== q) {
    prevQ.current = q;
    if (activeIndex !== -1) setActiveIndex(-1);
  }

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
      if (selected) window.location.href = `/${selected.slug}`;
    }
  }

  return (
    <div className="mx-auto mt-12 max-w-xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => { setQ(e.target.value); setActiveIndex(-1); }}
          onKeyDown={handleKeyDown}
          placeholder={`Search ${TOOLS.length} free tools…`}
          aria-label="Search tools"
          aria-autocomplete="list"
          aria-controls={q ? "search-results" : undefined}
          aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
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
          {filtered.map((t, idx) => {
            const ToolIcon = getToolIcon(t.slug);
            return (
              <Link
                key={t.slug}
                id={`search-option-${idx}`}
                href={`/${t.slug}`}
                role="option"
                aria-selected={idx === activeIndex}
                className={`flex items-center gap-3 rounded-lg p-2.5 text-sm transition hover:bg-accent${idx === activeIndex ? " bg-accent" : ""}`}
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
