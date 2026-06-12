import { z } from "zod";
import { CONTENT_TYPES } from "@/lib/content-types";

const URL_REGEX = /https?:\/\/|www\./gi;

// Disallow names that are clearly keyword-stuffed spam (e.g. "Buy Cheap Viagra Now")
const SPAM_NAME_REGEX = /\b(buy|cheap|free|discount|promo|click\s*here|visit\s*my)\b/i;

export const commentBodySchema = z.object({
  contentType: z.enum(CONTENT_TYPES),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  authorName: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(80)
    .refine((v) => !SPAM_NAME_REGEX.test(v), {
      message: "Please use your real name.",
    }),
  authorEmail: z
    .union([z.string().trim().email().max(255), z.literal("")])
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  body: z.string().trim().min(3, "Comment is too short").max(1000, "Comment is too long"),
  tosAgreed: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the community guidelines." }),
  }),
});

export type CommentBodyInput = z.infer<typeof commentBodySchema>;

export function countUrls(text: string): number {
  return (text.match(URL_REGEX) ?? []).length;
}

export function rejectSpamUrls(body: string): string | null {
  if (countUrls(body) > 2) {
    return "Comments with more than 2 links are not allowed.";
  }
  return null;
}

export type PublicComment = {
  id: string;
  contentType: string;
  slug: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export function toPublicComment(row: {
  id: string;
  contentType: string;
  slug: string;
  authorName: string;
  body: string;
  createdAt: Date;
}): PublicComment {
  return {
    id: row.id,
    contentType: row.contentType,
    slug: row.slug,
    authorName: row.authorName,
    body: row.body,
    createdAt: row.createdAt.toISOString(),
  };
}
