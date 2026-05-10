import type { Metadata } from "next";
import { ColorPaletteClient } from "./ColorPaletteClient";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("color-palette-generator")!;
export const metadata: Metadata = {
  title: `${tool.name} — Free Palette Maker | Sounez`,
  description: tool.description,
  openGraph: { title: tool.name, description: tool.description },
};
export default function Page() { return <ColorPaletteClient />; }
