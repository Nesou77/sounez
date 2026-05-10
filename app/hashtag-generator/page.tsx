import type { Metadata } from "next";
import { HashtagClient } from "./HashtagClient";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("hashtag-generator")!;
export const metadata: Metadata = {
  title: `${tool.name} — Free Instagram & TikTok Hashtags | Sounez`,
  description: tool.description,
  openGraph: { title: tool.name, description: tool.description },
};
export default function Page() { return <HashtagClient />; }
