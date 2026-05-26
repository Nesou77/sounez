import type { MetadataRoute } from "next";
import { TOOLS, CATEGORIES } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog";
import { SMART_PACKS } from "@/data/smartPacks";
import { getSiteUrl } from "@/lib/site-url";
import { prisma } from "@/lib/prisma";

async function lastModified(contentType: string, slug: string, fallback: Date): Promise<Date> {
  try {
    const row = await prisma.contentMeta.findUnique({
      where: { contentType_slug: { contentType, slug } },
    });
    return row?.updatedAt ?? fallback;
  } catch {
    return fallback;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const fallback = new Date();

  const staticSlugs = [
    { path: "", slug: "home" },
    { path: "/tools", slug: "tools" },
    { path: "/categories", slug: "categories" },
    { path: "/blog", slug: "blog" },
    { path: "/smart-packs", slug: "smart-packs" },
    { path: "/about", slug: "about" },
    { path: "/contact", slug: "contact" },
    { path: "/privacy-policy", slug: "privacy-policy" },
    { path: "/cookie-policy", slug: "cookie-policy" },
    { path: "/terms-of-service", slug: "terms-of-service" },
    { path: "/dmca", slug: "dmca" },
  ];

  const staticEntries: MetadataRoute.Sitemap = await Promise.all(
    staticSlugs.map(async ({ path, slug }) => ({
      url: `${base}${path}`,
      lastModified: await lastModified("page", slug, fallback),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1.0 : 0.6,
    })),
  );

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: fallback,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const toolEntries: MetadataRoute.Sitemap = await Promise.all(
    TOOLS.map(async (t) => ({
      url: `${base}/tools/${t.slug}`,
      lastModified: await lastModified("tool", t.slug, fallback),
      changeFrequency: "monthly" as const,
      priority: t.featured ? 0.9 : 0.75,
    })),
  );

  const blogEntries: MetadataRoute.Sitemap = await Promise.all(
    BLOG_POSTS.map(async (p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: await lastModified("blog", p.slug, fallback),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  );

  const packEntries: MetadataRoute.Sitemap = await Promise.all(
    SMART_PACKS.map(async (p) => ({
      url: `${base}/smart-packs/${p.slug}`,
      lastModified: await lastModified("smart_pack", p.slug, fallback),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  );

  return [...staticEntries, ...categoryEntries, ...toolEntries, ...blogEntries, ...packEntries];
}
