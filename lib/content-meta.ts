import { hasDatabaseUrl, prisma } from "@/lib/prisma";
import type { ContentType } from "@/lib/content-types";

export type ContentDates = {
  createdAt: Date;
  updatedAt: Date;
};

export async function getContentMeta(contentType: ContentType, slug: string) {
  if (!hasDatabaseUrl) return null;

  try {
    return await prisma.contentMeta.findUnique({
      where: { contentType_slug: { contentType, slug } },
    });
  } catch {
    return null;
  }
}

export async function getContentDates(
  contentType: ContentType,
  slug: string,
  /** ISO date string (YYYY-MM-DD) used as a fallback when no DB record exists. */
  staticFallback?: string,
): Promise<ContentDates | null> {
  const meta = await getContentMeta(contentType, slug);
  if (meta) return { createdAt: meta.createdAt, updatedAt: meta.updatedAt };

  // Use the static date provided by the caller (e.g. from data/blog.ts publishedAt).
  if (staticFallback) {
    const d = new Date(staticFallback + "T00:00:00Z");
    return { createdAt: d, updatedAt: d };
  }

  return null;
}

export function formatContentDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatContentDateIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}
