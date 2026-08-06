"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { TrackCard } from "./TrackCard";
import { motion } from "framer-motion";

export function TrackList() {
  const { analysisResult } = useVibeStore();

  if (!analysisResult?.recommendedTracks.length) return null;

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Soundtrack</h3>
      <div className="space-y-4">
        {analysisResult.recommendedTracks.map((track, i) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <TrackCard track={track} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
