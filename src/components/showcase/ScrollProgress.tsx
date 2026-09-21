import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const SECTIONS = [
  { id: "overview", label: "01 OVERVIEW" },
  { id: "problem", label: "02 PROBLEM" },
  { id: "intelligence", label: "03 INTELLIGENCE" },
  { id: "system", label: "04 SYSTEM" },
  { id: "technology", label: "05 TECHNOLOGY" },
  { id: "launch", label: "06 LAUNCH" },
];

export const ScrollProgress = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      // Very basic section observer logic based on scroll position
      // For a real app, IntersectionObserver is better, but this approximates it
      const sections = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
      
      let current = SECTIONS[0].id;
      for (const el of sections) {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            current = el.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 mix-blend-difference pointer-events-none">
      <div className="h-32 w-px bg-border relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 right-0 bg-foreground origin-top"
          style={{ scaleY, height: "100%" }}
        />
      </div>
      
      <div className="h-4 overflow-hidden relative w-32 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeSection}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="absolute text-[9px] font-mono tracking-[0.2em] text-muted-foreground uppercase whitespace-nowrap"
          >
            {SECTIONS.find(s => s.id === activeSection)?.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Needed for AnimatePresence to work in this file
import { AnimatePresence } from "framer-motion";
