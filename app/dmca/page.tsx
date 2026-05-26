import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { getSiteUrl } from "@/lib/site-url";

const pageUrl = `${getSiteUrl()}/dmca`;

export const metadata: Metadata = {
  title: "DMCA / Copyright | Sounez",
  description: "Copyright policy and takedown process for Sounez.",
  alternates: { canonical: pageUrl },
};

export default function DmcaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">DMCA / Copyright</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Sounez respects intellectual property. Our tools let you process files and text you provide — you are
          responsible for having the right to use that material. This page explains what we expect from visitors
          and how to report infringement.
        </p>
      </header>

      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-bold text-foreground">What you may upload or convert</h2>
          <p className="mt-2">
            Only use Sounez with content you own, created yourself, or have permission to use. That includes PDFs
            you convert, photos you describe or compress, and text you send to AI tools. Do not use our tools to
            copy, scrape, or redistribute someone else&apos;s work without authorization.
          </p>
          <p className="mt-2">
            Examples that are not allowed: converting a paid ebook you did not purchase, removing backgrounds from
            stock photos you have not licensed, or generating descriptions for images you do not have rights to publish.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">User comments and blog content</h2>
          <p className="mt-2">
            Visitor comments on tool and blog pages are moderated before they appear. If you believe a comment
            infringes your copyright, include the page URL in your notice (see below). We may remove comments or
            disable engagement on a page while we review a report.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">How to report copyright infringement</h2>
          <p className="mt-2">
            Send a notice to{" "}
            <a href="mailto:hello@sounez.com" className="font-medium text-primary hover:underline">
              hello@sounez.com
            </a>{" "}
            with the subject line <strong className="text-foreground">DMCA Notice</strong>. Include:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Your name and contact email (and postal address if you are submitting a formal DMCA notice)</li>
            <li>Identification of the copyrighted work you believe was infringed</li>
            <li>The exact URL on Sounez where the material appears (tool page, blog post, or comment)</li>
            <li>A statement that you have a good-faith belief the use is not authorized by the rights holder</li>
            <li>A statement that the information in your notice is accurate and, under penalty of perjury, that you are authorized to act on behalf of the rights holder</li>
            <li>Your physical or electronic signature</li>
          </ul>
          <p className="mt-3">
            Incomplete notices may take longer to process. We may forward your notice to the person who posted the
            material where appropriate.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Counter-notification</h2>
          <p className="mt-2">
            If you believe content was removed by mistake, you may reply with a counter-notification that meets
            applicable legal requirements. We will review counter-notifications in line with the DMCA and our
            ability to verify the dispute.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Repeat infringers</h2>
          <p className="mt-2">
            We may restrict access for users who repeatedly infringe copyright after valid notices. Because most
            tools do not require an account, restriction may apply at the IP or session level where technically
            feasible.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Related policies</h2>
          <p className="mt-2">
            See also our{" "}
            <Link href="/terms-of-service" className="font-medium text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>
            . Questions that are not copyright-related can go through the{" "}
            <Link href="/contact" className="font-medium text-primary hover:underline">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
