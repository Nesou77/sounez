import { Calendar, Clock } from "lucide-react";
import { formatContentDate, getContentDates } from "@/lib/content-meta";
import { BLOG_POSTS } from "@/data/blog";

export async function BlogPostDate({
  slug,
  readTime,
}: {
  slug: string;
  readTime: string;
}) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const dates = await getContentDates("blog", slug, post?.publishedAt);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-muted-foreground">
      {dates && (
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          <time dateTime={dates.createdAt.toISOString()}>
            {formatContentDate(dates.createdAt)}
          </time>
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {readTime} read
      </span>
    </div>
  );
}
