import type { Metadata } from "next";
import Services from "@/views/Services";

export const metadata: Metadata = {
  title: "Services",
  description: "Website & app development, video editing & animation, branding, marketing and social media management.",
};

export default function ServicesPage() {
  return <Services />;
}
