import type { Metadata } from "next";
import { ImageCompressorClient } from "./ImageCompressorClient";
import { toolBySlug } from "@/data/tools";

const tool = toolBySlug("image-compressor")!;

export const metadata: Metadata = {
  title: `${tool.name} | Free Browser-Based Image Compression | Sounez`,
  description: tool.description,
  openGraph: { title: tool.name, description: tool.description },
};

export default function Page() {
  return <ImageCompressorClient />;
}
