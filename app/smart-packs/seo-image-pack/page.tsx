import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { smartPackBySlug } from "@/lib/smart-packs-data";
import { SmartPackLayout } from "@/components/SmartPackLayout";
import { notFound } from "next/navigation";

const pack = smartPackBySlug("seo-image-pack");
const url = `${getSiteUrl()}/smart-packs/seo-image-pack`;

export const metadata: Metadata = {
  title: "SEO Image Pack | Sounez Smart Packs",
  description: pack?.summary ?? "Filenames, alt text, compression, and keywords for one image.",
  alternates: { canonical: url },
};

export default function SeoImagePackPage() {
  if (!pack) notFound();
  return <SmartPackLayout pack={pack} />;
}
