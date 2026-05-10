import type { Metadata } from "next";
import { YoutubeTagsClient } from "./YoutubeTagsClient";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("youtube-tags-generator")!;
export const metadata: Metadata = {
  title: `${tool.name} — Free YouTube SEO Tags | Sounez`,
  description: tool.description,
  openGraph: { title: tool.name, description: tool.description },
};
export default function Page() { return <YoutubeTagsClient />; }
