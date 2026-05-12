import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CssGradientClient } from "./CssGradientClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";
const tool = toolBySlug("css-gradient-generator");
if (!tool) notFound();
export const metadata: Metadata = toolMetadata(tool!, {
  title: `${tool!.name} | Free CSS Gradient Maker | Sounez`,
});
export default function Page() { return <CssGradientClient tool={tool!} />; }
