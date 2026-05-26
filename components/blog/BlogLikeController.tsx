"use client";

import type { ReactNode } from "react";

/** Kept for layout compatibility - likes are handled directly in EngagementBar via the API. */
export function BlogLikeController({
  children,
}: {
  slug?: string;
  children: ReactNode;
}) {
  return <>{children}</>;
}

export function useBlogLike() {
  return null;
}
