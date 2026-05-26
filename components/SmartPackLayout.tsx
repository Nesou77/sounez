import { SmartLink as Link } from "@/components/smart-link";
import { ContentDates } from "@/components/ContentDates";
import type { SmartPack } from "@/lib/smart-packs-data";
import { ArrowRight, CheckCircle2, Layers, Wrench } from "lucide-react";

export function SmartPackLayout({ pack }: { pack: SmartPack }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link>
        {" / "}
        <Link href="/smart-packs" className="hover:text-foreground">Smart Packs</Link>
        {" / "}
        <span className="text-foreground">{pack.title}</span>
      </nav>

      <header>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
          <Layers className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> Smart Pack
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{pack.title}</h1>
        <p className="mt-2 text-lg font-medium text-foreground/90">{pack.tagline}</p>
        <ContentDates contentType="smart_pack" slug={pack.slug} className="mt-3 text-sm text-muted-foreground" />
        <p className="mt-6 leading-relaxed text-muted-foreground">{pack.summary}</p>
      </header>

      <section className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h2 className="text-lg font-bold">What you can generate</h2>
        <ul className="mt-4 space-y-2">
          {pack.generates.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Sounez gives you drafts and checklists — you choose what to publish. AI tools process your brief on our servers; see each tool page for details.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold">Who it helps</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {pack.whoFor.map((w) => (
            <div key={w.title} className="rounded-2xl border border-border bg-card p-4">
              <h3 className="text-sm font-semibold">{w.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold">Example workflow</h2>
        <ol className="mt-4 space-y-3">
          {pack.workflow.map((step, i) => (
            <li key={i} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold">Example output</h2>
        <div className="mt-4 space-y-4">
          {pack.exampleOutput.map((ex) => (
            <div key={ex.label} className="rounded-2xl border border-border bg-muted/30 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{ex.label}</div>
              <p className="mt-2 text-sm leading-relaxed">{ex.sample}</p>
            </div>
          ))}
        </div>
      </section>

      {pack.commonMistakes.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold">Common mistakes</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted-foreground">
            {pack.commonMistakes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>
      )}

      {pack.faqs.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold">Questions about this pack</h2>
          <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
            {pack.faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none font-semibold marker:hidden">{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Wrench className="h-5 w-5 text-primary" aria-hidden="true" /> Tools for this pack
        </h2>
        <ul className="mt-4 space-y-2">
          {pack.relatedTools.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="text-sm font-medium text-primary hover:underline">
                {t.label} →
              </Link>
            </li>
          ))}
        </ul>
        {pack.relatedPack && (
          <p className="mt-4 text-sm text-muted-foreground">
            Also see{" "}
            <Link href={pack.relatedPack.href} className="font-medium text-primary hover:underline">
              {pack.relatedPack.label}
            </Link>
            .
          </p>
        )}
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href={pack.relatedTools[0]?.href ?? "/tools"}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5"
        >
          Start with {pack.relatedTools[0]?.label ?? "tools"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href="/smart-packs"
          className="inline-flex items-center rounded-xl border border-border px-5 py-3 text-sm font-semibold hover:bg-muted"
        >
          All Smart Packs
        </Link>
      </div>
    </article>
  );
}
