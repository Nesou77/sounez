import type { Metadata } from "next";
import { TiktokMoneyClient } from "./TiktokMoneyClient";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("tiktok-money-calculator")!;
export const metadata: Metadata = {
  title: `${tool.name} — Estimate Your TikTok Earnings | Sounez`,
  description: tool.description,
  openGraph: { title: tool.name, description: tool.description },
};
export default function Page() { return <TiktokMoneyClient />; }
