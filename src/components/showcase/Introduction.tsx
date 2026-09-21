import { motion } from "framer-motion";

export const Introduction = () => {
  return (
    <section className="py-40 bg-background relative overflow-hidden border-t border-border/30 flex items-center justify-center min-h-[80vh]">
      <div className="absolute inset-0 z-0 console-grid opacity-10 mix-blend-overlay" />
      
      <div className="container relative z-10 px-6 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase mb-6">
            The Response
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-foreground uppercase">
            Meet <br />
            <span className="text-signal">Sentinel-X.</span>
          </h2>
        </motion.div>

        {/* Central Visualization */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 relative">
          
          {/* Connecting Track (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-border -translate-y-1/2 z-0" />
          
          {/* Animated Light Signal */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] -translate-y-1/2 z-0 overflow-hidden">
            <motion.div 
              className="w-1/3 h-full signature-gradient blur-[1px]"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Field Researcher */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 w-48 h-48 rounded-full border border-signal/30 bg-surface flex flex-col items-center justify-center shadow-[0_0_30px_rgba(101,217,255,0.05)]"
          >
            <div className="font-mono text-[9px] tracking-widest text-signal uppercase mb-2">Agent 01</div>
            <div className="font-display font-bold text-lg text-foreground uppercase text-center leading-tight">Field<br/>Researcher</div>
          </motion.div>

          {/* Evidence Payload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative z-10 px-8 py-3 premium-glass text-[10px] font-mono tracking-[0.2em] text-foreground uppercase"
          >
            Evidence Payload
          </motion.div>

          {/* Policy Director */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="relative z-10 w-48 h-48 rounded-full border border-eco/30 bg-surface flex flex-col items-center justify-center shadow-[0_0_30px_rgba(99,230,176,0.05)]"
          >
            <div className="font-mono text-[9px] tracking-widest text-eco uppercase mb-2">Agent 02</div>
            <div className="font-display font-bold text-lg text-foreground uppercase text-center leading-tight">Policy<br/>Director</div>
          </motion.div>

        </div>
        
        <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 1 }}
           className="mt-20 font-sans text-muted-foreground uppercase tracking-widest text-xs"
        >
          Actionable Intelligence
        </motion.p>
      </div>
    </section>
  );
};
