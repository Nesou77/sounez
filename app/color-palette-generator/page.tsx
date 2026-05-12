import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ColorPaletteClient } from "./ColorPaletteClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";
const tool = toolBySlug("color-palette-generator");
if (!tool) notFound();
export const metadata: Metadata = toolMetadata(tool!, {
  title: `${tool!.name} | Free Palette Maker | Sounez`,
});
export default function Page() { return <ColorPaletteClient tool={tool!} />; }
