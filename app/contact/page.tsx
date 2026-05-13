import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Sounez | We'd love to hear from you",
  description: "Send feedback, report a bug or request a new tool. The Sounez team replies within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Sounez",
    description: "Reach the Sounez team. Feedback, bugs, tool requests.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
