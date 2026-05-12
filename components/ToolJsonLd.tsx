import type { Tool } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";

type FAQ = { q: string; a: string };

/**
 * Renders JSON-LD structured data for a tool page.
 * Outputs SoftwareApplication schema + optional FAQPage schema.
 * Place this inside the page.tsx server component.
 */
export function ToolJsonLd({ tool, faqs }: { tool: Tool; faqs?: FAQ[] }) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${tool.slug}`;

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
