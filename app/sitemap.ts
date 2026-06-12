import type { MetadataRoute } from "next";
import { TOOLS, CATEGORIES } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog";
import { SMART_PACKS } from "@/data/smartPacks";
import { getSiteUrl } from "@/lib/site-url";
import { hasDatabaseUrl, prisma } from "@/lib/prisma";

async function lastModified(contentType: string, slug: string, fallback: Date): Promise<Date> {
  if (!hasDatabaseUrl) return fallback;

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

  const staticPages = [
    { path: "",                  slug: "home",            changeFreq: "weekly"  as const, priority: 1.0 },
    { path: "/tools",            slug: "tools",           changeFreq: "weekly"  as const, priority: 0.9 },
    { path: "/smart-packs",      slug: "smart-packs",     changeFreq: "weekly"  as const, priority: 0.9 },
    { path: "/blog",             slug: "blog",            changeFreq: "weekly"  as const, priority: 0.85 },
    { path: "/categories",       slug: "categories",      changeFreq: "monthly" as const, priority: 0.8 },
    { path: "/faq",              slug: "faq",             changeFreq: "monthly" as const, priority: 0.7 },
    { path: "/about",            slug: "about",           changeFreq: "monthly" as const, priority: 0.5 },
    { path: "/contact",          slug: "contact",         changeFreq: "monthly" as const, priority: 0.5 },
    { path: "/privacy-policy",   slug: "privacy-policy",  changeFreq: "monthly" as const, priority: 0.3 },
    { path: "/cookie-policy",    slug: "cookie-policy",   changeFreq: "monthly" as const, priority: 0.3 },
    { path: "/terms-of-service", slug: "terms-of-service",changeFreq: "monthly" as const, priority: 0.3 },
    { path: "/dmca",             slug: "dmca",            changeFreq: "monthly" as const, priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = await Promise.all(
    staticPages.map(async ({ path, slug, changeFreq, priority }) => ({
      url: `${base}${path}`,
      lastModified: await lastModified("page", slug, fallback),
      changeFrequency: changeFreq,
      priority,
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
      priority: 0.8,
    })),
  );

  return [...staticEntries, ...categoryEntries, ...toolEntries, ...blogEntries, ...packEntries];
}
