export type SmartPack = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  generates: string[];
  whoFor: { title: string; desc: string }[];
  workflow: string[];
  exampleOutput: { label: string; sample: string }[];
  commonMistakes: string[];
  faqs: { q: string; a: string }[];
  relatedTools: { href: string; label: string }[];
  relatedPack?: { href: string; label: string };
};

export const SMART_PACKS: SmartPack[] = [
  {
    slug: "social-media-pack",
    title: "Social Media Pack",
    tagline: "One post idea → caption, tags, and comments ready to edit",
    summary:
      "Start with a plain-language brief about your photo or offer. Use the tools below to draft each piece, then tweak tone and length before you publish. Nothing here posts to Instagram or TikTok for you — you copy, edit, and schedule like you already do.",
    generates: [
      "Primary caption (feed post)",
      "Hashtag set for your platform",
      "First comment (link, CTA, or extra context)",
      "Short on-image headline idea",
      "CTA line for bio or story",
      "Shorter variant for Stories or TikTok",
    ],
    whoFor: [
      { title: "Small shops", desc: "Launch a product post without staring at a blank caption box." },
      { title: "Creators", desc: "Batch ideas for a week of posts from one theme." },
      { title: "Freelancers", desc: "Send clients draft copy faster, then refine together." },
    ],
    workflow: [
      "Write a one-sentence brief: what the image shows and who it is for.",
      "Generate 2–3 caption options with the AI Caption Generator.",
      "Pull hashtags from the Hashtag Generator using the same topic.",
      "Draft a first comment (pin a link or repeat the CTA).",
      "Paste everything into your scheduler and edit out anything that sounds off-brand.",
    ],
    exampleOutput: [
      {
        label: "Brief",
        sample: "Hand-poured soy candle, winter scent, 20% off this weekend, Instagram audience.",
      },
      {
        label: "Caption (draft)",
        sample:
          "Cozy season starts here. Our Winter Cedar candle is back — hand-poured, slow-burning, and 20% off through Sunday. Tap the link in bio to grab yours.",
      },
      {
        label: "First comment",
        sample: "Shop the sale → [your-link] · Code WINTER20 at checkout.",
      },
    ],
    commonMistakes: [
      "Publishing AI captions without checking prices, dates, or legal claims.",
      "Using the same hashtag block on every post until it looks spammy.",
      "Forgetting a first comment when the caption already hit the character limit.",
      "Skipping a phone preview — line breaks look different on mobile.",
    ],
    faqs: [
      {
        q: "Does the Social Media Pack auto-post?",
        a: "No. You run each tool, copy the drafts, and publish through your own app or scheduler.",
      },
      {
        q: "How long should my brief be?",
        a: "One or two sentences is enough: what the image shows, who it is for, and any offer or deadline.",
      },
      {
        q: "Which tool do I start with?",
        a: "Usually the AI Caption Generator, then hashtags, then a first-comment line you write or adapt from the caption.",
      },
    ],
    relatedTools: [
      { href: "/tools/ai-caption-generator", label: "AI Caption Generator" },
      { href: "/tools/hashtag-generator", label: "Hashtag Generator" },
      { href: "/tools/bio-generator", label: "Bio Generator" },
      { href: "/tools/qr-code-generator", label: "QR Code Generator" },
    ],
    relatedPack: { href: "/smart-packs/product-listing-pack", label: "Product Listing Pack" },
  },
  {
    slug: "product-listing-pack",
    title: "Product Listing Pack",
    tagline: "One product → title, descriptions, alt text, and social line",
    summary:
      "Use this workflow when you are listing on a marketplace or your own store. Each field is a separate step — compress photos, describe the hero image, then write title and body copy in your shop admin. Sounez does not connect to Etsy, Shopify, or Amazon.",
    generates: [
      "Product title (clear + searchable)",
      "Short bullet description",
      "Longer SEO-friendly description",
      "Image alt text per photo",
      "Marketplace-friendly copy block",
      "Short social caption to announce the listing",
    ],
    whoFor: [
      { title: "Etsy / Shopify sellers", desc: "Ship a consistent listing faster than writing from scratch each time." },
      { title: "Resellers", desc: "Rewrite supplier photos and specs in your own voice." },
      { title: "Agencies", desc: "Give juniors a checklist so listings stay on-brand." },
    ],
    workflow: [
      "List facts: material, size, colour, shipping, and what makes it different.",
      "Compress product photos with the Image Compressor before upload.",
      "Run Image Describer on the hero shot for alt text and keywords.",
      "Draft title + descriptions in a doc, then paste into your marketplace.",
      "Generate a launch caption and QR code to the live product URL if needed.",
    ],
    exampleOutput: [
      {
        label: "Title",
        sample: "Ceramic Pour-Over Coffee Dripper — Matte White, 1–2 Cups",
      },
      {
        label: "Alt text",
        sample: "White ceramic pour-over coffee dripper on a wooden counter with a glass carafe.",
      },
      {
        label: "Social line",
        sample: "New in the shop: a minimal pour-over dripper for slow weekend mornings. Link in bio.",
      },
    ],
    commonMistakes: [
      "Uploading huge originals without compressing — slow pages and rejected marketplace limits.",
      "Copying supplier descriptions word-for-word instead of rewriting in your voice.",
      "Alt text that lists keywords but does not describe the photo.",
      "Announcing a product on social before the listing URL actually works.",
    ],
    faqs: [
      {
        q: "Can Sounez publish to my shop?",
        a: "No. You paste title, description, and alt text into your marketplace or CMS yourself.",
      },
      {
        q: "Do I need professional photos first?",
        a: "Clear phone photos are fine. Compress and describe them; replace later if you get a shoot.",
      },
      {
        q: "What if I sell on two platforms?",
        a: "Reuse the same facts, but adjust title length and tone per marketplace rules.",
      },
    ],
    relatedTools: [
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/image-describer", label: "Image Describer" },
      { href: "/tools/ai-caption-generator", label: "AI Caption Generator" },
      { href: "/tools/qr-code-generator", label: "QR Code Generator" },
    ],
    relatedPack: { href: "/smart-packs/seo-image-pack", label: "SEO Image Pack" },
  },
  {
    slug: "seo-image-pack",
    title: "SEO Image Pack",
    tagline: "One image → filename, alt text, compression plan, and keywords",
    summary:
      "Search engines and screen readers read images through filenames, alt text, and page context. This pack walks you through rename → compress → describe → place near relevant copy. It suits blog posts, product galleries, and landing pages.",
    generates: [
      "Suggested filename (lowercase, hyphenated)",
      "Alt text (concise, accurate)",
      "Compression / format note",
      "Plain-language image description",
      "Keyword ideas to use nearby on the page",
    ],
    whoFor: [
      { title: "Bloggers", desc: "Fix image SEO on older posts without re-shooting photos." },
      { title: "Store owners", desc: "Make product galleries accessible and searchable." },
      { title: "Developers", desc: "Hand off alt text rules to content editors with examples." },
    ],
    workflow: [
      "Rename the file before upload (e.g. ceramic-mug-white-handle.webp).",
      "Compress with the Image Compressor — aim for under 200 KB on content images when possible.",
      "Generate alt text and keywords with Image Describer, then edit for accuracy.",
      "Place the image near copy that uses the same words naturally.",
      "Re-check alt text after any crop or filter — update if the meaning changed.",
    ],
    exampleOutput: [
      {
        label: "Filename",
        sample: "team-meeting-whiteboard-2026.webp",
      },
      {
        label: "Alt text",
        sample: "Four teammates reviewing charts on a whiteboard in a bright office.",
      },
      {
        label: "On-page note",
        sample: "Use keywords in the paragraph below the image, not stuffed into alt text.",
      },
    ],
    commonMistakes: [
      "Stuffing keywords into alt text instead of describing what is visible.",
      "Leaving files named IMG_3847.jpg on a live site.",
      "Skipping alt text after cropping because the subject changed.",
      "Using PNG for large photos when WebP or JPG would load faster.",
    ],
    faqs: [
      {
        q: "Is alt text enough for image SEO?",
        a: "It helps accessibility and context. File name, compression, and nearby page copy matter too.",
      },
      {
        q: "Should I convert every image to WebP?",
        a: "Often yes for photos. Keep PNG for logos and anything that needs transparency.",
      },
      {
        q: "Does Image Describer upload stay on Sounez?",
        a: "Images are processed for the response and not kept afterward. See the tool page for details.",
      },
    ],
    relatedTools: [
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/image-describer", label: "Image Describer" },
      { href: "/tools/png-to-jpg-converter", label: "PNG to JPG Converter" },
      { href: "/tools/background-remover", label: "Background Remover" },
    ],
    relatedPack: { href: "/smart-packs/social-media-pack", label: "Social Media Pack" },
  },
];

export function smartPackBySlug(slug: string) {
  return SMART_PACKS.find((p) => p.slug === slug);
}
