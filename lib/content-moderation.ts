/**
 * Automated content moderation for user-submitted text (comments, names).
 * Returns one of three actions:
 *   - "allow"  → pass to pending queue as normal
 *   - "flag"   → save as pending but mark for priority admin review
 *   - "reject" → block submission entirely (prohibited content)
 */

export type ModerationAction = "allow" | "flag" | "reject";

export type ModerationResult =
  | { action: "allow" }
  | { action: "flag"; flag: string }
  | { action: "reject"; flag: string };

// Hard blocks — content that violates AdSense policies and applicable law
const REJECT_PATTERNS: [RegExp, string][] = [
  [/\b(child\s*porn|underage\s*sex|minor\s*sex|loli(?:con)?|pedo(?:phile|sexual)?)\b/i, "csam"],
  [
    /\b(buy|sell|order|get)\s+(cocaine|heroin|fentanyl|meth(?:amphetamine)?|mdma|crack)\b/i,
    "illegal_drug_trade",
  ],
  [/\b(bomb\s*making|how\s*to\s*make\s*(?:a\s*)?bomb|mass\s*shoot(?:ing)?|terrorist\s*attack)\b/i, "violence"],
  [/\b(fake\s*(id|passport|diploma|degree|certificate|social\s*security))\b/i, "fraud"],
  [/\b(doxx(?:ing)?|dox\b|personal\s*information\s*of)\b/i, "doxxing"],
  [/\b(rape|sexual\s*assault)\s+(tips|how\s*to|guide)\b/i, "sexual_violence"],
];

// Soft flags — suspicious but not automatically rejected; sent to priority review queue
const FLAG_PATTERNS: [RegExp, string][] = [
  [
    /\b(fuck(?:ing)?|shit(?:ting)?|ass(?:hole)?|bitch(?:es)?|cunt|dick|pussy|cock|whore|slut)\b/i,
    "profanity",
  ],
  [/\b(nigger|nigga|faggot|retard|chink|spic|kike)\b/i, "hate_speech"],
  [
    /\b(casino|(?:online\s*)?gambling|bet(?:ting)?|poker|slots?)\b.*\b(free|win|earn|bonus|promo)\b/i,
    "gambling_spam",
  ],
  [
    /\b(make\s+\$?\d+\s*(?:per\s*)?(?:day|week|hour)|earn\s+(?:money|cash)\s+fast|work\s+from\s+home\s+and\s+earn)\b/i,
    "financial_spam",
  ],
  [/\b(penis\s*enlarg|erectile\s*dys|viagra|cialis|weight\s*loss\s*pill|diet\s*pill)\b/i, "health_spam"],
  [/\b(crypto|bitcoin|nft)\s+(giveaway|airdrop|free\s+money|double\s+your)\b/i, "crypto_spam"],
  [/\b(hack(?:ing)?|crack(?:ing)?|exploit(?:ing)?|bypass(?:ing)?)\b/i, "hacking"],
  [/\b(escort|call\s*girl|prostitut|sex\s*worker|only\s*fans\s*link)\b/i, "adult_services"],
];

/** Check a block of text and return a moderation decision. */
export function moderateContent(text: string): ModerationResult {
  const sample = text.slice(0, 5000).toLowerCase();

  for (const [pattern, flag] of REJECT_PATTERNS) {
    if (pattern.test(sample)) {
      return { action: "reject", flag };
    }
  }

  for (const [pattern, flag] of FLAG_PATTERNS) {
    if (pattern.test(sample)) {
      return { action: "flag", flag };
    }
  }

  return { action: "allow" };
}

/** Combine author name + body for joint moderation scan. */
export function buildModerationInput(authorName: string, body: string): string {
  return `${authorName}\n${body}`;
}
