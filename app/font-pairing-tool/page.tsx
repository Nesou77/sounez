import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FontPairingClient } from "./FontPairingClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";

const tool = toolBySlug("font-pairing-tool");
if (!tool) notFound();

export const metadata: Metadata = {
  ...toolMetadata(tool!, {
    title: "Free Font Pairing Tool | Find Font Combinations | Sounez",
    description:
      "Discover clean font pairings for headings and body text with ready-to-copy CSS. Free typography tool for designers and developers.",
  }),
  openGraph: {
    title: "Free Font Pairing Tool | Sounez",
    description: "Find beautiful heading and body font combinations with copy-ready CSS.",
  },
};

export default function Page() {
  return <FontPairingClient tool={tool!} />;
}
