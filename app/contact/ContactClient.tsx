"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Send, MessageCircle, CheckCircle2, Loader2 } from "lucide-react";
import { executeContactRecaptchaV3 } from "@/lib/recaptcha-v3-browser";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";

const TOPICS = ["Feedback", "Bug report", "Tool request", "Partnership", "Other"] as const;
type Topic = (typeof TOPICS)[number];

type FormState = { name: string; email: string; topic: Topic; message: string };
type Errors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  else if (f.name.trim().length > 100) e.name = "Name must be under 100 characters.";
  if (!f.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "That email doesn't look right.";
  else if (f.email.trim().length > 255) e.email = "Email is too long.";
  if (!f.message.trim()) e.message = "Please write a short message.";
  else if (f.message.trim().length < 10) e.message = "Message is a bit short — add a few more details.";
  else if (f.message.trim().length > 2000) e.message = "Message must be under 2000 characters.";
  return e;
}

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
    hasError
      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
      : "border-border focus:border-primary focus:ring-primary/20"
  }`;
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

export function ContactClient() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", topic: "Feedback", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    let captchaToken: string | undefined;
    if (RECAPTCHA_SITE_KEY) {
      try {
        captchaToken = await executeContactRecaptchaV3(RECAPTCHA_SITE_KEY);
      } catch {
        toast.error("Security check unavailable", {
          description: "Please wait a moment, refresh the page, and try again.",
        });
        return;
      }
    }

    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    let parsedPageUrl: string;
    try {
      parsedPageUrl = pageUrl === "" ? "http://localhost:3000/contact" : new URL(pageUrl).toString();
    } catch {
      toast.error("Could not determine the page URL. Please reload and try again.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          topic: form.topic,
          message: form.message.trim(),
          pageUrl: parsedPageUrl,
          captchaToken,
        }),
      });

      let data: { ok?: boolean; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        // non-JSON error body
      }

      if (!res.ok || !data.ok) {
        const msg = typeof data.error === "string" ? data.error : "Something went wrong. Please try again.";
        toast.error("Could not send message", { description: msg });
        return;
      }

      setSent(true);
      toast.success("Message sent", { description: "We'll reply within 24 hours." });
      setForm({ name: "", email: "", topic: "Feedback", message: "" });
    } catch {
      toast.error("Network error", { description: "Check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const msgLeft = 2000 - form.message.length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in touch</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Feedback, bugs, tool requests or partnership ideas — we read every message.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a
          href="mailto:hello@sounez.com"
          className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-soft text-primary">
            <Mail className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold">Email</div>
            <div className="truncate text-sm text-muted-foreground">hello@sounez.com</div>
          </div>
        </a>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-soft text-primary">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold">Response time</div>
            <div className="text-sm text-muted-foreground">Usually within 24 hours</div>
          </div>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        noValidate
        className="mt-8 space-y-5 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" error={errors.name} htmlFor="name">
            <input
              id="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Jane Doe"
              maxLength={100}
              className={inputCls(!!errors.name)}
            />
          </Field>
          <Field label="Email" error={errors.email} htmlFor="email">
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              maxLength={255}
              className={inputCls(!!errors.email)}
            />
          </Field>
        </div>

        <Field label="What's it about?" htmlFor="topic">
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => {
              const active = form.topic === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => update("topic", t)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition active:scale-95 ${
                    active
                      ? "border-primary bg-gradient-brand text-primary-foreground shadow-pop"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Message" error={errors.message} htmlFor="message">
          <textarea
            id="message"
            rows={6}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Tell us what's on your mind…"
            maxLength={2000}
            className={inputCls(!!errors.message) + " resize-y"}
          />
          <div className="mt-1 flex justify-end text-xs text-muted-foreground">
            {msgLeft} characters left
          </div>
        </Field>

        <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            By sending this message, you agree to our friendly use of your email to reply.
            {RECAPTCHA_SITE_KEY ? <> This site is protected by Google reCAPTCHA.</> : null}
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-pop transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Send message
              </>
            )}
          </button>
        </div>

        {sent && (
          <div className="animate-fade-in flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary-soft/60 p-4 text-sm">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <div className="font-semibold">Thanks — your message is on its way.</div>
              <div className="text-muted-foreground">We&apos;ll get back to you within 24 hours.</div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
