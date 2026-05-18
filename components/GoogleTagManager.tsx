"use client";
import { useEffect } from "react";

/** Loads GTM on first user interaction (or after 5 s), not at page load. */
export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

  useEffect(() => {
    if (!gtmId) return;
    const id = gtmId; // preserve narrowing inside nested closure
    let loaded = false;
    function loadGTM() {
      if (loaded) return;
      loaded = true;
      EVENTS.forEach((e) => window.removeEventListener(e, loadGTM));
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
      document.head.appendChild(s);
    }
    // typed as string[] so addEventListener uses the generic overload (accepts listeners with no params)
    const EVENTS: string[] = ["scroll", "click", "touchstart", "keydown", "mousemove"];
    const PASSIVE: AddEventListenerOptions = { passive: true };
    EVENTS.forEach((e) => window.addEventListener(e, loadGTM, PASSIVE));
    const t = window.setTimeout(loadGTM, 5000);
    return () => { EVENTS.forEach((e) => window.removeEventListener(e, loadGTM)); window.clearTimeout(t); };
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