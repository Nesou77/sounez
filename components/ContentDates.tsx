import {
  formatContentDate,
  getContentDates,
} from "@/lib/content-meta";
import type { ContentType } from "@/lib/content-types";

export async function ContentDates({
  contentType,
  slug,
  className = "text-xs text-muted-foreground",
  showUpdated = true,
  staticFallback,
}: {
  contentType: ContentType;
  slug: string;
  className?: string;
  showUpdated?: boolean;
  /** ISO date string (YYYY-MM-DD) used as fallback when no DB record exists. */
  staticFallback?: string;
}) {
  const dates = await getContentDates(contentType, slug, staticFallback);
  if (!dates) return null;

  const published = formatContentDate(dates.createdAt);
  const updated =
    showUpdated && dates.updatedAt.getTime() > dates.createdAt.getTime()
      ? formatContentDate(dates.updatedAt)
      : null;

  return (
    <p className={className}>
      <time dateTime={dates.createdAt.toISOString()}>Published {published}</time>
      {updated && (
        <>
          {" "}
          -{" "}
          <time dateTime={dates.updatedAt.toISOString()}>Updated {updated}</time>
        </>
      )}
    </p>
  );
}
