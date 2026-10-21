import type { Metadata } from "next";
import Contact from "@/views/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with PostPerfect — tell us what you're building and we'll get back with a tailored proposal.",
};

export default function ContactPage() {
  return <Contact />;
}
