import { RECAPTCHA_CONTACT_ACTION } from "@/lib/recaptcha-constants";

type SiteverifyV3Response = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  score?: number;
  "error-codes"?: string[];
};

function minScoreThreshold(): number {
  const raw = process.env.RECAPTCHA_MIN_SCORE?.trim();
  const n = raw ? Number.parseFloat(raw) : NaN;
  return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0.5;
}

/** No tokens or PII — safe for prod logs */
function debugLog(details: Record<string, unknown>) {
  const payload = JSON.stringify(details);
  if (process.env.NODE_ENV !== "production") {
    console.warn("[recaptcha v3]", payload);
    return;
  }
  console.warn("[recaptcha v3] verification failed:", payload);
}

/**
 * Validates a reCAPTCHA v3 token (contact form action + score threshold).
 */
export async function verifyContactRecaptchaV3(token: string | undefined): Promise<{
  ok: boolean;
  error?: string;
}> {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret) return { ok: true };

  if (!token || typeof token !== "string" || token.trim() === "") {
    debugLog({ reason: "missing_token" });
    return { ok: false, error: "Spam check failed. Please reload the page and try again." };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token.trim(),
    });

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!res.ok) {
      debugLog({ reason: "siteverify_http", status: res.status });
      return { ok: false, error: "Spam check could not be completed. Try again shortly." };
    }

    const data = (await res.json()) as SiteverifyV3Response;

    if (!data.success) {
      debugLog({
        reason: "google_unsuccessful",
        codes: data["error-codes"] ?? [],
      });
      return {
        ok: false,
        error: "Spam check failed. Please reload the page and try again.",
      };
    }

    const expectedAction = RECAPTCHA_CONTACT_ACTION;
    if ((data.action ?? "").trim() !== expectedAction) {
      debugLog({
        reason: "action_mismatch",
        expected: expectedAction,
        received: data.action ?? null,
      });
      return {
        ok: false,
        error: "Spam check mismatch. Please reload and try again.",
      };
    }

    const score = typeof data.score === "number" ? data.score : 0;
    const threshold = minScoreThreshold();

    if (score < threshold) {
      debugLog({
        reason: "low_score",
        score,
        threshold,
      });
      return {
        ok: false,
        error:
          "We couldn’t verify this submission. Try again or contact us directly using the email on this page.",
      };
    }

    return { ok: true };
  } catch (e) {
    debugLog({
      reason: "exception",
      message: e instanceof Error ? e.message : String(e),
    });
    return { ok: false, error: "Spam check error. Try again in a moment." };
  }
}
