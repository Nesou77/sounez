import type { Metadata } from "next";
import { BoxShadowClient } from "./BoxShadowClient";

export const metadata: Metadata = {
  title: "Free CSS Box Shadow Generator | Sounez",
  description:
    "Create, preview and copy CSS box shadows visually with this free online box shadow generator. Includes presets and live preview.",
  openGraph: {
    title: "Free CSS Box Shadow Generator | Sounez",
    description: "Design CSS box shadows visually and copy production-ready code instantly.",
  },
};

export default function Page() {
  return <BoxShadowClient />;
}
