import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { SmartPacksIndex } from "@/components/smart-packs/SmartPacksIndex";

const url = `${getSiteUrl()}/smart-packs`;

export const metadata: Metadata = {
  title: "Smart Packs | Create Complete Content Packs from One Idea | Sounez",
  description:
    "Sounez Smart Packs turn one brief into captions, listings, image SEO, launch copy, or study notes. Free workflows for creators, students, and small businesses.",
  alternates: { canonical: url },
  openGraph: {
    title: "Sounez Smart Packs",
    description:
      "One idea → multiple ready-to-use assets. Social, product, SEO, business launch, and study packs.",
    url,
  },
};

export default function SmartPacksPage() {
  return <SmartPacksIndex />;
}
