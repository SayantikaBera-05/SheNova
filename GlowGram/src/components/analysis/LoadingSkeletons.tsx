"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { GlassCard } from "../shared/GlassCard";
import { Sparkles, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

export function LoadingSkeletons() {
  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto">
      {/* Theme-Aware Glowing AI Orb */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              rotate: [0, 180, 360],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-sky-400 dark:from-neonPurple dark:via-neonPink dark:to-neonCyan blur-lg opacity-70"
          />
          <div className="absolute w-14 h-14 rounded-2xl bg-white/90 dark:bg-black/60 backdrop-blur-md border border-purple-300/50 dark:border-white/20 flex items-center justify-center shadow-xl">
            <BrainCircuit className="w-7 h-7 text-purple-600 dark:text-neonCyan animate-pulse" />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-2 transition-colors duration-500">
            <span>Analyzing your vibe...</span>
            <Sparkles className="w-4 h-4 text-pink-500 dark:text-neonPink animate-spin-slow" />
          </h3>
          <p className="text-xs text-muted-foreground transition-colors duration-500">
            Examining visual aesthetics, color palettes, atmosphere, and musical harmony
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Captions Skeleton */}
        <GlassCard className="space-y-4">
          <Skeleton className="w-32 h-7 rounded-lg bg-purple-200/50 dark:bg-white/10" />
          <div className="space-y-3">
            <Skeleton className="w-full h-28 rounded-xl bg-purple-200/40 dark:bg-white/10" />
            <Skeleton className="w-2/3 h-5 rounded-md bg-purple-200/40 dark:bg-white/10" />
          </div>
        </GlassCard>

        {/* Music Skeleton */}
        <GlassCard className="space-y-4">
          <Skeleton className="w-32 h-7 rounded-lg bg-purple-200/50 dark:bg-white/10" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 items-center">
              <Skeleton className="w-14 h-14 rounded-xl bg-purple-200/40 dark:bg-white/10" />
              <div className="space-y-2 flex-1">
                <Skeleton className="w-3/4 h-4 rounded bg-purple-200/40 dark:bg-white/10" />
                <Skeleton className="w-1/2 h-3 rounded bg-purple-200/40 dark:bg-white/10" />
              </div>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
