import type { Tool } from "@/data/tools";

/** Hero search: name, description, category slug, keywords. */
export function matchToolHeroSearch(tool: Tool, raw: string): boolean {
  const q = raw.trim().toLowerCase();
  if (!q) return false;
  return (
    tool.name.toLowerCase().includes(q) ||
    tool.description.toLowerCase().includes(q) ||
    tool.category.includes(q) ||
    tool.keywords.some((k) => k.toLowerCase().includes(q))
  );
}

/** Tools listing search: name, description, keywords (category filter is separate). */
export function matchToolListSearch(tool: Tool, raw: string): boolean {
  const q = raw.trim().toLowerCase();
  if (!q) return true;
  return (
    tool.name.toLowerCase().includes(q) ||
    tool.description.toLowerCase().includes(q) ||
    tool.keywords.some((k) => k.toLowerCase().includes(q))
  );
}
