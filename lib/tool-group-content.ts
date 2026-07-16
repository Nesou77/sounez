import type { ToolGroupSlug } from "@/lib/tool-groups";

export type ToolGroupEditorial = {
  extendedIntro: string;
  tip: string;
};

/** Extra copy for /tools group sections - unique per group, not repeated on tool pages. */
export const TOOL_GROUP_EDITORIAL: Record<ToolGroupSlug, ToolGroupEditorial> = {
  "ai-writing": {
    extendedIntro:
      "These tools turn a short brief into draft text for social posts, bios, or brainstorming. They work best when you name the audience, the offer, and the platform. Always edit before publishing - especially prices, dates, and legal claims.",
    tip: "Add one concrete detail in your prompt, for example 20% off this weekend, for sharper drafts.",
  },
  image: {
    extendedIntro:
      "Prepare photos for the web and for shops: smaller files, correct format, cutouts, favicons, and wireframe placeholders. Most image tools run in your browser; check the privacy note if a tool mentions server processing.",
    tip: "Compress and rename files before upload - it is faster than fixing a slow live page later.",
  },
  "qr-utility": {
    extendedIntro:
      "Small helpers you open once and close: QR codes, word counts, passwords, case conversion, and a simple calculator. Most run locally in your tab with no account.",
    tip: "For QR codes, scan on your phone before printing hundreds of copies.",
  },
  seo: {
    extendedIntro:
      "Help people and search engines understand your content: YouTube tags, hashtags, and image descriptions. Tags support good titles and watch time - they do not replace them.",
    tip: "Write alt text for what is actually in the image, not a list of keywords.",
  },
  student: {
    extendedIntro:
      "Study notes and resume layout for school and job applications. AI notes can contain errors - cross-check facts with your course materials. Resumes stay on your device until you export them.",
    tip: "Use study notes as a starting outline, then add your own examples under each heading.",
  },
  business: {
    extendedIntro:
      "Rough sponsored-post estimates and naming ideas for side projects. Calculator output is for planning, not contracts; business names still need domain and trademark checks.",
    tip: "Say a generated name out loud before you buy a domain - spelling matters on the phone.",
  },
  "design-css": {
    extendedIntro:
      "Pick colors, build gradients, and copy CSS for shadows and patterns. Output is ready for stylesheets, Tailwind arbitrary values, or design handoffs - test contrast for text on colored backgrounds.",
    tip: "Use one elevation scale for shadows across your app so cards feel consistent.",
  },
};

export function getToolGroupEditorial(slug: ToolGroupSlug): ToolGroupEditorial {
  return TOOL_GROUP_EDITORIAL[slug];
}
