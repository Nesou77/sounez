"use client";

/**
 * AdSlot — Auto Ads mode.
 *
 * Google AdSense Auto Ads handles all placement automatically via the script
 * in app/layout.tsx. Manual display units are not used.
 *
 * In production this component renders nothing.
 * In development it shows a subtle placeholder so layout gaps are visible.
 */
export function AdSlot({
  className = "",
}: {
  label?: string;
  className?: string;
  slot?: string;
}) {
  if (process.env.NODE_ENV === "production") {
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
