import { motion } from "framer-motion";

export const SDGAlignment = () => {
  return (
    <section className="py-32 bg-[#0B1118] border-t border-border/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="panel-bevel rounded-3xl p-12 border border-border flex flex-col justify-between min-h-[400px]"
          >
            <div>
              <h2 className="text-6xl font-bold tracking-tighter text-foreground opacity-20 mb-4">13</h2>
              <h3 className="text-2xl font-bold tracking-widest text-foreground uppercase mb-4">Climate Action</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sentinel-X's environmental intelligence workflow accelerates the detection of deforestation events, directly supporting climate action initiatives by turning raw data into structured policy recommendations.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="panel-bevel rounded-3xl p-12 border border-border flex flex-col justify-between min-h-[400px]"
          >
            <div>
              <h2 className="text-6xl font-bold tracking-tighter text-foreground opacity-20 mb-4">15</h2>
              <h3 className="text-2xl font-bold tracking-widest text-foreground uppercase mb-4">Life on Land</h3>
              <p className="text-muted-foreground leading-relaxed">
                By verifying environmental changes and highlighting biodiversity risks through multi-agent analysis, the system aids in the protection and sustainable use of terrestrial ecosystems.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
