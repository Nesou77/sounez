import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { toolsByCategory } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";
import { siteOpenGraphDefaults } from "@/lib/site-metadata-defaults";

const count = toolsByCategory("utility-tools").length;
const categoryUrl = `${getSiteUrl()}/categories/utility-tools`;

export const metadata: Metadata = {
  title: `Utility Tools | ${count} Everyday File & Text Tools`,
  description: `Browse ${count} utility tools for QR codes, passwords, word counts, image compression, calculators, resumes, study notes, and file conversion.`,
  alternates: { canonical: categoryUrl },
  openGraph: {
    title: "Utility Tools | Sounez",
    description: "Everyday tools for file, text, image, math, and study tasks with clear privacy notes.",
    url: categoryUrl,
    type: "website",
    ...siteOpenGraphDefaults(),
  },
};

export default function Page() {
  return <CategoryPage slug="utility-tools" />;
}
