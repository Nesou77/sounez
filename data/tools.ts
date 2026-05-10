export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: "creator-tools" | "design-tools" | "utility-tools";
  emoji: string;
  keywords: string[];
};

export const TOOLS: Tool[] = [
  { slug: "youtube-tags-generator", name: "YouTube Tags Generator", description: "Generate optimized YouTube tags to boost video discoverability and rank higher.", category: "creator-tools", emoji: "🎬", keywords: ["youtube tags", "seo tags"] },
  { slug: "tiktok-money-calculator", name: "TikTok Money Calculator", description: "Estimate your potential TikTok earnings based on followers and engagement rate.", category: "creator-tools", emoji: "💸", keywords: ["tiktok money", "creator earnings"] },
  { slug: "hashtag-generator", name: "Hashtag Generator", description: "Generate trending hashtags for Instagram, TikTok and YouTube in seconds.", category: "creator-tools", emoji: "#️⃣", keywords: ["hashtag", "instagram"] },
  { slug: "color-palette-generator", name: "Color Palette Generator", description: "Create beautiful, harmonious color palettes for your next design project.", category: "design-tools", emoji: "🎨", keywords: ["color palette", "design"] },
  { slug: "css-gradient-generator", name: "CSS Gradient Generator", description: "Build smooth CSS gradients with a live preview and copy-ready code.", category: "design-tools", emoji: "🌈", keywords: ["css", "gradient"] },
  { slug: "qr-code-generator", name: "QR Code Generator", description: "Create custom QR codes for URLs, text and Wi-Fi instantly. Free, no signup.", category: "utility-tools", emoji: "📱", keywords: ["qr code"] },
  { slug: "word-counter", name: "Word Counter", description: "Count words, characters, sentences and reading time for any text.", category: "utility-tools", emoji: "📝", keywords: ["word counter", "character"] },
  { slug: "password-generator", name: "Password Generator", description: "Generate strong, secure, random passwords with custom length and rules.", category: "utility-tools", emoji: "🔐", keywords: ["password"] },
  { slug: "text-case-converter", name: "Text Case Converter", description: "Convert text between UPPERCASE, lowercase, Title Case, camelCase and more.", category: "utility-tools", emoji: "🔡", keywords: ["text case"] },
  { slug: "image-compressor", name: "Image Compressor", description: "Compress JPG and PNG images in your browser. Fast, private, lossless feel.", category: "utility-tools", emoji: "🖼️", keywords: ["image compressor"] },
];

export const CATEGORIES = [
  { slug: "creator-tools", name: "Creator Tools", description: "Tools built for YouTubers, TikTokers and content creators to grow faster.", emoji: "🚀" },
  { slug: "design-tools", name: "Design Tools", description: "Color palettes, gradients and visual helpers for designers & developers.", emoji: "🎨" },
  { slug: "utility-tools", name: "Utility Tools", description: "Everyday productivity tools — QR codes, word counters, passwords and more.", emoji: "🛠️" },
] as const;

export const BLOG_POSTS = [
  { slug: "best-free-tools-for-creators", title: "10 Best Free Online Tools for Creators in 2025", excerpt: "Discover the must-have free tools every creator should use to save time and grow faster.", date: "2025-04-12", readTime: "6 min", image: "/blog/best-free-tools-for-creators.jpg" },
  { slug: "how-to-grow-on-tiktok", title: "How to Grow on TikTok in 2025: A Creator's Playbook", excerpt: "A practical, no-fluff guide to growing a real TikTok audience this year.", date: "2025-04-08", readTime: "8 min", image: "/blog/how-to-grow-on-tiktok.jpg" },
  { slug: "how-to-compress-images", title: "How to Compress Images Without Losing Quality", excerpt: "Smaller files, faster sites. Here's exactly how to compress images the right way.", date: "2025-03-30", readTime: "5 min", image: "/blog/how-to-compress-images.jpg" },
  { slug: "best-color-palettes-for-design", title: "The Best Color Palettes for Modern Design", excerpt: "Curated palettes and the principles behind them — for landing pages, apps, and brands.", date: "2025-03-22", readTime: "7 min", image: "/blog/best-color-palettes-for-design.jpg" },
  { slug: "how-to-create-a-strong-password", title: "How to Create a Strong Password You'll Actually Remember", excerpt: "Stop reusing passwords. Here's a simple system for strong, memorable credentials.", date: "2025-03-15", readTime: "4 min", image: "/blog/how-to-create-a-strong-password.jpg" },
];

export function toolBySlug(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}
export function toolsByCategory(cat: string) {
  return TOOLS.filter((t) => t.category === cat);
}
