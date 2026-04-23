import { motion } from "framer-motion";
import RevealOnScroll from "../../ui/RevealOnScroll";

const techStackIcons = [
  "React",
  "Next.js",
  "Node.js",
  "Flutter",
  "Python",
  "AWS",
  "Figma",
  "Premiere Pro",
  "After Effects",
  "MongoDB",
  "Docker",
  "TypeScript",
];

const ContactCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient blob */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse, rgba(56,189,248,0.15), rgba(124,58,237,0.08), transparent)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-[10px] font-medium tracking-widest uppercase text-gold border border-gold/30 rounded-full bg-gold/5 mb-4">
              Our Tech Arsenal
            </span>
            <h2 className="font-heading text-h3 font-bold text-text-primary">
              Built With the Best Tools
            </h2>
            <p className="text-text-secondary text-sm mt-2 max-w-md mx-auto">
              We leverage cutting-edge technologies to deliver world-class
              digital solutions.
            </p>
          </div>
        </RevealOnScroll>

        {/* Marquee tech stack */}
        <RevealOnScroll>
          <div className="relative mb-16 overflow-hidden py-4">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10" />

            <div
              className="flex gap-4"
              style={{
                animation: "marquee 30s linear infinite",
                width: "max-content",
              }}
            >
              {[...techStackIcons, ...techStackIcons].map((tech, i) => (
                <div
                  key={`${tech}-${i}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-surface/50 backdrop-blur-sm whitespace-nowrap"
                >
                  <div className="w-2 h-2 rounded-full bg-accent/50" />
                  <span className="text-sm text-text-secondary font-medium">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Bottom CTA Card */}
        <RevealOnScroll>
          <div className="relative rounded-2xl border border-white/10 bg-surface/40 backdrop-blur-sm overflow-hidden">
            {/* Animated border glow */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(56,189,248,0.08), transparent, rgba(124,58,237,0.08))",
              }}
            />

            <div className="relative p-8 md:p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3">
                  Ready to Start Your Project?
                </h3>
                <p className="text-text-secondary text-sm max-w-lg mx-auto mb-8">
                  Join 150+ businesses that trust PostPerfect with their digital
                  transformation. Your next big thing starts with a
                  conversation.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <motion.a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white text-sm font-semibold rounded-full hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-all duration-300"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Now
                  </motion.a>

                  <motion.a
                    href="mailto:hello@postperfect.com"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-8 py-3.5 bg-transparent text-text-primary text-sm font-semibold rounded-full border border-white/15 hover:border-accent/40 hover:text-accent transition-all duration-300"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="1" y="3" width="14" height="10" rx="1.5" />
                      <path d="M1 5l7 4 7-4" />
                    </svg>
                    Send an Email
                  </motion.a>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
                  {[
                    { icon: "🛡️", text: "NDA Protected" },
                    { icon: "⚡", text: "2hr Response" },
                    { icon: "🎯", text: "Free Consultation" },
                    { icon: "🌍", text: "Global Clients" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-1.5">
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-xs text-text-muted">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ContactCTA;
