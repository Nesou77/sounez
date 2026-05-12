import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PngToJpgClient } from "./PngToJpgClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";

const tool = toolBySlug("png-to-jpg-converter");
if (!tool) notFound();

export const metadata: Metadata = {
  ...toolMetadata(tool!, {
    title: "Free PNG to JPG Converter | Convert Images Online | Sounez",
    description:
      "Convert PNG images to JPG directly in your browser with this free and simple PNG to JPG converter.",
  }),
  openGraph: {
    title: "Free PNG to JPG Converter | Sounez",
    description:
      "Drop a PNG and convert it to JPG right in your browser. Your images never leave your device.",
  },
};

export default function Page() {
  return <PngToJpgClient tool={tool!} />;
}
