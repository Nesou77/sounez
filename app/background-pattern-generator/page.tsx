import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackgroundPatternClient } from "./BackgroundPatternClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";

const tool = toolBySlug("background-pattern-generator");
if (!tool) notFound();

export const metadata: Metadata = {
  ...toolMetadata(tool!, {
    title: "Free Background Pattern Generator | CSS & SVG Patterns | Sounez",
    description:
      "Create simple CSS and SVG background patterns for websites, landing pages and UI designs. Copy the CSS instantly.",
  }),
  openGraph: {
    title: "Free Background Pattern Generator | Sounez",
    description: "Generate CSS background patterns for dots, grids, lines, waves and more.",
  },
};

export default function Page() {
  return <BackgroundPatternClient tool={tool!} />;
}
