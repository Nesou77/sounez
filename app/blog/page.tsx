import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/tools";

export const metadata: Metadata = {
  title: "Sounez Blog — Tips & Guides for Creators",
  description: "Guides, playbooks and tips on growing as a creator, designer and productivity pro.",
  openGraph: {
    title: "Sounez Blog",
    description: "Tips and playbooks for creators.",
  },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">The Sounez Blog</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Hands-on guides for creators, designers and productivity pros.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((p) => (
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
