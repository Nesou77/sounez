import type { ReactNode } from "react";
import { SmartLink as Link } from "@/components/smart-link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles, Wrench, User } from "lucide-react";
import { BlogPostDate } from "@/components/BlogPostDate";
import { ContentDates } from "@/components/ContentDates";
import { BlogEngagement } from "./BlogEngagement";
import { EngagementBar } from "./EngagementBar";
import { BlogLikeController } from "./blog/BlogLikeController";
import { AuthorCard } from "./AuthorCard";
import { BLOG_POSTS } from "@/data/blog";
import { TOOLS } from "@/data/tools";
import { sortBlogPostsByPopularity, sortToolsByPopularity } from "@/lib/popularity";
import { getToolIcon } from "@/lib/tool-icons";

export function BlogPostShell({
  slug,
  title,
  excerpt,
  children,
  ctaTools,
}: {
  slug: string;
  title: string;
  excerpt: string;
  children: ReactNode;
  ctaTools?: string[];
}) {
  const post = BLOG_POSTS.find((p) => p.slug === slug)!;
  const others = sortBlogPostsByPopularity(BLOG_POSTS.filter((p) => p.slug !== slug)).slice(0, 3);
  const featuredTools = (ctaTools ?? [])
    .map((s) => TOOLS.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const primaryTools = featuredTools.slice(0, 3);
  const sidebarTools = sortToolsByPopularity(TOOLS.filter((t) => !primaryTools.includes(t))).slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <BlogLikeController slug={slug}>
        <article>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All guides
          </Link>

          <header className="mt-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <BlogPostDate slug={slug} readTime={post.readTime} />
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <User className="h-3.5 w-3.5" aria-hidden="true" /> by Nesou
              </span>
            </div>
            <ContentDates contentType="blog" slug={slug} className="mt-2 text-xs text-muted-foreground" staticFallback={post?.publishedAt} />
            <h1 className="animate-slide-up mt-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="animate-slide-up delay-75 mt-5 text-lg leading-relaxed text-muted-foreground">
              {excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <AuthorCard compact />
              <EngagementBar slug={`blog:${slug}`} title={title} />
            </div>
          </header>

          <figure className="group relative my-10 overflow-hidden rounded-3xl border border-border bg-card shadow-pop">
            <div className="relative aspect-[16/9]">
              <Image
                src={post.image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 800px"
                priority
              />
            </div>
          </figure>

          {primaryTools.length > 0 && (
            <aside className="my-8 rounded-2xl border border-primary/30 bg-gradient-soft p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" /> Try the tools mentioned in this article
              </div>
              <div className="mt-4 grid gap-2">
                {primaryTools.map((t) => {
                  const I = getToolIcon(t.slug);
                  return (
                    <Link key={t.slug} href={`/tools/${t.slug}`} className="group flex items-center gap-3 rounded-xl bg-card/80 p-3 transition hover:bg-card hover:shadow-soft">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
                        <I className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{t.description}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" />
                    </Link>
                  );
                })}
              </div>
            </aside>
          )}

          <div
            className="prose prose-neutral max-w-none
            [&>h2]:mt-14 [&>h2]:mb-5 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:scroll-mt-20
            [&>h2]:relative [&>h2]:pl-4 [&>h2]:before:content-[''] [&>h2]:before:absolute [&>h2]:before:left-0 [&>h2]:before:top-1.5 [&>h2]:before:bottom-1.5 [&>h2]:before:w-1 [&>h2]:before:rounded-full [&>h2]:before:bg-gradient-brand
            [&>h3]:mt-8 [&>h3]:mb-2 [&>h3]:text-xl [&>h3]:font-semibold
            [&>p]:mt-5 [&>p]:leading-[1.8] [&>p]:text-foreground/85
            [&>ul]:mt-5 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:my-2 [&>ul>li]:leading-relaxed [&>ul>li]:text-foreground/85
            [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary/80
            [&_strong]:text-foreground"
          >
            {children}
          </div>

          <BlogEngagement slug={slug} title={title} />

          <div className="my-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Written by</p>
            <AuthorCard />
          </div>

          {primaryTools[0] && (
            <section className="my-12 overflow-hidden rounded-3xl border border-border bg-gradient-brand p-8 text-primary-foreground shadow-pop">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Ready to put this into action?</h2>
                  <p className="mt-1 text-sm opacity-90">Open {primaryTools[0].name} and try it now. Free, no account needed.</p>
                </div>
                <Link
                  href={`/tools/${primaryTools[0].slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-soft transition hover:-translate-y-0.5 active:scale-95"
                >
                  Open {primaryTools[0].name} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          )}

          <section className="my-14">
            <h2 className="text-2xl font-bold tracking-tight">Keep reading</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border/70 bg-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
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
                  <div className="p-4">
                    <div className="text-xs font-medium text-muted-foreground">{p.readTime} read</div>
                    <div className="mt-1.5 text-sm font-semibold leading-snug transition group-hover:text-primary">
                      {p.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </article>
        </BlogLikeController>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Wrench className="h-4 w-4 text-primary" /> Popular tools
              </div>
              <ul className="mt-3 space-y-1.5">
                {sidebarTools.map((t) => {
                  const I = getToolIcon(t.slug);
                  return (
                    <li key={t.slug}>
                      <Link href={`/tools/${t.slug}`} className="group flex items-center gap-2.5 rounded-lg p-2 text-sm transition hover:bg-muted">
                        <I className="h-4 w-4 text-primary" />
                        <span className="flex-1 truncate font-medium">{t.name}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link href="/tools" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                See all tools <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-gradient-soft p-5">
              <div className="text-sm font-semibold">More guides</div>
              <ul className="mt-3 space-y-2">
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="text-sm font-medium leading-snug text-foreground/85 transition hover:text-primary">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
