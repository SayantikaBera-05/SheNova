"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { GlassCard } from "../shared/GlassCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "../shared/CopyButton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { TONES } from "@/lib/constants";

export function CaptionsCard() {
  const { editedCaptions, updateCaption, regenerateTone } = useVibeStore();
  const [loadingTone, setLoadingTone] = useState<string | null>(null);

  if (!editedCaptions.length) return null;

  const handleRegenerate = async (tone: string) => {
    setLoadingTone(tone);
    await regenerateTone(tone);
    setLoadingTone(null);
  };

  return (
    <GlassCard className="flex flex-col h-full">
      <h3 className="text-2xl font-bold text-white mb-6">Captions</h3>
      
      <Tabs defaultValue={TONES[0]} className="w-full flex-1 flex flex-col">
        <TabsList className="w-full justify-start overflow-x-auto bg-black/40 border border-white/10 p-1 rounded-xl h-auto flex-wrap">
          {TONES.map(tone => (
            <TabsTrigger 
              key={tone} 
              value={tone}
              className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              {tone}
            </TabsTrigger>
          ))}
        </TabsList>

        {TONES.map(tone => {
          const caption = editedCaptions.find(c => c.tone === tone);
          if (!caption) return null;

          return (
            <TabsContent key={tone} value={tone} className="flex-1 mt-4 flex flex-col gap-4">
              <Textarea 
                value={caption.text}
                onChange={(e) => updateCaption(caption.id, e.target.value)}
                className="flex-1 min-h-[150px] bg-black/40 border-white/10 text-white text-lg resize-none focus-visible:ring-neonPurple"
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{caption.text.length} chars</span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => handleRegenerate(tone)}
                    disabled={loadingTone === tone}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loadingTone === tone ? 'animate-spin' : ''}`} />
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
