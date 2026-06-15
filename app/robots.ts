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
      // Block AI training crawlers — content is protected under copyright.
      // These bots scrape for model training rather than indexing for search.
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ChatGPT-User", disallow: "/" },
      { userAgent: "OAI-SearchBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "Diffbot", disallow: "/" },
      { userAgent: "ImagesiftBot", disallow: "/" },
      { userAgent: "omgili", disallow: "/" },
      { userAgent: "omgilibot", disallow: "/" },
      { userAgent: "FacebookBot", disallow: "/" },
      { userAgent: "cohere-ai", disallow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
