import { getSiteUrl } from "@/lib/site-url";

/**
 * Shared OpenGraph image/site fields to spread into any page-level
 * `openGraph` override.
 *
 * Next.js does NOT deep-merge the `openGraph` object across layout/page
 * segments — if a page defines its own `openGraph`, it fully replaces the
 * root layout's (dropping siteName/locale/images silently unless the page
 * repeats them). This was confirmed by inspecting the built HTML: pages that
 * only set `{ title, description, url, type }` rendered no `og:image`,
 * `og:site_name`, or `og:locale` at all. Spread this into every page-level
 * `openGraph` override instead of hand-repeating the logo/site fields.
 */
export function siteOpenGraphDefaults() {
  const siteUrl = getSiteUrl();
  return {
    siteName: "Sounez",
    locale: "en_US",
    images: [
      { url: `${siteUrl}/logo.webp`, width: 2288, height: 925, alt: "Sounez", type: "image/webp" as const },
    ],
  };
}

/**
 * Same fields for a page that also defines its own `twitter` object.
 * Most pages should NOT define their own `twitter` block at all — leaving it
 * unset lets it inherit the root layout's complete one (card/site/images),
 * with title/description auto-derived from the page's own resolved
 * `openGraph`. Only spread this in if a page has a specific reason to
 * override `twitter` directly (e.g. a distinct Twitter-specific description).
 */
export function siteTwitterDefaults() {
  const siteUrl = getSiteUrl();
  return {
    site: "@souneztools" as const,
    images: [`${siteUrl}/logo.webp`],
  };
}
