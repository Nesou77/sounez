import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { getSiteUrl } from "@/lib/site-url";
import { ArrowRight, Layers } from "lucide-react";

const url = `${getSiteUrl()}/smart-packs`;

export const metadata: Metadata = {
  title: "Smart Packs | Sounez",
  description:
    "Generate structured content packs from a single brief — social captions, product listings, and SEO image assets.",
  alternates: { canonical: url },
};

const PACKS = [
  {
    slug: "social-media-pack",
    title: "Social Media Pack",
    desc: "Caption, hashtags, first comment, visual text, CTA, and platform variations from one brief.",
  },
  {
    slug: "product-listing-pack",
    title: "Product Listing Pack",
    desc: "Product title, short description, SEO copy, image alt text, marketplace copy, and social caption.",
  },
  {
    slug: "seo-image-pack",
    title: "SEO Image Pack",
    desc: "Filename suggestion, alt text, compression guidance, image description, and keyword ideas.",
  },
];

export default function SmartPacksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
          <Layers className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> Smart Packs
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          One idea → multiple ready-to-use assets
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Smart Packs help you plan structured content from a single brief. They combine Sounez tools and
          checklists — generate a structured content pack, then refine each part before publishing.
        </p>
      </header>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PACKS.map((p) => (
          <Link
            key={p.slug}
            href={`/smart-packs/${p.slug}`}
            className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
          >
            <h2 className="text-lg font-bold">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Open pack <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
