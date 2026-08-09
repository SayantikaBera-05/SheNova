"use client";

import { useVibeStore } from "@/lib/store/useVibeStore";
import { GlassCard } from "../shared/GlassCard";

export function SpotifyPlaylistEmbed() {
  const { analysisResult } = useVibeStore();
  const playlistId = analysisResult?.spotifyPlaylistId;

  if (!playlistId) {
    return (
      <GlassCard className="h-40 flex items-center justify-center border-dashed border-[#1DB954]/50 bg-[#1DB954]/5 mt-4">
        <div className="text-center">
          <p className="text-[#1DB954] font-semibold mb-2">Playlist Sync Available in Pro</p>
          <p className="text-muted-foreground text-sm">Upgrade to generate Spotify playlists directly.</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl mt-4">
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
