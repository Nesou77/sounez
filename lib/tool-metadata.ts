/**
 * Shared metadata helper for tool pages.
 * Generates canonical URL and absolute Open Graph URL automatically.
 */
import type { Metadata } from "next";
import type { Tool } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";

export function toolMetadata(
  tool: Tool,
  overrides?: Partial<{
    title: string;
    description: string;
  }>,
): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/tools/${tool.slug}`;
  const title = overrides?.title ?? tool.name;
  const description = overrides?.description ?? tool.description;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
    },
  };
}
