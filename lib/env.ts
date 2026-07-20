/**
 * Centralised environment variable access.
 * - Server-only vars (GEMINI_API_KEY) are never exposed to the client.
 * - NEXT_PUBLIC_ vars are safe to read on both sides.
 */

export const env = {
  /** Canonical site URL. Used in sitemap, JSON-LD, etc. */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.APP_URL?.trim() ||
    "http://localhost:3000",

  /** Google AI Studio API key - server-side only. Never expose to client. */
  get geminiApiKey(): string | undefined {
    return process.env.GEMINI_API_KEY;
  },

  /** Gemini model name with safe fallback. */
  get geminiModel(): string {
    return process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash";
  },

  /** Anthropic API key - server-side only. Never expose to client. */
  get anthropicApiKey(): string | undefined {
    return process.env.ANTHROPIC_API_KEY;
  },

  /** Anthropic model name with safe fallback. */
  get anthropicModel(): string {
    return process.env.ANTHROPIC_MODEL?.trim() || "claude-haiku-4-5";
  },

  /**
   * Google AdSense publisher ID (NEXT_PUBLIC - safe for client). Single source of
   * truth, read by AdSenseScript.tsx, AdSlot.tsx, and app/ads.txt/route.ts.
   * Intentionally does NOT warn when unset: being unset is the expected, correct
   * state until the site owner has a real ca-pub-... ID after AdSense approval.
   */
  get adsensePubId(): string | undefined {
    return process.env.NEXT_PUBLIC_ADSENSE_PUB_ID?.trim() || undefined;
  },

  /** Whether AdSense ad scripts are allowed to load at all (still gated by consent). */
  get adsenseEnabled(): boolean {
    return process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
  },

  /**
   * Google Tag Manager container ID (NEXT_PUBLIC - safe for client). Single source of
   * truth, read by GtmLoader.tsx, GoogleTagManager.tsx, lib/consent.ts, and the
   * Privacy/Cookie Policy pages so their "is analytics currently active" language
   * can never drift from what's actually configured in this deployment.
   */
  get gtmId(): string | undefined {
    return process.env.NEXT_PUBLIC_GTM_ID?.trim() || undefined;
  },
} as const;
