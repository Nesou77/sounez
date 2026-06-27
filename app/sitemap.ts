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

function dateFromIso(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00Z`);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const siteLaunchDate = dateFromIso("2025-01-01");
  const smartPackLaunchDate = dateFromIso("2025-09-01");

  const staticPages = [
    { path: "",                  slug: "home",             date: "2025-01-01", changeFreq: "weekly"  as const, priority: 1.0 },
    { path: "/tools",            slug: "tools",            date: "2025-01-01", changeFreq: "weekly"  as const, priority: 0.9 },
    { path: "/smart-packs",      slug: "smart-packs",      date: "2025-09-01", changeFreq: "weekly"  as const, priority: 0.9 },
    { path: "/blog",             slug: "blog",             date: "2025-03-10", changeFreq: "weekly"  as const, priority: 0.85 },
    { path: "/categories",       slug: "categories",       date: "2025-01-01", changeFreq: "monthly" as const, priority: 0.8 },
    { path: "/faq",              slug: "faq",              date: "2025-09-01", changeFreq: "monthly" as const, priority: 0.7 },
    { path: "/about",            slug: "about",            date: "2025-01-01", changeFreq: "monthly" as const, priority: 0.5 },
    { path: "/contact",          slug: "contact",          date: "2025-01-01", changeFreq: "monthly" as const, priority: 0.5 },
    { path: "/privacy-policy",   slug: "privacy-policy",   date: "2026-05-26", changeFreq: "monthly" as const, priority: 0.3 },
    { path: "/cookie-policy",    slug: "cookie-policy",    date: "2026-05-26", changeFreq: "monthly" as const, priority: 0.3 },
    { path: "/terms-of-service", slug: "terms-of-service", date: "2026-05-26", changeFreq: "monthly" as const, priority: 0.3 },
    { path: "/dmca",             slug: "dmca",             date: "2026-05-26", changeFreq: "monthly" as const, priority: 0.3 },
    { path: "/editorial-policy", slug: "editorial-policy", date: "2026-06-27", changeFreq: "yearly"  as const, priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = await Promise.all(
    staticPages.map(async ({ path, slug, date, changeFreq, priority }) => ({
      url: `${base}${path}`,
      lastModified: await lastModified("page", slug, dateFromIso(date)),
      changeFrequency: changeFreq,
      priority,
    })),
  );

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: siteLaunchDate,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const toolEntries: MetadataRoute.Sitemap = await Promise.all(
    TOOLS.map(async (t) => ({
      url: `${base}/tools/${t.slug}`,
      lastModified: await lastModified("tool", t.slug, siteLaunchDate),
      changeFrequency: "monthly" as const,
      priority: t.featured ? 0.9 : 0.75,
    })),
  );

  const blogEntries: MetadataRoute.Sitemap = await Promise.all(
    BLOG_POSTS.map(async (p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: await lastModified("blog", p.slug, dateFromIso(p.updatedAt ?? p.publishedAt ?? "2025-03-10")),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  );

  const packEntries: MetadataRoute.Sitemap = await Promise.all(
    SMART_PACKS.map(async (p) => ({
      url: `${base}/smart-packs/${p.slug}`,
      lastModified: await lastModified("smart_pack", p.slug, smartPackLaunchDate),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [...staticEntries, ...categoryEntries, ...toolEntries, ...blogEntries, ...packEntries];
}
