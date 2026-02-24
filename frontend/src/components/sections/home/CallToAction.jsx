import { Link } from "react-router-dom";
import SplitText from "../../ui/SplitText";
import RevealOnScroll from "../../ui/RevealOnScroll";

const CallToAction = () => {
  return (
    <section className="py-(--spacing-section) relative overflow-hidden">
      {/* Static gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(135deg, rgba(181,138,93,0.12) 0%, rgba(91,155,245,0.08) 25%, rgba(34,211,238,0.05) 50%, rgba(181,138,93,0.08) 75%, rgba(212,169,122,0.06) 100%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <SplitText
          className="font-heading text-h1 font-bold text-text-primary"
          as="h2"
          staggerDelay={0.02}
        >
          Ready to build something extraordinary?
        </SplitText>

        <RevealOnScroll delay={0.3}>
          <p className="mt-6 text-text-secondary text-body-lg max-w-2xl mx-auto">
            Let&apos;s turn your vision into reality. Whether it&apos;s a
            website, an app, or an entire digital ecosystem — we&apos;re ready.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.5}>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-light transition-colors duration-300"
            >
              Start a Project
            </Link>
            <Link
              to="/services"
              className="px-8 py-3.5 border border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white transition-all duration-300"
            >
              View Services
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default CallToAction;
