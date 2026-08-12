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

  // Only fallback to mock if no AI API key works
  console.warn("Using mock analysis as fallback");
  return await getMockAnalysis(keywords || files[0]?.name);
}
