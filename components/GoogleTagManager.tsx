"use client";

import { useEffect } from "react";
import {
  CONSENT_CHANGED_EVENT,
  hasAnalyticsConsent,
  type ConsentChoice,
} from "@/lib/cookie-consent";

/** Loads GTM only after analytics consent, using idle callback or timeout only.
 *  No interaction-based triggers (click, keydown, touchstart, mousemove) to
 *  avoid scroll/focus jumps caused by script injection during user interaction.
 */
export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

  useEffect(() => {
    if (!gtmId) return;

    let loaded = false;
    let timeoutId: number | undefined;

    function loadGTM() {
      if (loaded || !hasAnalyticsConsent()) return;
      loaded = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId as string)}`;
      document.head.appendChild(s);
    }

    function scheduleLoad() {
      if (loaded) return;
      // Prefer requestIdleCallback so GTM loads during browser idle time,
      // never during an active user interaction (typing, clicking, scrolling).
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => loadGTM(), { timeout: 4000 });
      } else {
        timeoutId = window.setTimeout(loadGTM, 3500);
      }
    }

    function cancelLoad() {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    }

    if (hasAnalyticsConsent()) {
      scheduleLoad();
    }

    const onConsent = (e: Event) => {
      const choice = (e as CustomEvent<{ choice: ConsentChoice }>).detail?.choice;
      if (choice === "accepted" && !loaded) {
        scheduleLoad();
      }
      if (choice === "rejected") {
        cancelLoad();
      }
    };

    window.addEventListener(CONSENT_CHANGED_EVENT, onConsent);

    return () => {
      cancelLoad();
      window.removeEventListener(CONSENT_CHANGED_EVENT, onConsent);
    };
  }, [gtmId]);

  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
