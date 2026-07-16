/** Visible safety notes for sensitive tool categories. */
export const TOOL_DISCLAIMERS: Record<string, string> = {
  "image-compressor":
    "Only upload images you own or have the right to use.",
  "png-to-jpg-converter":
    "Only upload images you own or have the right to use.",
  "background-remover":
    "Only upload images you own or have the right to use.",
  "image-describer":
    "Only upload images you own or have the right to use. Uploaded images are sent securely to our server for AI analysis.",
  "favicon-generator":
    "Only upload images you own or have the right to use.",
  "study-notes-generator":
    "Use this tool for learning and revision. Do not use it to cheat, impersonate someone, or submit work you did not create.",
  "resume-generator":
    "Review and edit generated content before using it. Do not include false experience, education, or certifications.",
  "ai-caption-generator":
    "Generated content should be reviewed before publishing.",
  "bio-generator": "Generated content should be reviewed before publishing.",
  "business-name-generator":
    "Generated content should be reviewed before publishing.",
  "website-idea-generator":
    "Generated content should be reviewed before publishing.",
};

export function getToolDisclaimer(slug: string): string | undefined {
  return TOOL_DISCLAIMERS[slug];
}
