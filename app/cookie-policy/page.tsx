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

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
      <p className="mt-4 text-muted-foreground">
        This policy explains how Sounez uses cookies, local storage, and similar technologies.
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-bold text-foreground">Essential storage</h2>
          <p className="mt-2">
            We use local storage for your cookie consent choice (
            <code className="rounded bg-muted px-1">sounez_cookie_consent_v1</code>
            ) and, when you use engagement features, to remember your helpful vote on a page. These are not used for
            advertising profiling on their own.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground">Analytics cookies</h2>
          <p className="mt-2">
            If you accept cookies, Google Tag Manager may load Google Analytics to help us understand how visitors use
            Sounez. You can opt out via our{" "}
            <CookieSettingsButton className="font-medium text-primary hover:underline" /> or your browser settings.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground">Google AdSense cookies</h2>
          <p className="mt-2">
            If you accept cookies, Google AdSense may set cookies or use similar technologies to serve and measure ads.
            See{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              How Google uses data on partner sites
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground">Change your preferences</h2>
          <p className="mt-2">
            Open <CookieSettingsButton className="font-medium text-primary hover:underline" /> in the footer at any time,
            or clear site data in your browser.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground">More information</h2>
          <p className="mt-2">
            See our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> for full
            data practices.
          </p>
        </section>
      </div>
    </div>
  );
}
