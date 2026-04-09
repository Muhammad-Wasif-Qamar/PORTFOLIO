import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Experience from "@/components/experience/Experience";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <main className="flex-grow">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      
      <footer className="py-12 bg-background-primary border-t border-foreground-primary/5">
        <div className="section-container text-center">
          <p className="text-foreground-secondary text-sm">
            © {new Date().getFullYear()} Wasif Qamar. Built with precision and care.
          </p>
          
        </div>
      </footer>
    </main>
  );
}
