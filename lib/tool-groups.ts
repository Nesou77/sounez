import { TOOLS, type Tool } from "@/data/tools";
import { sortToolsByPopularity } from "@/lib/popularity";

/** Display groups for /tools page and navigation — each tool appears once. */
export const TOOL_GROUPS = [
  {
    slug: "ai-writing",
    name: "AI Writing Tools",
    description: "Draft captions, bios, names, and ideas from a short brief. Review before you post.",
  },
  {
    slug: "image",
    name: "Image Tools",
    description: "Compress, convert, remove backgrounds, and prepare images for web and shops.",
  },
  {
    slug: "pdf",
    name: "PDF Tools",
    description: "Turn PDFs into editable documents when you have permission to process them.",
  },
  {
    slug: "qr-utility",
    name: "QR & Utility Tools",
    description: "QR codes, passwords, counters, and small helpers you open in a tab and close.",
  },
  {
    slug: "seo",
    name: "SEO Tools",
    description: "Tags, hashtags, and image text that help people find your content.",
  },
  {
    slug: "student",
    name: "Student Tools",
    description: "Notes, resumes, and calculators for school work — use them honestly.",
  },
  {
    slug: "business",
    name: "Business Tools",
    description: "Naming, listings, and rough earnings estimates for small projects.",
  },
  {
    slug: "design-css",
    name: "Design & CSS Tools",
    description: "Palettes, gradients, shadows, and patterns with copy-paste code.",
  },
] as const;

export type ToolGroupSlug = (typeof TOOL_GROUPS)[number]["slug"];

const TOOL_TO_GROUP: Record<string, ToolGroupSlug> = {
  "ai-caption-generator": "ai-writing",
  "bio-generator": "ai-writing",
  "business-name-generator": "ai-writing",
  "website-idea-generator": "ai-writing",
  "image-compressor": "image",
  "background-remover": "image",
  "png-to-jpg-converter": "image",
  "image-placeholder-generator": "image",
  "favicon-generator": "image",
  "pdf-to-word-converter": "pdf",
  "qr-code-generator": "qr-utility",
  "word-counter": "qr-utility",
  "password-generator": "qr-utility",
  "text-case-converter": "qr-utility",
  calculator: "qr-utility",
  "youtube-tags-generator": "seo",
  "hashtag-generator": "seo",
  "image-describer": "seo",
  "study-notes-generator": "student",
  "resume-generator": "student",
  "tiktok-money-calculator": "business",
  "color-palette-generator": "design-css",
  "css-gradient-generator": "design-css",
  "box-shadow-generator": "design-css",
  "font-pairing-tool": "design-css",
  "svg-blob-generator": "design-css",
  "background-pattern-generator": "design-css",
};

export function getToolGroupSlug(toolSlug: string): ToolGroupSlug {
  return TOOL_TO_GROUP[toolSlug] ?? "qr-utility";
}

export function toolsByGroup(groupSlug: ToolGroupSlug): Tool[] {
  return sortToolsByPopularity(
    TOOLS.filter((t) => getToolGroupSlug(t.slug) === groupSlug),
  );
}

export function groupForTool(tool: Tool) {
  const slug = getToolGroupSlug(tool.slug);
  return TOOL_GROUPS.find((g) => g.slug === slug)!;
}
