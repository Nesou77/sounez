import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorClient } from "./CalculatorClient";
import { toolBySlug } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";

const tool = toolBySlug("calculator");
if (!tool) notFound();

export const metadata: Metadata = {
  ...toolMetadata(tool!, {
    title: "Free Online Calculator | Simple Calculator Tool | Sounez",
    description:
      "Use this free online calculator for quick addition, subtraction, multiplication, division and percentage calculations.",
  }),
  openGraph: {
    title: "Free Online Calculator | Sounez",
    description:
      "A clean, fast calculator for everyday maths. Runs entirely in your browser.",
  },
};

export default function Page() {
  return <CalculatorClient tool={tool!} />;
}
