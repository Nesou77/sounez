/**
 * Centralized content-safety filtering for AI generation endpoints (caption, bio,
 * business name, study notes, website idea, Smart Packs). Comment moderation
 * (lib/content-moderation.ts) reuses the same hard-block pattern set below so
 * prohibited-content rules live in one place instead of three.
 *
 * This is a pattern-based pre-filter, not a full moderation model. It exists to
 * catch clearly disallowed requests and outputs before they reach a user or an
 * AdSense-served page — it will not catch every policy violation, and prompts
 * should still instruct the model not to produce unsafe content.
 */

export type SafetyCategory =
  | "csam"
  | "sexual_content"
  | "adult_services"
  | "self_harm"
  | "violence"
  | "hate_speech"
  | "slur"
  | "illegal_drug_trade"
  | "hacking"
  | "dangerous_instructions"
  | "fraud"
  | "doxxing"
  | "deceptive_claims"
  | "copyright_infringement"
  | "spam_scam"
  | "sexual_violence"
  | "academic_fraud";

export const GENERATION_BLOCKED_PATTERNS: [RegExp, SafetyCategory][] = [
  // CSAM — hard legal requirement, always checked first
  [/\b(child\s*porn|underage\s*sex|minor\s*sex|loli(?:con)?|pedo(?:phile|sexual)?)\b/i, "csam"],

  // Explicit sexual / adult content
  [/\b(porn(?:ographic|ography)?|explicit\s*sex(?:ual)?\s*(content|story|scene)|hardcore\s*sex)\b/i, "sexual_content"],
  [/\b(escort|call\s*girl|prostitut|sex\s*worker\s*(ad|listing)|onlyfans\s*link)\b/i, "adult_services"],

  // Self-harm
  [/\b(how\s*to\s*(commit\s*)?suicide|ways?\s*to\s*kill\s*myself|self[\s-]*harm\s*(method|guide|tips))\b/i, "self_harm"],

  // Violence / gore / weapons
  [/\b(bomb\s*making|how\s*to\s*make\s*(?:a\s*)?(bomb|explosive|weapon|gun|firearm))\b/i, "violence"],
  [/\b(mass\s*shoot(?:ing)?|terrorist\s*attack|graphic\s*gore|torture\s+(someone|a\s*person))\b/i, "violence"],
  [/\b(kill|murder)\s+(?:someone|a\s*person|my|him|her|them)\b/i, "violence"],

  // Hate / harassment
  [/\b(nazi|holocaust\s*denial|genocide\s*praise|white\s*supremac)\b/i, "hate_speech"],
  [/\b(nigger|nigga|faggot|retard(?:ed)?|chink|spic|kike)\b/i, "slur"],

  // Illegal drugs
  [/\b(buy|sell|order|get|synthesize|cook)\s+(cocaine|heroin|fentanyl|meth(?:amphetamine)?|mdma|crack)\b/i, "illegal_drug_trade"],

  // Hacking / malware / other dangerous instructions.
  // Deliberately requires an action + target phrase (not a bare "hack"/"exploit") so
  // benign idioms like "growth hack" or "life hack" are not caught.
  [/\b(write|create|build|make)\s+(a\s+|some\s+)?(malware|ransomware|keylogger|spyware|a\s*botnet|a\s*virus)\b/i, "hacking"],
  [/\bhow\s+to\s+hack\b|\bhack(?:ing)?\s+into\b|\bexploit\s+(a\s+)?vulnerabilit(y|ies)\s+(in|of)\b/i, "hacking"],
  [/\b(how\s*to\s*make\s*(?:a\s*)?(poison|nerve\s*agent|untraceable\s*weapon))\b/i, "dangerous_instructions"],

  // Fraud / document forgery / doxxing
  [/\b(fake\s*(id|passport|diploma|degree|certificate|social\s*security))\b/i, "fraud"],
  [/\b(doxx(?:ing)?|dox\b|personal\s*information\s*of\s*\w+)\b/i, "doxxing"],

  // Requests to reproduce long-form copyrighted text verbatim
  [/\b(full\s*(lyrics|script)\s*of|entire\s*(book|novel|chapter)\s*(of|from)|verbatim\s*copy\s*of)\b/i, "copyright_infringement"],

  // Deceptive claims / spam / scams — content that is itself ad-policy-unsafe
  [/\b(guaranteed\s*(cure|income|profit)|miracle\s*cure|risk[\s-]*free\s*investment)\b/i, "deceptive_claims"],
  [/\b(phishing\s*(email|message|page)|pyramid\s*scheme|ponzi\s*scheme)\b/i, "spam_scam"],

  // Sexual violence
  [/\b(rape|sexual\s*assault)\s+(tips|how\s*to|guide)\b/i, "sexual_violence"],

  // Academic dishonesty (relevant to study-notes / bio / caption tools used for coursework)
  [/\b(cheat\s+on\s+(?:an?\s+)?exam|exam\s*cheat|plagiariz|impersonat(?:e|ion))\b/i, "academic_fraud"],
];

const SAFE_REFUSAL_MESSAGE =
  "This request cannot be processed because it may violate content safety rules.";

export type SafetyCheckResult = { allowed: true } | { allowed: false; reason: string };

/**
 * Check arbitrary text (user input or model output) against the shared block list.
 * Intentionally binary (allowed/blocked) with a generic, non-bypassable error message —
 * callers should not surface which pattern or category matched.
 */
export function checkGenerationSafety(input: string): SafetyCheckResult {
  const sample = input.slice(0, 12000);
  for (const [pattern] of GENERATION_BLOCKED_PATTERNS) {
    if (pattern.test(sample)) {
      return { allowed: false, reason: SAFE_REFUSAL_MESSAGE };
    }
  }
  return { allowed: true };
}

/** Flatten an input/output object's string fields into one string for safety checks. */
export function collectSafetyText(value: Record<string, unknown>): string {
  return Object.values(value)
    .flatMap((v) => {
      if (typeof v === "string") return [v];
      if (Array.isArray(v)) return v.filter((item): item is string => typeof item === "string");
      return [];
    })
    .join("\n");
}
