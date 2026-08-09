import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getMockAnalysis } from '@/lib/ai/mockAnalyzer';
import { searchSingleTrack, searchTracks } from '@/lib/spotify/client';

export async function POST(request: Request) {
  try {
    const { type, mood, tone, keywords, contextDescription, playlistTheme } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (type === "tracks") {
      if (apiKey) {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
          const prompt = `Suggest ONE specific real song (title and artist) matching this vibe.
Mood: "${mood || 'Chill'}"
Playlist Theme: "${playlistTheme || 'Aesthetic'}"
Visual Context: "${contextDescription || ''}"
User Custom Request: "${keywords || 'None'}"

Return ONLY strict JSON: { "title": "Song Title", "artist": "Artist Name" }`;
          
          const res = await model.generateContent(prompt);
          const text = res.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(text);
          if (parsed.title && parsed.artist) {
            const track = await searchSingleTrack(parsed.title, parsed.artist);
            return NextResponse.json({ recommendedTracks: [track] });
          }
        } catch (err) {
          console.warn("Gemini track regeneration error:", err);
        }
      }
      
      const tracks = await searchTracks(`${mood || ''} ${keywords || ''}`.trim(), 1);
      return NextResponse.json({ recommendedTracks: tracks });
    }

    if (type === "captions") {
      if (apiKey && tone) {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
          const prompt = `Write ONE fresh, unique social media caption in a "${tone}" tone.
Mood: "${mood || ''}"
Visual context: "${contextDescription || ''}"
User custom instruction: "${keywords || ''}"

Return ONLY strict JSON: { "text": "Caption text..." }`;

          const res = await model.generateContent(prompt);
          const text = res.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(text);
          if (parsed.text) {
            return NextResponse.json({ 
              captions: [{ id: `cap-${Date.now()}`, tone, text: parsed.text }] 
            });
          }
        } catch (err) {
          console.warn("Gemini caption regeneration error:", err);
        }
      }

      const mockResult = await getMockAnalysis(Math.random().toString());
      const filtered = tone 
        ? mockResult.captions.filter(c => c.tone === tone) 
        : [mockResult.captions[0]];
      return NextResponse.json({ captions: filtered.length ? filtered : [mockResult.captions[0]] });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Regenerate API error:", error);
    return NextResponse.json({ error: "Regeneration failed" }, { status: 500 });
  }
}
