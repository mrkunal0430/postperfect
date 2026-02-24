import PageWrapper from '../components/layout/PageWrapper';
import ServicesHero from '../components/sections/services/ServicesHero';
import ServiceGrid from '../components/sections/services/ServiceGrid';
import ProcessSection from '../components/sections/services/ProcessSection';
import WhyChooseUs from '../components/sections/services/WhyChooseUs';
import IndustriesSection from '../components/sections/services/IndustriesSection';
import ServiceDetailAccordion from '../components/sections/services/ServiceDetailAccordion';
import TechMarquee from '../components/sections/services/TechMarquee';
import ServicesCTA from '../components/sections/services/ServicesCTA';

const Services = () => {
  return (
    <PageWrapper>
      {/* 1. Hero — 3D Globe + headline */}
      <ServicesHero />

      {/* 2. Service Bento Grid — 3D tilt holographic cards */}
      <ServiceGrid />

      {/* 3. How We Work — 4-step process */}
      <ProcessSection />

      {/* 4. Why PostPerfect — differentiators */}
      <WhyChooseUs />

      {/* 5. Industries We Serve */}
      <IndustriesSection />

      {/* 6. Deep-Dive Accordion — full service details */}
      <ServiceDetailAccordion />

      {/* 7. Tech Stack Marquee */}
      <TechMarquee />

      {/* 8. CTA */}
      <ServicesCTA />
    </PageWrapper>
  );
};

export default Services;
