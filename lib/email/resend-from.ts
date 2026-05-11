/**
 * Resend `from` header.
 * Set `FROM_EMAIL` to override (bare address or `Name <address>`).
 * If unset, defaults to the production Sounez noreply address so contact mail works
 * when env files are not yet synced (e.g. local dev, new deploys).
 */
const DEFAULT_FROM_EMAIL = "noreply@sounez.com";

export function getResendFromAddress(): string {
  const raw = process.env.FROM_EMAIL?.trim();
  return raw || DEFAULT_FROM_EMAIL;
}
