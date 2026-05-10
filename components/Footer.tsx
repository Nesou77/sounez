import Link from "next/link";
import { Sparkles, Github, Twitter, Mail } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/data/tools";

export function Footer() {
  const popular = TOOLS.slice(0, 6);
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-background to-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-pop">
              <Sparkles className="h-4 w-4" />
            </span>
            Sounez
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Simple Tools. Powerful Results. A growing collection of free, fast and beautifully simple tools — built for everyone.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[
              { Icon: Twitter, label: "Twitter", href: "#" },
              { Icon: Github, label: "GitHub", href: "#" },
              { Icon: Mail, label: "Email", href: "/contact" },
            ].map(({ Icon, label, href }) => (
              <a key={label} href={href} aria-label={label} className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 text-sm font-semibold">Popular Tools</p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {popular.map((t) => (
              <li key={t.slug}><Link href={`/${t.slug}`} className="transition hover:text-foreground">{t.name}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="mb-4 text-sm font-semibold">Categories</p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {CATEGORIES.map((c) => (
              <li key={c.slug}><Link href={`/categories/${c.slug}`} className="transition hover:text-foreground">{c.name}</Link></li>
            ))}
            <li><Link href="/tools" className="transition hover:text-foreground">All Tools</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 text-sm font-semibold">Company</p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link href="/about" className="transition hover:text-foreground">About</Link></li>
            <li><Link href="/blog" className="transition hover:text-foreground">Blog</Link></li>
            <li><Link href="/contact" className="transition hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sounez. Crafted with care for makers everywhere.
      </div>
    </footer>
  );
}
