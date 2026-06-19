"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Languages, ShieldCheck, Wrench } from "lucide-react";
import { useState } from "react";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code2 size={24} />,
    skills: ["Python", "TypeScript", "C++", "Dart"],
    color: "bg-[#E8D8C3]/10 text-[#C7A27C]",
  },
  {
    title: "Web & App Development",
    icon: <Code2 size={24} />,
    skills: ["React", "Next.js", "Node.js", "Flutter", "REST APIs"],
    color: "bg-[#E8D8C3]/10 text-[#C7A27C]",
  },
  {
    title: "Machine Learning",
    icon: <Brain size={24} />,
    skills: [
      "Supervised Learning",
      "Data Preprocessing",
      "Feature Engineering",
      "Model Evaluation",
      "Neural Networks (Basics)"
    ],
    color: "bg-[#E8D8C3]/10 text-[#C7A27C]",
  },
  {
    title: "Natural Language Processing",
    icon: <Languages size={24} />,
    skills: [
      "Text Preprocessing",
      "Tokenization",
      "Transformer Models",
      "Named Entity Recognition",
      "Text Classification"
    ],
    color: "bg-[#E8D8C3]/10 text-[#C7A27C]",
  },
  {
    title: "Cyber Threat Intelligence",
    icon: <ShieldCheck size={24} />,
    skills: ["STIX/TAXII", "MISP", "OSINT", "MITRE ATT&CK"],
    color: "bg-[#E8D8C3]/10 text-[#C7A27C]",
  },
  {
    title: "DevOps & Tools",
    icon: <Wrench size={24} />,
    skills: [
      "Docker",
      "AWS",
      "GitHub Actions",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn"
    ],
    color: "bg-[#E8D8C3]/10 text-[#C7A27C]",
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="skills" className="py-20 sm:py-24 bg-background-primary relative overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg"
          >
            Technical Expertise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground-secondary text-base sm:text-lg max-w-2xl mx-auto"
          >
            A comprehensive set of tools and technologies I use to build robust and intelligent systems.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {skillCategories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ category }: { category: any }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        rotateX: rotate.x, 
        rotateY: rotate.y,
        y: rotate.x !== 0 ? -12 : 0,
        scale: rotate.x !== 0 ? 1.02 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-6 sm:p-8 rounded-2xl bg-background-secondary border border-foreground-primary/5 hover:border-accent/30 transition-all group relative overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(199,162,124,0.1)] transform-gpu"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute top-0 right-0 w-14 h-14 sm:w-16 sm:h-16 bg-accent/5 rounded-bl-[3.5rem] sm:rounded-bl-[4rem] group-hover:bg-accent/10 transition-colors" />
      
      <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
        <motion.div 
          whileHover={{ scale: 1.2, rotate: 10 }}
          className={`p-2.5 sm:p-3 rounded-xl bg-background-primary shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:shadow-accent/10 ${category.color}`}
        >
          {category.icon}
        </motion.div>
        <h3 className="font-bold text-lg sm:text-xl group-hover:text-accent transition-colors duration-300">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {category.skills.map((skill: string) => (
          <motion.span
            key={skill}
            whileHover={{ scale: 1.05, y: -2 }}
            className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-background-primary text-foreground-secondary border border-foreground-primary/5 hover:border-accent/50 hover:text-accent transition-all cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
