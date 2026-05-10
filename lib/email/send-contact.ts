import { Resend } from "resend";
import { getSiteUrl } from "@/lib/site-url";

export type ContactPayload = {
  name: string;
  email: string;
  topic: string;
  message: string;
  submittedAtIso: string;
  pageUrl: string;
};

const DEFAULT_FROM = "Sounez <onboarding@resend.dev>";

/** Send contact notification to all recipients via Resend (server-only). */
export async function sendContactEmail(to: string[], payload: ContactPayload): Promise<{ id: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const resend = new Resend(apiKey);
  const base = getSiteUrl();
  const from = DEFAULT_FROM;

  const text = [
    `New contact message from Sounez`,
    ``,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Topic: ${payload.topic}`,
    `Page URL: ${payload.pageUrl}`,
    `Submitted (UTC): ${payload.submittedAtIso}`,
    ``,
    `Message:`,
    payload.message,
    ``,
    `Site: ${base}`,
  ].join("\n");

  const html = `
    <p><strong>New contact message</strong></p>
    <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#e5e7eb;">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(payload.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(payload.email)}</td></tr>
      <tr><td><strong>Topic</strong></td><td>${escapeHtml(payload.topic)}</td></tr>
      <tr><td><strong>Page URL</strong></td><td>${escapeHtml(payload.pageUrl)}</td></tr>
      <tr><td><strong>Submitted (UTC)</strong></td><td>${escapeHtml(payload.submittedAtIso)}</td></tr>
    </table>
    <p><strong>Message</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(payload.message)}</pre>
    <p style="margin-top:24px;"><a href="${escapeHtml(base)}">${escapeHtml(base)}</a></p>
  `;

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: `[Sounez Contact] ${payload.topic} — ${payload.name}`,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message ?? "Resend rejected the send request.");
  }
  if (!data?.id) {
    throw new Error("Resend did not return a message id.");
  }
  return { id: data.id };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
