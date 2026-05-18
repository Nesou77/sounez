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
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Tool Categories</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Not sure which tool you need? Browse by category and find the right one for the job.
        </p>
      </header>

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
