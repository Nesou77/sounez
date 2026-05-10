"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Search, ArrowRight, Sparkles, Zap, Shield, Heart, Plus } from "lucide-react";
import { TOOLS, CATEGORIES, BLOG_POSTS } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";
import { getCategoryIcon, getToolIcon } from "@/lib/tool-icons";

const FAQS = [
  { q: "Is Sounez free to use?", a: "Yes. Every tool on Sounez is 100% free, with no signup required." },
  { q: "Do my files get uploaded to a server?", a: "No. Tools like the Image Compressor and Password Generator run entirely in your browser. Your data never leaves your device." },
  { q: "Can I use Sounez tools for commercial work?", a: "Absolutely. Output from Sounez tools can be used for personal, educational and commercial projects." },
  { q: "Will more tools be added?", a: "Yes — Sounez is built to scale to 100+ tools. New ones are added regularly." },
];

export function HomeClient() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => TOOLS.filter((t) => t.name.toLowerCase().includes(q.toLowerCase())),
    [q]
  );
  const popular = TOOLS.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute -top-40 left-1/2 -z-10 h-[28rem] w-[70rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-25 blur-3xl" />
        <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <span className="animate-fade-in inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium text-foreground/80 shadow-soft backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Simple Tools. Powerful Results.
          </span>
          <h1 className="animate-slide-up mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Free online tools for{" "}
            <span className="text-gradient-brand">creators</span>, designers <br className="hidden sm:block" />
            &amp; everyday productivity
          </h1>
          <p className="animate-slide-up delay-75 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Fast, free and beautifully simple. No signup, no clutter — just tools that work in your browser, instantly.
          </p>

          <div className="animate-slide-up delay-150 mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/tools" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-pop transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0">
              Explore all tools
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href="#popular" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/70 px-6 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-muted">
              See popular
            </a>
          </div>

          {/* Search */}
          <div className="animate-slide-up delay-225 mx-auto mt-12 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={`Search ${TOOLS.length}+ free tools…`}
                className="w-full rounded-2xl border border-border bg-background/80 py-4 pl-11 pr-4 text-sm shadow-soft outline-none backdrop-blur transition focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
            </div>
            {q && (
              <div className="animate-fade-in mt-3 max-h-72 overflow-y-auto rounded-2xl border border-border bg-popover p-2 text-left shadow-pop">
                {filtered.length === 0 && <p className="p-3 text-sm text-muted-foreground">No tools found.</p>}
                {filtered.map((t) => {
                  const ToolIcon = getToolIcon(t.slug);
                  return (
                    <Link key={t.slug} href={`/${t.slug}`} className="flex items-center gap-3 rounded-lg p-2.5 text-sm transition hover:bg-accent">
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
            <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-primary" /> Lightning fast</span>
            <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-primary" /> Private &amp; secure</span>
            <span className="flex items-center gap-1.5"><Heart className="h-3.5 w-3.5 text-primary" /> 100% free, forever</span>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section id="popular" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Most loved</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Popular tools</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked favorites used every day.</p>
          </div>
          <Link href="/tools" className="hidden text-sm font-medium text-primary hover:underline sm:inline">View all →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6"><AdSlot /></div>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Browse</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Browse by category</h2>
          <p className="mt-2 text-muted-foreground">Find the right tool for the job.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {CATEGORIES.map((c) => {
            const Icon = getCategoryIcon(c.slug);
            return (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="group ring-gradient relative overflow-hidden rounded-2xl border border-border/70 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-brand opacity-[0.07] blur-2xl transition group-hover:opacity-20" />
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-pop">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open category <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Latest Blog */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Insights</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Latest from the blog</h2>
            <p className="mt-2 text-muted-foreground">Guides, playbooks and tips for creators.</p>
          </div>
          <Link href="/blog" className="hidden text-sm font-medium text-primary hover:underline sm:inline">All posts →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
              <div className="aspect-[16/9] overflow-hidden relative">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-medium text-muted-foreground">{p.date} · {p.readTime} read</div>
                <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight transition group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">FAQ</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
        </div>
        <div className="mt-10 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:border-primary/30">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold marker:hidden">
                <span>{f.q}</span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-muted text-muted-foreground transition group-open:rotate-45 group-open:bg-primary group-open:text-primary-foreground">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
