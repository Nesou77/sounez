import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Creator Tools — YouTube, TikTok & Hashtag Tools | Sounez",
  description: "Free creator tools: YouTube tags generator, TikTok money calculator and hashtag generator. Built for USA creators.",
  openGraph: {
    title: "Creator Tools — Sounez",
    description: "Grow on YouTube, TikTok and Instagram with free creator tools.",
  },
};

export default function Page() {
  return <CategoryPage slug="creator-tools" />;
}
