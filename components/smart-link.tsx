import NextLink from "next/link";
import type { ComponentProps } from "react";

type SmartLinkProps = ComponentProps<typeof NextLink>;

function isExternalHref(href: SmartLinkProps["href"]): boolean {
  if (typeof href === "string") {
    const t = href.trim();
    return /^https?:\/\//i.test(t) || t.startsWith("//");
  }
  if (!href || typeof href !== "object") return false;
  const pathname = typeof href.pathname === "string" ? href.pathname.trim() : "";
  if (pathname.startsWith("//") || /^https?:\/\//i.test(pathname)) return true;
  const r = href as { hostname?: string; host?: string };
  return !!(r.hostname?.trim() ?? r.host);
}

function mergedExternalRel(existing?: string | null): string {
  const ids = new Set<string>(["noopener", "noreferrer"]);
  existing
    ?.split(/\s+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .forEach((x) => ids.add(x));
  return [...ids].join(" ");
}

/**
 * Next.js `Link` that opens same-origin navigations normally and sends `http:` / `https:` /
 * protocol-relative URLs to a new tab with safe `rel`.
 */
export function SmartLink({
  prefetch,
  target,
  rel,
  href,
  ...rest
}: SmartLinkProps) {
  const external = isExternalHref(href);

  return (
    <NextLink
      href={href}
      prefetch={external ? false : prefetch}
      target={external ? "_blank" : target}
      rel={external ? mergedExternalRel(rel ?? undefined) : rel ?? undefined}
      {...rest}
    />
  );
}
