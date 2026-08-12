"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { GlassCard } from "../shared/GlassCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "../shared/CopyButton";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";

export function CaptionsCard() {
  const { editedCaptions, updateCaption, regenerateTone } = useVibeStore();
  const [loadingTone, setLoadingTone] = useState<string | null>(null);

  if (!editedCaptions || !editedCaptions.length) return null;

  const availableTones = Array.from(new Set(editedCaptions.map(c => c.tone)));
  const defaultTab = availableTones[0] || "Aesthetic";

  const handleRegenerate = async (tone: string) => {
    setLoadingTone(tone);
    await regenerateTone(tone);
    setLoadingTone(null);
  };

  return (
    <GlassCard className="flex flex-col h-full border p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2 transition-colors duration-500">
            <span>AI <span className="font-black text-purple-600 dark:text-neonPurple">Captions</span></span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-neonPurple" />
          </h3>
          <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 transition-colors duration-500">Contextual AI captions tailored to your uploaded media.</p>
        </div>
      </div>
      
      <Tabs defaultValue={defaultTab} className="w-full flex-1 flex flex-col">
        <TabsList className="w-full justify-start overflow-x-auto bg-purple-100/60 dark:bg-black/40 border border-purple-200/50 dark:border-white/10 p-1 sm:p-1.5 rounded-xl h-auto flex-wrap gap-1 transition-colors duration-500">
          {availableTones.map(tone => (
            <TabsTrigger 
              key={tone} 
              value={tone}
              className="rounded-lg text-xs sm:text-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 data-[state=active]:bg-purple-200/80 data-[state=active]:text-purple-950 data-[state=active]:border-purple-300 dark:data-[state=active]:bg-neonPurple/20 dark:data-[state=active]:text-white dark:data-[state=active]:border-neonPurple/40 border border-transparent transition-all font-medium"
            >
              {tone}
            </TabsTrigger>
          ))}
        </TabsList>

        {availableTones.map(tone => {
          const caption = editedCaptions.find(c => c.tone === tone);
          if (!caption) return null;

          return (
            <TabsContent key={tone} value={tone} className="flex-1 mt-3 sm:mt-4 flex flex-col gap-3 sm:gap-4">
              <Textarea 
                value={caption.text}
                onChange={(e) => updateCaption(caption.id, e.target.value)}
                placeholder="AI generating caption..."
                className="flex-1 min-h-[140px] sm:min-h-[160px] bg-white/90 dark:bg-black/50 border-purple-200/60 dark:border-white/10 text-foreground text-sm sm:text-base leading-relaxed resize-none focus-visible:ring-purple-500 rounded-xl p-3 sm:p-4 transition-colors duration-500 font-sans"
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs text-muted-foreground font-mono transition-colors duration-500">{caption.text.length} characters</span>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-purple-200 dark:border-white/20 text-foreground bg-purple-50/50 dark:bg-transparent hover:bg-purple-100 dark:hover:bg-white/10 rounded-lg text-xs h-8 sm:h-9 transition-colors duration-500"
                    onClick={() => handleRegenerate(tone)}
                    disabled={loadingTone === tone}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loadingTone === tone ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                  <CopyButton text={caption.text} />
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </GlassCard>
  );
}
