"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, TOOLS, toolsByCategory } from "@/data/tools";
import { sortToolsByPopularity } from "@/lib/popularity";
import { matchToolListSearch } from "@/lib/tools-search";
import { ToolCard } from "@/components/ToolCard";
import { trackSearch } from "@/lib/analytics";
import { SmartLink as Link } from "@/components/smart-link";
import { getCategoryEditorial } from "@/lib/category-content";

export function ToolsClient() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const list = TOOLS.filter((tool) => matchToolListSearch(tool, q));
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

      <header className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-bold sm:text-5xl">Tools</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Search by name, or browse the three main categories: creator tools, design tools, and utility tools.
          Each tool page explains what it does, when to use it, common mistakes, and how your input is handled.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Need several related drafts from one idea? Start with{" "}
          <Link href="/smart-packs" className="font-medium text-primary hover:underline">Smart Packs</Link>.
          Want background reading? Browse the{" "}
          <Link href="/blog" className="font-medium text-primary hover:underline">Guides</Link>.
        </p>
      </header>

      <div className="relative mb-6 max-w-xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Search tools..."
          className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm shadow-soft outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {!isSearching && (
        <nav aria-label="Tool categories" className="mb-12 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            >
              {category.name}
            </a>
          ))}
        </nav>
      )}

      {isSearching ? (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            {filtered.length} result{filtered.length === 1 ? "" : "s"} for &ldquo;{q.trim()}&rdquo;
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} searchQuery={q} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">
              No tools match. Try another keyword or browse the categories below.
            </p>
          )}
        </>
      ) : (
        <div className="space-y-16">
          {CATEGORIES.map((category) => {
            const items = toolsByCategory(category.slug);
            const editorial = getCategoryEditorial(category.slug);
            return (
              <section key={category.slug} id={category.slug} className="scroll-mt-24">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-bold tracking-tight">{category.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                  {editorial && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{editorial.extendedIntro}</p>
                  )}
                </div>

                {editorial && editorial.useCases.length > 0 && (
                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {editorial.useCases.map((useCase) => (
                      <div key={useCase.title} className="rounded-2xl border border-border bg-muted/30 p-4">
                        <h3 className="text-sm font-semibold">{useCase.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{useCase.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>

                {editorial && editorial.tips.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-border bg-card p-5">
                    <h3 className="text-sm font-semibold">Useful notes before you start</h3>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                      {editorial.tips.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}

      {!isSearching && (
        <section className="mt-16 grid gap-5 rounded-3xl border border-border bg-gradient-soft p-6 md:grid-cols-[1.2fr_1fr] md:items-center sm:p-8">
          <div>
            <h2 className="text-xl font-bold">Before you use a tool</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted-foreground">
              <li>Read the privacy note if you are uploading files or using AI.</li>
              <li>Treat AI output as a draft, then check facts, prices, dates, and claims before publishing.</li>
              <li>Keep original files when converting, compressing, or editing images.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <h3 className="font-semibold">Need a full workflow?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Smart Packs connect related jobs, such as caption, hashtags, alt text, and posting notes from one brief.
            </p>
            <Link href="/smart-packs" className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">
              Browse Smart Packs
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
