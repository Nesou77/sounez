import { SmartLink as Link } from "@/components/smart-link";
import { Twitter, Instagram, Facebook, Youtube } from "lucide-react";
import { FEATURED_TOOLS, CATEGORIES } from "@/data/tools";
import { BrandLogo } from "@/components/BrandLogo";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.56a8.16 8.16 0 004.77 1.52V7.65a4.85 4.85 0 01-1-.96z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function SocialLink({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const cls =
    "grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary min-h-[2.75rem] min-w-[2.75rem]";
  if (external) {
    return (
      <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={label} className={cls}>
      {children}
    </Link>
  );
}

export function Footer() {
  const popular = FEATURED_TOOLS;
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-background to-muted/40">
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1fr_1fr]">
          <div>
            <p className="text-sm font-semibold">Publisher content first</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Sounez pages are built around original explanations, working tools, practical examples,
              FAQs, related guides, and clear privacy notes. Advertising supports the site, but it should
              never replace the page content or block the task you came to complete.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Responsible use</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Generated text, converted files, image descriptions, and estimates are drafts. Review facts,
              rights, accessibility text, platform rules, and sensitive data before you publish, submit,
              print, or send anything.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Helpful policy pages</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              The site includes public pages for contact, privacy, cookies, terms, and copyright. They explain
              who runs Sounez, how tools handle inputs, how ads and cookies work, and how to report a problem.
            </p>
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <BrandLogo variant="footer" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Free tools and Smart Pack workflows for captions, images, PDFs, and small design jobs. Each tool page
            explains who it helps, how to use it, what to check, and how your data is handled.
          </p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
            Use the outputs as drafts. Check important details before publishing, submitting, printing, or sending.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <SocialLink
              href="https://www.tiktok.com/@souneztools?is_from_webapp=1&sender_device=pc"
              label="Sounez on TikTok"
              external
            >
              <TikTokIcon className="h-4 w-4" />
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/souneztools/"
              label="Sounez on Instagram"
              external
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </SocialLink>
            <SocialLink
              href="https://pin.it/45jluYJOT"
              label="Sounez on Pinterest"
              external
            >
              <PinterestIcon className="h-4 w-4" />
            </SocialLink>
            <SocialLink
              href="https://x.com/souneztools"
              label="Sounez on X"
              external
            >
              <Twitter className="h-4 w-4" aria-hidden="true" />
            </SocialLink>
            <SocialLink
              href="https://www.facebook.com/profile.php?id=61589812104461"
              label="Sounez on Facebook"
              external
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </SocialLink>
            <SocialLink
              href="https://www.youtube.com/@Souneztools"
              label="Sounez on YouTube"
              external
            >
              <Youtube className="h-4 w-4" aria-hidden="true" />
            </SocialLink>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 text-sm font-semibold">Popular Tools</p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {popular.map((t) => (
              <li key={t.slug}>
                <Link href={`/tools/${t.slug}`} className="transition hover:text-foreground">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="mb-4 text-sm font-semibold">Tool Categories</p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/tools#${c.slug}`} className="transition hover:text-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tools" className="transition hover:text-foreground">
                All Tools
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 text-sm font-semibold">Company</p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link href="/about" className="transition hover:text-foreground">About</Link></li>
            <li><Link href="/smart-packs" className="transition hover:text-foreground">Smart Packs</Link></li>
            <li><Link href="/blog" className="transition hover:text-foreground">Guides</Link></li>
            <li><Link href="/faq" className="transition hover:text-foreground">FAQ</Link></li>
            <li><Link href="/contact" className="transition hover:text-foreground">Contact</Link></li>
            <li><Link href="/privacy-policy" className="transition hover:text-foreground">Privacy Policy</Link></li>
            <li><Link href="/cookie-policy" className="transition hover:text-foreground">Cookie Policy</Link></li>
            <li><Link href="/terms-of-service" className="transition hover:text-foreground">Terms of Service</Link></li>
            <li><Link href="/dmca" className="transition hover:text-foreground">DMCA / Copyright</Link></li>
            <li>
              <CookieSettingsButton className="transition hover:text-foreground" />
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Sounez. Built by Nesou for makers everywhere.</p>
        <p className="mt-1">
          Sounez is supported by advertising. Ads are served by Google AdSense.{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
