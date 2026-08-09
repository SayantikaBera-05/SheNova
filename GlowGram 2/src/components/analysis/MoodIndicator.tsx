"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { MOOD_COLORS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Zap, Moon, Clock, Heart, Cloud, Sparkles, Droplets, Ghost, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  Euphoric: Sparkles,
  Nostalgic: Clock,
  Cyberpunk: Zap,
  Melancholic: Droplets,
  Hype: Zap,
  Dreamy: Cloud,
  Romantic: Heart,
  Mysterious: Ghost,
  Chill: Coffee,
};

export function MoodIndicator() {
  const { analysisResult, isDemoMode } = useVibeStore();

  if (!analysisResult) return null;

  const mood = analysisResult.detectedMood;
  const colors = MOOD_COLORS[mood] || MOOD_COLORS.Chill;
  const Icon = ICONS[mood] || Sparkles;

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {isDemoMode && (
        <Badge variant="outline" className="text-neonCyan border-neonCyan mb-2">
          Demo Mode
        </Badge>
      )}
      
      <div className={cn(
        "relative px-8 py-4 rounded-full flex items-center gap-4 shadow-2xl overflow-hidden",
        "before:absolute before:inset-0 before:opacity-20 before:bg-gradient-to-r before:animate-pulse",
        `before:${colors.bg}`,
        "border border-white/20 backdrop-blur-xl bg-white/5"
      )}>
        <div className={cn("p-2 rounded-full bg-white/10", colors.text)}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
            Detected Vibe
          </p>
          <h2 className={cn("text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r", colors.bg)}>
            {mood}
          </h2>
        </div>
        
        <div className="ml-4 flex flex-col items-end">
          <span className="text-xs text-muted-foreground">Confidence</span>
          <span className="text-lg font-bold text-white">{analysisResult.moodConfidence}%</span>
        </div>
      </div>
      
      <p className="text-center text-gray-400 max-w-lg mx-auto">
        {analysisResult.emotionalTone} {analysisResult.contextDescription}
      </p>
    </div>
  );
}
