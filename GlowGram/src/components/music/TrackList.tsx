"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { TrackCard } from "./TrackCard";
import { motion } from "framer-motion";
import { Music, Radio } from "lucide-react";

export function TrackList() {
  const { analysisResult } = useVibeStore();

  if (!analysisResult?.recommendedTracks.length) return null;

  return (
    <div className="space-y-4" id="music">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-2xl font-extrabold text-foreground flex items-center gap-2 transition-colors duration-500">
          <span>
            AI Selected <span className="font-black text-purple-600 dark:text-neonCyan px-0.5">Tracks</span>
          </span>
          <Music className="w-5 h-5 text-[#1DB954]" />
        </h3>
        {analysisResult.playlistDescription && (
          <p className="text-xs text-muted-foreground leading-relaxed flex items-center gap-1.5 transition-colors duration-500 font-medium">
            <Radio className="w-3.5 h-3.5 text-purple-600 dark:text-neonCyan flex-shrink-0" />
            <span>{analysisResult.playlistDescription}</span>
          </p>
        )}
      </div>

      <div className="space-y-3 pt-2">
        {analysisResult.recommendedTracks.map((track, i) => (
          <motion.div
            key={`${track.id}-${i}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <TrackCard track={track} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
