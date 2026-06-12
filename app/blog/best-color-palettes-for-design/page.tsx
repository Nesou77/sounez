import { blogMetadata } from "@/lib/blog-metadata";
import { BlogPostShell } from "@/components/BlogPostShell";
import { BlogImage, PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";
import Link from "next/link";

export const metadata = blogMetadata("best-color-palettes-for-design", {
  title: "The Best Color Palettes for Modern Design (2026) | Sounez",
  description:
    "The principles behind color palettes that just work, for landing pages, apps and brands. Curated palettes, color theory and free tools to build your own.",
    ogTitle: "Best Color Palettes for Modern Design",
    ogDescription: "Palettes that just work, and the principles behind them.",
});

const FAQS = [
  { question: "How many colors should a brand have?", answer: "One primary, one accent, plus 5-7 neutrals (background, surface, border, text variants). That's it. More and you'll lose consistency." },
  { question: "Should I use trendy colors?", answer: "Trends are great for hero gradients and marketing pages, but your core brand color should outlast trends. Pick something you'd be happy with in five years." },
  { question: "What's the easiest way to make a palette feel premium?", answer: "Reduce saturation and increase contrast. The most premium palettes are also the most restrained." },
  { question: "What is the difference between analogous and complementary colors?", answer: "Analogous colors sit next to each other on the color wheel (blue, blue-green, green) and feel harmonious. Complementary colors sit opposite each other (blue and orange) and create contrast and energy." },
  { question: "How do I test if my color palette is accessible?", answer: "Use a WCAG contrast checker tool. Normal body text needs a 4.5:1 contrast ratio against its background. Large text needs 3:1. Failing contrast is one of the most common accessibility mistakes." },
  { question: "Can I use more than one accent color?", answer: "Yes, but use them sparingly. A second accent (often called a tertiary color) works best for status colors: success (green), warning (yellow), error (red). These should not compete with your primary accent." },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="best-color-palettes-for-design"
        title="The Best Color Palettes for Modern Design"
        description="The principles behind color palettes that just work, for landing pages, apps and brands. Curated palettes, color theory and free tools to build your own."
        articleSection="Design Tools"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="best-color-palettes-for-design"
        ctaTools={["color-palette-generator", "css-gradient-generator", "image-compressor"]}
        title="The Best Color Palettes for Modern Design"
        excerpt="Color makes or breaks a design. Here are the principles, curated palettes and free tools we use to ship interfaces that feel premium without trying too hard."
      >
        <p>
          Color is the first thing a visitor sees and the last thing they remember. Get it right and
          your product feels confident, modern, considered. Get it wrong and even great copy and
          layout fall flat. Most designers don&apos;t lack taste — they lack a system. This article gives
          you one.
        </p>
        <p>
          We cover color theory fundamentals, the 60-30-10 rule, curated palettes for different
          industries, accessibility requirements, and free tools to build and test your palette before
          you write a single line of code.
        </p>

        <BlogImage src="/blog/best-color-palettes-for-design-bg.webp" alt="A row of harmonious color swatches applied to a UI mockup" caption="Restraint reads as confidence." />

        <h2>Color theory basics: what every designer needs to know</h2>
        <p>
          You don&apos;t need to memorize a color wheel, but understanding the relationships between colors
          makes palette-building faster and more intentional.
        </p>
        <ul>
          <li>
            <strong>Analogous palettes</strong>: Colors that sit next to each other on the wheel (blue,
            blue-violet, violet). They feel harmonious and natural. Good for calm, focused products.
          </li>
          <li>
            <strong>Complementary palettes</strong>: Colors opposite each other (blue and orange, red and
            green). High contrast, energetic. Use carefully — too much complementary tension is tiring.
          </li>
          <li>
            <strong>Triadic palettes</strong>: Three colors evenly spaced on the wheel. Vibrant and
            balanced, but harder to pull off without it looking garish. Works well in illustration and
            playful consumer products.
          </li>
          <li>
            <strong>Monochromatic palettes</strong>: Tints and shades of a single hue. The safest bet for
            a clean, modern look. Almost impossible to get wrong.
          </li>
        </ul>
        <p>
          Use the{" "}
          <Link href="/tools/color-palette-generator">Color Palette Generator</Link> to explore these
          relationships interactively. Pick a base hue and generate analogous, complementary and
          monochromatic variants in seconds.
        </p>

        <h2>The 60-30-10 rule (and why it works)</h2>
        <ul>
          <li><strong>60%</strong>: neutral background and surfaces</li>
          <li><strong>30%</strong>: secondary color (text, borders, supporting UI)</li>
          <li><strong>10%</strong>: your bold accent (buttons, links, highlights)</li>
        </ul>
        <p>
          This proportion gives the eye a place to rest. Designs that fail usually invert it:
          accent everywhere, no quiet space. Build a palette that respects these ratios with the{" "}
          <Link href="/tools/color-palette-generator">Color Palette Generator</Link>.
        </p>

        <PullQuote>Two colors used with intent will always beat seven used by accident.</PullQuote>

        <h2>Start with one hero color, build everything from it</h2>
        <p>
          Pick a single brand color and build everything around it. Tints (lighter versions) and
          shades (darker versions) of that one color, plus a complementary accent, will cover 95%
          of your design needs. Two colors used with intent will always beat seven used by accident.
        </p>
        <p>
          A practical starting process: pick a mid-range hue that works at 60% saturation (neither
          too washed out nor too intense). Generate 5-7 steps from near-white to near-black in that
          hue family. Use the lightest as your page background, the darkest as your primary text, and
          the mid-range as your brand accent.
        </p>

        <h2>Five palette directions that work in 2026</h2>
        <ul>
          <li>
            <strong>Monochrome + one accent</strong> (Linear, Vercel style): A gray or off-white base
            with black text and a single vivid accent. Works for any product. Impossible to look bad.
            Sample: background <code>#F9FAFB</code>, text <code>#111827</code>, accent <code>#6366F1</code>.
          </li>
          <li>
            <strong>Warm neutrals</strong> (Notion, Stripe style): Warm off-whites and beiges create a
            calm, editorial feel. Good for productivity tools, agencies and premium services.
            Sample: background <code>#FAFAF9</code>, text <code>#1C1917</code>, accent <code>#E67E22</code>.
          </li>
          <li>
            <strong>Dark mode first</strong> (Raycast, GitHub style): A deep gray or near-black base
            with lighter text. Premium, developer-friendly, increasingly expected.
            Sample: background <code>#0D1117</code>, text <code>#E6EDF3</code>, accent <code>#58A6FF</code>.
          </li>
          <li>
            <strong>Pastel + bold accent</strong> (Figma, Framer style): Muted pastel backgrounds with
            a single saturated accent. Approachable and creative, good for design tools and consumer apps.
            Sample: background <code>#F5F0FF</code>, text <code>#1E1B4B</code>, accent <code>#7C3AED</code>.
          </li>
          <li>
            <strong>High-contrast brutalism</strong>: Pure white or yellow backgrounds with pure black
            text and thick borders. Bold and confident, increasingly popular on SaaS marketing pages.
            Sample: background <code>#FFFFFF</code>, text <code>#000000</code>, accent <code>#FACC15</code>.
          </li>
        </ul>

        <h2>Industry-specific palette guidance</h2>
        <p>
          Color associations are partly cultural and partly contextual. Here is how to think about
          palette direction by industry:
        </p>
        <ul>
          <li>
            <strong>Finance and legal</strong>: Deep blues, navy and dark greens signal trust and stability.
            Avoid bright or playful colors. Neutrals should lean cool.
          </li>
          <li>
            <strong>Health and wellness</strong>: Greens and teals suggest growth and calm. Soft pastels
            work for consumer wellness brands. Medical products often stay closer to clinical whites and blues.
          </li>
          <li>
            <strong>E-commerce and retail</strong>: High contrast is more important than aesthetic coherence.
            Your CTA button color matters more than your palette philosophy.
          </li>
          <li>
            <strong>Creative agencies and design tools</strong>: More latitude for vivid colors, gradients
            and experimental palettes. Your palette is part of the pitch.
          </li>
          <li>
            <strong>SaaS and developer tools</strong>: Dark mode is expected. Blues and purples dominate.
            Focus on legibility over personality.
          </li>
          <li>
            <strong>Food and hospitality</strong>: Warm tones (orange, red, warm yellow) are proven to
            stimulate appetite. Cool palettes work for premium or health-focused food brands.
          </li>
        </ul>

        <h2>Use gradients sparingly, make them count</h2>
        <p>
          One signature gradient on your hero section beats a rainbow everywhere. Modern gradients
          work best when they stay close in hue — for example blue to violet — rather than jumping
          across the wheel. Build yours with the{" "}
          <Link href="/tools/css-gradient-generator">CSS Gradient Generator</Link> and save them as design
          tokens. Never re-invent the gradient on every page.
        </p>
        <p>
          Gradient tips that actually help:
        </p>
        <ul>
          <li>Angle matters: 135° diagonal gradients feel more dynamic than pure vertical or horizontal.</li>
          <li>Limit to two stops. Three or more colors usually look muddy unless you are a very skilled colorist.</li>
          <li>Dark-to-dark gradients work in backgrounds where you want subtle depth without high contrast.</li>
          <li>Never put important text directly on a gradient unless contrast has been thoroughly tested.</li>
        </ul>

        <h2>Test contrast — this is non-negotiable</h2>
        <p>
          Body text must clear{" "}
          <a href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" target="_blank" rel="noopener noreferrer">
            WCAG AA contrast
          </a>{" "}
          (4.5:1 for normal text, 3:1 for large text). If a color fails, darken or lighten it by one
          step. Accessibility and good design are not in tension — they are the same thing. A palette
          that fails contrast also looks weak and washed out to sighted users.
        </p>
        <p>
          Common contrast failures to check:
        </p>
        <ul>
          <li>Light gray text on white backgrounds (extremely common and extremely problematic)</li>
          <li>Medium-saturation colored text on white (green, red, blue often fail at mid-range)</li>
          <li>White text on light-colored buttons</li>
          <li>Any text on gradient backgrounds (the contrast changes across the gradient)</li>
        </ul>

        <h2>Building your semantic color system</h2>
        <p>
          Once you have your raw palette, translate it into semantic tokens. This means naming colors
          by their role rather than their value. Instead of using <code>#6366F1</code> directly in
          your code, define:
        </p>
        <ul>
          <li><code>--color-primary</code>: your brand accent</li>
          <li><code>--color-background</code>: page background</li>
          <li><code>--color-surface</code>: card and panel backgrounds</li>
          <li><code>--color-border</code>: separator lines and input borders</li>
          <li><code>--color-text-primary</code>: headings and important text</li>
          <li><code>--color-text-secondary</code>: supporting and label text</li>
          <li><code>--color-success</code>, <code>--color-warning</code>, <code>--color-error</code></li>
        </ul>
        <p>
          This system makes dark mode implementation, theming, and brand refreshes dramatically
          simpler. Change one token, update the entire UI.
        </p>

        <h2>The pre-launch color checklist</h2>
        <ol>
          <li>Pick one hero color. Everything else follows from it.</li>
          <li>Build tints and shades with the <Link href="/tools/color-palette-generator">Palette Generator</Link></li>
          <li>Test every text/background combination for WCAG AA</li>
          <li>Define semantic tokens — no raw hex values in components</li>
          <li>Pick one signature gradient with the <Link href="/tools/css-gradient-generator">CSS Gradient Generator</Link></li>
          <li>Check that your palette works in both light and dark mode</li>
          <li>Compress your hero images with the <Link href="/tools/image-compressor">Image Compressor</Link> so colors load fast</li>
          <li>Get a second opinion: show the palette to someone unfamiliar with your product</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <h3>How many colors should a brand have?</h3>
        <p>One primary, one accent, plus 5-7 neutrals (background, surface, border, text variants). That&apos;s it. More and you&apos;ll lose consistency.</p>
        <h3>Should I use trendy colors?</h3>
        <p>Trends are great for hero gradients and marketing pages, but your core brand color should outlast trends. Pick something you&apos;d be happy with in five years.</p>
        <h3>What&apos;s the easiest way to make a palette feel premium?</h3>
        <p>Reduce saturation and increase contrast. The most &quot;premium&quot; palettes are also the most restrained.</p>
        <h3>What is the difference between analogous and complementary colors?</h3>
        <p>Analogous colors sit next to each other on the color wheel and feel harmonious. Complementary colors sit opposite each other and create high contrast and energy.</p>
        <h3>How do I test if my color palette is accessible?</h3>
        <p>Use a WCAG contrast checker. Body text needs 4.5:1 contrast against its background. Large text needs 3:1. Failing contrast is one of the most common accessibility mistakes in web design.</p>
        <h3>Can I use more than one accent color?</h3>
        <p>Yes, but sparingly. A second accent works best for status colors: success (green), warning (yellow), error (red). These should not compete with your primary accent in everyday UI contexts.</p>

        <h2>Conclusion: restraint wins</h2>
        <p>
          Pick fewer colors and use them with intent. Build a system, not a mood board. Define semantic
          tokens so any designer on your team can build consistently. Test contrast before launching
          so you don&apos;t exclude users. Open the{" "}
          <Link href="/tools/color-palette-generator">Color Palette Generator</Link> and start with one hero
          color right now. The rest of your design system will fall into place around it.
        </p>
      </BlogPostShell>
    </>
  );
}
