/**
 * useToolView - fires a tool_view analytics event once on mount.
 * Import this in any tool client component.
 */
"use client";

import { useEffect } from "react";
import { trackToolView } from "@/lib/analytics";
import type { Tool } from "@/data/tools";

export function useToolView(tool: Tool): void {
  useEffect(() => {
    trackToolView({
      tool_slug: tool.slug,
      tool_name: tool.name,
      tool_category: tool.category,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool.slug]);
}
