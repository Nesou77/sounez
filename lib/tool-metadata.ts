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

  // Use a tool-specific OG image when available, fall back to the site-wide image.
  // Tool OG images live at /og/{slug}.webp — missing files gracefully fall back.
  const ogImage = `${siteUrl}/og/${tool.slug}.webp`;

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
          width: 1200,
          height: 630,
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
