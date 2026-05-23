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
  // HSTS — 1 year, include subdomains, preload (submitted to hstspreload.org)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
];

// All tool slugs that previously lived at root level (/{slug}).
// Each entry emits a permanent 301 redirect to /tools/{slug}.
// When new tools are added they start under /tools/ directly — no entry needed here.
const LEGACY_TOOL_SLUGS = [
  "youtube-tags-generator",
  "tiktok-money-calculator",
  "hashtag-generator",
  "color-palette-generator",
  "css-gradient-generator",
  "qr-code-generator",
  "word-counter",
  "password-generator",
  "text-case-converter",
  "image-compressor",
  "ai-caption-generator",
  "bio-generator",
  "calculator",
  "business-name-generator",
  "study-notes-generator",
  "website-idea-generator",
  "resume-generator",
  "png-to-jpg-converter",
  "favicon-generator",
  "svg-blob-generator",
  "font-pairing-tool",
  "image-placeholder-generator",
  "box-shadow-generator",
  "background-pattern-generator",
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 144, 192, 216, 256, 384],
  },
  // Inline critical CSS and defer the rest, eliminating render-blocking CSS (requires `critters` package).
  experimental: {
    optimizeCss: true,
    // Tree-shake large packages so only used icons/components are bundled.
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "date-fns",
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-aspect-ratio",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-context-menu",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-hover-card",
      "@radix-ui/react-label",
      "@radix-ui/react-menubar",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-progress",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slider",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group",
      "@radix-ui/react-tooltip",
    ],
  },
  webpack(config, { isServer }) {
    // Strip core-js polyfills for features our target browsers (Chrome 93+, Safari 15.4+) support natively.
    // Using false in webpack 5 resolve.alias replaces the module with an empty module at build time.
    if (!isServer) {
      Object.assign(config.resolve.alias, {
        "core-js/modules/es.array.at.js": false,
        "core-js/modules/es.array.flat.js": false,
        "core-js/modules/es.array.flat-map.js": false,
        "core-js/modules/es.object.from-entries.js": false,
        "core-js/modules/es.object.has-own.js": false,
        "core-js/modules/es.string.trim-end.js": false,
        "core-js/modules/es.string.trim-start.js": false,
      });
    }
    return config;
  },
  async redirects() {
    return LEGACY_TOOL_SLUGS.map((slug) => ({
      source: `/${slug}`,
      destination: `/tools/${slug}`,
      permanent: true,
    }));
  },

  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Cache static assets for 1 year — safe because filenames are content-hashed
        source: "/(.*\\.(?:webp|png|svg|ico|jpg|woff2))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
