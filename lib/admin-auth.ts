import { createHash, timingSafeEqual } from "crypto";

/**
 * Roles that can be attached to a verified admin request.
 * Currently there is one admin role; the enum exists so middleware can
 * gate individual endpoints on specific permissions in future.
 */
export type AdminRole = "moderator" | "admin";

export type AdminSession = {
  role: AdminRole;
};

/**
 * Verify the Bearer token in the Authorization header using a constant-time
 * comparison so the check is not vulnerable to timing attacks.
 *
 * Returns an AdminSession if the token is valid, or null otherwise.
 * Does NOT accept the token as a URL query parameter – doing so would
 * expose it in access logs, CDN caches, and browser history.
 */
export function verifyAdminRequest(req: Request): AdminSession | null {
  const expected = process.env.ADMIN_MODERATION_TOKEN?.trim();
  if (!expected) return null;

  const header = req.headers.get("authorization") ?? "";
  if (!header.startsWith("Bearer ")) return null;

  const provided = header.slice(7);
  if (!provided) return null;

  // Use a fixed-length hash of both values for the comparison so
  // inputs of different lengths cannot create early exits.
  const hashOf = (s: string) =>
    createHash("sha256").update(s, "utf8").digest();

  try {
    const match = timingSafeEqual(hashOf(provided), hashOf(expected));
    if (!match) return null;
  } catch {
    return null;
  }

  return { role: "admin" };
}

/** Convenience: returns true/false for routes that only need a boolean check. */
export function verifyAdminToken(req: Request): boolean {
  return verifyAdminRequest(req) !== null;
}

/** Require a specific role; returns false if the session role is insufficient. */
export function requireRole(req: Request, role: AdminRole): boolean {
  const session = verifyAdminRequest(req);
  if (!session) return false;
  if (role === "moderator") return true; // all admin roles can moderate
  return session.role === role;
}
