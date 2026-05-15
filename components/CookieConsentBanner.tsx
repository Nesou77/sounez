"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "sounez_cookie_consent";

declare global {
  interface Window {
    dataLayer?: object[];
    gtag?: (...args: unknown[]) => void;
  }
}

function updateConsent(granted: boolean) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: granted ? "granted" : "denied",
        analytics_storage: granted ? "granted" : "denied",
        ad_user_data: granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied",
      });
    }
  } catch {
    // gtag may not be available in all environments
  }
}

export function CookieConsentBanner() {
  /**
   * Three-state machine:
   *   "pending"  — not yet checked localStorage (SSR + first client tick)
   *   "hidden"   — user already decided, or we're waiting for LCP to finish
   *   "visible"  — show the banner
   *
   * We never render any DOM until state === "visible" so the banner text
   * can never become the LCP element.
   */
  const [state, setState] = useState<"pending" | "hidden" | "visible">("pending");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === "accepted") {
        updateConsent(true);
        setState("hidden");
        return;
      }
      if (stored === "rejected") {
        setState("hidden");
        return;
      }
      // First visit: defer until well after LCP has been painted.
      // requestIdleCallback (with setTimeout fallback) ensures we don't
      // block the main thread during initial render.
      const show = () => {
        timer = setTimeout(() => setState("visible"), 1500);
      };
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(show, { timeout: 3000 });
      } else {
        show();
      }
    } catch {
      timer = setTimeout(() => setState("visible"), 1500);
    }
    return () => clearTimeout(timer);
  }, []);

  // Render nothing until we're sure the banner should be shown.
  // This prevents the banner text from ever being the LCP candidate.
  if (state !== "visible") return null;

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {
      // ignore
    }
    updateConsent(true);
    setState("hidden");
  };

  const reject = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "rejected");
    } catch {
      // ignore
    }
    updateConsent(false);
    setState("hidden");
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 px-4 py-4 shadow-pop backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm sm:rounded-2xl sm:border"
    >
      <p className="text-sm leading-relaxed text-foreground">
        We use cookies to improve your experience and show relevant ads.{" "}
        <a
          href="/privacy-policy"
          className="font-medium text-primary-label underline underline-offset-2 hover:text-primary-label/80"
        >
          Privacy Policy
        </a>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={accept}
          className="flex-1 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={reject}
          className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-muted active:scale-95"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
