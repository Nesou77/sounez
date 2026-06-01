export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  targetKeyword?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
};

const BLOG_POSTS_RAW: BlogPost[] = [
  {
    slug: "how-to-convert-pdf-to-word",
    title: "How to Convert PDF to Word Without Losing Formatting",
    metaTitle: "How to Convert PDF to Word Without Losing Formatting",
    metaDescription:
      "Learn how to convert PDF files into editable Word documents while keeping your layout, text, images, and formatting as clean as possible.",
    excerpt:
      "Learn how to convert PDF files into editable Word documents while keeping your layout, text, images, and formatting as clean as possible.",
    readTime: "6 min",
    image: "/blog/how-to-convert-pdf-to-word.webp",
    targetKeyword: "convert PDF to Word",
    tags: ["PDF", "Word", "productivity"],
  },
  {
    slug: "how-to-remove-image-backgrounds-online",
    title: "How to Remove Image Backgrounds Online for Free",
    metaTitle: "How to Remove Image Backgrounds Online for Free",
    metaDescription:
      "Remove image backgrounds online for product photos, profile pictures, social posts, and design projects without using complex design software.",
    excerpt:
      "Remove image backgrounds online for product photos, profile pictures, social posts, and design projects without using complex design software.",
    readTime: "6 min",
    image: "/blog/how-to-remove-image-backgrounds-online.webp",
    targetKeyword: "remove image background online",
    tags: ["images", "design", "AI"],
  },
  {
    slug: "how-to-write-alt-text-for-images",
    title: "How to Write Alt Text for Images: SEO and Accessibility Guide",
    metaTitle: "How to Write Alt Text for Images: SEO and Accessibility Guide",
    metaDescription:
      "Learn how to write clear, useful alt text for SEO, accessibility, blog posts, product images, and social media content.",
    excerpt:
      "Learn how to write clear, useful alt text for SEO, accessibility, blog posts, product images, and social media content.",
    readTime: "7 min",
    image: "/blog/how-to-write-alt-text-for-images.webp",
    targetKeyword: "how to write alt text",
    tags: ["SEO", "accessibility", "images"],
  },
  {
    slug: "image-optimization-checklist",
    title: "Image Optimization Checklist: Compress, Convert, Rename and Describe Images",
    metaTitle: "Image Optimization Checklist: Compress, Convert, Rename and Describe Images",
    metaDescription:
      "A complete image optimization checklist covering compression, file formats, filenames, alt text, captions, and background cleanup.",
    excerpt:
      "A complete image optimization checklist covering compression, file formats, filenames, alt text, captions, and background cleanup.",
    readTime: "8 min",
    image: "/blog/image-optimization-checklist.webp",
    targetKeyword: "image optimization checklist",
    tags: ["SEO", "images", "performance"],
  },
  {
    slug: "best-free-ai-tools-2026",
    title: "Best Free AI Tools for Creators, Students and Small Businesses in 2026",
    metaTitle: "Best Free AI Tools for Creators, Students and Small Businesses in 2026",
    metaDescription:
      "Discover free AI tools that help with captions, bios, study notes, business names, website ideas, image descriptions, and content creation.",
    excerpt:
      "Discover free AI tools that help with captions, bios, study notes, business names, website ideas, and image descriptions.",
    readTime: "7 min",
    image: "/blog/best-free-ai-tools-2026.webp",
    targetKeyword: "best free AI tools 2026",
    tags: ["AI", "creators", "productivity"],
  },
  { slug: "best-free-tools-for-creators", title: "10 Best Free Online Tools for Creators in 2026", excerpt: "Free tools worth bookmarking for captions, hashtags, images and everyday creator tasks.", readTime: "6 min", image: "/blog/best-free-tools-for-creators.webp" },
  { slug: "how-to-grow-on-tiktok", title: "How to Grow on TikTok in 2026: A Creator's Playbook", excerpt: "A practical guide to defining your niche, improving hooks, posting consistently, and measuring progress.", readTime: "8 min", image: "/blog/how-to-grow-on-tiktok.webp" },
  { slug: "how-to-compress-images", title: "How to Compress Images Without Losing Quality", excerpt: "Smaller files can make pages feel faster. Learn format choices, sizing, and safe browser-based compression.", readTime: "5 min", image: "/blog/how-to-compress-images.webp" },
  { slug: "best-color-palettes-for-design", title: "The Best Color Palettes for Modern Design", excerpt: "Curated palettes and the principles behind them. For landing pages, apps and brands.", readTime: "7 min", image: "/blog/best-color-palettes-for-design.webp" },
  { slug: "how-to-create-a-strong-password", title: "How to Create a Strong Password You'll Actually Remember", excerpt: "Stop reusing passwords. Here's a simple system for strong, memorable credentials.", readTime: "4 min", image: "/blog/how-to-create-a-strong-password.webp" },
  { slug: "how-to-use-qr-codes-for-marketing", title: "How to Use QR Codes for Marketing Clearly", excerpt: "QR codes are common on menus, flyers, packaging, and events. Use them with a clear destination and label.", readTime: "5 min", image: "/blog/how-to-use-qr-codes-for-marketing.webp" },
  { slug: "best-productivity-tools-for-remote-workers", title: "The Best Free Productivity Tools for Remote Workers in 2026", excerpt: "Browser-based tools for writing, files, security and quick tasks when you work from home.", readTime: "7 min", image: "/blog/best-productivity-tools-for-remote-workers.webp" },
  { slug: "how-to-write-youtube-descriptions", title: "How to Write Better YouTube Descriptions", excerpt: "Use the description box to clarify the video, add useful links, and help viewers find the right next step.", readTime: "6 min", image: "/blog/how-to-write-youtube-descriptions.webp" },
  { slug: "css-gradients-guide", title: "A Practical Guide to CSS Gradients in 2026", excerpt: "Linear, radial, and conic gradients, with examples you can adapt without making text harder to read.", readTime: "8 min", image: "/blog/css-gradients-guide.webp" },
  { slug: "how-to-grow-instagram-organically", title: "How to Grow Instagram Organically in 2026", excerpt: "No paid ads, no follow-unfollow tricks. A real strategy for building an engaged audience.", readTime: "7 min", image: "/blog/how-to-grow-instagram-organically.webp" },
  { slug: "image-seo-guide", title: "Image SEO Guide: Alt Text, File Names and Compression", excerpt: "A practical image SEO checklist for accessibility, page speed, filenames, captions, and structured data.", readTime: "6 min", image: "/blog/image-seo-guide.webp" },
  { slug: "free-design-tools-for-non-designers", title: "Free Design Tools for Non-Designers: Look Professional Without Hiring Anyone", excerpt: "You do not need heavy design software. These free browser tools handle common layout tasks.", readTime: "5 min", image: "/blog/free-design-tools-for-non-designers.webp" },
  { slug: "how-to-write-better-social-media-captions", title: "How to Write Better Social Media Captions with AI", excerpt: "A caption is the difference between a scroll and a stop. Here's how to write ones that work.", readTime: "6 min", image: "/blog/how-to-write-better-social-media-captions.webp" },
  { slug: "how-to-write-a-good-social-media-bio", title: "How to Write a Good Social Media Bio", excerpt: "Your bio has five seconds to convince someone to follow you. Here's how to make them count.", readTime: "5 min", image: "/blog/how-to-write-a-good-social-media-bio.webp" },
  { slug: "simple-online-calculator-guide", title: "Simple Online Calculator Guide for Everyday Math", excerpt: "Percentages, discounts, square roots. The calculations you actually need, explained clearly.", readTime: "4 min", image: "/blog/simple-online-calculator-guide.webp" },
  { slug: "how-to-choose-a-business-name", title: "How to Choose a Business Name for Your Brand", excerpt: "Most great business names follow a small set of patterns. Here's how to find yours.", readTime: "6 min", image: "/blog/how-to-choose-a-business-name.webp" },
  { slug: "how-to-create-effective-study-notes", title: "How to Create Effective Study Notes", excerpt: "Good notes are the difference between understanding a topic and just having read about it.", readTime: "5 min", image: "/blog/how-to-create-effective-study-notes.webp" },
  { slug: "how-to-find-website-ideas", title: "How to Find Website Ideas for Your Next Project", excerpt: "The best website ideas come from real problems. Here's a practical framework for finding them.", readTime: "6 min", image: "/blog/how-to-find-website-ideas.webp" },
  { slug: "how-to-create-a-professional-resume", title: "How to Create a Professional Resume Online", excerpt: "Structure guides the recruiter's eye. Get it right and the content gets read.", readTime: "6 min", image: "/blog/how-to-create-a-professional-resume.webp" },
  { slug: "png-vs-jpg-and-how-to-convert-images", title: "PNG vs JPG: Differences and How to Convert Images", excerpt: "Using the wrong format costs you file size or quality. Here's when to use each one.", readTime: "5 min", image: "/blog/png-vs-jpg-and-how-to-convert-images.webp" },
  { slug: "how-to-create-a-favicon-for-your-website", title: "How to Create a Favicon for Your Website", excerpt: "A missing favicon signals an unfinished site. Here's how to create one in under two minutes.", readTime: "5 min", image: "/blog/how-to-create-a-favicon-for-your-website.webp" },
  { slug: "how-to-use-svg-blobs-in-web-design", title: "How to Use SVG Blobs in Modern Web Design", excerpt: "Organic shapes break the rigid grid of most web layouts. Here's how to use them well.", readTime: "5 min", image: "/blog/how-to-use-svg-blobs-in-web-design.webp" },
  { slug: "how-to-choose-font-pairings-for-a-website", title: "How to Choose Font Pairings for a Website", excerpt: "The right font pairing makes content readable and establishes hierarchy. Here's how to find it.", readTime: "6 min", image: "/blog/how-to-choose-font-pairings-for-a-website.webp" },
  { slug: "how-to-use-image-placeholders-in-web-design", title: "How to Use Image Placeholders in Web Design", excerpt: "Placeholders keep layouts intact while real images are being sourced. Here's when and how.", readTime: "4 min", image: "/blog/how-to-use-image-placeholders-in-web-design.webp" },
  { slug: "css-box-shadow-guide", title: "CSS Box Shadow Guide: How to Create Better Shadows", excerpt: "Shadows add depth and hierarchy to UI elements. Here's how to create ones that look polished.", readTime: "6 min", image: "/blog/css-box-shadow-guide.webp" },
  { slug: "css-background-patterns-guide", title: "CSS Background Patterns Guide for Web Design", excerpt: "Background patterns add texture without image files. Here's how to create them with pure CSS.", readTime: "5 min", image: "/blog/css-background-patterns-guide.webp" },
  { slug: "free-design-tools-for-web-creators", title: "Free Design Tools for Web Creators", excerpt: "Six free browser tools that handle the small details: favicons, blobs, fonts, shadows and patterns.", readTime: "7 min", image: "/blog/free-design-tools-for-web-creators.webp" },
];

/** All posts sorted alphabetically by title (no synthetic popularity metrics). */
export const BLOG_POSTS = [...BLOG_POSTS_RAW].sort((a, b) => a.title.localeCompare(b.title));

/** Map from tool slug -> related blog post slugs (most relevant first) */
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
