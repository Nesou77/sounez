/**
 * Centralised environment variable access.
 * - Server-only vars (GEMINI_API_KEY) are never exposed to the client.
 * - NEXT_PUBLIC_ vars are safe to read on both sides.
 * - Logs warnings in production when optional vars are missing.
 */

function warnMissing(name: string) {
  if (process.env.NODE_ENV === "production") {
    console.warn(`[sounez] Missing env var: ${name}`);
  }
}

export const env = {
  /** Canonical site URL. Used in sitemap, JSON-LD, etc. */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.APP_URL?.trim() ||
    "http://localhost:3000",

  /** Google AI Studio API key — server-side only. Never expose to client. */
  get geminiApiKey(): string | undefined {
    return process.env.GEMINI_API_KEY;
  },

  /** Gemini model name with safe fallback. */
  get geminiModel(): string {
    return process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash";
  },

  /** Google AdSense publisher ID (NEXT_PUBLIC — safe for client). */
  get adsensePubId(): string | undefined {
    const v = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
    if (!v) warnMissing("NEXT_PUBLIC_ADSENSE_PUB_ID");
    return v;
  },

  /**
   * Render backend URL (NEXT_PUBLIC — safe for client, no secrets).
   * Example: https://sounez-backend.onrender.com
   * Used by PdfToWordConverterClient to call /api/pdf-to-word.
   */
  get backendUrl(): string {
    return process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || "";
  },
} as const;
