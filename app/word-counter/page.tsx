import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WordCounterClient } from "./WordCounterClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";
const tool = toolBySlug("word-counter");
if (!tool) notFound();
export const metadata: Metadata = toolMetadata(tool!, {
  title: `${tool!.name} | Free Word and Character Counter | Sounez`,
});
export default function Page() { return <WordCounterClient tool={tool!} />; }
