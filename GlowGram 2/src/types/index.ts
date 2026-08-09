export type MoodTag =
  | "Euphoric" | "Nostalgic" | "Cyberpunk" | "Melancholic"
  | "Hype" | "Dreamy" | "Romantic" | "Mysterious" | "Chill";

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
  tone: "Aesthetic" | "Storyteller" | "Funny" | "Hype" | "Minimalist";
  text: string;
}

export interface HashtagGroup {
  category: "Viral" | "Niche" | "Branded" | "Trending";
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

export interface MoodAnalysisResult {
  detectedMood: MoodTag;
  moodConfidence: number; // 0-100
  colorPalette: string[]; // hex codes
  emotionalTone: string;
  contextDescription: string;
  captions: CaptionVariant[];
  hashtags: HashtagGroup[];
  recommendedTracks: Track[];
  spotifyPlaylistId?: string; // for embed
}
