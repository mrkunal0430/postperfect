"use client";

import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/sections/home/Hero';
import LaunchedList from '../components/sections/home/LaunchedList';
import ServicesIndex from '../components/sections/home/ServicesIndex';
import AcrossBorders from '../components/sections/home/AcrossBorders';
import HomeFAQ from '../components/sections/home/HomeFAQ';
import Manifesto from '../components/lab/Manifesto';
import WorkReel from '../components/lab/WorkReel';
import VelocityMarquee from '../components/lab/VelocityMarquee';
import ProcessPath from '../components/lab/ProcessPath';
import FinalCTA from '../components/lab/FinalCTA';

// Order follows a first-time visitor's questions: what you do, proof, how you
// work, whether it fits my time zone, the fine print, then how to start.
const Home = () => {
  return (
    <PageWrapper>
      <Hero />
      <LaunchedList />
      <Manifesto />
      <ServicesIndex />
      <WorkReel />
      <VelocityMarquee />
      <ProcessPath />
      <AcrossBorders />
      <HomeFAQ />
      <FinalCTA />
    </PageWrapper>
  );
};

export default Home;
