import type { Metadata } from "next";
import { CalculatorClient } from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Free Online Calculator | Simple Calculator Tool | Sounez",
  description:
    "Use this free online calculator for quick addition, subtraction, multiplication, division and percentage calculations.",
  openGraph: {
    title: "Free Online Calculator | Sounez",
    description:
      "A clean, fast calculator for everyday maths. Runs entirely in your browser.",
  },
};

export default function Page() {
  return <CalculatorClient />;
}
