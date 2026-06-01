import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "Image SEO Guide: Alt Text, File Names and Compression | Sounez",
  description:
    "A practical image SEO guide covering alt text, file names, compression, captions, structured data, and page-speed checks.",
  alternates: { canonical: getSiteUrl() + "/blog/image-seo-guide" },
  openGraph: {
    title: "Image SEO Guide",
    description: "Alt text, file names, compression, captions, and other image SEO basics.",
  },
};

const FAQS = [
  { question: "How long does it take for images to appear in Google Image Search?", answer: "It depends on when Google crawls and indexes the page. New sites often take longer, and no optimization can guarantee placement." },
  { question: "Does image file size affect SEO?", answer: "Large images can slow a page and hurt user experience. Compression helps page speed, which supports SEO and Core Web Vitals." },
  { question: "Should I use stock photos or original images?", answer: "Original images can be more useful because they show something specific to your page. Stock photos can still work when they are relevant and properly described." },
  { question: "What's the most important image SEO factor?", answer: "Start with useful alt text, sensible file names, appropriate dimensions, and compression. Structured data is helpful after the basics are in place." },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="image-seo-guide"
        title="Image SEO Guide: Alt Text, File Names and Compression"
        description="A practical image SEO guide covering alt text, file names, compression, captions, structured data, and page-speed checks."
        articleSection="Productivity"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="image-seo-guide"
        ctaTools={["image-compressor", "word-counter", "qr-code-generator"]}
        title="Image SEO Guide: Alt Text, File Names and Compression"
        excerpt="Most websites treat images as decoration. Search engines and assistive technology need context. This guide covers alt text, file names, compression, captions, and structured data."
      >
        <p>
          Images can bring useful search traffic, but they also affect accessibility, page speed, and
          how clearly a page communicates. For blogs, stores, and portfolios, image SEO starts with
          doing several small things consistently.
        </p>
        <p>
          This guide covers the practical pieces you can control: alt text, file names, dimensions,
          compression, captions, and structured data.
        </p>

        <h2>Why image SEO matters more than ever</h2>
        <p>
          Google&apos;s search results increasingly include image carousels, visual answers and Google
          Lens results. A well-optimized image can appear in:
        </p>
        <ul>
          <li>Google Image Search (direct traffic)</li>
          <li>Image carousels in regular search results</li>
          <li>Google Discover (visual feed)</li>
          <li>Google Lens results (visual search)</li>
        </ul>
        <p>
          Each of these can help people discover visual content when the image and surrounding page
          are relevant, accessible, and well optimized.
        </p>

        <PullQuote>
          A useful image with clear context has a better chance of being understood by people,
          search engines, and assistive technology.
        </PullQuote>

        <h2>1. File names: your first keyword opportunity</h2>
        <p>
          Google reads file names. <code>IMG_4821.jpg</code> tells it nothing.{" "}
          <code>best-color-palettes-for-web-design-2026.jpg</code> tells it exactly what the image is
          about.
        </p>
        <ul>
          <li>Use lowercase letters and hyphens (not underscores or spaces)</li>
          <li>Include your primary keyword naturally</li>
          <li>Keep it under 5 words, descriptive, not stuffed</li>
          <li>Rename before uploading, you can&apos;t change it after without breaking links</li>
        </ul>

        <h2>2. Alt text: accessibility and SEO in one</h2>
        <p>
          Alt text serves two purposes: it describes the image to screen readers (accessibility) and
          tells Google what the image shows (SEO). Write it for a person who can&apos;t see the image.
          Google&apos;s{" "}
          <a href="https://developers.google.com/search/docs/appearance/google-images" target="_blank" rel="noopener noreferrer">
            Image SEO best practices guide
          </a>{" "}
          specifically recommends writing descriptive, keyword-relevant alt text for every meaningful
          image.
        </p>
        <ul>
          <li>
            <strong>Good</strong>: <code>alt=&quot;Color palette generator showing five harmonious shades of blue&quot;</code>
          </li>
          <li>
            <strong>Bad</strong>: <code>alt=&quot;image&quot;</code> or <code>alt=&quot;color palette generator color palette generator free&quot;</code>
          </li>
          <li>Keep it under 125 characters</li>
          <li>Include your keyword naturally, don&apos;t force it</li>
          <li>Decorative images (dividers, backgrounds) should have empty alt: <code>alt=&quot;&quot;</code></li>
        </ul>

        <h2>3. Image compression: a practical page-speed win</h2>
        <p>
          Page speed matters for users and is part of Google&apos;s Core Web Vitals guidance via{" "}
          <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer">
            Core Web Vitals
          </a>
          . Images are often the heaviest assets on a page, so compression is one of the simplest
          performance checks to add before publishing.
        </p>
        <p>
          Use the <a href="/tools/image-compressor">Sounez Image Compressor</a>. It runs entirely in your
          browser, so files never leave your device. Aim for under 200 KB per image. Read the full
          guide on{" "}
          <a href="/blog/how-to-compress-images">compressing images without losing quality</a> for the
          complete method.
        </p>

        <h2>4. Image dimensions: serve the right size</h2>
        <p>
          Serving a 4000px image in a 800px container wastes bandwidth and hurts Core Web Vitals.
          Resize images to their actual display size before uploading:
        </p>
        <ul>
          <li>Hero images: 1600px wide</li>
          <li>Blog inline images: 1200px wide</li>
          <li>Thumbnails: 400-600px wide</li>
          <li>Open Graph images: 1200x630px</li>
        </ul>

        <h2>5. Modern formats: WebP and AVIF</h2>
        <p>
          WebP is 25-35% smaller than JPG at the same quality and is supported in every modern
          browser. AVIF is even smaller but has patchier support. Use WebP as your default in 2026, 
          the file size savings directly improve your Core Web Vitals score.
        </p>

        <h2>6. Lazy loading: don&apos;t load what isn&apos;t visible</h2>
        <p>
          Add <code>loading=&quot;lazy&quot;</code> to every image below the fold. This defers loading until
          the user scrolls near the image, dramatically improving initial page load time. Your hero
          image should always have <code>loading=&quot;eager&quot;</code> (or no loading attribute), it&apos;s
          your LCP element.
        </p>

        <h2>7. Structured data for images</h2>
        <p>
          For recipes, products and articles, adding <code>ImageObject</code> structured data helps
          Google understand your images and can show rich results in search. At minimum, include the image URL
          in your article or product schema.
        </p>

        <h2>8. Captions: underrated SEO signal</h2>
        <p>
          Captions help readers understand why an image is there. Write descriptive captions that
          add context instead of repeating the headline. Keep them short with the{" "}
          <a href="/tools/word-counter">Word Counter</a>.
        </p>

        <h2>The image SEO checklist</h2>
        <ol>
          <li>Descriptive, keyword-rich file name (hyphens, lowercase)</li>
          <li>Meaningful alt text (under 125 characters)</li>
          <li>Compressed to under 200 KB with the <a href="/tools/image-compressor">Image Compressor</a></li>
          <li>Resized to actual display dimensions</li>
          <li>WebP format where possible</li>
          <li><code>loading=&quot;lazy&quot;</code> on below-fold images</li>
          <li>Descriptive caption</li>
          <li>Structured data for product/recipe/article images</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <h3>How long does it take for images to appear in Google Image Search?</h3>
        <p>
          It depends on when Google crawls and indexes the page. New sites often take longer, and no
          optimization can guarantee placement.
        </p>
        <h3>Does image file size affect SEO?</h3>
        <p>
          Large images can slow a page and hurt user experience. Compression helps page speed, which
          supports SEO and Core Web Vitals.
        </p>
        <h3>Should I use stock photos or original images?</h3>
        <p>
          Original images can be more useful because they show something specific to your page. Stock
          photos can still work when they are relevant and properly described.
        </p>
        <h3>What&apos;s the most important image SEO factor?</h3>
        <p>
          Start with useful alt text, sensible file names, appropriate dimensions, and compression.
          Structured data is helpful after the basics are in place.
        </p>

        <h2>Conclusion: treat every image as part of the page</h2>
        <p>
          Image SEO works best when images serve the reader first. Compress your images with the{" "}
          <a href="/tools/image-compressor">Image Compressor</a>, write real alt text, use descriptive file
          names, and serve the right dimensions. Those habits make pages clearer, faster, and easier
          to understand.
        </p>
      </BlogPostShell>
    </>
  );
}
