import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Finer breakpoints so navbar logo can resolve ~168–216px widths instead of always 384px+.
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 144, 192, 216, 256, 384],
  },
};

export default nextConfig;
