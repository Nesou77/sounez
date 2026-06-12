const BLOCKED_PATTERNS: [RegExp, string][] = [
  // CSAM — hard legal requirement
  [/\b(child\s*porn|underage\s*sex|minor\s*sex|loli(?:con)?|pedo(?:phile|sexual)?)\b/i, "csam"],

  // Violence / terrorism
  [/\b(bomb\s*making|how\s*to\s*make\s*(?:a\s*)?bomb|mass\s*shoot(?:ing)?|terrorist\s*attack)\b/i, "violence"],
  [/\b(kill|murder)\s+(?:someone|a\s*person|my|him|her|them)\b/i, "violence"],

  // Illegal drug trade
  [
    /\b(buy|sell|order|get)\s+(cocaine|heroin|fentanyl|meth(?:amphetamine)?|mdma|crack)\b/i,
    "illegal_drug_trade",
  ],

  // Document fraud
  [/\b(fake\s*(id|passport|diploma|degree|certificate|social\s*security))\b/i, "fraud"],

  // Hacking / malware
  [/\b(hack|malware|ransomware|exploit|keylogger|spyware|botnet)\b/i, "hacking"],

  // Hate content
  [/\b(nazi|holocaust\s*denial|genocide\s*praise|white\s*supremac)\b/i, "hate_speech"],
  [/\b(nigger|faggot|chink|spic|kike)\b/i, "slur"],

  // Sexual violence
  [/\b(rape|sexual\s*assault)\s+(tips|how\s*to|guide)\b/i, "sexual_violence"],

  // Cheating / impersonation (academic integrity)
  [/\b(cheat\s+on|exam\s*cheat|plagiariz|impersonat)\b/i, "academic_fraud"],

  // Doxxing
  [/\b(doxx(?:ing)?|dox\b)\b/i, "doxxing"],
];

const USAGE_RULES_MESSAGE =
  "This request cannot be generated because it may violate our usage rules. Please edit your brief and try again.";

export function checkSmartPackSafety(text: string): { safe: true } | { safe: false; message: string } {
  const combined = text.slice(0, 12000);
  for (const [pattern] of BLOCKED_PATTERNS) {
    if (pattern.test(combined)) {
      return { safe: false, message: USAGE_RULES_MESSAGE };
    }
  }
  return { safe: true };
}

export function collectInputText(input: Record<string, unknown>): string {
  return Object.values(input)
    .filter((v) => typeof v === "string")
    .join("\n");
}
