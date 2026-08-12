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
    } catch (error: any) {
      console.error("Gemini provider failed:", error?.message || error);
      if (process.env.NODE_ENV === "production" && !process.env.OPENAI_API_KEY) {
        throw error;
      }
    }
  }
  
  // Fallback to OpenAI if key is present
  if (process.env.OPENAI_API_KEY) {
    try {
      const result = await analyzeWithOpenAI(files, keywords);
      return { ...result, mock: false };
    } catch (error: any) {
      console.error("OpenAI provider failed:", error?.message || error);
      if (process.env.NODE_ENV === "production") {
        throw error;
      }
    }
  }

  // In production, do not silently fallback to mock data if AI keys are missing
  if (process.env.NODE_ENV === "production") {
    throw new Error("Missing GEMINI_API_KEY environment variable in production.");
  }

  // Only fallback to mock in development mode
  console.warn("Using mock analysis as fallback (development mode)");
  return await getMockAnalysis(keywords || files[0]?.name);
}
