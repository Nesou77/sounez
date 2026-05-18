import type { MetadataRoute } from "next";
import { TOOLS, CATEGORIES } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog";
import { getSiteUrl } from "@/lib/site-url";

// Stable date for pages that don't have a real updatedAt.
// Update this when you make significant content changes to static pages.
const STATIC_LAST_MODIFIED = new Date("2026-05-18");

const STATIC_ROUTES = [
  "/",
  "/about",
  "/blog",
  "/categories",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/tools",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: path === "/" ? base : `${base}${path}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const toolEntries: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${base}/${t.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: t.featured ? 0.9 : 0.75,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    // Use the post's published date as lastModified
    lastModified: new Date(p.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...categoryEntries, ...toolEntries, ...blogEntries];
}
