import type { Metadata } from "next";
import HomeClient from "@/components/home/HomeClient";

export const metadata: Metadata = {
  title: "Upheld | Free Legal Rights Check for UK Employees, Tenants & Creators",
  description: "Something happened at work, at home, or with a contract? Find out if you have a claim, understand your deadlines, and get a step-by-step action plan. Free.",
  openGraph: {
    title: "Upheld | Free Legal Rights Check",
    description: "Check your rights in 2 minutes. Employment, housing, and contract disputes. Free.",
    url: "https://upheld.co.uk",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Upheld",
            "url": "https://upheld.co.uk",
            "description": "Legal information tool helping UK employees, tenants, and creators understand their rights",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "hello@upheld.co.uk",
              "contactType": "customer support"
            }
          }),
        }}
      />
      <HomeClient />
    </>
  );
}
