import { SmartLink as Link } from "@/components/smart-link";
import type { SmartPackDefinition } from "@/data/smartPacks";
import { SmartPackGenerator } from "./SmartPackGenerator";
import { SmartPackExample } from "./SmartPackExample";
import { SmartPackRelatedTools } from "./SmartPackRelatedTools";
import { Layers } from "lucide-react";

export function SmartPackPageContent({ pack }: { pack: SmartPackDefinition }) {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        {" / "}
        <Link href="/smart-packs" className="hover:text-foreground">
          Smart Packs
        </Link>
        {" / "}
        <span className="text-foreground">{pack.name}</span>
      </nav>

      <header className="max-w-3xl">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
          <Layers className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> Smart Pack
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{pack.name}</h1>
        <p className="mt-2 text-lg font-medium text-foreground/90">{pack.tagline}</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">{pack.longDescription}</p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="min-w-0 space-y-10">
          <div className="ad-free-zone">
            <SmartPackGenerator pack={pack} />
          </div>

          <section>
            <h2 className="text-lg font-bold">Who this pack helps</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {pack.targetUsers.map((u) => (
                <div key={u.title} className="rounded-2xl border border-border bg-card p-4">
                  <h3 className="text-sm font-semibold">{u.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{u.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold">What you get</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {pack.outputFields.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">-</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-muted/30 p-5">
            <h2 className="text-lg font-bold">How to write a useful brief</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pack.briefGuidance}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pack.safetyNote}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold">Use cases</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {pack.useCases.map((u) => (
                <li key={u} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {u}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold">Common mistakes</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
              {pack.commonMistakes.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold">Before you copy the result</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
              {pack.reviewChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-muted/20 p-5">
            <h2 className="text-lg font-bold">Privacy and responsible use</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Smart Packs process the brief you submit on Sounez servers and return a structured draft.
              Your brief is not stored after the response is returned. You are responsible for verifying
              the final output before you publish, submit, or send it. See our{" "}
              <Link href="/terms-of-service" className="font-medium text-primary hover:underline">
                Terms of Service
              </Link>
              ,{" "}
              <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
                Privacy Policy
              </Link>
              , and{" "}
              <Link href="/faq" className="font-medium text-primary hover:underline">
                FAQ
              </Link>{" "}
              for full rules.
            </p>
            {pack.studyDisclaimer ? (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pack.studyDisclaimer}</p>
            ) : null}
          </section>

          <section>
            <h2 className="text-lg font-bold">Questions</h2>
            <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
              {pack.faqs.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="cursor-pointer list-none font-semibold marker:hidden">{f.q}</summary>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24">
          <SmartPackExample pack={pack} />
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-bold">Workflow</h2>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              {pack.workflow.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-semibold text-foreground">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
          <SmartPackRelatedTools tools={pack.relatedTools} />
          {pack.relatedPack && (
            <p className="text-sm text-muted-foreground">
              Also see{" "}
              <Link href={pack.relatedPack.href} className="font-medium text-primary hover:underline">
                {pack.relatedPack.label}
              </Link>
            </p>
          )}
        </aside>
      </div>
    </article>
  );
}
