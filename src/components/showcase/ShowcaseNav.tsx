import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export const ShowcaseNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const navHeight = useTransform(scrollY, [0, 100], ["100px", "70px"]);
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(5, 7, 10, 0)", "var(--color-glass)"]
  );
  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(150, 167, 175, 0)", "rgba(150, 167, 175, 0.15)"]
  );
  const navBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex items-center justify-between transition-all duration-300"
        style={{ 
          height: navHeight, 
          backgroundColor: navBackground, 
          borderBottomWidth: "1px", 
          borderBottomStyle: "solid", 
          borderBottomColor: navBorder,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur
        }}
      >
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl md:text-2xl font-display font-bold tracking-tight text-foreground uppercase" data-interactive>
            <span className="hidden md:inline">Sentinel-X</span>
            <span className="inline md:hidden">S-X</span>
          </Link>
          <span className="hidden lg:inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground border-l border-border pl-6 py-1">
            Autonomous Environmental Intelligence
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.15em] font-medium text-muted-foreground uppercase">
          {['overview', 'intelligence', 'system', 'technology'].map((item) => (
            <a 
              key={item}
              href={`#${item}`} 
              className="hover:text-foreground transition-colors py-2" 
              data-interactive
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/command"
            className="hidden md:inline-flex group relative px-6 py-3 overflow-hidden rounded bg-surface border border-eco/30 text-foreground font-mono font-bold text-[10px] tracking-widest uppercase transition-all hover:-translate-y-0.5 hover:shadow-[0_0_15px_var(--glass-glow-eco)] hover:border-eco items-center gap-2"
            data-interactive
            data-cursor-state="LAUNCH"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-eco/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-0" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Launch ↗</span>
          </Link>
          
          <button 
            className="md:hidden text-foreground font-mono text-xs tracking-widest uppercase p-2"
            onClick={() => setMobileMenuOpen(true)}
            data-interactive
          >
            Menu
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex justify-between items-center h-[70px]">
              <span className="text-xl font-display font-bold tracking-tight text-foreground uppercase">S-X</span>
              <button 
                className="text-foreground font-mono text-xs tracking-widest uppercase p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Close
              </button>
            </div>
            
            <div className="flex flex-col gap-8 mt-12">
              {['overview', 'intelligence', 'system', 'technology'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-display font-bold text-foreground uppercase tracking-tight"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="mt-auto pb-12">
              <Link
                to="/command"
                className="w-full relative overflow-hidden flex items-center justify-center gap-2 py-4 bg-surface border border-eco/30 text-foreground font-mono font-bold tracking-widest uppercase rounded hover:shadow-[0_0_15px_var(--glass-glow-eco)] hover:border-eco transition-all duration-300 group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-eco/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-0" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Launch Sentinel-X ↗</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
