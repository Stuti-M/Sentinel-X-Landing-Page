import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<"NORMAL" | "BUTTON" | "CARD" | "SCAN" | "LAUNCH">("NORMAL");

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const launchEl = target.closest('[data-cursor-state="LAUNCH"]');
      if (launchEl) return setCursorState("LAUNCH");

      const scanEl = target.closest('[data-cursor-state="SCAN"]');
      if (scanEl) return setCursorState("SCAN");

      const cardEl = target.closest('[data-cursor-state="CARD"]');
      if (cardEl) return setCursorState("CARD");

      const buttonEl = target.closest('a, button, [data-interactive]');
      if (buttonEl) return setCursorState("BUTTON");

      setCursorState("NORMAL");
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    return null; // Don't render on mobile touch
  }

  return (
    <>
      {/* Luminous dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-signal rounded-full pointer-events-none z-[100] mix-blend-screen shadow-[0_0_8px_var(--color-signal)]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: cursorState === "NORMAL" ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      {/* Thin ring */}
      <motion.div
        className="fixed top-0 left-0 border border-signal/50 rounded-full pointer-events-none z-[100] flex items-center justify-center mix-blend-screen"
        animate={{
          x: mousePosition.x - (cursorState === "LAUNCH" || cursorState === "SCAN" ? 32 : cursorState === "CARD" ? 24 : cursorState === "BUTTON" ? 16 : 12),
          y: mousePosition.y - (cursorState === "LAUNCH" || cursorState === "SCAN" ? 32 : cursorState === "CARD" ? 24 : cursorState === "BUTTON" ? 16 : 12),
          width: cursorState === "LAUNCH" || cursorState === "SCAN" ? 64 : cursorState === "CARD" ? 48 : cursorState === "BUTTON" ? 32 : 24,
          height: cursorState === "LAUNCH" || cursorState === "SCAN" ? 64 : cursorState === "CARD" ? 48 : cursorState === "BUTTON" ? 32 : 24,
          backgroundColor: cursorState === "LAUNCH" ? "rgba(101, 217, 255, 0.1)" : 
                           cursorState === "SCAN" ? "rgba(99, 230, 176, 0.1)" : "rgba(0,0,0,0)",
          borderColor: cursorState === "SCAN" ? "var(--color-eco)" : "rgba(101, 217, 255, 0.5)",
          borderRadius: cursorState === "SCAN" ? "0%" : "50%", // Reticle effect for scan
          rotate: cursorState === "SCAN" ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      >
        <AnimatePresence>
          {cursorState === "LAUNCH" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[8px] font-mono tracking-widest text-signal whitespace-nowrap uppercase font-bold"
            >
              LAUNCH ↗
            </motion.span>
          )}
          {cursorState === "SCAN" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 border border-eco/80 rotate-45"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
