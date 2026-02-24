import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TEAM } from "../../../utils/constants";
import SplitText from "../../ui/SplitText";
import RevealOnScroll from "../../ui/RevealOnScroll";

const TeamCard = ({ member, index }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    setTilt({ rotateX: -percentY * 8, rotateY: percentX * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Generate initials from name
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <RevealOnScroll delay={index * 0.1}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        style={{ perspective: 800, transformStyle: "preserve-3d" }}
        className="group relative p-6 rounded-xl bg-surface border border-white/5 hover:border-accent/20 transition-all duration-300 text-center"
      >
        {/* Avatar placeholder */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent-glow/20 flex items-center justify-center mx-auto mb-4 border border-accent/10 group-hover:border-accent/30 transition-colors duration-300">
          <span className="font-heading text-xl font-bold text-accent-light">
            {initials}
          </span>
        </div>

        <h3 className="font-heading text-lg font-semibold text-text-primary">
          {member.name}
        </h3>
        <p className="text-sm text-text-secondary mt-1">{member.role}</p>

        {/* Hover overlay with social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-xl bg-accent/10 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {["LinkedIn", "Twitter"].map((social) => (
            <span
              key={social}
              className="px-3 py-1 text-xs rounded-full border border-accent/30 text-accent-light bg-bg-primary/80 cursor-pointer hover:bg-accent hover:text-white transition-all duration-200"
            >
              {social}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </RevealOnScroll>
  );
};

const TeamGrid = () => {
  return (
    <section className="py-(--spacing-section)">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SplitText
            className="font-heading text-h2 font-bold text-text-primary"
            as="h2"
          >
            Our Team
          </SplitText>
          <RevealOnScroll delay={0.2}>
            <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
              A collective of strategists, designers, and engineers united by
              one goal: your success.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((member, i) => (
            <TeamCard key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;
