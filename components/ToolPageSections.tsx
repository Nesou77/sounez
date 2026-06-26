"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { TOOLS, type Tool, toolBySlug } from "@/data/tools";
import { sortToolsByPopularity } from "@/lib/popularity";
import { blogPostsForTool } from "@/data/blog";
import { ToolCard } from "./ToolCard";
import { SmartLink as Link } from "@/components/smart-link";
import { Lightbulb, Sparkles, BookOpen, Layers } from "lucide-react";
import Image from "next/image";
import { getToolEditorial } from "@/lib/tool-editorial";
import { smartPackForTool } from "@/lib/tool-smart-pack-links";

const CommentsSection = dynamic(
  () => import("./CommentsSection").then((m) => m.CommentsSection),
  { ssr: false, loading: () => <div className="my-12 min-h-[12rem]" aria-hidden="true" /> },
);

export const ToolPageSections = memo(function ToolPageSections({ tool }: { tool: Tool }) {
  const ed = getToolEditorial(tool.slug);
  const whatItDoesText = ed.whatItDoes;
  const featuresList = ed.features;
  const examplesList = ed.examples;
  const howToList = ed.howTo;
  const whoForList = ed.whoFor;
  const proTipsList = ed.proTips;
  const mistakesList = ed.mistakes;
  const privacyText = ed.privacyNote;
  const whenNotText = ed.whenNotToUse;
  const faqsList = ed.faqs;

  const fromEditorial = ed.relatedSlugs
    .map((s) => toolBySlug(s))
    .filter((t): t is Tool => Boolean(t));
  const sameCat = sortToolsByPopularity(
    TOOLS.filter((t) => t.category === tool.category && t.slug !== tool.slug),
  );
  const related = [
    ...fromEditorial,
    ...sameCat.filter((t) => !fromEditorial.some((r) => r.slug === t.slug)),
  ].slice(0, 3);
  const featuredPosts = blogPostsForTool(tool.slug);
  const smartPack = smartPackForTool(tool.slug);

  return (
    <>
      <section className="my-12">
        <h2 className="text-2xl font-bold">What {tool.name} does</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{whatItDoesText}</p>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold">Features</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuresList.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {examplesList.length > 0 && (
        <section className="my-12">
          <h2 className="text-2xl font-bold">Real examples</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {examplesList.map((ex) => (
              <div key={ex.title} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-semibold">{ex.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{ex.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="my-12">
        <h2 className="text-2xl font-bold">How to use {tool.name}</h2>
        <ol className="mt-5 space-y-3">
          {howToList.map((step, i) => (
            <li key={i} className="flex gap-3 rounded-xl border border-border bg-card p-4">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-primary-foreground">{i + 1}</span>
              <p className="text-sm">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="my-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Layers className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" /> Who it is for
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whoForList.map((u) => (
            <div key={u.title} className="rounded-2xl border border-border bg-gradient-soft p-5">
              <h3 className="font-semibold">{u.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Lightbulb className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" /> Pro tips
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {proTipsList.map((t, i) => (
            <li key={i} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm">
              <Sparkles className="h-4 w-4 shrink-0 text-primary" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {mistakesList.length > 0 && (
        <section className="my-12">
          <h2 className="text-2xl font-bold">Common mistakes</h2>
          <ul className="mt-5 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
            {mistakesList.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="my-12 rounded-2xl border border-border bg-muted/30 p-6">
        <h2 className="text-lg font-bold">Privacy note</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{privacyText}</p>
        <h2 className="mt-6 text-lg font-bold">When not to use this tool</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{whenNotText}</p>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqsList.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {smartPack && (
        <section className="my-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Layers className="h-5 w-5 text-primary" aria-hidden="true" /> Need several assets at once?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try the{" "}
            <Link href={smartPack.href} className="font-medium text-primary hover:underline">
              {smartPack.label}
            </Link>{" "}
            to generate matching fields from one brief - then refine with {tool.name} if needed.
          </p>
          <Link
            href={smartPack.href}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Open Smart Pack
          </Link>
        </section>
      )}

      {related.length > 0 && (
      <section className="my-12">
        <h2 className="text-2xl font-bold">Related tools</h2>
        <p className="mt-1 text-sm text-muted-foreground">A few tools that naturally pair with {tool.name}.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>
      )}

      <section className="my-12 rounded-3xl border border-border bg-gradient-soft p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <BookOpen className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" /> Read next on the blog
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

      <CommentsSection contentType="tool" slug={tool.slug} />
    </>
  );
});
