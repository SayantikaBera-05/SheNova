"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { getMoodStyle } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Music, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export function MoodIndicator() {
  const { analysisResult, isDemoMode } = useVibeStore();

  if (!analysisResult) return null;

  const mood = analysisResult.detectedMood || "Aesthetic";
  const style = getMoodStyle(mood);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5">
      {isDemoMode && (
        <Badge variant="outline" className="text-neonCyan border-neonCyan mb-1 px-3 py-1 text-xs">
          Demo Fallback Active
        </Badge>
      )}
      
      <div className={cn(
        "relative px-4 sm:px-8 py-4 sm:py-5 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl overflow-hidden max-w-2xl w-full border backdrop-blur-2xl transition-all duration-500",
        "bg-white/80 border-purple-200/60 shadow-[0_10px_30px_-5px_rgba(168,85,247,0.1)]",
        "dark:bg-white/[0.04] dark:border-white/15 dark:shadow-2xl"
      )}>
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start text-center sm:text-left">
          <div className={cn("p-2.5 sm:p-3 rounded-2xl bg-purple-100 dark:bg-white/10 shadow-inner shrink-0", style.text)}>
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          
          <div>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-semibold transition-colors duration-500">
              Detected Mood & Vibe
            </p>
            <h2 className={cn("text-2xl xs:text-3xl sm:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r", style.bg)}>
              {mood}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-purple-200/40 dark:border-white/10 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">Confidence</span>
            <span className="text-lg sm:text-xl font-bold text-foreground transition-colors duration-500">{analysisResult.moodConfidence || 92}%</span>
          </div>

          {analysisResult.colorPalette && analysisResult.colorPalette.length > 0 && (
            <div className="flex items-center gap-1.5 ml-2" title="Extracted Palette">
              {analysisResult.colorPalette.slice(0, 3).map((hex, i) => (
                <div 
                  key={i} 
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-purple-200 dark:border-white/20 shadow-sm shrink-0"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {analysisResult.playlistTheme && (
        <div className="flex items-center gap-2 px-3.5 sm:px-4.5 py-2 rounded-full bg-purple-100/80 border border-purple-300/60 text-purple-950 dark:bg-neonPurple/10 dark:border-neonPurple/30 dark:text-neonPurple text-xs sm:text-sm font-medium transition-colors duration-500 max-w-full text-center">
          <Music className="w-4 h-4 text-pink-600 dark:text-neonPink animate-pulse shrink-0" />
          <span className="truncate sm:whitespace-normal">Playlist Theme: <strong className="text-foreground font-bold transition-colors duration-500">{analysisResult.playlistTheme}</strong></span>
        </div>
      )}
      
      <div className="text-center space-y-2 max-w-2xl mx-auto px-2 sm:px-4">
        {analysisResult.emotionalTone && (
          <p className="text-base sm:text-lg text-foreground font-semibold transition-colors duration-500">
            "{analysisResult.emotionalTone}"
          </p>
        )}
        {analysisResult.contextDescription && (
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1.5 leading-relaxed transition-colors duration-500">
            <Compass className="w-4 h-4 text-purple-600 dark:text-neonCyan shrink-0" />
            <span>{analysisResult.contextDescription}</span>
          </p>
        )}
      </div>
    </div>
  );
}
