"use client";

import { usePathname } from "next/navigation";
import { isAdEligiblePath } from "@/lib/route-policy";

/**
 * Global AdSense Auto Ads snippet.
 *
 * Ads are opt-in via NEXT_PUBLIC_ADSENSE_ENABLED so the site stays ad-free (and
 * cookie-free) until the owner explicitly turns ads on after AdSense approval.
 * Low-value, admin, API, and legal/contact routes never load ad code — see
 * lib/route-policy.ts.
 *
 * TODO(owner): before setting NEXT_PUBLIC_ADSENSE_ENABLED=true for EEA/UK/Switzerland
 * traffic, add a Google-certified Consent Management Platform (or the AdSense-provided
 * GDPR message) so consent is collected before this script runs. This component does
 * not implement that consent flow.
 */
export function AdSenseScript() {
  const pathname = usePathname();
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID?.trim();
  const adsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

  if (!pubId || !adsEnabled) return null;
  if (!isAdEligiblePath(pathname)) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
      crossOrigin="anonymous"
    />
  );
}
