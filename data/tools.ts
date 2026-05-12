export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: "creator-tools" | "design-tools" | "utility-tools";
  emoji: string;
  keywords: string[];
  featured?: boolean; // shown in homepage "Popular tools" and footer
};

export const TOOLS: Tool[] = [
  { slug: "youtube-tags-generator", name: "YouTube Tags Generator", description: "Type a keyword and get 25 ready-to-paste YouTube tags that help your video show up in search.", category: "creator-tools", emoji: "🎬", keywords: ["youtube tags", "seo tags", "video seo"], featured: true },
  { slug: "tiktok-money-calculator", name: "TikTok Money Calculator", description: "See what your TikTok account could earn per sponsored post based on your followers and engagement.", category: "creator-tools", emoji: "💸", keywords: ["tiktok money", "creator earnings", "influencer calculator"], featured: true },
  { slug: "hashtag-generator", name: "Hashtag Generator", description: "Enter a topic and get a ready-to-copy set of hashtags for Instagram, TikTok and YouTube.", category: "creator-tools", emoji: "#️⃣", keywords: ["hashtag", "instagram hashtags", "tiktok hashtags"], featured: true },
  { slug: "color-palette-generator", name: "Color Palette Generator", description: "Generate a five-color palette in one click. Tap any swatch to copy the hex code.", category: "design-tools", emoji: "🎨", keywords: ["color palette", "design colors", "hex colors"], featured: true },
  { slug: "css-gradient-generator", name: "CSS Gradient Generator", description: "Pick two colors, set an angle, and copy the CSS gradient code straight into your project.", category: "design-tools", emoji: "🌈", keywords: ["css gradient", "linear gradient", "background gradient"] },
  { slug: "qr-code-generator", name: "QR Code Generator", description: "Paste a URL or text and download a high-resolution QR code PNG. Free, no account needed.", category: "utility-tools", emoji: "📱", keywords: ["qr code", "qr generator", "free qr code"], featured: true },
  { slug: "word-counter", name: "Word Counter", description: "Paste your text and instantly see word count, character count, sentence count and reading time.", category: "utility-tools", emoji: "📝", keywords: ["word counter", "character counter", "reading time"] },
  { slug: "password-generator", name: "Password Generator", description: "Create a strong random password with the length and character types you choose. Runs in your browser.", category: "utility-tools", emoji: "🔐", keywords: ["password generator", "strong password", "random password"], featured: true },
  { slug: "text-case-converter", name: "Text Case Converter", description: "Paste text and convert it to UPPERCASE, lowercase, Title Case, camelCase, kebab-case or snake_case.", category: "utility-tools", emoji: "🔡", keywords: ["text case", "uppercase", "camelcase converter"] },
  { slug: "image-compressor", name: "Image Compressor", description: "Drop in a JPG or PNG and compress it right in your browser. Nothing gets uploaded to any server.", category: "utility-tools", emoji: "🖼️", keywords: ["image compressor", "compress image", "reduce image size"] },
  { slug: "ai-caption-generator", name: "AI Caption Generator", description: "Paste a photo description or topic and get engaging captions for Instagram, TikTok or LinkedIn in one click.", category: "creator-tools", emoji: "✍️", keywords: ["caption generator", "ai captions", "instagram captions", "social media captions"] },
  { slug: "bio-generator", name: "Bio Generator", description: "Describe yourself in a few words and get a polished social media or professional bio in seconds.", category: "creator-tools", emoji: "👤", keywords: ["bio generator", "instagram bio", "twitter bio", "linkedin bio"] },
  { slug: "calculator", name: "Calculator", description: "A clean, fast calculator for everyday maths. Supports basic operations plus percentage and square root.", category: "utility-tools", emoji: "🧮", keywords: ["calculator", "online calculator", "free calculator", "percentage calculator"] },
  { slug: "business-name-generator", name: "Business Name Generator", description: "Enter your industry or keywords and get creative, brandable business name ideas instantly.", category: "creator-tools", emoji: "🏢", keywords: ["business name generator", "brand name", "startup name", "company name ideas"] },
  { slug: "study-notes-generator", name: "Study Notes Generator", description: "Paste a topic or text and get concise, structured study notes you can review or export.", category: "utility-tools", emoji: "📚", keywords: ["study notes", "notes generator", "ai notes", "summarize text"] },
  { slug: "website-idea-generator", name: "Website Idea Generator", description: "Describe your interests or niche and get unique website concepts with suggested names and features.", category: "creator-tools", emoji: "💡", keywords: ["website idea", "website concept", "niche website", "startup idea"] },
  { slug: "resume-generator", name: "Resume Generator", description: "Fill in your details and export a clean, professional resume as HTML or PDF — no account needed.", category: "utility-tools", emoji: "📄", keywords: ["resume generator", "cv generator", "free resume", "resume builder"] },
  { slug: "png-to-jpg-converter", name: "PNG to JPG Converter", description: "Drop a PNG and convert it to JPG right in your browser. Choose quality level and download instantly.", category: "utility-tools", emoji: "🖼️", keywords: ["png to jpg", "image converter", "convert png", "png jpg"] },
  { slug: "favicon-generator", name: "Favicon Generator", description: "Create simple favicons from text, emoji, colors or uploaded images and download browser-ready favicon files.", category: "design-tools", emoji: "⭐", keywords: ["favicon generator", "website icon", "favicon maker", "browser icon"] },
  { slug: "svg-blob-generator", name: "SVG Blob Generator", description: "Generate smooth random SVG blobs for modern backgrounds, hero sections and creative web design.", category: "design-tools", emoji: "🫧", keywords: ["svg blob generator", "blob maker", "organic shapes", "svg shapes"] },
  { slug: "font-pairing-tool", name: "Font Pairing Tool", description: "Discover clean font combinations for headings and body text with ready-to-copy CSS suggestions.", category: "design-tools", emoji: "🔤", keywords: ["font pairing", "font combinations", "typography tool", "google fonts"] },
  { slug: "image-placeholder-generator", name: "Image Placeholder Generator", description: "Generate custom image placeholders with dimensions, colors and text for mockups and web layouts.", category: "design-tools", emoji: "🖼️", keywords: ["image placeholder", "placeholder generator", "dummy image", "mockup image"] },
  { slug: "box-shadow-generator", name: "Box Shadow Generator", description: "Create and preview CSS box shadows visually, then copy the CSS code instantly.", category: "design-tools", emoji: "🌑", keywords: ["box shadow generator", "css shadow", "shadow css", "drop shadow"] },
  { slug: "background-pattern-generator", name: "Background Pattern Generator", description: "Create simple CSS and SVG background patterns for websites, landing pages and UI mockups.", category: "design-tools", emoji: "▧", keywords: ["background pattern generator", "css patterns", "svg patterns", "dot pattern"] },
];

export const FEATURED_TOOLS = TOOLS.filter((t) => t.featured);

export const CATEGORIES = [
  {
    slug: "creator-tools",
    name: "Creator Tools",
    description: "Tools for YouTubers, TikTokers and content creators who want to grow without wasting time.",
    emoji: "🚀",
  },
  {
    slug: "design-tools",
    name: "Design Tools",
    description: "Color palettes, gradients, favicons, SVG blobs, font pairings and CSS helpers for designers and developers.",
    emoji: "🎨",
  },
  {
    slug: "utility-tools",
    name: "Utility Tools",
    description: "Everyday tools that just get things done. QR codes, word counters, passwords, calculators and more.",
    emoji: "🛠️",
  },
] as const;

// Re-export BLOG_POSTS from data/blog.ts for backwards compatibility
// (components that still import BLOG_POSTS from here will continue to work)
export { BLOG_POSTS } from "@/data/blog";

export function toolBySlug(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}
export function toolsByCategory(cat: string) {
  return TOOLS.filter((t) => t.category === cat);
}
