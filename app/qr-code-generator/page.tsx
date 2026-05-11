import type { Metadata } from "next";
import { QrCodeClient } from "./QrCodeClient";
import { toolBySlug } from "@/data/tools";

const tool = toolBySlug("qr-code-generator")!;

export const metadata: Metadata = {
  title: `${tool.name} | Free Online QR Code Maker | Sounez`,
  description: tool.description,
  openGraph: { title: tool.name, description: tool.description },
};

export default function Page() {
  return <QrCodeClient />;
}
