"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { GlassCard } from "../shared/GlassCard";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "../shared/CopyButton";
import { cn } from "@/lib/utils";

export function HashtagsCard() {
  const { analysisResult, activeHashtags, toggleHashtag } = useVibeStore();

  if (!analysisResult?.hashtags.length) return null;

  const selectedTags = Object.entries(activeHashtags)
    .filter(([_, isActive]) => isActive)
    .map(([tag]) => tag);

  const selectedText = selectedTags.join(" ");

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Hashtags</h3>
        <CopyButton text={selectedText} label={`Copy All (${selectedTags.length})`} />
      </div>

      <div className="space-y-6">
        {analysisResult.hashtags.map((group) => (
          <div key={group.category}>
            <h4 className="text-sm text-muted-foreground mb-3 uppercase tracking-wider font-semibold">
              {group.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.tags.map(tag => {
                const isActive = activeHashtags[tag];
                return (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn(
                      "cursor-pointer text-sm py-1.5 px-3 transition-all hover:scale-105",
                      isActive 
                        ? "bg-neonCyan/20 text-neonCyan border-neonCyan/50" 
                        : "bg-black/40 text-gray-400 border-white/10 hover:text-white"
                    )}
                    onClick={() => toggleHashtag(tag)}
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
