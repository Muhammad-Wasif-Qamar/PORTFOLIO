import Navbar from "@/components/navbar/Navbar";
import ScrollWorld from "@/components/scroll-world/ScrollWorld";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/skills/Skills";
import Experience from "@/components/experience/Experience";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <main className="relative w-full">
      <Navbar />
      <ScrollWorld />
      
      <div className="relative z-10">
        <section id="hero" className="min-h-screen"><Hero /></section>
        <section id="about" className="min-h-screen"><About /></section>
        <section id="projects" className="min-h-screen"><Projects /></section>
        <section id="skills" className="min-h-screen"><Skills /></section>
        <section id="experience" className="min-h-screen"><Experience /></section>
        <section id="contact" className="min-h-screen"><Contact /></section>
      </div>
      
      <footer className="relative z-10 py-12 bg-background-primary border-t border-foreground-primary/5">
        <div className="section-container text-center">
          <p className="text-foreground-secondary text-sm">
            © {new Date().getFullYear()} Wasif Qamar. Built with precision and care.
          </p>
        </div>
      </footer>
    </main>
  );
}
