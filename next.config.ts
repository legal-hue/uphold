import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Capacitor native builds
  // To build for mobile: npm run build:mobile
  // For web (Vercel): npm run build (default)
  ...(process.env.CAPACITOR === "true" ? { output: "export" } : {}),
};

export default nextConfig;
