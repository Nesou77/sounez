"use client";

import { useCallback, useEffect, useState } from "react";
import type { ContentType } from "@/lib/content-types";

export function useLikes(contentType: ContentType, slug: string) {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/likes?contentType=${encodeURIComponent(contentType)}&slug=${encodeURIComponent(slug)}`,
      );
      const data = (await res.json()) as { ok?: boolean; count?: number; liked?: boolean };
      if (data.ok) {
        setCount(data.count ?? 0);
        setLiked(!!data.liked);
      }
    } catch {
      setCount(0);
      setLiked(false);
    } finally {
      setLoading(false);
    }
  }, [contentType, slug]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const toggleLike = useCallback(async () => {
    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType, slug, action: "toggle" }),
      });
      const data = (await res.json()) as { ok?: boolean; count?: number; liked?: boolean };
      if (data.ok) {
        setCount(data.count ?? 0);
        setLiked(!!data.liked);
        setPulse(true);
        setTimeout(() => setPulse(false), 400);
      }
    } catch {
      // ignore
    }
  }, [contentType, slug]);

  return { count, liked, pulse, toggleLike, loading };
}
