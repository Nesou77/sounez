import type { Metadata } from "next";
import { ToolsClient } from "./ToolsClient";

export const metadata: Metadata = {
  title: "All Free Online Tools | Sounez",
  description: "Browse all free online tools on Sounez. Filter by category and search 10+ tools for creators, designers and productivity.",
  openGraph: {
    title: "All Free Online Tools | Sounez",
    description: "Browse and search all free Sounez tools.",
  },
};

export default function ToolsPage() {
  return <ToolsClient />;
}
