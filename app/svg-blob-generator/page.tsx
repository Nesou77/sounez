import type { Metadata } from "next";
import { SvgBlobClient } from "./SvgBlobClient";

export const metadata: Metadata = {
  title: "Free SVG Blob Generator | Create Organic Shapes | Sounez",
  description:
    "Generate smooth SVG blobs for backgrounds, hero sections and modern web design. Copy SVG code or download instantly.",
  openGraph: {
    title: "Free SVG Blob Generator | Sounez",
    description: "Generate smooth organic SVG blobs for websites and UI design.",
  },
};

export default function Page() {
  return <SvgBlobClient />;
}
