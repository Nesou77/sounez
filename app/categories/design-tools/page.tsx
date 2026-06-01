import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { toolsByCategory } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";

const count = toolsByCategory("design-tools").length;

export const metadata: Metadata = {
  title: `Design Tools | ${count} Tools for Colors, CSS and Web Assets | Sounez`,
  description: `Browse ${count} design tools for palettes, CSS gradients, favicons, SVG blobs, font pairings, shadows, background patterns, and placeholders.`,
  alternates: { canonical: getSiteUrl() + "/categories/design-tools" },
  openGraph: {
    title: "Design Tools | Sounez",
    description: "Practical web design tools for colors, CSS details, icons, typography, and mockups.",
  },
};

export default function Page() {
  return <CategoryPage slug="design-tools" />;
}
