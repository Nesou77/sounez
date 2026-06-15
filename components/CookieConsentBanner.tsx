"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_KEY,
  OPEN_COOKIE_SETTINGS_EVENT,
  dispatchConsentChanged,
  getStoredConsent,
  updateGoogleConsent,
  type ConsentChoice,
} from "@/lib/cookie-consent";

// Applied when the banner appears naturally on first load.
// animation-fill-mode:both keeps opacity:0 before the 2 s delay fires, so the
// banner element is in the DOM (no layout shift) but invisible to LCP measurement.
const DEFERRED_STYLE: React.CSSProperties = {
  animationName: "cookieBannerIn",
  animationDuration: "0.35s",
  animationDelay: "2s",
  animationTimingFunction: "ease",
  animationFillMode: "both",
};

export function CookieConsentBanner() {
  // "visible"   – show with CSS delay (natural first load)
  // "immediate" – show at once (user reopened settings)
  // "hidden"    – user already decided, or still checking storage
  // "pending"   – SSR / first client tick before effect runs
  const [state, setState] = useState<"pending" | "hidden" | "visible" | "immediate">("pending");

  useEffect(() => {
    const init = () => {
      try {
        let stored = getStoredConsent();
        if (!stored) {
          try {
            const legacy = localStorage.getItem("sounez_cookie_consent");
            if (legacy === "accepted" || legacy === "rejected") {
              localStorage.setItem(CONSENT_KEY, legacy);
              stored = legacy;
            }
          } catch {
            // ignore
          }
        }
        if (stored === "accepted") {
          updateGoogleConsent(true);
          setState("hidden");
          return;
        }
        if (stored === "rejected") {
          updateGoogleConsent(false);
          setState("hidden");
          return;
        }
        // No prior consent: add element to DOM immediately; CSS handles the
        // visual delay so the banner never competes with the page LCP element.
        setState("visible");
      } catch {
        setState("visible");
      }
    };

    init();

    // When the user explicitly reopens cookie settings (e.g. from the footer),
    // show the banner at once without any animation delay.
    const onOpenSettings = () => setState("immediate");
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);

    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
    };
  }, []);

  if (state === "pending" || state === "hidden") return null;

  const persist = (choice: ConsentChoice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // ignore
    }
    const granted = choice === "accepted";
    updateGoogleConsent(granted);
    dispatchConsentChanged(choice);
    setState("hidden");
  };

  const accept = () => persist("accepted");
  const reject = () => persist("rejected");

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      style={state === "visible" ? DEFERRED_STYLE : undefined}
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-border bg-card/95 px-4 py-4 shadow-pop backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-2xl sm:border"
    >
      <p className="text-sm leading-relaxed text-foreground">
        We use cookies for analytics and to show ads that help keep Sounez free. You can accept or
        reject non-essential cookies. See our{" "}
        <a
          href="/privacy-policy"
          className="font-medium text-primary-label underline underline-offset-2 hover:text-primary-label/80"
        >
          Privacy Policy
        </a>{" "}
        and how{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary-label underline underline-offset-2 hover:text-primary-label/80"
        >
          Google uses data on partner sites
        </a>
        .
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={accept}
          className="min-h-[2.75rem] flex-1 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95"
        >
          Accept cookies
        </button>
        <button
          type="button"
          onClick={reject}
          className="min-h-[2.75rem] flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-muted active:scale-95"
        >
          Reject non-essential
        </button>
      </div>
    </div>
  );
}
