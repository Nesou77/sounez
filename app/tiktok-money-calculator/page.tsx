import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TiktokMoneyClient } from "./TiktokMoneyClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";
const tool = toolBySlug("tiktok-money-calculator");
if (!tool) notFound();
export const metadata: Metadata = toolMetadata(tool!, {
  title: `${tool!.name} | Estimate Your TikTok Earnings | Sounez`,
});
export default function Page() { return <TiktokMoneyClient tool={tool!} />; }
