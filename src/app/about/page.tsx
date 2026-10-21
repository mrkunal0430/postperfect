import type { Metadata } from "next";
import About from "@/views/About";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the PostPerfect team — our story, our values and the people behind the work.",
};

export default function AboutPage() {
  return <About />;
}
