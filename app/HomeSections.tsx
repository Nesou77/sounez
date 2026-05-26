import { SmartLink as Link } from "@/components/smart-link";
import Image from "next/image";
import { ToolCard } from "@/components/ToolCard";
import { ArrowRight, CheckCircle2, FileCheck, Layers, Shield } from "lucide-react";
import { CATEGORIES, FEATURED_TOOLS, toolsByCategory } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog";
import { sortBlogPostsByPopularity } from "@/lib/popularity";
import { SMART_PACKS } from "@/lib/smart-packs-data";
import { getCategoryIcon } from "@/lib/tool-icons";

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Choose the job",
    text: "Open a single tool for a quick task, or start with a Smart Pack when several pieces need to match.",
  },
  {
    step: "2",
    title: "Add only what is needed",
    text: "Paste text, upload a file, or fill a short brief. Tool pages explain what is processed locally or on the server.",
  },
  {
    step: "3",
    title: "Check the result",
    text: "Copy or download the output, then verify facts, claims, links, image details, and formatting before you use it.",
  },
];

const TRUST_NOTES = [
  {
    Icon: Shield,
    title: "Clear privacy notes",
    text: "Browser-only tools say so. AI and PDF tools explain when content is processed on a server.",
  },
  {
    Icon: FileCheck,
    title: "Drafts, not final approval",
    text: "Generated copy, study notes, image descriptions, and listings should be edited by a person before publishing.",
  },
  {
    Icon: CheckCircle2,
    title: "Ads kept out of the work area",
    text: "Sounez uses advertising to support free tools, while forms, buttons, uploads, and result areas stay focused on the task.",
  },
];

export function HomeSections() {
  const latestPosts = sortBlogPostsByPopularity(BLOG_POSTS).slice(0, 3);

  return (
    <>
      <section id="smart-packs" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Smart Packs</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Start with a complete workflow</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Smart Packs turn one clear brief into related drafts: captions, listing copy, image SEO notes,
              launch text, or study material. They do not publish anything for you.
            </p>
          </div>
          <Link href="/smart-packs" className="text-sm font-medium text-primary-label hover:underline shrink-0">
            View all Smart Packs
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SMART_PACKS.map((pack) => (
            <Link
              key={pack.slug}
              href={`/smart-packs/${pack.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40"
            >
              <Layers className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-bold">{pack.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pack.shortDescription}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Open pack <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="popular" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Tools</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Popular tools</h2>
            <p className="mt-2 text-muted-foreground">
              A few common starting points. The tools page groups everything by category.
            </p>
          </div>
          <Link href="/tools" className="hidden text-sm font-medium text-primary-label hover:underline sm:inline">
            Browse all tools
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_TOOLS.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Tool categories</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Find the right kind of tool</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Categories stay inside the tools area so the main navigation stays simple. Jump to the group
            that matches what you are trying to finish.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {CATEGORIES.map((category) => {
            const Icon = getCategoryIcon(category.slug);
            const count = toolsByCategory(category.slug).length;
            return (
              <Link
                key={category.slug}
                href={`/tools#${category.slug}`}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-soft text-primary ring-1 ring-primary/10">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{category.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-primary">
                  Browse {count} tool{count === 1 ? "" : "s"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight">How Sounez works</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          The site is meant for practical jobs: open a page, get the result, review it, and move on.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="rounded-2xl border border-border bg-card p-6 text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-primary-foreground">
                {item.step}
              </span>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Guides</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Latest guides</h2>
            <p className="mt-2 text-muted-foreground">
              Practical articles that explain the tool choices, mistakes, and checks behind common tasks.
            </p>
          </div>
          <Link href="/blog" className="hidden text-sm font-medium text-primary-label hover:underline sm:inline">
            View all guides
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-medium text-muted-foreground">{post.readTime} read</div>
                <h3 className="mt-2 text-base font-semibold leading-snug group-hover:text-primary">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Trust and privacy</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Useful tools with clear limits</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Sounez is built to be helpful without pretending every tool works the same way. Read the short
            note on each page before using private files, client work, or AI-generated drafts.
          </p>
        </div>
        <div className="grid gap-5 rounded-3xl border border-border bg-gradient-soft p-6 sm:grid-cols-3 sm:p-8">
          {TRUST_NOTES.map(({ Icon, title, text }) => (
            <div key={title} className="flex gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Ready to try a simple workflow?</h2>
        <p className="mt-3 text-muted-foreground">
          Start with a Smart Pack if you need several related drafts, or open the tools page if you
          already know the job.
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
    </>
  );
}
