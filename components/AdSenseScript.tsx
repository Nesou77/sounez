"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  hasAdConsent,
  type ConsentChoice,
} from "@/lib/cookie-consent";

/**
 * Loads the AdSense Auto Ads script only after the visitor grants ad consent.
 * Consent Mode defaults to denied in layout.tsx until the user accepts cookies.
 */
export function AdSenseScript() {
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID?.trim();
  const [loadAds, setLoadAds] = useState(false);

  useEffect(() => {
    if (!pubId) return;

    const sync = () => setLoadAds(hasAdConsent());
    sync();

    const onConsent = (e: Event) => {
      const choice = (e as CustomEvent<{ choice: ConsentChoice }>).detail?.choice;
      if (choice === "accepted") setLoadAds(true);
      if (choice === "rejected") setLoadAds(false);
    };

    window.addEventListener(CONSENT_CHANGED_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onConsent);
  }, [pubId]);

  if (!pubId || !loadAds) return null;

  return (
    <Script
      id="adsense-auto-ads"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
