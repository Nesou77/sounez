import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getStoredConsent,
  hasConsent,
  nonEssentialScriptsConfigured,
  openConsentPreferences,
  setStoredConsent,
  CONSENT_CHANGE_EVENT,
  OPEN_CONSENT_PREFS_EVENT,
} from "./consent";

describe("lib/consent", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.unstubAllEnvs();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("nonEssentialScriptsConfigured", () => {
    it("is false when neither ads nor GTM are configured", () => {
      vi.stubEnv("NEXT_PUBLIC_ADSENSE_ENABLED", "false");
      vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
      expect(nonEssentialScriptsConfigured()).toBe(false);
    });

    it("is true when ads are enabled", () => {
      vi.stubEnv("NEXT_PUBLIC_ADSENSE_ENABLED", "true");
      vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
      expect(nonEssentialScriptsConfigured()).toBe(true);
    });

    it("is true when a GTM ID is configured", () => {
      vi.stubEnv("NEXT_PUBLIC_ADSENSE_ENABLED", "false");
      vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-XXXX");
      expect(nonEssentialScriptsConfigured()).toBe(true);
    });
  });

  describe("stored consent round-trip", () => {
    it("returns null before any decision is stored", () => {
      expect(getStoredConsent()).toBeNull();
      expect(hasConsent("analytics")).toBe(false);
      expect(hasConsent("advertising")).toBe(false);
    });

    it("persists and reads back an accepted decision", () => {
      setStoredConsent({ analytics: true, advertising: false });
      const stored = getStoredConsent();
      expect(stored?.analytics).toBe(true);
      expect(stored?.advertising).toBe(false);
      expect(hasConsent("analytics")).toBe(true);
      expect(hasConsent("advertising")).toBe(false);
    });

    it("dispatches a CONSENT_CHANGE_EVENT when consent is set", () => {
      const handler = vi.fn();
      window.addEventListener(CONSENT_CHANGE_EVENT, handler);
      setStoredConsent({ analytics: true, advertising: true });
      expect(handler).toHaveBeenCalledTimes(1);
      window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
    });

    it("ignores malformed localStorage content instead of throwing", () => {
      window.localStorage.setItem("sounez_consent_v1", "{not json");
      expect(getStoredConsent()).toBeNull();
    });
  });

  describe("openConsentPreferences", () => {
    it("dispatches OPEN_CONSENT_PREFS_EVENT", () => {
      const handler = vi.fn();
      window.addEventListener(OPEN_CONSENT_PREFS_EVENT, handler);
      openConsentPreferences();
      expect(handler).toHaveBeenCalledTimes(1);
      window.removeEventListener(OPEN_CONSENT_PREFS_EVENT, handler);
    });
  });
});
