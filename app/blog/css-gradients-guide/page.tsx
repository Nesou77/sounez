import type { Metadata } from "next";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "The Complete Guide to CSS Gradients in 2026 | Sounez",
  description:
    "Linear, radial, conic — everything you need to build beautiful CSS gradients with clean, modern code. Includes examples, tips and a free generator.",
  openGraph: {
    title: "The Complete Guide to CSS Gradients in 2026",
    description: "Linear, radial, conic — build beautiful gradients with clean CSS.",
  },
};

const FAQS = [
  { question: "Are CSS gradients supported in all browsers?", answer: "Linear and radial gradients have had universal support since 2013. Conic gradients are supported in all modern browsers (Chrome 69+, Firefox 83+, Safari 12.1+). No prefixes needed in 2026." },
  { question: "Can I animate CSS gradients?", answer: "Not directly with transition — browsers can't interpolate between gradient values. The workaround is to animate background-position on an oversized gradient, or use @keyframes with opacity transitions between layered gradients." },
  { question: "What's the difference between a gradient and a mesh gradient?", answer: "A mesh gradient has multiple color points that blend in 2D space. Pure CSS mesh gradients aren't possible yet; they require SVG or canvas. For most UI use cases, a well-crafted radial gradient achieves a similar effect." },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="css-gradients-guide"
        title="The Complete Guide to CSS Gradients in 2026"
        description="Linear, radial, conic — everything you need to build beautiful CSS gradients with clean, modern code. Includes examples, tips and a free generator."
        articleSection="Design Tools"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="css-gradients-guide"
        ctaTools={["css-gradient-generator", "color-palette-generator", "image-compressor"]}
        title="The Complete Guide to CSS Gradients in 2026"
        excerpt="Linear, radial, conic — everything you need to build beautiful gradients with clean, modern CSS. No design tool required."
      >
        <p>
          CSS gradients have come a long way. What used to require Photoshop exports and heavy image
          files is now a single line of CSS that renders crisply at any resolution, loads instantly,
          and scales to any screen size. In 2026, there&apos;s no reason to use a gradient image when CSS
          can do it better.
        </p>
        <p>
          This guide covers every gradient type, the properties that matter, and the patterns that
          look great in real products — plus the free tool that generates them without writing a line
          of code.
        </p>

        <h2>The three types of CSS gradients</h2>

        <h3>1. Linear gradients</h3>
        <p>
          The most common type. Color transitions along a straight line at any angle.
        </p>
        <ul>
          <li><code>background: linear-gradient(135deg, #6366f1, #8b5cf6);</code></li>
          <li>Direction can be an angle (<code>135deg</code>) or a keyword (<code>to right</code>, <code>to bottom right</code>)</li>
          <li>Add multiple color stops for more complex transitions</li>
        </ul>

        <h3>2. Radial gradients</h3>
        <p>
          Color radiates outward from a center point — great for spotlight effects and glows.
        </p>
        <ul>
          <li><code>background: radial-gradient(circle at center, #6366f1, transparent);</code></li>
          <li>Shape can be <code>circle</code> or <code>ellipse</code></li>
          <li>Position the center with <code>at x y</code> — useful for off-center glows</li>
        </ul>

        <h3>3. Conic gradients</h3>
        <p>
          Color transitions around a center point — like a pie chart or color wheel. Newer and
          underused.
        </p>
        <ul>
          <li><code>background: conic-gradient(from 0deg, #6366f1, #8b5cf6, #6366f1);</code></li>
          <li>Great for progress indicators, pie charts, and abstract backgrounds</li>
          <li>
            Supported in all modern browsers since 2021 — check the latest support table on{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient" target="_blank" rel="noopener noreferrer">
              MDN Web Docs
            </a>
          </li>
        </ul>

        <PullQuote>
          A CSS gradient loads in zero milliseconds and scales to any resolution. There&apos;s no reason to
          use a gradient image in 2026.
        </PullQuote>

        <h2>Gradient patterns that work in real products</h2>

        <h3>The hero background gradient</h3>
        <p>
          A subtle, large radial gradient behind your hero section adds depth without distraction.
          Keep it low opacity (10–20%) and use your brand color.
        </p>

        <h3>The brand gradient on CTAs</h3>
        <p>
          A diagonal linear gradient on your primary button makes it feel premium and distinct. Use
          two adjacent hues (blue → violet, orange → pink) for the most natural result.
        </p>

        <h3>The text gradient</h3>
        <p>
          Apply a gradient to text with <code>background-clip: text</code> and{" "}
          <code>-webkit-background-clip: text</code>. Use sparingly — one gradient headline per page
          maximum.
        </p>

        <h3>The card border gradient</h3>
        <p>
          Use a gradient on a pseudo-element (<code>::before</code>) with{" "}
          <code>mask-composite: exclude</code> to create a gradient border. More complex but
          impressive.
        </p>

        <h2>Common mistakes to avoid</h2>
        <ul>
          <li>
            <strong>Too many colors</strong> — gradients with more than 3 stops usually look muddy.
            Two colors, one transition.
          </li>
          <li>
            <strong>Jumping across the color wheel</strong> — blue to orange creates a grey muddy
            middle. Stay within 60–90° of the color wheel for clean transitions.
          </li>
          <li>
            <strong>Gradients everywhere</strong> — one signature gradient per UI. More than that and
            nothing feels special.
          </li>
          <li>
            <strong>Ignoring dark mode</strong> — gradients that look great in light mode can look
            garish in dark mode. Test both.
          </li>
        </ul>

        <h2>Build gradients without writing code</h2>
        <p>
          Use the <a href="/css-gradient-generator">CSS Gradient Generator</a> to build any gradient
          visually and copy the ready-to-use CSS. Adjust angle, colors, stops and opacity with a live
          preview. No design tool, no guesswork. Pair it with the{" "}
          <a href="/color-palette-generator">Color Palette Generator</a> to pick colors that work
          together before building the gradient.
        </p>

        <h2>Performance: gradients vs. images</h2>
        <p>
          CSS gradients are rendered by the GPU and have zero file size. A gradient image (even
          compressed) adds HTTP requests and bytes. Always prefer CSS gradients for backgrounds,
          overlays and decorative elements. Only use images when the gradient is photographic or
          extremely complex. If you do need a gradient image, compress it with the{" "}
          <a href="/image-compressor">Image Compressor</a> first.
        </p>

        <h2>Frequently Asked Questions</h2>
        <h3>Are CSS gradients supported in all browsers?</h3>
        <p>
          Linear and radial gradients have had universal support since 2013. Conic gradients are
          supported in all modern browsers (Chrome 69+, Firefox 83+, Safari 12.1+). No prefixes
          needed in 2026.
        </p>
        <h3>Can I animate CSS gradients?</h3>
        <p>
          Not directly with <code>transition</code> — browsers can&apos;t interpolate between gradient
          values. The workaround is to animate <code>background-position</code> on an oversized
          gradient, or use <code>@keyframes</code> with opacity transitions between layered gradients.
        </p>
        <h3>What&apos;s the difference between a gradient and a mesh gradient?</h3>
        <p>
          A mesh gradient has multiple color points that blend in 2D space — more like a painted
          surface than a directional transition. Pure CSS mesh gradients aren&apos;t possible yet; they
          require SVG or canvas. For most UI use cases, a well-crafted radial gradient achieves a
          similar effect.
        </p>

        <h2>Conclusion: one gradient, used with intent</h2>
        <p>
          Pick one signature gradient for your brand, apply it consistently to your primary CTA and
          hero section, and leave everything else neutral. Open the{" "}
          <a href="/css-gradient-generator">CSS Gradient Generator</a> now and build yours — it takes
          under a minute and the CSS is ready to paste.
        </p>
      </BlogPostShell>
    </>
  );
}
