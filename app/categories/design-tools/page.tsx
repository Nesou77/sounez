import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { toolsByCategory } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";
import { siteOpenGraphDefaults } from "@/lib/site-metadata-defaults";

const count = toolsByCategory("design-tools").length;
const categoryUrl = `${getSiteUrl()}/categories/design-tools`;

export const metadata: Metadata = {
  title: `Design Tools | ${count} Tools for Colors & CSS`,
  description: `Browse ${count} design tools for palettes, CSS gradients, favicons, SVG blobs, font pairings, shadows, background patterns, and placeholders.`,
  alternates: { canonical: categoryUrl },
  openGraph: {
    title: "Design Tools | Sounez",
    description: "Practical web design tools for colors, CSS details, icons, typography, and mockups.",
    url: categoryUrl,
    type: "website",
    ...siteOpenGraphDefaults(),
  },
};

export default function Page() {
  return <CategoryPage slug="design-tools" />;
}
