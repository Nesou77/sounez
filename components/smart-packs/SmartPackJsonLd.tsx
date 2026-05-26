import { getSiteUrl } from "@/lib/site-url";
import type { SmartPackDefinition } from "@/data/smartPacks";

export function SmartPackJsonLd({ pack }: { pack: SmartPackDefinition }) {
  const url = `${getSiteUrl()}/smart-packs/${pack.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: getSiteUrl() },
      { "@type": "ListItem", position: 2, name: "Smart Packs", item: `${getSiteUrl()}/smart-packs` },
      { "@type": "ListItem", position: 3, name: pack.name, item: url },
    ],
  };
  const faq =
    pack.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pack.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faq && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      )}
    </>
  );
}
