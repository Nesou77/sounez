import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "Image SEO: The Complete Guide to Ranking Your Images on Google (2026) | Sounez",
  description:
    "Alt text, file names, compression, structured data, everything that makes images rank in Google Image Search and improve your page's Core Web Vitals.",
  alternates: { canonical: getSiteUrl() + "/blog/image-seo-guide" },
  openGraph: {
    title: "Image SEO: The Complete Guide (2026)",
    description: "Alt text, file names, compression, everything that makes images rank on Google.",
  },
};

const FAQS = [
  { question: "How long does it take for images to rank in Google Image Search?", answer: "Typically 2 to 8 weeks after Google crawls the page. New sites may take longer. Make sure your page is indexed first, images on non-indexed pages won't rank." },
  { question: "Does image file size affect SEO?", answer: "Yes, indirectly. Large images slow page load, which hurts Core Web Vitals, which is a direct ranking factor. Compress every image before publishing." },
  { question: "Should I use stock photos or original images?", answer: "Original images rank better. Google can't rank the same stock photo twice. Even a simple original graphic or screenshot outperforms a generic stock image for SEO." },
  { question: "What's the most important image SEO factor?", answer: "Alt text and compression are the two highest-leverage factors for most sites. Start there before worrying about structured data." },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="image-seo-guide"
        title="Image SEO: The Complete Guide to Ranking Your Images on Google"
        description="Alt text, file names, compression, structured data, everything that makes images rank in Google Image Search and improve your page's Core Web Vitals."
        articleSection="Productivity"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="image-seo-guide"
        ctaTools={["image-compressor", "word-counter", "qr-code-generator"]}
        title="Image SEO: The Complete Guide to Ranking Your Images on Google"
        excerpt="Most websites treat images as decoration. Google treats them as content. Here's everything you need to know about alt text, file names, compression and structured data to rank in Google Image Search."
      >
        <p>
          Google Image Search drives billions of visits every month. For blogs, e-commerce sites and
          portfolios, it&apos;s a significant traffic source that most creators completely ignore. Getting
          your images to rank isn&apos;t complicated, but it requires doing several small things right,
          consistently.
        </p>
        <p>
          This guide covers every factor that influences image ranking in 2026, from the basics (alt
          text, file names) to the technical (Core Web Vitals, structured data).
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
          Each of these is a free traffic channel that requires zero additional content, just
          properly optimized images you&apos;re already publishing.
        </p>

        <PullQuote>
          A well-optimized image can rank in Google Image Search for years and drive consistent
          traffic to your site.
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

        <h2>3. Image compression: the biggest SEO lever</h2>
        <p>
          Page speed is a direct Google ranking factor via{" "}
          <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer">
            Core Web Vitals
          </a>
          . Images are almost always the heaviest assets on a page. Compressing them is the
          highest-leverage SEO improvement most sites can make.
        </p>
        <p>
          Use the <a href="/image-compressor">Sounez Image Compressor</a>. It runs entirely in your
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
          Image captions are read more than body text, people scan pages and captions catch the eye.
          They&apos;re also indexed by Google. Write descriptive captions that include your keyword
          naturally. Keep them under 20 words using the{" "}
          <a href="/word-counter">Word Counter</a>.
        </p>

        <h2>The image SEO checklist</h2>
        <ol>
          <li>Descriptive, keyword-rich file name (hyphens, lowercase)</li>
          <li>Meaningful alt text (under 125 characters)</li>
          <li>Compressed to under 200 KB with the <a href="/image-compressor">Image Compressor</a></li>
          <li>Resized to actual display dimensions</li>
          <li>WebP format where possible</li>
          <li><code>loading=&quot;lazy&quot;</code> on below-fold images</li>
          <li>Descriptive caption</li>
          <li>Structured data for product/recipe/article images</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <h3>How long does it take for images to rank in Google Image Search?</h3>
        <p>
          Typically 2-8 weeks after Google crawls the page. New sites may take longer. Make sure your
          page is indexed first, images on non-indexed pages won&apos;t rank.
        </p>
        <h3>Does image file size affect SEO?</h3>
        <p>
          Yes, indirectly. Large images slow page load, which hurts Core Web Vitals, which is a
          direct ranking factor. Compress every image before publishing.
        </p>
        <h3>Should I use stock photos or original images?</h3>
        <p>
          Original images rank better. Google can&apos;t rank the same stock photo twice. Even a simple
          original graphic or screenshot outperforms a generic stock image for SEO.
        </p>
        <h3>What&apos;s the most important image SEO factor?</h3>
        <p>
          Alt text and compression are the two highest-leverage factors for most sites. Start there
          before worrying about structured data.
        </p>

        <h2>Conclusion: treat every image as a ranking opportunity</h2>
        <p>
          Image SEO is one of the most underutilized traffic channels in 2026. Compress your images
          with the <a href="/image-compressor">Image Compressor</a>, write real alt text, use
          descriptive file names, and serve the right dimensions. Do this consistently and Google
          Image Search becomes a reliable, compounding traffic source.
        </p>
      </BlogPostShell>
    </>
  );
}
