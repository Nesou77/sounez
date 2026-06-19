// Server Component — renders the GTM <noscript> fallback for the <body> opening.
// The GTM <script> is injected in <head> via layout.tsx.
export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  if (!gtmId) return null;

  // Skip on Vercel preview/development deployments (belt-and-suspenders alongside the
  // runtime hostname guard in the head script).
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
