import { GoogleGenerativeAI } from "@google/generative-ai";
import { MoodAnalysisResult } from "@/types";

export async function analyzeWithGemini(files: File[], keywords?: string): Promise<MoodAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `Analyze this media and return a strict JSON matching this interface:
  {
    "detectedMood": "Euphoric" | "Nostalgic" | "Cyberpunk" | "Melancholic" | "Hype" | "Dreamy" | "Romantic" | "Mysterious" | "Chill",
    "moodConfidence": number, // 0-100
    "colorPalette": string[], // 3 hex codes
    "emotionalTone": string,
    "contextDescription": string,
    "captions": [ { "id": "1", "tone": "Aesthetic", "text": "..." }, ... 5 total (Aesthetic, Storyteller, Funny, Hype, Minimalist) ],
    "hashtags": [ { "category": "Viral"|"Niche"|"Branded"|"Trending", "tags": [...] }, ... 4 total groups ],
    "recommendedTracks": []
  }
  Keywords: ${keywords || "none"}`;

  const parts = await Promise.all(files.map(async file => {
    const arrayBuffer = await file.arrayBuffer();
    return {
      inlineData: {
        data: Buffer.from(arrayBuffer).toString("base64"),
        mimeType: file.type
      }
    };
  }));
  
  const result = await model.generateContent([prompt, ...parts]);
  const response = await result.response;
  const text = response.text();
  const jsonStr = text.replace(/```json/g, "").replace(/```/g, "");
  return JSON.parse(jsonStr) as MoodAnalysisResult;
}
