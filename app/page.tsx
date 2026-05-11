import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "Sounez | Free Online Tools for Creators, Designers and Productivity",
  description:
    "Free, fast and simple online tools. QR codes, password generator, image compressor, color palettes, hashtag and YouTube tools. No signup needed.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sounez | Free Online Tools",
    description: "Free, fast tools for creators, designers and productivity. No signup needed.",
    url: "/",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
