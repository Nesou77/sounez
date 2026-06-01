import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { getSiteUrl } from "@/lib/site-url";

const pageUrl = `${getSiteUrl()}/contact`;

export const metadata: Metadata = {
  title: "Contact Sounez | Feedback, Bug Reports and Tool Requests",
  description:
    "Have a question, found a bug, or want to request a new tool? Send us a message and we will respond when possible.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Contact Sounez",
    description:
      "Send feedback, report a bug, or request a new tool. We review incoming messages when support is available.",
    url: pageUrl,
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Sounez",
  url: pageUrl,
  description: "Send feedback, bug reports, tool requests, or partnership inquiries to Sounez.",
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
