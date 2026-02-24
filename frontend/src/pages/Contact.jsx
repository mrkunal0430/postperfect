import PageWrapper from "../components/layout/PageWrapper";
import ContactHero from "../components/sections/contact/ContactHero";
import ContactForm from "../components/sections/contact/ContactForm";
import ContactInfo from "../components/sections/contact/ContactInfo";

const Contact = () => {
  return (
    <PageWrapper>
      <ContactHero />
      <section className="py-(--spacing-section)">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Contact;
