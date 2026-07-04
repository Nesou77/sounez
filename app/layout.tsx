import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { AdSenseScript } from "@/components/AdSenseScript";
import { getSiteUrl } from "@/lib/site-url";

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
  display: "swap",
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
    "Free online tools for creators, designers and everyday productivity. QR codes, passwords, image compression, color palettes and more. No account needed for most tools.",
  authors: [{ name: "Sounez" }],
  openGraph: {
    title: "Sounez | Free Online Tools",
    description:
      "Practical tools for creators, designers and everyday productivity. No account needed for most tools.",
    type: "website",
    siteName: "Sounez",
    locale: "en_US",
    url: siteUrl,
    images: [{ url: `${siteUrl}/logo.webp`, width: 560, height: 140, alt: "Sounez", type: "image/webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@souneztools",
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
          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        ) : null}
        {/* AdSense site-ownership verification. This meta tag is safe to keep published at all
            times: it only lets Google confirm domain ownership and does not load any script,
            set any cookie, or require consent. */}
        {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ? (
          <meta
            name="google-adsense-account"
            content={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}
          />
        ) : null}
        {/* Preconnect to the ad network only once ads are actually enabled — otherwise this would
            open a connection to Google's ad servers before the owner (or a consent banner) has
            approved that. Gated the same way as the ad script itself in AdSenseScript.tsx. */}
        {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" ? (
          <>
            <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
            <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
          </>
        ) : null}
        {/*
          NEXT_PUBLIC_ADSENSE_ENABLED gates all ad loading (see AdSenseScript.tsx) so the site
          stays cookie-free and ad-free until the owner explicitly turns ads on post-approval.
          TODO(owner): before setting NEXT_PUBLIC_ADSENSE_ENABLED=true for EEA/UK/Switzerland
          traffic, add a Google-certified Consent Management Platform (or the AdSense-provided
          GDPR message) so consent is collected before any ad request or consent-mode signal is
          sent. Nothing in this codebase currently implements that consent flow.
        */}
        {/* GTM head snippet — always in HTML so Google can detect the tag; hostname guard blocks non-production URLs */}
        {process.env.NEXT_PUBLIC_GTM_ID?.trim() ? (
          <Script id="google-gtm-head" strategy="afterInteractive">
            {`(function(){if(window.location.hostname!=='www.sounez.com')return;(window.dataLayer=window.dataLayer||[]).push({'gtm.start':new Date().getTime(),event:'gtm.js'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID!.trim()}';document.head.appendChild(s);})();`}
          </Script>
        ) : null}
        <AdSenseScript />
      </head>
      <body>
        <GoogleTagManager />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 outline-none"
          >
            {children}
          </main>
          <Footer />
        </div>
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
