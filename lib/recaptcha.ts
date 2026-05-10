type SiteverifySuccess = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export async function verifyRecaptchaToken(token: string | undefined): Promise<{
  ok: boolean;
  error?: string;
}> {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: true };
  }
  if (!token || typeof token !== "string" || token.trim() === "") {
    return { ok: false, error: "Missing captcha token." };
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
      return { ok: false, error: "Captcha verification request failed." };
    }
    const data = (await res.json()) as SiteverifySuccess;
    if (!data.success) {
      const codes = data["error-codes"]?.join(", ") ?? "unknown";
      return { ok: false, error: `Captcha verification failed (${codes}).` };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Captcha verification error." };
  }
}
