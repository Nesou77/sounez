import type { Tool } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";

type FAQ = { q: string; a: string };

/**
 * Renders JSON-LD structured data for a tool page.
 * Outputs SoftwareApplication schema + optional FAQPage schema.
 * Place this inside the page.tsx server component.
 */
const CATEGORY_LABELS: Record<string, string> = {
  "creator-tools": "Creator Tools",
  "design-tools": "Design Tools",
  "utility-tools": "Utility Tools",
};

export function ToolJsonLd({ tool, faqs }: { tool: Tool; faqs?: FAQ[] }) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/tools/${tool.slug}`;

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: pageUrl,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "Sounez",
      url: siteUrl,
    },
  };

  const categoryLabel = CATEGORY_LABELS[tool.category] ?? "Tools";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: categoryLabel, item: `${siteUrl}/categories/${tool.category}` },
      { "@type": "ListItem", position: 3, name: tool.name, item: pageUrl },
    ],
  };

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
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
