import type { Metadata } from "next";
import { ResumeClient } from "./ResumeClient";

export const metadata: Metadata = {
  title: "Free Resume Generator | Create and Export Your CV | Sounez",
  description:
    "Create a clean professional resume online and export it as HTML or PDF using this free resume generator.",
  openGraph: {
    title: "Free Resume Generator | Sounez",
    description:
      "Fill in your details and export a clean, professional resume as PDF — no account, no watermark.",
  },
};

export default function Page() {
  return <ResumeClient />;
}
