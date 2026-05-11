import type { Metadata } from "next";
import { TextCaseClient } from "./TextCaseClient";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("text-case-converter")!;
export const metadata: Metadata = {
  title: `${tool.name} | UPPER, lower, Title, camelCase | Sounez`,
  description: tool.description,
  openGraph: { title: tool.name, description: tool.description },
};
export default function Page() { return <TextCaseClient />; }
