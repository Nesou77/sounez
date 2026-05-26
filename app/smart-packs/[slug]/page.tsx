import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SMART_PACKS, smartPackBySlug } from "@/data/smartPacks";
import { getSiteUrl } from "@/lib/site-url";
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
  if (!pack) return {};
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
