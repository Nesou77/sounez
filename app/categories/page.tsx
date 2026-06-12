import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { CATEGORIES, toolsByCategory } from "@/data/tools";
import { ArrowRight } from "lucide-react";
import { getCategoryIcon } from "@/lib/tool-icons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Tool Categories | Sounez",
  description: "Browse Sounez tools by category: Creator Tools, Design Tools and Utility Tools.",
  alternates: { canonical: getSiteUrl() + "/categories" },
  openGraph: {
    title: "Tool Categories | Sounez",
    description: "Find the right tool for the job, organized by category.",
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
          Three broad groups of tools. For a finer breakdown (AI writing, image, PDF, SEO, etc.), see the{" "}
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
    </div>
  );
}
