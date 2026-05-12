"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "sounez_cookie_consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        setVisible(true);
      } else if (stored === "accepted") {
        updateConsent(true);
      }
    } catch {
      // localStorage may be unavailable
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {
      // ignore
    }
    updateConsent(true);
    setVisible(false);
  };

  const reject = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "rejected");
    } catch {
      // ignore
    }
    updateConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 px-4 py-4 shadow-pop backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm sm:rounded-2xl sm:border"
    >
      <p className="text-sm leading-relaxed text-foreground">
        We use cookies to improve your experience and show relevant ads.{" "}
        <a
          href="/privacy-policy"
          className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
        >
          Privacy Policy
        </a>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={accept}
          className="flex-1 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95"
        >
          Accept
        </button>
        <button
          onClick={reject}
          className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-muted active:scale-95"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
