# Content Quality Audit — 2026-07-20

Scope: every one of the 26 tool pages (`lib/tool-editorial.ts`, 814 lines) and all 30 blog posts (`app/blog/*/page.tsx`, ~7,700 lines), read in full — not spot-checked — specifically hunting for thin, repetitive, outdated, inaccurate, or AI-like content, per the task brief. This is a fresh, line-by-line pass; prior audits (`CONTENT_AUDIT.md`, 2026-07-16) had already verified structural uniqueness (no shared boilerplate paragraphs) via the automated `scripts/content-quality-audit.mjs` script. This pass complements that by reading every sentence for factual accuracy and unverifiable claims, which the automated script cannot check.

**Overall finding: the content is genuinely high quality.** No thin pages, no AI-filler, no duplicate titles/descriptions/headings, no shared boilerplate across tool or blog templates. Every tool page has distinct examples, mistakes, FAQs, and privacy notes; every blog post has distinct structure and voice. The issues found were narrow and specific: a handful of unverifiable/fabricated-looking statistics, one structured-data mismatch, and two first-person anecdotes. All are now resolved: the anecdotes could not be confirmed as verified Sounez experience (owner responded "not sure" for both when asked directly), so both were rewritten as neutral, unattributed best-practice advice rather than left as unverifiable claimed results.

---

## 1. Pages changed

| File | What was wrong | Fix |
|---|---|---|
| `app/blog/how-to-write-better-social-media-captions/page.tsx` | **FAQPage JSON-LD/visible-content mismatch.** The `FAQS` array (feeding the FAQPage schema) said one thing for "How long should an Instagram caption be?"; the rendered page body said something different — a fabricated-sounding, uncited claim: *"Research consistently shows that captions between 138 and 150 characters get the highest engagement on Instagram."* This is exactly the kind of schema-vs-content drift that risks a structured-data penalty, and the specific, uncited "research shows X–Y" framing reads as an invented statistic. | Replaced the rendered answer with the same text already in the FAQPage schema (the safer, unsourced-claim-free version), so schema and visible content match again, and the fabricated-looking stat is gone. |
| `app/blog/best-free-tools-for-creators/page.tsx` | An entire "How Sounez tools compare to the alternatives" section made specific, unverifiable factual claims about named competitors — e.g., "RapidTags... shows ads heavily on the free tier," specific feature claims about TubeBuddy, Flick, Later, Squoosh, TinyPNG, Coolors, Adobe Color, and qr-code-generator.com. These cannot be verified from this repo, may already be stale (competitor pricing/features/ad-load change constantly), and are the kind of "inaccurate, exaggerated, or unverifiable statement" the task brief calls out. Also contained a precise-looking but unsourced stat: "WebP... typically 25–34% smaller than an equivalent JPEG." | Rewrote the section to make the same useful comparative point (when a paid, account-based tool is worth it vs. a free browser tool) without asserting specific, unverifiable facts about any named competitor's current pricing, ad behavior, or feature set. Replaced the fabricated WebP percentage with an honest, non-numeric claim ("typically produces a noticeably smaller file"). |
| `app/blog/free-design-tools-for-web-creators/page.tsx` | Same fabricated WebP percentage ("25–34% smaller"). Also a specific, unverifiable Figma pricing claim: "free vs. $12–45/month for a Figma subscription" — Figma's actual current pricing may differ and this repo has no way to keep it current. | Same WebP fix as above. Changed the Figma line to "free vs. a recurring subscription for Figma's paid plans" — keeps the true comparative point (free vs. paid) without a specific price that could go stale or be wrong. |
| `app/blog/image-seo-guide/page.tsx` | Same fabricated WebP percentage ("25–35% smaller than JPG"). | Same fix — non-numeric, honest phrasing. |
| `app/blog/image-optimization-checklist/page.tsx` | Same fabricated WebP percentage ("often 25-35% smaller than JPG"). | Same fix. |

