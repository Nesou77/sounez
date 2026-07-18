"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { isAdEligiblePath } from "@/lib/route-policy";
import { CONSENT_CHANGE_EVENT, hasConsent, nonEssentialScriptsConfigured } from "@/lib/consent";
import { env } from "@/lib/env";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  /**
   * AdSense ad unit ID (the `data-ad-slot` value from the AdSense dashboard),
   * read from an env var by the call site — e.g.
   * `process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INARTICLE`. There is no
   * fallback/placeholder slot ID: an unset env var means this renders
   * nothing, since a fabricated slot ID would just fail to serve.
   */
  slot: string | undefined;
  /** Short internal label for this placement, shown to developers only via aria-label. */
  name: string;
  /** Reserved height before the ad loads, to prevent layout shift. Defaults to a common in-article unit size. */
  minHeightPx?: number;
  className?: string;
};

/**
 * Reusable, safe ad placement. Renders nothing unless: ads are enabled
 * (NEXT_PUBLIC_ADSENSE_ENABLED), a slot ID is configured for this call site,
 * the current route is ad-eligible (lib/route-policy.ts — never on
 * empty/legal/admin/api pages), and — once non-essential scripts are
 * configured — advertising consent has been granted (lib/consent.ts).
 *
 * Visually: always labeled "Advertisement", boxed and spaced apart from
 * surrounding content so it cannot be mistaken for navigation, a download
 * button, or a site control, and never wraps interactive site UI.
 */
export function AdSlot({ slot, name, minHeightPx = 280, className = "" }: AdSlotProps) {
  const pathname = usePathname();
  const pubId = env.adsensePubId;
  const adsEnabled = env.adsenseEnabled;
  const uid = useId();
  const [consented, setConsented] = useState(false);
  const [pushed, setPushed] = useState(false);

  useEffect(() => {
    if (!adsEnabled) return;
    setConsented(hasConsent("advertising"));
    const onChange = () => setConsented(hasConsent("advertising"));
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, [adsEnabled]);

  // Belt-and-suspenders: never load a live ad on a Vercel preview/dev deployment even if
  // NEXT_PUBLIC_ADSENSE_ENABLED leaks into a non-production environment.
  const isProductionEnv = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

  const eligible =
    !!pubId &&
    !!slot &&
    adsEnabled &&
    isAdEligiblePath(pathname) &&
    isProductionEnv &&
    (!nonEssentialScriptsConfigured() || consented);

  useEffect(() => {
    if (!eligible || pushed) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setPushed(true);
    } catch {
      // adsbygoogle.js not loaded yet or blocked — fail silently, no ad renders.
    }
  }, [eligible, pushed]);

  if (!eligible) return null;

  return (
    <div
      className={`my-8 flex flex-col items-center gap-1.5 border-y border-border/60 py-4 ${className}`}
      aria-label={`Advertisement (${name})`}
    >
      <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        Advertisement
      </span>
      <ins
        key={uid}
        className="adsbygoogle block w-full"
        style={{ display: "block", minHeight: minHeightPx }}
        data-ad-client={pubId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
