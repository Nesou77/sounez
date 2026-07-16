"use client";

import { nonEssentialScriptsConfigured, openConsentPreferences } from "@/lib/consent";

/** Reopens CookieConsentBanner. Renders nothing while the site has no
 * non-essential scripts configured — see lib/consent.ts. */
export function CookiePreferencesButton() {
  if (!nonEssentialScriptsConfigured()) return null;

  return (
    <button
      type="button"
      onClick={openConsentPreferences}
      className="underline underline-offset-2 hover:text-foreground"
    >
      Cookie preferences
    </button>
  );
}
