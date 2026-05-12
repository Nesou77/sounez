import type { Metadata } from "next";
import { BusinessNameClient } from "./BusinessNameClient";

export const metadata: Metadata = {
  title: "Free Business Name Generator | Brand Name Ideas | Sounez",
  description:
    "Generate creative business name ideas for your brand, startup, project or company using this free tool.",
  openGraph: {
    title: "Free Business Name Generator | Sounez",
    description:
      "Enter your industry and keywords and get 6 creative, brandable name ideas in seconds.",
  },
};

export default function Page() {
  return <BusinessNameClient />;
}
