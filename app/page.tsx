import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { HomeHero } from "./HomeHero";
import { HomeSections } from "./HomeSections";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Sounez | Free Online Tools for Creators, Designers and Developers",
  description:
    "Free browser-based tools for everyday tasks. Compress images, generate QR codes, build color palettes, create strong passwords, write hashtags and more. No account needed.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Sounez | Free Online Tools",
    description:
      "Free browser-based tools for creators, designers and developers. No account, no install, no catch.",
    url: siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sounez | Free Online Tools",
    description:
      "Free browser-based tools for creators, designers and developers. No account, no install, no catch.",
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sounez",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/logo.webp`,
  },
  description:
    "Free browser-based tools for creators, designers, developers and anyone who needs to complete practical tasks online without installing software or creating an account.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${siteUrl}/contact`,
  },
  sameAs: [
    "https://www.tiktok.com/@souneztools",
    "https://www.instagram.com/souneztools/",
    "https://x.com/souneztools",
    "https://www.facebook.com/profile.php?id=61589812104461",
    "https://www.youtube.com/@Souneztools",
    "https://pin.it/45jluYJOT",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomeHero />
      <HomeSections />
    </>
  );
}
