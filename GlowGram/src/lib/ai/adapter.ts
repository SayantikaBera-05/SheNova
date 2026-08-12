import { MoodAnalysisResult } from "@/types";
import { getMockAnalysis } from "./mockAnalyzer";
import { analyzeWithGemini } from "./gemini";
import { analyzeWithOpenAI } from "./openai";

export async function analyzeMedia(files: File[], keywords?: string): Promise<MoodAnalysisResult & { mock?: boolean }> {
  // Always prioritize Gemini if key is present
  if (process.env.GEMINI_API_KEY) {
    try {
      const result = await analyzeWithGemini(files, keywords);
      return { ...result, mock: false };
    } catch (error) {
      console.error("Gemini analysis error:", error);
    }
  }
  
  // Fallback to OpenAI if key is present
  if (process.env.OPENAI_API_KEY) {
    try {
      const result = await analyzeWithOpenAI(files, keywords);
      return { ...result, mock: false };
    } catch (error) {
      console.error("OpenAI analysis error:", error);
    }
  }

  // In production, do not silently fallback to mock data if AI keys are missing or provider fails
  if (process.env.NODE_ENV === "production") {
    throw new Error("AI analysis failed in production: No valid AI API key configured or AI providers failed. Check Vercel environment variables (GEMINI_API_KEY / OPENAI_API_KEY) and Vercel logs.");
  }

  // Only fallback to mock in development mode
  console.warn("Using mock analysis as fallback (development mode)");
  return await getMockAnalysis(keywords || files[0]?.name);
}
