"use client";

import { dispatchOpenCookieSettings } from "@/lib/cookie-consent";

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => dispatchOpenCookieSettings()}
      className={className}
    >
      Cookie settings
    </button>
  );
}
