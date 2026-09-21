import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";

export const Hero = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    if (isScanning || scanComplete) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2500);
  };

  return (
    <section id="overview" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surface/80 via-background to-background" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full">
        
        {/* Left Column: Editorial Typography */}
        <div className="flex flex-col justify-center max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-8 text-[10px] uppercase font-mono tracking-[0.2em] text-signal">
              <span className="w-1.5 h-1.5 bg-signal rounded-full animate-pulse" />
              Autonomous Environmental Intelligence
            </div>

            <h1 className="font-display font-bold text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.9] tracking-tighter text-foreground mb-6">
              THE FOREST IS <br/>
              <span className="text-signal">SPEAKING.</span>
            </h1>

            <h2 className="font-sans text-xl md:text-2xl text-secondary-foreground font-light mb-8 max-w-md">
              We built an AI that listens.
            </h2>

            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-12 max-w-md">
              Sentinel-X is a multi-agent environmental intelligence system designed to investigate potential deforestation, verify evidence, and transform fragmented information into actionable policy intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a 
                href="#problem" 
                className="font-mono text-xs font-bold tracking-widest uppercase text-foreground hover:text-signal transition-colors flex items-center gap-2"
                data-interactive
              >
                Explore the Intelligence ↓
              </a>
              <Link 
                to="/command"
                className="group relative px-8 py-4 bg-surface text-foreground font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2 overflow-hidden rounded border border-eco/30 hover:border-eco hover:-translate-y-0.5 hover:shadow-[0_0_20px_var(--glass-glow-eco)] transition-all duration-300"
                data-interactive
                data-cursor-state="LAUNCH"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-eco/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-0" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Launch Sentinel-X</span>
                <svg className="w-4 h-4 relative z-10 text-eco transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Signature Interaction */}
        <div className="relative h-[500px] lg:h-[600px] w-full flex items-center justify-center">
          
          {/* Topographic Visual Field */}
          <div className="relative w-full max-w-[500px] aspect-square rounded-full border border-border/30 bg-surface/30 flex items-center justify-center overflow-hidden" data-cursor-state="SCAN">
            
            {/* Grid & Noise */}
            <div className="absolute inset-0 console-grid opacity-30 mix-blend-overlay" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

            {/* Base Topography SVG simulation */}
            <svg className="absolute inset-0 w-full h-full stroke-secondary-foreground/10 fill-transparent" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M10,50 Q25,30 50,50 T90,50" strokeWidth="0.5" />
              <path d="M15,60 Q35,40 60,60 T95,60" strokeWidth="0.5" />
              <path d="M5,40 Q20,20 45,40 T85,40" strokeWidth="0.5" />
              <path d="M20,70 Q40,50 70,70 T100,70" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" strokeDasharray="2 2" strokeWidth="0.2" className="stroke-signal/20" />
              <circle cx="50" cy="50" r="20" strokeDasharray="1 3" strokeWidth="0.2" className="stroke-signal/20" />
            </svg>

            {/* Scanning Line */}
            {isScanning && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-signal/20 to-signal/40 border-b-2 border-signal"
                initial={{ top: "-10%", height: "10%" }}
                animate={{ top: "100%", height: "20%" }}
                transition={{ duration: 2.5, ease: "linear" }}
              />
            )}

            {/* Discovered Nodes (Post-Scan) */}
            <AnimatePresence>
              {scanComplete && (
                <>
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-1/3 left-1/3 w-3 h-3 bg-destructive rounded-full shadow-[0_0_15px_var(--color-destructive)]"
                  />
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-warning rounded-full shadow-[0_0_10px_var(--color-warning)]"
                  />
                  
                  {/* Results Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-surface/90 border border-border/50 backdrop-blur-md p-4 rounded-lg flex flex-col items-center shadow-2xl"
                  >
                    <span className="font-mono text-xs text-destructive mb-2 uppercase tracking-widest font-bold">2 Signals Detected</span>
                    <Link to="/command" className="font-mono text-[10px] text-foreground hover:text-signal transition-colors uppercase tracking-widest border-b border-foreground/30 pb-0.5">
                      View Intelligence →
                    </Link>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            
            {/* Contextual Label for Demo Data */}
            <div className="absolute top-8 right-8 font-mono text-[9px] text-muted-foreground uppercase tracking-widest border border-border/50 px-2 py-1 rounded">
              Demo Data
            </div>

            {/* Small Coordinates */}
            <div className="absolute bottom-8 left-8 flex flex-col gap-1 font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
              <span>ODISHA</span>
              <span>20.2961° N</span>
              <span>85.8245° E</span>
            </div>
            
          </div>

          {/* Interactive Scan Control */}
          {!isScanning && !scanComplete && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              onClick={handleScan}
              className="absolute z-20 group flex items-center justify-center w-24 h-24 rounded-full border border-signal bg-signal/10 backdrop-blur-md text-signal font-mono text-xs font-bold tracking-widest uppercase hover:bg-signal/20 transition-colors shadow-[0_0_30px_var(--color-signal-soft)]"
              data-interactive
            >
              Scan Area
            </motion.button>
          )}

          {/* System Status Floating Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute top-0 right-0 md:-right-8 premium-glass p-4 rounded min-w-[140px] flex flex-col gap-3 z-30"
          >
            <div className="flex justify-between items-center text-[9px] font-mono tracking-widest uppercase">
              <span className="text-muted-foreground">System</span>
              <span className="text-signal flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-signal rounded-full animate-pulse"/>Ready</span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono tracking-widest uppercase border-t border-border/30 pt-3">
              <span className="text-muted-foreground">Agents</span>
              <span className="text-foreground">02</span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono tracking-widest uppercase border-t border-border/30 pt-3">
              <span className="text-muted-foreground">Orchestrator</span>
              <span className="text-foreground">n8n</span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono tracking-widest uppercase border-t border-border/30 pt-3">
              <span className="text-muted-foreground">Mode</span>
              <span className="text-warning">Demo</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
