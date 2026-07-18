# AdSense Readiness Report

Date: 2026-07-18

This report does not guarantee AdSense approval. Google's review weighs factors outside this codebase (traffic history, domain age, subjective policy judgment) that no engineering pass can control. It documents the concrete, verifiable technical, editorial, privacy, and usability state of the site as of this pass, and what remains for the owner to decide or provide.

**Context:** this repo already had a substantial AdSense-readiness pass behind it (see `ADSENSE_READINESS.md`, `CONTENT_AUDIT.md`, `CRAWLER_CHECKLIST.md`, dated 2026-07-16) — a working consent-gated ad/analytics architecture, 47 passing tests, and a page-by-page content audit were already in place. This pass re-verified that work against the live code (not just the docs), found and fixed a real class of bug it had missed — several trust/legal pages asserting Sounez is *currently* funded by AdSense while the site itself, correctly, is not — and closed a handful of smaller gaps. Nothing described below duplicates that prior work; it's what was still wrong or missing after re-auditing it.

---

## 1. Summary of changes

**The core bug: inconsistent advertising claims.** `Footer.tsx`, the Privacy Policy, and the Cookie Policy already correctly stated "Sounez does not currently show ads" (conditional on `NEXT_PUBLIC_ADSENSE_ENABLED`). But `/about`, `/editorial-policy`, `/terms-of-service`, `/faq`, and the homepage FAQ/trust-notes (`app/HomeSections.tsx`) all asserted, in the present tense, that Sounez *is* funded by Google AdSense today ("Advertising on the site is served by Google AdSense", "Sounez is supported by advertising through Google AdSense", "Sounez displays advertisements served by Google AdSense", "Sounez uses advertising to support free tools"). Since `NEXT_PUBLIC_ADSENSE_ENABLED` is `false` and no ad has ever rendered, these were false statements a reviewer could easily catch by comparing pages. All six were rewritten to the same conditional pattern: *"Sounez does not currently display advertising. We may use Google AdSense or other advertising services in the future to help support the operation of the website."*

**Privacy Policy expanded**, not rewritten — the existing 15-section policy already correctly described current behavior and named AdSense conditionally in its own section. Added two sections the task brief specifically calls for that weren't yet present: **Section 8, Third-Party Services** (names, without over-specifying implementation details, the categories of vendor the codebase actually calls: hosting/logs, contact-form email delivery, reCAPTCHA spam protection, the AI processing provider behind AI tools, and AdSense) and **Section 14, International Users** (cross-border processing disclosure). Also fixed one internal inconsistency: Section 9 ("How We Use Your Information") listed "Display relevant advertisements" as a current, unconditional use, alongside genuinely active ones — made conditional to match the rest of the document. All subsequent sections renumbered (now 19 sections, 1–19, verified sequential).

