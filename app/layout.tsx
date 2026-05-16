import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import dynamic from "next/dynamic";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { getSiteUrl } from "@/lib/site-url";

// Lazy load CookieConsentBanner to improve initial page load
const CookieConsentBanner = dynamic(() => import("@/components/CookieConsentBanner").then(mod => ({ default: mod.CookieConsentBanner })), {
  loading: () => null,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["600", "700", "800"],
  display: "optional",
  preload: true,
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  title: {
    default: "Sounez | Free Online Tools for Creators, Designers and Productivity",
    template: "%s | Sounez",
  },
  description:
    "Free online tools for creators, designers and everyday productivity. QR codes, passwords, image compression, color palettes and more. No account needed.",
  authors: [{ name: "Sounez" }],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Sounez | Free Online Tools",
    description:
      "Free, fast tools for creators, designers and everyday productivity. No account needed.",
    type: "website",
    siteName: "Sounez",
    locale: "en_US",
    url: siteUrl,
    images: [{ url: `${siteUrl}/logo.webp`, width: 560, height: 140, alt: "Sounez", type: "image/webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sounez",
    images: [{ url: `${siteUrl}/logo.webp`, alt: "Sounez" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GTM_ID?.trim() ? (
          <link rel="preconnect" href="https://www.googletagmanager.com" />
        ) : null}
        {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ? (
          <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        ) : null}
        {/* Google Consent Mode v2 — defaults to denied until user accepts */}
        <Script id="consent-defaults" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
        `}</Script>
      </head>
      <body>
        <GoogleTagManager />
        {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset"
          >
            {children}
          </main>
          <Footer />
        </div>
        <CookieConsentBanner />
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast:
                "group rounded-xl border border-border bg-card text-foreground shadow-pop backdrop-blur",
              title: "text-sm font-semibold",
              description: "text-xs text-muted-foreground",
              success: "!border-emerald-500/30",
            },
          }}
        />
      </body>
    </html>
  );
}
