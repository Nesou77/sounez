import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { Sparkles, Zap, Heart, Wand2, Rocket, Brush, Wrench, CheckCircle2, ArrowRight } from "lucide-react";
import { getSiteUrl } from "@/lib/site-url";
import { TOOLS } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog";

const siteUrl = getSiteUrl();
const aboutUrl = `${siteUrl}/about`;

export const metadata: Metadata = {
  title: "About Sounez | Free Browser-Based Tools Built for Real Use",
  description:
    "Sounez is a collection of free online tools for creators, designers, developers and students. No account needed, no installs. Built by Nesou with privacy and simplicity in mind.",
  alternates: { canonical: aboutUrl },
  openGraph: {
    title: "About Sounez",
    description:
      "Free online tools for creators, designers, developers and students. No account, no install.",
    url: aboutUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sounez",
    description:
      "Free online tools for creators, designers, developers and students. No account, no install.",
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
  { Icon: Rocket, title: "For creators", text: "Hashtag generators, YouTube tag tools, earnings calculators. Built for people who publish content and want to spend less time on the boring parts.", href: "/categories/creator-tools", cta: "Explore creator tools" },
  { Icon: Brush, title: "For designers", text: "Color palettes, CSS gradients and visual helpers. Open one, get what you need, and get back to designing.", href: "/categories/design-tools", cta: "Explore design tools" },
  { Icon: Wrench, title: "For everyone", text: "QR codes, password generators, word counters, image compressors. The kind of tools you need once a week and always forget to bookmark.", href: "/categories/utility-tools", cta: "Explore utility tools" },
];

const values = [
  { Icon: Wand2, title: "Simplicity", text: "Each tool does one thing. No settings you'll never use, no menus to dig through." },
  { Icon: Zap, title: "Speed", text: "Tools open right away and update in real time. No loading screens, no waiting." },
  { Icon: Heart, title: "Free to use", text: "No account for most tools. Fair-use limits on AI and server features, stated upfront." },
  { Icon: Sparkles, title: "Honest", text: "We only build tools we'd actually use. If it's not useful, it doesn't ship." },
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
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Save people time with tools that feel effortless.</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            The best tool is the one you barely notice. You open it, do the thing, and move on. No account to create, no tutorial to watch, no upgrade prompt. That&apos;s what every tool on Sounez is built to be.
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
              new tools regularly and read every message that comes through the{" "}
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
              .
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Sounez is operated by Nesou as an independent publisher. Advertising on the site is
              served by Google AdSense; see our{" "}
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
                Read the blog <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                Say hello
              </Link>
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
                Every tool on Sounez is built to be fast, private and genuinely helpful. That won&apos;t change.
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
              Read the blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
