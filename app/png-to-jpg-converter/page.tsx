import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PngToJpgClient } from "./PngToJpgClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";
import { getSiteUrl } from "@/lib/site-url";

const tool = toolBySlug("png-to-jpg-converter");
if (!tool) notFound();

const siteUrl = getSiteUrl();
const canonical = `${siteUrl}/${tool!.slug}`;

// ── Structured data ──────────────────────────────────────────────
//
// Two schemas stacked together give the richest search appearance:
//
//  1. WebApplication  — tells Google this is a free online tool,
//     unlocks star ratings and the sitelinks search box in SERPs.
//
//  2. HowTo  — eligible for a rich result that shows the numbered
//     steps directly on the search result page, increasing CTR.
//
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PNG to JPG Converter",
    url: canonical,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern browser with Canvas API support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Convert one or many PNG images to JPG in your browser. Batch conversion, adjustable quality, and ZIP download — no uploads, no account required.",
    featureList: [
      "Batch PNG to JPG conversion",
      "Adjustable output quality",
      "Download all files as ZIP",
      "Client-side — files never leave your device",
      "Transparent backgrounds filled with white automatically",
    ],
    screenshot: `${siteUrl}/og/png-to-jpg-converter.webp`,
    provider: {
      "@type": "Organization",
      name: "Sounez",
      url: siteUrl,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert PNG to JPG online",
    description:
      "Convert PNG images to JPG for free in your browser — no upload, no account needed.",
    totalTime: "PT1M",
    tool: [
      {
        "@type": "HowToTool",
        name: "PNG to JPG Converter by Sounez",
        url: canonical,
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Upload your PNG files",
        text: "Drop one or more PNG files onto the upload area, or click to browse your device. You can add as many files as you need.",
        url: `${canonical}#upload`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Choose the output quality",
        text: "Use the quality slider to balance file size against image clarity. A setting of 85–90% is recommended for most uses.",
        url: `${canonical}#quality`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Convert all images",
        text: "Click Convert All to process every image at once. Conversion happens entirely in your browser.",
        url: `${canonical}#convert`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Download JPG files",
        text: "Download each JPG individually or click Download ZIP to get all converted images in a single file.",
        url: `${canonical}#download`,
      },
    ],
  },
];

// ── Page metadata ────────────────────────────────────────────────
export const metadata: Metadata = {
  // toolMetadata sets: title, description, alternates.canonical,
  // and a base openGraph with title + description + url.
  // We spread it first so the overrides below take precedence.
  ...toolMetadata(tool!, {
    // Primary keyword first ("PNG to JPG converter"), then modifier
    // ("free", "online"), then brand. Keep under 60 chars.
    title: "PNG to JPG Converter — Free, Batch & Online | Sounez",

    // 150–160 chars. Front-load the primary keyword.
    // Mention the key differentiators: batch, no upload, free.
    description:
      "Convert PNG to JPG free online — batch convert multiple files at once, adjust quality, and download as ZIP. Runs entirely in your browser. No uploads, no account.",
  }),

  // OpenGraph: must repeat the canonical URL and add image + type.
  // Spread toolMetadata's openGraph first so we don't lose `url`.
  openGraph: {
    type: "website",
    siteName: "Sounez",
    locale: "en_US",
    url: canonical,
    title: "PNG to JPG Converter — Free Batch Conversion Online",
    description:
      "Convert one or many PNG files to JPG right in your browser. Batch processing, quality control, ZIP download. Your images never leave your device.",
    images: [
      {
        // Use a dedicated OG image (1200×630) for better CTR on social.
        // Fall back to the site logo if you haven't made one yet.
        url: `${siteUrl}/og/png-to-jpg-converter.webp`,
        width: 1200,
        height: 630,
        alt: "PNG to JPG Converter — Sounez",
        type: "image/webp",
      },
    ],
  },

  // Twitter / X card — "summary_large_image" shows the full OG image.
  twitter: {
    card: "summary_large_image",
    site: "@sounez",
    title: "PNG to JPG Converter — Free Batch Conversion",
    description:
      "Batch convert PNG images to JPG online. Runs in your browser — nothing is uploaded. Free, no account needed.",
    images: [`${siteUrl}/og/png-to-jpg-converter.webp`],
  },
};

export default function Page() {
  return (
    <>
      {/* Inject both JSON-LD schemas into <head> */}
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <PngToJpgClient tool={tool!} />
    </>
  );
}