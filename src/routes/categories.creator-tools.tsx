import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/categories/creator-tools")({
  head: () => ({
    meta: [
      { title: "Creator Tools — YouTube, TikTok & Hashtag Tools | Sounez" },
      { name: "description", content: "Free creator tools: YouTube tags generator, TikTok money calculator and hashtag generator. Built for USA creators." },
      { property: "og:title", content: "Creator Tools — Sounez" },
      { property: "og:description", content: "Grow on YouTube, TikTok and Instagram with free creator tools." },
    ],
  }),
  component: () => <CategoryPage slug="creator-tools" />,
});
