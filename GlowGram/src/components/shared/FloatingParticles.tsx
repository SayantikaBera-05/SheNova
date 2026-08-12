"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export function FloatingParticles() {
  // Generate 24 deterministic particles to avoid hydration mismatches
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      // Deterministic pseudo-random generation based on index
      const seed = (i * 9301 + 49297) % 233280;
      const rnd1 = seed / 233280;
      const seed2 = (seed * 9301 + 49297) % 233280;
      const rnd2 = seed2 / 233280;
      const seed3 = (seed2 * 9301 + 49297) % 233280;
      const rnd3 = seed3 / 233280;

      return {
        id: i,
        x: (rnd1 * 100).toFixed(2),
        y: (rnd2 * 100).toFixed(2),
        size: Math.floor(rnd3 * 4) + 3, // 3px to 6px
        duration: 14 + (i % 5) * 4, // 14s to 30s
        delay: (i % 6) * 1.5,
        colorIndex: i % 3,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => {
        let colorClasses = "";
        if (p.colorIndex === 0) {
          // Purple particle
          colorClasses =
            "bg-purple-500/50 shadow-[0_0_8px_rgba(168,85,247,0.5)] dark:bg-purple-400/80 dark:shadow-[0_0_12px_rgba(168,85,247,0.9)]";
        } else if (p.colorIndex === 1) {
          // Cyan/Blue particle
          colorClasses =
            "bg-sky-400/50 shadow-[0_0_8px_rgba(56,189,248,0.5)] dark:bg-cyan-300/80 dark:shadow-[0_0_12px_rgba(34,211,238,0.9)]";
        } else {
          // Pink/Magenta particle
          colorClasses =
            "bg-pink-400/50 shadow-[0_0_8px_rgba(244,114,182,0.5)] dark:bg-pink-400/80 dark:shadow-[0_0_12px_rgba(236,72,153,0.9)]";
        }

        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.8, 1, 0.4, 0],
              y: [-20, -120, -220, -320],
              x: [0, p.id % 2 === 0 ? 40 : -40, p.id % 2 === 0 ? -30 : 30, 0],
              scale: [0.7, 1.3, 1, 0.6],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "9999px",
            }}
            className={`transition-colors duration-700 ${colorClasses}`}
          />
        );
      })}
    </div>
  );
}
