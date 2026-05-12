import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PasswordGeneratorClient } from "./PasswordGeneratorClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";

const tool = toolBySlug("password-generator");
if (!tool) notFound();

export const metadata: Metadata = toolMetadata(tool!, {
  title: `${tool!.name} | Free Strong Password Maker | Sounez`,
});

export default function Page() {
  return <PasswordGeneratorClient tool={tool!} />;
}
