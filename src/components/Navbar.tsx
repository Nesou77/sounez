import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/data/tools";
import { getToolIcon, getCategoryIcon } from "@/lib/tool-icons";

const grouped = {
  "Creator Tools": TOOLS.filter((t) => t.category === "creator-tools"),
  "Design Tools": TOOLS.filter((t) => t.category === "design-tools"),
  "Utility Tools": TOOLS.filter((t) => t.category === "utility-tools"),
};

export function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const close = () => setOpen(null);
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-primary-foreground shadow-pop">
            <Sparkles className="h-4 w-4" />
          </span>
          <span>Sounez</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" onMouseLeave={() => setOpen(null)}>
          <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted">
            Home
          </Link>

          <div className="relative" onMouseEnter={() => setOpen("tools")}>
            <button
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted"
              onClick={() => setOpen(open === "tools" ? null : "tools")}
            >
              Tools <ChevronDown className="h-4 w-4" />
            </button>
            {open === "tools" && (
              <div className="animate-fade-in absolute left-1/2 top-full z-50 mt-2 w-[720px] -translate-x-1/2 rounded-2xl border border-border bg-popover p-6 shadow-pop">
                <div className="grid grid-cols-3 gap-6">
                  {Object.entries(grouped).map(([title, items]) => (
                    <div key={title}>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
                      <ul className="space-y-0.5">
                        {items.map((t) => {
                          const Icon = getToolIcon(t.slug);
                          return (
                            <li key={t.slug}>
                              <a
                                href={`/${t.slug}`}
                                onClick={() => setOpen(null)}
                                className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground/80 transition hover:bg-accent hover:text-accent-foreground"
                              >
                                <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-soft text-primary transition group-hover:scale-110">
                                  <Icon className="h-3.5 w-3.5" />
                                </span>
                                <span>{t.name}</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-5 border-t border-border pt-3 text-right">
                  <Link to="/tools" onClick={() => setOpen(null)} className="text-sm font-medium text-primary hover:underline">
                    View all tools →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => setOpen("cats")}>
            <button
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted"
              onClick={() => setOpen(open === "cats" ? null : "cats")}
            >
              Categories <ChevronDown className="h-4 w-4" />
            </button>
            {open === "cats" && (
              <div className="animate-fade-in absolute left-1/2 top-full z-50 mt-2 w-80 -translate-x-1/2 rounded-2xl border border-border bg-popover p-3 shadow-pop">
                {CATEGORIES.map((c) => {
                  const Icon = getCategoryIcon(c.slug);
                  return (
                    <a
                      key={c.slug}
                      href={`/categories/${c.slug}`}
                      onClick={() => setOpen(null)}
                      className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-accent"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-pop transition group-hover:scale-105">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold">{c.name}</div>
                        <div className="text-xs leading-relaxed text-muted-foreground">{c.description}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <Link to="/blog" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted">Blog</Link>
          <Link to="/about" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted">About</Link>
          <Link to="/contact" className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted">Contact</Link>
        </nav>

        <div className="hidden md:block">
          <Link to="/tools" className="inline-flex items-center rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-pop transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0">
            Explore tools
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMobile(!mobile)} aria-label="Menu">
          {mobile ? <X /> : <Menu />}
        </button>
      </div>

      {mobile && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="space-y-1 px-4 py-3">
            {[
              { to: "/", label: "Home" },
              { to: "/tools", label: "All Tools" },
              { to: "/categories", label: "Categories" },
              { to: "/blog", label: "Blog" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMobile(false)} className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
