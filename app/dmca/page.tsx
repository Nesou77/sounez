import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { getSiteUrl } from "@/lib/site-url";

const pageUrl = `${getSiteUrl()}/dmca`;

const LAST_UPDATED = "May 26, 2026";

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
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: <time dateTime="2026-05-26">{LAST_UPDATED}</time>
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Sounez respects intellectual property. Our tools let you process files and text you provide - you are
          responsible for having the right to use that material. This page explains what we expect from visitors
          and how to report infringement.
        </p>
      </header>

      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-bold text-foreground">What you may upload or convert</h2>
          <p className="mt-2">
            Only use Sounez with content you own, created yourself, or have permission to use. That includes
            photos you describe or compress, and text you send to AI tools. Do not use our tools to
            copy, scrape, or redistribute someone else&apos;s work without authorization.
          </p>
          <p className="mt-2">
            Examples that are not allowed: using AI tools to rewrite and republish someone else&apos;s copyrighted
            article as your own, removing backgrounds from stock photos you have not licensed, or generating
            descriptions for images you do not have rights to publish.
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
          <h2 className="text-lg font-bold text-foreground">Before you send a notice</h2>
          <p className="mt-2">
            Please include enough detail for us to find the exact material. A page title alone is
            often not enough because tool pages can include comments, examples, generated snippets,
            and links. If the issue is a visitor comment, quote the comment text and include the URL.
          </p>
          <p className="mt-2">
            Copyright reports are for rights issues, not general feedback, search result complaints,
            or requests to change a tool. For those, use the contact page instead.
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
          <h2 className="text-lg font-bold text-foreground">What happens after you file</h2>
          <p className="mt-2">
            We review every notice for completeness. An incomplete submission (missing URL, missing authorization
            statement, or unidentifiable work) will receive a reply asking for the missing information before any
            action is taken.
          </p>
          <p className="mt-2">
            Once we have a complete notice, we aim to take one of the following actions within a reasonable time:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Remove or disable access to the identified material if the notice is valid on its face.</li>
            <li>Forward relevant contact details to the poster where legally required or appropriate.</li>
            <li>Request clarification if the identified content could not be located at the URL provided.</li>
            <li>Decline the notice and explain why if the claim appears clearly unfounded (e.g. the URL points to a tool interface, not user content).</li>
          </ul>
          <p className="mt-3">
            We do not guarantee a specific turnaround time. High submission volume, technical complexity, or
            requests requiring legal review may extend the processing period.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">AI-generated content and copyright</h2>
          <p className="mt-2">
            Some tools on Sounez use AI to generate text, descriptions, or other outputs from a brief you
            provide. Generated output is based on your input and the model&apos;s training; it may resemble
            existing published work by coincidence rather than by copying.
          </p>
          <p className="mt-2">
            If you believe a piece of AI output infringes your copyright, explain in your notice how the
            generated text reproduces substantial protected expression from a specific work you own, and include
            the URL of the Sounez page where the output appeared (if it is publicly visible). Claims based solely
            on thematic similarity or general style are not sufficient for a DMCA notice.
          </p>
          <p className="mt-2">
            We do not store generated outputs beyond the immediate session, so we cannot retrieve past results.
            If you wish to dispute a specific published piece (for example, a user comment or blog excerpt), follow
            the standard notice process above.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Counter-notification</h2>
          <p className="mt-2">
            If you believe content was removed by mistake, or that the original notice was based on a
            misidentification or misrepresentation of rights, you may submit a counter-notification. A valid
            counter-notification must include:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Your name, address, telephone number, and email address.</li>
            <li>Identification of the material that was removed and the URL where it appeared before removal.</li>
            <li>A statement under penalty of perjury that you have a good-faith belief that the material was removed by mistake or misidentification.</li>
            <li>A statement that you consent to the jurisdiction of the Federal District Court for your district (or, if outside the US, any judicial district in which Sounez may be found).</li>
            <li>Your physical or electronic signature.</li>
          </ul>
          <p className="mt-3">
            We may forward counter-notifications to the original complainant. If no legal action is filed within
            ten business days of our receiving a complete counter-notification, we will consider reinstating the
            material. We are not obligated to reinstate material and may exercise editorial discretion independently
            of the DMCA counter-notification process.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Repeat infringers</h2>
          <p className="mt-2">
            Sounez maintains a policy of limiting or terminating the access of users who repeatedly infringe
            copyright after receiving valid notices. This policy applies regardless of whether the infringing
            activity involves tool use, uploaded files, user comments, or blog submissions.
          </p>
          <p className="mt-2">
            Because most Sounez tools do not require account creation, enforcement may operate at the IP address,
            browser-session, or device level where technically feasible. We evaluate repeat infringement patterns
            on a case-by-case basis and reserve the right to block or restrict access without prior notice when
            infringement is clear and ongoing.
          </p>
          <p className="mt-2">
            Submitting a knowingly false or materially incomplete DMCA notice or counter-notification may expose
            the filer to liability under applicable law. We report clearly abusive or bad-faith notices where
            legally appropriate.
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
