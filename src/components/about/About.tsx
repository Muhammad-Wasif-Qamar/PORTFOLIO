"use client";

import { motion } from "framer-motion";
import { Brain, Languages, ShieldCheck, Database, Search, Zap, Code } from "lucide-react";
import { useEffect, useState } from "react";

export default function About() {
  const [particles, setParticles] = useState<{ x: number[]; duration: number; delay: number; top: string; left: string }[]>([]);

  useEffect(() => {
    const newParticles = [...Array(6)].map(() => ({
      x: [0, Math.random() * 20 - 10, 0],
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
      top: `${20 + Math.random() * 60}%`,
      left: `${20 + Math.random() * 60}%`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section id="about" className="bg-background-secondary py-20 sm:py-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[40%] h-full bg-accent/5 -skew-x-12 transform translate-x-1/2 pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="heading-lg">Building Intelligent Solutions</h2>
            <div className="w-20 h-1 bg-accent mb-6 sm:mb-8 rounded-full" />
            <p className="text-body mb-4 sm:mb-6">
              I am a dedicated AI Engineer and Full-Stack Developer focused on building intelligent systems that transform complex data into practical products. My expertise lies in combining machine learning with modern web architecture to create scalable, high-impact applications.
            </p>
            <p className="text-body mb-6 sm:mb-8">
              With a background in both AI systems design and full-stack development, I bridge the gap between advanced research and production-ready software. I am passionate about creating systems that are not only intelligent but also robust, efficient, and user-centric.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <div className="flex items-center gap-2 text-foreground-primary">
                <Zap size={18} className="text-accent" />
                <span className="text-sm font-semibold">AI Systems Design</span>
              </div>
              <div className="flex items-center gap-2 text-foreground-primary">
                <Search size={18} className="text-accent" />
                <span className="text-sm font-semibold">ML Engineering</span>
              </div>
              <div className="flex items-center gap-2 text-foreground-primary">
                <Database size={18} className="text-accent" />
                <span className="text-sm font-semibold">Full-Stack Architecture</span>
              </div>
              <div className="flex items-center gap-2 text-foreground-primary">
                <Brain size={18} className="text-accent" />
                <span className="text-sm font-semibold">Scalable AI</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] flex items-center justify-center"
          >
            <div className="relative w-full h-full bg-background-primary rounded-3xl border border-foreground-primary/5 shadow-2xl overflow-hidden p-6 sm:p-8 group">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(circle, #1C1C1C 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
              />
              
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                <motion.div 
                    animate={{ 
                      boxShadow: ["0 0 0 0px rgba(199, 162, 124, 0.2)", "0 0 0 20px rgba(199, 162, 124, 0)", "0 0 0 0px rgba(199, 162, 124, 0)"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-6 sm:mb-8"
                  >
                  <Brain size={40} className="text-accent" />
                </motion.div>
                
                <div className="grid grid-cols-1 gap-4 sm:gap-6 w-full max-w-[250px] sm:max-w-[280px]">
                  {[
                    { label: "AI Systems Design", icon: <Brain size={16} /> },
                    { label: "Full-Stack Development", icon: <Code size={16} /> },
                    { label: "ML Engineering", icon: <Zap size={16} /> }
                  ].map((capability, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                      className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl bg-background-secondary/50 border border-foreground-primary/5 hover:border-accent/30 transition-all group/item"
                    >
                      <div className="p-1.5 sm:p-2 rounded-lg bg-background-primary text-accent group-hover/item:scale-110 transition-transform shadow-sm">
                        {capability.icon}
                      </div>
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-foreground-secondary group-hover/item:text-foreground-primary transition-colors">
                        {capability.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                {particles.map((particle, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -20, 0],
                      x: particle.x,
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: particle.duration,
                      repeat: Infinity,
                      delay: particle.delay
                    }}
                    className="absolute w-1 h-1 bg-accent rounded-full"
                    style={{ 
                      top: particle.top,
                      left: particle.left
                    }}
                  />
                ))}
              </div>
              
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-3 sm:-bottom-6 -left-3 sm:-left-6 bg-background-primary p-3 sm:p-6 rounded-2xl border border-foreground-primary/5 shadow-xl max-w-[160px] sm:max-w-[200px] z-20"
            >
              <div className="text-accent font-bold text-xl sm:text-3xl mb-1">2+</div>
              <div className="text-[10px] sm:text-xs font-bold text-foreground-secondary uppercase tracking-widest">Years in AI Engineering</div>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-20 lg:mt-24">
          {[
            {
              icon: <Brain className="text-accent" />,
              title: "AI Architecture",
              desc: "Designing scalable neural networks and machine learning systems for production."
            },
            {
              icon: <Languages className="text-accent" />,
              title: "NLP Solutions",
              desc: "Building advanced text analysis engines for complex security data extraction."
            },
            {
              icon: <ShieldCheck className="text-accent" />,
              title: "CTI Automation",
              desc: "Automating end-to-end threat intelligence workflows and investigation processes."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * i }}
              className="p-6 sm:p-8 rounded-2xl bg-background-primary border border-foreground-primary/5 hover:border-accent/30 transition-all hover:shadow-xl group"
            >
              <div className="p-2.5 sm:p-3 rounded-xl bg-background-secondary inline-block mb-4 group-hover:scale-110 group-hover:bg-accent/10 transition-all">
                {item.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
