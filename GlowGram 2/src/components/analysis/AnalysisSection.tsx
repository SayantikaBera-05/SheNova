"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { LoadingSkeletons } from "./LoadingSkeletons";
import { MoodIndicator } from "./MoodIndicator";
import { CaptionsCard } from "./CaptionsCard";
import { HashtagsCard } from "./HashtagsCard";
import { TrackList } from "../music/TrackList";
import { SpotifyPlaylistEmbed } from "../music/SpotifyPlaylistEmbed";
import { motion } from "framer-motion";

export function AnalysisSection() {
  const { isAnalyzing, analysisResult } = useVibeStore();

  if (!isAnalyzing && !analysisResult) return null;

  return (
    <section id="analyze" className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        {isAnalyzing ? (
          <LoadingSkeletons />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <MoodIndicator />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8 flex flex-col">
                <div className="flex-1 min-h-[400px]">
                  <CaptionsCard />
                </div>
                <HashtagsCard />
              </div>
              
              <div className="space-y-8">
                <TrackList />
                <SpotifyPlaylistEmbed />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
