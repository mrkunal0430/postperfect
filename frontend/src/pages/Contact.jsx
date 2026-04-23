import PageWrapper from "../components/layout/PageWrapper";
import ContactHero from "../components/sections/contact/ContactHero";
import StepperForm from "../components/sections/contact/StepperForm";
import ContactSidebar from "../components/sections/contact/ContactSidebar";
import ContactChannels from "../components/sections/contact/ContactChannels";
import ContactCTA from "../components/sections/contact/ContactCTA";

const Contact = () => {
  return (
    <PageWrapper>
      {/* Hero with terminal typing, live status */}
      <ContactHero />

      {/* Quick-connect channel cards */}
      <ContactChannels />

      {/* Multi-step form + Sidebar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-16">
            {/* Left: Stepper form with meeting scheduler */}
            <div className="min-w-0">
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 text-[10px] font-medium tracking-widest uppercase text-accent-light border border-accent/30 rounded-full bg-accent/5 mb-4">
                  Project Inquiry
                </span>
                <h2 className="font-heading text-h3 font-bold text-text-primary">
                  Start Your Project
                </h2>
                <p className="text-text-secondary text-sm mt-2">
                  Fill out the details below and we'll get back to you with a
                  tailored proposal.
                </p>
              </div>
              <StepperForm />
            </div>

            {/* Right: Sidebar info */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ContactSidebar />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA with tech stack marquee */}
      <ContactCTA />
    </PageWrapper>
  );
};

export default Contact;
