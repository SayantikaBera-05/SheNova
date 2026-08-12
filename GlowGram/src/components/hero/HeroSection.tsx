"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, X, Film } from "lucide-react";

export function HeroSection() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDemoOpen(false);
      }
    };
    if (isDemoOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isDemoOpen]);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-purple-300/40 dark:border-white/15 bg-purple-500/10 dark:bg-white/5 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-purple-900 dark:text-neonCyan mb-1 sm:mb-2 transition-colors duration-500 max-w-full text-center">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 dark:text-neonPink animate-pulse shrink-0" />
            <span className="truncate sm:whitespace-normal">AI-Powered Content & Music Curation Studio</span>
          </div>

          <h1 className="font-bold text-white text-4xl xs:text-5xl sm:text-6xl md:text-7xl leading-tight sm:leading-tight">
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
            className="text-base sm:text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed transition-colors duration-500 px-2"
          >
            Detect visual mood. Generate tailored captions & hashtags. Discover the exact Spotify soundtrack.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 w-full max-w-md sm:max-w-none mx-auto"
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 bg-purple-950 text-white hover:bg-purple-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
              onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-400 dark:text-purple-600" />
              Start Creating
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-full backdrop-blur-md transition-all duration-300 border-purple-300/60 dark:border-white/20 text-foreground bg-white/70 dark:bg-white/5 hover:bg-purple-100/70 dark:hover:bg-white/10 shadow-sm"
              onClick={() => setIsDemoOpen(true)}
            >
              <Play className="w-4 h-4 mr-2 text-purple-600 dark:text-neonCyan fill-current" />
              See Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Walkthrough Modal Portaled to Document Body (z-[9999]) */}
      {mounted && createPortal(
        <AnimatePresence>
          {isDemoOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md"
              onClick={() => setIsDemoOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-300/30 dark:border-white/20 bg-background/95 dark:bg-gray-950/95 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-purple-200/30 dark:border-white/10 bg-purple-500/5 dark:bg-white/5 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-neonCyan shrink-0">
                      <Film className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm sm:text-lg leading-none">
                        GlowGram Walkthrough
                      </h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                        AI Mood & Content Generator Demo
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDemoOpen(false)}
                    className="p-1.5 sm:p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close demo video"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Video Player */}
                <div className="relative aspect-video w-full max-h-[75vh] bg-black flex items-center justify-center overflow-hidden">
                  <video
                    src="/glowgram_video.mp4"
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain max-h-[75vh]"
                  >
                    Your browser does not support HTML5 video.
                  </video>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
