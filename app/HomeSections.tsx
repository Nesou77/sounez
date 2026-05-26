/**
 * Server component — homepage sections in visitor-friendly order.
 */
import { SmartLink as Link } from "@/components/smart-link";
import Image from "next/image";
import { ToolCard } from "@/components/ToolCard";
import { ArrowRight, Shield, Zap, Heart, Layers, CheckCircle2 } from "lucide-react";
import { FEATURED_TOOLS, CATEGORIES } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog";
import { sortBlogPostsByPopularity } from "@/lib/popularity";
import { SMART_PACKS } from "@/lib/smart-packs-data";
import { TOOL_GROUPS } from "@/lib/tool-groups";

const FAQS = [
  {
    q: "What is a Smart Pack?",
    a: "A Smart Pack is a checklist workflow: one brief, several assets (caption, alt text, hashtags, etc.). You run Sounez tools step by step and edit before publishing.",
  },
  {
    q: "Is Sounez free?",
    a: "Yes. Most tools are free with fair-use limits on AI and server-backed features. No account required for everyday use.",
  },
  {
    q: "Are my files uploaded?",
    a: "It depends on the tool. QR codes and counters run in your browser. PDF conversion and AI tools process what you submit securely — each tool page explains which applies.",
  },
  {
    q: "Can I use outputs commercially?",
    a: "Generally yes, but you are responsible for accuracy, rights to any files you upload, and following platform rules.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const HOW_IT_WORKS = [
  { step: "1", title: "Pick a tool or pack", text: "Start from the homepage, Smart Packs, or the tools directory." },
  { step: "2", title: "Add your input", text: "Paste text, upload a file, or fill a short form — only what that tool needs." },
  { step: "3", title: "Review the result", text: "Copy, download, or move to the next step in a Smart Pack workflow." },
];

const USE_CASES = [
  { title: "Creators", text: "Captions, hashtags, and QR codes for posts without juggling five apps." },
  { title: "Shop owners", text: "Compress product photos, write alt text, and draft listing copy." },
  { title: "Students", text: "Study notes and resumes with clear reminders to verify facts and cite sources." },
  { title: "Developers", text: "CSS gradients, favicons, placeholders, and utilities in one tab." },
];

export function HomeSections() {
  const latestPosts = sortBlogPostsByPopularity(BLOG_POSTS).slice(0, 3);

  return (
    <>
      {/* What Sounez is */}
      <section className="mx-auto max-w-3xl px-4 pt-4 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft sm:p-8">
          <h2 className="text-xl font-bold sm:text-2xl">What you get on Sounez</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Sounez is a collection of free browser tools plus Smart Packs — step-by-step workflows for posts, product listings, and image SEO.
            Each tool page explains what happens to your files, who the tool is for, and mistakes to avoid. We do not auto-publish to social networks or shops.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Use one tool for a quick job, or open a Smart Pack when you need a caption, hashtags, alt text, and compression notes from the same brief.
          </p>
        </div>
      </section>

      {/* Smart Packs */}
      <section id="smart-packs" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Smart Packs</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">One idea → several ready-to-use assets</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Structured workflows that combine Sounez tools. You stay in control — we do not auto-post or auto-publish for you.
            </p>
          </div>
          <Link href="/smart-packs" className="text-sm font-medium text-primary-label hover:underline shrink-0">
            All Smart Packs →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {SMART_PACKS.map((p) => (
            <Link
              key={p.slug}
              href={`/smart-packs/${p.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40"
            >
              <Layers className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Open pack <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular tools */}
      <section id="popular" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Tools</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Popular right now</h2>
            <p className="mt-2 text-muted-foreground">A few starting points — the full list is on the tools page.</p>
          </div>
          <Link href="/tools" className="hidden text-sm font-medium text-primary-label hover:underline sm:inline">
            All tools →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_TOOLS.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* Tool groups preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Browse</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Tools by type</h2>
          <p className="mt-2 text-muted-foreground">Jump to the group that matches what you are doing today.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOOL_GROUPS.map((g) => (
            <Link
              key={g.slug}
              href={`/tools#${g.slug}`}
              className="rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-soft"
            >
              <h3 className="font-semibold">{g.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{g.description}</p>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Also browse legacy categories:{" "}
          {CATEGORIES.map((c, i) => (
            <span key={c.slug}>
              <Link href={`/categories/${c.slug}`} className="font-medium text-primary hover:underline">
                {c.name}
              </Link>
              {i < CATEGORIES.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight">How Sounez works</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          No install. Open a page, do one job well, move on.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {HOW_IT_WORKS.map((h) => (
            <div key={h.step} className="rounded-2xl border border-border bg-card p-6 text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-primary-foreground">
                {h.step}
              </span>
              <h3 className="mt-4 font-semibold">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight">Built for everyday work</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((u) => (
            <div key={u.title} className="rounded-2xl border border-border bg-gradient-soft p-5">
              <h3 className="font-semibold">{u.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{u.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-5xl px-4 pb-4 sm:px-6">
        <h2 className="sr-only">Why trust Sounez</h2>
        <div className="grid gap-5 rounded-3xl border border-border bg-gradient-soft p-6 sm:grid-cols-3 sm:p-8">
          <div className="flex gap-3">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold">Honest about processing</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Browser tools vs server AI are labelled on each page. No fake metrics or engagement counts.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Zap className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold">Moderated comments</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Visitor comments are reviewed before they appear. Helpful votes use a simple hash, not public profiles.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Heart className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold">Real guides</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Blog posts and tool pages include examples, mistakes to avoid, and links to related tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Guides</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Latest guides</h2>
            <p className="mt-2 text-muted-foreground">Step-by-step articles linked to the tools we mention.</p>
          </div>
          <Link href="/blog" className="hidden text-sm font-medium text-primary-label hover:underline sm:inline">
            All posts →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-medium text-muted-foreground">{p.readTime} read</div>
                <h3 className="mt-2 text-base font-semibold leading-snug group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Ready to try a workflow?</h2>
        <p className="mt-3 text-muted-foreground">
          Start with a Smart Pack if you need several assets, or open a single tool if you know the job.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/smart-packs"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-pop"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Smart Packs
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-muted"
          >
            Browse tools
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <h2 className="text-center text-2xl font-bold">Common questions</h2>
        <div className="mt-8 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="rounded-2xl border border-border bg-card p-5">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
