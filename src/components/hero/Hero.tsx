"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, ArrowRight, Download, Mail } from "lucide-react";
import NeuralNetwork from "@/components/animations/NeuralNetwork";
import DataNetworkBackground from "@/components/animations/DataNetworkBackground";

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
        staggerChildren: 0.15,
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

      <div className="section-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 text-center lg:text-left"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-foreground-primary text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4 leading-[1.1]"
          >
            Wasif Qamar
          </motion.h1>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.5, duration: 0.8, ease: "easeOut" }
              }
            }}
            className="inline-block mb-6 sm:mb-8 px-3 sm:px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 shadow-sm"
          >
            <span className="text-xs sm:text-sm font-bold tracking-[0.1em] uppercase text-accent">AI Engineer & Full-Stack Developer</span>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-foreground-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-12 leading-relaxed"
          >
            I build intelligent systems and scalable web applications, combining AI engineering with modern full-stack development to transform complex data into practical products.
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
          
          <motion.div variants={itemVariants} className="mt-8 sm:mt-12 flex gap-4 sm:gap-6 justify-center lg:justify-start">
            <Link
              href="https://www.linkedin.com/in/muhammad-wasif-qamar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-secondary/60 hover:text-accent transition-colors p-2 hover:bg-accent/5 rounded-lg"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </Link>
            <Link
              href="https://github.com/Muhammad-Wasif-Qamar"  
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-secondary/60 hover:text-accent transition-colors p-2 hover:bg-accent/5 rounded-lg"
              aria-label="GitHub"
            >
              <Github size={24} />
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
        
        <motion.div 
          variants={itemVariants}
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="lg:col-span-5 hidden lg:flex justify-center relative h-[400px] lg:h-[450px] w-full"
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-accent/15 rounded-full blur-[120px] -z-10" />
            
            <div className="w-full h-full bg-background-primary/30 backdrop-blur-[2px] rounded-3xl border border-accent/10 shadow-xl overflow-hidden group hover:border-accent/30 transition-all relative">
              <NeuralNetwork />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-accent/20 rounded-full blur-2xl"
                  />
                  
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.03, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-background-primary/80 backdrop-blur-md border-2 border-accent/30 flex items-center justify-center shadow-[0_0_40px_rgba(199,162,124,0.25)] z-10"
                  >
                    <span className="text-xs sm:text-sm font-bold text-accent uppercase tracking-widest text-center px-4">AI Systems</span>
                  </motion.div>
                </div>
              </div>
              
              <motion.div 
                animate={{ y: [0, -12, 0], x: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 sm:top-12 right-6 sm:right-12 px-3 sm:px-4 py-2 rounded-xl bg-background-primary/90 border border-accent/20 shadow-lg backdrop-blur-md z-20"
              >
                <span className="text-xs font-bold text-accent">Neural Networks</span>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 12, 0], x: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 sm:bottom-24 left-6 sm:left-12 px-3 sm:px-4 py-2 rounded-xl bg-background-primary/90 border border-accent/20 shadow-lg backdrop-blur-md z-20"
              >
                <span className="text-xs font-bold text-accent">Full-Stack Apps</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -8, 0], x: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-16 sm:top-24 left-8 sm:left-16 px-3 sm:px-4 py-2 rounded-xl bg-background-primary/90 border border-accent/20 shadow-lg backdrop-blur-md z-20"
              >
                <span className="text-xs font-bold text-accent">Scalable Systems</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
