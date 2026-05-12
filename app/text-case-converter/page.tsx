import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TextCaseClient } from "./TextCaseClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";
const tool = toolBySlug("text-case-converter");
if (!tool) notFound();
export const metadata: Metadata = toolMetadata(tool!, {
  title: `${tool!.name} | UPPER, lower, Title, camelCase | Sounez`,
});
export default function Page() { return <TextCaseClient tool={tool!} />; }
