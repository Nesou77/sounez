import type { Metadata } from "next";
import { TOOLS } from "@/data/tools";
import { ToolsClient } from "./ToolsClient";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Tools | Free Creator, Design and Utility Tools | Sounez",
  description: `Browse all ${TOOLS.length} free online tools on Sounez. Filter by category and search tools for creators, designers and productivity.`,
  alternates: { canonical: getSiteUrl() + "/tools" },
  openGraph: {
    title: "Tools | Sounez",
    description: "Browse free Sounez tools grouped by creator, design and utility categories.",
  },
};

export default function ToolsPage() {
  return <ToolsClient />;
}
