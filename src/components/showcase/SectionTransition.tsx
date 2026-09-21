import { motion } from "framer-motion";

export const SectionTransition = () => {
  return (
    <section className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 scanlines opacity-30 mix-blend-overlay" />
      
      <div className="container relative z-10 px-6 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 1 }}
        >
          <div className="text-[10px] font-mono tracking-[0.4em] text-muted-foreground uppercase mb-12">
            01 / The Problem
          </div>
          
          <div className="overflow-hidden mb-4">
            <motion.h2 
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter text-foreground uppercase"
            >
              Forests Disappear
            </motion.h2>
          </div>
          
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="text-3xl md:text-5xl lg:text-7xl font-display font-bold tracking-tighter text-destructive uppercase"
            >
              Before Systems Respond.
            </motion.h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
