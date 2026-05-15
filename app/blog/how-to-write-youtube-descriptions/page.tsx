import type { Metadata } from "next";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "How to Write YouTube Descriptions That Actually Get Views (2026) | Sounez",
  description:
    "Most creators ignore the YouTube description box. Here's why that's a mistake, and a step-by-step guide to writing descriptions that rank and convert.",
  openGraph: {
    title: "How to Write YouTube Descriptions That Get Views",
    description: "The description box is free SEO real estate. Here's how to use it.",
  },
};

const FAQS = [
  { question: "Do YouTube descriptions really affect rankings?", answer: "Yes. YouTube's algorithm uses the description to understand video content and match it to search queries. A keyword-rich, well-structured description consistently outperforms a blank or thin one." },
  { question: "Should I use the same description template for every video?", answer: "Use the same structure, but write unique content for each video. Duplicate descriptions across videos can hurt your channel's SEO." },
  { question: "How many hashtags should I use?", answer: "3–5 is the sweet spot. YouTube ignores descriptions with more than 15 hashtags entirely." },
  { question: "Where should I put my most important link?", answer: "In the first 200 characters, before the 'more' button. That's the only part most viewers see without clicking." },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="how-to-write-youtube-descriptions"
        title="How to Write YouTube Descriptions That Actually Get Views"
        description="Most creators ignore the YouTube description box. Here's why that's a mistake, and a step-by-step guide to writing descriptions that rank and convert."
        articleSection="Creator Tools"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="how-to-write-youtube-descriptions"
        ctaTools={["youtube-tags-generator", "word-counter", "hashtag-generator"]}
        title="How to Write YouTube Descriptions That Actually Get Views"
        excerpt="Most creators treat the description box as an afterthought. It's actually free SEO real estate that YouTube's algorithm reads closely. Here's how to write one that ranks."
      >
        <p>
          YouTube&apos;s algorithm reads your description. It uses it to understand what your video is
          about, who to recommend it to, and how to rank it in search results. Most creators write two
          sentences and call it done, or leave it blank entirely. That&apos;s leaving free discoverability
          on the table.
        </p>
        <p>
          A well-written description won&apos;t save a bad video. But a bad description will quietly
          suppress a good one. Here&apos;s the system.
        </p>

        <h2>The structure of a high-performing YouTube description</h2>
        <p>
          Think of your description in three zones:
        </p>
        <ul>
          <li>
            <strong>Above the fold (first 2–3 lines)</strong>: this is what viewers see before
            clicking &quot;more&quot;. It must hook them and include your primary keyword naturally.
          </li>
          <li>
            <strong>The body (lines 4–20)</strong>: expand on the video content, include secondary
            keywords, add timestamps, and link to related resources.
          </li>
          <li>
            <strong>The footer</strong>: social links, subscribe CTA, hashtags, and boilerplate
            about your channel.
          </li>
        </ul>

        <PullQuote>
          The first two lines of your description are the most important, they show in search results
          before the &quot;more&quot; button.
        </PullQuote>

        <h2>Step 1: Lead with your primary keyword</h2>
        <p>
          Your first sentence should contain the exact phrase someone would type to find your video.
          According to{" "}
          <a href="https://support.google.com/youtube/answer/7552050" target="_blank" rel="noopener noreferrer">
            YouTube&apos;s Creator Academy
          </a>
          , a good description helps both viewers and YouTube understand your video&apos;s content. If your
          video is &quot;how to grow on TikTok in 2026&quot;, your description should open with something like:
          &quot;In this video, I break down exactly how to grow on TikTok in 2026, from niche selection to
          your first 10k followers.&quot;
        </p>
        <p>
          Don&apos;t stuff keywords. Write naturally. YouTube&apos;s algorithm is sophisticated enough to
          detect keyword stuffing and penalize it.
        </p>

        <h2>Step 2: Add timestamps (chapters)</h2>
        <p>
          Timestamps do two things: they improve viewer experience (people can jump to what they need)
          and they create additional keyword-rich text that YouTube indexes. Format:
        </p>
        <ul>
          <li>0:00, Introduction</li>
          <li>1:45, Why most creators fail at this</li>
          <li>4:20, The niche selection framework</li>
          <li>8:10, Hook writing masterclass</li>
          <li>12:30, Hashtag strategy</li>
        </ul>
        <p>
          Each chapter title is another keyword opportunity. Use the{" "}
          <a href="/word-counter">Word Counter</a> to keep chapter titles tight, under 50 characters
          is ideal.
        </p>

        <h2>Step 3: Include secondary keywords naturally</h2>
        <p>
          After your opening paragraph and timestamps, write 3–5 sentences that naturally include
          related terms. If your primary keyword is &quot;TikTok growth&quot;, secondary keywords might be
          &quot;TikTok algorithm 2026&quot;, &quot;grow TikTok followers&quot;, &quot;TikTok for beginners&quot;, and &quot;TikTok
          content strategy&quot;.
        </p>
        <p>
          Use the <a href="/youtube-tags-generator">YouTube Tags Generator</a> to discover related
          keyword variations, many of them belong in your description, not just your tags.
        </p>

        <h2>Step 4: Add links that keep viewers in your ecosystem</h2>
        <ul>
          <li>Link to 2–3 related videos on your channel</li>
          <li>Link to your most important playlist</li>
          <li>Link to your website or newsletter signup</li>
          <li>Link to any tools or resources mentioned in the video</li>
        </ul>
        <p>
          Internal links keep viewers watching longer, which is one of the strongest signals YouTube
          uses to rank and recommend videos.
        </p>

        <h2>Step 5: End with hashtags</h2>
        <p>
          YouTube displays up to 3 hashtags above your video title, they come from the last hashtags
          in your description. Use 3–5 relevant hashtags at the very end. Generate the right mix with
          the <a href="/hashtag-generator">Hashtag Generator</a>.
        </p>

        <h2>Description length: how long is long enough?</h2>
        <p>
          YouTube allows up to 5,000 characters. Aim for 300–500 words for most videos, enough to
          give the algorithm plenty to work with, not so much that it feels like spam. Use the{" "}
          <a href="/word-counter">Word Counter</a> to hit that range before publishing.
        </p>

        <h2>The description template</h2>
        <p>Copy and adapt this for every video:</p>
        <ul>
          <li>Line 1–2: Hook + primary keyword</li>
          <li>Line 3: What viewers will learn</li>
          <li>Blank line</li>
          <li>Timestamps</li>
          <li>Blank line</li>
          <li>3–5 sentences with secondary keywords</li>
          <li>Blank line</li>
          <li>Related video links</li>
          <li>Subscribe CTA</li>
          <li>Social links</li>
          <li>Blank line</li>
          <li>3–5 hashtags</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>Do YouTube descriptions really affect rankings?</h3>
        <p>
          Yes. YouTube&apos;s algorithm uses the description to understand video content and match it to
          search queries. A keyword-rich, well-structured description consistently outperforms a blank
          or thin one.
        </p>
        <h3>Should I use the same description template for every video?</h3>
        <p>
          Use the same structure, but write unique content for each video. Duplicate descriptions
          across videos can hurt your channel&apos;s SEO.
        </p>
        <h3>How many hashtags should I use?</h3>
        <p>
          3–5 is the sweet spot. YouTube ignores descriptions with more than 15 hashtags entirely.
        </p>
        <h3>Where should I put my most important link?</h3>
        <p>
          In the first 200 characters, before the &quot;more&quot; button. That&apos;s the only part most viewers
          see without clicking.
        </p>

        <h2>Conclusion: treat the description box like a landing page</h2>
        <p>
          Your description is free SEO real estate that most creators waste. Spend 10 extra minutes
          on it per video, use the{" "}
          <a href="/youtube-tags-generator">YouTube Tags Generator</a> for keyword ideas, the{" "}
          <a href="/word-counter">Word Counter</a> to hit the right length, and the{" "}
          <a href="/hashtag-generator">Hashtag Generator</a> for the footer. That&apos;s a 10-minute
          investment that compounds for the life of the video.
        </p>
      </BlogPostShell>
    </>
  );
}
