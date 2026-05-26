import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { smartPackBySlug } from "@/lib/smart-packs-data";
import { SmartPackLayout } from "@/components/SmartPackLayout";
import { notFound } from "next/navigation";

const pack = smartPackBySlug("social-media-pack");
const url = `${getSiteUrl()}/smart-packs/social-media-pack`;

export const metadata: Metadata = {
  title: "Social Media Pack | Sounez Smart Packs",
  description: pack?.summary ?? "Plan captions, hashtags, and comments from one brief.",
  alternates: { canonical: url },
};

export default function SocialMediaPackPage() {
  if (!pack) notFound();
  return <SmartPackLayout pack={pack} />;
}
