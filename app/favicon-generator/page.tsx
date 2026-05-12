import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaviconClient } from "./FaviconClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";

const tool = toolBySlug("favicon-generator");
if (!tool) notFound();

export const metadata: Metadata = {
  ...toolMetadata(tool!, {
    title: "Free Favicon Generator | Create Website Icons Online | Sounez",
    description:
      "Create simple favicons from text, emoji, colors or uploaded images and download browser-ready website icons. Free, no account needed.",
  }),
  openGraph: {
    title: "Free Favicon Generator | Sounez",
    description: "Create browser-ready favicons from text, emoji or images in seconds.",
  },
};

export default function Page() {
  return <FaviconClient tool={tool!} />;
}
