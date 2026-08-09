export type MoodTag = string;

export interface MediaFile {
  id: string;
  file: File;
  previewUrl: string;
  type: "image" | "video";
  sizeMB: number;
  status: "pending" | "uploaded" | "analyzing" | "done" | "error";
}

export interface CaptionVariant {
  id: string;
  tone: string; // e.g. "Aesthetic", "Minimal", "Funny", "Storyteller", "Emotional", "Viral", "Professional"
  text: string;
}

export interface HashtagGroup {
  category: string; // e.g. "Content & Scene", "Mood & Aesthetic", "Niche", "Trending", "Location"
  tags: string[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  previewUrl?: string;
  spotifyUrl: string;
}

export interface SongQuery {
  title: string;
  artist: string;
  reason?: string;
}

export interface MoodAnalysisResult {
  detectedMood: string;
  moodConfidence: number; // 0-100
  playlistTheme: string; // e.g. "Rainy Street Lofi & Chill"
  playlistDescription: string; // e.g. "Cozy jazz and soft ambient beats for quiet rainy walks."
  colorPalette: string[]; // hex codes
  emotionalTone: string;
  contextDescription: string;
  captions: CaptionVariant[];
  hashtags: HashtagGroup[];
  songQueries?: SongQuery[];
  recommendedTracks: Track[];
  spotifyPlaylistId?: string; // for embed
  mock?: boolean;
}
