/** Tool slug → recommended Smart Pack page */
export const TOOL_SMART_PACK_MAP: Record<string, { href: string; label: string }> = {
  "ai-caption-generator": { href: "/smart-packs/social-media-pack", label: "Social Media Pack" },
  "hashtag-generator": { href: "/smart-packs/social-media-pack", label: "Social Media Pack" },
  "bio-generator": { href: "/smart-packs/business-launch-pack", label: "Business Launch Pack" },
  "youtube-tags-generator": { href: "/smart-packs/social-media-pack", label: "Social Media Pack" },
  "image-compressor": { href: "/smart-packs/seo-image-pack", label: "SEO Image Pack" },
  "image-describer": { href: "/smart-packs/seo-image-pack", label: "SEO Image Pack" },
  "png-to-jpg-converter": { href: "/smart-packs/seo-image-pack", label: "SEO Image Pack" },
  "background-remover": { href: "/smart-packs/seo-image-pack", label: "SEO Image Pack" },
  "study-notes-generator": { href: "/smart-packs/student-study-pack", label: "Student Study Pack" },
  "business-name-generator": { href: "/smart-packs/business-launch-pack", label: "Business Launch Pack" },
  "website-idea-generator": { href: "/smart-packs/business-launch-pack", label: "Business Launch Pack" },
  "qr-code-generator": { href: "/smart-packs/business-launch-pack", label: "Business Launch Pack" },
  "word-counter": { href: "/smart-packs/student-study-pack", label: "Student Study Pack" },
  "resume-generator": { href: "/smart-packs/business-launch-pack", label: "Business Launch Pack" },
};

export function smartPackForTool(toolSlug: string) {
  return TOOL_SMART_PACK_MAP[toolSlug];
}
