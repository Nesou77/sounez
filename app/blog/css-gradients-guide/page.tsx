import { blogMetadata } from "@/lib/blog-metadata";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";
import Link from "next/link";

export const metadata = blogMetadata("css-gradients-guide", {
  title: "The Complete Guide to CSS Gradients in 2026 | Sounez",
  description:
    "Linear, radial, conic, everything you need to build beautiful CSS gradients with clean, modern code. Includes examples, tips and a free generator.",
    ogTitle: "The Complete Guide to CSS Gradients in 2026",
    ogDescription: "Linear, radial, conic, build beautiful gradients with clean CSS.",
});

const FAQS = [
  { question: "Are CSS gradients supported in all browsers?", answer: "Linear and radial gradients have had universal support since 2013. Conic gradients are supported in all modern browsers (Chrome 69+, Firefox 83+, Safari 12.1+). No prefixes needed in 2026." },
  { question: "Can I animate CSS gradients?", answer: "Not directly with transition, browsers can't interpolate between gradient values. The workaround is to animate background-position on an oversized gradient, or use @keyframes with opacity transitions between layered gradients." },
  { question: "What's the difference between a gradient and a mesh gradient?", answer: "A mesh gradient has multiple color points that blend in 2D space. Pure CSS mesh gradients aren't possible yet; they require SVG or canvas. For most UI use cases, a well-crafted radial gradient achieves a similar effect." },
  { question: "How do I apply a gradient to text in CSS?", answer: "Set background to your gradient, then add background-clip: text and -webkit-background-clip: text, and set color to transparent. The gradient shows through the text shape. Use sparingly — one gradient headline per page maximum." },
  { question: "How many color stops should a gradient have?", answer: "Two stops is almost always enough for a clean result. Three stops work well for more complex transitions like sunrise effects (dark, mid, light). More than three usually creates a muddy, cluttered look unless you're building a deliberate rainbow or spectrum effect." },
  { question: "Should gradients be different in dark mode?", answer: "Yes. A vibrant blue-to-violet gradient that looks polished on white can look garish on a dark background. In dark mode, reduce opacity (use rgba or a semi-transparent overlay) or shift to darker, more muted tones. Always test both modes before shipping." },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="css-gradients-guide"
        title="The Complete Guide to CSS Gradients in 2026"
        description="Linear, radial, conic, everything you need to build beautiful CSS gradients with clean, modern code. Includes examples, tips and a free generator."
        articleSection="Design Tools"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="css-gradients-guide"
        ctaTools={["css-gradient-generator", "color-palette-generator", "image-compressor"]}
        title="The Complete Guide to CSS Gradients in 2026"
        excerpt="Linear, radial, conic, everything you need to build beautiful gradients with clean, modern CSS. No design tool required."
      >
        <p>
          CSS gradients have come a long way. What used to require Photoshop exports and heavy image
          files is now a single line of CSS that renders crisply at any resolution, loads instantly,
          and scales to any screen size. In 2026, there&apos;s no reason to use a gradient image when CSS
          can do it better.
        </p>
        <p>
          This guide covers every gradient type, the properties that matter, and the patterns that
          look great in real products, plus the free tool that generates them without writing a line
          of code.
        </p>

        <h2>The three types of CSS gradients</h2>

        <h3>1. Linear gradients</h3>
        <p>
          The most common type. Color transitions along a straight line at any angle. The
          direction can be expressed as a keyword or a degree value.
        </p>
        <pre><code>{`/* Two-color diagonal */
background: linear-gradient(135deg, #6366f1, #8b5cf6);

/* Three stops: add a midpoint color */
background: linear-gradient(to right, #0ea5e9, #6366f1, #8b5cf6);

/* Using percentage stops to control where color changes */
background: linear-gradient(to bottom, #ffffff 0%, #f1f5f9 60%, #e2e8f0 100%);`}</code></pre>
        <p>
          The angle <code>0deg</code> points up, <code>90deg</code> points right, and
          <code>135deg</code> points diagonally down-right. Keyword equivalents like{" "}
          <code>to right</code> or <code>to bottom right</code> are more readable and mean the
          same thing.
        </p>

        <h3>2. Radial gradients</h3>
        <p>
          Color radiates outward from a center point. Great for spotlight effects, depth on card
          backgrounds, and soft glows behind hero content.
        </p>
        <pre><code>{`/* Centered circle glow */
background: radial-gradient(circle at center, #6366f1 0%, transparent 70%);

/* Off-center ellipse for dramatic lighting */
background: radial-gradient(ellipse at 30% 40%, #0ea5e9, #1e293b);

/* Subtle card depth — very low opacity center */
background: radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15), transparent 70%);`}</code></pre>
        <p>
          Positioning the center with <code>at x y</code> lets you push the glow to a corner or
          edge, which works well for dark-mode cards and hero sections where you want depth without
          a heavy background image.
        </p>

        <h3>3. Conic gradients</h3>
        <p>
          Color transitions around a center point like a clock face. Newer and underused, but
          excellent for progress rings, pie-chart-style data visualization, and abstract decorative
          elements.
        </p>
        <pre><code>{`/* Basic color wheel sweep */
background: conic-gradient(from 0deg, #6366f1, #8b5cf6, #ec4899, #6366f1);

/* Two-color pie segment (50% each) */
background: conic-gradient(#6366f1 180deg, #e2e8f0 180deg);

/* Progress ring at 65% */
background: conic-gradient(#6366f1 65%, #e2e8f0 65%);`}</code></pre>
        <p>
          The progress ring pattern is particularly practical: set <code>border-radius: 50%</code>{" "}
          and a fixed width and height to turn any element into a circular progress indicator with
          no SVG or JavaScript. Check the latest support details on{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient" target="_blank" rel="noopener noreferrer">
            MDN Web Docs
          </a>.
        </p>

        <PullQuote>
          A CSS gradient loads in zero milliseconds and scales to any resolution. There&apos;s no reason to
          use a gradient image in 2026.
        </PullQuote>

        <h2>Gradient patterns that work in real products</h2>

        <h3>The hero background gradient</h3>
        <p>
          A subtle, large radial gradient behind your hero section adds depth without distraction.
          Keep it low opacity (10–20%) and use your brand color so it feels intentional rather than
          decorative. Pair it with a white or near-white background so text contrast is never at risk.
        </p>
        <pre><code>{`/* Hero section with radial glow */
.hero {
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.18), transparent),
    #ffffff;
}`}</code></pre>

        <h3>The brand gradient on CTAs</h3>
        <p>
          A diagonal linear gradient on your primary button makes it feel premium and distinct. The
          key is choosing two adjacent hues — blue to violet, orange to pink — rather than jumping
          across the color wheel, which creates a muddy middle.
        </p>
        <pre><code>{`/* Primary CTA button */
.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #ffffff;
  border: none;
}
.btn-primary:hover {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
}`}</code></pre>

        <h3>The text gradient</h3>
        <p>
          Apply a gradient to text with <code>background-clip: text</code>. This technique works
          in all modern browsers and creates a striking headline effect. Use it on one heading per
          page maximum — applied everywhere it loses its impact entirely.
        </p>
        <pre><code>{`/* Gradient headline text */
.gradient-heading {
  background: linear-gradient(135deg, #6366f1, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block; /* Required for background-clip to work on inline elements */
}`}</code></pre>

        <h3>The card border gradient</h3>
        <p>
          Use a gradient on a pseudo-element to create a glowing border effect. The technique uses{" "}
          <code>::before</code> with <code>mask-composite: exclude</code> to reveal only the border
          area of the gradient.
        </p>
        <pre><code>{`/* Gradient border using ::before */
.gradient-card {
  position: relative;
  border-radius: 1rem;
  background: #ffffff;
}
.gradient-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  z-index: -1;
}`}</code></pre>

        <h2>Common mistakes to avoid</h2>
        <ul>
          <li>
            <strong>Too many colors</strong>: gradients with more than 3 stops usually look muddy.
            Two colors, one transition.
          </li>
          <li>
            <strong>Jumping across the color wheel</strong>: blue to orange creates a gray, muddy
            middle. Stay within 60-90° of the color wheel for clean transitions.
          </li>
          <li>
            <strong>Gradients everywhere</strong>: one signature gradient per UI. More than that and
            nothing feels special.
          </li>
          <li>
            <strong>Ignoring dark mode</strong>: gradients that look great in light mode can look
            garish in dark mode. Test both.
          </li>
        </ul>

        <h2>Build gradients without writing code</h2>
        <p>
          Use the <Link href="/tools/css-gradient-generator">CSS Gradient Generator</Link> to build any gradient
          visually and copy the ready-to-use CSS. Adjust angle, colors, stops and opacity with a live
          preview. No design tool, no guesswork. Pair it with the{" "}
          <Link href="/tools/color-palette-generator">Color Palette Generator</Link> to pick colors that work
          together before building the gradient.
        </p>

        <h2>Performance: gradients vs. images</h2>
        <p>
          CSS gradients are rendered by the GPU and have zero file size. A gradient image (even
          compressed) adds HTTP requests and bytes. Always prefer CSS gradients for backgrounds,
          overlays and decorative elements. Only use images when the gradient is photographic or
          extremely complex. If you do need a gradient image, compress it with the{" "}
          <Link href="/tools/image-compressor">Image Compressor</Link> first.
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
          Not directly with <code>transition</code>, browsers can&apos;t interpolate between gradient
          values. The workaround is to animate <code>background-position</code> on an oversized
          gradient, or use <code>@keyframes</code> with opacity transitions between layered gradients.
        </p>
        <h3>What&apos;s the difference between a gradient and a mesh gradient?</h3>
        <p>
          A mesh gradient has multiple color points that blend in 2D space, more like a painted
          surface than a directional transition. Pure CSS mesh gradients aren&apos;t possible yet; they
          require SVG or canvas. For most UI use cases, a well-crafted radial gradient achieves a
          similar effect.
        </p>
        <h3>How do I apply a gradient to text in CSS?</h3>
        <p>
          Set <code>background</code> to your gradient, add <code>-webkit-background-clip: text</code>{" "}
          and <code>background-clip: text</code>, then set <code>color: transparent</code>. The
          gradient shows through the text shape. Use it on one headline per page for maximum impact.
        </p>
        <h3>How many color stops should a gradient have?</h3>
        <p>
          Two stops is almost always enough for a clean result. Three stops work well for more
          complex transitions. More than three usually creates a muddy, cluttered look unless you
          are deliberately building a spectrum effect.
        </p>
        <h3>Should gradients be different in dark mode?</h3>
        <p>
          Yes. A vibrant gradient that looks polished on white can look garish on a dark background.
          In dark mode, reduce opacity using <code>rgba</code> values, or shift to darker, more muted
          tones. Always test both modes before shipping.
        </p>

        <h2>Conclusion: one gradient, used with intent</h2>
        <p>
          Pick one signature gradient for your brand, apply it consistently to your primary CTA and
          hero section, and leave everything else neutral. Open the{" "}
          <Link href="/tools/css-gradient-generator">CSS Gradient Generator</Link> now and build yours. It takes
          under a minute and the CSS is ready to paste.
        </p>
      </BlogPostShell>
    </>
  );
}
