/**
 * Global AdSense Auto Ads snippet.
 * Google Consent Mode defaults to denied in layout.tsx before this script loads.
 */
export function AdSenseScript() {
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID?.trim();

  if (!pubId) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
      crossOrigin="anonymous"
    />
  );
}
