import { MoodAnalysisResult } from "@/types";
import { MOCK_TRACKS } from "../spotify/mockTracks";

const MOCK_PROFILES: MoodAnalysisResult[] = [
  {
    detectedMood: "Cyberpunk",
    moodConfidence: 94,
    playlistTheme: "Neon Grid Synthwave & Dark Electro",
    playlistDescription: "Futuristic synth landscapes and high-energy electronic beats.",
    colorPalette: ["#22D3EE", "#A855F7", "#13131C"],
    emotionalTone: "High-tech, low-life, neon-drenched futuristic vibe.",
    contextDescription: "Night city aesthetics with glowing neon lights, rain reflections, and sharp contrast.",
    captions: [
      { id: "1", tone: "Aesthetic", text: "Neon tears in the rain. 🌧️⚡" },
      { id: "2", tone: "Minimal", text: "// system.override" },
      { id: "3", tone: "Funny", text: "When the wifi goes down but your LED lights are still hitting hard." },
      { id: "4", tone: "Storyteller", text: "Wandering through the digital grid, looking for a ghost in the machine." },
      { id: "5", tone: "Emotional", text: "Lost in a city of millions, holding on to a silent echo." },
      { id: "6", tone: "Viral", text: "POV: You stepped into 2077 and forgot how to act 🚀🔥" },
      { id: "7", tone: "Professional", text: "Captured the vibrant night architectural lighting across downtown." }
    ],
    hashtags: [
      { category: "Content & Scene", tags: ["#cyberpunk", "#neon", "#nightcity", "#citylights"] },
      { category: "Mood & Aesthetic", tags: ["#synthwave", "#outrun", "#darkaesthetic"] },
      { category: "Niche & Photography", tags: ["#nightphotography", "#streetleaks", "#urbanview"] },
      { category: "Trending & Viral", tags: ["#futuristic", "#digitalart", "#aestheticvibes"] }
    ],
    songQueries: [
      { title: "Resonance", artist: "HOME", reason: "Iconic synthwave track matching neon aesthetics." },
      { title: "Midnight City", artist: "M83", reason: "Uplifting synthpop for night cityscapes." },
      { title: "Nightcall", artist: "Kavinsky", reason: "Atmospheric darkwave drive music." }
    ],
    recommendedTracks: MOCK_TRACKS.slice(0, 4),
  },
  {
    detectedMood: "Golden Hour",
    moodConfidence: 91,
    playlistTheme: "Golden Sunset Acoustic & Chill Beats",
    playlistDescription: "Warm acoustic melodies and relaxing golden light harmonies.",
    colorPalette: ["#EC4899", "#FACC15", "#FFFFFF"],
    emotionalTone: "Pure joy, warm sunshine, and peaceful reflection.",
    contextDescription: "Sun-drenched horizon with soft golden light streaming across open skies.",
    captions: [
      { id: "6", tone: "Aesthetic", text: "Chasing golden sunsets and warm breezes. ☀️✨" },
      { id: "7", tone: "Minimal", text: "Golden state." },
      { id: "8", tone: "Funny", text: "Smiling so hard my cheeks hurt. Send help." },
      { id: "9", tone: "Storyteller", text: "Some days you just feel on top of the world. Today is one of them." },
      { id: "10", tone: "Emotional", text: "Grateful for moments that make time stand completely still." },
      { id: "11", tone: "Viral", text: "Golden hour hit different today 🌅✨" },
      { id: "12", tone: "Professional", text: "High dynamic range sunset landscape photography." }
    ],
    hashtags: [
      { category: "Content & Scene", tags: ["#goldenhour", "#sunset", "#skyline", "#horizon"] },
      { category: "Mood & Aesthetic", tags: ["#goodvibes", "#sunlight", "#warmtonography"] },
      { category: "Niche & Photography", tags: ["#landscapephotography", "#naturelover"] },
      { category: "Trending & Viral", tags: ["#sunsetvibes", "#goldenhourlight"] }
    ],
    songQueries: [
      { title: "Golden Hour", artist: "JVKE", reason: "Melodic piano ballad perfect for golden light." },
      { title: "Sunflowers", artist: "Post Malone", reason: "Warm upbeat summer anthem." },
      { title: "Electric Feel", artist: "MGMT", reason: "Vibrant indie pop vibe." }
    ],
    recommendedTracks: MOCK_TRACKS.slice(4, 8),
  }
];

export async function getMockAnalysis(seed?: string): Promise<MoodAnalysisResult & { mock: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const index = seed ? seed.length % MOCK_PROFILES.length : Math.floor(Math.random() * MOCK_PROFILES.length);
  return { ...MOCK_PROFILES[index], mock: true };
}
