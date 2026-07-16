import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { getSiteUrl } from "@/lib/site-url";

const pageUrl = `${getSiteUrl()}/cookie-policy`;

export const metadata: Metadata = {
  title: "Cookie Policy | Sounez",
  description: "How Sounez currently handles cookies and local storage, and what changes when advertising or analytics are enabled.",
  alternates: { canonical: pageUrl },
};

const LAST_UPDATED = "July 4, 2026";

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: <time dateTime="2026-07-04">{LAST_UPDATED}</time>
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          This page explains what Sounez currently stores in your browser, and what will change if
          advertising or analytics are enabled in the future. For broader data practices, see our{" "}
          <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </header>

      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">Current status: no non-essential cookies</h2>
          <p className="mt-2">
            Sounez does not currently set advertising or analytics cookies, and no cookie consent
            banner is shown, because there is nothing non-essential to consent to yet. Google
            AdSense, Google Analytics, Google Tag Manager, and any other tracking or advertising
            script are all disabled by default and only load if the site owner explicitly turns
            them on in the deployment configuration.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Functional local storage (always used)</h2>
          <p className="mt-2">
            A small amount of local storage is used for the site to function, independent of any
            advertising or analytics choice:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              If you mark a tool or blog post as helpful, a flag is stored in local storage so your
              vote is not counted twice from the same browser. This is not used to profile you for
              advertising.
            </li>
            <li>
              Smart Pack history uses a first-party session identifier so you can see your own saved
              generations on this browser. It is not used for advertising or cross-site tracking.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">If advertising or analytics are enabled later</h2>
          <p className="mt-2">
            If Sounez enables Google AdSense or an analytics tool in the future, this policy will be
            updated first, and a proper consent solution will be added before any non-essential
            cookie is set for visitors in the EEA, UK, or Switzerland. That includes a
            Google-certified Consent Management Platform (CMP) or the AdSense-provided GDPR message,
            shown before any ad request or tracking script runs, with clear accept/reject controls.
          </p>
          <p className="mt-2">
            Until that consent solution is live, advertising and analytics scripts remain disabled
            in code regardless of region, not just hidden behind a banner.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">Tool data is separate from cookies</h2>
          <p className="mt-2">
            Many Sounez tools process your text or files without using any cookies at all. For
            example, the image compressor runs in your browser. AI-backed tools may send content to
            our servers for processing — that is described on each tool page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">How to clear local storage</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Clear site data for sounez.com in your browser settings at any time.</li>
            <li>Use private browsing if you do not want local storage to persist between sessions.</li>
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
