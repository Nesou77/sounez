/**
 * Canonical site URL from APP_URL. Falls back to localhost in development
 * when unset so metadata and robots remain valid.
 * APP_URL must be set to the custom domain in production (e.g. https://www.sounez.com).
 * VERCEL_URL is intentionally NOT used as a fallback: it resolves to the
 * deployment-specific URL, not the custom domain, which would produce wrong
 * canonical tags and cause GSC redirect errors.
 */
export function getSiteUrl(): string {
  const raw = process.env.APP_URL?.trim();
  if (raw) {
    try {
      return new URL(raw).origin;
    } catch {
      // fall through to dev default
    }
  }
  return "http://localhost:3000";
}
