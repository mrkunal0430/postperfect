"use client";

import { useCallback, useState } from "react";
import { MotionConfig } from "framer-motion";
import PageWrapper from "../components/layout/PageWrapper";
import Spectrum from "../components/sections/services/Spectrum";
import Chapters from "../components/sections/services/Chapters";
import LiveWork from "../components/sections/services/LiveWork";
import Timeline from "../components/sections/services/Timeline";
import Planner from "../components/sections/services/Planner";
import EngagementModels from "../components/sections/services/EngagementModels";
import ServicesFAQ from "../components/sections/services/ServicesFAQ";
import FinalCTA from "../components/lab/FinalCTA";

const Services = () => {
  // Services picked in the chapters or the planner; handed to the contact form.
  const [plan, setPlan] = useState<string[]>([]);
  const toggle = useCallback(
    (id: string) => setPlan((p) => (p.includes(id) ? p.filter((s) => s !== id) : [...p, id])),
    [],
  );

  return (
    <MotionConfig reducedMotion="user">
      <PageWrapper>
        <Spectrum />
        <Chapters plan={plan} onToggle={toggle} />
        <LiveWork />
        <Timeline />
        <Planner plan={plan} onToggle={toggle} />
        <EngagementModels />
        <ServicesFAQ />
        <FinalCTA />
      </PageWrapper>
    </MotionConfig>
  );
};

export default Services;
