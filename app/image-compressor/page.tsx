import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageCompressorClient } from "./ImageCompressorClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";

const tool = toolBySlug("image-compressor");
if (!tool) notFound();

export const metadata: Metadata = toolMetadata(tool!, {
  title: "Free Image Compressor | Compress JPG, PNG & WebP Online | Sounez",
  description:
    "Compress JPG, PNG and WebP images free online. Reduce file size without losing quality, convert formats, resize, and download as ZIP. Runs entirely in your browser with no upload needed.",
});

export default function Page() {
  return <ImageCompressorClient tool={tool!} />;
}
