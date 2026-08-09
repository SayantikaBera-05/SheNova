import { NextResponse } from 'next/server';
import { analyzeMedia } from '@/lib/ai/adapter';
import { getMockAnalysis } from '@/lib/ai/mockAnalyzer';
import { resolveSongQueries, searchTracks } from '@/lib/spotify/client';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const userKeywords = formData.get('userKeywords') as string | undefined;

    let analysisResult;
    if (!files || files.length === 0) {
      analysisResult = await getMockAnalysis(userKeywords || "demo");
    } else {
      analysisResult = await analyzeMedia(files, userKeywords);
    }
    
    // If AI recommended specific song queries (title + artist), resolve them on Spotify
    let tracks;
    if (analysisResult.songQueries && analysisResult.songQueries.length > 0) {
      tracks = await resolveSongQueries(analysisResult.songQueries);
    } else {
      const query = `${analysisResult.playlistTheme || analysisResult.detectedMood} ${userKeywords || ""}`.trim();
      tracks = await searchTracks(query, 5);
    }
    
    return NextResponse.json({
      ...analysisResult,
      recommendedTracks: tracks
    });
  } catch (error: any) {
    console.error('Analyze API error:', error);
    return NextResponse.json({ error: "Analysis completely failed" }, { status: 500 });
  }
}
