# AdSense Readiness Report — 2026-07-20

This report does not guarantee AdSense approval. Google's review weighs factors outside this codebase (traffic history, domain age, subjective policy judgment) that no engineering pass can control.

**Context:** this is the third audit pass on this repo (`ADSENSE_READINESS.md` 2026-07-16, `ADSENSE_READINESS_REPORT.md` 2026-07-18, this one 2026-07-20). The prior two passes were thorough and the codebase was clean at the start of this one (working tree clean, 47/47 tests passing, 0 lint/type errors). Rather than re-litigate settled findings, this pass verified the prior work against **the live production site**, not just the repo — and that surfaced one real, previously-unflagged class of bug: a live discrepancy between the Privacy/Cookie Policy and what production is actually running.

---

## 1. Executive verdict

**Rating: 8/10 — Nearly ready.**

The technical foundation (build, tests, SEO, structured data, consent architecture, ad-safety component) is genuinely solid and was independently re-verified, not just re-read from prior docs. What kept this from a 9–10: this pass found a real, live compliance gap (Privacy/Cookie Policy claiming "no analytics" while production was actually running Google Tag Manager) and a real ad-placement risk (the blog `AdSlot` sitting directly after a comment form's submit button) — both now fixed and verified, but their existence means a "ready to apply, no further checks needed" verdict would have been premature. The remaining gap to "ready to apply" is entirely human decisions (CMP certification, confirming the GTM decision was intentional, final manual QA) — nothing further in the code is blocking.

---

## 2. Critical blockers

### 2.1 Privacy Policy / Cookie Policy falsely claimed no analytics (FIXED, verified)
- **Page/file:** `app/privacy-policy/page.tsx` (Sections 1, 4, 7, 8), `app/cookie-policy/page.tsx`, `components/Footer.tsx`.
- **Why it matters:** Production (`https://www.sounez.com`) is currently running Google Tag Manager (`GTM-KW36CVXK` — confirmed via live HTML `<noscript>` fallback and CSP headers). But the Privacy Policy stated *"Sounez does not currently run Google Analytics, Google Tag Manager, or any other analytics service"* and the Cookie Policy stated *"no cookie consent banner is shown, because there is nothing non-essential to consent to yet."* Both are false as deployed. This is precisely the kind of contradiction the AdSense/GDPR review process is built to catch, and precisely what this task's brief warned against ("Do not state that the site uses no analytics if analytics or tracking scripts are present").
- **What was changed:** Added `env.gtmId` to `lib/env.ts` as the single source of truth (mirroring the existing `env.adsensePubId`/`env.adsenseEnabled` pattern). Routed `lib/consent.ts`, `components/GtmLoader.tsx`, and `components/GoogleTagManager.tsx` through it. Rewrote the affected Privacy Policy sections and Cookie Policy sections to render one of two accurate paragraphs depending on whether `env.gtmId` is set — so this can never silently drift out of sync again the way it just did. Fixed the matching false claim in `Footer.tsx` ("does not currently show ads **or use non-essential cookies**" — the cookies half was wrong).
- **Owner action still required:** Confirm whether running GTM in production today was intentional. Either way the policy text is now automatically correct; but if it was left on accidentally from testing, you may want to unset `NEXT_PUBLIC_GTM_ID` in Vercel to match a "fully cookie-free" positioning instead.

### 2.2 Blog ad placement sat directly after a comment-form submit button (FIXED, verified)
- **Page/file:** `components/BlogPostShell.tsx`, rendered on all 30 blog post routes.
- **Why it matters:** `<AdSlot>` was rendered immediately after `<BlogEngagement>`, which renders the like/share bar *and* `CommentsSection` — a full comment form ending in a "Submit comment" button. The ad sat right below that submit button, separated only by margin. That's close to the exact "ad beside a submit button" pattern AdSense's placement policy prohibits, and increases accidental-click risk on mobile scroll. Ads are currently disabled (`NEXT_PUBLIC_ADSENSE_ENABLED=false`) so this had zero live impact today, but it would have activated as-is the moment ads were turned on.
- **What was changed:** Moved `<AdSlot>` to render immediately after the article body (`{children}`) and before `<BlogEngagement>` — placing it within "substantial explanatory content" per Google's own placement guidance, and away from every interactive control (like button, share button, comment form) on the page.
- **Owner action still required:** None — this is a pure code/layout fix, already verified in a fresh build.

### 2.3 CMP certification — open decision, not a blocker code can fix
- **Page/file:** `components/CookieConsentBanner.tsx`, documented in `ADSENSE_READINESS.md` §6 and the Cookie Policy.
- **Why it matters:** The built-in consent banner is functional and reasonably well-built (separate accept/reject/customize controls, no pre-ticked boxes, persists choice, reopenable) but is not a Google-certified CMP. Google requires a certified CMP (or its own GDPR message) for ads served to EEA/UK/Switzerland traffic.
- **What was changed:** Nothing — this genuinely requires a human/legal decision, not a code fix. The Cookie Policy's new analytics-active section now states plainly that today's banner covers analytics consent but is not certified, and that a certified CMP is still required before AdSense is enabled for those regions.
- **Owner action still required:** Yes — pick a certified CMP or confirm the AdSense-provided GDPR message meets your obligations, before setting `NEXT_PUBLIC_ADSENSE_ENABLED=true` for EEA/UK/CH traffic.

---

## 3. Improvements completed

| File | Change |
|---|---|
| `lib/env.ts` | Added `env.gtmId` getter — single source of truth for whether GTM is configured, mirroring the existing `adsensePubId`/`adsenseEnabled` pattern. |
| `lib/consent.ts` | `nonEssentialScriptsConfigured()` now reads `env.gtmId` instead of `process.env.NEXT_PUBLIC_GTM_ID` directly. |
| `components/GtmLoader.tsx` | Routed through `env.gtmId`. |
| `components/GoogleTagManager.tsx` | Routed through `env.gtmId`; fixed a stale comment that asserted "GTM is not configured on this site" — false in production. |
| `app/privacy-policy/page.tsx` | Sections 1, 4, 7, 8 now render accurate, env-driven text depending on whether analytics is actually configured, instead of a hardcoded "we don't do this" claim that could go stale. |
| `app/cookie-policy/page.tsx` | Same fix applied to the "current status" and "if enabled later" sections; added a dedicated analytics-active paragraph that's explicit about the banner not being a certified CMP. |
| `components/Footer.tsx` | Fixed the bundled "no ads or non-essential cookies" claim to only assert what's actually true when analytics is configured but ads are off. |
| `components/BlogPostShell.tsx` | Moved `<AdSlot>` to directly after the article body, before the engagement bar and comment form (ad-placement safety fix, §2.2). |
| `.env.example` | Documented that `NEXT_PUBLIC_GTM_ID` now also drives policy-page wording, and that it must stay in sync with whatever's actually set in the hosting dashboard. |

No files were removed. No visual/design changes beyond the ad-slot reordering (same component, same styling, different position in the DOM). No new dependencies.

---

## 4. Content audit

Full per-page detail already exists in `CONTENT_AUDIT.md` (2026-07-16) and was spot-verified this pass against the live site (sitemap count, canonical URLs, structured data, `<h1>` counts) with no discrepancies found — no tool or blog content changed since that audit (`git log` shows only metadata/refactor commits touching one blog post title and Smart Pack history removal, both already covered by the clean `quality:audit` / build / test results below). Rather than duplicate all ~90 rows here, this is a condensed summary; see `CONTENT_AUDIT.md` for the full listing.

| Route group | Count | Quality status | Duplicate-content risk | Missing info | Next action |
|---|---|---|---|---|---|
| `/` , `/tools`, `/blog`, `/categories/*`, `/smart-packs`, `/faq` | 8 hub pages | Substantial, visitor-focused copy | None found | None | KEEP |
| `/tools/{slug}` (26 tools) | 26 | Each has distinct what/who/how-to/example/limitations/privacy/FAQ content via `lib/tool-editorial.ts`, not shared boilerplate | None found (spot-checked, no shared paragraphs) | None | KEEP |
| `/blog/{slug}` (30 posts) | 30 | Distinct per-post content, dated, authored | None found (`scripts/content-quality-audit.mjs` checks this automatically, 0 flags) | 3 posts (`how-to-grow-on-tiktok`, `how-to-write-youtube-descriptions`, `how-to-grow-instagram-organically`) carry platform-specific guidance that ages faster than the rest of the site | IMPROVE — periodic manual accuracy check, not urgent |
| `/smart-packs/{slug}` (5 packs) | 5 | Each has its own use cases/workflow/example/FAQ, not a shared template | None found | None | KEEP |
| `best-free-ai-tools-2026` | 1 | Evergreen content, dated slug | Low | None | IMPROVE — consider eventual redirect to an evergreen slug |
| `/about`, `/contact`, `/privacy-policy`, `/cookie-policy`, `/terms-of-service`, `/dmca`, `/editorial-policy` | 7 | Substantial, consistent authorship ("Nesou"), now internally consistent on advertising/analytics claims (§2.1 fix) | None | None | KEEP |

---

## 5. Policy and consent audit

- **Do the privacy documents match the implementation now?** Yes, after §2.1's fix — re-verified by building the site both with and without `NEXT_PUBLIC_GTM_ID` set and confirming both policy pages render the correct branch in each case (see §9).
- **Is analytics or tracking present?** Yes, in the actual production deployment: Google Tag Manager (`GTM-KW36CVXK`) is live, confirmed via the raw server-rendered HTML and the CSP header allowlisting `googletagmanager.com`. It is consent-gated — `GtmLoader.tsx` only injects the GTM script after `hasConsent("analytics")` returns true.
- **Is the cookie banner sufficient?** It's a real, functional mechanism (separate analytics/advertising toggles, accept all / reject non-essential / customize, no pre-ticked boxes, persisted in `localStorage`, reopenable via the now-fixed footer link) — but it is **not** a Google-certified CMP. The Cookie Policy now says this explicitly rather than implying it's a non-issue because nothing is running.
- **What requires a certified CMP?** Enabling AdSense (`NEXT_PUBLIC_ADSENSE_ENABLED=true`) for EEA/UK/Switzerland visitors. Analytics via a self-built banner is a more defensible gray area (many sites use non-certified banners for analytics-only consent), but that's a legal judgment call, not something this pass can certify.
- **What must be configured manually in AdSense?** Nothing yet — `NEXT_PUBLIC_ADSENSE_PUB_ID` already resolves to a real ID in production (`pub-5339334010592024`, confirmed live via `ads.txt` and the `google-adsense-account` meta tag), but `NEXT_PUBLIC_ADSENSE_ENABLED` is correctly `false` — no ad script loads (`adsbygoogle` does not appear anywhere in the live homepage HTML).

---

## 6. Technical SEO audit

All checked directly against the live production domain, not just the repo:

- **Metadata:** unique titles/descriptions confirmed on homepage, `/tools/image-compressor`, `/blog/how-to-compress-images`. Canonical URLs self-referencing and correct (`https://www.sounez.com/...`, no `localhost`/preview leakage).
- **Indexing:** `<meta name="robots" content="index, follow"/>` present on homepage; single `<h1>` confirmed on tool and blog pages.
- **Sitemap:** `https://www.sounez.com/sitemap.xml` returns 77 `<loc>` entries live, matching `npm run quality:audit`'s reported route count exactly.
- **Robots.txt:** live output allows `/`, disallows `/admin/` and `/api/`, correct `Sitemap:` line. Note: a prior commit (`0fae3e0`, 2026-07-16) removed a block list for AI-training crawlers (GPTBot, CCBot, etc.) — this is a content-licensing/business decision, not an AdSense-readiness issue, and is left as-is; flagged here only for visibility since it wasn't mentioned in the prior two reports.
- **Structured data:** `SoftwareApplication` (with `Offer` at `price: 0`, no fabricated ratings/reviews), `BreadcrumbList`, `FAQPage`, `Organization` schemas confirmed on a live tool page and match visible page content — no `aggregateRating` or `review` schema anywhere (would be misleading without real data).
- **Broken links / canonical issues:** none found this pass; re-verified via the existing `sitemap.test.ts` and `legal-pages.test.tsx` suites, both passing.
- **Internal linking:** tool/guide cross-links confirmed present via `lib/tool-editorial.ts` relations, unchanged this pass.
- **404 handling:** live check of a non-existent path correctly returns HTTP 404 (not a soft-404 200).
- **Mobile/lang:** `<meta name="viewport" content="width=device-width, initial-scale=1"/>` and `<html lang="en">` both present live.

---

## 7. Ad placement plan

Only one placement currently exists in the codebase: `components/AdSlot.tsx`, used from `components/BlogPostShell.tsx` (all 30 `/blog/{slug}` routes).

**Safe (verified):**
- `BlogPostShell.tsx` — `<AdSlot slot={...} name="blog-in-article" />`, now positioned directly after the article body and before the engagement bar / comment form (moved this pass, §2.2). Labeled "Advertisement", boxed with top/bottom borders, reserves `minHeightPx` (default 280px) to prevent CLS, renders nothing without a real slot ID, real pub ID, `NEXT_PUBLIC_ADSENSE_ENABLED=true`, an ad-eligible route (`lib/route-policy.ts`), and (once configured) advertising consent.

**Unsafe locations correctly avoided (verified via `lib/route-policy.ts` and component structure — no `AdSlot` calls exist at any of these):**
- Tool pages' interactive widget containers (`ToolClientRenderer.tsx` registry) — no ad slot present near Upload/Compress/Convert/Generate/Download controls.
- `CommentsSection.tsx`'s comment form, `ContactClient.tsx`'s contact form — no ad slot inside any form.
- `/admin/*`, `/api/*` — excluded from `isAdEligiblePath` by design.
- Legal/trust pages (`/privacy-policy`, `/terms-of-service`, etc.) — no `AdSlot` usage; these are correctly ad-free per `route-policy.ts`.

**Recommended future placements (not implemented — a human decision per the task brief, using `AdSlot` as the template):** after the "what it does" introduction on longer tool pages, or between major sections of the longest guides — both satisfy "within substantial explanatory content," away from any button/output/form.

---

## 8. Manual owner checklist

- [ ] **Confirm whether running Google Tag Manager in production today was intentional.** This pass found it live and made the Privacy/Cookie Policy accurately describe that state — but only you know if that's the intended state or a leftover from testing.
- [ ] **Decide on a Google-certified CMP** (or confirm the AdSense-provided GDPR message covers your obligations) before setting `NEXT_PUBLIC_ADSENSE_ENABLED=true` for EEA/UK/Switzerland traffic.
- [ ] **Confirm `NEXT_PUBLIC_ADSENSE_PUB_ID` (`pub-5339334010592024`, live in production `ads.txt`) is actually your account** — this pass observed it live but cannot verify AdSense account ownership from the repo.
- [ ] **Complete AdSense site verification** in the AdSense dashboard (the `google-adsense-account` meta tag already supports this).
- [ ] **Review the Cookie Consent banner copy with legal counsel** for your specific target regions before relying on it for EEA/UK/CH analytics or advertising consent.
- [ ] **Decide on additional `AdSlot` placements** (tool pages, longer guides) and create the corresponding ad units in the AdSense dashboard — only after approval.
- [ ] **Manually test every tool on real mobile and desktop devices/browsers** before applying — this pass verified code paths and live HTML, not rendered pixels on physical devices.
- [ ] **Re-read the Privacy Policy, Cookie Policy, About, Editorial Policy, Terms, and FAQ once more immediately before submitting** the AdSense application, to confirm they still match production behavior at that exact moment.
- [ ] **Submit the AdSense application** — not done, and not something this pass does automatically per the task's explicit instructions.
- [ ] **Publish the real `ads.txt`** — already effectively done (a real pub ID resolves live); just confirm it's correct per the point above.

---

## 9. Commands and validation results

| Command | Result |
|---|---|
| `npm run lint` | 0 errors, 0 warnings (before and after all fixes) |
| `npx tsc --noEmit` | 0 errors (before and after all fixes) |
| `npm run test` (Vitest) | 8 files, 47/47 tests passed (before and after all fixes) |
| `npm run quality:audit` | 0 errors, 0 warnings; 77 known public routes (before and after all fixes) |
| `npm run build` (default env, `NEXT_PUBLIC_GTM_ID` unset) | Succeeded, 96 routes, 0 errors |
| `npm run build` (`NEXT_PUBLIC_GTM_ID=GTM-KW36CVXK`, matching live production) | Succeeded, 96 routes, 0 errors; manually inspected `.next/server/app/privacy-policy.html` and `cookie-policy.html` output to confirm the analytics-active branch renders the corrected, accurate text |
| `npm audit --omit=dev` (production deps) | 2 moderate advisories, both via `postcss` as a transitive dependency inside `next`'s own `node_modules` (not a direct or dev dependency of this project) — fixing requires `next@9.3.3`, a breaking downgrade from `next@15`; correctly left alone, matches prior passes' conclusion |
| Live `curl` checks against `https://www.sounez.com` | 200 OK homepage; correct `robots.txt`/`ads.txt`/`sitemap.xml` (77 URLs); correct canonical/title/meta on a tool and a blog page; correct structured data (no fake ratings); 404 returns real HTTP 404; viewport + lang meta present; **no `adsbygoogle` script anywhere in the homepage HTML**, confirming ads are genuinely off despite a real pub ID and GTM being configured |

---

## 10. Remaining risks

- **Thin/repetitive content:** not found. Every tool and blog page carries distinct, tool-specific editorial content (re-verified this pass at the template level, not just by title).
- **Low organic traffic / limited engagement history:** cannot be assessed from this repo — a real factor in Google's actual review that no code change addresses.
- **Recently created content:** several blog posts and the Smart Packs feature are dated 2026, which is recent by calendar time; whether that reads as "young" to a reviewer depends on factors (backlinks, traffic) outside this codebase's control.
- **Platform-specific content aging:** the three TikTok/Instagram/YouTube growth posts flagged in `CONTENT_AUDIT.md` — not urgent, but will read as stale if left unreviewed long-term.
- **Policy inconsistencies:** the specific one found this pass (§2.1) is fixed and now structurally resistant to recurrence (env-driven, not hardcoded) — but any *future* change to production env vars (enabling reCAPTCHA, adding a new third-party service) should get the same "does the policy still match reality" check before the next AdSense-adjacent review.
- **CMP certification:** still an open, unresolved decision — genuinely blocks safely enabling ads for EEA/UK/CH traffic, not something this pass can close on its own.
- **Accidental-click ad placement:** the one placement that exists (`blog-in-article`) is now positioned safely (§2.2); if more placements are added later, apply the same "after substantial content, away from every interactive control" standard.
- **No guarantee of approval:** repeating the top-line caveat — this pass fixed everything verifiable in code and live behavior, including a real, previously-unflagged live-vs-policy contradiction. Google's actual review still weighs traffic history, domain age, and subjective policy judgment that no engineering pass can control.
