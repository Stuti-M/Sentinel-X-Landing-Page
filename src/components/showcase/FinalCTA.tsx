import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const FinalCTA = () => {
  return (
    <section id="launch" className="h-[90vh] relative flex items-center justify-center bg-background overflow-hidden border-t border-border/30">
      
      {/* Absolute dark, cinematic background */}
      <div className="absolute inset-0 z-0 bg-background" />
      <div className="absolute inset-0 z-0 opacity-30 scanlines mix-blend-overlay pointer-events-none" />
      
      <div className="container relative z-10 px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          {/* Telemetry */}
          <div className="flex flex-wrap justify-center gap-6 mb-16 font-mono text-[9px] tracking-[0.3em] uppercase">
            <span className="text-muted-foreground flex items-center gap-2"><div className="w-1.5 h-1.5 bg-signal rounded-full animate-pulse"/>System Ready</span>
            <span className="text-muted-foreground flex items-center gap-2"><div className="w-1.5 h-1.5 bg-eco rounded-full animate-pulse"/>Agents Ready</span>
            <span className="text-muted-foreground flex items-center gap-2"><div className="w-1.5 h-1.5 bg-signal rounded-full animate-pulse"/>Intelligence Ready</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl lg:text-[7rem] leading-none font-display font-bold tracking-tighter text-foreground uppercase mb-8">
            Ready to <br/> Investigate?
          </h2>
          
          <p className="text-lg font-sans text-muted-foreground mb-20">
            Enter the Sentinel-X intelligence interface.
          </p>

          <Link
            to="/command"
            className="group relative inline-flex items-center justify-center gap-4 px-16 py-6 bg-surface border border-eco/30 text-foreground font-mono font-bold tracking-[0.2em] uppercase text-sm transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_var(--glass-glow-eco)] hover:border-eco overflow-hidden rounded"
            data-interactive
            data-cursor-state="LAUNCH"
          >
            {/* Sweep effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-eco/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-0" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Launch Sentinel-X</span>
            <svg className="w-5 h-5 relative z-10 text-eco transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
