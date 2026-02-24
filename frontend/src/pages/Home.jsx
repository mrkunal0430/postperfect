import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/sections/home/Hero';
import ServicesPreview from '../components/sections/home/ServicesPreview';
import StatsBar from '../components/sections/home/StatsBar';
import Testimonials from '../components/sections/home/Testimonials';
import CallToAction from '../components/sections/home/CallToAction';

const Home = () => {
  return (
    <PageWrapper>
      <Hero />
      <ServicesPreview />
      <StatsBar />
      <Testimonials />
      <CallToAction />
    </PageWrapper>
  );
};

export default Home;
