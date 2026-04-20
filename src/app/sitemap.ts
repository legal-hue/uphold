import type { MetadataRoute } from "next";

// Skip during static export (Capacitor mobile builds)
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://upheld.co.uk";
  const lastModified = new Date("2026-04-20");
  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/triage`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/triage/employment`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/triage/housing`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/triage/contract`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/triage/creative`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/expert`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
