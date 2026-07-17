import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { CATEGORIES, toolsByCategory } from "@/data/tools";
import { ArrowRight } from "lucide-react";
import { getCategoryIcon } from "@/lib/tool-icons";
import { getSiteUrl } from "@/lib/site-url";
import { siteOpenGraphDefaults } from "@/lib/site-metadata-defaults";

const categoriesUrl = `${getSiteUrl()}/categories`;

export const metadata: Metadata = {
  title: "Tool Categories",
  description: "Browse Sounez tools by category: Creator Tools, Design Tools and Utility Tools.",
  alternates: { canonical: categoriesUrl },
  openGraph: {
    title: "Tool Categories | Sounez",
    description: "Find the right tool for the job, organized by category.",
    url: categoriesUrl,
    type: "website",
    ...siteOpenGraphDefaults(),
  },
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link>
        {" / "}
        <span className="text-foreground">Categories</span>
      </nav>
      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-bold sm:text-5xl">Categories</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Three broad groups of tools. For a finer breakdown (AI writing, image, design, SEO, etc.), see the{" "}
          <Link href="/tools" className="font-medium text-primary hover:underline">tools directory</Link> or{" "}
          <Link href="/smart-packs" className="font-medium text-primary hover:underline">Smart Packs</Link>.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Every category page lists the tools in that group plus practical tips and FAQs that apply to the whole set.
          Open a tool card when you know the job; open a category when you are exploring what Sounez can do in that area.
        </p>
      </header>

      <section className="mb-10 grid gap-4 rounded-2xl border border-border bg-muted/30 p-5 md:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold">Creator Tools</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Use these when the work is public-facing text: captions, bios, hashtags, video tags, business names,
            or rough creator-rate planning.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Design Tools</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Use these when you need a visual asset or CSS detail, such as palettes, gradients, favicons, shadows,
            patterns, fonts, or placeholders.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Utility Tools</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Use these for practical one-off jobs: compressing images, converting files, counting words, generating
            passwords, making QR codes, or checking quick math.
          </p>
        </div>
      </section>

      <section className="mb-10 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">How these categories add value</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Categories are not just navigation shortcuts. They group tools by the kind of decision a visitor
              needs to make: publishing text, preparing design assets, or completing a practical file or utility
              task. Each category page adds use cases, privacy expectations, tips, and questions that apply to
              the full group.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold">Find the right page</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Start with a category when you know the problem but not the exact tool name.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Understand limits</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Read group notes before uploading files, using AI, or relying on generated output.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Keep moving</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Related tools and guides help turn one result into a finished workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-6">
        {CATEGORIES.map((c) => {
          const items = toolsByCategory(c.slug);
          const Icon = getCategoryIcon(c.slug);
          return (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="group block rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-pop sm:p-8">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-pop">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{c.name}</h2>
                  <p className="mt-1 text-muted-foreground">{c.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {items.map((t) => (
                      <span key={t.slug} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/80">{t.name}</span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-primary transition group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      <section className="mt-14 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
        <h2 className="text-xl font-bold">What to expect on each category page</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Every category page adds context that does not fit on individual tool pages — things that apply
          to the whole group rather than a single job. Here is what each one includes:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold">Extended intro</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              A paragraph that explains how the category&apos;s tools are grouped, which run in the browser,
              and which use a server — so you know before you open anything.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Common situations</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Three real scenarios where visitors reach for the category, written as starting points
              rather than feature lists.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Practical tips</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Specific advice that applies across the group — format quirks, accuracy limits, upload
              rules — that would be repetitive to include on every individual tool page.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Content policy</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              A plain-language summary of what inputs are not allowed and what you are responsible for
              verifying before using generated output.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Questions about categories</h2>
        <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
          {[
            {
              q: "Why are there only three categories?",
              a: "Three categories keep navigation simple for first-time visitors. Creator Tools covers publishing text and numbers, Design Tools covers visual assets and CSS, and Utility Tools covers file conversion, analysis, and everyday utilities. If you already know the tool name, the tools directory has a finer breakdown with search and filtering.",
            },
            {
              q: "Do all tools in a category behave the same way?",
              a: "No. Within each category, some tools run entirely in your browser (no data leaves your device) while others use a server-side step for AI generation or file conversion. Each tool page and category page states clearly which applies.",
            },
            {
              q: "Can I browse by task instead of category?",
              a: "Yes. The tools directory lists every tool with its description. Smart Packs group related tools by workflow — for example, a full social media pack or a study-session pack — rather than by technical category.",
            },
            {
              q: "Where can I report a problem with a tool in a category?",
              a: "Use the flag icon on a comment, the contact page for general feedback, or the DMCA page for copyright concerns. Each category page also has a comment section on individual tool pages for tool-specific questions.",
            },
            {
              q: "How do I know whether a tool runs locally or on a server?",
              a: "Open the tool page and read the privacy note near the top of the content section. Browser-only tools never upload your files; server-backed tools explain what is processed and for how long.",
            },
          ].map((faq) => (
            <details key={faq.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                {faq.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h2 className="font-bold">Looking for a multi-step workflow?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Smart Packs take one brief and return several related outputs — captions, listing copy, study
          notes, or image SEO fields — step by step. They save time when several pieces of a job must
          match each other.{" "}
          <Link href="/smart-packs" className="font-medium text-primary hover:underline">
            Browse Smart Packs
          </Link>
        </p>
      </section>
    </div>
  );
}
