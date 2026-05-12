import type { Metadata } from "next";
import { TOOLS } from "@/data/tools";
import { ToolsClient } from "./ToolsClient";

export const metadata: Metadata = {
  title: "All Free Online Tools | Sounez",
  description: `Browse all ${TOOLS.length} free online tools on Sounez. Filter by category and search tools for creators, designers and productivity.`,
  openGraph: {
    title: "All Free Online Tools | Sounez",
    description: "Browse and search all free Sounez tools.",
  },
};

export default function ToolsPage() {
  return <ToolsClient />;
}
