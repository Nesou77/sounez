import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";
import { SmartLink as Link } from "@/components/smart-link";

export const metadata: Metadata = {
  title: "How to Write Alt Text for Images: SEO and Accessibility Guide | Sounez",
  description:
    "Learn how to write clear, useful alt text for SEO, accessibility, blog posts, product images, and social media content.",
  alternates: { canonical: getSiteUrl() + "/blog/how-to-write-alt-text-for-images" },
  openGraph: {
    title: "How to Write Alt Text for Images: SEO and Accessibility Guide",
    description:
      "Learn how to write clear, useful alt text for SEO, accessibility, blog posts, product images, and social media content.",
  },
};

const FAQS = [
  {
    question: "How long should alt text be?",
    answer:
      "Aim for one concise sentence, usually under 125 characters. Long enough to convey what matters, short enough that screen readers don't drag on.",
  },
  {
    question: "Should every image have alt text?",
    answer:
      'Every meaningful image needs descriptive alt text. Purely decorative images (dividers, background textures) should use empty alt: alt="" so screen readers skip them.',
  },
  {
    question: "Do keywords in alt text help SEO?",
    answer:
      "Yes, when they describe the image naturally. Google uses alt text to understand image content for Image Search and page relevance. Keyword stuffing hurts more than it helps.",
  },
  {
    question: "Is alt text the same as a caption?",
    answer:
      "No. Alt text is hidden metadata for accessibility and search engines. Captions are visible on the page and can add context, but they don't replace alt text.",
  },
  {
    question: "Can AI write alt text for me?",
    answer:
      "AI tools like the Sounez Image Describer are a strong starting point. Always review the output for accuracy, tone, and whether it matches what the image actually shows.",
  },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="how-to-write-alt-text-for-images"
        title="How to Write Alt Text for Images: SEO and Accessibility Guide"
        description="Learn how to write clear, useful alt text for SEO, accessibility, blog posts, product images, and social media content."
        articleSection="SEO"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="how-to-write-alt-text-for-images"
        ctaTools={["image-describer", "image-compressor"]}
        title="How to Write Alt Text for Images: SEO and Accessibility Guide"
        excerpt="Learn how to write clear, useful alt text for SEO, accessibility, blog posts, product images, and social media content."
      >
        <p>
          Alt text is one of the smallest details on a webpage and one of the highest-impact. A single
          sentence under an image can make your content usable for blind and low-vision visitors,
          help Google understand what you&apos;re publishing, and improve how your visuals appear in
          search. Yet most sites still ship <code>alt=&quot;image&quot;</code>, leave alt empty, or
          paste keyword lists that help nobody.
        </p>
        <p>
          This guide shows you how to write alt text that works for real people and for search, whether
          you&apos;re publishing blog posts, product photos, social graphics, or marketing landing pages.
          You&apos;ll see clear examples, common mistakes, and a faster workflow when you have dozens of
          images to ship.
        </p>

        <h2>What is alt text?</h2>
        <p>
          Alt text (alternative text) is the <code>alt</code> attribute on an <code>&lt;img&gt;</code> tag.
          Screen readers read it aloud so users who can&apos;t see the image still understand its content
          and purpose. Search engines also use it as a primary signal for what an image depicts.
        </p>
        <p>
          Alt text is not a caption, not a file name, and not a place to dump hashtags or marketing
          slogans. It&apos;s a functional description: what is in the image, and why it matters on this
          page. If someone heard only the alt text, they should grasp the same point a sighted reader
          gets from looking at the picture in context.
        </p>
        <PullQuote>
          Good alt text answers one question: if you couldn&apos;t see this image, what would you need
          to know?
        </PullQuote>

        <h2>Why alt text matters for accessibility</h2>
        <p>
          Roughly one billion people worldwide live with some form of disability, and millions rely on
          assistive technology to browse the web. When alt text is missing or useless, images become
          dead zones: a screen reader might say &quot;image&quot; or read a file name like{" "}
          <code>IMG_4821.jpg</code>, which communicates nothing.
        </p>
        <p>
          Strong alt text is required for WCAG compliance and is simply good practice. It also helps
          people on slow connections who disable images, users with cognitive load who prefer text
          summaries, and anyone using voice control. Accessibility isn&apos;t a separate checklist item
          from quality content; it&apos;s part of publishing well.
        </p>
        <ul>
          <li>Describe information the image conveys, not just its category (&quot;chart&quot; vs what the chart shows)</li>
          <li>Match the tone and detail level of the surrounding article</li>
          <li>Use empty <code>alt=&quot;&quot;</code> only for purely decorative images</li>
          <li>Don&apos;t start with &quot;image of&quot; or &quot;picture of&quot; unless the medium itself is relevant</li>
        </ul>

        <h2>Why alt text matters for SEO</h2>
        <p>
          Google&apos;s{" "}
          <a
            href="https://developers.google.com/search/docs/appearance/google-images"
            target="_blank"
            rel="noopener noreferrer"
          >
            image SEO documentation
          </a>{" "}
          recommends descriptive alt text for every meaningful image. Alt text helps Google index your
          visuals in Image Search, supports relevance for the page&apos;s main topic, and pairs with
          file names, compression, and structured data in a full image SEO strategy.
        </p>
        <p>
          Alt text alone won&apos;t rank a thin page, but on a solid article or product page it&apos;s
          one of the easiest wins. For a deeper look at filenames, formats, and Core Web Vitals, read our{" "}
          <Link href="/blog/image-seo-guide">complete image SEO guide</Link>. Fast pages matter too: heavy
          images slow load times, so compress assets with the{" "}
          <Link href="/tools/image-compressor">Image Compressor</Link> before you publish.
        </p>

        <h2>Good vs bad alt text examples</h2>
        <p>
          The difference between helpful and harmful alt text is usually obvious once you see side-by-side
          examples.
        </p>
        <h3>Blog and editorial images</h3>
        <ul>
          <li>
            <strong>Bad</strong>: <code>alt=&quot;blog image&quot;</code>
          </li>
          <li>
            <strong>Good</strong>:{" "}
            <code>alt=&quot;Screenshot of a color palette tool showing five blue shades labeled for web design&quot;</code>
          </li>
        </ul>
        <h3>E-commerce and product photos</h3>
        <ul>
          <li>
            <strong>Bad</strong>: <code>alt=&quot;shoe shoe running shoe buy now&quot;</code>
          </li>
          <li>
            <strong>Good</strong>:{" "}
            <code>alt=&quot;White running shoe with orange sole, side view, on a gray background&quot;</code>
          </li>
        </ul>
        <h3>Charts, screenshots, and UI</h3>
        <ul>
          <li>
            <strong>Bad</strong>: <code>alt=&quot;graph&quot;</code>
          </li>
          <li>
            <strong>Good</strong>:{" "}
            <code>alt=&quot;Bar chart showing email signups rising from 120 in January to 480 in June&quot;</code>
          </li>
        </ul>
        <h3>Social and marketing graphics</h3>
        <ul>
          <li>
            <strong>Bad</strong>: <code>alt=&quot;instagram post&quot;</code>
          </li>
          <li>
            <strong>Good</strong>:{" "}
            <code>alt=&quot;Quote card with text: Start before you feel ready, on a teal gradient background&quot;</code>
          </li>
        </ul>
        <p>
          Notice the pattern: good alt text is specific, factual, and tied to what&apos;s visible. Bad
          alt text is vague, repetitive, or stuffed with keywords that don&apos;t describe the pixels on
          screen.
        </p>

        <h2>How to describe images naturally</h2>
        <p>
          Write alt text the way you&apos;d explain the image to a colleague on a quick call. Lead with
          the subject, add only the details that matter for this page, and stop when the message is clear.
        </p>
        <ol>
          <li>
            <strong>Identify the subject</strong>: who or what is the focus?
          </li>
          <li>
            <strong>Add context</strong>: action, setting, or data that the article references
          </li>
          <li>
            <strong>Include text in the image</strong>: if a headline or label is essential, quote the key phrase
          </li>
          <li>
            <strong>Skip redundant words</strong>: don&apos;t repeat the caption or the H2 right above the image
          </li>
          <li>
            <strong>Stay under ~125 characters</strong> when possible, unless the image is complex (e.g. a detailed diagram)
          </li>
        </ol>
        <p>
          For decorative flourishes (borders, stock textures, spacer graphics), use{" "}
          <code>alt=&quot;&quot;</code> so assistive tech ignores them. For icons that act as buttons,
          describe the action (&quot;Search&quot;, &quot;Close menu&quot;), not the icon shape.
        </p>

        <h2>Generate alt text with AI (Image Describer)</h2>
        <p>
          Writing alt text for ten images is manageable. Writing it for a hundred product SKUs, a
          migrated blog archive, or a weekly content calendar is not. That&apos;s where AI helps, as a
          draft machine, not a replacement for your judgment.
        </p>
        <p>
          The <Link href="/tools/image-describer">Sounez Image Describer</Link> analyzes an uploaded image and
          suggests descriptive alt text you can edit before publishing. It runs in the browser, so your
          files aren&apos;t sent to a random third-party server. Use it to:
        </p>
        <ul>
          <li>Batch-describe product photos with consistent structure</li>
          <li>Get a first pass on screenshots and UI captures</li>
          <li>Reduce blank-alt gaps when you&apos;re under deadline</li>
        </ul>
        <p>
          Always review AI output. Check names, numbers, colors, and whether the description matches why
          the image is on the page. Trim marketing language, fix mistakes, and align tone with your brand.
          Then compress the image with the{" "}
          <Link href="/tools/image-compressor">Image Compressor</Link> so page speed doesn&apos;t undo your SEO
          work.
        </p>

        <h2>Frequently Asked Questions</h2>
        <h3>How long should alt text be?</h3>
        <p>
          Aim for one concise sentence, usually under 125 characters. Long enough to convey what matters,
          short enough that screen readers don&apos;t drag on.
        </p>
        <h3>Should every image have alt text?</h3>
        <p>
          Every meaningful image needs descriptive alt text. Purely decorative images should use empty
          alt: <code>alt=&quot;&quot;</code> so screen readers skip them.
        </p>
        <h3>Do keywords in alt text help SEO?</h3>
        <p>
          Yes, when they describe the image naturally. Google uses alt text for Image Search and page
          relevance. Keyword stuffing hurts more than it helps.
        </p>
        <h3>Is alt text the same as a caption?</h3>
        <p>
          No. Alt text is hidden metadata for accessibility and search engines. Captions are visible on
          the page and can add context, but they don&apos;t replace alt text.
        </p>
        <h3>Can AI write alt text for me?</h3>
        <p>
          AI tools like the <Link href="/tools/image-describer">Image Describer</Link> are a strong starting
          point. Always review the output for accuracy, tone, and whether it matches what the image
          actually shows.
        </p>

        <h2>Final thoughts: small text, big impact</h2>
        <p>
          Alt text takes seconds per image but compounds across every page you publish. Describe what
          viewers would miss, keep it human, and pair descriptions with a solid image SEO workflow. Use
          the <Link href="/tools/image-describer">Image Describer</Link> when you need speed, the{" "}
          <Link href="/tools/image-compressor">Image Compressor</Link> for lean files, and our{" "}
          <Link href="/blog/image-seo-guide">image SEO guide</Link> for the full picture. Your readers and
          Google will both notice the difference.
        </p>
      </BlogPostShell>
    </>
  );
}
