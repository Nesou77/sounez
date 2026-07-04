# AdSense Content Policy Checklist

Use this before publishing any new tool, blog post, or Smart Pack. It is a policy-compliance
gate, separate from `docs/adsense-rereview-checklist.md` (which covers deployment/QA steps).

## Prohibited content — confirm none of the following exists on any new or existing page

- [ ] No adult, sexual, or explicit content (including in generated examples/screenshots).
- [ ] No pirated software, cracked keys, copyrighted media, or "how to bypass DRM" instructions.
- [ ] No hacking, malware, exploit, or unauthorized-access instructions.
- [ ] No dangerous, illegal, or restricted products/services (weapons, drugs, counterfeit goods).
- [ ] No misleading claims — especially in AI-tool copy (e.g. no "guaranteed income," "guaranteed
      viral," or unverifiable statistics presented as fact). The TikTok Money Calculator and
      similar estimators must keep explicit "estimate, not guaranteed" framing.
- [ ] No scraped or copied third-party articles. All blog posts must be original, written or
      substantively edited by a real person (see `docs/editorial-policy` / `app/editorial-policy`).
- [ ] No content that facilitates academic dishonesty (Study Notes Generator and study guides must
      keep "study aid, not a substitute for your own work" framing).

## Structural checks for new pages

- [ ] Page has one clear `<h1>` and a logical heading hierarchy (no skipped levels).
- [ ] Page has a unique `<title>` and meta description (no copy-pasted metadata from another page).
- [ ] Page is added to `app/sitemap.ts` if it should be indexable, and to
      `scripts/content-quality-audit.mjs`'s known-route list so the audit script can validate its
      internal links.
- [ ] New tool/blog pages explain: what it does, how to use it, common use cases, limitations, and
      include an FAQ section (tool pages get this via `components/ToolPageSections.tsx`).
- [ ] No ad slots inside forms, upload zones, result panels, or dead-end/thin pages
      (`lib/route-policy.ts` `AD_EXCLUDED_PATHS` should be updated if a new low-content route type
      is introduced).

## Before requesting (re)review

- [ ] Run `npm run quality:audit` — expect 0 errors, 0 warnings.
- [ ] Run `npm run lint` and `npx tsc --noEmit` — expect no errors.
- [ ] Run `npm run build` — expect a clean production build.
- [ ] Spot-check the new/changed page on mobile.
- [ ] Confirm the page is reachable from navigation, footer, or a relevant hub page — no orphan pages.

## Ongoing maintenance

- [ ] Re-review platform-specific guides (TikTok, Instagram, YouTube) periodically — platform
      algorithms and UI change, and stale "how to grow on X" advice reads as inaccurate over time.
- [ ] Re-check `npm audit` before major releases; document any accepted transitive-dependency risk
      in the PR description rather than silently ignoring it.
