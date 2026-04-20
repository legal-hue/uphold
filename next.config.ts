import type { NextConfig } from "next";

const isMobile = process.env.CAPACITOR === "true";

const nextConfig: NextConfig = {
  // Static export for Capacitor native builds
  // To build for mobile: npm run build:mobile
  // For web (Vercel): npm run build (default)
  ...(isMobile ? { output: "export" } : {}),
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
