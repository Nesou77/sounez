/**
 * Server component — renders popular tools, categories, blog posts, and FAQ.
 * No client JS needed for these sections.
 */
import { SmartLink as Link } from "@/components/smart-link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, Plus } from "lucide-react";
import { FEATURED_TOOLS, CATEGORIES } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog";
import { getCategoryIcon } from "@/lib/tool-icons";

// Lazy load ToolCard to reduce initial JS bundle
const ToolCard = dynamic(() => import("@/components/ToolCard").then(mod => ({ default: mod.ToolCard })), {
  loading: () => <div className="h-48 animate-pulse rounded-2xl bg-muted" />,
});

const FAQS = [
  { q: "Is Sounez free to use?", a: "Yes. Every tool on Sounez is completely free. No account, no trial period, no catch." },
  { q: "Do my files get uploaded to a server?", a: "No. Tools like the Image Compressor and Password Generator run entirely in your browser. Nothing leaves your device." },
  { q: "Can I use Sounez tools for commercial work?", a: "Yes. You can use the output from any Sounez tool in personal, educational and commercial projects." },
  { q: "Will more tools be added?", a: "Yes. New tools are added regularly. Bookmark the tools page or check the blog to stay updated." },
];

export function HomeSections() {
  return (
    <>
      {/* Popular Tools */}
      <section id="popular" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            {/* text-primary-label is darker than text-primary, passes WCAG AA for small uppercase text */}
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Most used</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Popular tools</h2>
            <p className="mt-2 text-muted-foreground">The tools people open most. Good place to start.</p>
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
          {BLOG_POSTS.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
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
                <div className="text-xs font-medium text-muted-foreground">
                  {p.date} · {p.readTime} read
                </div>
                <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight transition group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">FAQ</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Common questions</h2>
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
