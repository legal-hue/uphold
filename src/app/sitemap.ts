import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://upheld.co.uk";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/triage`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/triage/employment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/triage/housing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/triage/contract`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/triage/creative`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/expert`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
