"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import type { ContentType } from "@/lib/content-types";
import type { PublicComment } from "@/lib/comment-validation";
import { formatTimeAgo } from "@/lib/format-time";

export function CommentsSection({
  contentType,
  slug,
}: {
  contentType: ContentType;
  slug: string;
}) {
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadComments = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/comments?contentType=${encodeURIComponent(contentType)}&slug=${encodeURIComponent(slug)}`,
      );
      const data = (await res.json()) as { ok?: boolean; comments?: PublicComment[] };
      if (data.ok && Array.isArray(data.comments)) {
        setComments(data.comments);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [contentType, slug]);

  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    void loadComments();
  }, [loadComments]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (body.trim().length < 3) {
      toast.error("Comment is too short.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType,
          slug,
          authorName: name.trim(),
          authorEmail: email.trim() || undefined,
          body: body.trim(),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok || !data.ok) {
        toast.error(data.error ?? "Could not submit comment.");
        return;
      }
      setBody("");
      toast.success(data.message ?? "Comment submitted for moderation.");
    } catch {
      toast.error("Could not submit comment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="my-12" aria-labelledby={`comments-heading-${slug}`}>
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 id={`comments-heading-${slug}`} className="text-2xl font-bold tracking-tight">
          Comments
          {!loading && (
            <span className="text-muted-foreground"> ({comments.length})</span>
          )}
        </h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Comments are moderated before publication. Share practical feedback, corrections, or questions about
        the page; promotional links and abusive comments are not approved.
      </p>

      <form
        onSubmit={submit}
        className="mt-5 rounded-2xl border border-border bg-card p-5"
        aria-label="Submit a comment"
      >
        <p className="mb-3 text-sm font-semibold">Submit a comment</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name *"
            required
            maxLength={80}
            className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (optional, not shown publicly)"
            maxLength={255}
            className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
          />
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add a useful note, question, correction, or experience with this tool."
          required
          rows={4}
          maxLength={1000}
          className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">{body.length}/1000</span>
          <button
            type="submit"
            disabled={submitting || name.trim().length < 1 || body.trim().length < 3}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Submit comment
          </button>
        </div>
      </form>

      <ul className="mt-6 space-y-3">
        {loading && (
          <li className="rounded-2xl border border-border bg-card px-5 py-6 text-center text-sm text-muted-foreground">
            Loading comments...
          </li>
        )}
        {!loading && comments.length === 0 && (
          <li className="rounded-2xl border border-dashed border-border bg-background/50 px-5 py-6 text-center text-sm text-muted-foreground">
            No approved comments yet. Be the first to share your thoughts.
          </li>
        )}
        {comments.map((c) => (
          <li
            key={c.id}
            className="rounded-2xl border border-border bg-card px-5 py-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div
                  className="grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-primary-foreground"
                  aria-hidden="true"
                >
                  {c.authorName.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm font-semibold">{c.authorName}</div>
              </div>
              <time
                className="text-xs text-muted-foreground"
                dateTime={c.createdAt}
              >
                {formatTimeAgo(new Date(c.createdAt).getTime())}
              </time>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/85">
              {c.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
