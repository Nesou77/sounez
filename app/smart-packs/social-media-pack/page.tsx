import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { getSiteUrl } from "@/lib/site-url";
import { ContentDates } from "@/components/ContentDates";

const url = `${getSiteUrl()}/smart-packs/social-media-pack`;

export const metadata: Metadata = {
  title: "Social Media Pack | Sounez Smart Packs",
  description: "Plan caption, hashtags, first comment, visual text, CTA, and platform variations from one brief.",
  alternates: { canonical: url },
};

export default function SocialMediaPackPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/smart-packs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
        ← All Smart Packs
      </Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">Social Media Pack</h1>
      <ContentDates contentType="smart_pack" slug="social-media-pack" className="mt-3 text-sm text-muted-foreground" />
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Turn one brief into a structured set of social assets. This pack is a workflow guide — use Sounez tools
        below to generate each piece, then edit before posting.
      </p>

      <section className="mt-10 space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-bold">What you get</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Primary caption (Instagram / TikTok / LinkedIn tone)</li>
            <li>Hashtag set sized for your platform</li>
            <li>First comment (pin-worthy CTA or extra link)</li>
            <li>On-image text suggestion (headline + subline)</li>
            <li>CTA line for bio link or story sticker</li>
            <li>Platform variations (short vs long copy)</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-bold">Suggested Sounez tools</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/tools/ai-caption-generator" className="text-primary hover:underline">AI Caption Generator</Link></li>
            <li><Link href="/tools/hashtag-generator" className="text-primary hover:underline">Hashtag Generator</Link></li>
            <li><Link href="/tools/bio-generator" className="text-primary hover:underline">Bio Generator</Link></li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground">
          Generated content should be reviewed before publishing. AI tools send your brief to our servers for processing.
        </p>
      </section>
    </div>
  );
}
