import { GoogleGenerativeAI } from "@google/generative-ai";
import { MoodAnalysisResult } from "@/types";

const MODEL_CANDIDATES = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-2.0-flash-lite"
];

export async function analyzeWithGemini(files: File[], keywords?: string): Promise<MoodAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

  const genAI = new GoogleGenerativeAI(apiKey);

  const prompt = `You are GlowGram's expert AI visual analyst and creative director.
Examine the provided media file(s) in extreme detail (look at people, objects, facial expressions, background, scenery, weather, lighting, colors, clothing, activity, emotion, and aesthetic).

USER CUSTOM PROMPT / INSTRUCTIONS:
"${keywords || 'No custom instruction provided. Base analysis purely on visual content.'}"

CRITICAL INSTRUCTIONS:
1. If the USER CUSTOM PROMPT specifies a music genre, artist, tone, or theme (e.g., "Recommend BTS songs", "Funny captions", "Bollywood songs", "Luxury aesthetic", "Lo-fi study"), you MUST prioritize that custom request across captions, hashtags, playlistTheme, and song recommendations while remaining context-aware of the uploaded media.
2. DO NOT restrict the detectedMood to a small fixed list. Choose or compose the single most evocative, precise mood string (e.g. "Rainy Street", "Golden Hour", "Cozy Cafe", "Cyberpunk", "Vintage Nostalgia", "Dark Urban", "Luxury Minimal", "Monsoon Evening", "Tropical Beach", "Chill Drive", "Energetic Party", "Spring Bliss", etc.).
3. Recommend 5 real, existing songs (Song Title + Artist Name + short reason) that match the visual atmosphere, energy, and user custom prompt. Do NOT make up fake songs.
4. Generate 7 distinct, creative, context-specific captions covering these exact tones: Aesthetic, Minimal, Funny, Storyteller, Emotional, Viral, Professional.
5. Generate 4-5 categories of hashtags (Content & Scene, Mood & Aesthetic, Niche & Photography, Trending & Viral, Location & Vibe).

Return ONLY a strict JSON object (no markdown, no preamble) matching this structure:
{
  "detectedMood": string,
  "moodConfidence": number (80-99),
  "playlistTheme": string,
  "playlistDescription": string,
  "colorPalette": string[] (3 hex colors extracted from media, e.g. ["#1A1A24", "#FF6B6B", "#4ECDC4"]),
  "emotionalTone": string (1 sentence describing overall emotional vibe),
  "contextDescription": string (2-3 detailed sentences describing key objects, people, lighting, weather, and scenery visible in the media),
  "captions": [
    { "id": "cap-1", "tone": "Aesthetic", "text": "..." },
    { "id": "cap-2", "tone": "Minimal", "text": "..." },
    { "id": "cap-3", "tone": "Funny", "text": "..." },
    { "id": "cap-4", "tone": "Storyteller", "text": "..." },
    { "id": "cap-5", "tone": "Emotional", "text": "..." },
    { "id": "cap-6", "tone": "Viral", "text": "..." },
    { "id": "cap-7", "tone": "Professional", "text": "..." }
  ],
  "hashtags": [
    { "category": "Content & Scene", "tags": ["#tag1", "#tag2", ...] },
    { "category": "Mood & Aesthetic", "tags": ["#tag1", "#tag2", ...] },
    { "category": "Niche & Photography", "tags": ["#tag1", "#tag2", ...] },
    { "category": "Trending & Viral", "tags": ["#tag1", "#tag2", ...] }
  ],
  "songQueries": [
    { "title": "Song Name 1", "artist": "Artist Name 1", "reason": "..." },
    { "title": "Song Name 2", "artist": "Artist Name 2", "reason": "..." },
    { "title": "Song Name 3", "artist": "Artist Name 3", "reason": "..." },
    { "title": "Song Name 4", "artist": "Artist Name 4", "reason": "..." },
    { "title": "Song Name 5", "artist": "Artist Name 5", "reason": "..." }
  ]
}`;

  const parts = await Promise.all(
    files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      return {
        inlineData: {
          data: Buffer.from(arrayBuffer).toString("base64"),
          mimeType: file.type || "image/jpeg",
        },
      };
    })
  );

  let lastError: any = null;
  for (const modelName of MODEL_CANDIDATES) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent([prompt, ...parts]);
      const response = await result.response;
      const text = response.text();
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleanJson) as MoodAnalysisResult;
      
      // Ensure required arrays exist
      if (!parsed.captions) parsed.captions = [];
      if (!parsed.hashtags) parsed.hashtags = [];
      if (!parsed.recommendedTracks) parsed.recommendedTracks = [];
      
      return parsed;
    } catch (err: any) {
      console.warn(`Gemini model ${modelName} failed:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error("All Gemini model candidates failed");
}
