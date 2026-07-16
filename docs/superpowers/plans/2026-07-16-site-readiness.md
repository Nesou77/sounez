# Sounez Site Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Verify and fix Sounez so its public content, trust pages, media, navigation, links, hosting configuration, and crawler policy meet the approved readiness criteria.

**Architecture:** Keep the existing Next.js App Router structure and central route inventory. Strengthen the repository's content audit for repeatable policy checks, simplify `robots.ts` to one universal crawler rule, and verify repository-managed configuration separately from live hosting state.

**Tech Stack:** Next.js 15, React 19, TypeScript, Node.js audit scripts, ESLint, Render deployment configuration

## Global Constraints

- Preserve all unrelated user changes already present in the working tree.
- Public content must be crawlable by every crawler.
- Only `/admin/`, `/api/`, and `/smart-packs/history/` may be excluded in `robots.txt`.
- Do not claim external firewall or hosting-dashboard state without live evidence.
- Do not introduce new third-party media or dependencies.

---

### Task 1: Crawler Policy Regression Check and Fix

**Files:**
- Modify: `scripts/content-quality-audit.mjs`
- Modify: `app/robots.ts`
- Test: `scripts/content-quality-audit.mjs`

**Interfaces:**
- Consumes: `NOINDEX_PATHS` from `lib/route-policy.ts` through source inspection.
- Produces: a generated Next.js robots policy containing one `userAgent: "*"` rule and private-route exclusions only.

- [ ] **Step 1: Add crawler-policy audit assertions**

Add checks that report an error when `app/robots.ts` contains named crawler user agents or a blanket public-content block, and verify the permitted private prefixes remain represented.

- [ ] **Step 2: Run the audit and confirm the regression is detected**

Run: `npm run quality:audit`

Expected: FAIL with a crawler-specific blocking error referencing `app/robots.ts`.

- [ ] **Step 3: Simplify the robots policy**

Delete all named crawler rules from `app/robots.ts`. Keep the universal rule:

```ts
rules: {
  userAgent: "*",
  allow: "/",
  disallow: NOINDEX_PATHS.map((path) => (path.endsWith("/") ? path : `${path}/`)),
},
```

- [ ] **Step 4: Re-run the audit**

Run: `npm run quality:audit`

Expected: no crawler-policy errors.

- [ ] **Step 5: Commit the crawler policy**

```bash
git add app/robots.ts scripts/content-quality-audit.mjs
git commit -m "fix: allow crawlers on public content"
```

### Task 2: Content, Trust Page, and Media Audit

**Files:**
- Modify: `scripts/content-quality-audit.mjs`
- Modify only if a concrete finding requires it: `app/**/page.tsx`, `data/blog.ts`, `public/blog/*`
- Test: `scripts/content-quality-audit.mjs`

**Interfaces:**
- Consumes: route metadata from `data/blog.ts`, public page files, and media paths referenced in TS/TSX.
- Produces: deterministic errors for missing required pages, placeholder language, missing local media, duplicate metadata, and insufficient guide inventory.

- [ ] **Step 1: Add required-page and guide-inventory checks**

Assert that About, Contact, Privacy Policy, and Terms page files exist and that at least five blog slugs are registered with unique titles and descriptions.

- [ ] **Step 2: Add placeholder and local-media checks**

Scan public TSX content for `under construction`, `coming soon`, `lorem ipsum`, `TBD`, and `TODO`; resolve `/blog/...` and other local image references against `public/` and report missing files.

- [ ] **Step 3: Run the content audit**

Run: `npm run quality:audit`

Expected: each concrete problem is listed with its source file, or the audit reports no issues.

- [ ] **Step 4: Fix only evidence-backed findings**

Remove or complete placeholders, correct broken media references, and make duplicate metadata unique. Do not rewrite substantive articles that pass the checks.

- [ ] **Step 5: Inspect representative guides and policy pages**

Review at least five guide source files plus About, Contact, Privacy Policy, Terms, Editorial Policy, and DMCA pages for useful detail, misleading guarantees, prohibited instructions, piracy, and unsupported third-party-media claims.

- [ ] **Step 6: Re-run the audit**

Run: `npm run quality:audit`

Expected: `Summary: 0 error(s), 0 warning(s).`

- [ ] **Step 7: Commit audit improvements and any findings**

```bash
git add scripts/content-quality-audit.mjs app data public
git commit -m "chore: strengthen public content readiness checks"
```

### Task 3: Navigation, Links, HTTPS, and Hosting Configuration

**Files:**
- Inspect: `components/Navbar.tsx`
- Inspect: `components/Footer.tsx`
- Inspect: `next.config.ts`
- Inspect: `render.yaml`
- Modify only if a concrete finding requires it: the corresponding inspected file
- Test: production route output and live `https://sounez.com`

**Interfaces:**
- Consumes: the route inventory in the content audit and deployment settings in repository configuration.
- Produces: accessible mobile navigation, valid internal targets, and a documented distinction between repository and external-host state.

- [ ] **Step 1: Verify mobile navigation behavior statically**

Confirm the menu button exposes `aria-expanded`, `aria-controls`, and an accessible label; the menu is hidden at desktop width; selecting an item closes it. Fix any missing behavior without changing visual design.

- [ ] **Step 2: Audit internal links**

Run: `npm run quality:audit`

Expected: no unknown internal route targets.

- [ ] **Step 3: Inspect repository hosting configuration**

Search `render.yaml`, `next.config.ts`, middleware, headers, and repository text for crawler blocks, firewall rules, insecure `http://sounez.com` links, or HTTPS-downgrade redirects. Fix any repository-managed conflict.

- [ ] **Step 4: Verify the live site**

Request `https://sounez.com`, `/robots.txt`, `/sitemap.xml`, the four trust pages, the blog hub, and representative guide URLs. Confirm HTTPS succeeds, redirects remain HTTPS, public responses are successful, and the deployed robots policy matches the requirement after deployment.

- [ ] **Step 5: Commit any repository fixes**

```bash
git add components/Navbar.tsx components/Footer.tsx next.config.ts render.yaml
git commit -m "fix: harden navigation and hosting readiness"
```

Skip this commit when inspection requires no changes.

### Task 4: Full Verification and Readiness Report

**Files:**
- Create: `docs/site-readiness-report.md`
- Test: full repository verification suite

**Interfaces:**
- Consumes: results from Tasks 1–3.
- Produces: an evidence-backed readiness report separating verified code state, verified live state, and owner-only external settings.

- [ ] **Step 1: Run the content audit**

Run: `npm run quality:audit`

Expected: 0 errors and 0 warnings.

- [ ] **Step 2: Run ESLint**

Run: `npm run lint`

Expected: exit code 0.

- [ ] **Step 3: Run TypeScript validation**

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 4: Run the production build**

Run: `npm run build`

Expected: successful Next.js production build with public, legal, robots, and sitemap routes generated.

- [ ] **Step 5: Write the readiness report**

Record each original requirement, the exact verification evidence, any fixes made, and any external dashboard check that cannot be proven from the repository. Do not mark deployment-only checks complete before deployment evidence exists.

- [ ] **Step 6: Commit the report**

```bash
git add docs/site-readiness-report.md
git commit -m "docs: record site readiness verification"
```
