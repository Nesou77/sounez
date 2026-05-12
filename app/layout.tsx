import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { getSiteUrl } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
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
    "Sounez offers free online tools for creators, designers and everyday productivity. QR codes, passwords, image compression, color palettes and more.",
  authors: [{ name: "Sounez" }],
  openGraph: {
    title: "Sounez | Free Online Tools",
    description:
      "Free, fast and friendly online tools for creators, designers and everyday productivity.",
    type: "website",
    siteName: "Sounez",
    locale: "en_US",
    url: "./",
    images: [{ url: "/logo.webp", width: 560, height: 140, alt: "Sounez", type: "image/webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sounez",
    images: [{ url: "/logo.webp", alt: "Sounez" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body>
        <GoogleTagManager />
        {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset">
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
