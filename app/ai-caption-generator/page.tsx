import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { toolBySlug } from "@/data/tools";
import { AiCaptionClient } from "./AiCaptionClient";

export const metadata: Metadata = {
  title: "Free AI Caption Generator | Social Media Captions | Sounez",
  description:
    "Generate social media captions for Instagram, TikTok, LinkedIn and more with this free AI caption generator.",
  openGraph: {
    title: "Free AI Caption Generator | Sounez",
    description: "Get 3 ready-to-post captions for Instagram, TikTok or LinkedIn in one click.",
  },
};

export default function Page() {
  const tool = toolBySlug("ai-caption-generator");
  if (!tool) notFound();
  return <AiCaptionClient tool={tool} />;
}
