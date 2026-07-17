import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const today = new Date().toISOString().slice(0, 10);
const findings = [];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function walk(dir, matcher = () => true) {
  const base = path.join(root, dir);
  if (!fs.existsSync(base)) return [];
  const out = [];
  for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
    const full = path.join(base, entry.name);
    if (entry.isDirectory()) out.push(...walk(path.relative(root, full), matcher));
    else if (matcher(full)) out.push(full);
  }
  return out;
}

function add(level, message, file = "") {
  findings.push({ level, message, file });
}

function matchesAll(text, regex) {
  return [...text.matchAll(regex)].map((m) => m[1]);
}

const toolsText = read("data/tools.ts");
const blogText = read("data/blog.ts");
const packsText = read("data/smartPacks.ts");
const sitemapText = read("app/sitemap.ts");
const robotsText = read("app/robots.ts");
const routePolicyText = read("lib/route-policy.ts");
const packageText = read("package.json");

// Use more specific regexes to correctly separate tool slugs from category slugs.
// Tool entries use: slug: "name", name: "...", description: "...", category: "...",
// Category entries use: slug: "creator-tools", name: "...", description: "..."
const categorySlugs = matchesAll(toolsText, /slug:\s*"([^"]+)"\s*,\s*name:\s*"[^"]+"\s*,\s*description:/g)
  .filter((slug) => slug.endsWith("-tools"));
const toolSlugs = matchesAll(toolsText, /slug:\s*"([^"]+)"/g)
  .filter((slug) => !categorySlugs.includes(slug));
const blogSlugs = matchesAll(blogText, /slug:\s*"([^"]+)"/g);
const packSlugs = matchesAll(packsText, /slug:\s*"([^"]+)"/g);

const routes = new Set([
  "/",
  "/tools",
  "/blog",
  "/categories",
  "/faq",
  "/about",
  "/contact",
  "/privacy-policy",
  "/cookie-policy",
  "/terms-of-service",
  "/dmca",
  "/editorial-policy",
  "/smart-packs",
  ...toolSlugs.map((s) => `/tools/${s}`),
  ...blogSlugs.map((s) => `/blog/${s}`),
  ...packSlugs.map((s) => `/smart-packs/${s}`),
  ...categorySlugs.map((s) => `/categories/${s}`),
]);

const noindexRoutes = new Set(["/admin/comments"]);

if (sitemapText.includes("new Date()")) {
  add("error", "sitemap.ts uses new Date(); lastModified should be stable unless content changed.", "app/sitemap.ts");
}
if (sitemapText.includes(today)) {
  add("warn", `sitemap.ts contains today's date (${today}); verify this is a truthful material update.`, "app/sitemap.ts");
}
for (const route of noindexRoutes) {
  if (sitemapText.includes(route)) {
    add("error", `Noindex/private route appears in sitemap: ${route}`, "app/sitemap.ts");
  }
}
for (const route of ["/admin/", "/api/"]) {
  const routeWithoutTrailingSlash = route.replace(/\/$/, "");
  if (!robotsText.includes(route) && !routePolicyText.includes(routeWithoutTrailingSlash)) {
    add("warn", `robots.ts does not explicitly disallow ${route}`, "app/robots.ts");
  }
}
if (packageText.includes('"lint": "next lint"')) {
  add("error", "package.json still uses removed Next.js lint command; use eslint with the flat config.", "package.json");
}
for (const phrase of ["Built to avoid thin content", "not thin content", "low value content"]) {
  for (const file of walk("app", (item) => item.endsWith(".tsx")).concat(walk("components", (item) => item.endsWith(".tsx")))) {
    const rel = path.relative(root, file).replaceAll("\\", "/");
    if (fs.readFileSync(file, "utf8").toLowerCase().includes(phrase.toLowerCase())) {
      add("error", `Reviewer-facing phrase found: "${phrase}"`, rel);
    }
  }
}

const titleMap = new Map();
const descMap = new Map();
for (const match of blogText.matchAll(/title:\s*"([^"]+)"[\s\S]*?metaDescription:\s*"([^"]+)"/g)) {
  const [, title, desc] = match;
  titleMap.set(title, (titleMap.get(title) ?? 0) + 1);
  descMap.set(desc, (descMap.get(desc) ?? 0) + 1);
}
for (const match of toolsText.matchAll(/seoTitle:\s*"([^"]+)"/g)) {
  titleMap.set(match[1], (titleMap.get(match[1]) ?? 0) + 1);
}
for (const match of toolsText.matchAll(/seoDescription:\s*"([^"]+)"/g)) {
  descMap.set(match[1], (descMap.get(match[1]) ?? 0) + 1);
}
for (const [title, count] of titleMap) {
  if (count > 1) add("warn", `Duplicate title candidate (${count}x): ${title}`);
}
for (const [desc, count] of descMap) {
  if (count > 1) add("warn", `Duplicate meta description candidate (${count}x): ${desc}`);
}

