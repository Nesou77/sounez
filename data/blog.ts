import { sortBlogPostsByPopularity } from "@/lib/popularity";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  readTime: string;
  image: string;
  views?: number;
  likes?: number;
  targetKeyword?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
};

const ENGAGEMENT: Record<string, { views: number; likes: number }> = {
  "how-to-convert-pdf-to-word": { views: 17200, likes: 880 },
  "how-to-remove-image-backgrounds-online": { views: 16800, likes: 860 },
  "how-to-write-alt-text-for-images": { views: 15400, likes: 780 },
  "image-optimization-checklist": { views: 18500, likes: 920 },
  "best-free-ai-tools-2026": { views: 14900, likes: 750 },
  "best-free-tools-for-creators": { views: 22000, likes: 1100 },
  "how-to-grow-on-tiktok": { views: 20500, likes: 1050 },
  "how-to-compress-images": { views: 19200, likes: 960 },
  "best-color-palettes-for-design": { views: 12400, likes: 620 },
  "how-to-create-a-strong-password": { views: 11800, likes: 590 },
  "how-to-use-qr-codes-for-marketing": { views: 11200, likes: 560 },
  "best-productivity-tools-for-remote-workers": { views: 13600, likes: 680 },
  "how-to-write-youtube-descriptions": { views: 14100, likes: 710 },
  "css-gradients-guide": { views: 9800, likes: 490 },
  "how-to-grow-instagram-organically": { views: 17800, likes: 890 },
  "image-seo-guide": { views: 19800, likes: 990 },
  "free-design-tools-for-non-designers": { views: 8900, likes: 440 },
  "how-to-write-better-social-media-captions": { views: 16200, likes: 810 },
  "how-to-write-a-good-social-media-bio": { views: 12800, likes: 640 },
  "simple-online-calculator-guide": { views: 7600, likes: 380 },
  "how-to-choose-a-business-name": { views: 10200, likes: 510 },
  "how-to-create-effective-study-notes": { views: 9400, likes: 470 },
  "how-to-find-website-ideas": { views: 10800, likes: 540 },
  "how-to-create-a-professional-resume": { views: 11500, likes: 575 },
  "png-vs-jpg-and-how-to-convert-images": { views: 14600, likes: 730 },
  "how-to-create-a-favicon-for-your-website": { views: 8200, likes: 410 },
  "how-to-use-svg-blobs-in-web-design": { views: 7100, likes: 355 },
  "how-to-choose-font-pairings-for-a-website": { views: 7800, likes: 390 },
  "how-to-use-image-placeholders-in-web-design": { views: 6900, likes: 345 },
  "css-box-shadow-guide": { views: 7400, likes: 370 },
  "css-background-patterns-guide": { views: 6700, likes: 335 },
  "free-design-tools-for-web-creators": { views: 8500, likes: 425 },
};

function post(
  entry: Omit<BlogPost, "views" | "likes"> & { slug: string },
): BlogPost {
  const stats = ENGAGEMENT[entry.slug];
  return { ...entry, views: stats?.views ?? 0, likes: stats?.likes ?? 0 };
}

