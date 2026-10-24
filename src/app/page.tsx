import type { Metadata } from "next";
import Home from "@/views/Home";
import { HOME_FAQ } from "@/components/sections/home/data";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://postperfect.in";

const description =
  "Websites, apps, video, branding and marketing from one senior team in Delhi, working with clients worldwide. Fixed quotes, NDA on every engagement.";

export const metadata: Metadata = {
  title: { absolute: "PostPerfect — Design and engineering for brands going global" },
  description,
  alternates: { canonical: "/" },
  openGraph: { title: "PostPerfect — Design and engineering for brands going global", description },
};

// Structured data so search engines can show the studio and its FAQs directly.
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PostPerfect",
    url: SITE,
    logo: `${SITE}/Postperfect_Logo.png`,
    email: "info@postperfect.in",
    telephone: "+91 87500 75080",
    address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
    areaServed: "Worldwide",
    sameAs: ["https://www.linkedin.com/company/postperfecct/", "https://www.instagram.com/post_perfect_agency"],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Home />
    </>
  );
}
