import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { toolBySlug } from "@/data/tools";
import { WebsiteIdeaClient } from "./WebsiteIdeaClient";

export const metadata: Metadata = {
  title: "Free Website Idea Generator | Website Concepts & Features | Sounez",
  description:
    "Generate website ideas, project concepts, features, monetization ideas and page structures for your next online project.",
  openGraph: {
    title: "Free Website Idea Generator | Sounez",
    description: "Describe your interests and get unique website concepts with names, taglines and feature ideas.",
  },
};

export default function Page() {
  const tool = toolBySlug("website-idea-generator");
  if (!tool) notFound();
  return <WebsiteIdeaClient tool={tool} />;
}
