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
            <p>We may collect the following types of information automatically:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong className="text-foreground">Usage data.</strong> Pages visited, tools used,
                time spent on pages, and referring URLs.
              </li>
              <li>
                <strong className="text-foreground">Device and browser data.</strong> Browser type,
                operating system, screen resolution, and language preferences.
              </li>
              <li>
                <strong className="text-foreground">Approximate location.</strong> Your IP address
                is used to determine approximate geographic location (country or region level) for
                analytics purposes. We do not store or log full IP addresses.
              </li>
              <li>
                <strong className="text-foreground">Contact form data.</strong> If you reach out via
                our contact form, we collect your name, email address, and message content solely to
                respond to your inquiry.
              </li>
            </ul>
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
              Generator, Caption Generator, and Business Name Generator. In these cases, your input
              is transmitted securely over HTTPS, used only to generate your requested result, and
              not stored or used for any other purpose.
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
                <strong className="text-foreground">Analytics data</strong> is retained in
                aggregated form by our analytics provider (Google Analytics). Individual session data
                is subject to Google&apos;s own retention settings, which we have configured to the
                shortest available period.
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
            </ul>
          </div>
        </section>

        <hr className="border-border" />

        {/* 4 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">4. Cookies</h2>
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
              You can disable or delete cookies at any time through your browser settings. Disabling
              cookies may affect some features of the site. Instructions for managing cookies are
              available in your browser&apos;s help documentation.
            </p>
            <p>
              To change your cookie choices on Sounez, use{" "}
              <strong className="text-foreground">Cookie settings</strong> in the site footer at any
              time. Your choice is stored in your browser&apos;s local storage under the key{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">sounez_cookie_consent</code>.
            </p>
            <p>
              Third parties, including Google, may place and read cookies on your browser, or use web
              beacons or IP addresses, to collect information as a result of ad serving on this
              website.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 5 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">5. Google AdSense and Advertising</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Sounez uses <strong className="text-foreground">Google AdSense</strong> to display
              advertisements. Ads help keep the service free. Google AdSense may use cookies and
              web beacons to collect data about your visits to this and other websites in order to
              show relevant ads.
            </p>
            <p>
              This includes the use of the <strong className="text-foreground">DoubleClick cookie</strong>,
              which enables Google and its partners to serve ads based on your prior visits to our
              site or other sites on the internet.
            </p>
            <p>
              You can opt out of personalised advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Google Ads Settings
              </a>
              . You can also opt out of third-party vendor cookies via{" "}
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
              For more information on how Google uses data when you visit sites that use Google
              services, visit{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                How Google uses data when you use our partners&apos; sites or apps
              </a>
              . Interest-based ads may show an AdChoices icon; see the{" "}
              <a
                href="https://youradchoices.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Digital Advertising Alliance
              </a>{" "}
              for industry opt-out options.
            </p>
            <p>
              <strong className="text-foreground">Google Consent Mode v2.</strong> Sounez
              implements Google Consent Mode v2. When you first visit the site, all consent signals
              — including <code className="rounded bg-muted px-1 py-0.5 text-xs">ad_storage</code>,{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">analytics_storage</code>,{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">ad_user_data</code>, and{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">ad_personalization</code> —
              default to <strong className="text-foreground">denied</strong>. This means no
              cookies are set, no personal data is shared with Google for advertising or analytics
              purposes, and only non-personalised ads may be shown until consent is updated. Google
              may use cookieless pings and conversion modelling in this state, which do not involve
              personal data. You can manage your consent preferences at any time through your
              browser settings or via the opt-out links above.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 6 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">6. Third-Party Advertising</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              In addition to Google AdSense, we may work with other advertising networks. These
              companies may use information about your visits to this and other websites to provide
              relevant ads.
            </p>
            <p>
              Third-party ad servers may use cookies, JavaScript, or web beacons in their ads and
              links that appear on Sounez. Sounez has no access to or control over the cookies used
              by third-party advertisers. You should review the privacy policies of those networks
              for more information.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* 7 */}
        <section>
          <h2 className="text-xl font-bold tracking-tight">7. Analytics</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              We use Google Analytics via Google Tag Manager to understand how visitors use Sounez.
              These services may collect:
            </p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Pages visited and time spent on each page.</li>
              <li>The source of your visit (search engine, direct, referral).</li>
              <li>Approximate geographic location (country or region).</li>
              <li>Device type, browser, and operating system.</li>
            </ul>
            <p>
              Analytics data is used solely to improve the website and our tools. You can opt out of
              Google Analytics tracking by installing the{" "}
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
          <h2 className="text-xl font-bold tracking-tight">15. Contact Us</h2>
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
