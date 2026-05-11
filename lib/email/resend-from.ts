/**
 * Resend `from` header — set via `FROM_EMAIL` only (no hardcoded addresses).
 * Accepts a bare address (`noreply@example.com`) or a full RFC value (`Name <noreply@example.com>`).
 */
export function getResendFromAddress(): string {
  const raw = process.env.FROM_EMAIL?.trim();
  if (!raw) {
    throw new Error("FROM_EMAIL is not configured.");
  }
  return raw;
}
