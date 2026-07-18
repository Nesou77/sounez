import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { Sparkles, Zap, Heart, Wand2, Rocket, Brush, Wrench, CheckCircle2, ArrowRight } from "lucide-react";
import { getSiteUrl } from "@/lib/site-url";
import { siteOpenGraphDefaults } from "@/lib/site-metadata-defaults";
import { TOOLS } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog";

const siteUrl = getSiteUrl();
const aboutUrl = `${siteUrl}/about`;

export const metadata: Metadata = {
  title: "About Sounez | Free Browser-Based Tools",
  description:
    "Sounez is a collection of free online tools for creators, designers, developers and students. No account needed, no installs.",
  alternates: { canonical: aboutUrl },
  openGraph: {
    title: "About Sounez",
    description:
      "Free online tools for creators, designers, developers and students. No account, no install.",
    url: aboutUrl,
    type: "website",
    ...siteOpenGraphDefaults(),
  },
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Sounez",
  url: aboutUrl,
  description:
    "Sounez is a collection of free browser-based tools built for creators, designers, developers and students. No account or installation needed.",
  publisher: {
    "@type": "Organization",
    name: "Sounez",
    url: siteUrl,
    email: "hello@sounez.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@sounez.com",
      url: `${siteUrl}/contact`,
    },
  },
};

const offers = [
  { Icon: Rocket, title: "For creators", text: "Hashtag generators, YouTube tag tools, captions, bios, and rough sponsorship calculators. Built for people who publish often and need clean drafts.", href: "/tools#creator-tools", cta: "Browse creator tools" },
  { Icon: Brush, title: "For designers", text: "Color palettes, CSS gradients, favicons, shadows, patterns, and font helpers. Open one, copy what you need, and keep working.", href: "/tools#design-tools", cta: "Browse design tools" },
  { Icon: Wrench, title: "For everyday tasks", text: "QR codes, password generators, word counters, image compressors, and other small jobs that should not need a full app.", href: "/tools#utility-tools", cta: "Browse utility tools" },
];

const values = [
  { Icon: Wand2, title: "Simplicity", text: "Each tool focuses on a clear task, with controls that match the job." },
  { Icon: Zap, title: "Speed", text: "Most tools open quickly and update as you work, especially browser-only utilities." },
  { Icon: Heart, title: "Free to use", text: "No account for most tools. Fair-use limits on AI and server features, stated upfront." },
  { Icon: Sparkles, title: "Honest", text: "Tool pages explain what the output is for, what to check, and when not to use it." },
];

const toolCount = TOOLS.length;
const guideCount = BLOG_POSTS.length;

const trust = [
  `${toolCount} free tools, with more added when they solve a real problem`,
  "Free to use with fair-use limits - no account required for most tools",
  "Many tools run in your browser; server-backed tools disclose processing clearly",
  "Built and maintained since 2024 by a solo developer",
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 left-1/2 -z-10 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="animate-fade-in inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium text-foreground/80 shadow-soft backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> How it started
          </span>
          <h1 className="animate-slide-up mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Tools that <span className="text-gradient-brand">just work</span>.
          </h1>
          <p className="animate-slide-up delay-75 mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Sounez is a small site of free tools and Smart Pack workflows - built for creators, shop owners, students, and developers who want clear results without another subscription.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="ring-gradient rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Why Sounez exists</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Save people time on small online tasks.</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            The best utility gets out of the way. You open it, finish the task, check the result,
            and move on. Sounez is built around that kind of plain, useful workflow.
          </p>
        </div>
      </section>

      {/* Who built this */}
      <section className="mx-auto max-w-4xl px-4 pt-16 sm:px-6">
        <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 shadow-soft sm:flex-row sm:items-start sm:p-10">
          <div
            aria-hidden
            className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-brand text-xl font-bold text-primary-foreground shadow-pop"
          >
            N
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">The person behind Sounez</span>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight">Hi, I&apos;m Nesou.</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              I built Sounez because I kept running into the same frustration: needing a simple tool
              and finding only bloated apps that wanted my email address, a subscription, or a
              download. So I started building the tools I actually wanted to use - and launched
              Sounez in 2024 to make them available to everyone.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              I&apos;m a developer and creator with a background in web tools, design utilities and
              content workflows. Today Sounez has {toolCount} free tools and {guideCount} practical guides. I ship
              new tools regularly and review messages that come through the{" "}
              <Link href="/contact" className="font-medium text-primary hover:underline">
                contact form
              </Link>{" "}
              or at{" "}
              <a
                href="mailto:hello@sounez.com"
                className="font-medium text-primary hover:underline"
              >
                hello@sounez.com
              </a>
              . If you spot an error, an outdated guide, or a broken tool, that same contact form
              is the fastest way to report it - see the{" "}
              <Link href="/editorial-policy" className="font-medium text-primary hover:underline">
                Editorial Policy
              </Link>{" "}
              for how content gets researched, reviewed, and corrected.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Sounez is operated by Nesou as an independent publisher. The site does not currently
              display advertising. Google AdSense or other advertising services may be added in the
              future to help cover hosting and development costs; see our{" "}
              <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              for how data and cookies are used.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                Read the guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                Say hello
              </Link>
              <a
                href="https://github.com/Nesou77"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">What we offer</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Something useful for every kind of maker</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {offers.map(({ Icon, title, text, href, cta }) => (
            <Link
              key={title}
              href={href}
              className="ring-gradient group flex flex-col rounded-2xl border border-border/70 bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-pop transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">What we believe</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">What goes into every tool</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-soft text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-brand p-8 text-primary-foreground shadow-pop sm:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider opacity-90">Why people use Sounez</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Built to be useful. Kept free on purpose.</h2>
              <p className="mt-3 text-sm leading-relaxed opacity-90">
                Sounez is built around clear tools, practical guidance, and honest privacy notes.
              </p>
            </div>
            <ul className="space-y-3">
              {trust.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tools" className="inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5">
              Explore the tools <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/10">
              Read the guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
