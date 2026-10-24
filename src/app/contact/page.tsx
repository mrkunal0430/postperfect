import type { Metadata } from "next";
import Contact from "@/views/Contact";
import { SERVICES } from "@/utils/constants";
import { STUDIO } from "@/utils/studio";
import { CONTACT_FAQ } from "@/components/sections/contact/faq";

const description =
  "Send PostPerfect a project brief or reach the team on WhatsApp, email or phone. Free first consultation, replies within 2 hours in studio hours.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact — PostPerfect", description },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PostPerfect",
    email: STUDIO.email,
    telephone: STUDIO.phone,
    address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
    sameAs: STUDIO.socials.map((s) => s.href),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CONTACT_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

type Props = { searchParams: Promise<{ services?: string | string[] }> };

// ?services=a,b pre-selects services in the form (sent by the services page planner).
export default async function ContactPage({ searchParams }: Props) {
  const { services } = await searchParams;
  const ids = (Array.isArray(services) ? services.join(",") : services ?? "").split(",");
  const initialServices = SERVICES.map((s) => s.id).filter((id) => ids.includes(id));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Contact initialServices={initialServices} />
    </>
  );
}
