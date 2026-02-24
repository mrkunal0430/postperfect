import { Link } from "react-router-dom";
import SplitText from "../../ui/SplitText";
import RevealOnScroll from "../../ui/RevealOnScroll";

const ServicesCTA = () => {
  return (
    <section className="py-(--spacing-section) relative overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <SplitText
          className="font-heading text-h2 font-bold text-text-primary"
          as="h2"
        >
          Let's Build Your Next Project
        </SplitText>

        <RevealOnScroll delay={0.2}>
          <p className="mt-6 text-text-secondary text-lg max-w-xl mx-auto">
            Have a project in mind? Let's discuss how our services can bring
            your vision to life.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-light transition-colors duration-300"
            >
              Get a Free Quote
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 border border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white transition-all duration-300"
            >
              About Us
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ServicesCTA;
