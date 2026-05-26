import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { getSiteUrl } from "@/lib/site-url";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { SMART_PACKS } from "@/lib/smart-packs-data";

const url = `${getSiteUrl()}/smart-packs`;

export const metadata: Metadata = {
  title: "Smart Packs | Sounez",
  description:
    "One idea, several ready-to-use assets. Workflows for social posts, product listings, and image SEO using Sounez tools.",
  alternates: { canonical: url },
};

export default function SmartPacksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link>
        {" / "}
        <span className="text-foreground">Smart Packs</span>
      </nav>

      <header className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
          <Layers className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> Smart Packs
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          One idea → several ready-to-use assets
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          Smart Packs are step-by-step workflows. You bring a short brief, run the linked Sounez tools, and edit each
          piece before it goes live. We do not auto-publish for you.
        </p>
      </header>

      <section className="mt-12 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" /> How packs work
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          A pack is a checklist, not a single button. You write a short brief once, then open the linked tools in order.
          AI tools send your brief to our servers for a draft response; image tools may run in your browser — each tool page says which applies.
        </p>
        <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li>1. Open a pack and read the example workflow and sample output.</li>
          <li>2. Use each linked tool to draft one asset (caption, alt text, title, etc.).</li>
          <li>3. Paste into your doc, scheduler, or shop admin — edit tone, check facts, then publish.</li>
        </ol>
        <p className="mt-4 text-xs text-muted-foreground">
          Packs do not connect to Instagram, Shopify, or YouTube. You stay in control of what goes live.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold">Who Smart Packs are for</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold">Shop owners</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Compress photos, write alt text, and draft listing copy before you upload to a marketplace.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold">Creators</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Turn one post idea into caption, hashtags, and a pinned comment without staring at a blank box.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold">Bloggers &amp; developers</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Fix image SEO on posts: filenames, compression, and accurate alt text before you ship.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {SMART_PACKS.map((p) => (
          <Link
            key={p.slug}
            href={`/smart-packs/${p.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40"
          >
            <h2 className="text-xl font-bold">{p.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
            <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
              {p.generates.slice(0, 3).map((g) => (
                <li key={g}>· {g}</li>
              ))}
            </ul>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Start pack <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-muted"
        >
          Or browse individual tools
        </Link>
      </div>
    </div>
  );
}
