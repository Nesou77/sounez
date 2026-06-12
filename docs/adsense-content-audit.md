# AdSense Content Audit

Date: 2026-06-12

Scope: Sounez public App Router routes, dynamic tool routes, static blog routes, Smart Pack routes, trust/legal pages, sitemap, robots, metadata helpers, comments, and shared templates.

## Summary

Most indexable pages have a clear standalone purpose: a working tool, a guide, a category hub, a Smart Pack workflow, or a trust/legal page. The highest-risk issues were not the absence of content, but the way content was presented:

- Shared boilerplate was repeated across many tool and blog pages.
- Some earlier remediation copy was self-referential and reviewer-facing instead of visitor-facing.
- Sitemap `lastModified` values used the current date as a fallback.
- Private/session routes existed and needed explicit noindex/crawl controls.
- Tool social metadata referenced missing `/og/*.webp` files.
- Several evergreen article titles used unnecessary year modifiers.

## Indexation Rules

Indexable:

- Homepage
- Tools index
- Dynamic tool pages under `/tools/[slug]`
- Blog index
- Blog articles
- Category index and category pages
- Smart Packs index
- Smart Pack detail pages
- FAQ
- About
- Contact
- Privacy Policy
- Cookie Policy
- Terms of Service
- DMCA

Noindex / not public inventory:

- `/admin/comments` - private moderation UI
- `/smart-packs/history` - user/browser-specific saved results
- `/api/*` - API endpoints

## Route Inventory