**Note on the WebP percentage:** the same invented-looking "25–35% smaller" stat appeared in four different posts with slightly different numbers each time (25–34%, 25–35%), which is itself a signal it was never sourced from one real benchmark — different numbers for the same claim across pages. All four now use the same honest, non-fabricated phrasing already used correctly elsewhere in the codebase (`lib/tool-editorial.ts`'s image-compressor entry: "WebP often produces the smallest files for photos").

---

## 2. Anecdotes reviewed and rewritten (owner could not confirm as verified experience)

| Page | Section | Resolution |
|---|---|---|
| `app/blog/how-to-grow-on-tiktok/page.tsx` | Was: "What I found when experimenting with TikTok for Sounez" (first-person, ~4 paragraphs) claiming specific results — videos that "got almost no traction," a framing that "outperformed... every time." | Asked the owner directly whether this reflected real, verified experience; answer was "not sure." Rewrote as **"What works for tool and product accounts specifically"** — the same practical guidance (frame around the problem, start mid-task, get niche-specific), now presented as general advice with no claimed first-hand outcome. |
| `app/blog/how-to-grow-instagram-organically/page.tsx` | Was: "What I learned building Sounez's social presence from scratch" (first-person, ~3 paragraphs) — "I tested the obvious approaches... None of them produced meaningful results." | Same question, same "not sure" answer. Rewrote as **"What actually moves the needle when starting from zero"** — same substance (problem-focused content earns saves; bio clarity earns follows), no claimed first-hand outcome, no first-person voice. |

Both rewrites keep the original internal links (`Bio Generator`, etc.) and the same practical substance; they just stop attributing specific, unverifiable outcomes to Sounez's own social accounts. Re-grepped both files afterward for leftover first-person references (`\bI \|I've\|I'm`, etc.) — none remain outside FAQ questions and illustrative example captions ("I made $4,200 last month..."), which are generic hook examples, not claims about Sounez.

One first-person line that was **not** changed: `free-design-tools-for-web-creators`'s "I built them while working on Sounez to solve the same small problems I kept hitting" — this is a claim about *why the tools exist*, not a claimed quantified result, and it's straightforwardly true (Sounez's own tools were, in fact, built by Sounez). Lower risk, left as-is.

---

## 3. What I checked and found already solid (no changes needed)

- **All 26 tool pages** (`lib/tool-editorial.ts`): every `intro`, `whatItDoes`, `whoFor`, `features`, `howTo`, `examples`, `mistakes`, `privacyNote`, `whenNotToUse`, `faqs`, and `proTips` field read individually — no shared boilerplate paragraphs, no generic filler, no fabricated stats or testimonials. The `privacyNote` fields share a common *structure* ("runs/processed entirely in your browser... never sent to Sounez servers") across ~14 browser-only tools, but each names its own specific mechanism (Canvas API, Web Crypto API, on-device AI model) — this is honest repetition of a true shared fact, not templated filler.
- **24 of 30 blog posts** contained no fabricated statistics, no unverifiable competitor claims, and no structured-data mismatches. Math/arithmetic worked through in `simple-online-calculator-guide` was independently re-checked by hand (percentages, mortgage formula, discount math) — all correct.
- **Password/security claims** in `how-to-create-a-strong-password` (GPU crack-time estimates, NIST length-over-complexity guidance) are widely-corroborated security-education facts, properly linked to NIST's own guidelines — not the same risk class as the "Research shows 138–150 characters" claim, which cited vague "research" for a highly specific, hard-to-independently-verify social-platform engagement number.
- **Illustrative cost-savings math** in `best-productivity-tools-for-remote-workers` ("saves $300–600/year") is a transparent calculation from stated assumptions (five $5–10/month tools × 12 months), not an opaque cited statistic — left as-is.
- **Freshness-flagged posts** from the prior audit (`how-to-grow-on-tiktok`, `how-to-write-youtube-descriptions`, `how-to-grow-instagram-organically`) were re-read in full this pass: their platform-guidance content (hooks, hashtags, posting cadence, analytics interpretation) is evergreen best-practice advice, not dated feature-specific claims that would break — the freshness risk is about periodic review, not an active inaccuracy today.
- **`best-free-ai-tools-2026`**'s dated slug is cosmetic (flagged previously, not urgent) — the content itself is evergreen and accurate.

---

## 4. Commands run

| Command | Result |
|---|---|
| `npm run lint` | 0 errors, 0 warnings |
| `npx tsc --noEmit` | 0 errors |
| `npm run quality:audit` | 0 errors, 0 warnings (77 known routes, unchanged) |
| `npm run test` (Vitest) | 8 files, 47/47 tests passed |
| `npm run build` | Succeeded, 96 routes, 0 errors |

All five were run again after every content edit in this pass, not just once at the end.

---

## 5. Remaining risks

- **Platform-specific content aging** — unchanged from prior audits: TikTok/Instagram/YouTube guidance should get a periodic (e.g. semiannual) accuracy check against current platform documentation, not because anything found today is wrong.
- **This audit does not, and cannot, verify claims about the outside world** (Figma's current pricing, TubeBuddy's current feature set, WebP's actual compression ratio on any given image) — where such claims existed, I removed the specific unverifiable numbers rather than trying to re-verify and re-assert them, since re-verifying live third-party pricing/specs is outside what a repository read can confirm and would go stale again regardless.
