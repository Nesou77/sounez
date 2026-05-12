"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSlot({
  label = "Advertisement",
  className = "",
  slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID ?? "",
}: {
  label?: string;
  className?: string;
  slot?: string;
}) {
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // silently ignore push errors
    }
  }, []);

  if (!pubId || !slot) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-xs uppercase tracking-wider text-muted-foreground ${className}`}
        aria-label="ad slot"
      >
        {label}
      </div>
    );
  }

  return (
    <div className={className} aria-label={label}>
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
