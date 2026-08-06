import { MoodAnalysisResult } from "@/types";
import { getMockAnalysis } from "./mockAnalyzer";
import { analyzeWithGemini } from "./gemini";
import { analyzeWithOpenAI } from "./openai";

export async function analyzeMedia(files: File[], keywords?: string): Promise<MoodAnalysisResult & { mock?: boolean }> {
  const provider = process.env.AI_PROVIDER || "mock";
  
  try {
    if (provider === "gemini" && process.env.GEMINI_API_KEY) {
      return await analyzeWithGemini(files, keywords);
    } else if (provider === "openai" && process.env.OPENAI_API_KEY) {
      return await analyzeWithOpenAI(files, keywords);
    }
  } catch (error) {
    console.error(`Error with ${provider}:`, error);
  }
  
  return await getMockAnalysis(keywords || files[0]?.name);
}
