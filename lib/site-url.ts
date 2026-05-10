/**
 * Canonical site URL from APP_URL. Falls back to localhost in development
 * when unset so metadata and robots remain valid.
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
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  }
  return "http://localhost:3000";
}
