import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { HomeHero } from "./HomeHero";
import { HomeSections } from "./HomeSections";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Sounez | Free Online Tools for Creators, Designers and Productivity",
  description:
    "Free, fast and simple online tools. QR codes, password generator, image compressor, color palettes, hashtag and YouTube tools. No signup needed.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Sounez | Free Online Tools",
    description: "Free, fast tools for creators, designers and productivity. No signup needed.",
    url: siteUrl,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sounez",
  url: siteUrl,
  description:
    "Free online tools for creators, designers and everyday productivity. No signup needed.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/tools?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* Hero with search — static content renders instantly, search loads interactively */}
      <HomeHero />
      {/* Below-fold static sections — server rendered, zero client JS */}
      <HomeSections />
    </>
  );
}
