import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { getSiteUrl } from "@/lib/site-url";

const pageUrl = `${getSiteUrl()}/cookie-policy`;

export const metadata: Metadata = {
  title: "Cookie Policy | Sounez",
  description: "How Sounez uses cookies, local storage, analytics, and Google AdSense.",
  alternates: { canonical: pageUrl },
};

const LAST_UPDATED = "May 26, 2026";

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: <time dateTime="2026-05-26">{LAST_UPDATED}</time>
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Sounez uses a small amount of storage in your browser so the site can remember your cookie choice,
          optional analytics, and ads. This page explains what that means in plain language. For broader data
          practices, see our{" "}
          <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </header>

      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">Your choice matters</h2>
          <p className="mt-2">
            When you first visit Sounez, you can accept or reject non-essential cookies. Rejecting keeps Google
            consent signals denied, so analytics and personalized advertising storage are not granted. Essential
            storage for your consent choice still applies so we do not ask you on every page load.
          </p>
          <p className="mt-2">
            You can change your mind anytime via{" "}
            <CookieSettingsButton className="font-medium text-primary hover:underline" /> in the footer.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Essential storage (always used)</h2>
          <p className="mt-2">
            We use local storage for your cookie consent choice (
            <code className="rounded bg-muted px-1">sounez_cookie_consent_v1</code>
            ). Without this, the banner would appear on every visit.
          </p>
          <p className="mt-2">
            If you mark a page as helpful on a tool or blog post, we store a simple flag in local storage so
            your vote is not counted twice from the same browser. That data is not used to profile you for
            advertising on its own.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Analytics cookies (optional)</h2>
          <p className="mt-2">
            If you accept cookies, Google Tag Manager may load Google Analytics. That helps us see which pages
            are useful (for example, which tools get opened) so we can improve the site. We do not use analytics
            to sell your personal data.
          </p>
          <p className="mt-2">
            You can opt out via <CookieSettingsButton className="font-medium text-primary hover:underline" /> or
            your browser&apos;s block-third-party-cookies setting. Some browsers also offer a global analytics
            opt-out extension from Google.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Google AdSense cookies (optional)</h2>
          <p className="mt-2">
            Sounez includes the Google AdSense script globally so Google can verify the site and serve ads.
            Until you accept cookies, Google Consent Mode keeps advertising storage and personalization denied.
            If you accept cookies, Google AdSense may set cookies or use similar technologies to serve and
            measure ads on Sounez. Google may use cookies to show ads based on your prior visits to this site
            or other sites, depending on your settings and region.
          </p>
          <p className="mt-2">
            Learn more in{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              How Google uses data on partner sites
            </a>{" "}
            and{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Tool data is separate from cookies</h2>
          <p className="mt-2">
            Many Sounez tools process your text or files without using advertising cookies. For example, the
            image compressor runs in your browser. AI and PDF tools may send content to our servers for
            processing - that is described on each tool page, not via AdSense cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Common examples</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Rejecting optional cookies does not stop browser-only tools from working.</li>
            <li>Clearing site data may reset cookie consent, helpful votes, and local tool preferences.</li>
            <li>Private browsing usually forgets Sounez storage when the private window closes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">How to clear or block cookies</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Open <CookieSettingsButton className="font-medium text-primary hover:underline" /> and reject non-essential cookies.</li>
            <li>Clear site data for sounez.com in your browser settings.</li>
            <li>Use private browsing if you do not want storage to persist between sessions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Questions</h2>
          <p className="mt-2">
            Email{" "}
            <a href="mailto:hello@sounez.com" className="font-medium text-primary hover:underline">
              hello@sounez.com
            </a>{" "}
            or use the{" "}
            <Link href="/contact" className="font-medium text-primary hover:underline">
              contact form
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
