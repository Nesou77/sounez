import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { toolBySlug } from "@/data/tools";
import { BioClient } from "./BioClient";

export const metadata: Metadata = {
  title: "Free Bio Generator | Create Profile Bios Online | Sounez",
  description:
    "Create short and professional bios for Instagram, TikTok, LinkedIn, websites and social media profiles.",
  openGraph: {
    title: "Free Bio Generator | Sounez",
    description: "Fill in a few details and get a polished bio tailored to your platform in seconds.",
  },
};

export default function Page() {
  const tool = toolBySlug("bio-generator");
  if (!tool) notFound();
  return <BioClient tool={tool} />;
}
