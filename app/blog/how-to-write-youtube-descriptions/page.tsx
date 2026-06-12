import { getSiteUrl } from "@/lib/site-url";
import { blogMetadata } from "@/lib/blog-metadata";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";
import Link from "next/link";

export const metadata = blogMetadata("how-to-write-youtube-descriptions", {
  title: "How to Write Better YouTube Descriptions (2026) | Sounez",
  description:
    "Learn how to write clearer YouTube descriptions with useful summaries, timestamps, links, hashtags, and natural keywords.",
    ogTitle: "How to Write Better YouTube Descriptions",
    ogDescription: "Use summaries, timestamps, links, hashtags, and natural keywords to make descriptions more useful.",
});

const FAQS = [
  { question: "Do YouTube descriptions affect discovery?", answer: "They help YouTube and viewers understand the video topic. A clear description with natural keywords and accurate timestamps gives YouTube more context to index the video correctly, but it does not override watch time and click-through rate as ranking signals." },
  { question: "Should I use the same description template for every video?", answer: "Use the same structure if it helps your workflow, but write unique summaries, timestamps, and links for each video. Identical or near-identical descriptions across many videos can appear low-quality to both viewers and YouTube." },
  { question: "How many hashtags should I use?", answer: "3-5 is the sweet spot. YouTube displays the first 3 hashtags above the video title. YouTube ignores descriptions with more than 15 hashtags entirely, so adding 30 hashtags actually removes all hashtag benefits." },
  { question: "Where should I put my most important link?", answer: "In the first 200 characters, before the 'more' button. That is the only part most viewers see without expanding. Put your newsletter, product page, or most relevant resource there — not your generic homepage." },
  { question: "How long should a YouTube description be?", answer: "300 to 500 words is a good target for most videos. That is enough to give context, add timestamps, include secondary keywords, and link to related content without feeling like spam. YouTube allows up to 5,000 characters." },
  { question: "Should I include a transcript in my description?", answer: "A partial transcript or summary of key points can help with accessibility and keyword coverage. Full transcripts are better uploaded as a dedicated caption file through YouTube Studio, which also improves closed caption quality." },
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
          The goal is not keyword density — it is giving YouTube and viewers enough context to
          understand the full scope of the video. Think about the questions someone might search
          after watching: if your video is about growing on TikTok, they might also search for
          how to write TikTok captions or how to use trending audio. Mentioning those topics
          naturally in your description creates a thematic connection.
        </p>
        <p>
          Use the <Link href="/tools/youtube-tags-generator">YouTube Tags Generator</Link> to discover related
          keyword variations — many of them belong in your description, not just your tags field.
        </p>

        <h2>Before and after: a real description example</h2>
        <p>
          The difference between a weak and strong description is usually just specificity and
          structure, not length.
        </p>
        <p>
          <strong>Weak description:</strong>
        </p>
        <p>
          &quot;In this video I talk about TikTok growth. Hope you enjoy! Subscribe for more content.
          #tiktok #growth&quot;
        </p>
        <p>
          <strong>Strong description (same video):</strong>
        </p>
        <p>
          &quot;In this video I break down exactly how to grow on TikTok in 2026 — from choosing a niche
          that compounds to writing hooks that stop the scroll in the first second.
        </p>
        <p>
          0:00 Introduction<br />
          1:30 Why most creators plateau at 1k followers<br />
          4:45 The niche selection framework I use<br />
          8:20 Writing hooks that actually work<br />
          13:10 Posting cadence and consistency strategy<br />
          17:00 Recap and next steps
        </p>
        <p>
          This strategy covers TikTok algorithm 2026, growing TikTok followers organically, and
          TikTok content strategy for beginners. No paid promotion, no follow/unfollow tricks.
        </p>
        <p>
          Related videos: [link] | [link]<br />
          Free caption templates: [link]
        </p>
        <p>
          #tiktokgrowth #tiktok2026 #contentcreator&quot;
        </p>
        <p>
          The second description is more specific, more useful to viewers who want to navigate, and
          more informative for YouTube&apos;s understanding of the video. It takes about 8 extra minutes
          to write and pays dividends for the life of the video.
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
          They help YouTube and viewers understand the video topic. A clear description with
          natural keywords and accurate timestamps gives YouTube more context, but it does not
          override watch time and click-through rate as ranking signals.
        </p>
        <h3>Should I use the same description template for every video?</h3>
        <p>
          Use the same structure if it helps your workflow, but write unique summaries, timestamps,
          and links for each video. Identical descriptions across many videos appear low-quality to
          both viewers and YouTube.
        </p>
        <h3>How many hashtags should I use?</h3>
        <p>
          3-5 is the sweet spot. YouTube displays the first 3 hashtags above your video title.
          YouTube ignores descriptions with more than 15 hashtags entirely, so adding 30 removes
          all hashtag benefits.
        </p>
        <h3>Where should I put my most important link?</h3>
        <p>
          In the first 200 characters, before the &quot;more&quot; button. That is the only part most viewers
          see without expanding. Put your newsletter, product page, or most relevant resource there.
        </p>
        <h3>How long should a YouTube description be?</h3>
        <p>
          300 to 500 words is a good target for most videos. Enough context, timestamps, and links
          without feeling like spam. YouTube allows up to 5,000 characters.
        </p>
        <h3>Should I include a transcript in my description?</h3>
        <p>
          A partial summary of key points helps with keyword coverage. Full transcripts are better
          uploaded as a caption file through YouTube Studio, which also improves closed caption
          quality for all viewers.
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
