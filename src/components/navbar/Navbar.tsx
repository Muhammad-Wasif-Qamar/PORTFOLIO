"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3 sm:py-4 bg-background-primary/80 backdrop-blur-lg border-b border-foreground-primary/5 shadow-lg shadow-foreground-primary/[0.03]"
          : "py-4 sm:py-6 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link 
          href="#home" 
          className="text-lg sm:text-xl font-bold tracking-tight hover:text-accent transition-colors duration-300"
        >
          Wasif Qamar
        </Link>

        <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`text-sm font-bold transition-all duration-300 ${
                    isActive ? "text-accent" : "text-foreground-secondary hover:text-foreground-primary"
                  }`}
                >
                  {link.name}
                </Link>
                
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </li>
            );
          })}
        </ul>

        <button
          className="md:hidden p-2 text-foreground-primary hover:text-accent transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background-primary/95 backdrop-blur-xl border-b border-foreground-primary/5 shadow-2xl overflow-hidden"
          >
            <ul className="flex flex-col p-6 sm:p-8 space-y-4 sm:space-y-6">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`text-lg sm:text-xl font-bold transition-colors block ${
                      activeSection === link.href.substring(1) ? "text-accent" : "text-foreground-secondary hover:text-foreground-primary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
