"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { GlassCard } from "../shared/GlassCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "../shared/SectionHeading";
import { RefreshCw, Wand2 } from "lucide-react";
import { toast } from "sonner";

export function CustomizationStudio() {
  const { customKeywords, setCustomKeywords, isAnalyzing, runAnalysis, files } = useVibeStore();

  const handleRegenerate = async () => {
    if (files.length === 0) {
      toast.error("Please upload some files first!");
      return;
    }
    
    // Scroll up to analysis section
    document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
    await runAnalysis();
  };

  return (
    <section id="customize" className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Customization Studio" 
          subtitle="Tweak the AI's understanding before or after generation."
        />
        
        <GlassCard className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2 flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-neonPurple" />
                Custom Keywords or Vibe
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="e.g., Make it sound more poetic, focus on the sunset..."
                  value={customKeywords}
                  onChange={(e) => setCustomKeywords(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 flex-1 transition-all focus:border-neonPurple/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRegenerate();
                  }}
                />
                <Button 
                  onClick={handleRegenerate} 
                  disabled={isAnalyzing || files.length === 0}
                  className="h-12 px-6 bg-neonPurple hover:bg-neonPurple/80 text-white font-medium"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate Analysis
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Add instructions to guide the AI's output. Hit regenerate to apply your custom vibe to the entire analysis.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
