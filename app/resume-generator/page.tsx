import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResumeClient } from "./ResumeClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";

const tool = toolBySlug("resume-generator");
if (!tool) notFound();

export const metadata: Metadata = {
  ...toolMetadata(tool!, {
    title: "Free Resume Generator | Create and Export Your CV | Sounez",
    description:
      "Create a clean professional resume online and export it as HTML or PDF using this free resume generator.",
  }),
  openGraph: {
    title: "Free Resume Generator | Sounez",
    description:
      "Fill in your details and export a clean, professional resume as PDF — no account, no watermark.",
  },
};

export default function Page() {
  return <ResumeClient tool={tool!} />;
}
