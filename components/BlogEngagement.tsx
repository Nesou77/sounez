"use client";

import { CommentsSection } from "@/components/CommentsSection";
import { EngagementBar } from "@/components/EngagementBar";

export function BlogEngagement({ slug, title }: { slug: string; title: string }) {
  return (
    <>
      <section className="my-12">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4">
          <p className="text-sm text-muted-foreground">Found this article useful?</p>
          <EngagementBar slug={`blog:${slug}`} title={title} />
        </div>
      </section>
      <CommentsSection contentType="blog" slug={slug} />
    </>
  );
}
