import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";
import { SmartLink as Link } from "@/components/smart-link";

export const metadata: Metadata = {
  title: "Image Optimization Checklist: Compress, Convert, Rename and Describe Images | Sounez",
  description:
    "A complete image optimization checklist covering compression, file formats, filenames, alt text, captions, and background cleanup.",
  alternates: { canonical: getSiteUrl() + "/blog/image-optimization-checklist" },
  openGraph: {
    title: "Image Optimization Checklist: Compress, Convert, Rename and Describe Images",
    description:
      "A complete image optimization checklist covering compression, file formats, filenames, alt text, captions, and background cleanup.",
  },
};

const FAQS = [
  {
    question: "What is the fastest way to optimize images for the web?",
    answer:
      "Pick the right format, resize to display dimensions, compress to under 200 KB, rename with descriptive hyphens, and add alt text before you upload. Doing those five steps once per image prevents most performance and SEO problems.",
  },
  {
    question: "Should I optimize images before or after uploading to WordPress or Shopify?",
    answer:
      "Before. CMS plugins can compress on upload, but they rarely rename files, fix alt text, or convert PNG photos to JPG. A pre-upload checklist gives you full control and smaller originals in your media library.",
  },
  {
    question: "Do I need alt text on every image?",
    answer:
      "Every meaningful image needs descriptive alt text for accessibility and SEO. Purely decorative images (spacers, repeating backgrounds) should use empty alt (alt=\"\") so screen readers skip them.",
  },
  {
    question: "When should I remove an image background?",
    answer:
      "Remove backgrounds for product cutouts, profile photos on colored layouts, logos on hero sections, and marketplace listings. Skip it for full-scene photos where the environment is part of the story.",
  },
  {
    question: "How does image optimization affect SEO?",
    answer:
      "Smaller files improve Core Web Vitals and page speed, which Google uses as ranking signals. Descriptive filenames, alt text, and captions help images appear in Google Image Search and reinforce the page topic.",
  },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="image-optimization-checklist"
        title="Image Optimization Checklist: Compress, Convert, Rename and Describe Images"
        description="A complete image optimization checklist covering compression, file formats, filenames, alt text, captions, and background cleanup."
        articleSection="SEO"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="image-optimization-checklist"
        ctaTools={["image-compressor", "png-to-jpg-converter", "background-remover", "image-describer"]}
        title="Image Optimization Checklist: Compress, Convert, Rename and Describe Images"
        excerpt="A complete image optimization checklist covering compression, file formats, filenames, alt text, captions, and background cleanup."
      >
        <h2>Introduction</h2>
        <p>
          Publishing a blog post, product page, or portfolio without optimizing images is like shipping a
          package with extra weight you pay for on every delivery. Unoptimized photos slow your site,
          hurt accessibility, and waste a free SEO channel in Google Image Search. The fix isn&apos;t one
          magic setting, it&apos;s a short, repeatable checklist you run on every image before it goes live.
        </p>
        <p>
          This guide walks through format choice, compression, filenames, alt text, captions, and
          background cleanup, the six areas that matter most for creators, marketers, and small business
          owners who don&apos;t have a dedicated design team. Use it as your pre-publish routine, and pair it
          with the deeper tactics in our{" "}
          <Link href="/blog/image-seo-guide">Image SEO guide</Link> when you&apos;re ready to go further.
        </p>
        <PullQuote>
          Optimizing an image takes two minutes once. Fixing a slow page or a broken layout after publish
          takes much longer.
        </PullQuote>

        <h2>Choose format</h2>
        <p>
          Format choice sets your ceiling for file size and quality. Pick wrong and you&apos;ll either bloat
          the page (PNG for a photo) or lose transparency (JPG for a logo).
        </p>
        <ul>
          <li>
            <strong>JPG</strong>: photos, hero banners, and any image without transparency. Best balance of
            size and quality at 70–85% compression.
          </li>
          <li>
            <strong>PNG</strong>: logos, icons, screenshots with sharp text, and anything that needs a
            transparent background.
          </li>
          <li>
            <strong>WebP</strong>: default for modern sites when your CMS or build step supports it, often
            25–35% smaller than JPG at the same visual quality.
          </li>
        </ul>
        <p>
          If you&apos;re staring at a 3 MB PNG that&apos;s really a photograph, convert it before you compress.
          The <Link href="/tools/png-to-jpg-converter">PNG to JPG Converter</Link> runs in your browser, so
          nothing uploads to a third-party server. For a full format comparison, see{" "}
          <Link href="/blog/png-vs-jpg-and-how-to-convert-images">PNG vs JPG and how to convert images</Link>.
        </p>

        <h2>Compress before upload</h2>
        <p>
          Compression is the highest-leverage step for page speed. Google&apos;s{" "}
          <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer">
            Core Web Vitals
          </a>{" "}
          treat load performance as a ranking factor, and images are usually the heaviest assets on the
          page. Compress <em>before</em> upload so your CMS, CDN, and backups all store the lean version.
        </p>
        <ul>
          <li>Resize to actual display width first (hero: ~1600px, inline: ~1200px, thumbnails: 400–600px).</li>
          <li>Aim for under 200 KB per image on blogs and marketing pages; up to 300 KB for detailed heroes.</li>
          <li>Use a local, browser-based tool so client work and unreleased designs never leave your device.</li>
        </ul>
        <p>
          Run each file through the <Link href="/tools/image-compressor">Image Compressor</Link>. It processes
          images entirely on your machine, no account and no upload queue. If you&apos;re new to the workflow,
          our <Link href="/blog/how-to-compress-images">how to compress images</Link> guide covers quality
          settings and dimension targets in detail.
        </p>

        <h2>Rename files</h2>
        <p>
          Cameras and design exports default to names like <code>IMG_4821.jpg</code> or{" "}
          <code>export-final-2.png</code>. Search engines read filenames as a weak but real signal of what
          the image shows. Rename on your computer <em>before</em> upload, changing the URL later breaks
          links and cached shares.
        </p>
        <ul>
          <li>Use lowercase letters and hyphens: <code>blueberry-muffin-recipe-hero.jpg</code></li>
          <li>Include the topic or keyword naturally, without stuffing</li>
          <li>Keep names under five words when possible, descriptive beats clever</li>
          <li>Match the filename to the page topic when the image is the main visual</li>
        </ul>
        <p>
          Good filenames also help your future self find assets in Google Drive or Dropbox six months
          later. Treat them like labels on folders, not throwaway metadata.
        </p>

        <h2>Alt text</h2>
        <p>
          Alt text describes the image for people who can&apos;t see it and tells search engines what it
          depicts. Write for a blind reader sitting next to you: what would they need to understand the
          image&apos;s purpose on this page?
        </p>
        <ul>
          <li>
            <strong>Good</strong>:{" "}
            <code>alt=&quot;Hands kneading sourdough on a floured wooden board&quot;</code>
          </li>
          <li>
            <strong>Bad</strong>: <code>alt=&quot;image&quot;</code> or keyword lists repeated three times
          </li>
          <li>Stay under ~125 characters; put the most important detail first</li>
          <li>Don&apos;t start with &quot;image of&quot; or &quot;picture of&quot;, screen readers already announce it as an image</li>
        </ul>
        <p>
          Stuck on wording? Paste the image into the{" "}
          <Link href="/tools/image-describer">Image Describer</Link> for a starting draft, then edit for accuracy
          and tone. You&apos;re responsible for the final alt text, especially on YMYL or product pages where
          a wrong description misleads buyers.
        </p>

        <h2>Captions</h2>
        <p>
          Captions sit below the image and get read more than body copy, people scan, and the caption is
          where their eyes land. Google indexes caption text too, so use it for context, not jokes that
          ignore the page topic.
        </p>
        <ul>
          <li>Explain <em>why</em> the image is on the page, not just what it looks like</li>
          <li>Keep captions short: one sentence, under 20 words when possible</li>
          <li>Align caption keywords with the article&apos;s main topic without forcing repetition</li>
          <li>Skip captions on purely decorative images; alt should be empty instead</li>
        </ul>
        <p>
          A product photo might use alt text for the object (&quot;Stainless steel pour-over kettle with
          gooseneck spout&quot;) and a caption for the benefit (&quot;The gooseneck spout gives you control for
          even extraction&quot;). That split helps both accessibility and SEO without sounding robotic.
        </p>

        <h2>Remove backgrounds</h2>
        <p>
          Not every image needs a cutout, but when it does, a messy or default white box behind a logo
          screams &quot;template.&quot; Remove backgrounds for ecommerce product shots, team headshots on branded
          color blocks, app store graphics, and social ads where the subject should float on your layout.
        </p>
        <p>
          Use the <Link href="/tools/background-remover">Background Remover</Link> for quick cutouts in the
          browser. Export as PNG if you need transparency on the site; convert to JPG only when you&apos;re
          placing the subject on a solid color background you control. Always check edges on hair, glass,
          and fine details, automated tools are fast, but a thirty-second manual touch-up still wins on
          hero images.
        </p>

        <h2>Final checklist</h2>
        <p>Run this numbered list on every image before you hit publish:</p>
        <ol>
          <li>
            <strong>Format</strong>: JPG or WebP for photos; PNG for transparency; convert stray PNG photos
            with the <Link href="/tools/png-to-jpg-converter">PNG to JPG Converter</Link>.
          </li>
          <li>
            <strong>Dimensions</strong>: resize to the width the image will actually display, not the camera
            default.
          </li>
          <li>
            <strong>Compression</strong>: under 200 KB for most web images using the{" "}
            <Link href="/tools/image-compressor">Image Compressor</Link>.
          </li>
          <li>
            <strong>Filename</strong>: lowercase, hyphens, descriptive (e.g.{" "}
            <code>team-retreat-2026-group-photo.jpg</code>).
          </li>
          <li>
            <strong>Alt text</strong>: accurate, concise, written for humans first; draft with the{" "}
            <Link href="/tools/image-describer">Image Describer</Link> if needed.
          </li>
          <li>
            <strong>Caption</strong>: one clear sentence when the image carries information or proof.
          </li>
          <li>
            <strong>Background</strong>: remove only when transparency or a clean cutout improves the
            design, via the <Link href="/tools/background-remover">Background Remover</Link>.
          </li>
          <li>
            <strong>Lazy loading</strong>: add <code>loading=&quot;lazy&quot;</code> below the fold; keep the hero
            image eager for Core Web Vitals.
          </li>
          <li>
            <strong>SEO review</strong>: confirm the image supports the page topic and read the{" "}
            <Link href="/blog/image-seo-guide">Image SEO guide</Link> for advanced signals.
          </li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <h3>What is the fastest way to optimize images for the web?</h3>
        <p>
          Pick the right format, resize to display dimensions, compress to under 200 KB, rename with
          descriptive hyphens, and add alt text before you upload. Doing those five steps once per image
          prevents most performance and SEO problems.
        </p>
        <h3>Should I optimize images before or after uploading to WordPress or Shopify?</h3>
        <p>
          Before. CMS plugins can compress on upload, but they rarely rename files, fix alt text, or
          convert PNG photos to JPG. A pre-upload checklist gives you full control and smaller originals in
          your media library.
        </p>
        <h3>Do I need alt text on every image?</h3>
        <p>
          Every meaningful image needs descriptive alt text for accessibility and SEO. Purely decorative
          images (spacers, repeating backgrounds) should use empty alt (<code>alt=&quot;&quot;</code>) so screen
          readers skip them.
        </p>
        <h3>When should I remove an image background?</h3>
        <p>
          Remove backgrounds for product cutouts, profile photos on colored layouts, logos on hero sections,
          and marketplace listings. Skip it for full-scene photos where the environment is part of the
          story.
        </p>
        <h3>How does image optimization affect SEO?</h3>
        <p>
          Smaller files improve Core Web Vitals and page speed, which Google uses as ranking signals.
          Descriptive filenames, alt text, and captions help images appear in Google Image Search and
          reinforce the page topic.
        </p>

        <h2>Put the checklist into practice</h2>
        <p>
          You don&apos;t need Photoshop or a paid plugin stack to ship optimized images. Open the{" "}
          <Link href="/tools/image-compressor">Image Compressor</Link> for size, the{" "}
          <Link href="/tools/png-to-jpg-converter">PNG to JPG Converter</Link> for format fixes, the{" "}
          <Link href="/tools/background-remover">Background Remover</Link> for clean cutouts, and the{" "}
          <Link href="/tools/image-describer">Image Describer</Link> when alt text needs a strong first draft.
          All four run in your browser, free, with no upload required. Make this checklist a habit and
          every page you publish will load faster, read better, and stand a better chance in image search.
        </p>
      </BlogPostShell>
    </>
  );
}
