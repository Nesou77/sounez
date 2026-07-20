"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_CHANGE_EVENT, hasConsent, nonEssentialScriptsConfigured } from "@/lib/consent";
import { env } from "@/lib/env";

const gtmId = env.gtmId;

/**
 * Injects the GTM container script only after analytics consent is granted
 * (or immediately if no non-essential scripts are configured at all — see
 * lib/consent.ts — in which case this renders nothing either way, since
 * gtmId itself gates that state). Replaces the previously unconditional
 * inline <Script> in layout.tsx so GTM respects CookieConsentBanner.
 */
export function GtmLoader() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!gtmId) return;
    setAllowed(hasConsent("analytics"));
    const onChange = () => setAllowed(hasConsent("analytics"));
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  if (!gtmId || !allowed) return null;
  // Belt-and-suspenders: skip on non-production hostnames even if envs leak into a preview deploy.
  if (typeof window !== "undefined" && window.location.hostname !== "www.sounez.com") return null;

  return (
    <Script id="google-gtm-head" strategy="afterInteractive">
      {`(function(){(window.dataLayer=window.dataLayer||[]).push({'gtm.start':new Date().getTime(),event:'gtm.js'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${gtmId}';document.head.appendChild(s);})();`}
    </Script>
  );
}

/** True only if this visitor has already granted analytics consent — used to
 * gate the <noscript> GTM fallback too (see GoogleTagManager.tsx). */
export function analyticsConsentConfigured(): boolean {
  return Boolean(gtmId) && nonEssentialScriptsConfigured();
}
