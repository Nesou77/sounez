import type { Metadata } from "next";
import { FaviconClient } from "./FaviconClient";

export const metadata: Metadata = {
  title: "Free Favicon Generator | Create Website Icons Online | Sounez",
  description:
    "Create simple favicons from text, emoji, colors or uploaded images and download browser-ready website icons. Free, no account needed.",
  openGraph: {
    title: "Free Favicon Generator | Sounez",
    description: "Create browser-ready favicons from text, emoji or images in seconds.",
  },
};

export default function Page() {
  return <FaviconClient />;
}
