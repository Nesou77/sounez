"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { baselineLikeCount } from "@/lib/blog-engagement";

interface BlogLikeState {
  liked: boolean;
  likeCount: number;
  pulse: boolean;
  toggleLike: () => void;
}

const BlogLikeContext = createContext<BlogLikeState | null>(null);

const LIKES_KEY = (slug: string) => `sounez:blog:likes:${slug}`;
const LIKED_KEY = (slug: string) => `sounez:blog:liked:${slug}`;

export function BlogLikeController({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const base = useMemo(() => baselineLikeCount(slug), [slug]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(base);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    try {
      const sl = localStorage.getItem(LIKES_KEY(slug));
      const sLiked = localStorage.getItem(LIKED_KEY(slug));
      if (sl) setLikeCount(parseInt(sl, 10) || base);
      if (sLiked === "1") setLiked(true);
    } catch {
      // ignore
    }
  }, [slug, base]);

  const toggleLike = useCallback(() => {
    setLiked((prev) => {
      const next = !prev;
      setLikeCount((c) => {
        const nextCount = Math.max(0, c + (next ? 1 : -1));
        try {
          localStorage.setItem(LIKES_KEY(slug), String(nextCount));
        } catch {
          // ignore
        }
        return nextCount;
      });
      try {
        localStorage.setItem(LIKED_KEY(slug), next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
    setPulse(true);
    setTimeout(() => setPulse(false), 400);
  }, [slug]);

  const value = useMemo(
    () => ({ liked, likeCount, pulse, toggleLike }),
    [liked, likeCount, pulse, toggleLike],
  );

  return (
    <BlogLikeContext.Provider value={value}>
      {children}
    </BlogLikeContext.Provider>
  );
}

/** Returns the shared like state when inside a BlogLikeController, null otherwise. */
export function useBlogLike(): BlogLikeState | null {
  return useContext(BlogLikeContext);
}
