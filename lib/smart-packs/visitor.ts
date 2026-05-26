import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";
import { visitorHashFromRequest } from "@/lib/visitor-hash";

export const SMART_PACK_VISITOR_COOKIE = "sounez_sp_visitor";

export function visitorHashFromRequestOrCookie(req: Request): string {
  const header = req.headers.get("cookie");
  const match = header?.match(new RegExp(`${SMART_PACK_VISITOR_COOKIE}=([^;]+)`));
  if (match?.[1]) return match[1].slice(0, 32);
  return visitorHashFromRequest(req);
}

export function newVisitorId(): string {
  return createHash("sha256").update(randomBytes(16)).digest("hex").slice(0, 32);
}

export async function getVisitorHashFromCookies(): Promise<string | null> {
  const store = await cookies();
  return store.get(SMART_PACK_VISITOR_COOKIE)?.value ?? null;
}
