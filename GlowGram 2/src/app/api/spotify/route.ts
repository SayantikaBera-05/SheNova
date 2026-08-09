import { NextResponse } from 'next/server';
import { searchTracks } from '@/lib/spotify/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  
  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
  }
  
  const tracks = await searchTracks(query, 5);
  return NextResponse.json({ tracks });
}
