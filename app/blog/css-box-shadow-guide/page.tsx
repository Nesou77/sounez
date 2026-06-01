import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CSS Box Shadow Guide: How to Create Better Shadows (2026) | Sounez",
  description:
    "Learn how CSS box-shadow works and how to create soft, modern shadows for cards, buttons and UI elements. Includes a free visual shadow generator.",
  alternates: { canonical: getSiteUrl() + "/blog/css-box-shadow-guide" },
  openGraph: {
    title: "CSS Box Shadow Guide: How to Create Better Shadows",
    description: "Box-shadow syntax, soft vs strong shadows, UI examples and a free visual generator.",
  },
};

const FAQS = [
  { question: "What is the CSS box-shadow property?", answer: "box-shadow adds one or more shadow effects around an element's frame. It accepts horizontal offset, vertical offset, blur radius, spread radius, color and an optional inset keyword." },
  { question: "Can I add multiple shadows to one element?", answer: "Yes. Separate multiple shadow values with commas. For example: box-shadow: 0 2px 8px rgba(0,0,0,0.1), 0 8px 32px rgba(0,0,0,0.08);" },
  { question: "What is an inset shadow?", answer: "An inset shadow appears inside the element rather than outside. It is useful for creating pressed button effects, inner glow effects and depth on input fields." },
  { question: "Does box-shadow affect layout?", answer: "No. box-shadow does not affect the layout or size of the element. It is purely visual and does not push other elements away." },
  { question: "Is the Box Shadow Generator free?", answer: "Yes. The Sounez Box Shadow Generator is free to use and does not require an account." },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="css-box-shadow-guide"
        title="CSS Box Shadow Guide: How to Create Better Shadows"
        description="Learn how CSS box-shadow works and how to create soft, modern shadows for cards, buttons and UI elements. Includes a free visual shadow generator."
        articleSection="Design Tools"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="css-box-shadow-guide"
        ctaTools={["box-shadow-generator", "css-gradient-generator", "color-palette-generator"]}
        title="CSS Box Shadow Guide: How to Create Better Shadows"
        excerpt="Shadows add depth, hierarchy and polish to UI elements. Here&apos;s how CSS box-shadow works, when to use it and how to create shadows that look professional."
      >
        <p>
          Shadows are one of the most powerful tools in UI design. Used well, they create depth,
          establish visual hierarchy and make interfaces feel tangible. Used poorly, they make designs
          look dated, heavy or amateurish.
        </p>
        <p>
          This guide covers the CSS <code>box-shadow</code> syntax, the difference between soft and
          strong shadows, practical UI examples, accessibility considerations and how to use the{" "}
          <Link href="/tools/box-shadow-generator">Box Shadow Generator</Link> to design shadows visually.
        </p>

        <h2>What is box-shadow in CSS?</h2>
        <p>
          The <code>box-shadow</code> property adds one or more shadow effects around an element&apos;s
          frame. It does not affect layout, it is purely visual.
        </p>

        <h2>Box-shadow syntax explained</h2>
        <pre className="overflow-x-auto rounded-xl bg-muted/60 p-4 text-xs leading-relaxed">
          <code>{`box-shadow: [inset] <offset-x> <offset-y> <blur-radius> <spread-radius> <color>;`}</code>
        </pre>
        <ul>
          <li><strong>inset</strong> (optional), Makes the shadow appear inside the element.</li>
          <li><strong>offset-x</strong>: Horizontal offset. Positive moves right, negative moves left.</li>
          <li><strong>offset-y</strong>: Vertical offset. Positive moves down, negative moves up.</li>
          <li><strong>blur-radius</strong>: How blurry the shadow is. 0 = sharp edge. Higher = softer.</li>
          <li><strong>spread-radius</strong>: Expands or contracts the shadow. Negative values shrink it.</li>
          <li><strong>color</strong>: The shadow color. Use rgba() for transparency control.</li>
        </ul>

        <h3>Common examples</h3>
        <pre className="overflow-x-auto rounded-xl bg-muted/60 p-4 text-xs leading-relaxed">
          <code>{`/* Soft card shadow */
box-shadow: 0 4px 24px -4px rgba(0, 0, 0, 0.12);

/* Medium elevation */
box-shadow: 0 8px 32px -4px rgba(0, 0, 0, 0.18);

/* Sharp drop shadow */
box-shadow: 4px 4px 0 0 rgba(0, 0, 0, 0.25);

/* Inner shadow (pressed state) */
box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.15);

/* Multiple shadows */
box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06);`}</code>
        </pre>

        <PullQuote>
          The best shadows are the ones you barely notice. Subtlety is the mark of a polished UI.
        </PullQuote>

        <h2>Soft shadows vs strong shadows</h2>

        <h3>Soft shadows (modern, minimal)</h3>
        <p>
          Soft shadows use a large blur radius, negative spread and low opacity. They create a sense
          of gentle elevation without drawing attention to themselves. This is the dominant style in
          modern UI design.
        </p>
        <pre className="overflow-x-auto rounded-xl bg-muted/60 p-4 text-xs">
          <code>{`box-shadow: 0 4px 24px -4px rgba(0, 0, 0, 0.10);`}</code>
        </pre>

        <h3>Strong shadows (dramatic, retro)</h3>
        <p>
          Strong shadows use a small blur radius, high opacity and sometimes a colored shadow. They
          create a bold, graphic effect. Common in retro-inspired designs and neo-brutalism.
        </p>
        <pre className="overflow-x-auto rounded-xl bg-muted/60 p-4 text-xs">
          <code>{`box-shadow: 4px 4px 0 0 #000000;`}</code>
        </pre>

        <h2>UI examples: where to use shadows</h2>
        <ul>
          <li><strong>Cards</strong>: A soft shadow lifts the card off the background, making it feel interactive.</li>
          <li><strong>Buttons</strong>: A subtle shadow on a primary button adds depth and makes it feel pressable.</li>
          <li><strong>Modals and dropdowns</strong>: A larger shadow creates the illusion of the element floating above the page.</li>
          <li><strong>Input fields</strong>: An inset shadow on a focused input creates a subtle pressed effect.</li>
          <li><strong>Navigation bars</strong>: A thin bottom shadow separates the nav from the page content.</li>
        </ul>

        <h2>Accessibility and readability tips</h2>
        <ul>
          <li><strong>Do not rely on shadows alone for contrast</strong>: Users with visual impairments or high-contrast mode may not see shadows. Use borders or background color differences as well.</li>
          <li><strong>Avoid colored shadows on text</strong>: Colored shadows on text can reduce readability. Use them only on decorative elements.</li>
          <li><strong>Test in dark mode</strong>: Shadows that look great on white backgrounds can disappear or look wrong on dark backgrounds. Use lighter shadow colors in dark mode.</li>
        </ul>

        <h2>How to use the Box Shadow Generator</h2>
        <ol>
          <li>Open the <Link href="/tools/box-shadow-generator">Box Shadow Generator</Link>.</li>
          <li>Start with a preset (Soft, Medium, Large, Sharp or Inner) to get a good starting point.</li>
          <li>Adjust the sliders: horizontal offset, vertical offset, blur radius, spread radius and opacity.</li>
          <li>Change the shadow color and background color to match your design.</li>
          <li>Enable Inset to create an inner shadow effect.</li>
          <li>Copy the generated CSS and paste it into your stylesheet.</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <h3>What is the CSS box-shadow property?</h3>
        <p>box-shadow adds one or more shadow effects around an element&apos;s frame. It accepts horizontal offset, vertical offset, blur radius, spread radius, color and an optional inset keyword.</p>
        <h3>Can I add multiple shadows to one element?</h3>
        <p>Yes. Separate multiple shadow values with commas. Layering two shadows (one tight, one diffuse) creates a more realistic depth effect.</p>
        <h3>What is an inset shadow?</h3>
        <p>An inset shadow appears inside the element rather than outside. It is useful for pressed button effects, inner glow effects and depth on input fields.</p>
        <h3>Does box-shadow affect layout?</h3>
        <p>No. box-shadow does not affect the layout or size of the element. It is purely visual.</p>
        <h3>Is the Box Shadow Generator free?</h3>
        <p>Yes. The <Link href="/tools/box-shadow-generator">Sounez Box Shadow Generator</Link> is free to use and does not require an account.</p>

        <h2>Conclusion: subtle depth, big impact</h2>
        <p>
          The best shadows are the ones users feel rather than see. They create depth and hierarchy
          without drawing attention to themselves. Open the{" "}
          <Link href="/tools/box-shadow-generator">Box Shadow Generator</Link>, start with the Soft preset, and
          adjust until it feels right. For the full design toolkit, pair it with the{" "}
          <Link href="/tools/css-gradient-generator">CSS Gradient Generator</Link> and the{" "}
          <Link href="/tools/color-palette-generator">Color Palette Generator</Link>.
        </p>
      </BlogPostShell>
    </>
  );
}
