import { motion } from "framer-motion";
import RevealOnScroll from "../../ui/RevealOnScroll";
import SplitText from "../../ui/SplitText";

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    description:
      "PostPerfect was founded with a mission to deliver digital excellence without compromise.",
  },
  {
    year: "2021",
    title: "First 25 Clients",
    description:
      "Expanded our service offering and built lasting partnerships with clients across 5 countries.",
  },
  {
    year: "2022",
    title: "Team Growth",
    description:
      "Grew to 20+ team members, adding specialized talent in video, marketing, and ERP solutions.",
  },
  {
    year: "2023",
    title: "Global Expansion",
    description:
      "Launched operations across three continents, serving enterprise clients and ambitious startups alike.",
  },
  {
    year: "2024",
    title: "100+ Projects",
    description:
      "Crossed the 100-project milestone with a 99% client satisfaction rate and zero project failures.",
  },
  {
    year: "2025",
    title: "Innovation Lab",
    description:
      "Launched our R&D division, investing in AI-powered tools and next-gen development frameworks.",
  },
];

const Timeline = () => {
  return (
    <section className="py-(--spacing-section)">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SplitText
            className="font-heading text-h2 font-bold text-text-primary"
            as="h2"
          >
            Our Journey
          </SplitText>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-[0.5px]" />

          {milestones.map((milestone, i) => {
            const isLeft = i % 2 === 0;
            return (
              <RevealOnScroll
                key={i}
                direction={isLeft ? "left" : "right"}
                delay={i * 0.1}
                className="relative mb-12 last:mb-0"
              >
                <div
                  className={`flex items-start gap-8 ${
                    isLeft
                      ? "md:flex-row md:text-right"
                      : "md:flex-row-reverse md:text-left"
                  } flex-row text-left`}
                >
                  {/* Content */}
                  <div className="flex-1 pl-12 md:pl-0">
                    <span className="text-sm font-heading font-bold text-accent-light">
                      {milestone.year}
                    </span>
                    <h3 className="font-heading text-xl font-semibold text-text-primary mt-1">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Dot on line */}
                  <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 -translate-x-1/2 rounded-full bg-accent border-2 border-bg-primary z-10" />

                  {/* Spacer for the other side */}
                  <div className="hidden md:block flex-1" />
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
