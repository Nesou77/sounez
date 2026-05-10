import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
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
  title: {
    default: "Sounez — Free Online Tools for Creators, Designers & Productivity",
    template: "%s | Sounez",
  },
  description:
    "Sounez offers free online tools for creators, designers and everyday productivity. QR codes, passwords, image compression, color palettes and more.",
  authors: [{ name: "Sounez" }],
  openGraph: {
    title: "Sounez — Simple Tools. Powerful Results.",
    description:
      "Free, fast and friendly online tools for creators, designers and everyday productivity.",
    type: "website",
    siteName: "Sounez",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sounez",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body>
        <GoogleTagManager />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
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
