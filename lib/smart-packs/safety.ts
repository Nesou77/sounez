const BLOCKED_PATTERNS = [
  /\b(hack|malware|ransomware|exploit|keylogger)\b/i,
  /\b(fake\s+(id|passport|document|degree|diploma))\b/i,
  /\b(cheat\s+on|exam\s+cheat|plagiarize|impersonat)/i,
  /\b(child\s+porn|cp\b|underage\s+sex)/i,
  /\b(kill|murder|bomb\s+making|terrorist\s+attack)\b/i,
  /\b(nazi|holocaust\s+denial|genocide\s+praise)\b/i,
];

const USAGE_RULES_MESSAGE =
  "This request cannot be generated because it may violate our usage rules. Please edit your brief and try again.";

export function checkSmartPackSafety(text: string): { safe: true } | { safe: false; message: string } {
  const combined = text.slice(0, 12000);
  for (const pattern of BLOCKED_PATTERNS) {
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
