export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  /** Static fallback publish date (ISO YYYY-MM-DD). Used when no DB record exists. */
  publishedAt?: string;
  /** Static fallback last-updated date (ISO YYYY-MM-DD). Defaults to publishedAt when absent. */
  updatedAt?: string;
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
    publishedAt: "2025-03-10",
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
    publishedAt: "2025-03-15",
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
    publishedAt: "2025-03-20",
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
    publishedAt: "2025-03-25",
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
    publishedAt: "2025-04-01",
    targetKeyword: "best free AI tools 2026",
    tags: ["AI", "creators", "productivity"],
  },
  { slug: "best-free-tools-for-creators", title: "10 Best Free Online Tools for Creators in 2026", excerpt: "Free tools worth bookmarking for captions, hashtags, images and everyday creator tasks.", readTime: "8 min", image: "/blog/best-free-tools-for-creators.webp", publishedAt: "2025-04-05", metaTitle: "10 Best Free Online Tools for Creators in 2026 | Sounez", metaDescription: "The ten free browser-based tools every creator needs in 2026: YouTube tags, hashtags, image compression, QR codes, color palettes, and more.", tags: ["creators", "tools", "productivity"] },
  { slug: "how-to-grow-on-tiktok", title: "How to Grow on TikTok in 2026: A Creator's Playbook", excerpt: "A practical guide to defining your niche, improving hooks, posting consistently, and measuring progress.", readTime: "8 min", image: "/blog/how-to-grow-on-tiktok.webp", publishedAt: "2025-04-10", metaTitle: "How to Grow on TikTok in 2026 | Sounez", metaDescription: "A practical TikTok growth playbook: niche definition, hook writing, posting cadence, hashtag strategy, and a 30-day plan for new accounts.", tags: ["TikTok", "social media", "growth"] },
  { slug: "how-to-compress-images", title: "How to Compress Images Without Losing Quality", excerpt: "Smaller files can make pages feel faster. Learn format choices, sizing, and safe browser-based compression.", readTime: "5 min", image: "/blog/how-to-compress-images.webp", publishedAt: "2025-04-15", metaTitle: "How to Compress Images Without Losing Quality | Sounez", metaDescription: "Compress JPG, PNG and WebP images without visible quality loss. Learn format differences, dimension best practices, and browser-based compression.", tags: ["images", "compression", "performance"] },
  { slug: "best-color-palettes-for-design", title: "The Best Color Palettes for Modern Design", excerpt: "Curated palettes and the principles behind them. For landing pages, apps and brands.", readTime: "7 min", image: "/blog/best-color-palettes-for-design.webp", publishedAt: "2025-04-20", metaTitle: "The Best Color Palettes for Modern Design | Sounez", metaDescription: "Curated color palettes with hex codes and the design principles behind them. For landing pages, SaaS apps, brands and everyday web projects.", tags: ["design", "color", "palettes"] },
  { slug: "how-to-create-a-strong-password", title: "How to Create a Strong Password You'll Actually Remember", excerpt: "Stop reusing passwords. Here's a simple system for strong, memorable credentials.", readTime: "7 min", image: "/blog/how-to-create-a-strong-password.webp", publishedAt: "2025-04-25", metaTitle: "How to Create a Strong Password You'll Actually Remember | Sounez", metaDescription: "Stop reusing passwords. A modern system using generators, password managers, and 2FA to protect every account — including a free password generator.", tags: ["security", "passwords", "productivity"] },
  { slug: "how-to-use-qr-codes-for-marketing", title: "How to Use QR Codes for Marketing Clearly", excerpt: "QR codes are common on menus, flyers, packaging, and events. Use them with a clear destination and label.", readTime: "6 min", image: "/blog/how-to-use-qr-codes-for-marketing.webp", publishedAt: "2025-05-01", metaTitle: "How to Use QR Codes for Marketing (Without Looking Cheap) | Sounez", metaDescription: "How to use QR codes effectively in print, packaging, events and social media. Anatomy of a good QR placement, real campaign examples, and a free generator.", tags: ["QR codes", "marketing", "print"] },
  { slug: "best-productivity-tools-for-remote-workers", title: "The Best Free Productivity Tools for Remote Workers in 2026", excerpt: "Browser-based tools for writing, files, security and quick tasks when you work from home.", readTime: "7 min", image: "/blog/best-productivity-tools-for-remote-workers.webp", publishedAt: "2025-05-05", metaTitle: "Best Free Productivity Tools for Remote Workers in 2026 | Sounez", metaDescription: "Browser-based tools for remote workers: word counters, password generators, file converters, image compressors and security helpers — all free and account-free.", tags: ["productivity", "remote work", "tools"] },
  { slug: "how-to-write-youtube-descriptions", title: "How to Write Better YouTube Descriptions", excerpt: "Use the description box to clarify the video, add useful links, and help viewers find the right next step.", readTime: "7 min", image: "/blog/how-to-write-youtube-descriptions.webp", publishedAt: "2025-05-10", metaTitle: "How to Write Better YouTube Descriptions (2026) | Sounez", metaDescription: "Write YouTube descriptions that help discovery: primary keyword placement, timestamps, secondary keywords, links, hashtags, and a before/after worked example.", tags: ["YouTube", "SEO", "content"] },
  { slug: "css-gradients-guide", title: "A Practical Guide to CSS Gradients in 2026", excerpt: "Linear, radial, and conic gradients, with examples you can adapt without making text harder to read.", readTime: "8 min", image: "/blog/css-gradients-guide.webp", publishedAt: "2025-05-15", metaTitle: "The Complete Guide to CSS Gradients in 2026 | Sounez", metaDescription: "Linear, radial and conic CSS gradients explained with copy-paste code examples. Hero backgrounds, CTA buttons, text gradients and card borders.", tags: ["CSS", "design", "gradients"] },
  { slug: "how-to-grow-instagram-organically", title: "How to Grow Instagram Organically in 2026", excerpt: "No paid ads, no follow-unfollow tricks. A real strategy for building an engaged audience.", readTime: "7 min", image: "/blog/how-to-grow-instagram-organically.webp", publishedAt: "2025-05-20", metaTitle: "How to Grow Instagram Organically in 2026 | Sounez", metaDescription: "No paid ads, no follow-unfollow tricks. A real Instagram growth strategy: niche, visual identity, saves-first content, hashtags, image dimensions, and a 90-day plan.", tags: ["Instagram", "social media", "growth"] },
  { slug: "image-seo-guide", title: "Image SEO Guide: Alt Text, File Names and Compression", excerpt: "A practical image SEO checklist for accessibility, page speed, filenames, captions, and structured data.", readTime: "7 min", image: "/blog/image-seo-guide.webp", publishedAt: "2025-05-25", metaTitle: "Image SEO Guide: Alt Text, File Names and Compression | Sounez", metaDescription: "A practical image SEO guide: file naming, alt text, compression, WebP format, lazy loading, image sitemaps, and structured data for better search visibility.", tags: ["SEO", "images", "performance"] },
  { slug: "free-design-tools-for-non-designers", title: "Free Design Tools for Non-Designers: Look Professional Without Hiring Anyone", excerpt: "You do not need heavy design software. These free browser tools handle common layout tasks.", readTime: "6 min", image: "/blog/free-design-tools-for-non-designers.webp", publishedAt: "2025-06-01", metaTitle: "Free Design Tools for Non-Designers | Sounez", metaDescription: "Six free browser tools for non-designers: color palettes, CSS gradients, image compression, QR codes, font pairings, and text case correction.", tags: ["design", "tools", "non-designers"] },
  { slug: "how-to-write-better-social-media-captions", title: "How to Write Better Social Media Captions with AI", excerpt: "A caption is the difference between a scroll and a stop. Here's how to write ones that work.", readTime: "6 min", image: "/blog/how-to-write-better-social-media-captions.webp", publishedAt: "2025-06-05", metaTitle: "How to Write Better Social Media Captions with AI (2026) | Sounez", metaDescription: "Write clearer captions for Instagram, TikTok and LinkedIn. Platform examples, four-element framework, caption templates, and how to use AI as a first draft.", tags: ["captions", "social media", "AI"] },
  { slug: "how-to-write-a-good-social-media-bio", title: "How to Write a Good Social Media Bio", excerpt: "Your bio has five seconds to convince someone to follow you. Here's how to make them count.", readTime: "5 min", image: "/blog/how-to-write-a-good-social-media-bio.webp", publishedAt: "2025-06-10", metaTitle: "How to Write a Good Social Media Bio (2026 Guide) | Sounez", metaDescription: "Write bios for Instagram, TikTok, LinkedIn and personal websites with character limits, examples, mistakes to avoid, and a free bio generator.", tags: ["bio", "social media", "creators"] },
  { slug: "simple-online-calculator-guide", title: "Simple Online Calculator Guide for Everyday Math", excerpt: "Percentages, discounts, square roots. The calculations you actually need, explained clearly.", readTime: "6 min", image: "/blog/simple-online-calculator-guide.webp", publishedAt: "2025-06-15", metaTitle: "Simple Online Calculator Guide for Everyday Math | Sounez", metaDescription: "Understand everyday calculations: order of operations, percentages, discounts, square roots, and real-world scenarios like bill splitting and rate checking.", tags: ["calculator", "math", "productivity"] },
  { slug: "how-to-choose-a-business-name", title: "How to Choose a Business Name for Your Brand", excerpt: "Most great business names follow a small set of patterns. Here's how to find yours.", readTime: "6 min", image: "/blog/how-to-choose-a-business-name.webp", publishedAt: "2025-06-20", metaTitle: "How to Choose a Business Name for Your Brand | Sounez", metaDescription: "Six business naming styles, real examples by industry, trademark and domain checklist, and a free AI business name generator.", tags: ["business", "branding", "naming"] },
  { slug: "how-to-create-effective-study-notes", title: "How to Create Effective Study Notes", excerpt: "Good notes are the difference between understanding a topic and just having read about it.", readTime: "5 min", image: "/blog/how-to-create-effective-study-notes.webp", publishedAt: "2025-07-01", metaTitle: "How to Create Effective Study Notes | Sounez", metaDescription: "Compare four note-taking methods, use spaced repetition and key terms, and learn how AI study notes can accelerate structured revision.", tags: ["study", "notes", "productivity"] },
  { slug: "how-to-find-website-ideas", title: "How to Find Website Ideas for Your Next Project", excerpt: "The best website ideas come from real problems. Here's a practical framework for finding them.", readTime: "6 min", image: "/blog/how-to-find-website-ideas.webp", publishedAt: "2025-07-05", metaTitle: "How to Find Website Ideas for Your Next Project | Sounez", metaDescription: "Five website categories with monetization timelines, validation advice, feature planning, and a free website idea generator.", tags: ["website", "ideas", "entrepreneurship"] },
  { slug: "how-to-create-a-professional-resume", title: "How to Create a Professional Resume Online", excerpt: "Structure guides the recruiter's eye. Get it right and the content gets read.", readTime: "6 min", image: "/blog/how-to-create-a-professional-resume.webp", publishedAt: "2025-07-10", metaTitle: "How to Create a Professional Resume Online | Sounez", metaDescription: "Build a clean resume: structure, summary formula, achievements vs responsibilities, formatting rules, and free export to HTML or PDF.", tags: ["resume", "career", "productivity"] },
  { slug: "png-vs-jpg-and-how-to-convert-images", title: "PNG vs JPG: Differences and How to Convert Images", excerpt: "Using the wrong format costs you file size or quality. Here's when to use each one.", readTime: "5 min", image: "/blog/png-vs-jpg-and-how-to-convert-images.webp", publishedAt: "2025-07-15", metaTitle: "PNG vs JPG: Differences and How to Convert Images (2026) | Sounez", metaDescription: "When to use PNG vs JPG, what happens to transparency during conversion, quality settings explained, and how to convert safely in your browser.", tags: ["images", "PNG", "JPG"] },
  { slug: "how-to-create-a-favicon-for-your-website", title: "How to Create a Favicon for Your Website", excerpt: "A missing favicon signals an unfinished site. Here's how to create one in under two minutes.", readTime: "5 min", image: "/blog/how-to-create-a-favicon-for-your-website.webp", publishedAt: "2025-07-20", metaTitle: "How to Create a Favicon for Your Website | Sounez", metaDescription: "Create a favicon from text, emoji or image. Recommended sizes, PNG vs ICO, HTML implementation, PWA considerations, and a free browser-based generator.", tags: ["favicon", "web design", "branding"] },
  { slug: "how-to-use-svg-blobs-in-web-design", title: "How to Use SVG Blobs in Modern Web Design", excerpt: "Organic shapes break the rigid grid of most web layouts. Here's how to use them well.", readTime: "5 min", image: "/blog/how-to-use-svg-blobs-in-web-design.webp", publishedAt: "2025-07-25", metaTitle: "How to Use SVG Blobs in Modern Web Design | Sounez", metaDescription: "Use SVG blobs for hero sections, backgrounds and creative layouts. Use cases, CSS techniques, performance tips, common mistakes, and a free blob generator.", tags: ["SVG", "web design", "CSS"] },
  { slug: "how-to-choose-font-pairings-for-a-website", title: "How to Choose Font Pairings for a Website", excerpt: "The right font pairing makes content readable and establishes hierarchy. Here's how to find it.", readTime: "6 min", image: "/blog/how-to-choose-font-pairings-for-a-website.webp", publishedAt: "2025-08-01", metaTitle: "How to Choose Font Pairings for a Website | Sounez", metaDescription: "Four font pairing principles, serif and sans-serif combinations, project-type examples, performance tips, and a free font pairing tool with CSS output.", tags: ["typography", "fonts", "web design"] },
  { slug: "how-to-use-image-placeholders-in-web-design", title: "How to Use Image Placeholders in Web Design", excerpt: "Placeholders keep layouts intact while real images are being sourced. Here's when and how.", readTime: "5 min", image: "/blog/how-to-use-image-placeholders-in-web-design.webp", publishedAt: "2025-08-05", metaTitle: "How to Use Image Placeholders in Web Design (2026) | Sounez", metaDescription: "Standard placeholder sizes, SVG vs PNG, naming conventions, replacement workflow, HTML/CSS usage, and a free browser-based placeholder generator.", tags: ["web design", "placeholders", "development"] },
  { slug: "css-box-shadow-guide", title: "CSS Box Shadow Guide: How to Create Better Shadows", excerpt: "Shadows add depth and hierarchy to UI elements. Here's how to create ones that look polished.", readTime: "6 min", image: "/blog/css-box-shadow-guide.webp", publishedAt: "2025-08-10", metaTitle: "CSS Box Shadow Guide: How to Create Better Shadows | Sounez", metaDescription: "CSS box shadow syntax explained with code examples: soft shadows, layered shadows, colored glows, inset shadows, animation, and accessibility considerations.", tags: ["CSS", "design", "shadows"] },
  { slug: "css-background-patterns-guide", title: "CSS Background Patterns Guide for Web Design", excerpt: "Background patterns add texture without image files. Here's how to create them with pure CSS.", readTime: "5 min", image: "/blog/css-background-patterns-guide.webp", publishedAt: "2025-08-15", metaTitle: "CSS Background Patterns Guide for Web Design | Sounez", metaDescription: "Create dots, grids, lines and diagonal patterns with pure CSS and SVG. Copy-paste code examples, use cases, performance notes, and a free pattern generator.", tags: ["CSS", "patterns", "web design"] },
  { slug: "free-design-tools-for-web-creators", title: "Free Design Tools for Web Creators", excerpt: "Six free browser tools that handle the small details: favicons, blobs, fonts, shadows and patterns.", readTime: "7 min", image: "/blog/free-design-tools-for-web-creators.webp", publishedAt: "2025-08-20", metaTitle: "Free Design Tools for Web Creators | Sounez", metaDescription: "Six free browser tools for web creators: favicon generator, SVG blob generator, font pairing tool, CSS box shadow, background patterns, and image placeholders.", tags: ["design", "web", "tools"] },
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
