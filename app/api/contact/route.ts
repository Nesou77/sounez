import { NextResponse } from "next/server";
import { z } from "zod";
import { parseRecipientEmails } from "@/lib/email/validate-email";
import { sendContactEmail } from "@/lib/email/send-contact";
import { verifyContactRecaptchaV3 } from "@/lib/recaptcha";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const CONTACT_RATE_LIMIT = { limit: 5, windowMs: 60 * 1000 }; // 5 submissions / min / IP

const BODY_SCHEMA = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  topic: z.enum(["Feedback", "Bug report", "Tool request", "Partnership", "Other"]),
  message: z.string().trim().min(10).max(2000),
  pageUrl: z.string().url().max(2000),
  captchaToken: z.string().optional(),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limited = checkRateLimit(`contact:${ip}`, CONTACT_RATE_LIMIT);
  if (!limited.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many messages sent. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = BODY_SCHEMA.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check your details and try again.",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const captchaRequired = !!process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (captchaRequired) {
    const captcha = await verifyContactRecaptchaV3(parsed.data.captchaToken);
    if (!captcha.ok) {
      return NextResponse.json(
        { ok: false, error: captcha.error ?? "Security check failed. Please try again." },
        { status: 400 },
      );
    }
  }

  const submittedAtIso = new Date().toISOString();

  // ── Try to send via Resend if configured ──────────────────────────────────
  const recipients = parseRecipientEmails(process.env.RECIPIENT_EMAIL);
  const emailConfigured = recipients.ok && !!process.env.RESEND_API_KEY?.trim();

  if (emailConfigured) {
    try {
      const { id } = await sendContactEmail(recipients.emails, {
        ...parsed.data,
        submittedAtIso,
      });
      return NextResponse.json({ ok: true, id });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send email.";
      console.error("[contact] Resend error:", message);
      // Fall through to log-only mode rather than returning an error to the user
    }
  }

  if (process.env.NODE_ENV === "production") {
    console.error("[contact] Email delivery is not configured in production.");
    return NextResponse.json(
      {
        ok: false,
        error:
          "Message delivery is temporarily unavailable. Please email hello@sounez.com directly.",
      },
      { status: 503 },
    );
  }

  console.log(
    "[contact] Submission logged locally (development only - email not configured):",
    JSON.stringify({
      name: parsed.data.name,
      email: parsed.data.email,
      topic: parsed.data.topic,
      message: parsed.data.message,
      pageUrl: parsed.data.pageUrl,
      submittedAtIso,
    }),
  );

  return NextResponse.json({
    ok: true,
    id: `log-${Date.now()}`,
    message: "Logged locally in development. Email was not sent.",
  });
}
