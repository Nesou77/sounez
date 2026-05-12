import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImagePlaceholderClient } from "./ImagePlaceholderClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";

const tool = toolBySlug("image-placeholder-generator");
if (!tool) notFound();

export const metadata: Metadata = {
  ...toolMetadata(tool!, {
    title: "Free Image Placeholder Generator | Create Dummy Images | Sounez",
    description:
      "Generate custom image placeholders with dimensions, colors and text for mockups and web layouts. SVG and PNG output.",
  }),
  openGraph: {
    title: "Free Image Placeholder Generator | Sounez",
    description: "Generate custom placeholder images for wireframes and mockups instantly.",
  },
};

export default function Page() {
  return <ImagePlaceholderClient tool={tool!} />;
}
