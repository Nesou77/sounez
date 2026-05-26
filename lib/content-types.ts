export const CONTENT_TYPES = ["blog", "tool", "page", "smart_pack"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export function isContentType(v: string): v is ContentType {
  return (CONTENT_TYPES as readonly string[]).includes(v);
}
