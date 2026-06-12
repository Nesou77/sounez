/**
 * Shared metadata helper for blog post pages.
 * Enforces og:type="article", OG image from blog data, Twitter card,
 * canonical URL, and siteName on every post without repeating boilerplate.
 *
 * Usage in a blog page.tsx:
 *   export const metadata = blogMetadata("my-slug", {
 *     title: "My Post Title",
 *     description: "Post description.",
 *   });
 */
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { getSiteUrl } from "@/lib/site-url";

export function blogMetadata(
  slug: string,
  overrides: {
    title: string;
    description: string;
    /** Override OG title if different from page title */
    ogTitle?: string;
    /** Override OG description if different from page description */
    ogDescription?: string;
  },
): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/blog/${slug}`;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  // Use the blog post's own image for social previews so every article has a
  // distinct, relevant thumbnail when shared on social or crawled by AdSense.
  const ogImageUrl = post ? `${siteUrl}${post.image}` : `${siteUrl}/logo.webp`;
  const ogTitle = overrides.ogTitle ?? overrides.title;
  const ogDescription = overrides.ogDescription ?? overrides.description;

  return {
    title: overrides.title,
    description: overrides.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      siteName: "Sounez",
      locale: "en_US",
      url: canonical,
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 675,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@souneztools",
      title: ogTitle,
      description: ogDescription,
      images: [ogImageUrl],
    },
  };
}
