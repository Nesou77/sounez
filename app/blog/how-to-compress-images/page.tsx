import { getSiteUrl } from "@/lib/site-url";
import { blogMetadata } from "@/lib/blog-metadata";
import { BlogPostShell } from "@/components/BlogPostShell";
import { BlogImage, PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";
import Link from "next/link";

export const metadata = blogMetadata("how-to-compress-images", {
  title: "How to Compress Images Without Losing Quality (2026 Guide) | Sounez",
  description:
    "A practical 2026 guide to compressing images for the web. Compare JPG, PNG, WebP, image dimensions, and browser-based privacy.",
    ogTitle: "How to Compress Images Without Losing Quality",
    ogDescription: "Smaller files can make pages faster. Learn formats, dimensions, and safe browser-based compression.",
});

const FAQS = [
  { question: "Will compression ruin image quality?", answer: "Not if you choose sensible settings and preview the result. For many web photos, 70-80% JPG quality is a good starting point." },
  { question: "Is browser-based compression safe?", answer: "Yes. The Sounez Image Compressor processes everything locally in your browser. Nothing is uploaded, logged or stored." },
  { question: "Should I use WebP everywhere?", answer: "WebP is a good default for many web images in modern browsers. Keep PNG when you need transparency and JPG when a platform requires it." },
  { question: "Does image compression help SEO?", answer: "It can. Smaller image files often improve load time and Core Web Vitals, which supports a better search and user experience." },
  { question: "What is the difference between lossy and lossless compression?", answer: "Lossy compression (JPG, WebP at quality < 100) permanently removes some image data to achieve smaller files. Lossless compression (PNG, WebP at 100%) reduces file size without removing any data, so quality is preserved exactly. Lossy is almost always better for web photos." },
  { question: "How do I know if my image is too large?", answer: "Check the file size before upload. For most web images, anything over 500 KB should be compressed. Images over 1 MB on a blog or landing page are almost always a problem for load time." },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="how-to-compress-images"
        title="How to Compress Images Without Losing Quality"
        description="A practical 2026 guide to compressing images for the web. Compare JPG, PNG, WebP, image dimensions, and browser-based privacy."
        articleSection="Productivity"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="how-to-compress-images"
        ctaTools={["image-compressor", "qr-code-generator", "word-counter"]}
        title="How to Compress Images Without Losing Quality"
        excerpt="Heavy images are a common reason websites feel slow. Learn how to compress them without sacrificing useful detail or privacy."
      >
        <p>
          If your blog, portfolio or landing page feels sluggish, images are almost certainly the
          culprit. A single uncompressed photo can weigh more than the entire rest of the page combined.
          The good news: compressing images well is usually quick once you know which format and
          dimensions the page actually needs.
        </p>
        <p>
          This guide covers the formats that matter in 2026, the right dimensions for the web, and how
          to compress safely without uploading your files to sketchy third-party servers.
        </p>

        <BlogImage src="/blog/how-to-compress-images-bg.webp" alt="Before and after image compression comparison" caption="A smaller image can still look clean when resized and compressed carefully." />

        <h2>Why image compression matters more than ever</h2>
        <p>
          Google&apos;s{" "}
          <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer">
            Core Web Vitals
          </a>{" "}
          measure loading performance, and the largest image on the screen (your &quot;LCP element&quot;)
          often has a major effect on the score. Compressing your images is a practical performance
          habit to add before publishing.
        </p>
        <PullQuote>Start with the size the page needs, then compress until quality starts to suffer.</PullQuote>
        <h2>JPG vs PNG vs WebP: which format should you use?</h2>
        <ul>
          <li><strong>JPG</strong>: best for photos and any image with smooth gradients. Tiny file sizes at 70-80% quality.</li>
          <li><strong>PNG</strong>: use only when you need transparency (logos, icons, UI elements). Otherwise it&apos;s just a heavier JPG.</li>
          <li><strong>WebP</strong>: a strong default for many web photos and graphics in modern browsers.</li>
          <li><strong>AVIF</strong>: often smaller than WebP, but support and tooling vary. Test before relying on it.</li>
        </ul>

        <h2>The right dimensions: stop uploading 4000-pixel images</h2>
        <ul>
          <li>Hero images: 1600px wide</li>
          <li>Inline blog images: 1200px wide</li>
          <li>Thumbnails: 600px wide</li>
          <li>Open Graph / social cards: 1200x630px</li>
        </ul>

        <h2>Use a browser-based compressor (and never upload to random sites)</h2>
        <p>
          Most free image compressors upload your files to their servers. That&apos;s a privacy risk for
          anything sensitive (product mockups, client work, unreleased designs). Use the{" "}
          <Link href="/tools/image-compressor">Sounez Image Compressor</Link> instead. It runs entirely in your
          browser, so your files never leave your device. No account and no upload to Sounez.
        </p>

        <h2>Aim for under 200 KB per image</h2>
        <p>
          For many blog and landing-page images, 150-300 KB is a reasonable target after resizing.
          Detailed hero images may need more. The goal is not a magic number; it is a file that looks
          good at the size where it appears.
        </p>

        <h2>How to handle specific image types</h2>
        <p>
          Different image categories have different compression goals:
        </p>
        <ul>
          <li>
            <strong>Blog hero images</strong>: High visual quality matters here since it is the first
            impression. Target 150-250 KB. Use WebP at 80-85% quality or JPG at 75-80%.
          </li>
          <li>
            <strong>Product photos</strong>: Shoppers zoom in, so preserve detail. Use JPG at 80-85%
            or WebP. Keep at 100-200 KB per image. Consider separate compressed thumbnails for
            listing pages and higher-quality versions for product detail pages.
          </li>
          <li>
            <strong>Thumbnails and avatars</strong>: These display small, so aggressive compression
            is fine. Target 15-40 KB. WebP at 70% quality is excellent here.
          </li>
          <li>
            <strong>Logos and icons</strong>: Use SVG whenever possible — infinitely scalable, zero
            quality loss, tiny file size. Reserve PNG only when SVG is not an option.
          </li>
          <li>
            <strong>Social media preview images (Open Graph)</strong>: These are served by Facebook,
            LinkedIn and Twitter, which re-compress them anyway. 100-200 KB at 80% quality is more
            than sufficient.
          </li>
          <li>
            <strong>Screenshot documentation</strong>: PNG is often better here to preserve text
            legibility. Compress losslessly using a PNG optimizer.
          </li>
        </ul>

        <h2>Batch compressing multiple images</h2>
        <p>
          If you are publishing a post with 5-10 images, compress them one by one with the{" "}
          <Link href="/tools/image-compressor">Image Compressor</Link> before uploading. A practical
          workflow for batch work:
        </p>
        <ol>
          <li>Export all images from your camera or design tool at the target dimensions.</li>
          <li>Rename files with descriptive, keyword-rich names before compressing (filenames are SEO signals).</li>
          <li>Open the Image Compressor in a browser tab and drag in each image in turn.</li>
          <li>Download the compressed version. Replace the original in your upload folder.</li>
          <li>Add alt text to each image in your CMS before publishing.</li>
        </ol>

        <h2>A complete pre-publish image checklist</h2>
        <ol>
          <li>Resize to the actual display width (use the table above)</li>
          <li>Convert PNG to JPG unless you need transparency</li>
          <li>Compress with the <Link href="/tools/image-compressor">Image Compressor</Link></li>
          <li>Add descriptive, keyword-rich file names</li>
          <li>Write real alt text for accessibility and SEO</li>
          <li>Use <code>loading=&quot;lazy&quot;</code> on below-the-fold images</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <h3>Will compression ruin image quality?</h3>
        <p>Not if you choose sensible settings and preview the result. For many web photos, 70-80% JPG quality is a good starting point.</p>
        <h3>Is browser-based compression safe?</h3>
        <p>Yes. The <Link href="/tools/image-compressor">Sounez Image Compressor</Link> processes everything locally in your browser. Nothing is uploaded, logged or stored.</p>
        <h3>Should I use WebP everywhere?</h3>
        <p>WebP is a good default for many web images in modern browsers. Keep PNG when you need transparency and JPG when a platform requires it.</p>
        <h3>Does image compression help SEO?</h3>
        <p>It can. Smaller image files often improve load time and Core Web Vitals, which supports a better search and user experience.</p>

        <h3>What is the difference between lossy and lossless compression?</h3>
        <p>Lossy compression (JPG, WebP at quality below 100) permanently removes some image data to achieve smaller files. Lossless compression (PNG, WebP at 100%) reduces file size without removing any data. Lossy is almost always better for web photos since the removed data is rarely visible at 75-85% quality.</p>
        <h3>How do I know if my image is too large?</h3>
        <p>Check the file size before upload. For most web images, anything over 500 KB should be compressed. Images over 1 MB on a blog or landing page almost always hurt load time noticeably. Open the <Link href="/tools/image-compressor">Image Compressor</Link> before any upload.</p>

        <h2>Conclusion: compress every image before you publish</h2>
        <p>
          Make compression a non-negotiable step in your publishing workflow. Open the{" "}
          <Link href="/tools/image-compressor">Image Compressor</Link> now and run your next image through it.
          You&apos;ll be surprised how much smaller it gets.
        </p>
      </BlogPostShell>
    </>
  );
}
