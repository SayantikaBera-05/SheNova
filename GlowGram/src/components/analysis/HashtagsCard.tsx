"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { GlassCard } from "../shared/GlassCard";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "../shared/CopyButton";
import { cn } from "@/lib/utils";
import { Hash } from "lucide-react";

export function HashtagsCard() {
  const { analysisResult, activeHashtags, toggleHashtag } = useVibeStore();

  if (!analysisResult?.hashtags || !analysisResult.hashtags.length) return null;

  const selectedTags = Object.entries(activeHashtags)
    .filter(([_, isActive]) => isActive)
    .map(([tag]) => tag);

  const selectedText = selectedTags.join(" ");

  return (
    <GlassCard className="border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-extrabold text-foreground flex items-center gap-2 transition-colors duration-500">
            <span>Smart <span className="font-black text-purple-600 dark:text-neonCyan">Hashtags</span></span>
            <Hash className="w-5 h-5 text-purple-600 dark:text-neonCyan" />
          </h3>
          <p className="text-xs text-muted-foreground mt-1 transition-colors duration-500">Smart, non-generic hashtags grouped for maximum reach.</p>
        </div>
        <CopyButton text={selectedText} label={`Copy Selected (${selectedTags.length})`} />
      </div>

      <div className="space-y-5">
        {analysisResult.hashtags.map((group) => (
          <div key={group.category}>
            <h4 className="text-xs text-muted-foreground mb-2.5 uppercase tracking-widest font-semibold flex items-center gap-1.5 transition-colors duration-500">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-neonCyan"></span>
              <span>{group.category}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.tags.map(tag => {
                const formattedTag = tag.startsWith('#') ? tag : `#${tag}`;
                const isActive = activeHashtags[formattedTag] ?? activeHashtags[tag] ?? true;
                
                return (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn(
                      "cursor-pointer text-xs py-1.5 px-3 transition-all hover:scale-105 rounded-xl border font-sans font-medium",
                      isActive 
                        ? "bg-purple-200/80 text-purple-950 border-purple-300 shadow-sm font-semibold dark:bg-neonCyan/15 dark:text-neonCyan dark:border-neonCyan/40 dark:shadow-neonCyan/10" 
                        : "bg-white/60 text-muted-foreground border-purple-200/60 hover:text-foreground dark:bg-black/40 dark:text-gray-400 dark:border-white/10 dark:hover:text-white"
                    )}
                    onClick={() => toggleHashtag(formattedTag)}
                  >
                    {formattedTag}
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
