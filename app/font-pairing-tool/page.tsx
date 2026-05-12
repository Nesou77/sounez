import type { Metadata } from "next";
import { FontPairingClient } from "./FontPairingClient";

export const metadata: Metadata = {
  title: "Free Font Pairing Tool | Find Font Combinations | Sounez",
  description:
    "Discover clean font pairings for headings and body text with ready-to-copy CSS. Free typography tool for designers and developers.",
  openGraph: {
    title: "Free Font Pairing Tool | Sounez",
    description: "Find beautiful heading and body font combinations with copy-ready CSS.",
  },
};

export default function Page() {
  return <FontPairingClient />;
}
