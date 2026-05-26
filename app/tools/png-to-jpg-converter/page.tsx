import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PngToJpgClient } from "@/app/png-to-jpg-converter/PngToJpgClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";
import { getSiteUrl } from "@/lib/site-url";

const tool = toolBySlug("png-to-jpg-converter");
if (!tool) notFound();

const siteUrl = getSiteUrl();
const canonical = `${siteUrl}/tools/${tool!.slug}`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PNG to JPG Converter",
    url: canonical,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern browser with Canvas API support",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Convert one or many PNG images to JPG in your browser. Batch conversion, adjustable quality, and ZIP download, no uploads, no account required.",
    featureList: [
      "Batch PNG to JPG conversion",
      "Adjustable output quality",
      "Download all files as ZIP",
      "Client-side, files never leave your device",
      "Transparent backgrounds filled with white automatically",
    ],
    screenshot: `${siteUrl}/og/png-to-jpg-converter.webp`,
    provider: { "@type": "Organization", name: "Sounez", url: siteUrl },
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert PNG to JPG online",
    description: "Convert PNG images to JPG for free in your browser, no upload, no account needed.",
    totalTime: "PT1M",
    tool: [{ "@type": "HowToTool", name: "PNG to JPG Converter by Sounez", url: canonical }],
    step: [
      { "@type": "HowToStep", position: 1, name: "Upload your PNG files", text: "Drop one or more PNG files onto the upload area, or click to browse your device.", url: `${canonical}#upload` },
      { "@type": "HowToStep", position: 2, name: "Choose the output quality", text: "Use the quality slider to balance file size against image clarity. 85-90% is recommended.", url: `${canonical}#quality` },
      { "@type": "HowToStep", position: 3, name: "Convert all images", text: "Click Convert All to process every image at once. Conversion happens entirely in your browser.", url: `${canonical}#convert` },
      { "@type": "HowToStep", position: 4, name: "Download JPG files", text: "Download each JPG individually or click Download ZIP to get all converted images in one file.", url: `${canonical}#download` },
    ],
  },
];

export const metadata: Metadata = {
  ...toolMetadata(tool!, {
    title: "PNG to JPG Converter, Free, Batch & Online | Sounez",
    description:
      "Convert PNG to JPG free online, batch convert multiple files at once, adjust quality, and download as ZIP. Runs entirely in your browser. No uploads, no account.",
  }),
  openGraph: {
    type: "website",
    siteName: "Sounez",
    locale: "en_US",
    url: canonical,
    title: "PNG to JPG Converter, Free Batch Conversion Online",
    description:
      "Convert one or many PNG files to JPG right in your browser. Batch processing, quality control, ZIP download. Your images never leave your device.",
    images: [
      {
        url: `${siteUrl}/og/png-to-jpg-converter.webp`,
        width: 1200,
        height: 630,
        alt: "PNG to JPG Converter, Sounez",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sounez",
    title: "PNG to JPG Converter, Free Batch Conversion",
    description:
      "Batch convert PNG images to JPG online. Runs in your browser, nothing is uploaded. Free, no account needed.",
    images: [`${siteUrl}/og/png-to-jpg-converter.webp`],
  },
};

export default function Page() {
  return (
    <>
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
