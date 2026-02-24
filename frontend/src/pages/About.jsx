import PageWrapper from '../components/layout/PageWrapper';
import AboutHero from '../components/sections/about/AboutHero';
import Timeline from '../components/sections/about/Timeline';
import TeamGrid from '../components/sections/about/TeamGrid';
import Values from '../components/sections/about/Values';

const About = () => {
  return (
    <PageWrapper>
      <AboutHero />
      <Timeline />
      <TeamGrid />
      <Values />
    </PageWrapper>
  );
};

export default About;
