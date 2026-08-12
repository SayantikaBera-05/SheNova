import { Track, SongQuery } from "@/types";
import { MOCK_TRACKS } from "./mockTracks";

let token: string | null = null;
let tokenExpiresAt = 0;

async function getSpotifyToken(): Promise<string | null> {
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
    
    if (!response.ok) throw new Error("Failed to get Spotify token");
    
    const data = await response.json();
    token = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
    return token;
  } catch (error) {
    console.error("Spotify auth error:", error);
    return null;
  }
}

export async function searchSingleTrack(title: string, artist: string): Promise<Track | null> {
  const token = await getSpotifyToken();
  const query = `${title} ${artist}`.trim();
  
  if (!token) {
    return {
      id: `sp-${Math.random().toString(36).substring(7)}`,
      title,
      artist,
      albumArt: `https://placehold.co/300x300/181824/A855F7?text=${encodeURIComponent(title.substring(0, 10))}`,
      spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(query)}`
    };
  }

  try {
    // Try precise search first: track:"Title" artist:"Artist"
    let params = new URLSearchParams({
      q: `track:"${title}" artist:"${artist}"`,
      type: "track",
      limit: "1"
    });
    
    let response = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    let data = await response.json();
    let item = data?.tracks?.items?.[0];

    // Fallback to broader search query if exact field search returned nothing
    if (!item) {
      params = new URLSearchParams({
        q: query,
        type: "track",
        limit: "1"
      });
      response = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      data = await response.json();
      item = data?.tracks?.items?.[0];
    }

    if (item) {
      return {
        id: item.id,
        title: item.name,
        artist: item.artists.map((a: any) => a.name).join(", "),
        albumArt: item.album?.images?.[0]?.url || item.album?.images?.[1]?.url || "https://placehold.co/300x300/181824/A855F7?text=Music",
        previewUrl: item.preview_url || undefined,
        spotifyUrl: item.external_urls?.spotify || `https://open.spotify.com/search/${encodeURIComponent(query)}`
      };
    }
  } catch (err) {
    console.error(`Error searching track "${query}":`, err);
  }

  return {
    id: `fallback-${Math.random().toString(36).substring(7)}`,
    title,
    artist,
    albumArt: `https://placehold.co/300x300/181824/A855F7?text=${encodeURIComponent(title.substring(0, 10))}`,
    spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(query)}`
  };
}

export async function resolveSongQueries(songQueries: SongQuery[]): Promise<Track[]> {
  if (!songQueries || songQueries.length === 0) return getMockTracks(5);
  
  const tracks = await Promise.all(
    songQueries.map(sq => searchSingleTrack(sq.title, sq.artist))
  );
  
  return tracks.filter((t): t is Track => t !== null);
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
      albumArt: t.album?.images?.[0]?.url || "https://placehold.co/300x300/13131C/A855F7?text=Track",
      previewUrl: t.preview_url || undefined,
      spotifyUrl: t.external_urls?.spotify
    }));
  } catch (error) {
    console.error("Spotify search error:", error);
    return getMockTracks(limit);
  }
}

function getMockTracks(limit: number): Track[] {
  const shuffled = [...MOCK_TRACKS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}
