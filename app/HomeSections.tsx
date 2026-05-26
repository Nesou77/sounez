/**
 * Server component — renders popular tools, categories, blog posts, FAQ and trust bar.
 * No client JS needed for these sections.
 */
import { SmartLink as Link } from "@/components/smart-link";
import Image from "next/image";
import { ToolCard } from "@/components/ToolCard";
import { ArrowRight, Plus, Shield, Zap, Heart } from "lucide-react";
import { FEATURED_TOOLS, CATEGORIES } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog";
import { getCategoryIcon } from "@/lib/tool-icons";
import { sortBlogPostsByPopularity } from "@/lib/popularity";

const FAQS = [
  {
    q: "Is Sounez free to use?",
    a: "Yes. Sounez is free to use with fair-use limits on AI and server-backed tools. No account is required for most tools.",
  },
  {
    q: "Do my files get uploaded to a server?",
    a: "Many tools run directly in your browser (for example QR codes, word counter, password generator). AI tools, PDF conversion, and image description send the content you submit to our servers securely for processing.",
  },
  {
    q: "Can I use Sounez tools for commercial work?",
    a: "Yes. You can use the output from any Sounez tool in personal, educational and commercial projects.",
  },
  {
    q: "Will more tools be added?",
    a: "Yes. New tools are added regularly. Bookmark the tools page or check the blog to stay updated.",
  },
  {
    q: "What types of tools does Sounez offer?",
    a: "There are three main categories: creator tools (hashtags, AI captions, earnings calculators), design tools (color palettes, CSS gradients, box shadows), and utility tools (image compressor, QR code generator, password generator, word counter and more).",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Everything runs directly in your browser. There is nothing to download or install.",
  },
  {
    q: "Do the tools work on mobile?",
    a: "Yes. All tools are designed to work on mobile browsers. Upload areas, sliders, copy buttons and dropdowns are all touch-friendly.",
  },
  {
    q: "How do I compress an image on Sounez?",
    a: "Open the Image Compressor, drag your JPG, PNG or WebP file onto the upload area, adjust the quality slider, and click Compress. You can download the compressed file or batch-compress multiple images and download them all as a ZIP.",
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

export function HomeSections() {
  return (
    <>
      {/* Popular Tools */}
      <section id="popular" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Featured</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Featured tools</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked tools to get started quickly.</p>
          </div>
          <Link href="/tools" className="hidden text-sm font-medium text-primary-label hover:underline sm:inline">
            View all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_TOOLS.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-label hover:underline"
          >
            See all free tools <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Trust / privacy bar */}
      <section className="mx-auto max-w-5xl px-4 pb-4 sm:px-6">
        <div className="grid gap-5 rounded-3xl border border-border bg-gradient-soft p-6 sm:grid-cols-3 sm:p-8">
          <div className="flex gap-3">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold">Private by design</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Many tools run in your browser. Server-backed tools explain what is processed before you submit.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Zap className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold">No account required</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Open any tool and use it right away. No signup, no email, no waiting.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Heart className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold">Free for personal and commercial use</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Free to use with fair-use limits on AI routes. Output you create is yours to use, subject to our terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Browse</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Browse by category</h2>
          <p className="mt-2 text-muted-foreground">Not sure where to start? Pick a category and go from there.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {CATEGORIES.map((c) => {
            const Icon = getCategoryIcon(c.slug);
            return (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="group ring-gradient relative overflow-hidden rounded-2xl border border-border/70 bg-card p-7 shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
              >
                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-brand opacity-10 blur-2xl pointer-events-none" />
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-pop">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open category <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
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
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">From the blog</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Latest from the blog</h2>
            <p className="mt-2 text-muted-foreground">
              Practical guides for creators, designers and anyone who wants to work smarter.
            </p>
          </div>
          <Link href="/blog" className="hidden text-sm font-medium text-primary-label hover:underline sm:inline">
            All posts →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {sortBlogPostsByPopularity(BLOG_POSTS).slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
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
                <div className="text-xs font-medium text-muted-foreground">
                  {p.readTime} read
                </div>
                <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight transition group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">FAQ</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Common questions</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Quick answers about how Sounez works, what it costs, and how your data is handled.
          </p>
        </div>
        <div className="mt-10 space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:border-primary/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold marker:hidden">
                <span>{f.q}</span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-muted text-muted-foreground transition group-open:rotate-45 group-open:bg-primary group-open:text-primary-foreground">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Have a question not listed here?{" "}
          <Link href="/contact" className="font-medium text-primary-label hover:underline">
            Contact us
          </Link>
          .
        </div>
      </section>
    </>
  );
}
