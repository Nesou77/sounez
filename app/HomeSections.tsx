import { SmartLink as Link } from "@/components/smart-link";
import Image from "next/image";
import { ToolCard } from "@/components/ToolCard";
import { ArrowRight, CheckCircle2, FileCheck, Layers, Shield } from "lucide-react";
import { CATEGORIES, FEATURED_TOOLS, toolsByCategory } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog";
import { sortBlogPostsByPopularity } from "@/lib/popularity";
import { SMART_PACKS } from "@/lib/smart-packs-data";
import { getCategoryIcon } from "@/lib/tool-icons";

const USE_CASES = [
  {
    who: "Content creators",
    jobs: [
      "Write three caption options for an Instagram reel in under a minute.",
      "Generate 25 YouTube tags from a video topic without guessing.",
      "Refresh a social media bio when your offer changes.",
      "Check what a sponsored post might pay based on follower count.",
    ],
  },
  {
    who: "Designers and developers",
    jobs: [
      "Build a five-color palette from a base hex and copy CSS in one click.",
      "Preview and copy a CSS gradient without typing stop values manually.",
      "Export a favicon pack from a letter, emoji, or uploaded logo.",
      "Generate a CSS box shadow or background pattern and paste the code.",
    ],
  },
  {
    who: "Students and office workers",
    jobs: [
      "Turn a lecture topic into structured revision notes with key terms.",
      "Convert a received PDF into an editable Word file to annotate.",
      "Count words and check reading time before submitting an essay.",
      "Build a clean one-page resume and print it to PDF without Word.",
    ],
  },
  {
    who: "Shop owners and small businesses",
    jobs: [
      "Remove a product background and get a clean PNG for a marketplace.",
      "Generate a QR code for a table menu, Wi-Fi, or promotional flyer.",
      "Compress product images before uploading to keep page speed fast.",
      "Generate business name ideas and check domain availability next.",
    ],
  },
];

const HOME_FAQS = [
  {
    q: "Do I need an account to use Sounez?",
    a: "No. Most tools work without any sign-up. Open the page, use the tool, and close it. Fair-use rate limits apply on AI-powered features like captions, study notes, and Smart Packs to keep the service available for everyone.",
  },
  {
    q: "Are the tools actually free?",
    a: "Yes. Sounez is ad-supported using Google AdSense, which allows all core tools to remain free. There are no paid tiers, no credits, and no subscription required for normal individual use.",
  },
  {
    q: "Which tools upload files to a server?",
    a: "Browser-only tools — image compressor, PNG to JPG, background remover, QR code generator, word counter, calculator, password generator, text case converter, color palette, CSS gradient, favicon, SVG blob, box shadow, background pattern, image placeholder, and font pairing — never send data to Sounez servers. Server-backed tools — PDF to Word converter, AI caption, bio, business name, website idea, study notes, and image describer — explain exactly what is processed and for how long on each tool page.",
  },
  {
    q: "What is a Smart Pack?",
    a: "A Smart Pack is a structured AI workflow that takes one brief and returns several related text fields at once — for example, a caption, first comment, hashtags, alt text, and posting note from a single social media description. It saves time when multiple pieces of content need to match each other.",
  },
  {
    q: "Can I use generated content commercially?",
    a: "Yes, after reviewing and editing it. You are responsible for verifying that AI-generated text is accurate, does not infringe on any rights, and complies with the platform or legal context in which you publish it. Design outputs such as palettes, gradients, and CSS code are yours to use in any project.",
  },
  {
    q: "How is my privacy protected?",
    a: "Browser tools process everything locally; no data leaves your device. Server tools receive only the content needed to complete the request and do not store it beyond the response. See the Privacy Policy for the full breakdown, and the Cookie Policy for how advertising and analytics storage is handled.",
  },
  {
    q: "What happens to comments I post on tool pages?",
    a: "Comments go into a moderation queue and are reviewed before appearing publicly. Automated filters block clearly prohibited content before it reaches the queue. Moderated comments that are approved appear on the tool page and are visible to all visitors. You can report any approved comment with the flag icon.",
  },
  {
    q: "Are AI outputs always accurate?",
    a: "No. AI tools can produce plausible-sounding but incorrect information, especially for specific facts, dates, prices, and claims. Always read generated text before publishing, and verify any fact that another person or system will rely on.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Choose the job",
    text: "Open a single tool for a quick task, or start with a Smart Pack when several pieces need to match.",
  },
  {
    step: "2",
    title: "Add only what is needed",
    text: "Paste text, upload a file, or fill a short brief. Tool pages explain what is processed locally or on the server.",
  },
  {
    step: "3",
    title: "Check the result",
    text: "Copy or download the output, then verify facts, claims, links, image details, and formatting before you use it.",
  },
];

const TRUST_NOTES = [
  {
    Icon: Shield,
    title: "Clear privacy notes",
    text: "Browser-only tools say so. AI and PDF tools explain when content is processed on a server.",
  },
  {
    Icon: FileCheck,
    title: "Drafts, not final approval",
    text: "Generated copy, study notes, image descriptions, and listings should be edited by a person before publishing.",
  },
  {
    Icon: CheckCircle2,
    title: "Ads kept out of the work area",
    text: "Sounez uses advertising to support free tools, while forms, buttons, uploads, and result areas stay focused on the task.",
  },
];

