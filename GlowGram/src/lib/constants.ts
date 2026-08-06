import { MoodTag } from "@/types";

export const MOODS: MoodTag[] = [
  "Euphoric", "Nostalgic", "Cyberpunk", "Melancholic", 
  "Hype", "Dreamy", "Romantic", "Mysterious", "Chill"
];

export const MOOD_COLORS: Record<MoodTag, { bg: string, text: string }> = {
  Euphoric: { bg: "from-neonPink to-neonYellow", text: "text-neonPink" },
  Nostalgic: { bg: "from-amber-500 to-rose-500", text: "text-amber-500" },
  Cyberpunk: { bg: "from-neonCyan to-neonPurple", text: "text-neonCyan" },
  Melancholic: { bg: "from-slate-600 to-blue-600", text: "text-blue-400" },
  Hype: { bg: "from-neonPink to-neonPurple", text: "text-neonPurple" },
  Dreamy: { bg: "from-cyan-400 to-violet-400", text: "text-cyan-400" },
  Romantic: { bg: "from-rose-400 to-pink-600", text: "text-rose-400" },
  Mysterious: { bg: "from-purple-900 to-black", text: "text-purple-400" },
  Chill: { bg: "from-teal-400 to-emerald-400", text: "text-teal-400" }
};

export const TONES = ["Aesthetic", "Storyteller", "Funny", "Hype", "Minimalist"] as const;
