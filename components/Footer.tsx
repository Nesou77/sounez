import { SmartLink as Link } from "@/components/smart-link";
import { Github, Twitter, Mail } from "lucide-react";
import { FEATURED_TOOLS, CATEGORIES } from "@/data/tools";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  const popular = FEATURED_TOOLS;
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-background to-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <BrandLogo variant="footer" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Free tools that actually work. No signup, no installs, no clutter. Just open one and use it.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[
              { Icon: Twitter, label: "Sounez on X (Twitter)", href: "https://x.com/sounez" },
              { Icon: Github, label: "Sounez on GitHub", href: "https://github.com/sounez" },
              { Icon: Mail, label: "Contact via email", href: "/contact" },
            ].map(({ Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary min-h-[2.75rem] min-w-[2.75rem]"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </Link>
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
            <li><Link href="/privacy-policy" className="transition hover:text-foreground">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="transition hover:text-foreground">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sounez. Built by Nesou for makers everywhere.
      </div>
    </footer>
  );
}
