/** Practical single-address validation aligned with RFC 5322-lite patterns. */
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(address: string): boolean {
  const s = address.trim();
  if (s.length === 0 || s.length > 254) return false;
  return EMAIL_RE.test(s);
}

export type ParsedRecipients =
  | { ok: true; emails: string[] }
  | { ok: false; invalid: string[]; empty: boolean };

/** Parses comma-separated recipient list, trims, dedupes, validates each address. */
export function parseRecipientEmails(raw: string | undefined): ParsedRecipients {
  if (raw === undefined || raw.trim() === "") {
    return { ok: false, invalid: [], empty: true };
  }
  const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);
  const seen = new Set<string>();
  const emails: string[] = [];
  const invalid: string[] = [];
  for (const part of parts) {
    const lower = part.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);
    if (!isValidEmail(part)) invalid.push(part);
    else emails.push(part);
  }
  if (invalid.length > 0) return { ok: false, invalid, empty: false };
  if (emails.length === 0) return { ok: false, invalid: [], empty: true };
  return { ok: true, emails };
}
