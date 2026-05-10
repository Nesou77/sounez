import type { Metadata } from "next";
import { WordCounterClient } from "./WordCounterClient";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("word-counter")!;
export const metadata: Metadata = {
  title: `${tool.name} — Free Word & Character Counter | Sounez`,
  description: tool.description,
  openGraph: { title: tool.name, description: tool.description },
};
export default function Page() { return <WordCounterClient />; }
