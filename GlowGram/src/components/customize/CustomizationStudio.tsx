"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { GlassCard } from "../shared/GlassCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "../shared/SectionHeading";
import { RefreshCw, Wand2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const SUGGESTED_PROMPTS = [
  "Recommend BTS songs",
  "Funny captions & meme vibes",
  "Bollywood classic songs",
  "Luxury & high fashion aesthetic",
  "Rainy day lofi & coffee chill"
];

export function CustomizationStudio() {
  const { customKeywords, setCustomKeywords, isAnalyzing, runAnalysis, files } = useVibeStore();

  const handleRegenerate = async () => {
    if (files.length === 0) {
      toast.error("Please upload media files first!");
      return;
    }
    
    document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
    await runAnalysis();
  };

  const handlePresetClick = (promptText: string) => {
    setCustomKeywords(promptText);
  };

  return (
    <section id="customize" className="py-20 bg-purple-100/10 dark:bg-black/10 backdrop-blur-xl border-t border-purple-200/20 dark:border-white/10 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Customization *Studio*" 
          subtitle="Guide the AI with custom instructions to steer captions, hashtags, and music recommendations."
        />
        
        <GlassCard className="max-w-2xl mx-auto border">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-foreground block mb-2.5 flex items-center gap-2 transition-colors duration-500">
                <Wand2 className="w-4 h-4 text-purple-600 dark:text-neonPurple" />
                <span>Custom AI Prompt / Specific Demands</span>
              </label>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  id="custom-keywords-input"
                  placeholder="e.g., Recommend BTS songs, funny captions, Bollywood hits..."
                  value={customKeywords}
                  onChange={(e) => setCustomKeywords(e.target.value)}
                  className="bg-white/90 dark:bg-black/50 border-purple-200/60 dark:border-white/15 text-foreground placeholder:text-muted-foreground h-12 flex-1 transition-all focus:border-purple-400 dark:focus:border-neonPurple/50 rounded-xl font-sans"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRegenerate();
                  }}
                />
                <Button 
                  onClick={handleRegenerate} 
                  disabled={isAnalyzing || files.length === 0}
                  className="h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-500 dark:from-neonPurple dark:to-neonCyan text-white font-medium rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Apply & Regenerate
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2 font-medium flex items-center gap-1.5 transition-colors duration-500">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-neonYellow" />
                  Try clicking a preset demand:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <Badge
                      key={prompt}
                      variant="outline"
                      className="cursor-pointer bg-purple-100/60 hover:bg-purple-200/80 text-purple-950 border-purple-200 dark:bg-white/5 dark:hover:bg-neonPurple/20 dark:text-gray-300 dark:hover:text-white dark:border-white/10 dark:hover:border-neonPurple/40 px-3 py-1 text-xs transition-all font-medium"
                      onClick={() => handlePresetClick(prompt)}
                    >
                      {prompt}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4 leading-relaxed transition-colors duration-500">
                Your custom prompt overrides default stylistic choices. It steers the mood, transforms caption tones, curates specific hashtags, and filters song recommendations (e.g. specific artists, languages, genres, or moods).
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
