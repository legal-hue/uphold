import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Capacitor native builds
  // To build for mobile: npm run build:mobile
  // For web (Vercel): npm run build (default)
  ...(process.env.CAPACITOR === "true" ? { output: "export" } : {}),
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
