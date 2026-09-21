import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const IntelligenceFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="intelligence" ref={containerRef} className="h-[400vh] bg-background relative">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center pt-24 pb-8">
        <motion.div style={{ x }} className="flex h-full w-[400vw]">
          
          {/* Feature 1: Intelligence */}
          <div className="w-[100vw] h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-24 gap-8 md:gap-12 relative border-r border-border/30">
            <div className="flex-1 max-w-xl">
              <div className="font-mono text-[10px] tracking-widest text-signal uppercase mb-4 md:mb-6">01 / Intelligence</div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tighter text-foreground uppercase mb-4 md:mb-6">
                Research before reaction.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-light">
                Search, source discovery, context gathering, and evidence synthesis.
              </p>
            </div>
            <div className="flex-1 w-full max-h-[50vh] min-h-[300px] border border-border/50 bg-surface rounded-lg relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 console-grid opacity-20" />
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest border border-border p-4 bg-background">
                Source Discovery Visualization
              </div>
            </div>
          </div>

          {/* Feature 2: Verification */}
          <div className="w-[100vw] h-full flex-shrink-0 flex flex-col md:flex-row-reverse items-center justify-center px-6 md:px-12 lg:px-24 gap-8 md:gap-12 relative border-r border-border/30 bg-deep">
            <div className="flex-1 max-w-xl md:text-right">
              <div className="font-mono text-[10px] tracking-widest text-warning uppercase mb-4 md:mb-6">02 / Verification</div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tighter text-foreground uppercase mb-4 md:mb-6">
                Separate signal from evidence.
              </h2>
            </div>
            
            {/* Interactive Mock Evidence Inspector */}
            <div className="flex-1 w-full max-h-[50vh] min-h-[300px] flex items-center justify-center relative">
              <div className="w-full max-w-[400px] premium-glass p-6 md:p-8 rounded" data-interactive>
                <div className="font-mono text-[10px] text-muted-foreground uppercase border-b border-border pb-4 mb-4 flex justify-between">
                  <span>Inspector</span>
                  <span className="text-signal">ID: EV-8942</span>
                </div>
                
                <div className="space-y-6 font-mono text-xs text-foreground uppercase">
                  <div>
                    <div className="text-muted-foreground mb-1">Source</div>
                    <div className="bg-background/50 border border-border p-2 truncate">Environmental Research Report</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="text-muted-foreground mb-1">Status</div>
                      <div className="bg-background/50 border border-border p-2 text-warning flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" /> Verified
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-muted-foreground mb-1">Confidence</div>
                      <div className="bg-background/50 border border-border p-2">87%</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Used By</div>
                    <div className="bg-background/50 border border-border p-2 text-signal">Field Researcher</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Policy */}
          <div className="w-[100vw] h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-24 gap-8 md:gap-12 relative border-r border-border/30">
            <div className="flex-1 max-w-xl">
              <div className="font-mono text-[10px] tracking-widest text-eco uppercase mb-4 md:mb-6">03 / Policy</div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tighter text-foreground uppercase mb-4 md:mb-6">
                Turn evidence into action.
              </h2>
            </div>
            
            {/* Structured Policy Output Interface */}
            <div className="flex-1 w-full flex items-center justify-center max-h-[50vh] min-h-[300px]">
              <div className="w-full max-w-lg border border-border bg-surface p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-eco/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="font-mono text-[10px] text-eco tracking-[0.2em] uppercase mb-8 pb-4 border-b border-eco/20">
                  Structured Policy Brief
                </div>
                
                <table className="w-full text-left font-mono text-xs">
                  <tbody>
                    <tr className="border-b border-border/50">
                      <th className="py-4 font-normal text-muted-foreground uppercase tracking-widest w-1/3">Threat Level</th>
                      <td className="py-4 text-destructive font-bold">HIGH</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <th className="py-4 font-normal text-muted-foreground uppercase tracking-widest">Primary Risk</th>
                      <td className="py-4 text-foreground">Deforestation / Expansion</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <th className="py-4 font-normal text-muted-foreground uppercase tracking-widest">SDG Alignment</th>
                      <td className="py-4 text-foreground">13 / 15</td>
                    </tr>
                    <tr>
                      <th className="py-4 font-normal text-muted-foreground uppercase tracking-widest align-top">Immediate Action</th>
                      <td className="py-4 text-foreground leading-relaxed">
                        Deploy localized monitoring teams. Suspend suspected illicit operations pending GIS confirmation.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Feature 4: Orchestration */}
          <div className="w-[100vw] h-full flex-shrink-0 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 relative bg-deep">
            <div className="text-center max-w-3xl mb-8 md:mb-16">
              <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-4 md:mb-6">04 / Orchestration</div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tighter text-foreground uppercase mb-4 md:mb-6">
                Multiple Agents.<br/>One Pipeline.
              </h2>
            </div>
            <div className="w-full max-w-4xl max-h-[40vh] min-h-[250px] border border-border/50 bg-background rounded-lg flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 console-grid opacity-20" />
               <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">n8n Workflow Visualization</div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
