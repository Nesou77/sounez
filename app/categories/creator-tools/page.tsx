import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { toolsByCategory } from "@/data/tools";

const count = toolsByCategory("creator-tools").length;

export const metadata: Metadata = {
  title: `Creator Tools | ${count} Free Tools for YouTubers, TikTokers & Creators | Sounez`,
  description: `Free creator tools: YouTube tags generator, TikTok money calculator, hashtag generator, AI caption generator, bio generator, business name generator and more. ${count} tools, no account needed.`,
  openGraph: {
    title: "Creator Tools | Sounez",
    description: "Grow on YouTube, TikTok and Instagram with free creator tools.",
  },
};

export default function Page() {
  return <CategoryPage slug="creator-tools" />;
}
