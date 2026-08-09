import OpenAI from "openai";
import { MoodAnalysisResult } from "@/types";

export async function analyzeWithOpenAI(files: File[], keywords?: string): Promise<MoodAnalysisResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

  const openai = new OpenAI({ apiKey });
  
  const contentParts: any[] = [{
    type: "text", 
    text: `Analyze this media and return a strict JSON matching this structure exactly:
    {"detectedMood": "Chill", "moodConfidence": 90, "colorPalette": ["#fff", "#000", "#ccc"], "emotionalTone": "...", "contextDescription": "...", "captions": [...], "hashtags": [...], "recommendedTracks": []}
    Keywords: ${keywords || "none"}`
  }];

  for (const file of files) {
    if (file.type.startsWith("image/")) {
      const buffer = Buffer.from(await file.arrayBuffer());
      contentParts.push({
        type: "image_url",
        image_url: { url: `data:${file.type};base64,${buffer.toString("base64")}` }
      });
    }
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: contentParts }],
    response_format: { type: "json_object" }
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("No content from OpenAI");
  return JSON.parse(content) as MoodAnalysisResult;
}
