import type { Metadata } from "next";
import { BackgroundPatternClient } from "./BackgroundPatternClient";

export const metadata: Metadata = {
  title: "Free Background Pattern Generator | CSS & SVG Patterns | Sounez",
  description:
    "Create simple CSS and SVG background patterns for websites, landing pages and UI designs. Copy the CSS instantly.",
  openGraph: {
    title: "Free Background Pattern Generator | Sounez",
    description: "Generate CSS background patterns for dots, grids, lines, waves and more.",
  },
};

export default function Page() {
  return <BackgroundPatternClient />;
}
