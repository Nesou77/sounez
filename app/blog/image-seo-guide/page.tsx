import { blogMetadata } from "@/lib/blog-metadata";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";
import Link from "next/link";

export const metadata = blogMetadata("image-seo-guide", {
  title: "Image SEO Guide: Alt Text, File Names and Compression | Sounez",
  description:
    "A practical image SEO guide covering alt text, file names, compression, captions, structured data, and page-speed checks.",
    ogTitle: "Image SEO Guide",
    ogDescription: "Alt text, file names, compression, captions, and other image SEO basics.",
});

const FAQS = [
  { question: "How long does it take for images to appear in Google Image Search?", answer: "It depends on when Google crawls and indexes the page. New sites often take longer, and no optimization can guarantee placement. Submitting a sitemap that includes image URLs can help Google discover them faster." },
  { question: "Does image file size affect SEO?", answer: "Large images can slow a page and hurt user experience. Compression helps page speed, which is a factor in Core Web Vitals and contributes to a better search ranking signal overall." },
  { question: "Should I use stock photos or original images?", answer: "Original images are better for SEO because they are unique to your page and cannot be found elsewhere on the web. Stock photos can still work when they are relevant and properly described, but they add less signal than original photography or custom graphics." },
  { question: "What's the most important image SEO factor?", answer: "Start with useful alt text, sensible file names, appropriate dimensions, and compression. These four basics cover the majority of image SEO for most sites. Structured data is valuable but only after the fundamentals are in place." },
  { question: "What is an image sitemap and do I need one?", answer: "An image sitemap is an XML sitemap that lists image URLs on your site, helping Google discover images that might not be found through regular page crawling. Most CMS platforms generate this automatically. If you host images on a CDN or use JavaScript-rendered images, an image sitemap is especially useful." },
  { question: "Does adding loading='lazy' hurt my LCP score?", answer: "It can if applied to your above-the-fold hero image. The Largest Contentful Paint (LCP) element is usually the hero image, and lazy loading it delays its render. Always use loading='eager' or omit the loading attribute entirely on your hero image. Apply loading='lazy' only to images below the fold." },
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
          Use the <Link href="/tools/image-compressor">Sounez Image Compressor</Link>. It runs entirely in your
          browser, so files never leave your device. Aim for under 200 KB per image. Read the full
          guide on{" "}
          <Link href="/blog/how-to-compress-images">compressing images without losing quality</Link> for the
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
          WebP is 25–35% smaller than JPG at equivalent quality and is supported in every modern
          browser. AVIF compresses even further but has slightly patchier support on older devices.
          Use WebP as your default export format in 2026. The file size savings directly improve
          your Core Web Vitals score, particularly Largest Contentful Paint (LCP) for hero images.
        </p>
        <p>
          When to keep PNG or JPG: use PNG for images that need transparency when WebP is not
          supported by your CMS or upload pipeline. Use JPG only when a platform explicitly requires
          it. In every other case, WebP is the better choice for web publishing.
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
          <Link href="/tools/word-counter">Word Counter</Link>.
        </p>

        <h2>The image SEO checklist</h2>
        <ol>
          <li>Descriptive, keyword-rich file name (hyphens, lowercase)</li>
          <li>Meaningful alt text (under 125 characters)</li>
          <li>Compressed to under 200 KB with the <Link href="/tools/image-compressor">Image Compressor</Link></li>
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
          optimization can guarantee placement. Submitting a sitemap that includes image URLs can
          help Google discover them faster.
        </p>
        <h3>Does image file size affect SEO?</h3>
        <p>
          Large images can slow a page and hurt user experience. Compression helps page speed, which
          is a factor in Core Web Vitals and contributes to a better search ranking signal overall.
        </p>
        <h3>Should I use stock photos or original images?</h3>
        <p>
          Original images are better for SEO because they are unique to your page and cannot be
          found elsewhere. Stock photos can still work when they are relevant and properly described,
          but they add less signal than original photography or custom graphics.
        </p>
        <h3>What&apos;s the most important image SEO factor?</h3>
        <p>
          Start with useful alt text, sensible file names, appropriate dimensions, and compression.
          These four basics cover the majority of image SEO for most sites. Structured data is
          valuable but only after the fundamentals are in place.
        </p>
        <h3>What is an image sitemap and do I need one?</h3>
        <p>
          An image sitemap lists image URLs on your site, helping Google discover images that might
          not be found through regular crawling. Most CMS platforms generate this automatically. If
          you host images on a CDN or use JavaScript-rendered images, an image sitemap is especially
          useful.
        </p>
        <h3>Does adding loading=&quot;lazy&quot; hurt my LCP score?</h3>
        <p>
          It can if applied to your above-the-fold hero image. The Largest Contentful Paint element
          is usually the hero image, and lazy loading it delays its render. Always use{" "}
          <code>loading=&quot;eager&quot;</code> or omit the attribute entirely on your hero image. Apply{" "}
          <code>loading=&quot;lazy&quot;</code> only to images below the fold.
        </p>

        <h2>Conclusion: treat every image as part of the page</h2>
        <p>
          Image SEO works best when images serve the reader first. Compress your images with the{" "}
          <Link href="/tools/image-compressor">Image Compressor</Link>, write real alt text, use descriptive file
          names, and serve the right dimensions. Those habits make pages clearer, faster, and easier
          to understand.
        </p>
      </BlogPostShell>
    </>
  );
}
