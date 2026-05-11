import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Utility Tools | QR Codes, Passwords, Word Counter | Sounez",
  description: "Free utility tools: QR code generator, password generator, word counter, image compressor and text case converter.",
  openGraph: {
    title: "Utility Tools | Sounez",
    description: "Everyday productivity tools. Fast, free and private.",
  },
};

export default function Page() {
  return <CategoryPage slug="utility-tools" />;
}
