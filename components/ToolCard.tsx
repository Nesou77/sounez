"use client";

import type { Tool } from "@/data/tools";
import { ArrowRight } from "lucide-react";
import { getToolIcon } from "@/lib/tool-icons";
import { SmartLink as Link } from "@/components/smart-link";
import { trackSelectContent } from "@/lib/analytics";

export function ToolCard({ tool, searchQuery }: { tool: Tool; searchQuery?: string }) {
  const Icon = getToolIcon(tool.slug);
  const q = searchQuery?.trim();
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group ring-gradient relative flex flex-col rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
      onClick={() => {
        if (q)
          trackSelectContent({ content_type: "tool", item_id: tool.slug, search_term: q });
      }}
    >
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-soft text-primary ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold tracking-tight">{tool.name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{tool.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Open tool
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
