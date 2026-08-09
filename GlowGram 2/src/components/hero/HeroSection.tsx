"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedGradientBackground } from "@/components/shared/AnimatedGradientBackground";
import { useVibeStore } from "@/lib/store/useVibeStore";

export function HeroSection() {
  const { runAnalysis } = useVibeStore();

  const handleDemoMode = async () => {
    // Jump straight to analysis with mock data
    await runAnalysis();
    document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      <AnimatedGradientBackground />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Turn Your Moments Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPink via-neonPurple to-neonCyan animate-gradient-x">
              Viral Vibes
            </span>
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-300 font-medium h-12"
          >
            Detect mood. Generate captions. Find the perfect soundtrack.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-14 px-8 text-lg bg-white text-black hover:bg-gray-200 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
              onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Creating
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10 rounded-full backdrop-blur-md"
              onClick={handleDemoMode}
            >
              See Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
