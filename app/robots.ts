import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { NOINDEX_PATHS } from "@/lib/route-policy";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: NOINDEX_PATHS.map((path) => (path.endsWith("/") ? path : `${path}/`)),
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