| URL | Type | Indexability | Canonical | Main value | Classification | Notes |
|---|---:|---:|---:|---|---|---|
| `/` | Home | Index | Yes | Entry point, tools, packs, use cases, FAQ | KEEP | Self-referential copy replaced with user workflow content. |
| `/tools` | Tool hub | Index | Yes | Search and category browsing for tools | KEEP | Strong internal links and category context. |
| `/tools/pdf-to-word-converter` | Tool | Index | Yes | PDF to DOCX conversion plus limits/privacy | KEEP | Server-backed tool; privacy note retained. |
| `/tools/background-remover` | Tool | Index | Yes | AI background removal guidance and tool | KEEP | Browser/on-device guidance present. |
| `/tools/image-describer` | Tool | Index | Yes | Alt text/caption generation | KEEP | Server-backed image analysis; review warnings present. |
| `/tools/youtube-tags-generator` | Tool | Index | Yes | YouTube tag generation | KEEP | Needs manual functional test before rereview. |
| `/tools/tiktok-money-calculator` | Tool | Index | Yes | Creator rate estimation | KEEP | Clearly framed as estimate, not guaranteed income. |
| `/tools/hashtag-generator` | Tool | Index | Yes | Hashtag suggestions | KEEP | Output should be edited before use. |
| `/tools/color-palette-generator` | Tool | Index | Yes | Palette generation and copyable colors | KEEP | CSS/design cluster page. |
| `/tools/css-gradient-generator` | Tool | Index | Yes | CSS gradient preview and output | KEEP | Design tool with code output. |
| `/tools/qr-code-generator` | Tool | Index | Yes | QR code image generation | KEEP | Local generation and scan guidance. |
| `/tools/word-counter` | Tool | Index | Yes | Text stats and reading time | KEEP | Browser-local processing. |
| `/tools/password-generator` | Tool | Index | Yes | Strong password generation | KEEP | Browser-local processing; should avoid storing output. |
| `/tools/text-case-converter` | Tool | Index | Yes | Case conversion | KEEP | Browser-local utility. |
| `/tools/image-compressor` | Tool | Index | Yes | Browser-local image compression | KEEP | Strong privacy and batch value. |
| `/tools/ai-caption-generator` | Tool | Index | Yes | AI caption drafts | KEEP | Server-backed AI; output review needed. |
| `/tools/bio-generator` | Tool | Index | Yes | Profile bio drafts | KEEP | Server-backed AI; no fake identity claims. |
| `/tools/calculator` | Tool | Index | Yes | Basic calculator | KEEP | Utility intent is simple but functional. |
| `/tools/business-name-generator` | Tool | Index | Yes | Brand name ideas | KEEP | Trademark/domain limitation stated. |
| `/tools/study-notes-generator` | Tool | Index | Yes | Study note drafts | KEEP | Academic-integrity warnings present. |
| `/tools/website-idea-generator` | Tool | Index | Yes | Website concept ideas | KEEP | Brainstorming, not market validation. |
| `/tools/resume-generator` | Tool | Index | Yes | Resume builder/export | KEEP | Browser-local CV handling. |
| `/tools/png-to-jpg-converter` | Tool | Index | Yes | PNG to JPG conversion | KEEP | Dedicated page has structured HowTo data; OG image fixed. |
| `/tools/favicon-generator` | Tool | Index | Yes | Favicon pack creation | KEEP | Design/web asset tool. |
| `/tools/svg-blob-generator` | Tool | Index | Yes | SVG blob generation | KEEP | CSS/design cluster page. |
| `/tools/font-pairing-tool` | Tool | Index | Yes | Font pairing suggestions | KEEP | Google Fonts privacy note present. |
| `/tools/image-placeholder-generator` | Tool | Index | Yes | Placeholder images | KEEP | Useful for mockups, not production placeholders. |
| `/tools/box-shadow-generator` | Tool | Index | Yes | CSS shadow generation | KEEP | Code-output page. |
| `/tools/background-pattern-generator` | Tool | Index | Yes | CSS/SVG pattern output | KEEP | Code-output page. |
| `/blog` | Blog hub | Index | Yes | Guide discovery and topic overview | KEEP | Maintenance guidance retained. |
| `/blog/best-free-ai-tools-2026` | Blog | Index | Yes | AI tools roundup | IMPROVE | Slug still contains year; title is evergreen. Consider future redirect to evergreen slug. |
| `/blog/best-free-tools-for-creators` | Blog | Index | Yes | Creator toolkit guide | KEEP | Year modifiers removed. |
| `/blog/how-to-grow-on-tiktok` | Blog | Index | Yes | TikTok growth workflow | IMPROVE | Platform guidance can change; manually verify before rereview. |
| `/blog/how-to-compress-images` | Blog | Index | Yes | Image compression guide | KEEP | Strong image cluster support. |
| `/blog/best-color-palettes-for-design` | Blog | Index | Yes | Color palette guide | KEEP | Year modifier removed. |
| `/blog/how-to-create-a-strong-password` | Blog | Index | Yes | Password hygiene guide | KEEP | Security claims should remain conservative. |
| `/blog/how-to-use-qr-codes-for-marketing` | Blog | Index | Yes | QR marketing guide | KEEP | Practical examples. |
| `/blog/best-productivity-tools-for-remote-workers` | Blog | Index | Yes | Remote-work tool stack | KEEP | Orphan year text removed. |
| `/blog/how-to-write-youtube-descriptions` | Blog | Index | Yes | YouTube description guide | IMPROVE | Platform guidance can change; verify against current YouTube docs. |
| `/blog/css-gradients-guide` | Blog | Index | Yes | CSS gradient guide | KEEP | Technical/code article. |
| `/blog/how-to-grow-instagram-organically` | Blog | Index | Yes | Instagram organic growth | IMPROVE | Platform-specific claims need periodic review. |
| `/blog/image-seo-guide` | Blog | Index | Yes | Image SEO guide | KEEP | Strong image cluster page. |
| `/blog/free-design-tools-for-non-designers` | Blog | Index | Yes | Design tools guide | KEEP | Practical tool cluster. |
| `/blog/how-to-write-better-social-media-captions` | Blog | Index | Yes | Caption writing guide | KEEP | AI-as-draft framing. |
| `/blog/how-to-write-a-good-social-media-bio` | Blog | Index | Yes | Bio writing guide | KEEP | Year modifier removed. |
| `/blog/simple-online-calculator-guide` | Blog | Index | Yes | Everyday math guide | KEEP | Supports calculator tool. |
| `/blog/how-to-choose-a-business-name` | Blog | Index | Yes | Naming framework | KEEP | Trademark limitation present. |
| `/blog/how-to-create-effective-study-notes` | Blog | Index | Yes | Study notes guide | KEEP | Academic-use framing. |
| `/blog/how-to-find-website-ideas` | Blog | Index | Yes | Website ideation guide | KEEP | Brainstorming/validation framing. |
| `/blog/how-to-create-a-professional-resume` | Blog | Index | Yes | Resume structure guide | KEEP | Supports resume tool. |
| `/blog/png-vs-jpg-and-how-to-convert-images` | Blog | Index | Yes | Format comparison | KEEP | Strong image cluster support. |
| `/blog/how-to-create-a-favicon-for-your-website` | Blog | Index | Yes | Favicon guide | KEEP | Supports favicon tool. |
| `/blog/how-to-use-svg-blobs-in-web-design` | Blog | Index | Yes | SVG blob guide | KEEP | Design/CSS cluster. |
| `/blog/how-to-choose-font-pairings-for-a-website` | Blog | Index | Yes | Typography guide | KEEP | Supports font tool. |
| `/blog/how-to-use-image-placeholders-in-web-design` | Blog | Index | Yes | Placeholder workflow | KEEP | Practical dev guidance. |
| `/blog/css-box-shadow-guide` | Blog | Index | Yes | CSS shadow guide | KEEP | Technical/code article. |
| `/blog/css-background-patterns-guide` | Blog | Index | Yes | CSS pattern guide | KEEP | Technical/code article. |
| `/blog/free-design-tools-for-web-creators` | Blog | Index | Yes | Web creator tool guide | KEEP | Tool cluster hub. |
| `/categories` | Category hub | Index | Yes | Top-level tool grouping | KEEP | Added value explanation. |
| `/categories/creator-tools` | Category | Index | Yes | Creator workflow tools | KEEP | Use cases, tips, FAQs. |
| `/categories/design-tools` | Category | Index | Yes | Design/CSS workflow tools | KEEP | Use cases, tips, FAQs. |
| `/categories/utility-tools` | Category | Index | Yes | File/text utility tools | KEEP | Use cases, tips, FAQs. |
| `/smart-packs` | Smart Pack hub | Index | Yes | AI workflow pack overview | KEEP | Good standalone explanation. |
| `/smart-packs/social-media-pack` | Smart Pack | Index | Yes | Social media draft workflow | KEEP | Needs human review framing. |
| `/smart-packs/product-listing-pack` | Smart Pack | Index | Yes | Listing copy workflow | KEEP | Product facts and verification emphasized. |
| `/smart-packs/seo-image-pack` | Smart Pack | Index | Yes | Image SEO workflow | KEEP | No image upload required. |
| `/smart-packs/business-launch-pack` | Smart Pack | Index | Yes | Launch copy workflow | KEEP | No legal/business advice claims. |
| `/smart-packs/student-study-pack` | Smart Pack | Index | Yes | Study workflow | KEEP | Academic-integrity framing. |
| `/smart-packs/history` | User-specific | Noindex | Yes | Saved browser-session results | NOINDEX | Removed from sitemap/global footer; robots disallow. |
| `/faq` | Trust/FAQ | Index | Yes | Public FAQ hub | KEEP | Added with visible FAQ JSON-LD. |
| `/about` | Trust | Index | Yes | Publisher identity and purpose | KEEP | Do not invent extra credentials. |
| `/contact` | Trust | Index | Yes | Contact, corrections, bug reports | KEEP | Added improvement-process copy. |
| `/privacy-policy` | Legal | Index | Yes | Data, ads, cookies, storage | KEEP | Keep accessible to reviewers. |
| `/cookie-policy` | Legal | Index | Yes | Cookie and consent explanation | KEEP | Keep accessible to reviewers. |
| `/terms-of-service` | Legal | Index | Yes | Usage terms | KEEP | Keep accessible to reviewers. |
| `/dmca` | Legal | Index | Yes | Copyright/takedown process | KEEP | Keep accessible to reviewers. |
| `/admin/comments` | Admin | Noindex | No public canonical needed | Moderation UI | NOINDEX | Admin layout adds noindex; robots disallow. |
| `/api/*` | API | Not indexable | N/A | Machine endpoints | NOINDEX | Robots disallow. |

