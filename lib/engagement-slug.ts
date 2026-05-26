import type { ContentType } from "@/lib/content-types";

export function parseEngagementSlug(raw: string): { contentType: ContentType; slug: string } {
  if (raw.startsWith("blog:")) return { contentType: "blog", slug: raw.slice(5) };
  if (raw.startsWith("tool:")) return { contentType: "tool", slug: raw.slice(5) };
  if (raw.startsWith("smart_pack:")) return { contentType: "smart_pack", slug: raw.slice(11) };
  return { contentType: "tool", slug: raw };
}
