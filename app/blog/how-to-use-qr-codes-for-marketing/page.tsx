import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "How to Use QR Codes for Marketing (Without Looking Cheap) | Sounez",
  description:
    "QR codes are everywhere again in 2026. Here's how to use them in print, packaging, events and social media in a way that actually converts.",
  alternates: { canonical: getSiteUrl() + "/blog/how-to-use-qr-codes-for-marketing" },
  openGraph: {
    title: "How to Use QR Codes for Marketing",
    description: "Use QR codes with a clear destination, label, and placement so people know what they are scanning.",
  },
};

const FAQS = [
  { question: "Do QR codes expire?", answer: "Static QR codes never expire, the code is just an encoded URL. Dynamic QR codes from third-party services may expire if you stop paying for the service." },
  { question: "Can I use a QR code on a dark background?", answer: "Yes, but invert the colors carefully. The dark module must remain darker than the light module. Test thoroughly before printing." },
  { question: "What's the best file format for printing?", answer: "SVG for vector printing (scales to any size without pixelation). PNG at 1000px+ for digital use." },
  { question: "Should I put a QR code on my social media posts?", answer: "Generally no. People are already on a screen and can tap a link. QR codes shine in physical contexts where a tap isn't possible." },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="how-to-use-qr-codes-for-marketing"
        title="How to Use QR Codes for Marketing (Without Looking Cheap)"
        description="QR codes are everywhere again in 2026. Here's how to use them in print, packaging, events and social media in a way that actually converts."
        articleSection="Creator Tools"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="how-to-use-qr-codes-for-marketing"
        ctaTools={["qr-code-generator", "hashtag-generator", "word-counter"]}
        title="How to Use QR Codes for Marketing (Without Looking Cheap)"
        excerpt="QR codes are everywhere again, on packaging, business cards, menus, event badges and social posts. Here's how to use them in a way that actually works and looks intentional."
      >
        <p>
          QR codes had a rough decade. They were clunky, required a separate app, and felt like a
          desperate attempt to bridge print and digital. Then the pandemic happened, every phone got a
          native scanner, and suddenly QR codes became the fastest way to move someone from the
          physical world to your digital one.
        </p>
        <p>
          In 2026, a well-placed QR code is a legitimate marketing tool. A poorly placed one still
          looks cheap. Here&apos;s the difference.
        </p>

        <h2>Where QR codes actually work</h2>
        <p>
          The best QR code placements share one thing: the person scanning has a clear reason to do
          so and a working phone in their hand.
        </p>
        <ul>
          <li>
            <strong>Business cards</strong>: link to your portfolio, LinkedIn, or a contact page.
            Far more useful than a URL that&apos;s too long to type.
          </li>
          <li>
            <strong>Product packaging</strong>: link to setup guides, warranty registration, or a
            loyalty program. Reduces support tickets and builds a direct customer relationship.
          </li>
          <li>
            <strong>Event badges and lanyards</strong>: link to your speaker bio, slide deck, or
            social profile. Networking at scale.
          </li>
          <li>
            <strong>Posters and flyers</strong>: link to a ticket page, RSVP form, or playlist.
            Always include a short URL too, since not everyone will scan.
          </li>
          <li>
            <strong>Restaurant menus</strong>: the pandemic use case that stuck. Link to the full
            menu, allergen info, or an ordering system.
          </li>
          <li>
            <strong>YouTube end screens and thumbnails</strong>: link to a newsletter signup or
            Discord. Converts passive viewers into owned-audience members.
          </li>
        </ul>

        <h2>Where QR codes fail</h2>
        <ul>
          <li>
            <strong>Billboards and moving vehicles</strong>: nobody can scan a QR code at 70 mph.
          </li>
          <li>
            <strong>Digital screens</strong>: linking from one screen to another screen is almost
            always worse than a clickable link.
          </li>
          <li>
            <strong>Without context</strong>: a QR code with no label is a trust problem. Always
            tell people what they&apos;re scanning into.
          </li>
        </ul>

        <PullQuote>
          A QR code without a label is a trust problem. Always tell people where it leads.
        </PullQuote>

        <h2>The anatomy of a good QR code placement</h2>
        <p>Every effective QR code placement has four elements:</p>
        <ol>
          <li>
            <strong>A clear call to action</strong>: &quot;Scan to get the free guide&quot; beats a naked QR
            code every time.
          </li>
          <li>
            <strong>A short URL fallback</strong>: for people who won&apos;t scan. Something like
            &quot;or visit sounez.com/guide&quot;.
          </li>
          <li>
            <strong>Enough white space around it</strong>: scanners need quiet zone around the code.
            Don&apos;t crowd it.
          </li>
          <li>
            <strong>A destination worth visiting</strong>: the QR code is only as good as the page
            it leads to. A slow, mobile-unfriendly landing page wastes every scan.
          </li>
        </ol>

        <h2>Generate your QR code in seconds</h2>
        <p>
          Use the <a href="/qr-code-generator">Sounez QR Code Generator</a> to create codes for URLs,
          plain text, email addresses, phone numbers, and Wi-Fi credentials. It&apos;s free, runs in your
          browser, and produces clean, high-resolution codes ready for print or digital use. No
          account, no watermark.
        </p>

        <h2>Design tips: make it look intentional</h2>
        <ul>
          <li>
            Use your brand colors if your generator supports it. A colored QR code looks designed,
            not dropped in.
          </li>
          <li>
            The{" "}
            <a href="https://www.iso.org/standard/62021.html" target="_blank" rel="noopener noreferrer">
              ISO 18004 QR code standard
            </a>{" "}
            defines four error correction levels (L, M, Q, H). Keep the level at &quot;M&quot; or &quot;H&quot; for
            print, as it allows the code to scan even if slightly damaged.
          </li>
          <li>
            Test on multiple devices before printing. What scans on an iPhone may not scan on an
            older Android.
          </li>
          <li>
            Minimum print size: 2cm x 2cm. Smaller and scanners struggle.
          </li>
        </ul>

        <h2>Track your QR code performance</h2>
        <p>
          A plain QR code gives you no data. Use a URL shortener with analytics (Bitly, Short.io) as
          the destination, then wrap that in your QR code. You&apos;ll see exactly how many people scanned,
          when, and from which location, invaluable for print campaigns.
        </p>

        <h2>Frequently Asked Questions</h2>
        <h3>Do QR codes expire?</h3>
        <p>
          Static QR codes (like those from the <a href="/qr-code-generator">Sounez generator</a>) never
          expire, the code is just an encoded URL. Dynamic QR codes from third-party services may
          expire if you stop paying for the service.
        </p>
        <h3>Can I use a QR code on a dark background?</h3>
        <p>
          Yes, but invert the colors carefully. The dark module must remain darker than the light
          module. Test thoroughly before printing.
        </p>
        <h3>What&apos;s the best file format for printing?</h3>
        <p>
          SVG for vector printing (scales to any size without pixelation). PNG at 1000px+ for digital
          use.
        </p>
        <h3>Should I put a QR code on my social media posts?</h3>
        <p>
          Generally no. People are already on a screen and can tap a link. QR codes shine in
          physical contexts where a tap isn&apos;t possible.
        </p>

        <h2>Conclusion: use them with intent</h2>
        <p>
          QR codes are a bridge, not a destination. Use them where a physical-to-digital jump makes
          sense, label them clearly, and make sure the destination is worth the scan. Generate yours
          now with the <a href="/qr-code-generator">QR Code Generator</a>, free, no signup, ready in
          seconds.
        </p>
      </BlogPostShell>
    </>
  );
}
