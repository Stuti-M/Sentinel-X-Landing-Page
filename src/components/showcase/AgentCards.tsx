import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const AgentCards = () => {
  const [hoveredAgent, setHoveredAgent] = useState<"FIELD" | "POLICY" | null>(null);

  return (
    <section className="py-32 bg-deep border-t border-border/20 relative overflow-hidden">
      
      {/* Environmental Response Background */}
      <AnimatePresence>
        {hoveredAgent === "FIELD" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[rgba(101,217,255,0.05)] via-transparent to-transparent z-0 pointer-events-none"
          />
        )}
        {hoveredAgent === "POLICY" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[rgba(99,230,176,0.06)] via-transparent to-transparent z-0 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-foreground uppercase">
            One System. <br/> Two Specialized Minds.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 justify-center">
          
          {/* Agent 01: Field Researcher */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredAgent("FIELD")}
            onMouseLeave={() => setHoveredAgent(null)}
            className="w-full lg:w-[45%] h-[600px] premium-glass p-10 flex flex-col justify-between transition-colors duration-500 hover:border-[var(--glass-border-signal)] hover:shadow-[0_0_40px_var(--glass-glow-signal)] relative overflow-hidden group"
            data-cursor-state="CARD"
          >
            {/* Telemetry overlay on hover */}
            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col p-10 font-mono text-xs text-signal">
               <div className="mt-auto">
                 <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>&gt; source.discovered()</motion.div>
                 <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>&gt; context.gathered()</motion.div>
                 <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>&gt; evidence.normalized()</motion.div>
               </div>
            </div>

            <div className="relative z-20 transition-opacity duration-500 group-hover:opacity-0">
              <div className="font-mono text-xs text-signal tracking-[0.2em] uppercase mb-4">Agent 01</div>
              <h3 className="text-4xl font-display font-bold text-foreground uppercase tracking-tight mb-4">Field Researcher</h3>
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Evidence Before Action</p>
            </div>
            
            <div className="relative z-0 h-64 w-full border border-signal/20 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0 overflow-hidden">
               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTAxLCAyMTcsIDI1NSwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-50" />
               <span className="font-mono text-[9px] text-signal/50 uppercase tracking-widest">Satellite / Contextual Analysis</span>
            </div>
          </motion.div>

          {/* Agent 02: Policy Director */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredAgent("POLICY")}
            onMouseLeave={() => setHoveredAgent(null)}
            className="w-full lg:w-[55%] h-[700px] premium-glass p-10 lg:p-16 flex flex-col justify-between transition-colors duration-500 hover:border-[var(--glass-border-eco)] hover:shadow-[0_0_40px_var(--glass-glow-eco)] relative overflow-hidden group lg:-mt-16"
            data-cursor-state="CARD"
          >
             {/* Telemetry overlay on hover */}
             <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col p-16 font-mono text-xs text-eco">
               <div className="mt-auto">
                 <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>&gt; risk.assessed()</motion.div>
                 <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>&gt; sdg.mapped()</motion.div>
                 <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>&gt; action.generated()</motion.div>
               </div>
            </div>

            <div className="relative z-20 transition-opacity duration-500 group-hover:opacity-0 text-right">
              <div className="font-mono text-xs text-eco tracking-[0.2em] uppercase mb-4">Agent 02</div>
              <h3 className="text-5xl font-display font-bold text-foreground uppercase tracking-tight mb-4">Policy Director</h3>
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Reasoning Before Response</p>
            </div>

            <div className="relative z-0 h-80 w-full border border-eco/20 flex flex-col justify-end p-6 transition-opacity duration-500 group-hover:opacity-0 bg-surface/50">
               <div className="w-full h-px bg-eco/20 mb-4" />
               <div className="w-3/4 h-px bg-eco/20 mb-4" />
               <div className="w-1/2 h-px bg-eco/20 mb-8" />
               <span className="font-mono text-[9px] text-eco/50 uppercase tracking-widest">Structured Output Generation</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
