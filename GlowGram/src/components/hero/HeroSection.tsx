"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useVibeStore } from "@/lib/store/useVibeStore";
import { Sparkles, Play } from "lucide-react";

export function HeroSection() {
  const { runAnalysis } = useVibeStore();

  const handleDemoMode = async () => {
    await runAnalysis();
    document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-300/40 dark:border-white/15 bg-purple-500/10 dark:bg-white/5 backdrop-blur-md text-xs font-semibold text-purple-900 dark:text-neonCyan mb-2 transition-colors duration-500">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 dark:text-neonPink animate-pulse" />
            <span>AI-Powered Content & Music Curation Studio</span>
          </div>

          <h1 className="font-bold text-white text-6xl md:text-7xl">
            <span style={{ textShadow: "0 0 8px rgba(124,58,237,.45), 0 0 18px rgba(168,85,247,.55), 0 0 32px rgba(236,72,153,.35), 0 0 48px rgba(14,165,233,.25)" }}>
            Turn Your Moments Into </span><br />
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-sky-500 dark:from-neonPink dark:via-neonPurple dark:to-neonCyan animate-gradient-x px-1 inline-block">
              Viral Vibes
            </span>
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed transition-colors duration-500"
          >
            Detect visual mood. Generate tailored captions & hashtags. Discover the exact Spotify soundtrack.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-14 px-8 text-base font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 bg-purple-950 text-white hover:bg-purple-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
              onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="w-5 h-5 mr-2 text-pink-400 dark:text-purple-600" />
              Start Creating
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto h-14 px-8 text-base font-semibold rounded-full backdrop-blur-md transition-all duration-300 border-purple-300/60 dark:border-white/20 text-foreground bg-white/70 dark:bg-white/5 hover:bg-purple-100/70 dark:hover:bg-white/10 shadow-sm"
              onClick={handleDemoMode}
            >
              <Play className="w-4 h-4 mr-2 text-purple-600 dark:text-neonCyan fill-current" />
              See Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
