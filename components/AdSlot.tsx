"use client";

/**
 * Legacy placeholder - Sounez uses AdSense Auto Ads only (see AdSenseScript).
 * Kept for optional dev layout markers; not mounted on live pages.
 */
export function AdSlot({
  className = "",
}: {
  label?: string;
  className?: string;
  slot?: string;
}) {
  if (process.env.NODE_ENV === "production" || !process.env.NEXT_PUBLIC_ADSENSE_PUB_ID?.trim()) {
    return null;
  }

  return (
    <div
      className={`flex min-h-[60px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-4 py-4 text-xs uppercase tracking-wider text-muted-foreground/50 ${className}`}
      aria-hidden="true"
    >
      auto ads
    </div>
  );
}
