"use client";

import { SmartLink as Link } from "@/components/smart-link";
import { nonEssentialScriptsConfigured, openConsentPreferences } from "@/lib/consent";

/**
 * Persistent "Cookie preferences" link in the footer.
 *
 * When a non-essential script (analytics/advertising) is actually configured,
 * clicking reopens the CookieConsentBanner so the choice can be changed — see
 * lib/consent.ts. Otherwise there is nothing to toggle yet, so it links to the
 * Cookie Policy's "current status" section instead of rendering a button that
 * would do nothing. Either way the link itself always stays visible: AdSense
 * review expects a persistent cookie-settings entry point in the footer.
 */
export function CookiePreferencesButton() {
  if (nonEssentialScriptsConfigured()) {
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

  return (
    <Link
      href="/cookie-policy#current-status"
      className="underline underline-offset-2 hover:text-foreground"
    >
      Cookie preferences
    </Link>
  );
}