const BLOG_POSTS_RAW: BlogPost[] = [
  post({
    slug: "how-to-convert-pdf-to-word",
    title: "How to Convert PDF to Word Without Losing Formatting",
    metaTitle: "How to Convert PDF to Word Without Losing Formatting",
    metaDescription:
      "Learn how to convert PDF files into editable Word documents while keeping your layout, text, images, and formatting as clean as possible.",
    excerpt:
      "Learn how to convert PDF files into editable Word documents while keeping your layout, text, images, and formatting as clean as possible.",
    date: "2026-05-23",
    updatedAt: "2026-05-23",
    readTime: "6 min",
    image: "/blog/how-to-convert-pdf-to-word.webp",
    targetKeyword: "convert PDF to Word",
    tags: ["PDF", "Word", "productivity"],
  }),
  post({
    slug: "how-to-remove-image-backgrounds-online",
    title: "How to Remove Image Backgrounds Online for Free",
    metaTitle: "How to Remove Image Backgrounds Online for Free",
    metaDescription:
      "Remove image backgrounds online for product photos, profile pictures, social posts, and design projects without using complex design software.",
    excerpt:
      "Remove image backgrounds online for product photos, profile pictures, social posts, and design projects without using complex design software.",
    date: "2026-05-23",
    updatedAt: "2026-05-23",
    readTime: "6 min",
    image: "/blog/how-to-remove-image-backgrounds-online.webp",
    targetKeyword: "remove image background online",
    tags: ["images", "design", "AI"],
  }),
  post({
    slug: "how-to-write-alt-text-for-images",
    title: "How to Write Alt Text for Images: SEO and Accessibility Guide",
    metaTitle: "How to Write Alt Text for Images: SEO and Accessibility Guide",
    metaDescription:
      "Learn how to write clear, useful alt text for SEO, accessibility, blog posts, product images, and social media content.",
    excerpt:
      "Learn how to write clear, useful alt text for SEO, accessibility, blog posts, product images, and social media content.",
    date: "2026-05-23",
    updatedAt: "2026-05-23",
    readTime: "7 min",
    image: "/blog/how-to-write-alt-text-for-images.webp",
    targetKeyword: "how to write alt text",
    tags: ["SEO", "accessibility", "images"],
  }),
  post({
    slug: "image-optimization-checklist",
    title: "Image Optimization Checklist: Compress, Convert, Rename and Describe Images",
    metaTitle: "Image Optimization Checklist: Compress, Convert, Rename and Describe Images",
    metaDescription:
      "A complete image optimization checklist covering compression, file formats, filenames, alt text, captions, and background cleanup.",
    excerpt:
      "A complete image optimization checklist covering compression, file formats, filenames, alt text, captions, and background cleanup.",
    date: "2026-05-23",
    updatedAt: "2026-05-23",
    readTime: "8 min",
    image: "/blog/image-optimization-checklist.webp",
    targetKeyword: "image optimization checklist",
    tags: ["SEO", "images", "performance"],
  }),
  post({
    slug: "best-free-ai-tools-2026",
    title: "Best Free AI Tools for Creators, Students and Small Businesses in 2026",
    metaTitle: "Best Free AI Tools for Creators, Students and Small Businesses in 2026",
    metaDescription:
      "Discover free AI tools that help with captions, bios, study notes, business names, website ideas, image descriptions, and content creation.",
    excerpt:
      "Discover free AI tools that help with captions, bios, study notes, business names, website ideas, and image descriptions.",
    date: "2026-05-23",
    updatedAt: "2026-05-23",
    readTime: "7 min",
    image: "/blog/best-free-ai-tools-2026.webp",
    targetKeyword: "best free AI tools 2026",
    tags: ["AI", "creators", "productivity"],
  }),
  post({ slug: "best-free-tools-for-creators", title: "10 Best Free Online Tools for Creators in 2026", excerpt: "Free tools worth bookmarking for captions, hashtags, images and everyday creator tasks.", date: "2026-05-08", readTime: "6 min", image: "/blog/best-free-tools-for-creators.webp" }),
  post({ slug: "how-to-grow-on-tiktok", title: "How to Grow on TikTok in 2026: A Creator's Playbook", excerpt: "A practical, no-fluff guide to growing a real TikTok audience this year.", date: "2026-04-29", readTime: "8 min", image: "/blog/how-to-grow-on-tiktok.webp" }),
  post({ slug: "how-to-compress-images", title: "How to Compress Images Without Losing Quality", excerpt: "Smaller files load faster and rank better. Here's exactly how to compress images the right way.", date: "2026-04-17", readTime: "5 min", image: "/blog/how-to-compress-images.webp" }),
  post({ slug: "best-color-palettes-for-design", title: "The Best Color Palettes for Modern Design", excerpt: "Curated palettes and the principles behind them. For landing pages, apps and brands.", date: "2026-04-03", readTime: "7 min", image: "/blog/best-color-palettes-for-design.webp" }),
  post({ slug: "how-to-create-a-strong-password", title: "How to Create a Strong Password You'll Actually Remember", excerpt: "Stop reusing passwords. Here's a simple system for strong, memorable credentials.", date: "2026-03-21", readTime: "4 min", image: "/blog/how-to-create-a-strong-password.webp" }),
  post({ slug: "how-to-use-qr-codes-for-marketing", title: "How to Use QR Codes for Marketing (Without Looking Cheap)", excerpt: "QR codes are everywhere again. Here's how to use them in a way that actually works.", date: "2026-03-10", readTime: "5 min", image: "/blog/how-to-use-qr-codes-for-marketing.webp" }),
  post({ slug: "best-productivity-tools-for-remote-workers", title: "The Best Free Productivity Tools for Remote Workers in 2026", excerpt: "Browser-based tools for writing, files, security and quick tasks when you work from home.", date: "2026-02-27", readTime: "7 min", image: "/blog/best-productivity-tools-for-remote-workers.webp" }),
  post({ slug: "how-to-write-youtube-descriptions", title: "How to Write YouTube Descriptions That Actually Get Views", excerpt: "Most creators ignore the description box. That's a mistake. Here's how to fix it.", date: "2026-02-14", readTime: "6 min", image: "/blog/how-to-write-youtube-descriptions.webp" }),
  post({ slug: "css-gradients-guide", title: "The Complete Guide to CSS Gradients in 2026", excerpt: "Linear, radial, conic. Everything you need to build beautiful gradients with clean code.", date: "2026-01-30", readTime: "8 min", image: "/blog/css-gradients-guide.webp" }),
  post({ slug: "how-to-grow-instagram-organically", title: "How to Grow Instagram Organically in 2026", excerpt: "No paid ads, no follow-unfollow tricks. A real strategy for building an engaged audience.", date: "2026-01-16", readTime: "7 min", image: "/blog/how-to-grow-instagram-organically.webp" }),
  post({ slug: "image-seo-guide", title: "Image SEO: The Complete Guide to Ranking Your Images on Google", excerpt: "Alt text, file names, compression, structured data. Everything that makes images rank.", date: "2025-12-19", readTime: "6 min", image: "/blog/image-seo-guide.webp" }),
  post({ slug: "free-design-tools-for-non-designers", title: "Free Design Tools for Non-Designers: Look Professional Without Hiring Anyone", excerpt: "You do not need heavy design software. These free browser tools handle common layout tasks.", date: "2025-12-05", readTime: "5 min", image: "/blog/free-design-tools-for-non-designers.webp" }),
  post({ slug: "how-to-write-better-social-media-captions", title: "How to Write Better Social Media Captions with AI", excerpt: "A caption is the difference between a scroll and a stop. Here's how to write ones that work.", date: "2026-05-10", readTime: "6 min", image: "/blog/how-to-write-better-social-media-captions.webp" }),
  post({ slug: "how-to-write-a-good-social-media-bio", title: "How to Write a Good Social Media Bio", excerpt: "Your bio has five seconds to convince someone to follow you. Here's how to make them count.", date: "2026-05-09", readTime: "5 min", image: "/blog/how-to-write-a-good-social-media-bio.webp" }),
  post({ slug: "simple-online-calculator-guide", title: "Simple Online Calculator Guide for Everyday Math", excerpt: "Percentages, discounts, square roots. The calculations you actually need, explained clearly.", date: "2026-05-08", readTime: "4 min", image: "/blog/simple-online-calculator-guide.webp" }),
  post({ slug: "how-to-choose-a-business-name", title: "How to Choose a Business Name for Your Brand", excerpt: "Most great business names follow a small set of patterns. Here's how to find yours.", date: "2026-05-07", readTime: "6 min", image: "/blog/how-to-choose-a-business-name.webp" }),
  post({ slug: "how-to-create-effective-study-notes", title: "How to Create Effective Study Notes", excerpt: "Good notes are the difference between understanding a topic and just having read about it.", date: "2026-05-06", readTime: "5 min", image: "/blog/how-to-create-effective-study-notes.webp" }),
  post({ slug: "how-to-find-website-ideas", title: "How to Find Website Ideas for Your Next Project", excerpt: "The best website ideas come from real problems. Here's a practical framework for finding them.", date: "2026-05-05", readTime: "6 min", image: "/blog/how-to-find-website-ideas.webp" }),
  post({ slug: "how-to-create-a-professional-resume", title: "How to Create a Professional Resume Online", excerpt: "Structure guides the recruiter's eye. Get it right and the content gets read.", date: "2026-05-04", readTime: "6 min", image: "/blog/how-to-create-a-professional-resume.webp" }),
  post({ slug: "png-vs-jpg-and-how-to-convert-images", title: "PNG vs JPG: Differences and How to Convert Images", excerpt: "Using the wrong format costs you file size or quality. Here's when to use each one.", date: "2026-05-03", readTime: "5 min", image: "/blog/png-vs-jpg-and-how-to-convert-images.webp" }),
  post({ slug: "how-to-create-a-favicon-for-your-website", title: "How to Create a Favicon for Your Website", excerpt: "A missing favicon signals an unfinished site. Here's how to create one in under two minutes.", date: "2026-05-12", readTime: "5 min", image: "/blog/how-to-create-a-favicon-for-your-website.webp" }),
  post({ slug: "how-to-use-svg-blobs-in-web-design", title: "How to Use SVG Blobs in Modern Web Design", excerpt: "Organic shapes break the rigid grid of most web layouts. Here's how to use them well.", date: "2026-05-11", readTime: "5 min", image: "/blog/how-to-use-svg-blobs-in-web-design.webp" }),
  post({ slug: "how-to-choose-font-pairings-for-a-website", title: "How to Choose Font Pairings for a Website", excerpt: "The right font pairing makes content readable and establishes hierarchy. Here's how to find it.", date: "2026-05-10", readTime: "6 min", image: "/blog/how-to-choose-font-pairings-for-a-website.webp" }),
  post({ slug: "how-to-use-image-placeholders-in-web-design", title: "How to Use Image Placeholders in Web Design", excerpt: "Placeholders keep layouts intact while real images are being sourced. Here's when and how.", date: "2026-05-09", readTime: "4 min", image: "/blog/how-to-use-image-placeholders-in-web-design.webp" }),
  post({ slug: "css-box-shadow-guide", title: "CSS Box Shadow Guide: How to Create Better Shadows", excerpt: "Shadows add depth and hierarchy to UI elements. Here's how to create ones that look polished.", date: "2026-05-08", readTime: "6 min", image: "/blog/css-box-shadow-guide.webp" }),
  post({ slug: "css-background-patterns-guide", title: "CSS Background Patterns Guide for Web Design", excerpt: "Background patterns add texture without image files. Here's how to create them with pure CSS.", date: "2026-05-07", readTime: "5 min", image: "/blog/css-background-patterns-guide.webp" }),
  post({ slug: "free-design-tools-for-web-creators", title: "Free Design Tools for Web Creators", excerpt: "Six free browser tools that handle the small details: favicons, blobs, fonts, shadows and patterns.", date: "2026-05-06", readTime: "7 min", image: "/blog/free-design-tools-for-web-creators.webp" }),
];

