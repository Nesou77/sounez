# Content Audit

Date: 2026-07-16
Scope: every publicly reachable route on sounez.com (76 routes per the live sitemap, confirmed via `npm run quality:audit` and `app/sitemap.ts`, which derives all tool/blog/category/pack URLs dynamically from `data/tools.ts`, `data/blog.ts`, and `data/smartPacks.ts` — there is no separate hardcoded page list to drift out of sync).

This audit reflects the site as of this pass. It does **not** invent content-quality problems that aren't there: most pages already went through prior remediation rounds (see `docs/adsense-content-audit.md` and `docs/adsense-remediation-report.md` for that history) — repeated boilerplate, self-referential "we avoid thin content" copy, and generic filler were already removed before this pass. What follows is a fresh, independent review, not a restatement of the old docs.

**Legend for "Action":** KEEP (no change needed) · IMPROVE (small edit recommended, not urgent) · MERGE · REDIRECT · HIDE (noindex) · REMOVE

---

## 1. Trust, legal, and hub pages

| Page | Purpose | Quality concerns | Action |
|---|---|---|---|
| `/` (Home) | Entry point: value prop, featured tools, Smart Packs, categories, FAQ | None found. Copy is visitor-focused, not reviewer-facing. | KEEP |
| `/tools` | Searchable/filterable tool directory | None found. | KEEP |
| `/blog` | Guide index | None found. | KEEP |
| `/categories` | Top-level category hub | None found. | KEEP |
| `/categories/creator-tools` | Category page with use cases, tips, FAQs | None found. | KEEP |
| `/categories/design-tools` | Category page with use cases, tips, FAQs | None found. | KEEP |
| `/categories/utility-tools` | Category page with use cases, tips, FAQs | None found. | KEEP |
| `/smart-packs` | Smart Pack hub | None found. | KEEP |
| `/faq` | Public FAQ hub with visible FAQPage JSON-LD | None found; schema matches visible text exactly (verified). | KEEP |
| `/about` | Publisher identity, philosophy, contact | None found. Author identity ("Nesou") is consistent with `/editorial-policy` and GitHub link. | KEEP |
| `/contact` | Contact form + FAQ | Fixed this pass: added `aria-describedby`/`aria-invalid` on error fields; added server-side rate limiting (was previously unlimited). | KEEP |
| `/privacy-policy` | Data, cookies, AdSense, third-party services, contact | Updated this pass to accurately describe the now-implemented consent banner (previously said "no banner is shown" unconditionally, which is still true today but didn't describe the mechanism that exists for when ads are enabled). Also removed a stale reference to PDF conversion (the PDF-to-Word tool was removed in a prior session). | KEEP |
| `/cookie-policy` | Cookie/local-storage specifics | Same consent-banner update as above. | KEEP |
| `/terms-of-service` | Usage terms, liability, IP | None found. Doubles as the site's "Terms and Conditions" — a `/terms` short alias already 301s here (`next.config.ts`). | KEEP |
| `/dmca` | Copyright/takedown process | Removed a stale "converting a paid ebook" example (referenced the deleted PDF tool); replaced with a still-applicable example. | KEEP |
| `/editorial-policy` | Authorship, AI-use disclosure, corrections process | None found. This is the site's substitute for a standalone "Disclaimer" page — see note below. | KEEP |

**On a dedicated Disclaimer page:** the task brief asks for one "when appropriate." Sounez already carries the substance of a disclaimer across three existing pages rather than one dedicated route: `/editorial-policy` (AI-assistance and authorship disclosure), `/terms-of-service` (liability, "no professional advice" framing), and per-tool disclaimers (`lib/tool-disclaimers.ts`, rendered on every AI/upload tool page — e.g. "Only convert documents you own or have permission to process"). Adding a fourth, separate `/disclaimer` page would duplicate this content rather than add value, which the brief explicitly asks to avoid. **Recommendation: keep the distributed approach — no new page.**

## 2. Noindexed / private / infrastructure routes

| Page | Purpose | Status |
|---|---|---|
| `/admin/comments` | Comment moderation UI | Correctly noindexed (`app/admin/layout.tsx`), token-protected server-side, excluded from sitemap. KEEP as-is. |
| `/smart-packs/history` | Per-browser saved Smart Pack results | Correctly noindexed, excluded from sitemap and footer nav. KEEP as-is. |
| `/api/*` | Route handlers, not pages | No metadata surface; correctly disallowed in `robots.ts`. KEEP as-is. |
| `/ads.txt`, `/robots.txt`, `/sitemap.xml` | Machine-readable files | Verified present and correctly generated. KEEP as-is. |

No orphan pages were found (every `app/` route with a `page.tsx` is reachable from nav, footer, sitemap, or a data-driven listing), and no dead nav/footer links were found (every link resolves to a real route) — confirmed by cross-referencing `Navbar.tsx`, `Footer.tsx`, `app/sitemap.ts`, and `data/tools.ts`/`data/blog.ts`/`data/smartPacks.ts` slugs.

## 3. Tools (26)

Every tool page shares one template (`ToolPageShell` + `ToolPageSections`) that includes: what it does, who it's for, features, step-by-step instructions, examples, common mistakes, a privacy note, when *not* to use it, FAQs, and related tools/guides — populated per-tool from `lib/tool-editorial.ts`, not generic filler. All 26 were spot-checked for uniqueness (no shared boilerplate paragraphs) and are KEEP unless noted.

| Slug | Purpose | Action |
|---|---|---|
| background-remover | AI background removal (on-device) | KEEP |
| image-describer | Alt text / caption / SEO keyword generation from an image | KEEP |
| youtube-tags-generator | YouTube tag suggestions | KEEP |
| tiktok-money-calculator | Sponsored-post earnings estimate | KEEP |
| hashtag-generator | Hashtag suggestions | KEEP |
| color-palette-generator | 5-color palette generator | KEEP |
| css-gradient-generator | CSS gradient builder | KEEP |
| qr-code-generator | QR code image generator | KEEP |
| word-counter | Word/character/reading-time counter | KEEP |
| password-generator | Random password generator | KEEP |
| text-case-converter | Case conversion utility | KEEP |
| image-compressor | Browser-side batch image compression | KEEP |
| ai-caption-generator | AI social captions | KEEP |
| bio-generator | AI profile bio generator | KEEP |
| calculator | Basic calculator | KEEP |
| business-name-generator | AI business name ideas | KEEP |
| study-notes-generator | AI study notes | KEEP |
| website-idea-generator | AI website concepts | KEEP |
| resume-generator | Resume builder, HTML/PDF export | Fixed this pass: the live preview panel rendered a second `<h1>` alongside the page's own `<h1>`, breaking heading hierarchy — changed to `<p>` (same visual style). KEEP |
| png-to-jpg-converter | Browser-side PNG→JPG conversion with HowTo schema | Fixed this pass: OG image declared 560×140 vs. the real 2288×925 asset, and `twitter.site` was `@sounez` instead of the correct `@souneztools`. KEEP |
| favicon-generator | Favicon pack generator | KEEP |
| svg-blob-generator | SVG blob shape generator | KEEP |
| font-pairing-tool | Font pairing suggestions | KEEP |
| image-placeholder-generator | Placeholder image generator | KEEP |
| box-shadow-generator | CSS box-shadow builder | KEEP |
| background-pattern-generator | CSS/SVG pattern generator | KEEP |

(Note: the "PDF to Word Converter" tool that appeared in earlier historical docs no longer exists — it and its backend service were fully removed, including its blog post and all cross-references, in a prior session on this branch. It is not listed above because it is gone, not hidden.)

## 4. Blog posts (30)

All 30 posts were previously audited for duplication, spun/AI-filler text, and grammar (see `docs/adsense-content-audit.md` Pass 2). This pass re-checked for anything new; findings below.

| Slug | Topic | Action |
|---|---|---|
| how-to-remove-image-backgrounds-online | Background removal guide | KEEP |
| how-to-write-alt-text-for-images | Alt text SEO/accessibility guide | KEEP |
| image-optimization-checklist | Full image optimization checklist | KEEP |
| best-free-ai-tools-2026 | AI tools roundup | IMPROVE — title/content is evergreen but the slug still has "2026" baked in. Not urgent, but consider a future redirect to an evergreen slug (e.g. `best-free-ai-tools`) rather than re-dating it again next year. |
| best-free-tools-for-creators | Creator toolkit roundup | KEEP |
| how-to-grow-on-tiktok | TikTok growth playbook | IMPROVE — platform algorithm guidance dates faster than most content on the site; recommend a periodic (e.g. semiannual) manual accuracy check against current TikTok creator documentation. |
| how-to-compress-images | Image compression guide | KEEP |
| best-color-palettes-for-design | Curated palette guide | KEEP |
| how-to-create-a-strong-password | Password hygiene guide | KEEP |
| how-to-use-qr-codes-for-marketing | QR marketing guide | KEEP |
| best-productivity-tools-for-remote-workers | Remote-work tool stack | KEEP |
| how-to-write-youtube-descriptions | YouTube description guide | IMPROVE — same "platform guidance ages" note as the TikTok post. |
| css-gradients-guide | CSS gradients guide | KEEP |
| how-to-grow-instagram-organically | Instagram growth guide | IMPROVE — same platform-freshness note. |
| image-seo-guide | Image SEO guide | KEEP |
| how-to-write-better-social-media-captions | Caption-writing guide | KEEP |
| how-to-write-a-good-social-media-bio | Bio-writing guide | KEEP |
| simple-online-calculator-guide | Everyday math guide | KEEP |
| how-to-choose-a-business-name | Business naming guide | KEEP |
| how-to-create-effective-study-notes | Study notes guide | KEEP |
| how-to-find-website-ideas | Website ideation guide | KEEP |
| how-to-create-a-professional-resume | Resume structure guide | KEEP |
| png-vs-jpg-and-how-to-convert-images | Format comparison guide | KEEP |
| how-to-create-a-favicon-for-your-website | Favicon guide | KEEP |
| how-to-use-svg-blobs-in-web-design | SVG blob guide | KEEP |
| how-to-choose-font-pairings-for-a-website | Typography guide | KEEP |
| how-to-use-image-placeholders-in-web-design | Placeholder workflow guide | KEEP |
| css-box-shadow-guide | Box-shadow guide | KEEP |
| css-background-patterns-guide | CSS pattern guide | KEEP |
| free-design-tools-for-web-creators | Design tool roundup (11 tools) | KEEP — already correctly absorbed the older, now-redirected `free-design-tools-for-non-designers` post (verified: `next.config.ts` 301s that slug here; no duplicate content remains live). |

No blog post was found thin, duplicated, spun, or copied. No dedicated tests were skipped for this claim — the automated `scripts/content-quality-audit.mjs` (run as part of this pass, 0 errors/0 warnings) checks for repeated paragraphs, generic "Introduction" headings, and duplicate metadata across the full set.

## 5. Smart Packs (5)

| Slug | Purpose | Action |
|---|---|---|
| social-media-pack | Caption + hashtags + alt text from one brief | KEEP |
| product-listing-pack | Listing copy from one brief | KEEP |
| seo-image-pack | Image SEO copy from one brief | KEEP |
| business-launch-pack | Launch copy from one brief | KEEP |
| student-study-pack | Study workflow from one brief | KEEP |

Each has its own full page (`app/smart-packs/[slug]/page.tsx` + `data/smartPacks.ts` fields), not a shared template with only the name swapped — use cases, workflow steps, example output, common mistakes, and FAQs are genuinely different per pack.

Housekeeping found (not a content issue): three empty leftover directories exist at `app/smart-packs/{product-listing-pack,seo-image-pack,social-media-pack}/` with no `page.tsx` inside them — dead weight from before the `[slug]` dynamic route pattern was adopted. They produce no live route and no 404 risk, but are safe to delete for repo hygiene. Left untouched in this pass since it's cosmetic and outside the content-quality scope; flagging here for the owner.

---

## 6. Content backlog — suggested original article topics

The brief is explicit: don't publish new articles just to raise the page count. The topics below are proposed **only** because they fill a real gap — each ties to a tool or audience segment the site already serves but doesn't yet have a dedicated deep-dive for (the closest existing post only covers it tangentially). None would duplicate an existing article. These are backlog candidates for the owner to write (or commission) with real human review — not something this pass generated as filler.

1. **"How Sponsored Post Rates Are Actually Calculated"** — pairs with `tiktok-money-calculator`. The existing TikTok growth post doesn't explain the rate-estimation math (engagement rate, CPM bands by niche/follower tier); a dedicated piece would.
2. **"Character and Word Limits for Every Platform (2026 reference)"** — pairs with `word-counter`. No current post is dedicated to this; it only comes up in passing in the YouTube-description post.
3. **"camelCase vs. snake_case vs. kebab-case: When Each One Actually Matters"** — pairs with `text-case-converter`, aimed at a developer audience (naming conventions across languages/frameworks) that the site doesn't currently address at all.
4. **"Resume ATS Compatibility: What Applicant Tracking Systems Actually Parse"** — pairs with `resume-generator`. The existing resume post covers structure/writing; this would cover the more technical "will this resume even get read by a machine" angle, a distinct and commonly searched question.
5. **"QR Code Error Correction and Print Size: A Technical Reference"** — pairs with `qr-code-generator`. The existing QR post is about marketing placement; this would be the technical companion (DPI minimums, error-correction levels, when a logo overlay breaks scannability).

## Methodology note

This audit was produced by reading the actual route files, `data/tools.ts`, `data/blog.ts`, `data/smartPacks.ts`, and the shared templates (`ToolPageShell`, `ToolPageSections`, `BlogPostShell`, `CategoryPage`) rather than inferring quality from titles alone, plus running `npm run quality:audit` (0 errors, 0 warnings) as an automated cross-check. It does not include a manual re-read of all ~30,000+ words of blog content line by line; spot-checks targeted the areas most likely to carry risk (evergreen-vs-dated claims, platform-specific guidance, anything referencing the removed PDF tool).
