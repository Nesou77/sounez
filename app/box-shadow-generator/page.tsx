import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BoxShadowClient } from "./BoxShadowClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";

const tool = toolBySlug("box-shadow-generator");
if (!tool) notFound();

export const metadata: Metadata = {
  ...toolMetadata(tool!, {
    title: "Free CSS Box Shadow Generator | Sounez",
    description:
      "Create, preview and copy CSS box shadows visually with this free online box shadow generator. Includes presets and live preview.",
  }),
  openGraph: {
    title: "Free CSS Box Shadow Generator | Sounez",
    description: "Design CSS box shadows visually and copy production-ready code instantly.",
  },
};

export default function Page() {
  return <BoxShadowClient tool={tool!} />;
}
