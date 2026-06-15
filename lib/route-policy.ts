export const NOINDEX_PATHS = ["/admin", "/api", "/smart-packs/history"] as const;

export const AD_EXCLUDED_PATHS = [
  "/admin",
  "/api",
  "/smart-packs/history",
  "/privacy-policy",
  "/cookie-policy",
  "/terms-of-service",
  "/dmca",
] as const;

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function matchesPathPrefix(pathname: string, prefixes: readonly string[]): boolean {
  const path = normalizePath(pathname);
  return prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export function isIndexablePath(pathname: string): boolean {
  return !matchesPathPrefix(pathname, NOINDEX_PATHS);
}

export function isAdEligiblePath(pathname: string): boolean {
  return isIndexablePath(pathname) && !matchesPathPrefix(pathname, AD_EXCLUDED_PATHS);
}
