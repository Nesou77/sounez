/**
 * Shared metadata helper for tool pages.
 * Generates canonical URL and absolute Open Graph URL automatically.
 * Falls back to the site OG image when no tool-specific image exists.
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

  const ogImage = `${siteUrl}/logo.webp`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Sounez",
      images: [
        {
          url: ogImage,
          width: 2288,
          height: 925,
          alt: `${tool.name} – Sounez`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
