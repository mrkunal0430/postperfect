import type { Metadata } from "next";
import ForgeHero from "@/components/lab/ForgeHero";
import Manifesto from "@/components/lab/Manifesto";
import WorkReel from "@/components/lab/WorkReel";
import VelocityMarquee from "@/components/lab/VelocityMarquee";
import ProcessPath from "@/components/lab/ProcessPath";
import FinalCTA from "@/components/lab/FinalCTA";

export const metadata: Metadata = {
  title: "Lab — Homepage prototype",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return (
    <ForgeHero>
      <Manifesto />
      <WorkReel />
      <VelocityMarquee />
      <ProcessPath />
      <FinalCTA withContact />
    </ForgeHero>
  );
}
