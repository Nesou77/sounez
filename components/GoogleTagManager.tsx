import { env } from "@/lib/env";

// Server Component — renders the GTM <noscript> fallback for the <body> opening.
// The GTM <script> is injected by GtmLoader.tsx, which gates on analytics consent.
//
// This <noscript> fallback is intentionally gated only by whether GTM is configured
// (env.gtmId set), not by consent: it exists solely for visitors with JavaScript
// disabled, who by definition cannot interact with the (JS-based) consent banner
// either. Full consent coverage for no-JS visitors would require moving consent
// storage server-side (a cookie read in this component) instead of localStorage —
// see CRAWLER_CHECKLIST.md / ADSENSE_READINESS.md for why that tradeoff (forcing
// dynamic rendering sitewide) was not made in this pass. Renders nothing whenever
// NEXT_PUBLIC_GTM_ID is unset in the current deployment.
export function GoogleTagManager() {
  const gtmId = env.gtmId;
  if (!gtmId) return null;

  // Skip on Vercel preview/development deployments (belt-and-suspenders alongside the
  // runtime hostname guard in GtmLoader.tsx).
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") return null;

  return (
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