const EDITORIAL_STANDARDS = [
  {
    title: "Original guidance on every main page",
    text: "Tool pages include examples, common mistakes, privacy notes, and a short explanation of when the tool is not the right choice.",
  },
  {
    title: "Useful output over empty pages",
    text: "Pages are built around a working tool, supporting guides, and related workflows instead of placeholder text or copied material.",
  },
  {
    title: "Human review stays part of the workflow",
    text: "AI drafts, converted files, and generated assets are presented as starting points that should be checked before publication.",
  },
  {
    title: "Clear site ownership and policies",
    text: "The About, Contact, Privacy Policy, Terms, and DMCA pages explain who runs Sounez and how content, files, cookies, and ads are handled.",
  },
];

export function HomeSections() {
  const latestPosts = sortBlogPostsByPopularity(BLOG_POSTS).slice(0, 3);

  return (
    <>
      <section id="smart-packs" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Smart Packs</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Start with a complete workflow</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Smart Packs turn one clear brief into related drafts: captions, listing copy, image SEO notes,
              launch text, or study material. They do not publish anything for you.
            </p>
          </div>
          <Link href="/smart-packs" className="text-sm font-medium text-primary-label hover:underline shrink-0">
            View all Smart Packs
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SMART_PACKS.map((pack) => (
            <Link
              key={pack.slug}
              href={`/smart-packs/${pack.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40"
            >
              <Layers className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-bold">{pack.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pack.shortDescription}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Open pack <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="popular" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Tools</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Popular tools</h2>
            <p className="mt-2 text-muted-foreground">
              A few common starting points. The tools page groups everything by category.
            </p>
          </div>
          <Link href="/tools" className="hidden text-sm font-medium text-primary-label hover:underline sm:inline">
            Browse all tools
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_TOOLS.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Tool categories</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Find the right kind of tool</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Categories stay inside the tools area so the main navigation stays simple. Jump to the group
            that matches what you are trying to finish.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {CATEGORIES.map((category) => {
            const Icon = getCategoryIcon(category.slug);
            const count = toolsByCategory(category.slug).length;
            return (
              <Link
                key={category.slug}
                href={`/tools#${category.slug}`}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-soft text-primary ring-1 ring-primary/10">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{category.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-primary">
                  Browse {count} tool{count === 1 ? "" : "s"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight">How Sounez works</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          The site is meant for practical jobs: open a page, get the result, review it, and move on.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="rounded-2xl border border-border bg-card p-6 text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-primary-foreground">
                {item.step}
              </span>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Editorial standards</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Built to avoid thin content</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Sounez is not a collection of empty landing pages. Each section is written around a real task:
              what the tool does, how to use it, what can go wrong, what privacy tradeoffs exist, and which
              guide or related tool helps with the next step.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Ads may support the site, but the publisher content comes first. Tool forms, explanations,
              examples, guides, and policy pages are kept visible so visitors can understand the page before
              they interact with ads or generated output.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {EDITORIAL_STANDARDS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Guides</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Latest guides</h2>
            <p className="mt-2 text-muted-foreground">
              Practical articles that explain the tool choices, mistakes, and checks behind common tasks.
            </p>
          </div>
          <Link href="/blog" className="hidden text-sm font-medium text-primary-label hover:underline sm:inline">
            View all guides
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-medium text-muted-foreground">{post.readTime} read</div>
                <h3 className="mt-2 text-base font-semibold leading-snug group-hover:text-primary">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Use cases</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">What people use Sounez for</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every tool on Sounez is built for one clear job. Here are the most common situations where visitors
            open a tool or Smart Pack.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((group) => (
            <div key={group.who} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h3 className="text-sm font-bold text-primary">{group.who}</h3>
              <ul className="mt-3 space-y-2">
                {group.jobs.map((job) => (
                  <li key={job} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                    <span className="mt-0.5 text-primary shrink-0">›</span>
                    {job}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">Trust and privacy</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Useful tools with clear limits</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Sounez is built to be helpful without pretending every tool works the same way. Read the short
            note on each page before using private files, client work, or AI-generated drafts.
          </p>
        </div>
        <div className="grid gap-5 rounded-3xl border border-border bg-gradient-soft p-6 sm:grid-cols-3 sm:p-8">
          {TRUST_NOTES.map(({ Icon, title, text }) => (
            <div key={title} className="flex gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-label">FAQ</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Common questions</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Answers to the most frequent questions about how Sounez tools work, what data they handle,
            and how to get the most out of them.
          </p>
        </div>
        <div className="divide-y divide-border rounded-2xl border border-border bg-card">
          {HOME_FAQS.map((faq) => (
            <details key={faq.q} className="group p-5">
              <summary tabIndex={-1} className="cursor-pointer list-none font-semibold marker:hidden">
                {faq.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Ready to try a simple workflow?</h2>
        <p className="mt-3 text-muted-foreground">
          Start with a Smart Pack if you need several related drafts, or open the tools page if you
          already know the job.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/smart-packs"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-pop"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Smart Packs
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-muted"
          >
            Browse tools
          </Link>
        </div>
      </section>
    </>
  );
}
