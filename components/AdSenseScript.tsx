"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_CHANGED_EVENT, hasAdConsent } from "@/lib/cookie-consent";
import { isAdEligiblePath } from "@/lib/route-policy";

/**
 * Global AdSense Auto Ads snippet.
 * Google Consent Mode defaults to denied in layout.tsx before this script loads.
 * Private, legal, admin, API, and user-specific pages do not load ad code.
 * AdSense script loading is delayed until the user grants ad consent.
 */
export function AdSenseScript() {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID?.trim();

  useEffect(() => {
    setHasConsent(hasAdConsent());

    const onConsentChanged = () => setHasConsent(hasAdConsent());
    window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChanged);

    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChanged);
    };
  }, []);

  if (!pubId) return null;
  if (!isAdEligiblePath(pathname)) return null;
  if (!hasConsent) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
      crossOrigin="anonymous"
    />
  );
}