**Persistent "Cookie preferences" footer link.** `CookiePreferencesButton.tsx` previously rendered nothing at all while no non-essential script was configured (today's actual state) — meaning the footer had no cookie-settings entry point right now, only once ads/analytics are turned on. The task brief asks for this link to be persistent. It now always renders: when a non-essential script is configured it still reopens the real consent banner; when nothing is configured yet, it's a link into the Cookie Policy's "current status" section (new `#current-status` anchor) explaining why there's nothing to toggle. Either way, a cookie-settings entry point is always in the footer.

**AdSense publisher ID and enabled-flag centralization.** `lib/env.ts` already exported an `env.adsensePubId` getter, but nothing actually used it — `AdSenseScript.tsx`, `AdSlot.tsx`, `app/ads.txt/route.ts`, `app/layout.tsx`, `Footer.tsx`, and `lib/consent.ts` each read `process.env.NEXT_PUBLIC_ADSENSE_PUB_ID` / `NEXT_PUBLIC_ADSENSE_ENABLED` directly. Routed all six through `env.adsensePubId` / new `env.adsenseEnabled`, so the publisher ID and the enabled flag each have exactly one real source of truth. Also removed `env.ts`'s `warnMissing()` call on a missing publisher ID — logging a "missing env var" warning on every request was wrong here, since unset is the correct, expected state pre-approval, not a misconfiguration. Removed the now-fully-unused `warnMissing` helper itself rather than leave dead code.

**Dev/preview safeguard added to the ad script.** `GtmLoader.tsx` already skipped non-production Vercel environments and non-production hostnames as "belt-and-suspenders." `AdSenseScript.tsx` had no equivalent guard. Added both checks to it. Attempted the same on `AdSlot.tsx`, but its existing test suite (`AdSlot.test.tsx`) renders under jsdom, whose default hostname (`localhost`) would make the ad permanently "not on production host" in tests — the strict hostname check would have silently broken two passing, meaningful tests (`renders the labeled ad container once advertising consent is granted`, `stays hidden pending advertising consent, then appears once consent is granted`). Kept only the `VERCEL_ENV` check there, which is inert in the test environment, and left the hostname check exclusively on `AdSenseScript.tsx`, which has no test coverage to conflict with.

---

## 2. Files modified

- `app/about/page.tsx` — fixed the "Advertising on the site is served by Google AdSense" claim; added error-reporting + editorial-policy pointer.
- `app/editorial-policy/page.tsx` — fixed the "Sounez is supported by advertising through Google AdSense" claim.
- `app/terms-of-service/page.tsx` — fixed the "Sounez displays advertisements served by Google AdSense" claim (Section 10).
- `app/faq/page.tsx` — fixed two answers ("Are the tools free?", "Why are there ads?" → "Does Sounez show ads?") that presumed active ads; aligned the cookie-settings answer's wording with the real footer link label.
- `app/HomeSections.tsx` — fixed two homepage claims ("Advertising helps keep core tools available", "Sounez uses advertising to support free tools") that presumed active ads.
- `app/privacy-policy/page.tsx` — added Section 8 (Third-Party Services) and Section 14 (International Users); fixed the ad line in Section 9 (renumbered from 8); renumbered all subsequent sections (19 total, verified sequential).
- `app/cookie-policy/page.tsx` — added `id="current-status"` anchor for the new persistent footer link to target.
- `components/CookiePreferencesButton.tsx` — now always renders (previously rendered nothing pre-launch); links to the Cookie Policy when nothing is configured yet, reopens the real banner otherwise.
- `components/Footer.tsx` — routed its ads-enabled check through `env.adsenseEnabled`.
- `components/AdSenseScript.tsx` — routed through `env.adsensePubId`/`env.adsenseEnabled`; added Vercel-preview/hostname guard.
- `components/AdSlot.tsx` — routed through `env.adsensePubId`/`env.adsenseEnabled`; added a Vercel-preview-only guard (hostname guard deliberately omitted — see §1).
- `app/ads.txt/route.ts` — routed through `env.adsensePubId`.
- `app/layout.tsx` — routed the AdSense verification meta tag and preconnect gating through `env.adsensePubId`/`env.adsenseEnabled`.
- `lib/consent.ts` — routed through `env.adsenseEnabled`.
- `lib/env.ts` — `adsensePubId` no longer warns on missing (see §1); added `adsenseEnabled`; removed the now-unused `warnMissing` helper.

No files were removed. No visual/design changes. No new dependencies.

---

## 3. Advertising inconsistencies found and corrected

| Page | Before | After |
|---|---|---|
| `/about` | "Advertising on the site is served by Google AdSense" | Conditional: not currently displayed, may be added later |
| `/editorial-policy` | "Sounez is supported by advertising through Google AdSense" | Conditional, matching the Privacy Policy's framing |
| `/terms-of-service` §10 | "Sounez displays advertisements served by Google AdSense..." | Conditional, links to Privacy Policy for how it'll be disclosed |
| `/faq` | "Advertising may support the site" *(this one was already fine)* — but "Why are there ads?" presumed ads exist | Renamed to "Does Sounez show ads?"; answer states none run today |
| Homepage FAQ (`HomeSections.tsx`) | "Advertising helps keep core tools available" | "does not currently display advertising... may add... in the future" |
| Homepage trust notes (`HomeSections.tsx`) | "Sounez uses advertising to support free tools" | "does not currently show ads. If advertising is added... it will stay clear of..." |
| Privacy Policy §9 (list item) | "Display relevant advertisements to support the free service" (listed as a current use) | Made explicitly conditional, cross-referenced to §5 |

Pages that were **already correct** and needed no change: `Footer.tsx` (already read the enabled flag conditionally), Privacy Policy §5/§6/§7 (already framed AdSense/analytics as future-conditional), Cookie Policy (already entirely conditional throughout).

No structured data (JSON-LD), metadata, or schema anywhere in the codebase claims AdSense is active — verified by grep across `app/`, `components/`, `lib/`, `data/`. The only schema-adjacent AdSense artifact is the `google-adsense-account` verification `<meta>` tag in `app/layout.tsx`, which Google's own documentation describes as safe to publish before approval (it performs domain-ownership verification only; it does not load a script, set a cookie, or serve an ad).

---

## 4. Privacy and cookie changes

- Privacy Policy: added **Third-Party Services** (§8) and **International Users** (§14) sections; fixed one internal contradiction (§9); all 19 sections renumbered and verified sequential.
- Cookie Policy: no rewrite needed — it already distinguished current (none) vs. future (analytics/advertising) cookie use, named the consent mechanism, and explained withdrawal via the footer link and browser storage clearing. Added only the `#current-status` anchor so the now-persistent footer link has somewhere to point.
- Both policies continue to describe only services actually present in the codebase (verified against `app/api/contact/route.ts`, `.env.example`, and `package.json` dependencies) — no invented data practices.
- Footer.tsx's ads-enabled copy and Privacy/Cookie Policy claims are all now driven from the same `env.adsenseEnabled` source, closing the risk of them silently drifting out of sync again.

---

## 5. Consent-management architecture

Unchanged in mechanism from the prior pass (`lib/consent.ts`, `CookieConsentBanner.tsx`, `AdSenseScript.tsx`, `GtmLoader.tsx`) — re-verified, not rebuilt:

- **Categories:** necessary (implicit, always on), analytics, advertising — matches the brief's model minus a separate "preferences" toggle, because the only "preference" storage on the site today (the helpful-vote flag) isn't tied to consent at all; it's disclosed directly in the Cookie Policy instead.
- **Blocks non-essential scripts before consent:** confirmed — `AdSenseScript.tsx` and `GtmLoader.tsx` both gate on `hasConsent()` before mounting `next/script`.
- **Stores consent choices:** `localStorage`, one JSON record, with a `decidedAt` timestamp.
- **Reopen / withdrawal:** the (now-persistent) "Cookie preferences" footer link dispatches `OPEN_CONSENT_PREFS_EVENT`; re-saving fires `CONSENT_CHANGE_EVENT`, which both script loaders and `AdSlot` listen for live.
- **No dark patterns:** "Accept all," "Reject non-essential," and "Customize" are equally weighted buttons; no pre-ticked non-essential boxes; essential-only checkbox is visibly disabled/always-on rather than hidden.
- **Mobile/desktop, keyboard, ARIA:** the banner is a `role="region"` with `aria-label="Cookie consent"`; all controls are native `<button>`/`<input type="checkbox">` elements (no custom widgets that would need extra keyboard wiring); responsive padding via Tailwind breakpoints.
- **Not a certified CMP:** both `ADSENSE_READINESS.md` and the Cookie Policy itself already state this explicitly and note a Google-certified CMP (or AdSense's own GDPR message) is required before serving ads to EEA/UK/Switzerland traffic. `lib/consent.ts`'s `hasConsent()`/`CONSENT_CHANGE_EVENT` are provider-agnostic, so a certified CMP could replace `CookieConsentBanner.tsx` without touching `AdSenseScript.tsx` or `GtmLoader.tsx`.
- **Fixed this pass:** the footer entry point into this system is now always present (see §1), instead of only appearing once ads/analytics are turned on.

---

## 6. Tool pages improved

No tool page required a content rewrite — `ToolPageSections.tsx` + `lib/tool-editorial.ts` already produce genuinely per-tool content (what it does, features, examples, how-to steps, who it's for, pro tips, common mistakes, privacy note, when-not-to-use, FAQs, related tools/guides) across all 26 tools, confirmed by reading the shared template and spot-checking several `lib/tool-editorial.ts` entries for uniqueness. This pass's tool-page-adjacent changes were the AdSense config-centralization edits to `AdSlot.tsx` (used from `BlogPostShell.tsx`, not currently placed on tool pages).

---

## 7. Guides/templates improved

No blog post required a rewrite this pass (re-verified against the prior `CONTENT_AUDIT.md` findings — still accurate). `BlogPostShell.tsx` already provides author attribution ("by Nesou" + `AuthorCard`), publish/updated dates (`BlogPostDate` + `ContentDates`), related-post and related-tool cross-links, and a consent-gated `AdSlot` placed after the article body, separated from any interactive control. No template changes were needed.

---

## 8. Accessibility and navigation fixes

Re-verified, not modified this pass: `Navbar.tsx` mobile menu has `aria-expanded`, `aria-controls`, `aria-label`, and closes on Escape with focus returned to the toggle (confirmed via source read, matches `Navbar.test.tsx` coverage). `robots.ts` and `route-policy.ts` only disallow `/admin` and `/api`. No broken nav/footer links found. No changes were needed here this pass beyond the new persistent cookie-preferences link (§1/§5), which is itself an accessibility/discoverability improvement.

---

## 9. SEO and technical fixes

- Grepped all of `app/`, `components/`, `lib/`, `data/` for AdSense/advertising mentions in JSON-LD, metadata, and structured data: none found — confirmed no schema overstates ad status.
- `app/robots.ts`, `app/sitemap.ts` reviewed: unchanged, already correct (disallow only `/admin` and `/api`, dynamic sitemap sourced from `data/*.ts`).
- `app/ads.txt/route.ts`: confirmed it never emits a fabricated publisher ID (see §10) and now reads through the centralized `env.adsensePubId`.

---

## 10. ads.txt strategy

`app/ads.txt/route.ts` (a Next.js route handler, not a static file) was already built correctly and needed no functional change, only the config-centralization edit:

- If `NEXT_PUBLIC_ADSENSE_PUB_ID` is unset, it serves a harmless explanatory comment (`# Configure NEXT_PUBLIC_ADSENSE_PUB_ID to publish ads.txt`) — not a blank 404, and not a fabricated authorization line.
- If set, it normalizes whatever ID format is provided (`ca-pub-...`, bare digits, or already `pub-...`) into the one real `google.com, pub-XXXX, DIRECT, f08c47fec0942fa0` line ads.txt requires — no hardcoded or placeholder publisher ID is ever shipped in code.
- `.env.example` documents this with an explicit `TODO(owner): replace with your real ca-pub-... ID once assigned` and a visible placeholder (`ca-pub-XXXXXXXXXXXXXXXXX`) that is obviously not a real ID.

---

## 11. Tests and commands run

| Command | Result |
|---|---|
| `npm run lint` | 0 errors, 0 warnings (1 warning surfaced mid-pass from an edit — fixed by removing the resulting dead code, see §1) |
| `npx tsc --noEmit` | 0 errors |
| `npm run test` (Vitest) | 8 files, 47/47 tests passed |
| `npm run quality:audit` | 0 errors, 0 warnings; 77 known public routes (26 tools, 30 blog posts, 5 Smart Packs + hubs) |
| `npm run build` | Succeeded, 96 routes generated, 0 errors |

No test needed updating — the `AdSlot.test.tsx` and `lib/consent.test.ts` suites already used `vi.stubEnv` on the same underlying `process.env.NEXT_PUBLIC_ADSENSE_*` variables the new `env.ts` getters read, so the centralization change is test-compatible without edits.

---

## 12. Remaining manual actions

- [ ] Apply for AdSense only after this branch (and any further owner changes) is deployed to production.
- [ ] Verify domain ownership in the AdSense account (the `google-adsense-account` meta tag in `app/layout.tsx` supports this once `NEXT_PUBLIC_ADSENSE_PUB_ID` is set).
- [ ] Add the real AdSense publisher ID to `NEXT_PUBLIC_ADSENSE_PUB_ID` only after it is issued — never before.
- [ ] Configure a Google-certified CMP (or confirm the AdSense-provided GDPR message covers your obligations) before setting `NEXT_PUBLIC_ADSENSE_ENABLED=true` for EEA/UK/Switzerland traffic — `CookieConsentBanner.tsx` is functional but not third-party certified.
- [ ] Review Google's current AdSense program policies before launch (they change over time; this pass reflects policy understanding as of 2026-07-18).
- [ ] Monitor Google Search Console after deploy for indexing/usability issues — see `CRAWLER_CHECKLIST.md` for the exact commands to run against the live domain.
- [ ] Manually inspect every tool on real mobile and desktop devices/browsers before applying — this pass verified structure and code paths, not live rendered pixels.
- [ ] Re-read the Privacy Policy, Cookie Policy, About, Editorial Policy, Terms, and FAQ once more immediately before submitting the application, to confirm they still match actual production behavior at that moment (env vars, any last-minute feature changes).
- [ ] Decide whether to add more `AdSlot` placements beyond the existing blog in-article example, and create the corresponding ad units in the AdSense dashboard after approval.

---

## 13. Remaining AdSense-related risks

- **CMP certification is still an open decision**, not an oversight — the built-in banner works and is honest about its own limits (both in the Cookie Policy text and in `ADSENSE_READINESS.md` §6), but a human/legal call is needed before enabling ads for EEA/UK/CH visitors.
- **This report cannot verify hosting-dashboard settings** — Vercel deployment protection, a CDN/WAF rule, or a DNS misconfiguration could all block Googlebot despite correct application code. See `CRAWLER_CHECKLIST.md`.
- **No guarantee of approval** — this pass fixed everything verifiable in code, including a real class of false "we're AdSense-funded" claims that a careful reviewer (human or automated) could have flagged as misleading. Google's review still weighs factors (traffic, domain history, subjective judgment) no code change can address.
- **Platform-specific blog content ages** (TikTok/Instagram/YouTube growth posts) — flagged in the prior `CONTENT_AUDIT.md`, unchanged this pass; recommend periodic manual review, not urgent.

---

## Checklist

| Item | Status |
|---|---|
| Advertising claims consistent across About, Editorial Policy, Terms, FAQ, Footer, Privacy, Cookie Policy, homepage | Complete |
| No schema/metadata claims AdSense is active | Complete |
| Privacy Policy covers data collected, local vs. server processing, logs, cookies, analytics, future ads, personalization, retention, third-party services, user rights, children's privacy, international users, contact, dates | Complete |
| Cookie Policy distinguishes necessary/analytics/advertising/third-party, states current vs. future, explains consent withdrawal | Complete |
| Consent architecture: blocks scripts pre-consent, separates analytics/advertising, stores/reopens/withdraws, no dark patterns | Complete |
| Persistent "Cookie Settings" link in footer | Complete |
| Certified-CMP requirement documented in code/docs (not falsely claimed as certified) | Complete |
| About page covers what/who/tools/privacy/content review/error reporting/future funding/contact | Complete |
| Editorial Policy covers research/verification/review/corrections/dates/COI/advertiser independence/AI disclosure | Complete |
| Tool pages: tool-specific content, no generic filler, accurate technical specifics | Complete (verified, no changes needed) |
| Guides/articles: dates, authorship, internal links, no fabricated citations | Complete (verified, no changes needed) |
| Trust pages present, linked, and consistent (About/Contact/Privacy/Cookie/Terms/Editorial/DMCA) | Complete |
| Navigation, breadcrumb-equivalent, 404/error handling, keyboard/ARIA | Complete (verified, no changes needed) |
| No ad placements near Upload/Convert/Generate/Copy/Download/Submit/Delete controls | Complete |
| SEO: titles, canonicals, OG/Twitter, sitemap, robots.txt, schema accuracy | Complete (verified, no changes needed) |
| ads.txt: no fake publisher ID, safe placeholder, env-var driven | Complete |
| AdSense safeguards: centralized config, consent-gated, dev/preview-safe, no ads on error/empty pages | Complete |
| Lint / type-check / tests / build | Complete (0 errors; 47/47 tests) |
| CMP certified by Google | Needs manual review |
| Live mobile/desktop manual QA of every tool | Needs manual review |
| Legal/regulatory sign-off on consent banner copy for target regions | Needs manual review |
| Real AdSense publisher ID and enabled flag | Blocked (requires AdSense approval first) |
| Dedicated standalone Disclaimer page | Not applicable (substance already distributed across Editorial Policy, Terms, and per-tool disclaimers — a fourth page would duplicate, not add, content) |