for (const post of blogText.matchAll(/slug:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"/g)) {
  const [, slug, published] = post;
  if (published > today) add("error", `Blog post ${slug} has future publishedAt ${published}`, "data/blog.ts");
}

if (toolSlugs.length > 0 && !fs.existsSync(path.join(root, "app/tools/[slug]/ToolClientRenderer.tsx"))) {
  add("error", "Dynamic tool renderer file is missing.", "app/tools/[slug]/ToolClientRenderer.tsx");
}

const tsxFiles = walk("app", (file) => file.endsWith(".tsx")).concat(
  walk("components", (file) => file.endsWith(".tsx")),
);
const paragraphCounts = new Map();
const internalLinks = new Set();

for (const file of tsxFiles) {
  const rel = path.relative(root, file).replaceAll("\\", "/");
  const text = fs.readFileSync(file, "utf8");
  const h1Count = (text.match(/<h1[\s>]/g) ?? []).length;
  const rendersKnownPageShell =
    /<BlogPostShell|<CategoryPage|<ContactClient|<HomeHero|<ToolsClient|<SmartPacksIndex|<PngToJpgClient/.test(text);
  if (rel.endsWith("/page.tsx") && !rel.includes("[slug]") && !rel.startsWith("app/api/") && h1Count === 0 && !rendersKnownPageShell) {
    add("warn", "Static page file has no visible <h1> in the file; verify it is rendered by an imported component.", rel);
  }
  if (rel.startsWith("app/blog/") && /<h2>\s*Introduction\s*<\/h2>/i.test(text)) {
    add("warn", "Blog post uses generic <h2>Introduction</h2>; replace with a specific heading.", rel);
  }
  if (/Before you use this guide|What to take away|What to verify|What to save|Editorial note/.test(text)) {
    add("warn", "Repeated blog boilerplate phrase found.", rel);
  }
  if (/Before you copy or download|If the result looks off|Content quality and responsible use|Community standards/.test(text)) {
    add("warn", "Repeated tool boilerplate phrase found.", rel);
  }
  for (const href of text.matchAll(/href=["'](\/[^"'#?]+)["']/g)) {
    internalLinks.add(href[1].replace(/\/$/, "") || "/");
  }
  for (const p of text.matchAll(/<p[^>]*>\s*([\s\S]*?)\s*<\/p>/g)) {
    const plain = p[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (plain.length > 140) {
      const key = plain.slice(0, 220);
      const existing = paragraphCounts.get(key) ?? [];
      existing.push(rel);
      paragraphCounts.set(key, existing);
    }
  }
  if (/TODO OWNER INPUT/i.test(text)) {
    add("warn", "Owner-input placeholder found; do not deploy publicly until resolved.", rel);
  }
}

for (const [paragraph, files] of paragraphCounts) {
  const uniqueFiles = [...new Set(files)];
  if (uniqueFiles.length > 3) {
    add("warn", `Repeated paragraph appears in ${uniqueFiles.length} files: ${paragraph.slice(0, 120)}...`);
  }
}

const allowedPrefixes = ["/api", "/blog/", "/tools/", "/categories/", "/smart-packs/"];
for (const href of internalLinks) {
  const looksLikeAsset = /\.(png|jpg|jpeg|webp|svg|ico|txt|xml)$/i.test(href);
  if (
    !looksLikeAsset &&
    !routes.has(href) &&
    !allowedPrefixes.some((prefix) => href.startsWith(prefix)) &&
    !href.startsWith("/_next")
  ) {
    add("warn", `Internal link target not in known route inventory: ${href}`);
  }
}

console.log("Sounez content quality audit");
console.log("============================");
console.log(`Known public route count: ${routes.size}`);
console.log(`Tool routes: ${toolSlugs.length}`);
console.log(`Blog routes: ${blogSlugs.length}`);
console.log(`Smart Pack routes: ${packSlugs.length}`);
console.log("");

if (findings.length === 0) {
  console.log("No issues detected by automated checks.");
} else {
  for (const finding of findings) {
    const loc = finding.file ? ` (${finding.file})` : "";
    console.log(`[${finding.level.toUpperCase()}] ${finding.message}${loc}`);
  }
}

const errors = findings.filter((f) => f.level === "error").length;
const warnings = findings.filter((f) => f.level === "warn").length;
console.log("");
console.log(`Summary: ${errors} error(s), ${warnings} warning(s).`);
process.exitCode = errors > 0 ? 1 : 0;
