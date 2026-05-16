import type { MetadataRoute } from "next";
import { TOOLS, CATEGORIES } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog";
import { getSiteUrl } from "@/lib/site-url";

// ─── Bump this date whenever you make content changes to static pages ─────────
// (About, Privacy Policy, Terms of Service, Contact, etc.)
const STATIC_LAST_MODIFIED = new Date("2026-05-16");

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
  // Driven by CATEGORIES from data/tools.ts — new categories are picked up automatically.
  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // ── 3. Tool pages (24 pages) ──────────────────────────────────────────────
  // Driven by TOOLS from data/tools.ts — new tools are picked up automatically.
  const toolEntries: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${base}/${t.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: t.featured ? 0.9 : 0.75,
  }));

  // ── 4. Blog posts (27 posts) ──────────────────────────────────────────────
  // Each post uses its own publish date so crawlers know the freshest content.
  // New posts in data/blog.ts are picked up automatically.
  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  // ── Total: 8 static + 3 categories + 24 tools + 27 blog = 62 pages ────────
  return [...staticEntries, ...categoryEntries, ...toolEntries, ...blogEntries];
}