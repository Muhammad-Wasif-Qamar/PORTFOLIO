"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      honeypot: formData.get("honeypot"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background-secondary overflow-hidden relative">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-lg">Let's Connect</h2>
            <p className="text-body mb-12">
              Interested in collaborating or just want to chat about AI and Full-Stack development? Feel free to reach out. I'm always open to discussing technical challenges and potential partnerships.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:hello@wasifqamar.com"
                className="flex items-center gap-4 group hover:text-accent transition-colors p-4 rounded-2xl bg-background-primary border border-foreground-primary/5 shadow-sm hover:shadow-lg"
              >
                <div className="p-3 rounded-xl bg-background-secondary text-accent group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground-secondary uppercase tracking-widest mb-1">Email</p>
                  <p className="text-lg font-bold">Get in Touch</p>
                </div>
              </a>

              <a
                href="https://github.com/Muhammad-Wasif-Qamar" // TODO: Add your GitHub profile URL here
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group hover:text-accent transition-colors p-4 rounded-2xl bg-background-primary border border-foreground-primary/5 shadow-sm hover:shadow-lg"
              >
                <div className="p-3 rounded-xl bg-background-secondary text-accent group-hover:scale-110 transition-transform">
                  <Github size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground-secondary uppercase tracking-widest mb-1">GitHub</p>
                  <p className="text-lg font-bold">github.com/Muhammad-Wasif-Qamar</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/muhammad-wasif-qamar/" // TODO: Add your LinkedIn profile URL here
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group hover:text-accent transition-colors p-4 rounded-2xl bg-background-primary border border-foreground-primary/5 shadow-sm hover:shadow-lg"
              >
                <div className="p-3 rounded-xl bg-background-secondary text-accent group-hover:scale-110 transition-transform">
                  <Linkedin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground-secondary uppercase tracking-widest mb-1">LinkedIn</p>
                  <p className="text-lg font-bold">linkedin.com/in/muhammad-wasif-qamar</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-10 rounded-3xl bg-background-primary border border-foreground-primary/5 shadow-xl space-y-8 relative overflow-hidden"
            onSubmit={handleSubmit}
          >
             {/* Decorative corner */}
             <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-[6rem]" />
             
             {/* Honeypot field for spam protection */}
             <input type="text" name="honeypot" className="hidden" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label htmlFor="name" className="text-sm font-bold text-foreground-secondary uppercase tracking-widest">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-background-secondary border-none focus:ring-2 focus:ring-accent/20 outline-none transition-all placeholder:text-foreground-secondary/30"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="email" className="text-sm font-bold text-foreground-secondary uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-background-secondary border-none focus:ring-2 focus:ring-accent/20 outline-none transition-all placeholder:text-foreground-secondary/30"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label htmlFor="message" className="text-sm font-bold text-foreground-secondary uppercase tracking-widest">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-5 py-4 rounded-2xl bg-background-secondary border-none focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none placeholder:text-foreground-secondary/30"
                placeholder="How can I help you?"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-medium"
              >
                {error}
              </motion.p>
            )}

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-500 text-sm font-medium"
              >
                Message sent successfully
              </motion.p>
            )}
            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className={`btn-primary w-full group relative overflow-hidden flex items-center justify-center gap-3 py-4 transition-all duration-300 ${
                submitted ? "bg-gray-500 hover:bg-gray-500" : ""
              }`}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 border-background-primary/30 border-t-background-primary rounded-full animate-spin" />
                    Sending...
                  </motion.div>
                ) : submitted ? (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    Message Sent!
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    Send Message
                    <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
