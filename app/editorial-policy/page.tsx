import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { getSiteUrl } from "@/lib/site-url";
import { siteOpenGraphDefaults } from "@/lib/site-metadata-defaults";

const siteUrl = getSiteUrl();
const pageUrl = `${siteUrl}/editorial-policy`;

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How Sounez creates, reviews, and maintains its guides and tool documentation. Covers authorship, AI use, advertising disclosure, and corrections.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Editorial Policy | Sounez",
    description:
      "How Sounez creates, reviews, and maintains its guides and tool documentation.",
    url: pageUrl,
    type: "website",
    ...siteOpenGraphDefaults(),
  },
};

const LAST_UPDATED = "June 27, 2026";

export default function EditorialPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link>
        {" / "}
        <span className="text-foreground">Editorial Policy</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Editorial Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          This page explains how Sounez creates, maintains, and updates its content — including
          blog guides, tool documentation, FAQs, and category pages. It also explains how
          advertising and AI assistance are disclosed.
        </p>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10 text-[0.9375rem] leading-relaxed text-foreground">

        <section>
          <h2 className="text-xl font-bold">Who creates Sounez content</h2>
          <p className="mt-3 text-muted-foreground">
            All content on Sounez — guides, tool descriptions, FAQs, category pages, and blog posts —
            is written and edited by Nesou, the founder and sole developer of Sounez.{" "}
            <a
              href="https://github.com/Nesou77"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Nesou&apos;s GitHub profile
            </a>{" "}
            provides external verification of the technical background behind the tooling and design
            decisions documented in the guides.
          </p>
          <p className="mt-3 text-muted-foreground">
            Content reflects direct experience building and using the tools on the site. When a
            guide describes how a tool works, it is written by the person who built and maintains it.
            When a guide includes recommendations (such as which image compression format to use, or
            how to structure hashtags), those recommendations are based on testing, not sourced
            from sponsors or advertisers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">How content is written</h2>
          <p className="mt-3 text-muted-foreground">
            Guides are researched and drafted with the goal of practical utility: helping readers
            complete a specific task rather than filling a page. The standard for every piece is
            whether a reader who arrived with a specific problem leaves with a workable answer.
          </p>
          <p className="mt-3 text-muted-foreground">
            Where external data or platform guidance is cited (for example, Instagram&apos;s own
            ranking documentation or the American Psychological Association&apos;s learning principles),
            links to the primary source are included. Where specific numbers are provided (such as
            typical image compression settings or recommended caption lengths), those are based on
            testing and experience, not fabricated or AI-generated claims.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">AI assistance disclosure</h2>
          <p className="mt-3 text-muted-foreground">
            Sounez tools that generate AI output (such as the AI Caption Generator, Bio Generator,
            Study Notes Generator, Business Name Generator, Website Idea Generator, and Image
            Describer) are clearly labeled as AI-powered on each tool page. Those tools produce
            drafts that users are responsible for reviewing, editing, and verifying before use.
          </p>
          <p className="mt-3 text-muted-foreground">
            AI tools may assist in drafting, editing, or structuring written content on the site.
            Every piece of content on Sounez is reviewed, edited, and approved by Nesou before
            publication. AI assistance does not replace editorial judgment: all factual claims,
            tool recommendations, and product comparisons reflect Nesou&apos;s own research and testing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Advertising and commercial relationships</h2>
          <p className="mt-3 text-muted-foreground">
            Sounez does not currently display advertising. We may use Google AdSense or other
            advertising services in the future to help support the cost of running the site. If and
            when ads are enabled, they will be served automatically based on content and user
            signals, and kept visually distinct from editorial content. Advertisers do not and will
            not influence editorial decisions, tool recommendations, or guide content.
          </p>
          <p className="mt-3 text-muted-foreground">
            Sounez does not accept sponsored content, paid reviews, or affiliate commissions for
            tool recommendations. When a guide compares Sounez tools to third-party alternatives
            (such as Squoosh, TinyPNG, Coolors, or TubeBuddy), those comparisons reflect honest
            editorial assessment. We name third-party tools when they serve a use case better,
            because accurate guidance is more valuable than self-promotion.
          </p>
          <p className="mt-3 text-muted-foreground">
            If Sounez ever introduces affiliate relationships or sponsored content, this policy
            will be updated and individual posts will be clearly labeled.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Accuracy and corrections</h2>
          <p className="mt-3 text-muted-foreground">
            Guides are reviewed when tools or the platforms they cover change. Blog posts are
            updated when recommendations become outdated (for example, when platform algorithms
            change or tool features are added). The publication date and most-recent update date
            are shown at the top of each blog post.
          </p>
          <p className="mt-3 text-muted-foreground">
            If you find an error, outdated information, or a factual claim that cannot be verified,
            use the{" "}
            <Link href="/contact" className="font-medium text-primary hover:underline">
              contact form
            </Link>{" "}
            or email{" "}
            <a
              href="mailto:hello@sounez.com"
              className="font-medium text-primary hover:underline"
            >
              hello@sounez.com
            </a>
            . Corrections are made promptly when verified.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Content scope and limitations</h2>
          <p className="mt-3 text-muted-foreground">
            Sounez guides cover practical browser-based tasks: image editing, CSS design, social
            media publishing, content creation, file conversion, and productivity. Content is not
            financial, legal, medical, or professional advice. Where AI-generated output touches
            business, legal, or personal decisions, guides explicitly note that users should verify
            independently before acting.
          </p>
          <p className="mt-3 text-muted-foreground">
            Tool outputs — generated text, CSS code, compressed images, QR codes, color palettes —
            are drafts. Sounez does not warrant the accuracy or fitness of AI-generated output for
            any specific purpose. Users are responsible for reviewing and verifying all outputs
            before publication, submission, or commercial use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">DMCA and copyright</h2>
          <p className="mt-3 text-muted-foreground">
            All original content on Sounez is the intellectual property of Nesou. For copyright
            concerns, visit the{" "}
            <Link href="/dmca" className="font-medium text-primary hover:underline">
              DMCA / Copyright page
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Contact</h2>
          <p className="mt-3 text-muted-foreground">
            Questions about this editorial policy, corrections, or press inquiries:{" "}
            <a
              href="mailto:hello@sounez.com"
              className="font-medium text-primary hover:underline"
            >
              hello@sounez.com
            </a>
            {" "}or the{" "}
            <Link href="/contact" className="font-medium text-primary hover:underline">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
