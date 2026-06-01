import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { toolsByCategory } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";

const count = toolsByCategory("utility-tools").length;

export const metadata: Metadata = {
  title: `Utility Tools | ${count} Tools for Files, Text and Everyday Tasks | Sounez`,
  description: `Browse ${count} utility tools for QR codes, passwords, word counts, image compression, calculators, resumes, study notes, and file conversion.`,
  alternates: { canonical: getSiteUrl() + "/categories/utility-tools" },
  openGraph: {
    title: "Utility Tools | Sounez",
    description: "Everyday tools for file, text, image, math, and study tasks with clear privacy notes.",
  },
};

export default function Page() {
  return <CategoryPage slug="utility-tools" />;
}
