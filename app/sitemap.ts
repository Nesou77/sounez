import type { MetadataRoute } from "next";
import { SITE_PATHS } from "@/lib/site-paths";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  return SITE_PATHS.map((path, i) => ({
    url: path === "/" ? base : `${base}${path}`,
    lastModified: now,
    changeFrequency: path.startsWith("/blog") ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : i < 8 ? 0.9 : 0.75,
  }));
}
