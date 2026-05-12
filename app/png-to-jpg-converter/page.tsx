import type { Metadata } from "next";
import { PngToJpgClient } from "./PngToJpgClient";

export const metadata: Metadata = {
  title: "Free PNG to JPG Converter | Convert Images Online | Sounez",
  description:
    "Convert PNG images to JPG directly in your browser with this free and simple PNG to JPG converter.",
  openGraph: {
    title: "Free PNG to JPG Converter | Sounez",
    description:
      "Drop a PNG and convert it to JPG right in your browser. Your images never leave your device.",
  },
};

export default function Page() {
  return <PngToJpgClient />;
}
