"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * AdSense display unit with CLS-prevention.
 *
 * - Reserves min-height so the page doesn't jump when the ad loads.
 * - Falls back to a visible placeholder when pubId or slot is missing.
 * - Each placement should pass a distinct slot ID from lib/adsense.ts.
 */
export function AdSlot({
  label = "Advertisement",
  className = "",
  slot = "",
}: {
  label?: string;
  className?: string;
  /** AdSense ad unit slot ID. Use a distinct ID per placement. */
  slot?: string;
}) {
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

  useEffect(() => {
    if (!pubId || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // silently ignore push errors
    }
  }, [pubId, slot]);

  // Reserve space to prevent CLS whether or not the ad loads
  const reservedClass =
    "min-h-[90px] sm:min-h-[250px]";

  if (!pubId || !slot) {
    return (
      <div
        className={`${reservedClass} flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-xs uppercase tracking-wider text-muted-foreground ${className}`}
        aria-label="ad slot"
        aria-hidden="true"
      >
        {label}
      </div>
    );
  }

  return (
    <div className={`${reservedClass} ${className}`} aria-label={label}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={pubId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
