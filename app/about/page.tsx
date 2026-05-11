import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { Sparkles, Zap, Heart, Wand2, Rocket, Brush, Wrench, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Sounez — Free Online Tools for Everyone",
  description:
    "Sounez is a growing collection of free online tools for creators, designers, students and productivity lovers. Built by Nesou — simple, fast and built to help.",
  openGraph: {
    title: "About Sounez",
    description: "Why we built Sounez and what we believe in.",
  },
};

const offers = [
  { Icon: Rocket, title: "For creators", text: "Hashtags, video tags, earnings calculators and more — built to save hours every week.", href: "/categories/creator-tools", cta: "Explore creator tools" },
  { Icon: Brush, title: "For designers", text: "Color palettes, gradients and visual helpers that turn ideas into pixels in seconds.", href: "/categories/design-tools", cta: "Explore design tools" },
  { Icon: Wrench, title: "For everyone", text: "Everyday utilities like QR codes, password generators and word counters — just one click away.", href: "/categories/utility-tools", cta: "Explore utility tools" },
];

const values = [
  { Icon: Wand2, title: "Simplicity", text: "One job, done well. No clutter, no popups, no nonsense." },
  { Icon: Zap, title: "Speed", text: "Tools open instantly and respond in real time, right in your browser." },
  { Icon: Heart, title: "Accessibility", text: "Everything is free. No signup, no paywalls, no limits." },
  { Icon: Sparkles, title: "Usefulness", text: "We only ship tools we'd actually use ourselves." },
];

const trust = [
  "100% free, forever",
  "No signup required",
  "Runs in your browser — privacy first",
  "New tools shipped regularly",
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 left-1/2 -z-10 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="animate-fade-in inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium text-foreground/80 shadow-soft backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Our story
          </span>
          <h1 className="animate-slide-up mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Tools that <span className="text-gradient-brand">just work</span>.
          </h1>
          <p className="animate-slide-up delay-75 mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Sounez is a growing collection of free online tools designed to make everyday tasks faster and friendlier — for creators, designers, students and anyone who values their time.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="ring-gradient rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Our mission</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Save people time with tools that feel effortless.</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We believe great tools should be invisible. Open, click, done. No accounts, no friction, no ads in your face. Sounez exists to take the small annoying tasks off your plate so you can focus on the work that actually matters.
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
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">The person behind Sounez</span>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight">Hi, I&apos;m Nesou.</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              I built Sounez because I kept running into the same problem: needing a simple tool,
              finding only bloated apps that required sign-ups, subscriptions or installs. So I
              started building the tools I actually wanted to use — fast, focused, free, and
              browser-based.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              I&apos;m a creator and developer who cares about practical tools that respect your time.
              Sounez is an actively maintained project — I ship new tools regularly and genuinely
              read every message sent through the{" "}
              <Link href="/contact" className="font-medium text-primary hover:underline">
                contact form
              </Link>
              .
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                Read the blog <ArrowRight className="h-4 w-4" />
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
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">What we offer</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">A toolkit for every kind of maker</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {offers.map(({ Icon, title, text, href, cta }) => (
            <Link
              key={title}
              href={href}
              className="ring-gradient group flex flex-col rounded-2xl border border-border/70 bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-pop transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">What we believe</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">The values behind every tool</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-soft text-primary">
                <Icon className="h-5 w-5" />
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
              <span className="text-xs font-semibold uppercase tracking-wider opacity-90">Why people trust Sounez</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Built with care, shipped with love.</h2>
              <p className="mt-3 text-sm leading-relaxed opacity-90">
                Every tool on Sounez is designed to be safe, fast and genuinely helpful — and to stay that way as we grow.
              </p>
            </div>
            <ul className="space-y-3">
              {trust.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tools" className="inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5">
              Explore the tools <ArrowRight className="h-4 w-4" />
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
