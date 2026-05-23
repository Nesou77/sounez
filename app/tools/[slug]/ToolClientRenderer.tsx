"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { Tool } from "@/data/tools";

const Skeleton = () => (
  <div className="space-y-4 p-6">
    <div className="h-8 w-1/3 animate-pulse rounded-xl bg-muted" />
    <div className="h-40 animate-pulse rounded-2xl bg-muted" />
    <div className="h-6 w-2/3 animate-pulse rounded-xl bg-muted" />
  </div>
);

const REGISTRY: Record<string, ComponentType<{ tool: Tool }>> = {
  // ── Existing tools (24) ──────────────────────────────────────────────────
  "youtube-tags-generator": dynamic(
    () => import("@/app/youtube-tags-generator/YoutubeTagsClient").then((m) => ({ default: m.YoutubeTagsClient })),
    { loading: Skeleton },
  ),
  "tiktok-money-calculator": dynamic(
    () => import("@/app/tiktok-money-calculator/TiktokMoneyClient").then((m) => ({ default: m.TiktokMoneyClient })),
    { loading: Skeleton },
  ),
  "hashtag-generator": dynamic(
    () => import("@/app/hashtag-generator/HashtagClient").then((m) => ({ default: m.HashtagClient })),
    { loading: Skeleton },
  ),
  "color-palette-generator": dynamic(
    () => import("@/app/color-palette-generator/ColorPaletteClient").then((m) => ({ default: m.ColorPaletteClient })),
    { loading: Skeleton },
  ),
  "css-gradient-generator": dynamic(
    () => import("@/app/css-gradient-generator/CssGradientClient").then((m) => ({ default: m.CssGradientClient })),
    { loading: Skeleton },
  ),
  "qr-code-generator": dynamic(
    () => import("@/app/qr-code-generator/QrCodeClient").then((m) => ({ default: m.QrCodeClient })),
    { loading: Skeleton },
  ),
  "word-counter": dynamic(
    () => import("@/app/word-counter/WordCounterClient").then((m) => ({ default: m.WordCounterClient })),
    { loading: Skeleton },
  ),
  "password-generator": dynamic(
    () => import("@/app/password-generator/PasswordGeneratorClient").then((m) => ({ default: m.PasswordGeneratorClient })),
    { loading: Skeleton },
  ),
  "text-case-converter": dynamic(
    () => import("@/app/text-case-converter/TextCaseClient").then((m) => ({ default: m.TextCaseClient })),
    { loading: Skeleton },
  ),
  "image-compressor": dynamic(
    () => import("@/app/image-compressor/ImageCompressorClient").then((m) => ({ default: m.ImageCompressorClient })),
    { loading: Skeleton },
  ),
  "ai-caption-generator": dynamic(
    () => import("@/app/ai-caption-generator/AiCaptionClient").then((m) => ({ default: m.AiCaptionClient })),
    { loading: Skeleton },
  ),
  "bio-generator": dynamic(
    () => import("@/app/bio-generator/BioClient").then((m) => ({ default: m.BioClient })),
    { loading: Skeleton },
  ),
  "calculator": dynamic(
    () => import("@/app/calculator/CalculatorClient").then((m) => ({ default: m.CalculatorClient })),
    { loading: Skeleton },
  ),
  "business-name-generator": dynamic(
    () => import("@/app/business-name-generator/BusinessNameClient").then((m) => ({ default: m.BusinessNameClient })),
    { loading: Skeleton },
  ),
  "study-notes-generator": dynamic(
    () => import("@/app/study-notes-generator/StudyNotesClient").then((m) => ({ default: m.StudyNotesClient })),
    { loading: Skeleton },
  ),
  "website-idea-generator": dynamic(
    () => import("@/app/website-idea-generator/WebsiteIdeaClient").then((m) => ({ default: m.WebsiteIdeaClient })),
    { loading: Skeleton },
  ),
  "resume-generator": dynamic(
    () => import("@/app/resume-generator/ResumeClient").then((m) => ({ default: m.ResumeClient })),
    { loading: Skeleton },
  ),
  // png-to-jpg-converter has a dedicated static page at app/tools/png-to-jpg-converter/
  // that takes priority over this dynamic route — it's listed here as a fallback only.
  "png-to-jpg-converter": dynamic(
    () => import("@/app/png-to-jpg-converter/PngToJpgClient").then((m) => ({ default: m.PngToJpgClient })),
    { loading: Skeleton },
  ),
  "favicon-generator": dynamic(
    () => import("@/app/favicon-generator/FaviconClient").then((m) => ({ default: m.FaviconClient })),
    { loading: Skeleton },
  ),
  "svg-blob-generator": dynamic(
    () => import("@/app/svg-blob-generator/SvgBlobClient").then((m) => ({ default: m.SvgBlobClient })),
    { loading: Skeleton },
  ),
  "font-pairing-tool": dynamic(
    () => import("@/app/font-pairing-tool/FontPairingClient").then((m) => ({ default: m.FontPairingClient })),
    { loading: Skeleton },
  ),
  "image-placeholder-generator": dynamic(
    () => import("@/app/image-placeholder-generator/ImagePlaceholderClient").then((m) => ({ default: m.ImagePlaceholderClient })),
    { loading: Skeleton },
  ),
  "box-shadow-generator": dynamic(
    () => import("@/app/box-shadow-generator/BoxShadowClient").then((m) => ({ default: m.BoxShadowClient })),
    { loading: Skeleton },
  ),
  "background-pattern-generator": dynamic(
    () => import("@/app/background-pattern-generator/BackgroundPatternClient").then((m) => ({ default: m.BackgroundPatternClient })),
    { loading: Skeleton },
  ),
  // ── New tools (3) ────────────────────────────────────────────────────────
  "pdf-to-word-converter": dynamic(
    () => import("@/app/pdf-to-word-converter/PdfToWordConverterClient").then((m) => ({ default: m.PdfToWordConverterClient })),
    { loading: Skeleton },
  ),
  "background-remover": dynamic(
    () => import("@/app/background-remover/BackgroundRemoverClient").then((m) => ({ default: m.BackgroundRemoverClient })),
    { loading: Skeleton },
  ),
  "image-describer": dynamic(
    () => import("@/app/image-describer/ImageDescriberClient").then((m) => ({ default: m.ImageDescriberClient })),
    { loading: Skeleton },
  ),
};

export function ToolClientRenderer({ slug, tool }: { slug: string; tool: Tool }) {
  const Component = REGISTRY[slug];
  if (!Component) return null;
  return <Component tool={tool} />;
}
