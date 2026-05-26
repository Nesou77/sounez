import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { getSiteUrl } from "@/lib/site-url";
import { ContentDates } from "@/components/ContentDates";

const url = `${getSiteUrl()}/smart-packs/product-listing-pack`;

export const metadata: Metadata = {
  title: "Product Listing Pack | Sounez Smart Packs",
  description: "Plan product title, descriptions, SEO copy, alt text, marketplace copy, and social caption from one brief.",
  alternates: { canonical: url },
};

export default function ProductListingPackPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/smart-packs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
        ← All Smart Packs
      </Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">Product Listing Pack</h1>
      <ContentDates contentType="smart_pack" slug="product-listing-pack" className="mt-3 text-sm text-muted-foreground" />
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Structure ecommerce and marketplace copy from a single product brief. Combine generators and your own edits
        for listings that stay consistent across channels.
      </p>

      <section className="mt-10 space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-bold">What you get</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Product title (marketplace-friendly length)</li>
            <li>Short description for cards and ads</li>
            <li>Long SEO description with benefits and specs</li>
            <li>Image alt text for accessibility and search</li>
            <li>Marketplace bullet-style copy</li>
            <li>Social caption to promote the listing</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-bold">Suggested Sounez tools</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/tools/business-name-generator" className="text-primary hover:underline">Business Name Generator</Link></li>
            <li><Link href="/tools/image-describer" className="text-primary hover:underline">Image Describer</Link></li>
            <li><Link href="/tools/ai-caption-generator" className="text-primary hover:underline">AI Caption Generator</Link></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
