import { Track } from "@/types";
import { MOCK_TRACKS } from "./mockTracks";

let token: string | null = null;
let tokenExpiresAt = 0;

async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) return null;
  
  if (token && Date.now() < tokenExpiresAt) {
    return token;
  }
  
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64")
      },
      body: "grant_type=client_credentials"
    });
    
    if (!response.ok) throw new Error("Failed to get token");
    
    const data = await response.json();
    token = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
    return token;
  } catch (error) {
    console.error("Spotify auth error:", error);
    return null;
  }
}

export async function searchTracks(query: string, limit = 5): Promise<Track[]> {
  const token = await getSpotifyToken();
  if (!token) return getMockTracks(limit);
  
  try {
    const params = new URLSearchParams({
      q: query,
      type: "track",
      limit: limit.toString()
    });
    
    const response = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error("Search failed");
    
    const data = await response.json();
    if (!data.tracks || !data.tracks.items.length) return getMockTracks(limit);
    
    return data.tracks.items.map((t: any) => ({
      id: t.id,
      title: t.name,
      artist: t.artists.map((a: any) => a.name).join(", "),
      albumArt: t.album.images[0]?.url || "https://placehold.co/300x300/13131C/A855F7?text=Track",
      previewUrl: t.preview_url,
      spotifyUrl: t.external_urls.spotify
    }));
  } catch (error) {
    console.error("Spotify search error:", error);
    return getMockTracks(limit);
  }
}

function getMockTracks(limit: number): Track[] {
  // Return random mock tracks
  const shuffled = [...MOCK_TRACKS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}
