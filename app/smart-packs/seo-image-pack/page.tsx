import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { getSiteUrl } from "@/lib/site-url";
import { ContentDates } from "@/components/ContentDates";

const url = `${getSiteUrl()}/smart-packs/seo-image-pack`;

export const metadata: Metadata = {
  title: "SEO Image Pack | Sounez Smart Packs",
  description: "Plan filename, alt text, compression, image description, and SEO keywords for each visual asset.",
  alternates: { canonical: url },
};

export default function SeoImagePackPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/smart-packs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
        ← All Smart Packs
      </Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">SEO Image Pack</h1>
      <ContentDates contentType="smart_pack" slug="seo-image-pack" className="mt-3 text-sm text-muted-foreground" />
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Prepare images for the web with a repeatable SEO workflow: name files clearly, compress responsibly, and write
        alt text that helps both users and search engines.
      </p>

      <section className="mt-10 space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-bold">What you get</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>SEO-friendly filename suggestion</li>
            <li>Alt text draft (accessibility-first)</li>
            <li>Compression guidance and target file size</li>
            <li>Plain-language image description</li>
            <li>Keyword ideas related to the image topic</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-bold">Suggested Sounez tools</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/tools/image-compressor" className="text-primary hover:underline">Image Compressor</Link></li>
            <li><Link href="/tools/image-describer" className="text-primary hover:underline">Image Describer</Link></li>
            <li><Link href="/tools/png-to-jpg-converter" className="text-primary hover:underline">PNG to JPG Converter</Link></li>
          </ul>
        </div>
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Only upload images you own or have the right to use.
        </p>
      </section>
    </div>
  );
}
