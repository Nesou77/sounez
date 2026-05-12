import type { Metadata } from "next";
import { ImagePlaceholderClient } from "./ImagePlaceholderClient";

export const metadata: Metadata = {
  title: "Free Image Placeholder Generator | Create Dummy Images | Sounez",
  description:
    "Generate custom image placeholders with dimensions, colors and text for mockups and web layouts. SVG and PNG output.",
  openGraph: {
    title: "Free Image Placeholder Generator | Sounez",
    description: "Generate custom placeholder images for wireframes and mockups instantly.",
  },
};

export default function Page() {
  return <ImagePlaceholderClient />;
}
