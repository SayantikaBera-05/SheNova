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

  const artworkUrl =
    track?.albumArt ||
    (track as any)?.album_art ||
    (track as any)?.albumCover ||
    (track as any)?.coverUrl ||
    (track as any)?.imageUrl ||
    (track as any)?.image ||
    (track as any)?.album?.images?.[0]?.url ||
    (track as any)?.album?.images?.[1]?.url ||
    `https://placehold.co/300x300/181824/A855F7?text=${encodeURIComponent((track?.title || "Track").substring(0, 10))}`;

  return (
    <GlassCard className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hoverEffect border">
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden shrink-0 group shadow-sm">
        <img
          src={artworkUrl}
          alt={track.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.fallback) {
              target.dataset.fallback = "true";
              target.src = `https://placehold.co/300x300/181824/A855F7?text=${encodeURIComponent((track?.title || "Track").substring(0, 10))}`;
            }
          }}
        />
        {track.previewUrl && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform p-1">
              {isPlaying ? <Pause className="w-5 h-5 sm:w-7 sm:h-7" /> : <Play className="w-5 h-5 sm:w-7 sm:h-7" />}
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-foreground font-semibold text-xs sm:text-base truncate transition-colors duration-500">{track.title}</p>
        <p className="text-muted-foreground text-[11px] sm:text-xs truncate mt-0.5 transition-colors duration-500">{track.artist}</p>
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <Button variant="ghost" size="icon" onClick={handleSwap} disabled={isSwapping} className="text-muted-foreground hover:text-foreground h-8 w-8 sm:h-9 sm:w-9">
          <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSwapping ? 'animate-spin' : ''}`} />
        </Button>
        <a href={track.spotifyUrl} target="_blank" rel="noreferrer">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-[#1DB954] h-8 w-8 sm:h-9 sm:w-9">
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>
        </a>
      </div>
    </GlassCard>
  );
}
