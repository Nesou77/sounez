"use client";

import { SmartLink as Link } from "@/components/smart-link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/smart-packs", label: "Smart Packs" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <BrandLogo variant="navbar" />

        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground ${
                item.href === "/smart-packs" ? "text-primary" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 hover:bg-muted lg:hidden"
          onClick={() => setMobile(!mobile)}
          aria-expanded={mobile}
          aria-controls="mobile-navigation"
          aria-label={mobile ? "Close menu" : "Open menu"}
        >
          {mobile ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {mobile && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-border bg-background lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobile(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
