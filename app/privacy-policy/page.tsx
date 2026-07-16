import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { Shield, Mail } from "lucide-react";
import { getSiteUrl } from "@/lib/site-url";

const pageUrl = `${getSiteUrl()}/privacy-policy`;

export const metadata: Metadata = {
  title: "Privacy Policy | Sounez",
  description:
    "Read the Sounez privacy policy. Learn what data is collected, how your files are handled, how cookies work, and what rights you have as a visitor.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Privacy Policy | Sounez",
    description: "How Sounez handles your data, files, cookies and advertising.",
    url: pageUrl,
  },
};

const LAST_UPDATED = "May 26, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="mb-12 text-center">
        <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-pop">
          <Shield className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: <time dateTime="2026-05-26">{LAST_UPDATED}</time>
        </p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          This policy explains what information Sounez collects, how it is used, how your files and
          inputs are handled, and what choices you have.
        </p>
      </header>

      <div className="space-y-10 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">

        {/* 1 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">1. Information We Collect</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Sounez is designed to be used without creating an account. We do not ask you for
              personal information to use the tools.
            </p>
            <p>
              Sounez does not currently run analytics or advertising scripts, so we do not
              automatically collect usage data (pages visited, time on page, referring URLs) for
              those purposes. Two categories of information may still exist:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong className="text-foreground">Standard server logs.</strong> Like any website,
                our hosting provider may briefly log technical request data (IP address, browser
                type, requested URL) for security, abuse prevention, and reliability. This is
                infrastructure-level logging, not analytics or advertising tracking, and is not used
                to build a profile of you.
              </li>
              <li>
                <strong className="text-foreground">Contact form data.</strong> If you reach out via
                our contact form, we collect your name, email address, and message content solely to
                respond to your inquiry.
              </li>
            </ul>
            <p>
              If Sounez enables analytics or advertising in the future, this section will be updated
              to name the specific data collected before that change goes live — see{" "}
              <Link href="/cookie-policy" className="font-medium text-primary hover:underline">
                Cookie Policy
              </Link>{" "}
              for the current status.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 2 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">2. How We Handle Files and Input Data</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Most Sounez tools process your data entirely within your browser using client-side
              JavaScript and web workers. This means:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                Files you upload to tools such as the Image Compressor are never sent to any Sounez
                server. Compression, conversion and resizing happen locally on your device.
              </li>
              <li>
                Text you type into tools such as the Password Generator, Word Counter, or Text Case
                Converter is never transmitted to any server.
              </li>
              <li>
                Generated outputs, such as compressed images, QR codes, color palettes or
                passwords, exist only in your browser session. We do not have access to them.
              </li>
            </ul>
            <p>
              A small number of tools send your input to a server-side API to generate a result.
              These tools are clearly identified and include AI-powered tools such as the Bio
              Generator, Caption Generator, Business Name Generator, and{" "}
              <strong className="text-foreground">Smart Packs</strong>. In these cases, your input
              is transmitted securely over HTTPS, used only to generate your requested result, and
              not used to train third-party models for unrelated purposes.
            </p>
            <p>
              <strong className="text-foreground">Smart Packs</strong> send your brief and form
              fields to our AI provider to build a structured pack (captions, listing copy, study
              notes, etc.). Successful generations may be stored in our database with the pack type,
              language, tone, input, output, and an anonymous session identifier (
              <code className="rounded bg-muted px-1">sounez_sp_visitor</code> cookie). We do not
              publish your prompts or results. Other visitors cannot access your history. You may
              delete individual saved packs from{" "}
              <Link href="/smart-packs/history" className="font-medium text-primary hover:underline">
                Smart Pack history
              </Link>{" "}
              on this device, or contact us to request removal.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 3 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">3. Data Retention</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              We only retain information for as long as necessary for the purpose it was collected.
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong className="text-foreground">Server logs</strong> are retained by our hosting
                provider only for the short period needed for security and reliability purposes.
              </li>
              <li>
                <strong className="text-foreground">Contact form submissions</strong> are retained
                only for as long as needed to respond to your inquiry and for a reasonable period
                after in case you follow up.
              </li>
              <li>
                <strong className="text-foreground">Browser-side data</strong> (localStorage,
                sessionStorage) is stored only on your device and can be cleared by you at any time
                through your browser settings.
              </li>
              <li>
                <strong className="text-foreground">Smart Pack generations</strong> are kept until
                you delete them from your history on this device or until we run routine database
                maintenance. Timestamps shown in history are real database dates.
              </li>
            </ul>
          </div>
        </section>

        <hr className="border-border" />

        {/* 4 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">4. Cookies</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Sounez does not currently set non-essential cookies. No advertising or analytics
              cookies are placed by this site, and no cookie consent banner is shown, because there
              is nothing non-essential to consent to yet.
            </p>
            <p>
              A small amount of local storage is used for the site to function (for example,
              remembering that you already marked a post as helpful, or showing your own Smart Pack
              history on this browser). This is described in full in the{" "}
              <Link href="/cookie-policy" className="font-medium text-primary hover:underline">
                Cookie Policy
              </Link>
              . You can clear this at any time through your browser settings.
            </p>
            <p>
              A cookie consent banner is already built into the site (it appears automatically once
              advertising or analytics is enabled in configuration, and can be reopened anytime via
              &quot;Cookie preferences&quot; in the footer). If Sounez enables advertising or
              analytics cookies in the future, this policy and the{" "}
              <Link href="/cookie-policy" className="font-medium text-primary hover:underline">
                Cookie Policy
              </Link>{" "}
              will also be updated to name the specific vendors and cookie types in use.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 5 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">5. Google AdSense and Advertising</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Sounez intends to use <strong className="text-foreground">Google AdSense</strong> to
              help keep the service free, but ad serving is currently disabled. A site-ownership
              verification tag may be present in the page source so Google can confirm domain
              ownership during the AdSense review process — this tag does not load ads, set cookies,
              or collect data on its own.
            </p>
            <p>
              When ads are enabled, Google AdSense may use cookies and similar technologies to serve
              and measure ads, including cookies that help show ads based on prior visits to this or
              other sites. Before that happens, this policy will be updated with the specific
              vendors and cookie types in use, and a consent mechanism will be added for visitors in
              the EEA, UK, and Switzerland.
            </p>
            <p>
              You can review or opt out of personalized advertising at any time via{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Google Ads Settings
              </a>{" "}
              and{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                aboutads.info
              </a>
              . For more on how Google uses data on partner sites, see{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Google&apos;s partner sites policy
              </a>
              .
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 6 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">6. Third-Party Advertising</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Sounez does not currently work with any advertising network. If that changes, this
              section will list the specific networks in use and how their cookies or tracking
              technologies work, before they are enabled on the site.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 7 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">7. Analytics</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Sounez does not currently run Google Analytics, Google Tag Manager, or any other
              analytics service. The site&apos;s codebase supports adding Google Tag Manager in the
              future, but it stays inactive unless the site owner explicitly configures it, and this
              policy will be updated first if that happens.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 8 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">8. How We Use Your Information</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>The information we collect is used to:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Operate, maintain, and improve Sounez and its tools.</li>
              <li>Understand usage patterns and improve the experience for visitors.</li>
              <li>Respond to contact form submissions and support requests.</li>
              <li>Display relevant advertisements to support the free service.</li>
              <li>Detect and prevent abuse, fraud, or security issues.</li>
            </ul>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We do not
              use your data for any purpose beyond what is described in this policy.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 9 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">9. Your Rights</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Depending on where you are located, you may have certain rights regarding your
              personal data. These may include the right to:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data where we are not required to keep it.</li>
              <li>Object to certain types of processing, including direct marketing.</li>
              <li>Withdraw consent for cookie-based tracking through your browser settings.</li>
            </ul>
            <p>
              Since Sounez does not require an account and most tools process data locally, the
              personal data we hold is typically limited to contact form submissions and aggregate
              analytics. To make a request regarding your data, please use our{" "}
              <Link href="/contact" className="font-medium text-primary hover:underline">
                contact form
              </Link>
              .
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 10 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">10. Data Security</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              We take reasonable technical and organisational steps to protect the information we
              hold. All data transmitted between your browser and our servers is encrypted using
              HTTPS.
            </p>
            <p>
              No method of transmission over the internet or electronic storage is 100% secure. We
              cannot guarantee absolute security, but we take the protection of your information
              seriously.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 11 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">11. External Links</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Sounez may contain links to external websites. We are not responsible for the privacy
              practices or content of those sites. We encourage you to review the privacy policy of
              any external site you visit.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 12 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">12. Children&apos;s Privacy</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Sounez is not directed at children under the age of 13. We do not knowingly collect
              personal information from children. If you believe a child has provided us with
              personal information, please contact us and we will delete it promptly.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 13 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">13. Your Consent</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              By using Sounez, you consent to this Privacy Policy. If you do not agree with any
              part of this policy, please stop using the website.
            </p>
            <p>
              You can withdraw consent for cookie-based tracking at any time by adjusting your
              browser settings or using the opt-out links in the relevant sections above.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 14 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">14. Changes to This Policy</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated date at the top. We encourage you to review this policy
              periodically.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 15 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">15. Comments and engagement</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              If you submit a comment, we store your display name, comment text, optional email (not shown
              publicly), and timestamps. Comments are moderated before publication. Helpful votes use a
              hashed browser identifier to prevent duplicate votes - we do not use this to identify you by
              name.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 16 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">16. Quick Privacy Examples</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              If you compress an image with a browser-only tool, the file is processed on your
              device. If you use an AI writing tool, the content may be sent to
              our server or AI provider to complete the request. Each tool page includes a shorter
              note so you do not have to read this whole policy every time.
            </p>
            <p>
              Do not submit passwords, private customer records, ID documents, unreleased client
              work, or files you are not allowed to process. If you are unsure, use local software
              approved by your school, employer, or client.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 17 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">17. Contact Us</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              If you have questions about this Privacy Policy or how we handle your data, please get
              in touch:
            </p>
            <a
              href="mailto:hello@sounez.com"
              className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
            >
              <Mail className="h-4 w-4" />
              hello@sounez.com
            </a>
            <p>
              Or use our{" "}
              <Link href="/contact" className="font-medium text-primary hover:underline">
                contact form
              </Link>
              .
            </p>
          </div>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        <Link href="/terms-of-service" className="hover:text-foreground hover:underline">
          Terms of Service
        </Link>
        <span aria-hidden>-</span>
        <Link href="/contact" className="hover:text-foreground hover:underline">
          Contact
        </Link>
        <span aria-hidden>-</span>
        <Link href="/" className="hover:text-foreground hover:underline">
          Home
        </Link>
      </div>
    </div>
  );
}
