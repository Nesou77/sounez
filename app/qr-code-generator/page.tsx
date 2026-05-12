import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QrCodeClient } from "./QrCodeClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";

const tool = toolBySlug("qr-code-generator");
if (!tool) notFound();

export const metadata: Metadata = toolMetadata(tool!, {
  title: `${tool!.name} | Free Online QR Code Maker | Sounez`,
});

export default function Page() {
  return <QrCodeClient tool={tool!} />;
}
