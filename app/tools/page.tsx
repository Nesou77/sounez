import type { Metadata } from "next";
import { TOOLS } from "@/data/tools";
import { ToolsClient } from "./ToolsClient";
import { getSiteUrl } from "@/lib/site-url";
import { SmartLink as Link } from "@/components/smart-link";

export const metadata: Metadata = {
  title: "Tools | Free Creator, Design and Utility Tools | Sounez",
  description: `Browse all ${TOOLS.length} free online tools on Sounez. Filter by category and search tools for creators, designers and productivity.`,
  alternates: { canonical: getSiteUrl() + "/tools" },
  openGraph: {
    title: "Tools | Sounez",
    description: "Browse free Sounez tools grouped by creator, design and utility categories.",
  },
};

const TOOLS_FAQS = [
  {
    q: "Do I need an account to use these tools?",
    a: "No. Every tool on Sounez is free to open and use without signing up. Fair-use rate limits apply on AI-powered tools to keep the service available for everyone, but most users never reach them during a normal session.",
  },
  {
    q: "Which tools process files on a server, and which stay in my browser?",
    a: "Browser-only tools — image compressor, PNG to JPG converter, background remover, QR code generator, word counter, calculator, password generator, text case converter, color palette, CSS gradient, favicon generator, SVG blob, box shadow, background pattern, image placeholder, and font pairing — never send your data to any server. AI-backed and file-conversion tools (PDF to Word, AI caption, bio, business name, website idea, study notes, and image describer) use a server for processing and each page explains exactly what is handled and for how long.",
  },
  {
    q: "Can I use tool output in commercial projects?",
    a: "Yes. Generated palettes, CSS, favicons, and SVG shapes are yours to use in any project. AI-generated text is yours to edit and publish, but you are responsible for verifying accuracy, rights, and compliance before commercial use.",
  },
  {
    q: "What is the difference between a tool and a Smart Pack?",
    a: "A tool does one job — compress an image, generate a caption, convert a file. A Smart Pack takes one brief and produces several related pieces at once, for example a caption, first comment, hashtags, and image alt text from a single social post description. Start with a tool when you know the job; start with a Smart Pack when you need several things to match.",
  },
  {
    q: "Are there limits on how often I can use a tool?",
    a: "Browser tools have no server-side limits — use them as often as you need. AI and PDF tools have fair-use limits on processing frequency and file size to keep the service stable. Individual pages list specific limits where they apply.",
  },
  {
    q: "How is my privacy protected when using these tools?",
    a: "Browser tools process everything locally on your device. Server-backed tools receive only the content needed to complete the request and remove it after the response. No tool stores your input between sessions, and none link your usage to an identity. See the Privacy Policy for the complete breakdown.",
  },
];

export default function ToolsPage() {
  return (
    <>
      <ToolsClient />

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <section className="mt-0 rounded-3xl border border-border bg-gradient-soft p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">How Sounez tool pages are built</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every tool page goes beyond the tool itself. Each one includes a plain-language explanation of
                what the tool does, step-by-step usage instructions, real examples, a list of common mistakes
                to avoid, a privacy note explaining whether data leaves your device, and a section on when
                the tool is not the right choice for the job.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Pages also include a community comment section for questions and tips, subject to a moderation
                queue and automated safety filtering before any comment appears publicly.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">Privacy note on every page</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Each page states clearly whether the tool runs in your browser or processes data on a server.
                  No guessing about what is uploaded.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">Common mistakes section</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Each page lists the things people get wrong most often — wrong format, wrong use case,
                  quality setting that destroys detail — so you can avoid them before you start.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">When not to use this tool</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  A short honest note on the situations where this tool is the wrong choice and what to
                  use instead. Not every tool is the right tool for every job.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">Related tools and guides</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Each page links to tools that work well alongside it and to blog guides that put the
                  tool in a practical workflow context.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">Common questions about Sounez tools</h2>
          <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
            {TOOLS_FAQS.map((faq) => (
              <details key={faq.q} className="group p-5">
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  {faq.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold">Before using any tool on this page</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold">Read the privacy note</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                If you plan to upload a file or paste sensitive text, check whether the tool runs locally
                in your browser or sends data to a server. Each tool page states this clearly at the top
                of its content section.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Treat AI output as a draft</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                AI tools generate text based on the brief you provide. The results are starting points, not
                finished copy. Check facts, prices, dates, names, and claims before publishing. Remove anything
                that does not reflect the real offer, product, or situation.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Keep original files</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                When converting or compressing files, keep a copy of the original until you have confirmed
                the converted version works for its intended purpose. File conversion is generally not
                reversible without the original.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <Link href="/categories" className="font-medium text-primary hover:underline">Browse by category</Link>
          <span aria-hidden="true">·</span>
          <Link href="/smart-packs" className="font-medium text-primary hover:underline">Try Smart Packs</Link>
          <span aria-hidden="true">·</span>
          <Link href="/blog" className="font-medium text-primary hover:underline">Read the guides</Link>
          <span aria-hidden="true">·</span>
          <Link href="/privacy-policy" className="font-medium text-primary hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </>
  );
}
