import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { toolsByCategory } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";

const count = toolsByCategory("design-tools").length;

export const metadata: Metadata = {
  title: `Design Tools | ${count} Free Tools for Designers & Developers | Sounez`,
  description: `Free design tools: color palette generator, CSS gradient generator, favicon generator, SVG blob generator, font pairing tool, box shadow generator, background pattern generator and more. ${count} tools, no account needed.`,
  alternates: { canonical: getSiteUrl() + "/categories/design-tools" },
  openGraph: {
    title: "Design Tools | Sounez",
    description: "Generate colors, gradients, favicons, blobs, font pairings and CSS patterns in seconds.",
  },
};

export default function Page() {
  return <CategoryPage slug="design-tools" />;
}
