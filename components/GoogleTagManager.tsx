"use client";

import { useEffect } from "react";
import {
  CONSENT_CHANGED_EVENT,
  hasAnalyticsConsent,
  type ConsentChoice,
} from "@/lib/cookie-consent";

const GTM_INTERACTION_EVENTS: string[] = [
  "scroll",
  "click",
  "touchstart",
  "keydown",
  "mousemove",
];

/** Loads GTM only after analytics consent, on first interaction or after 5 s. */
export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

  useEffect(() => {
    if (!gtmId) return;

    let loaded = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const PASSIVE: AddEventListenerOptions = { passive: true };

    function loadGTM() {
      if (loaded || !hasAnalyticsConsent()) return;
      loaded = true;
      GTM_INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, loadGTM));
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
      document.head.appendChild(s);
    }

    function attachListeners() {
      GTM_INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, loadGTM, PASSIVE));
      timeoutId = window.setTimeout(loadGTM, 5000);
    }

    function detachListeners() {
      GTM_INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, loadGTM));
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    }

    if (hasAnalyticsConsent()) {
      attachListeners();
    }

    const onConsent = (e: Event) => {
      const choice = (e as CustomEvent<{ choice: ConsentChoice }>).detail?.choice;
      if (choice === "accepted" && !loaded) {
        attachListeners();
      }
      if (choice === "rejected") {
        detachListeners();
      }
    };

    window.addEventListener(CONSENT_CHANGED_EVENT, onConsent);

    return () => {
      detachListeners();
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
