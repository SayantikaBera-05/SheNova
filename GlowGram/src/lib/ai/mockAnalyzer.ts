import { MoodAnalysisResult, MoodTag, CaptionVariant, HashtagGroup, Track } from "@/types";
import { MOCK_TRACKS } from "../spotify/mockTracks";

const MOCK_PROFILES: MoodAnalysisResult[] = [
  {
    detectedMood: "Cyberpunk",
    moodConfidence: 94,
    colorPalette: ["#22D3EE", "#A855F7", "#13131C"],
    emotionalTone: "High-tech, low-life, neon-drenched futuristic vibe.",
    contextDescription: "Night city aesthetics with glowing neon lights and sharp contrast.",
    captions: [
      { id: "1", tone: "Aesthetic", text: "Neon tears in the rain. 🌧️⚡" },
      { id: "2", tone: "Storyteller", text: "Wandering through the digital grid, looking for a ghost in the machine." },
      { id: "3", tone: "Funny", text: "When the wifi goes down but your LED lights are still hitting hard." },
      { id: "4", tone: "Hype", text: "FUTURE IS NOW. LET'S GOOOOO 🚀🔥" },
      { id: "5", tone: "Minimalist", text: "// system.override" }
    ],
    hashtags: [
      { category: "Viral", tags: ["#cyberpunk", "#neon", "#aesthetic"] },
      { category: "Niche", tags: ["#synthwave", "#outrun", "#bladerunner"] },
      { category: "Branded", tags: ["#GlowGram", "#futuretech"] },
      { category: "Trending", tags: ["#nightcity", "#digitalart"] }
    ],
    recommendedTracks: MOCK_TRACKS.slice(0, 4),
  },
  {
    detectedMood: "Euphoric",
    moodConfidence: 88,
    colorPalette: ["#EC4899", "#FACC15", "#FFFFFF"],
    emotionalTone: "Pure joy and high energy celebration.",
    contextDescription: "Bright, sunny, and incredibly vibrant atmosphere.",
    captions: [
      { id: "6", tone: "Aesthetic", text: "Chasing the sun. ☀️✨" },
      { id: "7", tone: "Storyteller", text: "Some days you just feel on top of the world. Today is one of them." },
      { id: "8", tone: "Funny", text: "Smiling so hard my cheeks hurt. Send help." },
      { id: "9", tone: "Hype", text: "UNSTOPPABLE ENERGY ONLY ⚡💯" },
      { id: "10", tone: "Minimalist", text: "bliss." }
    ],
    hashtags: [
      { category: "Viral", tags: ["#happy", "#goodvibes", "#energy"] },
      { category: "Niche", tags: ["#euphoria", "#goldenhour", "#sunshine"] },
      { category: "Branded", tags: ["#GlowGram", "#mood"] },
      { category: "Trending", tags: ["#joy", "#lifestyle"] }
    ],
    recommendedTracks: MOCK_TRACKS.slice(4, 8),
  }
];

export async function getMockAnalysis(seed?: string): Promise<MoodAnalysisResult> {
  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const index = seed ? seed.length % MOCK_PROFILES.length : Math.floor(Math.random() * MOCK_PROFILES.length);
  return { ...MOCK_PROFILES[index], mock: true } as MoodAnalysisResult & { mock: boolean };
}
