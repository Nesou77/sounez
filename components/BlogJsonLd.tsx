import { BLOG_POSTS } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";

export type FaqItem = { question: string; answer: string };

/**
 * Renders JSON-LD structured data for a blog post.
 * Supports BlogPosting + optional FAQPage schema.
 * Place this inside the page component (server component). Next.js hoists
 * <script> tags in the <head> automatically when rendered server-side.
 */
export function BlogJsonLd({
  slug,
  title,
  description,
  faqs,
  articleSection = "Blog",
}: {
  slug: string;
  title: string;
  description: string;
  faqs?: FaqItem[];
  articleSection?: string;
}) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return null;

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/blog/${slug}`;
  const imageUrl = `${siteUrl}${post.image}`;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: "Nesou",
      url: `${siteUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Sounez",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.webp`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 675,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    url: pageUrl,
    articleSection,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "Blog",
      name: "Sounez Blog",
      url: `${siteUrl}/blog`,
    },
  };

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
