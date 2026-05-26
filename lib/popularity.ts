/** Sort tools/posts by editorial priority — no synthetic view/like metrics. */

export type SortableContent = {
  slug: string;
  name?: string;
  title?: string;
  featured?: boolean;
};

export function sortByEditorialPriority<T extends SortableContent>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const feat = Number(!!b.featured) - Number(!!a.featured);
    if (feat !== 0) return feat;
    const labelA = (a.name ?? a.title ?? a.slug).toLowerCase();
    const labelB = (b.name ?? b.title ?? b.slug).toLowerCase();
    return labelA.localeCompare(labelB);
  });
}

export const sortToolsByPopularity = sortByEditorialPriority;
export const sortBlogPostsByPopularity = sortByEditorialPriority;
