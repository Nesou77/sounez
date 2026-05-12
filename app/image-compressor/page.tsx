import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageCompressorClient } from "./ImageCompressorClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";

const tool = toolBySlug("image-compressor");
if (!tool) notFound();

export const metadata: Metadata = toolMetadata(tool!, {
  title: `${tool!.name} | Free Browser-Based Image Compression | Sounez`,
});

export default function Page() {
  return <ImageCompressorClient tool={tool!} />;
}
