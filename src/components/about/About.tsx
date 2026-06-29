"use client";

import { motion } from "framer-motion";
import { Brain, Languages, ShieldCheck, Database, Search, Zap, Code, ArrowUpRight } from "lucide-react";

export default function About() {
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[450px] sm:h-[500px] flex items-center justify-center"
          >
            <div className="relative w-full h-full bg-background-primary rounded-3xl border border-foreground-primary/5 shadow-2xl overflow-hidden p-8 sm:p-10 group">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
              />
              
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-6 pb-16 sm:pb-20">
                {/* List View with Names in Front of Symbols */}
                <div className="w-full max-w-xs space-y-3">
                  {[
                    { icon: Brain, name: "AI Systems Design", delay: 0 },
                    { icon: Database, name: "Full-Stack Architecture", delay: 0.1 },
                    { icon: Code, name: "ML Engineering", delay: 0.2 },
                    { icon: Zap, name: "Scalable AI", delay: 0.3 }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + item.delay }}
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-4 p-3.5 rounded-xl bg-background-secondary border border-foreground-primary/5 hover:border-accent/30 transition-all"
                    >
                      <div className="p-2 rounded-lg bg-background-primary text-accent">
                        <item.icon size={18} />
                      </div>
                      <span className="text-sm font-semibold text-foreground-primary">
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-background-primary p-4 sm:p-6 rounded-2xl border border-foreground-primary/5 shadow-xl z-20"
            >
              <div className="text-accent font-bold text-xl sm:text-3xl mb-1">2+</div>
              <div className="text-[10px] sm:text-xs font-bold text-foreground-secondary uppercase tracking-widest">Years Experience</div>
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
              whileHover={{ y: -4 }}
              className="p-6 sm:p-8 rounded-2xl bg-background-primary border border-foreground-primary/5 hover:border-accent/30 transition-all hover:shadow-xl group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 sm:p-3 rounded-xl bg-background-secondary inline-block group-hover:scale-110 group-hover:bg-accent/10 transition-all">
                  {item.icon}
                </div>
                <ArrowUpRight size={16} className="text-foreground-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
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
