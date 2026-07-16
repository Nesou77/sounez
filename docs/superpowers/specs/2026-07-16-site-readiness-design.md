# Sounez Site Readiness Design

## Goal

Make Sounez ready for public and advertising-platform review by ensuring it has useful original content, complete trust pages, functional navigation and links, safe media and copy, HTTPS-compatible hosting, and unrestricted crawler access to public routes.

## Scope

The readiness pass covers the current Next.js application and repository-managed deployment configuration. It does not change external hosting-dashboard or firewall settings that are not represented in the repository; those will be reported with exact follow-up actions if live verification exposes a problem.

## Content and trust pages

- Keep the existing guide library and verify that articles contain substantive, distinct, useful information.
- Verify About, Contact, Privacy Policy, and Terms of Service are complete, linked, and indexable.
- Detect placeholder, empty, duplicate, future-dated, misleading, prohibited, pirated, or copyright-infringing content using automated scans plus targeted inspection.
- Verify referenced local media exists. Treat repository-owned artwork as original project media; any third-party media must carry a documented license or be removed.

## Navigation, links, and hosting

- Preserve the responsive mobile navigation and verify its open, close, and link-selection behavior from the implementation and build output.
- Audit internal links against the route inventory and validate the live public site where network access permits.
- Inspect deployment configuration for HTTPS handling, bot restrictions, redirects, and firewall/security rules.

## Crawler policy

`robots.txt` will use a universal `User-agent: *` policy. All public content is allowed. Only `/admin/`, `/api/`, and `/smart-packs/history/` are disallowed. No named search, AI, training, social, or archival crawler receives a separate block.

## Verification

Run the content-quality audit, ESLint, TypeScript checking, and the production build. Inspect generated route behavior and repository configuration. Any requirement that depends on external dashboard state will be explicitly separated from verified repository state.

## Success criteria

- Several detailed, distinct guides are published and reachable.
- About, Contact, Privacy Policy, and Terms pages are substantive and linked.
- No detected placeholder, empty, duplicate, prohibited, misleading, pirated, or infringing page content remains.
- All referenced local media exists or any exception is documented and fixed.
- Mobile navigation is implemented accessibly and all audited internal links resolve.
- Repository deployment configuration is HTTPS-compatible and contains no crawler firewall rules.
- Public crawling is allowed, with exclusions limited to private/admin/API routes.
- Quality audit, lint, type-check, and production build pass.
