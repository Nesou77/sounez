import { blogMetadata } from "@/lib/blog-metadata";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";
import Link from "next/link";

export const metadata = blogMetadata("how-to-create-a-favicon-for-your-website", {
  title: "How to Create a Favicon for Your Website Guide",
  description:
    "Learn what a favicon is, why it matters for branding, recommended favicon sizes and how to create one free in your browser.",
    ogTitle: "How to Create a Favicon for Your Website",
    ogDescription: "Favicon sizes, PNG vs ICO, common mistakes and a free browser-based favicon generator.",
});

const FAQS = [
  { question: "What is a favicon?", answer: "A favicon is the small icon shown in browser tabs, bookmarks, search results and home screen shortcuts. It is typically 16x16 or 32x32 pixels." },
  { question: "Do I need an ICO file?", answer: "Not anymore. Modern browsers support PNG favicons. An ICO file is only needed for very old browsers. Use PNG with the correct HTML link tag and you will cover 99% of users." },
  { question: "What size should a favicon be?", answer: "Create at least a 32x32 PNG for browser tabs and a 180x180 PNG for Apple touch icons. A 512x512 version is useful for PWA manifests and high-DPI displays." },
  { question: "Does the Favicon Generator upload my image?", answer: "No. Everything is processed locally in your browser using the Canvas API. Your image never leaves your device." },
  { question: "Can I use an emoji as a favicon?", answer: "Yes. Emoji favicons are a popular modern technique. The Favicon Generator supports emoji mode directly." },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="how-to-create-a-favicon-for-your-website"
        title="How to Create a Favicon for Your Website"
        description="Learn what a favicon is, why it matters for branding, recommended favicon sizes and how to create one free in your browser."
        articleSection="Design Tools"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="how-to-create-a-favicon-for-your-website"
        ctaTools={["favicon-generator", "color-palette-generator", "image-compressor"]}
        title="How to Create a Favicon for Your Website"
        excerpt="A favicon is the first visual element users see when they open your site in a tab. Here&apos;s everything you need to know about sizes, formats and how to create one in minutes."
      >
        <p>
          A favicon is a small thing with a big impact. It appears in browser tabs, bookmarks, search
          results, home screen shortcuts and browser history. A missing or blurry favicon signals an
          unfinished website. A clean, recognizable one reinforces your brand every time someone
          switches tabs.
        </p>
        <p>
          This guide covers what a favicon is, why it matters, the sizes you need, the PNG vs ICO
          debate, and how to create one using the{" "}
          <Link href="/tools/favicon-generator">free Favicon Generator</Link> in under two minutes.
        </p>

        <h2>What is a favicon?</h2>
        <p>
          The word &quot;favicon&quot; comes from &quot;favorite icon&quot;, it was originally the icon shown when
          you bookmarked a page in Internet Explorer. Today it appears in:
        </p>
        <ul>
          <li>Browser tabs (the tiny icon next to the page title)</li>
          <li>Bookmarks and reading lists</li>
          <li>Browser history</li>
          <li>Search engine results (some engines show it next to the URL)</li>
          <li>Home screen shortcuts on iOS and Android</li>
          <li>Progressive Web App (PWA) icons</li>
        </ul>

        <h2>Why favicons matter for branding</h2>
        <p>
          Most users have 10-20 tabs open at once. A recognizable favicon is how they find your site
          again without reading the full title. It is also a trust signal, a site without a favicon
          looks unfinished or abandoned.
        </p>

        <PullQuote>
          A favicon is the smallest piece of your brand identity. It shows up everywhere your URL does.
        </PullQuote>

        <h2>Recommended favicon sizes</h2>
        <ul>
          <li><strong>16x16px</strong>: Standard browser tab icon</li>
          <li><strong>32x32px</strong>: High-DPI browser tabs, taskbar shortcuts</li>
          <li><strong>48x48px</strong>: Windows site icons</li>
          <li><strong>180x180px</strong>: Apple touch icon (iOS home screen)</li>
          <li><strong>512x512px</strong>: PWA manifest, Android home screen</li>
        </ul>
        <p>
          At minimum, create a 32x32 PNG for browser tabs and a 180x180 PNG for Apple touch icons.
          The <Link href="/tools/favicon-generator">Favicon Generator</Link> lets you export any of these sizes
          with one click.
        </p>

        <h2>PNG favicon vs ICO favicon</h2>
        <p>
          The original favicon format was ICO, a Windows icon container that can hold multiple sizes
          in one file. For years, browsers required an ICO file at the root of the domain
          (<code>/favicon.ico</code>).
        </p>
        <p>
          Today, all modern browsers support PNG favicons declared with a <code>&lt;link&gt;</code>{" "}
          tag. PNG is simpler to create, easier to optimize, and works everywhere that matters. The
          only reason to still provide a <code>/favicon.ico</code> is for very old browsers and
          automated tools that request it by default.
        </p>
        <p>
          The recommended approach: provide a PNG favicon via the HTML link tag, and
          optionally place a 32x32 ICO at <code>/favicon.ico</code> as a fallback.
        </p>

        <h2>The HTML snippet you need</h2>
        <p>Add these lines to the <code>&lt;head&gt;</code> of your HTML:</p>
        <pre className="overflow-x-auto rounded-xl bg-muted/60 p-4 text-xs leading-relaxed">
          <code>{`<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`}</code>
        </pre>
        <p>
          The <Link href="/tools/favicon-generator">Favicon Generator</Link> copies this snippet for you with
          one click.
        </p>

        <h2>How to use the Favicon Generator</h2>
        <ol>
          <li>Open the <Link href="/tools/favicon-generator">Favicon Generator</Link>.</li>
          <li>Choose a mode: Text (a letter or initials), Emoji, or Image upload.</li>
          <li>Set your background color, text/icon color, and shape (square, rounded or circle).</li>
          <li>Select the export size you need (32x32 for browser tabs, 180x180 for Apple touch).</li>
          <li>Click Download PNG to save the file.</li>
          <li>Click Copy HTML snippet and paste it into your site&apos;s <code>&lt;head&gt;</code>.</li>
        </ol>

        <h2>Favicon design best practices</h2>
        <p>
          Designing for 32x32 pixels is an entirely different discipline from regular graphic design.
          Every pixel is visible at that scale. Here is how to approach it:
        </p>
        <ul>
          <li>
            <strong>Use a single letter or monogram</strong>: The first letter of your brand name, set
            in a bold font, is one of the most reliable favicon approaches. It reads clearly at any size
            and instantly identifies the brand. Pick a font weight that fills the space well.
          </li>
          <li>
            <strong>Use a simplified icon or symbol</strong>: If your logo has a distinctive mark or
            symbol, isolate it and remove all detail that won&apos;t be visible at small sizes. Thin lines,
            fine gradients and small text all disappear at 32x32.
          </li>
          <li>
            <strong>Use an emoji</strong>: Emoji favicons are a fast, modern alternative. They render
            crisply at all sizes and communicate personality without graphic design effort. Many
            successful SaaS products and personal sites use emoji favicons.
          </li>
          <li>
            <strong>Background matters</strong>: A colored background behind your letter or icon helps
            it stand out in a browser tab against both light and dark browser chrome. Rounded corners
            and circle shapes feel modern and integrate well with tab designs.
          </li>
          <li>
            <strong>Test in a real browser tab</strong>: The <Link href="/tools/favicon-generator">Favicon Generator</Link>{" "}
            shows a real-time preview, but always test the downloaded file in an actual browser tab
            before publishing. The tiny scale reveals issues that are invisible in the generator preview.
          </li>
        </ul>

        <h2>Progressive Web App (PWA) icons</h2>
        <p>
          If your site is or will become a Progressive Web App — a site that can be installed on a
          device like a native app — you need additional icon sizes declared in your web app manifest:
        </p>
        <pre className="overflow-x-auto rounded-xl bg-muted/60 p-4 text-xs leading-relaxed">
          <code>{`{
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}`}</code>
        </pre>
        <p>
          Generate both sizes with the <Link href="/tools/favicon-generator">Favicon Generator</Link> and
          reference them in your <code>manifest.json</code>. The 512x512 version is also used by
          Android home screens and Google Search on mobile.
        </p>

        <h2>Common favicon mistakes to avoid</h2>
        <ul>
          <li><strong>Too much detail</strong>: At 16x16px, complex logos become unreadable. Use a single letter, symbol or simple shape.</li>
          <li><strong>No contrast</strong>: A light icon on a white background disappears in browser tabs. Use strong contrast.</li>
          <li><strong>Wrong size</strong>: Uploading a 16x16 image and expecting it to look good at 180x180 will result in a blurry icon. Generate each size separately.</li>
          <li><strong>Forgetting the Apple touch icon</strong>: iOS users who add your site to their home screen will see a blank icon if you skip the 180x180 version.</li>
          <li><strong>Not updating after a rebrand</strong>: Old favicons cached in browsers can confuse returning users after a brand refresh.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>What is a favicon?</h3>
        <p>A favicon is the small icon shown in browser tabs, bookmarks, search results and home screen shortcuts.</p>
        <h3>Do I need an ICO file?</h3>
        <p>Not anymore. Modern browsers support PNG favicons. Use PNG with the correct HTML link tag and you will cover 99% of users.</p>
        <h3>What size should a favicon be?</h3>
        <p>Create at least a 32x32 PNG for browser tabs and a 180x180 PNG for Apple touch icons.</p>
        <h3>Does the Favicon Generator upload my image?</h3>
        <p>No. Everything is processed locally in your browser using the Canvas API. Your image never leaves your device.</p>
        <h3>Can I use an emoji as a favicon?</h3>
        <p>Yes. Emoji favicons are a popular modern technique. The <Link href="/tools/favicon-generator">Favicon Generator</Link> supports emoji mode directly.</p>

        <h2>Conclusion: two minutes, done</h2>
        <p>
          A favicon is one of the quickest wins in web development. Open the{" "}
          <Link href="/tools/favicon-generator">Favicon Generator</Link>, pick a letter or emoji, choose your
          brand color, download the PNG and paste the HTML snippet. Your site will look finished in
          every tab, bookmark and search result. Pair it with a consistent color palette from the{" "}
          <Link href="/tools/color-palette-generator">Color Palette Generator</Link> for a cohesive brand identity.
        </p>
      </BlogPostShell>
    </>
  );
}
