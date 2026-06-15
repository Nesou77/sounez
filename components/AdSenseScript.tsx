"use client";

import { usePathname } from "next/navigation";
import { isAdEligiblePath } from "@/lib/route-policy";

/**
 * Global AdSense Auto Ads snippet.
 * Google Consent Mode defaults to denied in layout.tsx before this script loads.
 * Private, legal, admin, API, and user-specific pages do not load ad code.
 */
export function AdSenseScript() {
  const pathname = usePathname();
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID?.trim();

  if (!pubId) return null;
  if (!isAdEligiblePath(pathname)) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
      crossOrigin="anonymous"
    />
  );
}
