import { useEffect, useMemo, useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { ShareButton } from "./EngagementBar";
import { cn } from "@/lib/utils";

type Comment = {
  id: string;
  name: string;
  text: string;
  createdAt: number;
};

const LIKES_KEY = (slug: string) => `sounez:blog:likes:${slug}`;
const LIKED_KEY = (slug: string) => `sounez:blog:liked:${slug}`;
const COMMENTS_KEY = (slug: string) => `sounez:blog:comments:${slug}`;
const RATE_KEY = (slug: string) => `sounez:blog:lastComment:${slug}`;

// Pseudo-random baseline so counts feel alive, deterministic per slug
function baselineLikes(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return 12 + (h % 80);
}

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(ts).toLocaleDateString();
}

export function BlogEngagement({ slug }: { slug: string }) {
  const base = useMemo(() => baselineLikes(slug), [slug]);
  const [likes, setLikes] = useState(base);
  const [liked, setLiked] = useState(false);
  const [pulse, setPulse] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem(LIKES_KEY(slug));
      const storedLiked = localStorage.getItem(LIKED_KEY(slug));
      const storedComments = localStorage.getItem(COMMENTS_KEY(slug));
      if (storedLikes) setLikes(parseInt(storedLikes, 10) || base);
      if (storedLiked === "1") setLiked(true);
      if (storedComments) setComments(JSON.parse(storedComments));
    } catch {
      // ignore
    }
  }, [slug, base]);

  const toggleLike = () => {
    const next = !liked;
    const nextCount = Math.max(0, likes + (next ? 1 : -1));
    setLiked(next);
    setLikes(nextCount);
    setPulse(true);
    setTimeout(() => setPulse(false), 350);
    try {
      localStorage.setItem(LIKES_KEY(slug), String(nextCount));
      localStorage.setItem(LIKED_KEY(slug), next ? "1" : "0");
    } catch {
      // ignore
    }
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed.length < 3) {
      toast.error("Comment is too short.");
      return;
    }
    if (trimmed.length > 1000) {
      toast.error("Comment is too long (max 1000 characters).");
      return;
    }
    // Rate limit: 1 comment / 20s per post
    try {
      const last = parseInt(localStorage.getItem(RATE_KEY(slug)) || "0", 10);
      if (Date.now() - last < 20_000) {
        toast.error("Please wait a few seconds before posting again.");
        return;
      }
    } catch {
      // ignore
    }

    setSubmitting(true);
    const newComment: Comment = {
      id: Math.random().toString(36).slice(2),
      name: name.trim().slice(0, 60) || "Anonymous",
      text: trimmed,
      createdAt: Date.now(),
    };
    const next = [newComment, ...comments].slice(0, 200);
    setComments(next);
    try {
      localStorage.setItem(COMMENTS_KEY(slug), JSON.stringify(next));
      localStorage.setItem(RATE_KEY(slug), String(Date.now()));
    } catch {
      // ignore
    }
    setText("");
    toast.success("Comment posted");
    setTimeout(() => setSubmitting(false), 200);
  };

  return (
    <section className="my-12">
      {/* Like bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4">
        <div className="text-sm text-muted-foreground">
          Enjoyed this article? Let us know.
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLike}
            aria-pressed={liked}
            aria-label={liked ? "Unlike article" : "Like article"}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-95",
              liked
                ? "border-[#ed4956]/40 bg-[#ed4956]/10 text-[#ed4956]"
                : "border-border bg-background hover:border-[#ed4956]/40 hover:text-[#ed4956]",
            )}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-transform",
                liked && "fill-[#ed4956] text-[#ed4956]",
                pulse && "scale-125",
              )}
            />
            <span className="tabular-nums">{likes}</span>
          </button>
          <ShareButton title={slug} />
        </div>
      </div>

      {/* Comments */}
      <div className="mt-8">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">
            Comments <span className="text-muted-foreground">({comments.length})</span>
          </h2>
        </div>

        <form
          onSubmit={submitComment}
          className="mt-5 rounded-2xl border border-border bg-card p-5"
        >
          <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              maxLength={60}
              className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts…"
              rows={3}
              maxLength={1000}
              className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {text.length}/1000 — no signup required
            </span>
            <button
              type="submit"
              disabled={submitting || text.trim().length < 3}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> Post comment
            </button>
          </div>
        </form>

        <ul className="mt-6 space-y-3">
          {comments.length === 0 && (
            <li className="rounded-2xl border border-dashed border-border bg-background/50 px-5 py-6 text-center text-sm text-muted-foreground">
              Be the first to comment.
            </li>
          )}
          {comments.map((c) => (
            <li
              key={c.id}
              className="animate-slide-up rounded-2xl border border-border bg-card px-5 py-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-primary-foreground">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm font-semibold">{c.name}</div>
                </div>
                <div className="text-xs text-muted-foreground">{timeAgo(c.createdAt)}</div>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/85">
                {c.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
