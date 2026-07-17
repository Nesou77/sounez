import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { toolsByCategory } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";
import { siteOpenGraphDefaults } from "@/lib/site-metadata-defaults";

const count = toolsByCategory("creator-tools").length;
const categoryUrl = `${getSiteUrl()}/categories/creator-tools`;

export const metadata: Metadata = {
  title: `Creator Tools | ${count} Tools for Captions, Tags and Bios`,
  description: `Browse ${count} creator tools for captions, hashtags, YouTube tags, bios, business names, and rough sponsored-post planning. Edit drafts before publishing.`,
  alternates: { canonical: categoryUrl },
  openGraph: {
    title: "Creator Tools | Sounez",
    description: "Tools for drafting captions, tags, bios, and creator planning notes.",
    url: categoryUrl,
    type: "website",
    ...siteOpenGraphDefaults(),
  },
};

export default function Page() {
  return <CategoryPage slug="creator-tools" />;
}
