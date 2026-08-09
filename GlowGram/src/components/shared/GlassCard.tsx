import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function GlassCard({ className, children, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "rounded-2xl p-6 backdrop-blur-xl transition-all duration-500",
        // LIGHT MODE: Daylight Creative (white glass, pastel purple border, soft floating shadow)
        "bg-white/80 border border-purple-200/50 shadow-[0_10px_30px_-5px_rgba(168,85,247,0.08),0_4px_12px_-2px_rgba(0,0,0,0.03)]",
        // DARK MODE: Neon Vibe (dark glass, subtle white/purple border, dark outer glow)
        "dark:bg-white/[0.04] dark:border-white/10 dark:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.5),0_0_20px_0_rgba(168,85,247,0.15)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
