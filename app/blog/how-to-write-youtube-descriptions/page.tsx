import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Write Better YouTube Descriptions (2026) | Sounez",
  description:
    "Learn how to write clearer YouTube descriptions with useful summaries, timestamps, links, hashtags, and natural keywords.",
  alternates: { canonical: getSiteUrl() + "/blog/how-to-write-youtube-descriptions" },
  openGraph: {
    title: "How to Write Better YouTube Descriptions",
    description: "Use summaries, timestamps, links, hashtags, and natural keywords to make descriptions more useful.",
  },
};

const FAQS = [
  { question: "Do YouTube descriptions affect discovery?", answer: "They can help YouTube and viewers understand the video topic. A clear description is more useful than a blank or copied one, but it does not guarantee rankings." },
  { question: "Should I use the same description template for every video?", answer: "Use the same structure if it helps, but write unique summaries, timestamps, and links for each video." },
  { question: "How many hashtags should I use?", answer: "3-5 is the sweet spot. YouTube ignores descriptions with more than 15 hashtags entirely." },
  { question: "Where should I put my most important link?", answer: "In the first 200 characters, before the 'more' button. That's the only part most viewers see without clicking." },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="how-to-write-youtube-descriptions"
        title="How to Write Better YouTube Descriptions"
        description="Learn how to write clearer YouTube descriptions with useful summaries, timestamps, links, hashtags, and natural keywords."
        articleSection="Creator Tools"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="how-to-write-youtube-descriptions"
        ctaTools={["youtube-tags-generator", "word-counter", "hashtag-generator"]}
        title="How to Write Better YouTube Descriptions"
        excerpt="Most creators treat the description box as an afterthought. Use it to summarize the video, add useful links, and help viewers navigate."
      >
        <p>
          A YouTube description helps viewers understand what the video covers before they watch. It
          also gives YouTube more context about the topic, related resources, and chapter structure.
          Many creators write two sentences and call it done, or leave it blank entirely.
        </p>
        <p>
          A well-written description will not save a weak video, but it can make a good video easier
          to navigate, understand, and revisit.
        </p>

        <h2>The structure of a useful YouTube description</h2>
        <p>
          Think of your description in three zones:
        </p>
        <ul>
          <li>
            <strong>Above the fold (first 2-3 lines)</strong>: this is what viewers see before
            clicking &quot;more&quot;. It should explain the video clearly and include the main topic naturally.
          </li>
          <li>
            <strong>The body (lines 4-20)</strong>: expand on the video content, include secondary
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
          Do not stuff keywords. Write naturally for viewers first, then make sure the topic is clear.
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
          <Link href="/tools/word-counter">Word Counter</Link> to keep chapter titles tight, under 50 characters
          is ideal.
        </p>

        <h2>Step 3: Include secondary keywords naturally</h2>
        <p>
          After your opening paragraph and timestamps, write 3-5 sentences that naturally include
          related terms. If your primary keyword is &quot;TikTok growth&quot;, secondary keywords might be
          &quot;TikTok algorithm 2026&quot;, &quot;grow TikTok followers&quot;, &quot;TikTok for beginners&quot;, and &quot;TikTok
          content strategy&quot;.
        </p>
        <p>
          Use the <Link href="/tools/youtube-tags-generator">YouTube Tags Generator</Link> to discover related
          keyword variations, many of them belong in your description, not just your tags.
        </p>

        <h2>Step 4: Add links that keep viewers in your ecosystem</h2>
        <ul>
          <li>Link to 2-3 related videos on your channel</li>
          <li>Link to your most important playlist</li>
          <li>Link to your website or newsletter signup</li>
          <li>Link to any tools or resources mentioned in the video</li>
        </ul>
        <p>
          Internal links can help viewers find the next useful video without leaving your channel.
        </p>

        <h2>Step 5: End with hashtags</h2>
        <p>
          YouTube displays up to 3 hashtags above your video title, they come from the last hashtags
          in your description. Use 3-5 relevant hashtags at the very end. Generate the right mix with
          the <Link href="/tools/hashtag-generator">Hashtag Generator</Link>.
        </p>

        <h2>Description length: how long is long enough?</h2>
        <p>
          YouTube allows up to 5,000 characters. Aim for 300-500 words for most videos, enough to
          give viewers enough context, not so much that it feels like spam. Use the{" "}
          <Link href="/tools/word-counter">Word Counter</Link> to hit that range before publishing.
        </p>

        <h2>The description template</h2>
        <p>Copy and adapt this for every video:</p>
        <ul>
          <li>Line 1-2: Hook + primary keyword</li>
          <li>Line 3: What viewers will learn</li>
          <li>Blank line</li>
          <li>Timestamps</li>
          <li>Blank line</li>
          <li>3-5 sentences with secondary keywords</li>
          <li>Blank line</li>
          <li>Related video links</li>
          <li>Subscribe CTA</li>
          <li>Social links</li>
          <li>Blank line</li>
          <li>3-5 hashtags</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <h3>Do YouTube descriptions affect discovery?</h3>
        <p>
          They can help YouTube and viewers understand the video topic. A clear description is more
          useful than a blank or copied one, but it does not guarantee rankings.
        </p>
        <h3>Should I use the same description template for every video?</h3>
        <p>
          Use the same structure if it helps, but write unique summaries, timestamps, and links for each video.
        </p>
        <h3>How many hashtags should I use?</h3>
        <p>
          3-5 is the sweet spot. YouTube ignores descriptions with more than 15 hashtags entirely.
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
          <Link href="/tools/youtube-tags-generator">YouTube Tags Generator</Link> for keyword ideas, the{" "}
          <Link href="/tools/word-counter">Word Counter</Link> to hit the right length, and the{" "}
          <Link href="/tools/hashtag-generator">Hashtag Generator</Link> for the footer. That&apos;s a 10-minute
          investment that compounds for the life of the video.
        </p>
      </BlogPostShell>
    </>
  );
}
