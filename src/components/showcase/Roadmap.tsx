import { motion } from "framer-motion";

const roadmapItems = [
  { status: "NOW", title: "Multi-agent intelligence", active: true },
  { status: "NEXT", title: "GIS integration", active: false },
  { status: "NEXT", title: "Satellite change detection", active: false },
  { status: "NEXT", title: "Incident history", active: false },
  { status: "NEXT", title: "Real-time alerts", active: false },
];

export const Roadmap = () => {
  return (
    <section className="py-40 bg-background border-t border-border/30 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-32 max-w-2xl">
          <h2 className="text-sm font-mono tracking-[0.3em] text-muted-foreground uppercase mb-6">
            Built for more than a demo
          </h2>
          <p className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-foreground uppercase">
            The Roadmap
          </p>
        </div>

        <div className="relative">
          {/* Base Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-border/50 -translate-y-1/2 z-0" />
          
          {/* Active Line Segment */}
          <div className="absolute top-1/2 left-0 w-[20%] h-px bg-signal shadow-[0_0_10px_var(--color-signal)] -translate-y-1/2 z-0" />

          <div className="flex overflow-x-auto gap-12 pb-12 snap-x scrollbar-hide relative z-10 pt-16">
            {roadmapItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-none w-64 snap-center relative flex flex-col items-center text-center"
              >
                {/* Node */}
                <div className="mb-12 relative">
                  <div className={`w-3 h-3 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[62px] ${item.active ? 'bg-signal shadow-[0_0_15px_var(--color-signal)]' : 'bg-surface border border-border/50'}`} />
                </div>
                
                <div className={`text-[9px] font-mono mb-4 tracking-[0.2em] uppercase px-2 py-1 rounded border ${item.active ? 'text-signal border-signal/30 bg-signal/10' : 'text-muted-foreground/50 border-border/30'}`}>
                  {item.status}
                </div>
                <h3 className={`text-xl font-display font-bold tracking-tight uppercase ${item.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-32 max-w-4xl border border-border bg-surface p-12 lg:p-20 flex flex-col items-center justify-center text-center mx-auto"
        >
          <p className="text-signal font-mono text-[10px] tracking-[0.3em] uppercase mb-6">Vision</p>
          <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tighter text-foreground uppercase">
            Global Environmental Intelligence
          </h3>
        </motion.div>
      </div>
    </section>
  );
};