## Duplicate / Boilerplate Findings

- Removed repeated blog asides: "Before you use this guide", "What to take away", "What to verify", "What to save", and the generic editorial note.
- Removed repeated tool-page blocks: "Before you copy or download", "If the result looks off", "Content quality and responsible use", and long community standards text.
- Reduced generic related-tool blocks from six plus "explore more" links to a small contextual set.
- Stopped blog pages from automatically filling CTAs with unrelated popular tools when a post does not pass specific `ctaTools`.

## Technical SEO Findings

- Sitemap previously used current date fallback; replaced with stable fallback dates.
- Sitemap excludes noindex/session/admin/API surfaces.
- `/admin/comments` now has page-level noindex via an admin layout.
- `robots.ts` disallows `/admin/`, `/api/`, and `/smart-packs/history` while leaving public CSS, JS, images, and content available.
- Tool Open Graph images pointed to missing `/og/*.webp`; changed to existing `/logo.webp`.
- `best-free-ai-tools-2026` still has a year in the slug. It is not a blocking issue, but a future redirect to an evergreen slug is recommended.

## Trust / E-E-A-T Findings

- Existing About, Contact, Privacy, Cookie, Terms, and DMCA pages are present and linked.
- Author display uses the provided name "Nesou" only. No surname, credentials, address, registration, or fabricated expertise was added.
- Owner should provide the exact public business/author identity if more transparency is desired.

## UX Findings

- Main navigation now includes FAQ.
- User-specific Smart Pack history was removed from global footer navigation.
- Tool and blog templates are less cluttered and less repetitive.
- Comments are supplementary, moderated, and not treated as primary publisher content.

## Remaining Manual Checks

- Test at least five representative tools on mobile and desktop.
- Verify platform-specific social media articles against current official platform guidance before rereview.
- Confirm production `NEXT_PUBLIC_SITE_URL`, AdSense publisher ID, and `ads.txt`.
- Confirm no ad slots are placed inside forms, upload controls, result panels, or dead-end pages.
