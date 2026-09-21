import { motion } from "framer-motion";

export const MultiAgentComparison = () => {
  return (
    <section className="py-32 bg-background border-t border-border/30">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground uppercase">
            One model answers. <br/> A network investigates.
          </h2>
          <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
            Why Multi-Agent?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Single Agent */}
          <div className="panel-bevel rounded-2xl p-8 border border-border/50 text-center">
            <h3 className="font-mono text-muted-foreground tracking-widest text-sm uppercase mb-12">Single Agent</h3>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded border border-border flex items-center justify-center text-xs font-bold bg-background">INPUT</div>
              <div className="w-px h-8 bg-border" />
              <div className="w-16 h-16 rounded border border-border flex items-center justify-center text-xs font-bold bg-background text-muted-foreground">ANSWER</div>
            </div>
          </div>

          {/* Multi Agent */}
          <div className="panel-bevel rounded-2xl p-8 border border-signal/30 text-center relative overflow-hidden shadow-[0_0_30px_rgba(101,217,255,0.05)]">
            <div className="absolute inset-0 bg-signal/5 pointer-events-none" />
            <h3 className="font-mono text-signal tracking-widest text-sm uppercase mb-12 relative z-10">Multi-Agent</h3>
            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded border border-signal/50 bg-background flex items-center justify-center text-xs font-bold">INPUT</div>
              <div className="w-px h-8 bg-signal/50" />
              <div className="w-32 h-12 rounded border border-signal/50 bg-background flex items-center justify-center text-xs font-bold">RESEARCH</div>
              <div className="w-px h-8 bg-signal/50" />
              <div className="w-32 h-12 rounded border border-warning/50 bg-background flex items-center justify-center text-xs font-bold">VERIFY</div>
              <div className="w-px h-8 bg-eco/50" />
              <div className="w-32 h-12 rounded border border-eco/50 bg-background flex items-center justify-center text-xs font-bold">POLICY</div>
              <div className="w-px h-8 bg-eco/50" />
              <div className="w-16 h-16 rounded border border-eco/50 bg-background flex items-center justify-center text-xs font-bold">RESPONSE</div>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-12 text-muted-foreground max-w-2xl mx-auto">
          Specialized agents separate investigation and policy synthesis into distinct, verifiable stages, ensuring responses are backed by synthesized evidence rather than hallucinated context.
        </p>
      </div>
    </section>
  );
};
