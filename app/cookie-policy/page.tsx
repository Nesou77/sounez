import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { getSiteUrl } from "@/lib/site-url";
import { env } from "@/lib/env";

const pageUrl = `${getSiteUrl()}/cookie-policy`;

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Sounez currently handles cookies and local storage, and what changes when advertising or analytics are enabled.",
  alternates: { canonical: pageUrl },
};

const LAST_UPDATED = "July 4, 2026";

export default function CookiePolicyPage() {
  const analyticsActive = Boolean(env.gtmId);

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
        <section id="current-status" className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">
            {analyticsActive ? "Current status: analytics cookies, no advertising cookies" : "Current status: no non-essential cookies"}
          </h2>
          <p className="mt-2">
            {analyticsActive ? (
              <>
                Sounez uses Google Tag Manager for analytics. It only sets a cookie or collects
                usage data after you grant analytics consent through the cookie banner below; if
                you reject or have not yet chosen, it stays off. Google AdSense and any other
                advertising script remain disabled by default and only load if the site owner
                explicitly turns them on in the deployment configuration.
              </>
            ) : (
              <>
                Sounez does not currently set advertising or analytics cookies, and no cookie
                consent banner is shown, because there is nothing non-essential to consent to yet.
                Google AdSense, Google Analytics, Google Tag Manager, and any other tracking or
                advertising script are all disabled by default and only load if the site owner
                explicitly turns them on in the deployment configuration.
              </>
            )}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">The consent banner, when it applies</h2>
          <p className="mt-2">
            {analyticsActive ? (
              <>
                A cookie consent banner appears for first-time visitors now that analytics is
                configured, and would also cover advertising if that is enabled later. It lets you
                Accept all, Reject non-essential, or Customize analytics and advertising
                separately, and no advertising or analytics script runs until you choose. You can
                reopen it at any time using the &quot;Cookie preferences&quot; link in the footer.
              </>
            ) : (
              <>
                A cookie consent banner is already built into the site and will appear
                automatically the moment advertising or analytics is turned on in configuration —
                it does not require a separate deployment. When it appears, it lets you Accept
                all, Reject non-essential, or Customize analytics and advertising separately, and
                no advertising or analytics script runs until you choose. You can reopen it at any
                time afterward using the &quot;Cookie preferences&quot; link in the footer.
              </>
            )}
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
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground">
            {analyticsActive ? "Analytics today, and advertising if enabled later" : "If advertising or analytics are enabled later"}
          </h2>
          {analyticsActive ? (
            <>
              <p className="mt-2">
                Analytics already uses the cookie banner described above, for every region
                including the EEA, UK, and Switzerland: Google Tag Manager only loads after you
                grant analytics consent, and you can decline or withdraw at any time via
                &quot;Cookie preferences&quot; in the footer. This banner is a functional consent
                mechanism - separate accept/reject/customize controls, no pre-ticked boxes - but it
                is not a Google-certified Consent Management Platform (CMP).
              </p>
              <p className="mt-2">
                If Sounez enables Google AdSense in the future, this policy will be updated first,
                and a Google-certified CMP or the AdSense-provided GDPR message will be added
                before any ad request or ad-related tracking script runs for visitors in the EEA,
                UK, or Switzerland. Advertising remains disabled in code, regardless of region,
                until that happens.
              </p>
            </>
          ) : (
            <>
              <p className="mt-2">
                If Sounez enables Google AdSense or an analytics tool in the future, this policy
                will be updated first, and a proper consent solution will be added before any
                non-essential cookie is set for visitors in the EEA, UK, or Switzerland. That
                includes a Google-certified Consent Management Platform (CMP) or the
                AdSense-provided GDPR message, shown before any ad request or tracking script
                runs, with clear accept/reject controls.
              </p>
              <p className="mt-2">
                Until that consent solution is live, advertising and analytics scripts remain
                disabled in code regardless of region, not just hidden behind a banner.
              </p>
            </>
          )}
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
