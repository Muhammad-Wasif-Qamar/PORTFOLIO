"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const experience = [
  {
    role: "AI Engineer (Project-Based)",
    company: "Academic / Industry Collaboration",
    period: "2025 — Present",
    description: "Developing an NLP-based system for entity and relation extraction from unstructured Cyber Threat Intelligence (CTI) reports as part of an academic and industry-aligned project. Contributing to a modular pipeline combining rule-based methods and machine learning to generate structured intelligence and knowledge graphs.",
    type: "work",
    isCurrent: true,
  },
  {
    role: "AI Intern",
    company: "Developer Hub",
    period: "2024",
    description: "Worked on AI/ML workflows including data preprocessing, model experimentation, and NLP tasks. Gained practical experience in building and testing machine learning pipelines.",
    type: "work",
    isCurrent: false,
  },
  {
    role: "BS Computer Science",
    company: "Riphah International University",
    period: "2022 — Present",
    description: "Focused on AI engineering, full stack development, and intelligent systems. Currently working on a final-year NLP-based project in Cyber Threat Intelligence.",
    type: "edu",
    isCurrent: true,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-24 bg-background-primary relative overflow-hidden">
      <div className="absolute top-1/2 left-0 text-[8rem] sm:text-[12rem] font-bold text-foreground-primary/[0.02] select-none pointer-events-none -ml-12 sm:-ml-20 -translate-y-1/2 -rotate-90">
        JOURNEY
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-lg">Professional Journey</h2>
          <p className="text-body mx-auto">
            A track record of technical learning and project development in AI and Computer Science.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-2 md:left-1/2 top-0 w-[1px] bg-gradient-to-b from-accent/50 via-accent/10 to-transparent transform md:-translate-x-1/2" 
          />

          <div className="space-y-8 sm:space-y-12">
            {experience.map((item, index) => (
              <motion.div
                key={`${item.role}-${index}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row gap-5 sm:gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse text-left md:text-right" : "text-left"
                }`}
              >
                <div className="flex-1 md:w-1/2">
                  <div className={`p-4 sm:p-6 md:p-8 rounded-2xl bg-background-secondary border border-foreground-primary/5 hover:border-accent/20 transition-all group shadow-sm hover:shadow-xl ${
                    index % 2 === 0 ? "md:mr-6 lg:mr-12" : "md:ml-6 lg:ml-12"
                  } ${item.isCurrent ? "ring-1 ring-accent/20" : ""}`}>
                    <div className={`flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 text-accent ${
                      index % 2 === 0 ? "md:justify-end" : "justify-start"
                    }`}>
                      {item.type === "work" ? <Briefcase size={12} /> : <GraduationCap size={12} />}
                      <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">{item.period}</span>
                      {item.isCurrent && (
                        <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-accent/10 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 transition-colors group-hover:text-accent">{item.role}</h3>
                    <p className="text-foreground-primary/70 font-semibold mb-3 sm:mb-4 text-xs sm:text-sm">{item.company}</p>
                    <p className="text-foreground-secondary text-xs sm:text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="absolute left-1 md:left-1/2 md:-translate-x-1/2 top-6 sm:top-8 w-2 h-2 rounded-full bg-accent ring-3 sm:ring-4 ring-background-primary shadow-lg z-10" />

                <div className="flex-1 md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
