# AdSense Rereview Checklist

Use this checklist only after deploying the production build.

## Deployment

- [ ] Deploy the latest production build.
- [ ] Confirm the live domain matches `NEXT_PUBLIC_SITE_URL`.
- [ ] Confirm canonical URLs use the production domain.
- [ ] Confirm HTTPS works for all public pages.
- [ ] Confirm no staging, preview, or localhost URLs appear in source.

## Search and Indexation

- [ ] Open `/sitemap.xml` on the live site.
- [ ] Confirm sitemap contains only canonical, indexable public URLs.
- [ ] Confirm `/admin/comments`, `/api/*`, and `/smart-packs/history` are not in the sitemap.
- [ ] Open `/robots.txt` on the live site.
- [ ] Confirm public pages are crawlable.
- [ ] Confirm `/admin/`, `/api/`, and `/smart-packs/history` are disallowed.
- [ ] Submit the updated sitemap in Google Search Console.
- [ ] Inspect key URLs in Search Console:
  - [ ] `/`
  - [ ] `/tools`
  - [ ] one image tool
  - [ ] one AI tool
  - [ ] one utility tool
  - [ ] `/blog`
  - [ ] one article
  - [ ] `/smart-packs`
  - [ ] `/faq`
  - [ ] `/about`
  - [ ] `/privacy-policy`

## Content Quality

- [ ] Confirm homepage copy is visitor-focused and does not mention "thin content" or AdSense review.
- [ ] Confirm tool pages contain unique tool-specific examples, limits, privacy notes, and FAQs.
- [ ] Confirm blog posts no longer show repeated generic disclaimer boxes before the article body.
- [ ] Confirm tool pages no longer show long repeated generic policy blocks.
- [ ] Confirm no page has placeholder text or TODO owner input visible publicly.
- [ ] Confirm year-based titles are either current and reviewed or changed to evergreen wording.
- [ ] Confirm each major page has clear internal links to the next useful page.

## Tool Functionality

- [ ] Test `/tools/pdf-to-word-converter`.
- [ ] Test `/tools/image-compressor`.
- [ ] Test `/tools/png-to-jpg-converter`.
- [ ] Test `/tools/qr-code-generator`.
- [ ] Test `/tools/password-generator`.
- [ ] Test `/tools/word-counter`.
- [ ] Test one design/CSS tool.
- [ ] Test one AI writing tool.
- [ ] Test one Smart Pack.
- [ ] Test mobile layout for each representative tool.
- [ ] Confirm error messages are clear for invalid input.
- [ ] Confirm result/download controls are not confused with ads.

## Trust and Policy Pages

- [ ] Confirm About page loads and author/publisher identity is truthful.
- [ ] Confirm Contact page form works.
- [ ] Confirm Privacy Policy loads.
- [ ] Confirm Cookie Policy loads.
- [ ] Confirm Terms of Service loads.
- [ ] Confirm DMCA page loads.
- [ ] Confirm FAQ page loads and FAQ structured data matches visible content.
- [ ] Confirm `ads.txt` returns the correct AdSense seller line.

## Ads and UX

- [ ] Confirm AdSense verification code remains present if the publisher ID is valid.
- [ ] Confirm ads are visually distinguishable from navigation, tool controls, upload buttons, and download buttons.
- [ ] Confirm no ad appears inside a form, upload zone, result panel, or "dead end" screen.
- [ ] Confirm the site remains usable if ads do not load.
- [ ] Confirm mobile pages are not dominated by ad space above the main content.
- [ ] Confirm cookie consent appears and can be changed from the footer.
- [ ] Confirm no major layout shift happens when ads load.

## Comments and UGC

- [ ] Submit a test comment and confirm it does not appear publicly before approval.
- [ ] Confirm approved comments render as text, not executable HTML.
- [ ] Confirm comment report action works.
- [ ] Confirm admin moderation is not indexable.
- [ ] Confirm spam or promotional comments are not approved.

## Final Checks

- [ ] Run `npm run quality:audit`.
- [ ] Run `npm run lint`.
- [ ] Run `npx tsc --noEmit`.
- [ ] Run `npm run build` after closing other Node processes if Prisma DLL locking occurs.
- [ ] Run `npx next build` as a Next.js-only validation if Prisma generation is already current.
- [ ] Check live pages on desktop and mobile.
- [ ] Request AdSense rereview only after the live site reflects these fixes.
