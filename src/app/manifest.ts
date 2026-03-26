import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Upheld - Your Rights, Upheld",
    short_name: "Upheld",
    description:
      "Free legal guidance for UK employees, tenants, and contract disputes. Check your rights, understand your deadlines, and navigate your case step by step.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF7",
    theme_color: "#3D8B5E",
    orientation: "portrait",
    categories: ["legal", "lifestyle", "utilities"],
    icons: [
      {
        src: "/pwa-icon-192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-icon-512",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/pwa-icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
