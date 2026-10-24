import type { Metadata } from "next";
import Services from "@/views/Services";
import { SERVICES } from "@/utils/constants";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://postperfect.in";

const description =
  "Website & app development, video editing & animation, branding, marketing and social media management, run by one senior team.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: "Services — PostPerfect", description },
};

// Structured data so search engines can list the services and FAQs directly.
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "PostPerfect services",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.shortDesc,
        url: `${SITE}/services/${s.slug}`,
        provider: { "@type": "Organization", name: "PostPerfect" },
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SERVICES.flatMap((s) =>
      (s.faq ?? []).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Services />
    </>
  );
}
