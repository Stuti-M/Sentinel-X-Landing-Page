import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const technologies = [
  { id: "n8n", label: "n8n", desc: "Agent Orchestration", angle: 0, radius: 220, delay: 0.1 },
  { id: "groq", label: "Groq", desc: "High-speed Inference", angle: 45, radius: 240, delay: 0.2 },
  { id: "react", label: "React", desc: "UI Architecture", angle: 90, radius: 190, delay: 0.3 },
  { id: "tailwind", label: "Tailwind", desc: "Styling Engine", angle: 135, radius: 250, delay: 0.4 },
  { id: "serpapi", label: "SerpAPI", desc: "Web Search Source", angle: 180, radius: 210, delay: 0.5 },
  { id: "wiki", label: "Wikipedia", desc: "Context Source", angle: 225, radius: 200, delay: 0.6 },
  { id: "api", label: "HTTP APIs", desc: "Data Ingestion", angle: 270, radius: 260, delay: 0.7 },
  { id: "node", label: "Node.js", desc: "Proxy Layer", angle: 315, radius: 230, delay: 0.8 },
];

export const TechnologyEcosystem = () => {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  return (
    <section id="technology" className="py-40 bg-[#05070A] border-t border-border/20 overflow-hidden relative">
      <div className="absolute inset-0 z-0 console-grid opacity-10 mix-blend-overlay" />
      
      <div className="container mx-auto px-6 relative h-[700px] flex items-center justify-center">
        
        {/* Central Hub */}
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="absolute z-20 w-40 h-40 rounded-full premium-glass flex items-center justify-center"
        >
          <span className="font-display font-bold text-xl tracking-tighter text-foreground uppercase">Sentinel-X</span>
        </motion.div>

        {/* Orbiting Tech Nodes */}
        {technologies.map((tech, i) => {
          const x = Math.cos((tech.angle * Math.PI) / 180) * tech.radius;
          const y = Math.sin((tech.angle * Math.PI) / 180) * tech.radius;
          const isActive = activeTech === tech.id;

          return (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, x: 0, y: 0 }}
              whileInView={{ opacity: 1, x, y }}
              viewport={{ once: true }}
              transition={{ delay: tech.delay, duration: 1, type: "spring", stiffness: 50 }}
              className="absolute z-30"
              style={{ originX: 0, originY: 0 }}
              onMouseEnter={() => setActiveTech(tech.id)}
              onMouseLeave={() => setActiveTech(null)}
            >
              <div 
                className={`w-24 h-24 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isActive ? "bg-signal text-background border-signal scale-110 shadow-[0_0_30px_rgba(101,217,255,0.3)]" : "bg-surface border-border/50 text-muted-foreground hover:border-signal hover:text-signal"
                }`}
                data-interactive
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-center font-bold">
                  {tech.label}
                </span>
              </div>
              
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background border border-signal p-3 rounded text-center z-40 pointer-events-none"
                  >
                    <span className="font-mono text-[9px] text-signal uppercase tracking-[0.2em] block mb-1">{tech.label}</span>
                    <span className="font-sans text-xs text-foreground block">{tech.desc}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ left: '50%', top: '50%', overflow: 'visible' }}>
           {technologies.map((tech, i) => {
             const isActive = activeTech === tech.id;
             const x = Math.cos((tech.angle * Math.PI) / 180) * tech.radius;
             const y = Math.sin((tech.angle * Math.PI) / 180) * tech.radius;
             return (
               <motion.line
                 key={i}
                 x1="0"
                 y1="0"
                 x2={x}
                 y2={y}
                 stroke={isActive ? "var(--color-signal)" : "var(--color-border)"}
                 strokeWidth={isActive ? "2" : "1"}
                 initial={{ pathLength: 0, opacity: 0 }}
                 whileInView={{ pathLength: 1, opacity: isActive ? 0.8 : 0.2 }}
                 viewport={{ once: true }}
                 transition={{ delay: tech.delay, duration: 1 }}
               />
             )
           })}
        </svg>

      </div>
    </section>
  );
};
