import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { toolsByCategory } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";

const count = toolsByCategory("creator-tools").length;

export const metadata: Metadata = {
  title: `Creator Tools | ${count} Tools for Captions, Tags and Bios | Sounez`,
  description: `Browse ${count} creator tools for captions, hashtags, YouTube tags, bios, business names, and rough sponsored-post planning. Edit drafts before publishing.`,
  alternates: { canonical: getSiteUrl() + "/categories/creator-tools" },
  openGraph: {
    title: "Creator Tools | Sounez",
    description: "Tools for drafting captions, tags, bios, and creator planning notes.",
  },
};

export default function Page() {
  return <CategoryPage slug="creator-tools" />;
}
