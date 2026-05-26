"use client";

import { SmartLink as Link } from "@/components/smart-link";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { TOOLS } from "@/data/tools";
import { sortToolsByPopularity } from "@/lib/popularity";
import { getToolIcon } from "@/lib/tool-icons";
import { BrandLogo } from "@/components/BrandLogo";
import { TOOL_GROUPS, toolsByGroup } from "@/lib/tool-groups";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/smart-packs", label: "Smart Packs" },
  { href: "/tools", label: "Tools", hasMenu: "tools" as const },
  { href: "/categories", label: "Categories", hasMenu: "categories" as const },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const close = () => setOpen(null);
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, []);

  const featuredTools = sortToolsByPopularity(TOOLS.filter((t) => t.featured)).slice(0, 6);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <BrandLogo variant="navbar" />

        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex" onMouseLeave={() => setOpen(null)}>
          {NAV_LINKS.map((item) => {
            if (item.hasMenu === "tools") {
              return (
                <div key={item.href} className="relative" onMouseEnter={() => mounted && setOpen("tools")}>
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
                    onClick={() => setOpen(open === "tools" ? null : "tools")}
                    aria-expanded={open === "tools"}
                    aria-haspopup="menu"
                  >
                    Tools <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </button>
                  {mounted && open === "tools" && (
                    <div className="animate-fade-in absolute left-0 top-full z-50 mt-2 w-[min(100vw-2rem,52rem)] rounded-2xl border border-border bg-popover p-5 shadow-pop lg:left-1/2 lg:-translate-x-1/2">
                      <div className="mb-4 flex items-center justify-between gap-4 border-b border-border pb-3">
                        <p className="text-sm font-semibold">Browse by type</p>
                        <Link href="/tools" onClick={() => setOpen(null)} className="text-xs font-medium text-primary hover:underline">
                          All tools →
                        </Link>
                      </div>
                      <div className="grid max-h-[70vh] gap-6 overflow-y-auto sm:grid-cols-2 lg:grid-cols-4">
                        {TOOL_GROUPS.slice(0, 4).map((g) => (
                          <div key={g.slug}>
                            <Link
                              href={`/tools#${g.slug}`}
                              onClick={() => setOpen(null)}
                              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary"
                            >
                              {g.name}
                            </Link>
                            <ul className="mt-2 space-y-0.5">
                              {toolsByGroup(g.slug).slice(0, 4).map((t) => {
                                const Icon = getToolIcon(t.slug);
                                return (
                                  <li key={t.slug}>
                                    <Link
                                      href={`/tools/${t.slug}`}
                                      onClick={() => setOpen(null)}
                                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-accent"
                                    >
                                      <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                                      <span className="truncate">{t.name}</span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 border-t border-border pt-3">
                        <p className="mb-2 text-xs font-semibold text-muted-foreground">Featured</p>
                        <div className="flex flex-wrap gap-2">
                          {featuredTools.map((t) => (
                            <Link
                              key={t.slug}
                              href={`/tools/${t.slug}`}
                              onClick={() => setOpen(null)}
                              className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted"
                            >
                              {t.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            if (item.hasMenu === "categories") {
              return (
                <div key={item.href} className="relative" onMouseEnter={() => mounted && setOpen("cats")}>
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
                    onClick={() => setOpen(open === "cats" ? null : "cats")}
                    aria-expanded={open === "cats"}
                    aria-haspopup="menu"
                  >
                    Categories <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </button>
                  {mounted && open === "cats" && (
                    <div className="animate-fade-in absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-2xl border border-border bg-popover p-3 shadow-pop">
                      <Link href="/categories/creator-tools" onClick={() => setOpen(null)} className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">Creator tools</Link>
                      <Link href="/categories/design-tools" onClick={() => setOpen(null)} className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">Design tools</Link>
                      <Link href="/categories/utility-tools" onClick={() => setOpen(null)} className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">Utility tools</Link>
                      <Link href="/categories" onClick={() => setOpen(null)} className="mt-2 block border-t border-border px-3 pt-2 text-xs font-medium text-primary hover:underline">
                        All categories →
                      </Link>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground ${
                  item.href === "/smart-packs" ? "text-primary" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/smart-packs"
            className="inline-flex items-center rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5"
          >
            Smart Packs
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 hover:bg-muted lg:hidden"
          onClick={() => setMobile(!mobile)}
          aria-expanded={mobile}
          aria-label={mobile ? "Close menu" : "Open menu"}
        >
          {mobile ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {mobile && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-border bg-background lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobile(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/smart-packs"
              onClick={() => setMobile(false)}
              className="mt-2 block rounded-xl bg-gradient-brand px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Create a Smart Pack
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
