/**
 * Centralised input validation helpers for AI API routes.
 * Returns { ok: true, value } or { ok: false, error: string }.
 */

type Ok<T> = { ok: true; value: T };
type Err = { ok: false; error: string };
type Result<T> = Ok<T> | Err;

function ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}
function err(error: string): Err {
  return { ok: false, error };
}

/** Trim and enforce max length on a required string field. */
export function validateText(
  raw: unknown,
  fieldName: string,
  maxLen: number,
): Result<string> {
  if (typeof raw !== "string" || !raw.trim()) {
    return err(`${fieldName} is required.`);
  }
  const trimmed = raw.trim();
  if (trimmed.length > maxLen) {
    return err(`${fieldName} must be ${maxLen} characters or fewer.`);
  }
  return ok(trimmed);
}

/** Trim and enforce max length on an optional string field. */
export function validateOptionalText(
  raw: unknown,
  maxLen: number,
): string {
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, maxLen);
}

/** Validate that a value is one of the allowed enum values. */
export function validateEnum<T extends string>(
  raw: unknown,
  allowed: readonly T[],
  fallback: T,
): T {
  if (typeof raw === "string" && (allowed as readonly string[]).includes(raw)) {
    return raw as T;
  }
  return fallback;
}

// ── Per-route schemas ────────────────────────────────────────────────────────

export type CaptionInput = {
  topic: string;
  platform: "instagram" | "tiktok" | "linkedin";
  tone: "funny" | "professional" | "inspirational";
};

export function validateCaptionInput(body: unknown): Result<CaptionInput> {
  const b = body as Record<string, unknown>;
  const topic = validateText(b?.topic, "Topic", 500);
  if (!topic.ok) return topic;
  return ok({
    topic: topic.value,
    platform: validateEnum(b?.platform, ["instagram", "tiktok", "linkedin"] as const, "instagram"),
    tone: validateEnum(b?.tone, ["funny", "professional", "inspirational"] as const, "professional"),
  });
}

export type BioInput = {
  name: string;
  role: string;
  interests: string;
  platform: "instagram" | "twitter" | "linkedin" | "general";
};

export function validateBioInput(body: unknown): Result<BioInput> {
  const b = body as Record<string, unknown>;
  const name = validateText(b?.name, "Name", 80);
  if (!name.ok) return name;
  const role = validateText(b?.role, "Role", 120);
  if (!role.ok) return role;
  return ok({
    name: name.value,
    role: role.value,
    interests: validateOptionalText(b?.interests, 250),
    platform: validateEnum(b?.platform, ["instagram", "twitter", "linkedin", "general"] as const, "general"),
  });
}

export type BusinessNameInput = {
  industry: string;
  keywords: string;
  style: "modern" | "playful" | "professional" | "abstract";
};

export function validateBusinessNameInput(body: unknown): Result<BusinessNameInput> {
  const b = body as Record<string, unknown>;
  const industry = validateText(b?.industry, "Industry", 120);
  if (!industry.ok) return industry;
  return ok({
    industry: industry.value,
    keywords: validateOptionalText(b?.keywords, 250),
    style: validateEnum(b?.style, ["modern", "playful", "professional", "abstract"] as const, "modern"),
  });
}

export type StudyNotesInput = {
  topic: string;
  level: "beginner" | "intermediate" | "advanced";
};

export function validateStudyNotesInput(body: unknown): Result<StudyNotesInput> {
  const b = body as Record<string, unknown>;
  const topic = validateText(b?.topic, "Topic", 5000);
  if (!topic.ok) return topic;
  return ok({
    topic: topic.value,
    level: validateEnum(b?.level, ["beginner", "intermediate", "advanced"] as const, "beginner"),
  });
}

export type WebsiteIdeaInput = {
  interests: string;
  type: "blog" | "saas" | "ecommerce" | "community" | "tool";
};

export function validateWebsiteIdeaInput(body: unknown): Result<WebsiteIdeaInput> {
  const b = body as Record<string, unknown>;
  const interests = validateText(b?.interests, "Interests", 500);
  if (!interests.ok) return interests;
  return ok({
    interests: interests.value,
    type: validateEnum(b?.type, ["blog", "saas", "ecommerce", "community", "tool"] as const, "blog"),
  });
}
