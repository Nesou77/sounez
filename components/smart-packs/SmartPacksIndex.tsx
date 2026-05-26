import { SmartLink as Link } from "@/components/smart-link";
import { SMART_PACKS } from "@/data/smartPacks";
import { SmartPackCard } from "./SmartPackCard";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { FEATURED_TOOLS } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";

const FAQS = [
  {
    q: "What is a Smart Pack?",
    a: "A Smart Pack turns one brief into several related assets — captions, listing copy, image SEO fields, or study notes — in a single structured result you can copy or download.",
  },
  {
    q: "Does Sounez post to social networks for me?",
    a: "No. You generate, edit, and publish through your own apps and schedulers.",
  },
  {
    q: "Is generation stored?",
    a: "Successful packs may be saved with a browser session identifier so you can reopen them on this device. See our Privacy Policy.",
  },
  {
    q: "Do I need an account?",
    a: "No account is required for normal use. Fair-use limits apply on AI generation.",
  },
];

export function SmartPacksIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        {" / "}
        <span className="text-foreground">Smart Packs</span>
      </nav>

      <header className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
          <Layers className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> Smart Packs
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Create complete content packs from one simple idea
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          Sounez Smart Packs combine writing, image, SEO, QR, and productivity tools into practical workflows
          for creators, students, and small businesses. Enter a brief, get structured drafts, then edit before
          you publish.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/smart-packs/social-media-pack"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-pop"
          >
            Start with Social Media Pack
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="#all-packs"
            className="inline-flex items-center rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-muted"
          >
            Browse all Smart Packs
          </Link>
        </div>
      </header>

      <section className="mt-16 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
        <h2 className="text-xl font-bold">What are Smart Packs?</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          A Smart Pack is one form and one structured result. Instead of opening five tools and copying bits
          into a doc, you describe your goal once and receive matching fields — caption and hashtags together,
          or product title and meta description together. AI processes your text on our servers; you stay
          responsible for accuracy and publishing.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" /> How it works
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { t: "Choose a pack", d: "Pick Social Media, Product Listing, SEO Image, Business Launch, or Student Study." },
            { t: "Enter your brief", d: "Audience, tone, language, and the facts that matter for that pack." },
            { t: "Copy and refine", d: "Export as text or JSON, then edit before anything goes live." },
          ].map((step, i) => (
            <li key={step.t} className="rounded-2xl border border-border bg-card p-5">
              <span className="text-sm font-bold text-primary">Step {i + 1}</span>
              <h3 className="mt-2 font-semibold">{step.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="all-packs" className="mt-16">
        <h2 className="text-2xl font-bold">Available Smart Packs</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SMART_PACKS.map((p) => (
            <SmartPackCard key={p.slug} pack={p} />
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h2 className="text-lg font-bold">Example workflow</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A cleaning company wants an Instagram post before Eid with 20% off. They open the{" "}
          <Link href="/smart-packs/social-media-pack" className="font-medium text-primary hover:underline">
            Social Media Pack
          </Link>
          , enter the brief, and receive a title, caption, first comment, hashtags, CTA, and image ideas. They
          fix the dates and link, then schedule in their app — Sounez never posts for them.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-bold">Why use a pack instead of separate tools?</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Individual Sounez tools are best when you need one job done fast. Packs help when several pieces must
          match — same offer in the caption and first comment, or the same keywords in alt text and the
          paragraph below the image. You can still open related tools afterward to tweak one field.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-bold">Related free tools</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_TOOLS.slice(0, 3).map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-bold">Common questions</h2>
        <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
          {FAQS.map((f) => (
            <details key={f.q} className="p-5">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-16 flex flex-wrap justify-center gap-3 text-center">
        <Link
          href="/smart-packs/social-media-pack"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Start with Social Media Pack
        </Link>
        <Link href="/smart-packs/history" className="inline-flex items-center rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-muted">
          Pack history
        </Link>
      </div>
    </div>
  );
}