/** All posts sorted by popularity (views, then likes). */
export const BLOG_POSTS = sortBlogPostsByPopularity(BLOG_POSTS_RAW);

/** Map from tool slug → related blog post slugs (most relevant first) */
export const TOOL_BLOG_MAP: Record<string, string[]> = {
  "pdf-to-word-converter":        ["how-to-convert-pdf-to-word", "best-productivity-tools-for-remote-workers", "best-free-tools-for-creators"],
  "background-remover":           ["how-to-remove-image-backgrounds-online", "image-optimization-checklist", "png-vs-jpg-and-how-to-convert-images"],
  "image-describer":              ["how-to-write-alt-text-for-images", "image-optimization-checklist", "image-seo-guide"],
  "youtube-tags-generator":       ["how-to-write-youtube-descriptions", "best-free-tools-for-creators", "how-to-grow-on-tiktok"],
  "tiktok-money-calculator":      ["how-to-grow-on-tiktok", "best-free-tools-for-creators", "how-to-grow-instagram-organically"],
  "hashtag-generator":            ["how-to-grow-on-tiktok", "how-to-grow-instagram-organically", "how-to-write-better-social-media-captions"],
  "color-palette-generator":      ["best-color-palettes-for-design", "free-design-tools-for-non-designers", "free-design-tools-for-web-creators"],
  "css-gradient-generator":       ["css-gradients-guide", "best-color-palettes-for-design", "free-design-tools-for-web-creators"],
  "qr-code-generator":            ["how-to-use-qr-codes-for-marketing", "best-free-tools-for-creators", "best-productivity-tools-for-remote-workers"],
  "word-counter":                 ["how-to-write-youtube-descriptions", "how-to-convert-pdf-to-word", "best-productivity-tools-for-remote-workers"],
  "password-generator":           ["how-to-create-a-strong-password", "best-productivity-tools-for-remote-workers", "best-free-tools-for-creators"],
  "text-case-converter":          ["how-to-convert-pdf-to-word", "best-productivity-tools-for-remote-workers", "how-to-write-youtube-descriptions"],
  "image-compressor":             ["image-optimization-checklist", "how-to-compress-images", "image-seo-guide"],
  "ai-caption-generator":         ["how-to-write-better-social-media-captions", "best-free-ai-tools-2026", "how-to-grow-instagram-organically"],
  "bio-generator":                ["how-to-write-a-good-social-media-bio", "best-free-ai-tools-2026", "how-to-write-better-social-media-captions"],
  "calculator":                   ["simple-online-calculator-guide", "best-productivity-tools-for-remote-workers", "best-free-tools-for-creators"],
  "business-name-generator":      ["how-to-choose-a-business-name", "best-free-ai-tools-2026", "how-to-find-website-ideas"],
  "study-notes-generator":        ["how-to-create-effective-study-notes", "best-free-ai-tools-2026", "best-productivity-tools-for-remote-workers"],
  "website-idea-generator":       ["how-to-find-website-ideas", "best-free-ai-tools-2026", "how-to-choose-a-business-name"],
  "resume-generator":             ["how-to-create-a-professional-resume", "best-productivity-tools-for-remote-workers", "how-to-write-a-good-social-media-bio"],
  "png-to-jpg-converter":         ["png-vs-jpg-and-how-to-convert-images", "image-optimization-checklist", "how-to-compress-images"],
  "favicon-generator":            ["how-to-create-a-favicon-for-your-website", "free-design-tools-for-web-creators", "free-design-tools-for-non-designers"],
  "svg-blob-generator":           ["how-to-use-svg-blobs-in-web-design", "free-design-tools-for-web-creators", "best-color-palettes-for-design"],
  "font-pairing-tool":            ["how-to-choose-font-pairings-for-a-website", "free-design-tools-for-web-creators", "best-color-palettes-for-design"],
  "image-placeholder-generator":  ["how-to-use-image-placeholders-in-web-design", "free-design-tools-for-web-creators", "how-to-compress-images"],
  "box-shadow-generator":         ["css-box-shadow-guide", "css-gradients-guide", "free-design-tools-for-web-creators"],
  "background-pattern-generator": ["css-background-patterns-guide", "css-gradients-guide", "free-design-tools-for-web-creators"],
};

export function blogPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Returns the 3 most relevant blog posts for a given tool slug */
export function blogPostsForTool(toolSlug: string): BlogPost[] {
  const slugs = TOOL_BLOG_MAP[toolSlug] ?? [];
  const mapped = slugs
    .map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter((p): p is BlogPost => Boolean(p));
  if (mapped.length < 3) {
    const extra = BLOG_POSTS.filter((p) => !mapped.includes(p)).slice(0, 3 - mapped.length);
    return [...mapped, ...extra];
  }
  return mapped.slice(0, 3);
}
