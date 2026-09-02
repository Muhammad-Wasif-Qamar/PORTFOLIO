"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Mail, Sparkles, Brain, Code2, GitGraph } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import DataNetworkBackground from "@/components/animations/DataNetworkBackground";

const focusAreas = [
  {
    icon: Brain,
    title: "AI Engineering",
    desc: "NLP pipelines and machine learning models that turn raw, unstructured data into structured intelligence.",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    desc: "Modern, scalable web applications built with Next.js, React, and robust backend APIs.",
  },
  {
    icon: GitGraph,
    title: "Knowledge Graphs",
    desc: "Entity and relation extraction that maps hidden connections inside complex datasets.",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const [resumeStatus, setResumeStatus] = useState<"loading" | "available" | "missing">("loading");

  useEffect(() => {
    const checkResume = async () => {
      try {
        const response = await fetch("/resume/resume.pdf", { method: "HEAD" });
        if (response.ok) {
          setResumeStatus("available");
        } else {
          setResumeStatus("missing");
          console.warn("Resume file not found. Please place your file in /public/resume/resume.pdf");
        }
      } catch (err) {
        setResumeStatus("missing");
        console.warn("Error checking resume file:", err);
      }
    };
    checkResume();

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty("--mouse-x", `${clientX}px`);
      containerRef.current.style.setProperty("--mouse-y", `${clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28"
    >
      <DataNetworkBackground />
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px] mix-blend-multiply"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] bg-accent/10 rounded-full blur-[150px] mix-blend-multiply"
        />
        
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/3 left-10 w-2 h-2 rounded-full bg-accent/40"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-1/4 right-20 w-4 h-4 rounded-full bg-accent/20"
        />
        
        <div className="absolute inset-0 radial-highlight pointer-events-none opacity-40" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }
            }}
            className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-3 sm:px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 shadow-sm hover:bg-accent/15 transition-all"
          >
            <Sparkles size={14} className="text-accent" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.1em] uppercase text-accent">AI Engineer & Full-Stack Developer</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-foreground-primary text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 leading-[1.05]"
          >
            Wasif Qamar
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-6 leading-tight"
          >
            I turn <span className="text-accent">complex data</span> into{" "}
            <span className="text-accent">intelligent products</span>.
          </motion.p>

          <motion.p 
            variants={itemVariants}
            className="text-foreground-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 sm:mb-12 leading-relaxed"
          >
            I build intelligent systems and scalable web applications — combining AI engineering
            with modern full-stack development. From NLP pipelines that extract meaning from
            unstructured data to production-ready apps, I ship work that is both technically
            rigorous and genuinely useful.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
            <Link href="#projects" className="btn-primary group shadow-md hover:shadow-lg transition-all w-full sm:w-auto">
              View Projects
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="#contact" className="btn-secondary group bg-background-primary/50 backdrop-blur-sm border-foreground-primary/10 hover:border-accent/30 transition-all w-full sm:w-auto">
              Contact Me
            </Link>
            {resumeStatus === "missing" ? (
              <span className="flex items-center justify-center sm:justify-start px-4 sm:px-6 py-3 text-sm font-semibold text-red-500/70 italic">
                Resume not available. Please check back later.
              </span>
            ) : (
              <Link 
                href="/resume/resume.pdf" 
                download="Wasif_Qamar_Resume.pdf"
                className="flex items-center gap-2 justify-center sm:justify-start px-4 sm:px-6 py-3 text-sm font-semibold text-foreground-secondary hover:text-accent transition-colors group w-full sm:w-auto"
              >
                <Download size={18} className="group-hover:scale-110 transition-transform" />
                Download Resume
              </Link>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
          >
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="group p-5 rounded-2xl bg-background-primary/60 backdrop-blur-md border border-foreground-primary/5 hover:border-accent/30 transition-all"
              >
                <div className="p-2 rounded-lg bg-accent/10 text-accent w-max mb-3 group-hover:scale-110 transition-transform">
                  <area.icon size={18} />
                </div>
                <h3 className="text-sm font-bold text-foreground-primary mb-1.5">{area.title}</h3>
                <p className="text-xs text-foreground-secondary leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-8 sm:mt-12 flex gap-4 sm:gap-6 justify-center lg:justify-start">
            <Link
              href="https://www.linkedin.com/in/muhammad-wasif-qamar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-secondary/60 hover:text-accent transition-colors p-2 hover:bg-accent/5 rounded-lg"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={24} />
            </Link>
              <Link
                href="https://github.com/Muhammad-Wasif-Qamar"  
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-secondary/60 hover:text-accent transition-colors p-2 hover:bg-accent/5 rounded-lg"
                aria-label="GitHub"
              >
                <GithubIcon size={24} />
              </Link>
            <Link
              href="mailto:hello@wasifqamar.com"
              className="text-foreground-secondary/60 hover:text-accent transition-colors p-2 hover:bg-accent/5 rounded-lg"
              aria-label="Email"
            >
              <Mail size={24} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
