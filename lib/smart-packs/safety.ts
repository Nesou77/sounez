import { checkGenerationSafety } from "@/lib/ai-safety";

const USAGE_RULES_MESSAGE =
  "This request cannot be generated because it may violate our usage rules. Please edit your brief and try again.";

export function checkSmartPackSafety(text: string): { safe: true } | { safe: false; message: string } {
  const result = checkGenerationSafety(text);
  if (!result.allowed) {
    return { safe: false, message: USAGE_RULES_MESSAGE };
  }
  return { safe: true };
}

export function collectInputText(input: Record<string, unknown>): string {
  return Object.values(input)
    .filter((v) => typeof v === "string")
    .join("\n");
}
