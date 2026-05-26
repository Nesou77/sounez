import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blog";
import { CATEGORIES } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";
import { sortBlogPostsByPopularity } from "@/lib/popularity";

export const metadata: Metadata = {
  title: "Sounez Blog | Guides for Creators, Designers and Makers",
  description:
    "Hands-on guides covering social media growth, design workflows, image optimization, productivity tools and more — written for people who make things online.",
  alternates: { canonical: getSiteUrl() + "/blog" },
  openGraph: {
    title: "Sounez Blog | Guides for Creators, Designers and Makers",
    description:
      "Hands-on guides covering social media growth, design workflows, image optimization, productivity tools and more.",
  },
};

const sortedPosts = sortBlogPostsByPopularity(BLOG_POSTS);

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">The Sounez Blog</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Hands-on guides for creators, designers, students and anyone building things on the web.
          Each article pairs practical advice with the free tools on this site so you can act on it
          immediately.
        </p>
      </header>

      {/* Category filter links */}
      <nav aria-label="Blog categories" className="mb-10 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}`}
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
              <div className="text-xs text-muted-foreground">{p.date} · {p.readTime} read</div>
              <h2 className="mt-2 font-semibold leading-snug transition-colors group-hover:text-primary">
                {p.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                Read article →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
