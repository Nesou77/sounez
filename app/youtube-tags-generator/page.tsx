import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { YoutubeTagsClient } from "./YoutubeTagsClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";
const tool = toolBySlug("youtube-tags-generator");
if (!tool) notFound();
export const metadata: Metadata = toolMetadata(tool!, {
  title: `${tool!.name} | Free YouTube SEO Tags | Sounez`,
});
export default function Page() { return <YoutubeTagsClient tool={tool!} />; }
