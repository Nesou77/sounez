import { BLOG_POSTS } from "@/data/blog";
import { getContentDates, formatContentDateIso } from "@/lib/content-meta";
import { getSiteUrl } from "@/lib/site-url";

export type FaqItem = { question: string; answer: string };

export async function BlogJsonLd({
  slug,
  title,
  description,
  faqs,
  articleSection = "Guides",
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
  const dates = await getContentDates("blog", slug);

  const blogPosting: Record<string, unknown> = {
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
      name: "Sounez Guides",
      url: `${siteUrl}/blog`,
    },
  };

  if (dates) {
    blogPosting.datePublished = formatContentDateIso(dates.createdAt);
    blogPosting.dateModified = formatContentDateIso(dates.updatedAt);
  }

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
