import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { smartPackBySlug } from "@/lib/smart-packs-data";
import { SmartPackLayout } from "@/components/SmartPackLayout";
import { notFound } from "next/navigation";

const pack = smartPackBySlug("product-listing-pack");
const url = `${getSiteUrl()}/smart-packs/product-listing-pack`;

export const metadata: Metadata = {
  title: "Product Listing Pack | Sounez Smart Packs",
  description: pack?.summary ?? "Product titles, descriptions, alt text, and social copy from one workflow.",
  alternates: { canonical: url },
};

export default function ProductListingPackPage() {
  if (!pack) notFound();
  return <SmartPackLayout pack={pack} />;
}
