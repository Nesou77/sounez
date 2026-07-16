"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { SmartLink as Link } from "@/components/smart-link";
import {
  CONSENT_CHANGE_EVENT,
  OPEN_CONSENT_PREFS_EVENT,
  getStoredConsent,
  nonEssentialScriptsConfigured,
  setStoredConsent,
  type ConsentState,
} from "@/lib/consent";

const DEFAULT_STATE: ConsentState = { analytics: false, advertising: false };

/**
 * Shows only when a non-essential script is actually configured to run
 * (see lib/consent.ts) — otherwise the site is genuinely cookie-free and a
 * banner would be misleading. Persists the choice in localStorage and lets
 * AdSenseScript / GtmLoader react to it via CONSENT_CHANGE_EVENT.
 */
export function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(DEFAULT_STATE);

  useEffect(() => {
    setMounted(true);
    if (!nonEssentialScriptsConfigured()) return;
    const stored = getStoredConsent();
    if (!stored) setOpen(true);

    const reopen = () => {
      const current = getStoredConsent();
      setDraft(current ?? DEFAULT_STATE);
      setCustomizing(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_PREFS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_PREFS_EVENT, reopen);
  }, []);

  if (!mounted || !open || !nonEssentialScriptsConfigured()) return null;

  const save = (state: ConsentState) => {
    setStoredConsent(state);
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: state }));
    setOpen(false);
    setCustomizing(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
      style={{ animation: "cookieBannerIn 0.4s ease-out both", animationDelay: "0.3s" }}
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-pop sm:p-6">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-soft text-primary">
            <Cookie className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Cookie preferences</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              We use essential storage to run the site. With your consent, we would also use
              analytics and advertising cookies (including Google AdSense) to support free tools.
              Read the{" "}
              <Link href="/cookie-policy" className="font-medium text-primary hover:underline">
                Cookie Policy
              </Link>{" "}
              or{" "}
              <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            {customizing && (
              <div className="mt-4 space-y-3 rounded-xl border border-border bg-muted/30 p-4">
                <label className="flex items-start gap-3 text-xs">
                  <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4 rounded border-border" />
                  <span>
                    <span className="font-semibold text-foreground">Essential</span> — always on.
                    Required for the site to function.
                  </span>
                </label>
                <label className="flex items-start gap-3 text-xs">
                  <input
                    type="checkbox"
                    checked={draft.analytics}
                    onChange={(e) => setDraft((d) => ({ ...d, analytics: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 rounded border-border"
                  />
                  <span>
                    <span className="font-semibold text-foreground">Analytics</span> — helps us
                    understand which pages and tools are useful.
                  </span>
                </label>
                <label className="flex items-start gap-3 text-xs">
                  <input
                    type="checkbox"
                    checked={draft.advertising}
                    onChange={(e) => setDraft((d) => ({ ...d, advertising: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 rounded border-border"
                  />
                  <span>
                    <span className="font-semibold text-foreground">Advertising</span> — lets Google
                    AdSense show and measure ads that help keep tools free.
                  </span>
                </label>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {customizing ? (
                <button
                  type="button"
                  onClick={() => save(draft)}
                  className="rounded-xl bg-gradient-brand px-4 py-2 text-xs font-semibold text-primary-foreground shadow-pop transition active:scale-95"
                >
                  Save preferences
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => save({ analytics: true, advertising: true })}
                    className="rounded-xl bg-gradient-brand px-4 py-2 text-xs font-semibold text-primary-foreground shadow-pop transition active:scale-95"
                  >
                    Accept all
                  </button>
                  <button
                    type="button"
                    onClick={() => save({ analytics: false, advertising: false })}
                    className="rounded-xl border border-border bg-background px-4 py-2 text-xs font-semibold transition hover:bg-muted active:scale-95"
                  >
                    Reject non-essential
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDraft(getStoredConsent() ?? DEFAULT_STATE);
                      setCustomizing(true);
                    }}
                    className="rounded-xl px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:text-foreground active:scale-95"
                  >
                    Customize
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
