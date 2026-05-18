import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { toolsByCategory } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";

const count = toolsByCategory("utility-tools").length;

export const metadata: Metadata = {
  title: `Utility Tools | ${count} Free Productivity Tools | Sounez`,
  description: `Free utility tools: QR code generator, password generator, word counter, image compressor, calculator, resume generator, study notes generator and more. ${count} tools, no account needed.`,
  alternates: { canonical: getSiteUrl() + "/categories/utility-tools" },
  openGraph: {
    title: "Utility Tools | Sounez",
    description: "Everyday productivity tools. Fast, free and private.",
  },
};

export default function Page() {
  return <CategoryPage slug="utility-tools" />;
}
