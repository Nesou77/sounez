import { CATEGORIES, toolsByCategory } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";
import { SmartLink as Link } from "@/components/smart-link";
import { getCategoryIcon } from "@/lib/tool-icons";

const INTROS: Record<string, string> = {
  "creator-tools": "Tools for YouTubers, TikTokers and Instagram creators who want to spend less time on the repetitive stuff. Generate tags, estimate earnings, find hashtags, write captions, create bios and generate business names. All free, all instant.",
  "design-tools": "Color palettes, CSS gradients, favicons, SVG blobs, font pairings, image placeholders, box shadows and background patterns — everything a designer or developer needs to ship faster. Copy-ready code, no installs.",
  "utility-tools": "Practical everyday tools that just get things done. QR codes, word counters, password generators, image compressors, calculators, resume builders, study notes and more. Free, fast and nothing gets uploaded.",
};

const FAQS: Record<string, { q: string; a: string }[]> = {
  "creator-tools": [
    { q: "Are these creator tools free?", a: "Yes. Every tool on Sounez is free with no account required and no watermarks." },
    { q: "Do they work on mobile?", a: "Yes. Sounez works on any phone or tablet, no app needed." },
  ],
  "design-tools": [
    { q: "Can I use the colors and gradients in commercial projects?", a: "Yes. Anything you generate is yours to use however you like." },
    { q: "Is my work saved anywhere?", a: "No. Nothing is stored. Copy or save what you need before you close the tab." },
  ],
  "utility-tools": [
    { q: "Are these tools safe to use?", a: "Yes. Tools like the password generator and image compressor run entirely in your browser. Nothing is uploaded to any server." },
    { q: "Is there a usage limit?", a: "No. Use them as much as you want." },
  ],
};

export function CategoryPage({ slug }: { slug: string }) {
  const cat = CATEGORIES.find((c) => c.slug === slug)!;
  const items = toolsByCategory(slug);
  const faqs = FAQS[slug] ?? [];
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
        <p className="mt-4 text-lg text-muted-foreground">{INTROS[slug]}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => <ToolCard key={t.slug} tool={t} />)}
      </div>

      <AdSlot className="my-12" />

      <section className="my-12">
        <h2 className="text-2xl font-bold">FAQ</h2>
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
