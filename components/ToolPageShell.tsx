import type { ReactNode } from "react";
import { TOOLS, type Tool } from "@/data/tools";
import { blogPostsForTool } from "@/data/blog";
import { ToolCard } from "./ToolCard";
import { AdSlot } from "./AdSlot";
import { SmartLink as Link } from "@/components/smart-link";
import { getToolIcon } from "@/lib/tool-icons";
import { ArrowRight, Lightbulb, Sparkles, BookOpen, Layers } from "lucide-react";
import { EngagementBar } from "./EngagementBar";
import Image from "next/image";

type FAQ = { q: string; a: string };

const DEFAULT_USE_CASES = [
  { title: "Content creators", desc: "Get results in one click and spend more time actually creating." },
  { title: "Students", desc: "Free tools with no account needed. Good for assignments and study notes." },
  { title: "Marketers", desc: "Build campaign assets without opening heavy software." },
  { title: "Developers", desc: "Lightweight utilities that fit into any workflow without getting in the way." },
];

const DEFAULT_PRO_TIPS = [
  "Bookmark this page. You will come back to it more than you think.",
  "Combine this tool with another Sounez tool for a faster workflow.",
  "Share the result with a teammate to get feedback in seconds.",
  "Open the tool on mobile. It works exactly the same as on desktop.",
];

export function ToolPageShell({
  tool,
  intro,
  features,
  howTo,
  faqs,
  useCases = DEFAULT_USE_CASES,
  proTips = DEFAULT_PRO_TIPS,
  children,
}: {
  tool: Tool;
  intro: string;
  features: { title: string; desc: string }[];
  howTo: string[];
  faqs: FAQ[];
  useCases?: { title: string; desc: string }[];
  proTips?: string[];
  children: ReactNode;
}) {
  const sameCat = TOOLS.filter((t) => t.category === tool.category && t.slug !== tool.slug);
  const otherCat = TOOLS.filter((t) => t.category !== tool.category).slice(0, 6);
  const related = [...sameCat, ...otherCat].slice(0, 6);
  const moreTools = TOOLS.filter((t) => t.slug !== tool.slug && !related.includes(t)).slice(0, 6);
  const featuredPosts = blogPostsForTool(tool.slug);
  const Icon = getToolIcon(tool.slug);

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link> /{" "}
        <Link href={`/categories/${tool.category}`} className="hover:text-foreground capitalize">{tool.category.replace("-", " ")}</Link> /{" "}
        <span className="text-foreground">{tool.name}</span>
      </nav>

      <header className="mb-8 text-center">
        <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-pop">
          <Icon className="h-6 w-6" strokeWidth={2} />
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">{tool.name}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{intro}</p>
        <div className="mt-5 flex justify-center">
          <EngagementBar slug={`tool:${tool.slug}`} title={tool.name} />
        </div>
      </header>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        {children}
      </section>

      <AdSlot className="my-10" label="Sponsored" />

      <section className="my-12">
        <h2 className="text-2xl font-bold">Features</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold">How to use {tool.name}</h2>
        <ol className="mt-5 space-y-3">
          {howTo.map((step, i) => (
            <li key={i} className="flex gap-3 rounded-xl border border-border bg-card p-4">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-primary-foreground">{i + 1}</span>
              <p className="text-sm">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="my-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Layers className="h-6 w-6 text-primary" /> Who uses {tool.name}?
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((u) => (
            <div key={u.title} className="rounded-2xl border border-border bg-gradient-soft p-5">
              <h3 className="font-semibold">{u.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <AdSlot className="my-10" label="Sponsored" />

      <section className="my-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Lightbulb className="h-6 w-6 text-primary" /> Pro tips
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {proTips.map((t, i) => (
            <li key={i} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm">
              <Sparkles className="h-4 w-4 shrink-0 text-primary" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <AdSlot className="my-10" label="Sponsored" />

      <section className="my-12">
        <h2 className="text-2xl font-bold">Related tools</h2>
        <p className="mt-1 text-sm text-muted-foreground">Other tools that work well alongside {tool.name}.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      <section className="my-12 rounded-3xl border border-border bg-gradient-soft p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <BookOpen className="h-6 w-6 text-primary" /> Read next on the blog
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Practical guides and how-tos from the Sounez blog.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {featuredPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <div className="text-xs font-medium text-muted-foreground">{p.readTime} read</div>
                <div className="mt-1.5 text-sm font-semibold leading-snug transition group-hover:text-primary">{p.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold">Explore more tools</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {moreTools.map((t) => {
            const I = getToolIcon(t.slug);
            return (
              <Link key={t.slug} href={`/${t.slug}`} className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-soft text-primary ring-1 ring-primary/10">
                  <I className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{t.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{t.description}</div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            );
          })}
        </div>
        <div className="mt-6 text-sm">
          See <Link href="/tools" className="font-medium text-primary hover:underline">all {TOOLS.length} free tools</Link> or browse{" "}
          <Link href="/categories" className="font-medium text-primary hover:underline">all categories</Link>.
        </div>
      </section>
    </article>
  );
}
