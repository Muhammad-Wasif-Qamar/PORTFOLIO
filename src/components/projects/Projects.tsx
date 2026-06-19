"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight, Brain, Shield, Code, Database, Cpu, Activity, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const projects = [
  {
    title: "NER & Relation Extraction from Unstructured CTI Reports",
    status: "Work in Progress",
    description: "Developing an intelligent NLP pipeline to extract entities and relationships from unstructured Cyber Threat Intelligence (CTI) reports. The system combines rule-based methods with machine learning models to transform raw threat data into structured intelligence and knowledge graphs for advanced analysis.",
    pipeline: [
      "Unstructured CTI Reports",
      "Text Preprocessing & Normalization",
      "Hybrid NLP Pipeline (Rule-based + NER Model)",
      "Entity Extraction (IOCs, Threat Actors, Malware)",
      "Relation Extraction",
      "Structured Intelligence Output",
      "Knowledge Graph Construction"
    ],
    tags: ["Python", "NLP", "Transformers", "spaCy", "Knowledge Graphs"],
    github: null,
    link: null,
    gradient: "from-[#E8D8C3] to-[#C7A27C]",
    icon: <Brain className="text-[#A67B5B]" size={20} />,
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-24 bg-background-secondary overflow-hidden relative">
      <div className="absolute top-0 right-0 text-[10rem] sm:text-[15rem] font-bold text-foreground-primary/[0.02] select-none pointer-events-none -mr-24 sm:-mr-40 -mt-10 sm:-mt-20">
        PROJECTS
      </div>

      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="heading-lg"
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-body"
            >
              A selection of my technical work in AI engineering and full-stack development.
            </motion.p>
          </div>
          <Link 
            href="https://github.com/Muhammad-Wasif-Qamar"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-foreground-primary font-medium hover:text-accent transition-colors"
          >
            <span className="relative">
              View all on GitHub
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={18} />
            </motion.div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        handleMouseLeave();
      }}
      animate={{ 
        rotateX: rotate.x, 
        rotateY: rotate.y,
        scale: rotate.x !== 0 ? 1.02 : 1,
        y: rotate.x !== 0 ? -10 : 0
      }}
      className="group bg-background-primary rounded-3xl border border-foreground-primary/5 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(199,162,124,0.12)] flex flex-col transform-gpu relative"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/20 transition-colors duration-500 rounded-3xl pointer-events-none z-20" />
      
      <div className={`h-32 sm:h-40 bg-gradient-to-br ${project.gradient} p-5 sm:p-8 flex items-end relative overflow-hidden transition-all duration-700`}>
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-accent/10 rounded-full blur-3xl -mr-10 sm:-mr-16 -mt-10 sm:-mt-16 group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute inset-0 bg-background-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex flex-col gap-2.5 sm:gap-3 z-10 w-full">
          <div className="flex justify-between items-start w-full">
            <div className="p-1.5 sm:p-2 rounded-lg bg-background-primary/80 backdrop-blur-sm border border-foreground-primary/5 shadow-sm group-hover:scale-110 transition-transform">
              {project.icon}
            </div>
            {project.status && (
              <div className="px-2.5 sm:px-3 py-1 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-accent">{project.status}</span>
              </div>
            )}
          </div>
          <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground-primary">{project.title}</h3>
        </div>
      </div>

      <div className="p-5 sm:p-8 flex flex-col flex-grow relative z-10">
        <p className="text-foreground-secondary mb-4 sm:mb-6 leading-relaxed group-hover:text-foreground-primary transition-colors text-sm sm:text-base">
          {project.description}
        </p>

        {project.pipeline && (
          <div className="mb-5 sm:mb-8 space-y-2.5 sm:space-y-3">
            <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
              <Activity size={12} />
              Intelligence Pipeline
            </h4>
            <div className="space-y-1.5 sm:space-y-2">
              {project.pipeline.map((step: string, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-2.5 sm:gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                  <span className="text-[11px] sm:text-xs text-foreground-secondary/80 font-medium">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-8">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-md bg-background-secondary text-foreground-secondary/70 border border-foreground-primary/5 group-hover:border-accent/30 group-hover:text-accent transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 sm:gap-6 mt-auto">
          {project.github ? (
            <Link
              href={project.github}
              target="_blank"
              className="flex items-center gap-2 text-xs sm:text-sm font-bold hover:text-accent transition-all group/link"
            >
              <motion.div whileHover={{ rotate: 15 }}>
                <Github size={14} />
              </motion.div>
              <span className="relative">
                Source Code
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover/link:w-full transition-all duration-300" />
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground-secondary/50 cursor-not-allowed">
              <Github size={14} />
              <span>Repository: Coming Soon</span>
            </div>
          )}

          {project.link ? (
            <Link
              href={project.link}
              target="_blank"
              className="flex items-center gap-2 text-xs sm:text-sm font-bold hover:text-accent transition-all group/link"
            >
              <motion.div whileHover={{ scale: 1.1, x: 2, y: -2 }}>
                <ExternalLink size={14} />
              </motion.div>
              <span className="relative">
                Live Demo
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover/link:w-full transition-all duration-300" />
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground-secondary/50 cursor-not-allowed">
              <Info size={14} />
              <span>Demo available soon</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
