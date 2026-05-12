import type { ReactNode } from "react";

type ExternalLinkType = "reference" | "source" | "sponsored" | "affiliate" | "untrusted";

const REL_MAP: Record<ExternalLinkType, string> = {
  reference: "noopener noreferrer",
  source: "noopener noreferrer",
  sponsored: "sponsored noopener noreferrer",
  affiliate: "sponsored noopener noreferrer",
  untrusted: "nofollow noopener noreferrer",
};

/**
 * Safe external link component.
 * - Only renders as a clickable link for HTTPS URLs.
 * - Sets appropriate rel attributes based on link type.
 * - Always opens in a new tab with an accessible label.
 */
export function ExternalLink({
  href,
  children,
  className,
  type = "reference",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  type?: ExternalLinkType;
}) {
  // Only allow HTTPS external URLs
  if (!href.startsWith("https://")) {
    return <span className={className}>{children}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel={REL_MAP[type]}
      className={className}
      aria-label={`${typeof children === "string" ? children : "Link"} (opens in new tab)`}
    >
      {children}
    </a>
  );
}
