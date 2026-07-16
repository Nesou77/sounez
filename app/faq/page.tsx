import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { getSiteUrl } from "@/lib/site-url";
import { CATEGORIES, FEATURED_TOOLS } from "@/data/tools";
import { SMART_PACKS } from "@/data/smartPacks";
import { ArrowRight, HelpCircle } from "lucide-react";

const pageUrl = `${getSiteUrl()}/faq`;

export const metadata: Metadata = {
  title: "Sounez FAQ | Tools, Smart Packs, Privacy and Responsible Use",
  description:
    "Answers about Sounez tools, Smart Packs, privacy, cookies, generated content, and responsible use.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Sounez FAQ",
    description:
      "Answers about Sounez tools, Smart Packs, privacy, cookies, generated content, and responsible use.",
    url: pageUrl,
    type: "website",
  },
};

const faqGroups = [
  {
    title: "Using Sounez tools",
    items: [
      {
        q: "What is Sounez?",
        a: "Sounez is a collection of free browser-based tools, AI-assisted Smart Packs, and practical guides for creators, students, designers, developers, and small businesses. The site focuses on small but common tasks such as compressing images, writing captions, generating QR codes, converting files, drafting bios, choosing colors, and preparing publishing assets.",
      },
      {
        q: "Do I need an account?",
        a: "No account is required for normal use. Most tools can be opened, used, and closed in one visit. Some server-backed features may use fair-use limits to keep the service available for everyone.",
      },
      {
        q: "Are the tools free?",
        a: "Yes. Sounez is free for normal personal, educational, and commercial use. Advertising may support the site, but tool pages are designed so the actual publisher content and working controls remain the focus.",
      },
      {
        q: "Which tools run in my browser?",
        a: "Many utility and design tools process data locally in the browser, including image compression, PNG to JPG conversion, QR code generation, word counting, password generation, color palettes, gradients, shadows, patterns, favicons, and placeholders. Each tool page includes a privacy note so you can check before using private files.",
      },
    ],
  },
  {
    title: "Smart Packs and AI output",
    items: [
      {
        q: "What is a Smart Pack?",
        a: "A Smart Pack turns one clear brief into several related drafts. For example, a social media pack can create a caption, first comment, hashtags, alt text, and posting notes from one idea. A product listing pack can create titles, bullets, descriptions, and meta copy from product facts.",
      },
      {
        q: "Does Sounez publish anything for me?",
        a: "No. Sounez never posts to social media, shops, schools, client accounts, or websites for you. You copy, edit, and publish through your own platform only after reviewing the result.",
      },
      {
        q: "Can I use AI-generated content as-is?",
        a: "Treat AI output as a draft. Check names, dates, links, prices, claims, image details, platform rules, and tone before publishing. Rewrite anything that sounds generic, exaggerated, inaccurate, or unlike your own voice.",
      },
      {
        q: "What should I avoid entering into AI tools?",
        a: "Do not enter passwords, ID documents, private customer records, confidential client files, unreleased business plans, health records, financial records, or content you do not have permission to process.",
      },
    ],
  },
  {
    title: "Privacy, cookies and ads",
    items: [
      {
        q: "How does Sounez handle files and input?",
        a: "Browser-only tools keep your files or text in your tab. AI-backed tools may send content to a server or provider to complete the request. Tool pages and the Privacy Policy explain which applies.",
      },
      {
        q: "Does Sounez use cookies?",
        a: "Yes, but optional cookies depend on your consent. Essential storage remembers your cookie choice and some local preferences. Analytics and advertising cookies are described in the Cookie Policy and Privacy Policy.",
      },
      {
        q: "Why are there ads?",
        a: "Ads help keep the tools free. Ads should not hide content, imitate buttons, or force accidental clicks. Sounez separates tool controls and publisher content from advertising-supported areas.",
      },
      {
        q: "Where can I change cookie settings?",
        a: "Use the Cookie settings link in the footer. You can also clear site data in your browser if you want to reset local preferences, saved helpful votes, or Smart Pack session data.",
      },
    ],
  },
  {
    title: "Responsible use",
    items: [
      {
        q: "Why do tool pages include guides and examples?",
        a: "Each tool page explains what the tool does, who it helps, how to use it, common mistakes, privacy limits, and related next steps. That context helps you decide whether the tool fits your task before you upload a file or paste sensitive text.",
      },
      {
        q: "Can I upload copyrighted files?",
        a: "Only upload, convert, compress, or describe files you created, own, licensed, or have permission to process. Use the DMCA page for copyright reports.",
      },
      {
        q: "Are calculators and estimates guaranteed?",
        a: "No. Calculators and sponsorship estimates are planning aids, not professional, legal, financial, tax, or contractual advice. Use real quotes and professional review for important decisions.",
      },
      {
        q: "How can I report a content problem?",
        a: "Use the contact page for corrections, outdated guidance, broken links, confusing wording, tool bugs, or suggestions. Include the URL and a short explanation of what should change.",
      },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  ),
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link>
        {" / "}
        <span className="text-foreground">FAQ</span>
      </nav>

      <header className="max-w-3xl">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-pop">
          <HelpCircle className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Sounez FAQ</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Answers about how Sounez tools work, how Smart Packs use AI, what happens to your inputs,
          how ads and cookies support the site, and how to use generated output responsibly.
        </p>
      </header>

      <section className="mt-10 grid gap-4 rounded-3xl border border-border bg-muted/30 p-6 md:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold">Start with a task</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Use the tools directory when you know the job, such as compressing an image or creating a QR code.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Use packs for workflows</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Smart Packs are better when several fields need to match, such as captions, hashtags, and alt text.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Read policies for sensitive work</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Privacy, cookie, terms, and copyright pages explain storage, ads, rights, and responsible use.
          </p>
        </div>
      </section>

      <div className="mt-12 space-y-10">
        {faqGroups.map((group) => (
          <section key={group.title}>
            <h2 className="text-2xl font-bold tracking-tight">{group.title}</h2>
            <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
              {group.items.map((item) => (
                <details key={item.q} className="group p-5">
                  <summary className="cursor-pointer list-none font-semibold marker:hidden">
                    {item.q}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight">Helpful next pages</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Link href="/tools" className="rounded-2xl border border-border bg-muted/30 p-5 transition hover:-translate-y-0.5 hover:border-primary/40">
            <h3 className="font-semibold">Browse all tools</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Search by task or category and open a tool page with examples, limits, and FAQs.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Open tools <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
          <Link href="/smart-packs" className="rounded-2xl border border-border bg-muted/30 p-5 transition hover:-translate-y-0.5 hover:border-primary/40">
            <h3 className="font-semibold">Try Smart Packs</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Generate structured drafts for social posts, listings, image SEO, launch copy, or study notes.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Open packs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
          <Link href="/contact" className="rounded-2xl border border-border bg-muted/30 p-5 transition hover:-translate-y-0.5 hover:border-primary/40">
            <h3 className="font-semibold">Contact Sounez</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Send bug reports, corrections, tool ideas, or privacy and policy questions.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Contact us <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Popular tools and packs</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          These are common starting points for visitors who want to test the site quickly.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {FEATURED_TOOLS.slice(0, 6).map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-primary">
              {tool.name}
            </Link>
          ))}
          {SMART_PACKS.slice(0, 3).map((pack) => (
            <Link key={pack.slug} href={`/smart-packs/${pack.slug}`} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-primary">
              {pack.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Browse by category</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40">
              <h3 className="font-semibold">{category.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
