"use client";

import { Track } from "@/types";
import { GlassCard } from "../shared/GlassCard";
import { Button } from "@/components/ui/button";
import { Play, Pause, ExternalLink, RefreshCw } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useVibeStore } from "@/lib/store/useVibeStore";

export function TrackCard({ track }: { track: Track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { swapTrack } = useVibeStore();
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    if (track.previewUrl) {
      audioRef.current = new Audio(track.previewUrl);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, [track.previewUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSwap = async () => {
    setIsSwapping(true);
    await swapTrack(track.id);
    setIsSwapping(false);
  };

  return (
    <GlassCard className="flex items-center gap-4 p-4 hoverEffect border">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 group shadow-sm">
        <img src={track.albumArt} alt={track.title} className="w-full h-full object-cover" />
        {track.previewUrl && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform">
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-foreground font-semibold truncate transition-colors duration-500">{track.title}</p>
        <p className="text-muted-foreground text-xs truncate mt-0.5 transition-colors duration-500">{track.artist}</p>
      </div>

      <div className="flex items-center gap-1.5">
        <Button variant="ghost" size="icon" onClick={handleSwap} disabled={isSwapping} className="text-muted-foreground hover:text-foreground">
          <RefreshCw className={`w-4 h-4 ${isSwapping ? 'animate-spin' : ''}`} />
        </Button>
        <a href={track.spotifyUrl} target="_blank" rel="noreferrer">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-[#1DB954]">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </GlassCard>
  );
}
