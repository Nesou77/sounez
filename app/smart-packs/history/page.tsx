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
          ← Smart Packs
        </Link>
      </nav>
      <h1 className="text-3xl font-bold">Your pack history</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Generations are tied to this browser via a session cookie. Other devices and browsers will not see the
        same list. We do not show your full brief on this page listing - open a pack to see the result.
      </p>
      <div className="mt-8">
        <SmartPackHistoryClient />
      </div>
    </div>
  );
}
