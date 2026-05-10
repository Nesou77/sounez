import type { Metadata } from "next";
import { CssGradientClient } from "./CssGradientClient";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("css-gradient-generator")!;
export const metadata: Metadata = {
  title: `${tool.name} — Free CSS Gradient Maker | Sounez`,
  description: tool.description,
  openGraph: { title: tool.name, description: tool.description },
};
export default function Page() { return <CssGradientClient />; }
