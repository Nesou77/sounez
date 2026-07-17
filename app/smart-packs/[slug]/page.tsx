import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SMART_PACKS, smartPackBySlug } from "@/data/smartPacks";
import { getSiteUrl } from "@/lib/site-url";
import { siteOpenGraphDefaults } from "@/lib/site-metadata-defaults";
import { SmartPackPageContent } from "@/components/smart-packs/SmartPackPageContent";
import { SmartPackJsonLd } from "@/components/smart-packs/SmartPackJsonLd";

export function generateStaticParams() {
  return SMART_PACKS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pack = smartPackBySlug(slug);
  if (!pack) return { title: "Smart Pack not found", robots: { index: false, follow: true } };
  const url = `${getSiteUrl()}/smart-packs/${slug}`;
  return {
    title: pack.seo.title,
    description: pack.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: pack.seo.ogTitle ?? pack.seo.title,
      description: pack.seo.ogDescription ?? pack.seo.description,
      url,
      type: "website",
      ...siteOpenGraphDefaults(),
    },
  };
}

export default async function SmartPackDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pack = smartPackBySlug(slug);
  if (!pack) notFound();

  return (
    <>
      <SmartPackJsonLd pack={pack} />
      <SmartPackPageContent pack={pack} />
    </>
  );
}
