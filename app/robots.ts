import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",       // All server-side API routes (Gemini, contact, etc.)
        "/_next/",     // Next.js internal build files
      ],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}