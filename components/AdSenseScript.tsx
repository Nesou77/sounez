"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { isAdEligiblePath } from "@/lib/route-policy";
import { CONSENT_CHANGE_EVENT, hasConsent, nonEssentialScriptsConfigured } from "@/lib/consent";
import { env } from "@/lib/env";

/**
 * Global AdSense Auto Ads snippet.
 *
 * Ads are opt-in via NEXT_PUBLIC_ADSENSE_ENABLED so the site stays ad-free (and
 * cookie-free) until the owner explicitly turns ads on after AdSense approval.
 * Low-value, admin, API, and legal/contact routes never load ad code — see
 * lib/route-policy.ts.
 *
 * Once ads ARE enabled, the script additionally waits for advertising consent
 * from CookieConsentBanner (see lib/consent.ts) before it ever mounts, so no ad
 * request is made before a visitor has chosen. If NEXT_PUBLIC_ADSENSE_ENABLED is
 * true but analytics/advertising aren't both configured (see
 * nonEssentialScriptsConfigured), consent is treated as not required — this only
 * matters once the owner actually flips the flag on.
 */
export function AdSenseScript() {
  const pathname = usePathname();
  const pubId = env.adsensePubId;
  const adsEnabled = env.adsenseEnabled;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (!adsEnabled) return;
    setConsented(hasConsent("advertising"));
    const onChange = () => setConsented(hasConsent("advertising"));
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, [adsEnabled]);

  if (!pubId || !adsEnabled) return null;
  if (!isAdEligiblePath(pathname)) return null;
  if (nonEssentialScriptsConfigured() && !consented) return null;
  // Belt-and-suspenders: never load live ads on preview/dev deployments even if
  // NEXT_PUBLIC_ADSENSE_ENABLED leaks into a non-production environment (mirrors GtmLoader.tsx).
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") return null;
  if (typeof window !== "undefined" && window.location.hostname !== "www.sounez.com") return null;

  return (
    <Script
      id="adsbygoogle-loader"
      strategy="afterInteractive"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
      crossOrigin="anonymous"
    />
  );
}
