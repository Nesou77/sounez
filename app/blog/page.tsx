import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blog";
import { CATEGORIES } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";
import { sortBlogPostsByPopularity } from "@/lib/popularity";

export const metadata: Metadata = {
  title: "Sounez Guides | Practical Tool Guides for Creators and Makers",
  description:
    "Hands-on guides covering social media growth, design workflows, image optimization, productivity tools and more - written for people who make things online.",
  alternates: { canonical: getSiteUrl() + "/blog" },
  openGraph: {
    title: "Sounez Guides | Practical Tool Guides",
    description:
      "Hands-on guides covering social media growth, design workflows, image optimization, productivity tools and more.",
  },
};

const sortedPosts = sortBlogPostsByPopularity(BLOG_POSTS);

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Sounez Guides</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Hands-on guides for creators, designers, students and anyone building things on the web.
          Each article pairs practical advice with the free tools on this site so you can act on it
          immediately.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/tools" className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">
            Browse tools
          </Link>
          <Link href="/smart-packs" className="rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-pop">
            Try Smart Packs
          </Link>
        </div>
      </header>

      <section className="mx-auto mb-10 max-w-3xl rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-center">What we write about</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-center">
          Guides are written for people who use Sounez tools in real workflows - not generic listicles.
          Each article links to the tool it mentions so you can follow along.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold">Images &amp; performance</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Compression, formats, alt text, and SEO checklists for blogs and shops.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold">Social &amp; video</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Captions, bios, hashtags, YouTube descriptions, and honest growth notes.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold">Design &amp; CSS</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Palettes, gradients, shadows, patterns, favicons, and font pairings with copy-paste code.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold">Work &amp; study</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              PDF conversion, study notes, resumes, passwords, and everyday productivity.
            </p>
          </div>
        </div>
      </section>

      <nav aria-label="Guide category links" className="mb-10 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/tools#${c.slug}`}
            className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
          >
            {c.name}
          </Link>
        ))}
      </nav>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
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
            <div className="p-5">
              <div className="text-xs text-muted-foreground">{p.readTime} read</div>
              <h2 className="mt-2 font-semibold leading-snug transition-colors group-hover:text-primary">
                {p.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                Read guide
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
