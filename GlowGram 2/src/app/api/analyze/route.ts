import { NextResponse } from 'next/server';
import { analyzeMedia } from '@/lib/ai/adapter';
import { searchTracks } from '@/lib/spotify/client';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const userKeywords = formData.get('userKeywords') as string | undefined;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const analysisResult = await analyzeMedia(files, userKeywords);
    
    // Attempt to merge spotify tracks using the detected mood/keywords
    const query = `${analysisResult.detectedMood} ${userKeywords || ""}`.trim();
    const tracks = await searchTracks(query, 5);
    
    return NextResponse.json({
      ...analysisResult,
      recommendedTracks: tracks
    });
  } catch (error: any) {
    console.error('Analyze API error:', error);
    return NextResponse.json({ error: "Analysis completely failed" }, { status: 500 });
  }
}
