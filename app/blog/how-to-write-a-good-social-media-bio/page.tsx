import { getSiteUrl } from "@/lib/site-url";
import { blogMetadata } from "@/lib/blog-metadata";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";
import Link from "next/link";

export const metadata = blogMetadata("how-to-write-a-good-social-media-bio", {
  title: "How to Write a Good Social Media Bio (2026 Guide) | Sounez",
  description:
    "Learn how to write short, clear and professional bios for Instagram, TikTok, LinkedIn and personal websites. With examples and a free bio generator.",
    ogTitle: "How to Write a Good Social Media Bio",
    ogDescription: "Platform-specific bio examples, character limits, and how to write a bio that makes people follow you.",
});

const FAQS = [
  {
    question: "How long should an Instagram bio be?",
    answer:
      "Instagram bios are capped at 150 characters. Aim to use most of them: state who you are, what you do, and include a call to action or link reference.",
  },
  {
    question: "Should I use emojis in my bio?",
    answer:
      "On Instagram and TikTok, yes, emojis break up text and add personality. On LinkedIn, use them sparingly or not at all. One or two at most in a professional context.",
  },
  {
    question: "What should I put in my LinkedIn bio?",
    answer:
      "Your current role, your area of expertise, a specific achievement or result, and what you're working on or open to. Keep it under 300 characters for the preview, but you can expand in the 'About' section.",
  },
  {
    question: "Can I have different bios on different platforms?",
    answer:
      "Absolutely. Your LinkedIn bio should be more formal than your Instagram bio. Tailor the tone and length to each platform's audience and culture.",
  },
  {
    question: "Is the Bio Generator free?",
    answer:
      "Yes. The Sounez Bio Generator is free to use and does not require an account. Heavy automated use may be limited to keep the tool available.",
  },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="how-to-write-a-good-social-media-bio"
        title="How to Write a Good Social Media Bio"
        description="Learn how to write short, clear and professional bios for Instagram, TikTok, LinkedIn and personal websites. With examples and a free bio generator."
        articleSection="Creator Tools"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="how-to-write-a-good-social-media-bio"
        ctaTools={["bio-generator", "ai-caption-generator", "hashtag-generator"]}
        title="How to Write a Good Social Media Bio"
        excerpt="Your bio is the first thing people read when they decide whether to follow you. Here&apos;s how to write one that works, with examples for every platform."
      >
        <p>
          Your social media bio has one job: convince a stranger to follow you in under five seconds.
          Most bios fail because they&apos;re either too vague (&quot;lover of life ✨&quot;), too formal (&quot;Senior
          Marketing Executive at XYZ Corp&quot;), or just a list of job titles with no personality.
        </p>
        <p>
          This guide covers what a bio should communicate, platform-specific examples, and how to use
          the <Link href="/tools/bio-generator">Bio Generator</Link> to create a polished bio in seconds.
        </p>

        <h2>What a bio should communicate</h2>
        <p>A strong bio answers three questions immediately:</p>
        <ul>
          <li>
            <strong>Who are you?</strong>: Your name, role or niche. Be specific. &quot;Fitness coach for
            busy parents&quot; beats &quot;fitness enthusiast&quot;.
          </li>
          <li>
            <strong>What do you offer?</strong>: What will someone get from following you? Tips,
            entertainment, inspiration, tutorials?
          </li>
          <li>
            <strong>What should they do next?</strong>: A CTA: follow for X, link in bio, DM for Y.
          </li>
        </ul>

        <PullQuote>
          A bio isn&apos;t a CV. It&apos;s a pitch. Write it for the person reading it, not for yourself.
        </PullQuote>

        <h2>Bio examples by platform</h2>

        <h3>Instagram bio (150 characters max)</h3>
        <p>
          Instagram bios are short. Every word counts. Use line breaks, emojis as bullet points, and
          a clear CTA pointing to your link.
        </p>
        <ul>
          <li>
            <strong>Creator:</strong> &quot;📸 Travel photographer | Southeast Asia &amp; beyond | New reel
            every Friday | 👇 Free preset pack&quot;
          </li>
          <li>
            <strong>Business:</strong> &quot;🌿 Organic skincare | Cruelty-free | Ships worldwide | Shop
            below 👇&quot;
          </li>
          <li>
            <strong>Personal brand:</strong> &quot;UX designer helping startups ship faster | Figma tips
            daily | DM for collabs&quot;
          </li>
        </ul>

        <h3>TikTok bio (80 characters max)</h3>
        <p>
          TikTok bios are even shorter. Lead with your niche and a hook. The link in bio does the
          next step.
        </p>
        <ul>
          <li>&quot;Budget recipes for students 🍜 | New video daily&quot;</li>
          <li>&quot;Coding tutorials for beginners 💻 | Free resources below&quot;</li>
          <li>&quot;Honest product reviews | No sponsorships 🚫&quot;</li>
        </ul>

        <h3>LinkedIn bio (300 characters for the preview)</h3>
        <p>
          LinkedIn bios should be professional but not robotic. Lead with your current role and
          specialization, then add a human element.
        </p>
        <ul>
          <li>
            &quot;Product Manager at Acme | Turning user research into features people actually use |
            Previously: 3 B2B SaaS launches | Open to advisory roles&quot;
          </li>
          <li>
            &quot;Freelance copywriter | B2B tech &amp; SaaS | Helped 40+ startups find their voice | Ask me
            about conversion-focused landing pages&quot;
          </li>
        </ul>

        <h3>Personal website / general bio (up to 300 characters)</h3>
        <p>
          Website bios have more flexibility. You can be slightly more narrative, but keep the first
          sentence punchy, it&apos;s often used as a meta description.
        </p>
        <ul>
          <li>
            &quot;I&apos;m a graphic designer based in Berlin. I help small businesses look like big ones
            through brand identity, packaging and web design.&quot;
          </li>
        </ul>

        <h2>Personal bio vs business bio</h2>
        <p>
          Personal bios should have personality, a specific detail, a hobby, a point of view.
          Business bios should focus on the customer: what problem do you solve, who do you serve,
          what makes you different.
        </p>
        <ul>
          <li>
            <strong>Personal:</strong> &quot;Photographer, dog dad, obsessed with golden hour. Based in
            Lisbon. Shooting weddings and portraits.&quot;
          </li>
          <li>
            <strong>Business:</strong> &quot;Wedding photography for couples who want real moments, not
            posed ones. Lisbon &amp; worldwide.&quot;
          </li>
        </ul>

        <h2>Bio writing mistakes to avoid</h2>
        <ul>
          <li>
            <strong>Being too generic</strong>: &quot;Passionate about life&quot; tells nobody anything. Be
            specific about your niche.
          </li>
          <li>
            <strong>No CTA</strong>: Always tell people what to do next. Even &quot;new post every
            Tuesday&quot; is a CTA.
          </li>
          <li>
            <strong>Outdated information</strong>: Check your bio every quarter. Old job titles and
            dead links hurt credibility.
          </li>
          <li>
            <strong>Keyword stuffing</strong>: Instagram and LinkedIn bios are searchable, but
            stuffing keywords makes them unreadable.
          </li>
        </ul>

        <h2>How to use the Bio Generator</h2>
        <p>
          The <Link href="/tools/bio-generator">Bio Generator</Link> takes your name, role, interests and
          platform, and returns a polished bio tailored to the character limits and tone of each
          platform.
        </p>
        <ol>
          <li>Enter your name and role or title.</li>
          <li>Add a few interests or specializations, comma-separated.</li>
          <li>Select your platform: Instagram, Twitter/X, LinkedIn or General.</li>
          <li>
            Click Generate. The bio respects the platform&apos;s character limit automatically (160 for
            Instagram/Twitter, 300 for LinkedIn/General).
          </li>
          <li>Copy, paste and tweak the result to add your personal touch.</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <h3>How long should an Instagram bio be?</h3>
        <p>
          Instagram bios are capped at 150 characters. Aim to use most of them: state who you are,
          what you do, and include a call to action or link reference.
        </p>
        <h3>Should I use emojis in my bio?</h3>
        <p>
          On Instagram and TikTok, yes, emojis break up text and add personality. On LinkedIn, use
          them sparingly. One or two at most in a professional context.
        </p>
        <h3>What should I put in my LinkedIn bio?</h3>
        <p>
          Your current role, your area of expertise, a specific achievement or result, and what
          you&apos;re working on or open to.
        </p>
        <h3>Can I have different bios on different platforms?</h3>
        <p>
          Absolutely. Your LinkedIn bio should be more formal than your Instagram bio. Tailor the
          tone and length to each platform&apos;s audience and culture. The{" "}
          <Link href="/tools/bio-generator">Bio Generator</Link> handles this automatically.
        </p>
        <h3>Is the Bio Generator free?</h3>
        <p>
          Yes. The <Link href="/tools/bio-generator">Sounez Bio Generator</Link> is free to use and does not
          require an account. Heavy automated use may be limited to keep the tool available.
        </p>

        <h2>Conclusion: write it once, update it quarterly</h2>
        <p>
          A great bio takes 10 minutes to write and pays dividends for months. Use the{" "}
          <Link href="/tools/bio-generator">Bio Generator</Link> to get a strong first draft, then personalize it
          with a specific detail that only you could write. Set a reminder to review it every quarter
         , your role, focus and CTA will change, and your bio should too. Once your bio is sorted,
          pair it with great captions using the{" "}
          <Link href="/tools/ai-caption-generator">AI Caption Generator</Link>.
        </p>
      </BlogPostShell>
    </>
  );
}
