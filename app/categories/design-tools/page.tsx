import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Design Tools — Color Palettes & CSS Gradients | Sounez",
  description: "Free design tools: color palette generator and CSS gradient generator. Copy-ready code for designers and developers.",
  openGraph: {
    title: "Design Tools — Sounez",
    description: "Generate beautiful colors and gradients in seconds.",
  },
};

export default function Page() {
  return <CategoryPage slug="design-tools" />;
}
