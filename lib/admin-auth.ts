export function verifyAdminToken(req: Request): boolean {
  const expected = process.env.ADMIN_MODERATION_TOKEN?.trim();
  if (!expected) return false;
  const header = req.headers.get("authorization");
  if (header?.startsWith("Bearer ")) {
    return header.slice(7) === expected;
  }
  const query = new URL(req.url).searchParams.get("token");
  return query === expected;
}
