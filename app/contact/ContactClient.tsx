"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send, MessageCircle, CheckCircle2, Loader2, Bug, Wrench, Handshake, MessageSquare, Twitter, Instagram, Facebook, Youtube } from "lucide-react";
import { executeContactRecaptchaV3 } from "@/lib/recaptcha-v3-browser";
import { trackGenerateLead, getPagePath } from "@/lib/analytics";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.56a8.16 8.16 0 004.77 1.52V7.65a4.85 4.85 0 01-1-.96z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: "https://www.tiktok.com/@souneztools?is_from_webapp=1&sender_device=pc", label: "Sounez on TikTok", icon: "tiktok" },
  { href: "https://www.instagram.com/souneztools/", label: "Sounez on Instagram", icon: "instagram" },
  { href: "https://pin.it/45jluYJOT", label: "Sounez on Pinterest", icon: "pinterest" },
  { href: "https://x.com/souneztools", label: "Sounez on X", icon: "x" },
  { href: "https://www.facebook.com/profile.php?id=61589812104461", label: "Sounez on Facebook", icon: "facebook" },
  { href: "https://www.youtube.com/@Souneztools", label: "Sounez on YouTube", icon: "youtube" },
] as const;

type SocialIconType = (typeof SOCIAL_LINKS)[number]["icon"];

function SocialIconEl({ type }: { type: SocialIconType }) {
  if (type === "tiktok") return <TikTokIcon className="h-4 w-4" />;
  if (type === "instagram") return <Instagram className="h-4 w-4" aria-hidden="true" />;
  if (type === "pinterest") return <PinterestIcon className="h-4 w-4" />;
  if (type === "x") return <Twitter className="h-4 w-4" aria-hidden="true" />;
  if (type === "facebook") return <Facebook className="h-4 w-4" aria-hidden="true" />;
  return <Youtube className="h-4 w-4" aria-hidden="true" />;
}

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
  else if (f.message.trim().length < 10) e.message = "Message is a bit short. Add a few more details.";
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
      trackGenerateLead({
        form_name: "contact_form",
        lead_topic: form.topic,
        page_path: getPagePath(),
      });
      setForm({ name: "", email: "", topic: "Feedback", message: "" });
    } catch {
      toast.error("Network error", { description: "Check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const msgLeft = 2000 - form.message.length;

  const QUICK_FAQS = [
    {
      q: "Is there a way to request a new tool?",
      a: "Yes. Use the form below and select Tool request as the topic. Describe what the tool should do and we will consider it for a future update.",
    },
    {
      q: "How do I report a bug?",
      a: "Select Bug report in the form, then describe the issue as clearly as you can. Include the tool name, what you were trying to do, and what happened instead. Screenshots help but are not required.",
    },
    {
      q: "I have a business or partnership inquiry. Is this the right place?",
      a: "Yes. Select Partnership in the topic list and describe your proposal briefly. We will review it and get back to you.",
    },
    {
      q: "How long does it take to get a reply?",
      a: "We reply to most messages within 24 hours. Complex requests may take a little longer.",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in touch</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Feedback, bugs, tool requests or partnership ideas. We read every message.
        </p>
      </header>

      {/* Reason cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-soft text-primary">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">Feedback</div>
            <div className="text-xs text-muted-foreground">Tell us what works, what does not, or what you would like to see next.</div>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-soft text-primary">
            <Bug className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">Bug reports</div>
            <div className="text-xs text-muted-foreground">Found something broken? Include the tool name and what went wrong.</div>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-soft text-primary">
            <Wrench className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">Tool requests</div>
            <div className="text-xs text-muted-foreground">Have an idea for a tool that should exist? We are always looking for good suggestions.</div>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-soft text-primary">
            <Handshake className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">Partnerships</div>
            <div className="text-xs text-muted-foreground">Business inquiries, content partnerships, or other collaborations.</div>
          </div>
        </div>
      </div>

      {/* Response info */}
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-soft text-primary">
          <MessageCircle className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-semibold">Response time</div>
          <div className="text-sm text-muted-foreground">
            Usually within 24 hours. Reach us directly at{" "}
            <a href="mailto:hello@sounez.com" className="font-medium text-primary hover:underline">
              hello@sounez.com
            </a>
            .
          </div>
        </div>
      </div>

      {/* Social links */}
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-5">
        <span className="text-sm font-medium text-muted-foreground">Follow us:</span>
        {SOCIAL_LINKS.map(({ href, label, icon }) => (
          <a
            key={icon}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary min-h-[2.75rem] min-w-[2.75rem]"
          >
            <SocialIconEl type={icon} />
          </a>
        ))}
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
              <div className="font-semibold">Thanks. Your message is on its way.</div>
              <div className="text-muted-foreground">We&apos;ll get back to you within 24 hours.</div>
            </div>
          </div>
        )}
      </form>

      {/* Quick help FAQ */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">Common questions</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Quick answers before you write to us.
        </p>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
          {QUICK_FAQS.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                {f.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
