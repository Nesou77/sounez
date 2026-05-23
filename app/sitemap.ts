import type { MetadataRoute } from "next";
import { TOOLS, CATEGORIES } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog";
import { getSiteUrl } from "@/lib/site-url";

// Fallback date for static pages without a real updatedAt.
// Update this when you make significant content changes to static pages.
const STATIC_LAST_MODIFIED = new Date("2026-05-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  // ── 1. Static pages (8 pages) ─────────────────────────────────────────────
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/tools`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/categories`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/blog`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/about`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/contact`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/privacy-policy`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms-of-service`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ── 2. Category pages (3 pages) ───────────────────────────────────────────
  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // ── 3. Tool pages — all under /tools/{slug} ───────────────────────────────
  // Uses updatedAt from each tool for accurate lastModified.
  // Falls back to STATIC_LAST_MODIFIED when updatedAt is not set.
  const toolEntries: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${base}/tools/${t.slug}`,
    lastModified: t.updatedAt ? new Date(t.updatedAt) : STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: t.featured ? 0.9 : 0.75,
  }));

  // ── 4. Blog posts ─────────────────────────────────────────────────────────
  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.date),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticEntries, ...categoryEntries, ...toolEntries, ...blogEntries];
}
