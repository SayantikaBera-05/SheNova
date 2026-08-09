"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { FilePreviewCard } from "./FilePreviewCard";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FilePreviewGrid() {
  const { files, isAnalyzing, runAnalysis } = useVibeStore();

  if (files.length === 0) return null;

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground transition-colors duration-500">
          Selected Files ({files.length})
        </h3>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-purple-600 via-pink-500 to-sky-500 text-white dark:from-neonPurple dark:to-neonCyan hover:opacity-90 shadow-lg font-semibold rounded-full px-6 transition-all duration-300 hover:scale-105"
          onClick={() => {
            runAnalysis();
            setTimeout(() => {
              document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Vibe...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Analyze Vibe
            </>
          )}
        </Button>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
      >
        <AnimatePresence>
          {files.map(file => (
            <FilePreviewCard key={file.id} file={file} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
