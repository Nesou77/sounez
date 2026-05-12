import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control referrer information
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Allow popups for Google sign-in / share flows while keeping same-origin isolation
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  // HSTS — 1 year, include subdomains (add preload only after verifying all subdomains are HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Finer breakpoints so navbar logo can resolve ~168–216px widths instead of always 384px+.
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 144, 192, 216, 256, 384],
  },
  experimental: {
    // Tree-shake large packages so only used icons/components are bundled.
    optimizePackageImports: ["lucide-react", "@radix-ui/react-popover", "recharts"],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
