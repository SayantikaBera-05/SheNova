import { NextResponse } from 'next/server';
import { getMockAnalysis } from '@/lib/ai/mockAnalyzer';
import { searchTracks } from '@/lib/spotify/client';

export async function POST(request: Request) {
  try {
    const { type, mood, tone, keywords } = await request.json();

    if (type === "tracks") {
      const tracks = await searchTracks(`${mood} ${keywords || ""}`.trim(), 1);
      return NextResponse.json({ recommendedTracks: tracks });
    }
    
    if (type === "captions" || type === "hashtags") {
      // In a real app we'd prompt the AI provider for just one caption or hashtag group.
      // Here we fall back to a random pick from mock data for demo robustness.
      const mockResult = await getMockAnalysis(Math.random().toString());
      if (type === "captions") {
        const filtered = tone 
          ? mockResult.captions.filter(c => c.tone === tone) 
          : [mockResult.captions[0]];
        return NextResponse.json({ captions: filtered.length ? filtered : [mockResult.captions[0]] });
      } else {
        return NextResponse.json({ hashtags: mockResult.hashtags });
      }
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Regenerate API error:", error);
    return NextResponse.json({ error: "Regeneration failed" }, { status: 500 });
  }
}
