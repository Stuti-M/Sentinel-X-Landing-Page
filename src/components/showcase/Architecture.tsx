import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const nodes = [
  { id: "browser", label: "Browser", desc: "User Interface", type: "client" },
  { id: "proxy", label: "Node.js Proxy", desc: "CORS handling & routing", type: "server" },
  { id: "n8n", label: "n8n Webhook", desc: "Visual Agent Orchestration", type: "orchestrator" },
  { id: "field", label: "Field Researcher", desc: "Research + Verification", type: "agent" },
  { id: "evidence", label: "Evidence", desc: "Normalized Payload", type: "data" },
  { id: "policy", label: "Policy Director", desc: "Risk + Policy Synthesis", type: "agent" },
  { id: "json", label: "Structured JSON", desc: "Machine-readable response", type: "data" },
];

export const Architecture = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section className="py-32 bg-background border-t border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-surface/50 via-background to-background" />

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-6 text-foreground uppercase">
            Beautiful on the surface. <br/> Serious underneath.
          </h2>
          <p className="text-muted-foreground font-mono text-xs tracking-[0.2em] uppercase">
            System Architecture
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative py-12">
          {/* Base Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-[5%] right-[5%] h-px bg-border/50 -translate-y-1/2 z-0" />

          {/* Active Path Illumination */}
          <div className="hidden md:block absolute top-1/2 left-[5%] right-[5%] h-px -translate-y-1/2 z-0">
             <motion.div 
                className="h-full signature-gradient blur-[2px]"
                initial={{ width: "0%", opacity: 0 }}
                animate={{ 
                  width: activeNode ? `${((nodes.findIndex(n => n.id === activeNode) + 1) / nodes.length) * 100}%` : "0%",
                  opacity: activeNode ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
             />
          </div>

          {nodes.map((node, i) => {
            const isActive = activeNode === node.id;
            const isPast = activeNode && nodes.findIndex(n => n.id === activeNode) >= i;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10"
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div 
                  className={`w-16 h-16 md:w-24 md:h-24 rounded border flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-md ${
                    isActive 
                      ? "bg-signal/10 border-signal scale-110 shadow-[0_0_30px_rgba(101,217,255,0.2)]" 
                      : isPast
                        ? "bg-surface border-signal/50"
                        : "bg-background border-border/80 hover:border-signal/30"
                  }`}
                  data-interactive
                >
                  <span className={`text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-center px-2 break-words ${isActive || isPast ? "text-foreground" : "text-muted-foreground"}`}>
                    {node.label}
                  </span>
                </div>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-56 premium-glass p-4 rounded text-center z-20 pointer-events-none"
                    >
                      <div className="text-[10px] font-mono text-signal mb-2 uppercase tracking-[0.2em]">{node.label}</div>
                      <div className="text-sm font-display font-bold text-foreground uppercase tracking-widest">{node.desc}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
