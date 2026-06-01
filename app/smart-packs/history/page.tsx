import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/smart-link";
import { getSiteUrl } from "@/lib/site-url";
import { SmartPackHistoryClient } from "@/components/smart-packs/SmartPackHistoryClient";

export const metadata: Metadata = {
  title: "Smart Pack History | Sounez",
  description: "View recent Smart Pack generations saved on this device.",
  alternates: { canonical: `${getSiteUrl()}/smart-packs/history` },
  robots: { index: false, follow: false },
};

export default function SmartPackHistoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link href="/smart-packs" className="hover:text-foreground">
          Back to Smart Packs
        </Link>
      </nav>

      <h1 className="text-3xl font-bold">Your pack history</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Generations are tied to this browser via a session cookie. Other devices and browsers will not see the
        same list. We do not show your full brief on this page listing - open a pack to see the result.
      </p>

      <section className="mt-6 grid gap-4 rounded-2xl border border-border bg-muted/30 p-5 md:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">What is saved</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Successful Smart Pack results may be saved with the pack type, tone, language, and output so you can
            reopen them from this browser.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">What to check</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Review dates, prices, names, claims, links, and image details before publishing or sending a saved draft.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">How to remove it</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Open a saved result and use Delete to remove it from your history on this device.
          </p>
        </div>
      </section>

      <div className="mt-8">
        <SmartPackHistoryClient />
      </div>

      <section className="mt-10 rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-base font-bold text-foreground">Using saved packs responsibly</h2>
        <p className="mt-2">
          History is meant for convenience, not as a permanent archive. Keep a separate copy of any draft you
          plan to use in a campaign, listing, school project, or client handoff. If a saved pack contains private
          business details, delete it when you no longer need it.
        </p>
        <p className="mt-2">
          For more detail on cookies, storage, AI processing, and deletion requests, read the{" "}
          <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
