"use client";

import { MotionConfig } from "framer-motion";
import PageWrapper from "../components/layout/PageWrapper";
import AboutHero from "../components/sections/about/AboutHero";
import Journey from "../components/sections/about/Journey";
import Principles from "../components/sections/about/Principles";
import Team from "../components/sections/about/Team";
import Studio from "../components/sections/about/Studio";
import FinalCTA from "../components/lab/FinalCTA";

const About = () => (
  <MotionConfig reducedMotion="user">
    <PageWrapper>
      <AboutHero />
      <Journey />
      <Principles />
      <Team />
      <Studio />
      <FinalCTA />
    </PageWrapper>
  </MotionConfig>
);

export default About;
