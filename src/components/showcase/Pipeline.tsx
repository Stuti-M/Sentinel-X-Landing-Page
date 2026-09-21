import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const pipelineStages = [
  { id: "01", name: "INPUT", desc: "Potential environmental crisis", meta: "Scenario Injection" },
  { id: "02", name: "RESEARCH", desc: "Field Researcher investigates", meta: "Agent Execution" },
  { id: "03", name: "EVIDENCE", desc: "Sources and context gathered", meta: "Data Structuring" },
  { id: "04", name: "VERIFY", desc: "Evidence normalized", meta: "Contextualization" },
  { id: "05", name: "PREDICT", desc: "Predictive modeling & risk analysis", meta: "Agent Execution" },
  { id: "06", name: "RESPONSE", desc: "Structured intelligence generated", meta: "JSON Output" },
];

export const Pipeline = () => {
  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress (0 to 1) to the 6 stages (0 to 5)
    // We multiply by the number of stages, and clamp to ensure we don't go out of bounds.
    const stage = Math.min(Math.floor(latest * pipelineStages.length), pipelineStages.length - 1);
    setActiveStage(stage);
  });

  return (
    <section id="system" ref={containerRef} className="bg-background relative h-[300vh]">
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-center border-t border-border/30 overflow-hidden pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16 md:mb-24 text-center">
            <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-6">Pipeline</div>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-foreground uppercase">
              The Intelligence Flow
            </h2>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative mb-12 md:mb-16 overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex justify-between items-start min-w-[800px] relative">
              {/* Connecting Line Base */}
              <div className="absolute top-4 left-0 right-0 h-px bg-border z-0" />
              
              {/* Animated Progress Line */}
              <motion.div 
                className="absolute top-4 left-0 h-px bg-signal z-0"
                initial={{ width: "0%" }}
                animate={{ width: `${(activeStage / (pipelineStages.length - 1)) * 100}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />

              {pipelineStages.map((stage, idx) => {
                const isActive = activeStage === idx;
                const isPast = activeStage > idx;
                
                return (
                  <div 
                    key={stage.id} 
                    className="relative z-10 flex flex-col items-center gap-4 cursor-pointer group w-32"
                    onClick={() => {
                      // Optional: could scroll the window to the exact point, but keeping it simple for now
                    }}
                  >
                    {/* Node */}
                    <div 
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? "bg-signal border-signal shadow-[0_0_15px_var(--color-signal)] scale-110" 
                          : isPast 
                            ? "bg-surface border-signal"
                            : "bg-background border-border group-hover:border-signal/50"
                      }`}
                    >
                      {isActive && <div className="w-2 h-2 bg-background rounded-full" />}
                    </div>

                    {/* Text */}
                    <div className="text-center">
                      <div className={`font-mono text-[10px] tracking-widest uppercase mb-1 transition-colors duration-500 ${isActive ? "text-signal" : "text-muted-foreground"}`}>
                        {stage.id}
                      </div>
                      <div className={`font-display font-bold text-sm tracking-widest uppercase transition-colors duration-500 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {stage.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detail */}
          <div className="h-[300px] md:h-[400px] border border-border/50 bg-surface rounded-xl overflow-hidden relative flex items-center justify-center">
            <div className="absolute inset-0 console-grid opacity-10 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
                className="relative z-10 text-center max-w-lg p-6"
              >
                <div className="font-mono text-xs text-signal tracking-[0.3em] uppercase mb-4 md:mb-6">
                  Stage {pipelineStages[activeStage].id} — {pipelineStages[activeStage].meta}
                </div>
                <h3 className="text-2xl md:text-4xl font-display font-bold text-foreground uppercase tracking-tight mb-6">
                  {pipelineStages[activeStage].desc}
                </h3>
                
                {/* Abstract Visual per stage */}
                <div className="w-full h-24 md:h-32 border border-border/50 bg-background/50 flex items-center justify-center rounded">
                  <span className="font-mono text-[9px] md:text-xs text-muted-foreground uppercase tracking-widest">
                    Visualization for {pipelineStages[activeStage].name}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
