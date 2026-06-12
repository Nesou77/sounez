"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, Check, Flag, X } from "lucide-react";

type AdminComment = {
  id: string;
  contentType: string;
  slug: string;
  authorName: string;
  authorEmail: string | null;
  body: string;
  status: string;
  moderationFlag: string | null;
  reportCount: number;
  createdAt: string;
  updatedAt: string;
};

type StatusFilter = "pending" | "approved" | "rejected";

const STATUS_LABELS: Record<StatusFilter, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const FLAG_LABELS: Record<string, string> = {
  profanity: "Profanity",
  hate_speech: "Hate speech",
  gambling_spam: "Gambling spam",
  financial_spam: "Financial spam",
  health_spam: "Health spam",
  crypto_spam: "Crypto spam",
  hacking: "Hacking",
  adult_services: "Adult services",
  user_reports: "User reports",
};

export default function AdminCommentsPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("pending");
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [actioning, setActioning] = useState<string | null>(null);

  const tokenRef = useRef(token);
  tokenRef.current = token;

  const load = useCallback(async (status: StatusFilter, tok: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/comments?status=${status}`, {
        headers: { Authorization: `Bearer ${tok}` },
      });
      if (res.status === 401) {
        setAuthed(false);
        setAuthError("Invalid token.");
        return;
      }
      const data = (await res.json()) as { ok: boolean; comments: AdminComment[] };
      if (data.ok) setComments(data.comments);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError("");
    const res = await fetch(`/api/admin/comments?status=pending`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      setAuthError("Invalid token. Check ADMIN_MODERATION_TOKEN in your env.");
      return;
    }
    const data = (await res.json()) as { ok: boolean; comments: AdminComment[] };
    if (data.ok) {
      setAuthed(true);
      setComments(data.comments);
    }
  };

  useEffect(() => {
    if (authed) void load(statusFilter, tokenRef.current);
  }, [authed, statusFilter, load]);

  const action = async (id: string, status: "approved" | "rejected") => {
    setActioning(id);
    try {
      await fetch(`/api/admin/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenRef.current}`,
        },
        body: JSON.stringify({ status }),
      });
      setComments((prev) => prev.filter((c) => c.id !== id));
    } finally {
      setActioning(null);
    }
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <form
          onSubmit={handleAuth}
          className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-soft"
        >
          <h1 className="text-xl font-bold">Admin — Comment Moderation</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the ADMIN_MODERATION_TOKEN from your environment to continue.
          </p>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Admin token"
            required
            className="mt-5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          {authError && (
            <p className="mt-2 flex items-center gap-1 text-xs text-red-500">
              <AlertTriangle className="h-3.5 w-3.5" /> {authError}
            </p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-gradient-brand py-2 text-sm font-semibold text-primary-foreground"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  const flaggedCount = comments.filter((c) => c.moderationFlag).length;
  const reportedCount = comments.filter((c) => c.reportCount > 0).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Comment Moderation</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review user-submitted comments before they appear publicly.
          </p>
        </div>
        {statusFilter === "pending" && (flaggedCount > 0 || reportedCount > 0) && (
          <div className="flex flex-wrap gap-2">
            {flaggedCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400">
                <AlertTriangle className="h-3.5 w-3.5" /> {flaggedCount} auto-flagged
              </span>
            )}
            {reportedCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400">
                <Flag className="h-3.5 w-3.5" /> {reportedCount} user-reported
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mb-6 flex gap-2">
        {(["pending", "approved", "rejected"] as StatusFilter[]).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-xl border px-4 py-1.5 text-sm font-medium transition ${
              statusFilter === s
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/40"
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-sm text-muted-foreground">Loading comments…</p>
      )}

      {!loading && comments.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-background/50 px-5 py-10 text-center text-sm text-muted-foreground">
          No {statusFilter} comments.
        </div>
      )}

      <ul className="space-y-4">
        {comments.map((c) => {
          const hasPriorityFlag = Boolean(c.moderationFlag) || c.reportCount > 0;
          return (
            <li
              key={c.id}
              className={`rounded-2xl border bg-card p-5 ${
                hasPriorityFlag ? "border-amber-500/40" : "border-border"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{c.authorName}</span>
                    {c.authorEmail && (
                      <span className="text-xs text-muted-foreground">{c.authorEmail}</span>
                    )}
                    {c.moderationFlag && (
                      <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                        {FLAG_LABELS[c.moderationFlag] ?? c.moderationFlag}
                      </span>
                    )}
                    {c.reportCount > 0 && (
                      <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-700 dark:text-red-400">
                        {c.reportCount} report{c.reportCount !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {c.contentType} / {c.slug} — {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>

                {statusFilter === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => void action(c.id, "approved")}
                      disabled={actioning === c.id}
                      title="Approve"
                      className="grid h-8 w-8 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 transition hover:bg-emerald-500/20 disabled:opacity-40"
                    >
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => void action(c.id, "rejected")}
                      disabled={actioning === c.id}
                      title="Reject"
                      className="grid h-8 w-8 place-items-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 transition hover:bg-red-500/20 disabled:opacity-40"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{c.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
