import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { BlogPostShell } from "@/components/BlogPostShell";
import { BlogImage, PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "The Best Color Palettes for Modern Design (2026) | Sounez",
  description: "The principles behind color palettes that just work, for landing pages, apps and brands. Plus the free tools to build your own.",
  alternates: { canonical: getSiteUrl() + "/blog/best-color-palettes-for-design" },
  openGraph: {
    title: "Best Color Palettes for Modern Design",
    description: "Palettes that just work, and the principles behind them.",
  },
};

const FAQS = [
  { question: "How many colors should a brand have?", answer: "One primary, one accent, plus 5–7 neutrals (background, surface, border, text variants). That's it. More and you'll lose consistency." },
  { question: "Should I use trendy colors?", answer: "Trends are great for hero gradients and marketing pages, but your core brand color should outlast trends. Pick something you'd be happy with in five years." },
  { question: "What's the easiest way to make a palette feel premium?", answer: "Reduce saturation and increase contrast. The most premium palettes are also the most restrained." },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="best-color-palettes-for-design"
        title="The Best Color Palettes for Modern Design"
        description="The principles behind color palettes that just work, for landing pages, apps and brands. Plus the free tools to build your own."
        articleSection="Design Tools"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="best-color-palettes-for-design"
        ctaTools={["color-palette-generator", "css-gradient-generator", "image-compressor"]}
        title="The Best Color Palettes for Modern Design"
        excerpt="Color makes or breaks a design. Here are the principles, palettes and free tools we use to ship interfaces that feel premium without trying too hard."
      >
        <p>
          Color is the first thing a visitor sees and the last thing they remember. Get it right and
          your product feels confident, modern, considered. Get it wrong and even great copy and
          layout fall flat. Most designers don&apos;t lack taste, they lack a system. This article gives
          you one.
        </p>

        <BlogImage src="/blog/best-color-palettes-for-design-bg.webp" alt="A row of harmonious color swatches applied to a UI mockup" caption="Restraint reads as confidence." />

        <h2>The 60-30-10 rule (and why it works)</h2>
        <ul>
          <li><strong>60%</strong>: neutral background and surfaces</li>
          <li><strong>30%</strong>: secondary color (text, borders, supporting UI)</li>
          <li><strong>10%</strong>: your bold accent (buttons, links, highlights)</li>
        </ul>
        <p>
          This proportion gives the eye a place to rest. Designs that fail usually invert it:
          accent everywhere, no quiet space. Build a palette that respects these ratios with the{" "}
          <a href="/color-palette-generator">Color Palette Generator</a>.
        </p>

        <h2>Start with one hero color, build everything from it</h2>
        <p>
          Pick a single brand color and build everything around it. Tints (lighter), shades (darker)
          and a complementary accent will cover 95% of your needs. Two colors used with intent will
          always beat seven used by accident.
        </p>
        <PullQuote>Two colors used with intent will always beat seven used by accident.</PullQuote>

        <h2>Use gradients sparingly, make them count</h2>
        <p>
          One signature gradient on your hero section beats a rainbow everywhere. Modern gradients
          work best when they stay close in hue (e.g. blue → violet) rather than jumping across the
          wheel. Build yours with the <a href="/css-gradient-generator">CSS Gradient Generator</a> and
          save them as design tokens, never re-invent the gradient on every page.
        </p>

        <h2>Test contrast (this is non-negotiable)</h2>
        <p>
          Body text must clear{" "}
          <a href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" target="_blank" rel="noopener noreferrer">
            WCAG AA contrast
          </a>{" "}
          (4.5:1 for normal text, 3:1 for large text). If a color fails, darken or lighten it by one
          step. Accessibility and good design are the same thing.
        </p>

        <h2>Five palette directions that work in 2026</h2>
        <ul>
          <li><strong>Monochrome + one accent</strong>: Linear, Vercel. Calm and confident.</li>
          <li><strong>Warm neutrals</strong>: Notion, Stripe. Trustworthy and editorial.</li>
          <li><strong>Dark mode first</strong>: Raycast, GitHub. Premium and developer-friendly.</li>
          <li><strong>Pastel + bold accent</strong>: Figma, Framer. Playful but professional.</li>
          <li><strong>High-contrast brutalism</strong>: Vercel hero pages. Confident and modern.</li>
        </ul>

        <h2>The pre-launch color checklist</h2>
        <ol>
          <li>Pick one hero color, the rest follows</li>
          <li>Build tints and shades with the <a href="/color-palette-generator">Palette Generator</a></li>
          <li>Test every text/background combination for WCAG AA</li>
          <li>Define semantic tokens (no raw hex in components)</li>
          <li>Pick one signature gradient with the <a href="/css-gradient-generator">CSS Gradient Generator</a></li>
          <li>Compress your hero images with the <a href="/image-compressor">Image Compressor</a> so colors load fast</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <h3>How many colors should a brand have?</h3>
        <p>One primary, one accent, plus 5–7 neutrals (background, surface, border, text variants). That&apos;s it. More and you&apos;ll lose consistency.</p>
        <h3>Should I use trendy colors?</h3>
        <p>Trends are great for hero gradients and marketing pages, but your core brand color should outlast trends. Pick something you&apos;d be happy with in five years.</p>
        <h3>What&apos;s the easiest way to make a palette feel premium?</h3>
        <p>Reduce saturation and increase contrast. The most &quot;premium&quot; palettes are also the most restrained.</p>

        <h2>Conclusion: restraint wins</h2>
        <p>
          Pick fewer colors and use them with intent. Build a system, not a mood board. Open the{" "}
          <a href="/color-palette-generator">Color Palette Generator</a> and start with one hero color
          right now, the rest of your design system will fall into place.
        </p>
      </BlogPostShell>
    </>
  );
}
