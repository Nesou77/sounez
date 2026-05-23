export type PopularityItem = { views?: number; likes?: number; slug: string };

function comparePopularity(a: PopularityItem, b: PopularityItem): number {
  const viewsDiff = (b.views ?? 0) - (a.views ?? 0);
  if (viewsDiff !== 0) return viewsDiff;
  const likesDiff = (b.likes ?? 0) - (a.likes ?? 0);
  if (likesDiff !== 0) return likesDiff;
  return a.slug.localeCompare(b.slug);
}

export function sortByPopularity<T extends PopularityItem>(items: T[]): T[] {
  return [...items].sort(comparePopularity);
}

export const sortToolsByPopularity = sortByPopularity;
export const sortBlogPostsByPopularity = sortByPopularity;
