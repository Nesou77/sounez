import { NextResponse } from "next/server";
import { z } from "zod";
import { parseRecipientEmails } from "@/lib/email/validate-email";
import { sendContactEmail } from "@/lib/email/send-contact";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

const BODY_SCHEMA = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  topic: z.enum(["Feedback", "Bug report", "Tool request", "Partnership", "Other"]),
  message: z.string().trim().min(10).max(2000),
  pageUrl: z.string().url().max(2000),
  captchaToken: z.string().optional(),
});

export async function POST(req: Request) {
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
        error: "Validation failed.",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const recipients = parseRecipientEmails(process.env.RECIPIENT_EMAIL);
  if (!recipients.ok) {
    const msg = recipients.empty
      ? "RECIPIENT_EMAIL is not configured."
      : `Invalid recipient emails: ${recipients.invalid.join(", ")}`;
    return NextResponse.json({ ok: false, error: msg }, { status: 503 });
  }

  const captchaRequired = !!process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (captchaRequired) {
    const captcha = await verifyRecaptchaToken(parsed.data.captchaToken);
    if (!captcha.ok) {
      return NextResponse.json(
        { ok: false, error: captcha.error ?? "Captcha verification failed." },
        { status: 400 },
      );
    }
  }

  try {
    const submittedAtIso = new Date().toISOString();
    const { id } = await sendContactEmail(recipients.emails, {
      ...parsed.data,
      submittedAtIso,
    });
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email.";
    const isConfig =
      message.includes("RESEND_API_KEY") ||
      message.includes("not configured");
    const status = isConfig ? 503 : 502;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
