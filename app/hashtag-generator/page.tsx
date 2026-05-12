import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HashtagClient } from "./HashtagClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";
const tool = toolBySlug("hashtag-generator");
if (!tool) notFound();
export const metadata: Metadata = toolMetadata(tool!, {
  title: `${tool!.name} | Free Instagram and TikTok Hashtags | Sounez`,
});
export default function Page() { return <HashtagClient tool={tool!} />; }
