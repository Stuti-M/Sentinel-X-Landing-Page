import { useState } from "react";
import { motion } from "framer-motion";

const problems = [
  {
    id: "01",
    title: "DETECT",
    description: "Environmental changes are difficult to identify across large regions.",
    color: "var(--color-signal)",
    bg: "rgba(101, 217, 255, 0.05)",
    align: "self-start",
    width: "w-full md:w-[60%]",
    visual: "scanning terrain"
  },
  {
    id: "02",
    title: "VERIFY",
    description: "Information comes from fragmented sources and requires contextual verification.",
    color: "var(--color-warning)",
    bg: "rgba(255, 184, 107, 0.05)",
    align: "self-end",
    width: "w-full md:w-[70%]",
    visual: "source fragments converging"
  },
  {
    id: "03",
    title: "UNDERSTAND",
    description: "Raw evidence does not automatically become useful intelligence.",
    color: "var(--color-destructive)",
    bg: "rgba(255, 104, 104, 0.05)",
    align: "self-start",
    width: "w-full md:w-[80%]",
    visual: "contextual intelligence graph"
  },
  {
    id: "04",
    title: "RESPOND",
    description: "Decision-makers need concise, structured recommendations.",
    color: "var(--color-eco)",
    bg: "rgba(99, 230, 176, 0.05)",
    align: "self-end",
    width: "w-full md:w-[60%]",
    visual: "policy output"
  }
];

export const TheProblem = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="problem" className="py-32 bg-background relative border-t border-border/30">
      <div className="container mx-auto px-6 max-w-5xl flex flex-col gap-12">
        {problems.map((problem, idx) => {
          const isHovered = hoveredIdx === idx;
          const isOtherHovered = hoveredIdx !== null && hoveredIdx !== idx;
          
          return (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`${problem.width} ${problem.align} transition-all duration-700 ease-out`}
              style={{
                opacity: isOtherHovered ? 0.3 : 1,
                transform: isHovered ? "scale(1.02)" : "scale(1)",
              }}
              data-cursor-state="CARD"
            >
              <div 
                className="group relative rounded-xl border border-border bg-surface p-8 md:p-12 overflow-hidden flex flex-col md:flex-row gap-8 justify-between items-start md:items-center min-h-[250px]"
              >
                {/* Background Color Hint */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 80% 50%, ${problem.bg}, transparent 70%)` }}
                />

                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-xs text-muted-foreground">{problem.id}</span>
                    <span 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: problem.color, boxShadow: `0 0 10px ${problem.color}` }}
                    />
                  </div>
                  
                  <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4 text-foreground">
                    {problem.title}
                  </h3>
                  <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-md">
                    {problem.description}
                  </p>
                </div>

                {/* Abstract Visual Area */}
                <div className="relative z-10 w-full md:w-64 h-32 md:h-full min-h-[150px] rounded border border-border/50 bg-background/50 flex items-center justify-center overflow-hidden">
                  <span className="font-mono text-[9px] text-muted-foreground/50 tracking-widest uppercase">
                    {problem.visual}
                  </span>
                  
                  {/* Decorative corner brackets */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-border" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-border" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-border" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-border" />
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
