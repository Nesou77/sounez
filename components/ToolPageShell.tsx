"use client";

import { memo, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { type Tool } from "@/data/tools";
import { SmartLink as Link } from "@/components/smart-link";
import { getToolIcon } from "@/lib/tool-icons";
import { AlertTriangle } from "lucide-react";
import { getToolDisclaimer } from "@/lib/tool-disclaimers";
import { getToolEditorial } from "@/lib/tool-editorial";
import { ToolPageSections } from "./ToolPageSections";
import { useToolDates } from "./ToolDatesProvider";

const EngagementBar = dynamic(
  () => import("./EngagementBar").then((m) => m.EngagementBar),
  { ssr: false, loading: () => <div className="h-10" aria-hidden="true" /> },
);

type FAQ = { q: string; a: string };

export const ToolPageShell = memo(function ToolPageShell({
  tool,
  children,
  intro,
  features,
  howTo,
  faqs,
  whoFor,
  useCases,
  proTips,
  examples,
  mistakes,
  privacyNote,
  whenNotToUse,
  whatItDoes,
}: {
  tool: Tool;
  children: ReactNode;
  intro?: string;
  features?: { title: string; desc: string }[];
  howTo?: string[];
  faqs?: FAQ[];
  whoFor?: { title: string; desc: string }[];
  /** @deprecated Editorial content comes from lib/tool-editorial.ts */
  useCases?: { title: string; desc: string }[];
  proTips?: string[];
  examples?: { title: string; desc: string }[];
  mistakes?: string[];
  privacyNote?: string;
  whenNotToUse?: string;
  whatItDoes?: string;
}) {
  void intro;
  void features;
  void howTo;
  void faqs;
  void whoFor;
  void useCases;
  void proTips;
  void examples;
  void mistakes;
  void privacyNote;
  void whenNotToUse;
  void whatItDoes;

  const ed = getToolEditorial(tool.slug);
  const introText = ed.intro;
  const disclaimer = getToolDisclaimer(tool.slug);
  const Icon = getToolIcon(tool.slug);
  const dates = useToolDates();

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link> /{" "}
        <Link href={`/categories/${tool.category}`} className="hover:text-foreground capitalize">{tool.category.replace("-", " ")}</Link> /{" "}
        <span className="text-foreground">{tool.name}</span>
      </nav>

      <header className="mb-8 text-center">
        <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-pop" aria-hidden="true">
          <Icon className="h-6 w-6" strokeWidth={2} />
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">{tool.name}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{introText}</p>
        {dates && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            <time dateTime={dates.createdIso}>Published {dates.createdDisplay}</time>
            {dates.updatedDisplay && (
              <>
                {" "}
                -{" "}
                <time dateTime={dates.updatedIso}>Updated {dates.updatedDisplay}</time>
              </>
            )}
          </p>
        )}
        {disclaimer && (
          <p className="mx-auto mt-4 flex max-w-2xl items-start justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-left text-sm text-foreground/90">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
            {disclaimer}
          </p>
        )}
        <div className="mt-5 flex justify-center">
          <EngagementBar slug={`tool:${tool.slug}`} title={tool.name} />
        </div>
      </header>

      <section className="ad-free-zone rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        {children}
      </section>

      <ToolPageSections tool={tool} />
    </article>
  );
});
