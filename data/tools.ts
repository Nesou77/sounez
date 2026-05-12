export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: "creator-tools" | "design-tools" | "utility-tools";
  emoji: string;
  keywords: string[];
};

export const TOOLS: Tool[] = [
  { slug: "youtube-tags-generator", name: "YouTube Tags Generator", description: "Type a keyword and get 25 ready-to-paste YouTube tags that help your video show up in search.", category: "creator-tools", emoji: "🎬", keywords: ["youtube tags", "seo tags"] },
  { slug: "tiktok-money-calculator", name: "TikTok Money Calculator", description: "See what your TikTok account could earn per sponsored post based on your followers and engagement.", category: "creator-tools", emoji: "💸", keywords: ["tiktok money", "creator earnings"] },
  { slug: "hashtag-generator", name: "Hashtag Generator", description: "Enter a topic and get a ready-to-copy set of hashtags for Instagram, TikTok and YouTube.", category: "creator-tools", emoji: "#️⃣", keywords: ["hashtag", "instagram"] },
  { slug: "color-palette-generator", name: "Color Palette Generator", description: "Generate a five-color palette in one click. Tap any swatch to copy the hex code.", category: "design-tools", emoji: "🎨", keywords: ["color palette", "design"] },
  { slug: "css-gradient-generator", name: "CSS Gradient Generator", description: "Pick two colors, set an angle, and copy the CSS gradient code straight into your project.", category: "design-tools", emoji: "🌈", keywords: ["css", "gradient"] },
  { slug: "qr-code-generator", name: "QR Code Generator", description: "Paste a URL or text and download a high-resolution QR code PNG. Free, no account needed.", category: "utility-tools", emoji: "📱", keywords: ["qr code"] },
  { slug: "word-counter", name: "Word Counter", description: "Paste your text and instantly see word count, character count, sentence count and reading time.", category: "utility-tools", emoji: "📝", keywords: ["word counter", "character"] },
  { slug: "password-generator", name: "Password Generator", description: "Create a strong random password with the length and character types you choose. Runs in your browser.", category: "utility-tools", emoji: "🔐", keywords: ["password"] },
  { slug: "text-case-converter", name: "Text Case Converter", description: "Paste text and convert it to UPPERCASE, lowercase, Title Case, camelCase, kebab-case or snake_case.", category: "utility-tools", emoji: "🔡", keywords: ["text case"] },
  { slug: "image-compressor", name: "Image Compressor", description: "Drop in a JPG or PNG and compress it right in your browser. Nothing gets uploaded to any server.", category: "utility-tools", emoji: "🖼️", keywords: ["image compressor"] },
];

export const CATEGORIES = [
  { slug: "creator-tools", name: "Creator Tools", description: "Tools for YouTubers, TikTokers and content creators who want to grow without wasting time.", emoji: "🚀" },
  { slug: "design-tools", name: "Design Tools", description: "Color palettes, gradients and visual helpers for designers and developers who ship fast.", emoji: "🎨" },
  { slug: "utility-tools", name: "Utility Tools", description: "Everyday tools that just get things done. QR codes, word counters, passwords and more.", emoji: "🛠️" },
] as const;

export const BLOG_POSTS = [
  { slug: "best-free-tools-for-creators", title: "10 Best Free Online Tools for Creators in 2026", excerpt: "The free tools every creator should have bookmarked. Save time, publish faster, grow smarter.", date: "2026-05-08", readTime: "6 min", image: "/blog/best-free-tools-for-creators.webp" },
  { slug: "how-to-grow-on-tiktok", title: "How to Grow on TikTok in 2026: A Creator's Playbook", excerpt: "A practical, no-fluff guide to growing a real TikTok audience this year.", date: "2026-04-29", readTime: "8 min", image: "/blog/how-to-grow-on-tiktok.webp" },
  { slug: "how-to-compress-images", title: "How to Compress Images Without Losing Quality", excerpt: "Smaller files load faster and rank better. Here's exactly how to compress images the right way.", date: "2026-04-17", readTime: "5 min", image: "/blog/how-to-compress-images.webp" },
  { slug: "best-color-palettes-for-design", title: "The Best Color Palettes for Modern Design", excerpt: "Curated palettes and the principles behind them. For landing pages, apps and brands.", date: "2026-04-03", readTime: "7 min", image: "/blog/best-color-palettes-for-design.webp" },
  { slug: "how-to-create-a-strong-password", title: "How to Create a Strong Password You'll Actually Remember", excerpt: "Stop reusing passwords. Here's a simple system for strong, memorable credentials.", date: "2026-03-21", readTime: "4 min", image: "/blog/how-to-create-a-strong-password.webp" },
  { slug: "how-to-use-qr-codes-for-marketing", title: "How to Use QR Codes for Marketing (Without Looking Cheap)", excerpt: "QR codes are everywhere again. Here's how to use them in a way that actually works.", date: "2026-03-10", readTime: "5 min", image: "/blog/how-to-use-qr-codes-for-marketing.webp" },
  { slug: "best-productivity-tools-for-remote-workers", title: "The Best Free Productivity Tools for Remote Workers in 2026", excerpt: "Work from anywhere without paying for a bloated app stack. These free tools cover everything.", date: "2026-02-27", readTime: "7 min", image: "/blog/best-productivity-tools-for-remote-workers.webp" },
  { slug: "how-to-write-youtube-descriptions", title: "How to Write YouTube Descriptions That Actually Get Views", excerpt: "Most creators ignore the description box. That's a mistake. Here's how to fix it.", date: "2026-02-14", readTime: "6 min", image: "/blog/how-to-write-youtube-descriptions.webp" },
  { slug: "css-gradients-guide", title: "The Complete Guide to CSS Gradients in 2026", excerpt: "Linear, radial, conic. Everything you need to build beautiful gradients with clean code.", date: "2026-01-30", readTime: "8 min", image: "/blog/css-gradients-guide.webp" },
  { slug: "how-to-grow-instagram-organically", title: "How to Grow Instagram Organically in 2026", excerpt: "No paid ads, no follow-unfollow tricks. A real strategy for building an engaged audience.", date: "2026-01-16", readTime: "7 min", image: "/blog/how-to-grow-instagram-organically.webp" },
  { slug: "image-seo-guide", title: "Image SEO: The Complete Guide to Ranking Your Images on Google", excerpt: "Alt text, file names, compression, structured data. Everything that makes images rank.", date: "2025-12-19", readTime: "6 min", image: "/blog/image-seo-guide.webp" },
  { slug: "free-design-tools-for-non-designers", title: "Free Design Tools for Non-Designers: Look Professional Without Hiring Anyone", excerpt: "You don't need Figma or Photoshop. These free browser tools cover 90% of what most people need.", date: "2025-12-05", readTime: "5 min", image: "/blog/free-design-tools-for-non-designers.webp" },
];

export function toolBySlug(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}
export function toolsByCategory(cat: string) {
  return TOOLS.filter((t) => t.category === cat);
}
