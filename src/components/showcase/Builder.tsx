import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skills = [
  { id: "ui", name: "UI/UX", examples: ["Information architecture", "Visual hierarchy", "Responsive layouts"] },
  { id: "interaction", name: "INTERACTION", examples: ["Motion", "Micro-interactions", "State transitions"] },
  { id: "frontend", name: "FRONTEND", examples: ["Reusable components", "Responsive engineering", "Performance"] },
  { id: "systems", name: "SYSTEMS", examples: ["APIs", "Agent workflows", "Structured data"] },
];

export const Builder = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section className="py-40 bg-deep border-t border-border/30">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-24 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-foreground uppercase leading-none"
          >
            The Interface <br/>
            <span className="text-muted-foreground">Is Part Of The Engineering.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setActiveSkill(skill.id)}
              onMouseLeave={() => setActiveSkill(null)}
              className="relative h-64 border border-border/50 bg-surface p-8 transition-colors duration-300 hover:border-signal/50 group"
              data-interactive
            >
              <div className="font-mono text-[9px] text-muted-foreground tracking-[0.2em] uppercase mb-8 group-hover:text-signal transition-colors">
                Category 0{i+1}
              </div>
              <h3 className="font-display font-bold text-2xl tracking-tighter text-foreground uppercase mb-6">
                {skill.name}
              </h3>

              <AnimatePresence>
                {activeSkill === skill.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-8 left-8 right-8 font-mono text-[10px] text-muted-foreground uppercase leading-relaxed space-y-1"
                  >
                    {skill.examples.map(ex => <div key={ex}>- {ex}</div>)}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
