/** Shared cookie / Google Consent Mode helpers for Sounez. */

export const CONSENT_KEY = "sounez_cookie_consent_v1";
export const CONSENT_VERSION = 1;
export const OPEN_COOKIE_SETTINGS_EVENT = "sounez-open-cookie-settings";
export const CONSENT_CHANGED_EVENT = "sounez-consent-changed";

export type ConsentChoice = "accepted" | "rejected";

declare global {
  interface Window {
    dataLayer?: object[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === "accepted" || v === "rejected") return v;
  } catch {
    // private mode / blocked storage
  }
  return null;
}

export function updateGoogleConsent(granted: boolean): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
}

export function dispatchConsentChanged(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: { choice } }));
}

export function dispatchOpenCookieSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}

export function hasAdConsent(): boolean {
  return getStoredConsent() === "accepted";
}

export function hasAnalyticsConsent(): boolean {
  return getStoredConsent() === "accepted";
}
