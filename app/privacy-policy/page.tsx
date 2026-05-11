import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { Shield, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Sounez",
  description:
    "Learn how Sounez collects, uses and protects your information. We use cookies, Google AdSense and analytics to improve your experience.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy — Sounez",
    description: "How Sounez handles your data, cookies and advertising.",
    url: "/privacy-policy",
  },
};

const LAST_UPDATED = "May 11, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* Header */}
      <header className="mb-12 text-center">
        <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-pop">
          <Shield className="h-6 w-6" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: <time dateTime="2026-05-11">{LAST_UPDATED}</time>
        </p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Your privacy matters to us. This policy explains what information we collect, how we use
          it, and the choices you have.
        </p>
      </header>

      {/* Content */}
      <div className="space-y-10 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">

        {/* 1 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">1. Information We Collect</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Sounez is designed to be used without creating an account. We do not require you to
              provide any personal information to use our tools.
            </p>
            <p>We may collect the following types of information automatically:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong className="text-foreground">Usage data</strong> — pages visited, tools used,
                time spent on pages, and referring URLs.
              </li>
              <li>
                <strong className="text-foreground">Device and browser data</strong> — browser type,
                operating system, screen resolution, and language preferences.
              </li>
              <li>
                <strong className="text-foreground">IP address</strong> — used to determine
                approximate geographic location (country/region level) for analytics purposes.
              </li>
              <li>
                <strong className="text-foreground">Contact form data</strong> — if you reach out via
                our contact form, we collect your name, email address, and message content solely to
                respond to your inquiry.
              </li>
            </ul>
          </div>
        </section>

        <hr className="border-border" />

        {/* 2 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">2. Cookies</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Cookies are small text files stored on your device by your browser. Sounez and its
              third-party partners use cookies to:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Remember your preferences and settings.</li>
              <li>Understand how visitors use the website (analytics).</li>
              <li>Deliver and personalise advertisements (advertising cookies).</li>
              <li>Measure the performance of ad campaigns.</li>
            </ul>
            <p>
              You can disable or delete cookies at any time through your browser settings. Please
              note that disabling cookies may affect the functionality of some features on this site.
              Instructions for managing cookies can be found in your browser&apos;s help
              documentation.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 3 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">3. Google AdSense &amp; Advertising</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Sounez uses <strong className="text-foreground">Google AdSense</strong> to display
              advertisements. Google AdSense is an advertising service provided by Google LLC.
            </p>
            <p>
              Google AdSense may use cookies and web beacons to collect data about your visits to
              this and other websites in order to provide relevant advertisements. This includes the
              use of the <strong className="text-foreground">DoubleClick cookie</strong>, which
              enables Google and its partners to serve ads based on your prior visits to our site or
              other sites on the internet.
            </p>
            <p>
              You may opt out of personalised advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Google Ads Settings
              </a>
              . You can also opt out of third-party vendor cookies for personalised advertising by
              visiting{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                aboutads.info
              </a>
              .
            </p>
            <p>
              For more information on how Google uses data when you use our site, please visit{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                How Google uses data from sites that use Google services
              </a>
              .
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 4 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">4. Third-Party Advertising</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              In addition to Google AdSense, we may work with other third-party advertising networks
              and partners. These companies may use information about your visits to this and other
              websites to provide relevant advertisements.
            </p>
            <p>
              Third-party ad servers or ad networks use technologies such as cookies, JavaScript, or
              web beacons in their respective advertisements and links that appear on Sounez. These
              technologies are used to measure the effectiveness of their advertising campaigns and
              to personalise the advertising content you see.
            </p>
            <p>
              Sounez has no access to or control over the cookies used by third-party advertisers.
              You should consult the respective privacy policies of these third-party ad servers for
              more detailed information.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 5 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">5. Analytics</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              We use analytics services (including Google Analytics via Google Tag Manager) to
              understand how visitors interact with Sounez. These services collect information such
              as:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Pages visited and time spent on each page.</li>
              <li>The source of your visit (search engine, direct, referral).</li>
              <li>Approximate geographic location (country/region).</li>
              <li>Device type, browser, and operating system.</li>
            </ul>
            <p>
              Analytics data is aggregated and anonymised where possible. It is used solely to
              improve the website and our tools. Analytics services may set their own cookies on your
              device. You can opt out of Google Analytics tracking by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 6 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">6. How We Use Your Information</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>The information we collect is used to:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Operate, maintain, and improve Sounez and its tools.</li>
              <li>Understand usage patterns and optimise the user experience.</li>
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

        {/* 7 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">7. Data Protection</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              We take reasonable technical and organisational measures to protect the information we
              hold. However, no method of transmission over the internet or electronic storage is
              100% secure. We cannot guarantee absolute security.
            </p>
            <p>
              Most Sounez tools process data entirely within your browser. No input data (such as
              text you type into a tool) is sent to our servers unless explicitly stated.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 8 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">8. External Links</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Sounez may contain links to external websites. We are not responsible for the privacy
              practices or content of those sites. We encourage you to review the privacy policy of
              any external site you visit.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 9 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">9. Children&apos;s Privacy</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Sounez is not directed at children under the age of 13. We do not knowingly collect
              personal information from children. If you believe a child has provided us with
              personal information, please contact us and we will delete it promptly.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 10 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">10. Your Consent</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              By using Sounez, you consent to this Privacy Policy. If you do not agree with any part
              of this policy, please discontinue use of the website.
            </p>
            <p>
              You can withdraw consent for cookie-based tracking at any time by adjusting your
              browser settings or using the opt-out links provided in the relevant sections above.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 11 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">11. Changes to This Policy</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated &quot;Last updated&quot; date. We encourage you to review this
              policy periodically.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 12 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">12. Contact Us</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              If you have any questions about this Privacy Policy or how we handle your data, please
              get in touch:
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

      {/* Footer nav */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        <Link href="/terms-of-service" className="hover:text-foreground hover:underline">
          Terms of Service
        </Link>
        <span aria-hidden>·</span>
        <Link href="/contact" className="hover:text-foreground hover:underline">
          Contact
        </Link>
        <span aria-hidden>·</span>
        <Link href="/" className="hover:text-foreground hover:underline">
          Home
        </Link>
      </div>
    </div>
  );
}
