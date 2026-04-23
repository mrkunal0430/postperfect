import { motion } from "framer-motion";
import RevealOnScroll from "../../ui/RevealOnScroll";

const channels = [
  {
    name: "WhatsApp",
    desc: "Instant chat with our team",
    response: "< 5 min response",
    color: "#25D366",
    href: "https://wa.me/1234567890",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "Email Us",
    desc: "Detailed project inquiries",
    response: "< 2 hour response",
    color: "#38BDF8",
    href: "mailto:hello@postperfect.com",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 6 10-6" />
      </svg>
    ),
  },
  {
    name: "Call Now",
    desc: "Speak directly with us",
    response: "Available 10AM – 7PM IST",
    color: "#A78BFA",
    href: "tel:+911234567890",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    name: "Live Chat",
    desc: "Chat with us right now",
    response: "Currently Online",
    color: "#10B981",
    href: "#",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" strokeLinecap="round" />
      </svg>
    ),
  },
];

const ContactChannels = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 text-[10px] font-medium tracking-widest uppercase text-violet-light border border-violet/30 rounded-full bg-violet/5 mb-4">
              Quick Connect
            </span>
            <h2 className="font-heading text-h3 font-bold text-text-primary">
              Reach Us Your Way
            </h2>
            <p className="text-text-secondary text-sm mt-2 max-w-md mx-auto">
              No forms needed — pick your preferred channel and start the
              conversation instantly.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((channel, i) => (
            <RevealOnScroll key={channel.name} delay={i * 0.1}>
              <motion.a
                href={channel.href}
                target={channel.name === "WhatsApp" ? "_blank" : undefined}
                rel={
                  channel.name === "WhatsApp"
                    ? "noopener noreferrer"
                    : undefined
                }
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block p-6 rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-sm hover:border-white/20 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${channel.color}10, transparent 70%)`,
                  }}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-lg"
                    style={{
                      backgroundColor: `${channel.color}12`,
                      borderColor: `${channel.color}25`,
                      borderWidth: "1px",
                      color: channel.color,
                    }}
                  >
                    {channel.icon}
                  </div>

                  <h3 className="font-heading text-base font-semibold text-text-primary mb-1">
                    {channel.name}
                  </h3>
                  <p className="text-xs text-text-muted mb-3">{channel.desc}</p>

                  {/* Response time */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: channel.color,
                        boxShadow: `0 0 6px ${channel.color}60`,
                      }}
                    />
                    <span
                      className="text-[10px] font-medium"
                      style={{ color: channel.color }}
                    >
                      {channel.response}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-lg text-text-muted/0 group-hover:text-text-secondary transition-all duration-300">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M1 13L13 1M13 1H5M13 1v8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </motion.a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactChannels;
