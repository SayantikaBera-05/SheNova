"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { GlassCard } from "../shared/GlassCard";
import { ExternalLink, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SpotifyPlaylistEmbed() {
  const { analysisResult } = useVibeStore();
  const playlistId = analysisResult?.spotifyPlaylistId;
  const theme = analysisResult?.playlistTheme || analysisResult?.detectedMood || "Vibe Playlist";

  if (!analysisResult) return null;

  if (playlistId) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-2xl mt-4 border border-[#1DB954]/30">
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    );
  }

  const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(theme)}`;

  return (
    <GlassCard className="border border-[#1DB954]/40 bg-[#1DB954]/10 dark:bg-[#1DB954]/5 p-5 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl transition-all duration-500">
      <div className="flex items-center gap-3.5">
        <div className="p-3 rounded-full bg-[#1DB954]/20 text-[#1DB954] shadow-inner">
          <Disc className="w-6 h-6 animate-spin-slow" />
        </div>
        <div>
          <h4 className="text-foreground font-bold text-base transition-colors duration-500">{theme}</h4>
          <p className="text-muted-foreground text-xs mt-0.5 transition-colors duration-500">Custom AI music theme generated for your media.</p>
        </div>
      </div>

      <a href={spotifySearchUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
        <Button className="w-full sm:w-auto bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs px-4 h-9 rounded-xl flex items-center justify-center gap-2 shadow-md">
          <span>Search Theme on Spotify</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Button>
      </a>
    </GlassCard>
  );
}
