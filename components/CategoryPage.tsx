import { CATEGORIES, toolsByCategory } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { SmartLink as Link } from "@/components/smart-link";
import { getCategoryIcon } from "@/lib/tool-icons";
import { getCategoryEditorial } from "@/lib/category-content";

export function CategoryPage({ slug }: { slug: string }) {
  const cat = CATEGORIES.find((c) => c.slug === slug)!;
  const items = toolsByCategory(slug);
  const editorial = getCategoryEditorial(slug);
  const faqs = editorial?.faqs ?? [];
  const others = CATEGORIES.filter((c) => c.slug !== slug);
  const CatIcon = getCategoryIcon(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link> /{" "}
        <Link href="/categories" className="hover:text-foreground">Categories</Link> /{" "}
        <span className="text-foreground">{cat.name}</span>
      </nav>

      <header className="mb-8 max-w-3xl">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-pop">
          <CatIcon className="h-6 w-6" strokeWidth={2} />
        </div>
        <h1 className="text-4xl font-bold sm:text-5xl">{cat.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{cat.description}</p>
        {editorial && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{editorial.extendedIntro}</p>
        )}
      </header>

      {editorial && editorial.useCases.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold">Common situations</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {editorial.useCases.map((u) => (
              <div key={u.title} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-semibold">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => <ToolCard key={t.slug} tool={t} />)}
      </div>

      {editorial && editorial.tips.length > 0 && (
        <section className="my-10">
          <h2 className="text-xl font-bold">Practical tips</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted-foreground">
            {editorial.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="my-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h2 className="font-bold">Need several assets from one idea?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Smart Packs walk you through captions, listings, or image SEO step by step. You run each Sounez tool yourself and edit before publishing.{" "}
          <Link href="/smart-packs" className="font-medium text-primary hover:underline">
            Browse Smart Packs →
          </Link>
        </p>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold">Questions about {cat.name.toLowerCase()}</h2>
        <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold">More categories</h2>        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {others.map((c) => {
            const OtherIcon = getCategoryIcon(c.slug);
            return (
              <Link key={c.slug} href={`/categories/${c.slug}`} className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-pop">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-soft text-primary ring-1 ring-primary/10">
                  <OtherIcon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="mt-3 font-semibold">{c.name}</div>
                <p className="text-sm text-muted-foreground">{c.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
