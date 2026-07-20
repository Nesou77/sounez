/**
 * Cookie consent state — read/write helpers shared by CookieConsentBanner and the
 * script loaders it gates (AdSenseScript, GtmLoader).
 *
 * Storage is a single localStorage entry, not a cookie: the site is otherwise fully
 * static/prerendered, and reading a cookie in the root layout (a Server Component)
 * would force the whole app into dynamic rendering. localStorage keeps consent
 * client-side only, which is sufficient here because the scripts it gates are
 * themselves client-rendered (see AdSenseScript.tsx, GtmLoader.tsx).
 */

import { env } from "@/lib/env";

const STORAGE_KEY = "sounez_consent_v1";
export const CONSENT_CHANGE_EVENT = "sounez:consent-change";
export const OPEN_CONSENT_PREFS_EVENT = "sounez:open-cookie-prefs";

export type ConsentCategory = "analytics" | "advertising";

export type ConsentState = {
  analytics: boolean;
  advertising: boolean;
};

type StoredConsent = ConsentState & { decidedAt: string };

/** True only when a non-essential script is actually configured to run — i.e.
 * there is something for a visitor to consent to. Mirrors the gates already used
 * by AdSenseScript.tsx and the GTM loader so the banner never appears while the
 * site is genuinely cookie-free. */
export function nonEssentialScriptsConfigured(): boolean {
  return env.adsenseEnabled || Boolean(env.gtmId);
}

export function getStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.advertising !== "boolean") return null;
    return { analytics: parsed.analytics, advertising: parsed.advertising, decidedAt: parsed.decidedAt ?? "" };
  } catch {
    return null;
  }
}

export function setStoredConsent(state: ConsentState): void {
  if (typeof window === "undefined") return;
  const record: StoredConsent = { ...state, decidedAt: new Date().toISOString() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: state }));
}

export function hasConsent(category: ConsentCategory): boolean {
  return getStoredConsent()?.[category] === true;
}

/** Ask the banner to reopen (used by the "Cookie preferences" footer link). */
export function openConsentPreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_CONSENT_PREFS_EVENT));
}
