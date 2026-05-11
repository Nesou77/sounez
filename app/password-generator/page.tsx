import type { Metadata } from "next";
import { PasswordGeneratorClient } from "./PasswordGeneratorClient";
import { toolBySlug } from "@/data/tools";

const tool = toolBySlug("password-generator")!;

export const metadata: Metadata = {
  title: `${tool.name} | Free Strong Password Maker | Sounez`,
  description: tool.description,
  openGraph: { title: tool.name, description: tool.description },
};

export default function Page() {
  return <PasswordGeneratorClient />;
}
