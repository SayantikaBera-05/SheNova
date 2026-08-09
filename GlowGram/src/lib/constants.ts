export const TONES = [
  "Aesthetic", 
  "Minimal", 
  "Funny", 
  "Storyteller", 
  "Emotional", 
  "Viral", 
  "Professional"
] as const;

export const KNOWN_MOOD_STYLES: Record<string, { bg: string, text: string }> = {
  Euphoric: { bg: "from-pink-500 to-yellow-400", text: "text-pink-400" },
  Nostalgic: { bg: "from-amber-500 to-rose-500", text: "text-amber-400" },
  Cyberpunk: { bg: "from-cyan-400 to-purple-600", text: "text-cyan-400" },
  Melancholic: { bg: "from-slate-600 to-blue-600", text: "text-blue-400" },
  Hype: { bg: "from-fuchsia-500 to-purple-600", text: "text-fuchsia-400" },
  Dreamy: { bg: "from-cyan-400 to-violet-400", text: "text-cyan-400" },
  Romantic: { bg: "from-rose-400 to-pink-600", text: "text-rose-400" },
  Mysterious: { bg: "from-purple-900 to-indigo-900", text: "text-purple-400" },
  Chill: { bg: "from-teal-400 to-emerald-400", text: "text-teal-400" },
  Rainy: { bg: "from-sky-700 to-slate-800", text: "text-sky-300" },
  Monsoon: { bg: "from-cyan-700 to-slate-900", text: "text-cyan-300" },
  Cozy: { bg: "from-amber-700 to-orange-900", text: "text-amber-300" },
  "Golden Hour": { bg: "from-amber-400 to-rose-600", text: "text-amber-300" },
  Travel: { bg: "from-blue-500 to-emerald-500", text: "text-emerald-300" },
  Adventure: { bg: "from-green-600 to-amber-600", text: "text-amber-300" },
  Party: { bg: "from-violet-600 to-pink-500", text: "text-pink-300" },
  Street: { bg: "from-zinc-500 to-neutral-800", text: "text-zinc-300" },
  Vintage: { bg: "from-yellow-700 to-stone-800", text: "text-yellow-400" },
  Minimal: { bg: "from-gray-400 to-slate-700", text: "text-gray-300" },
  Dark: { bg: "from-slate-900 to-black", text: "text-slate-400" },
  Luxury: { bg: "from-amber-300 to-yellow-600", text: "text-amber-200" },
  Elegant: { bg: "from-purple-300 to-slate-800", text: "text-purple-300" },
  Cute: { bg: "from-pink-300 to-rose-400", text: "text-pink-300" },
  Nature: { bg: "from-emerald-500 to-teal-700", text: "text-emerald-300" },
  Beach: { bg: "from-amber-300 to-cyan-500", text: "text-cyan-300" },
  "Night Drive": { bg: "from-indigo-900 to-purple-950", text: "text-indigo-300" },
  Cafe: { bg: "from-amber-800 to-stone-900", text: "text-amber-400" },
  Festival: { bg: "from-fuchsia-600 to-orange-500", text: "text-fuchsia-300" },
  Celebration: { bg: "from-yellow-400 to-pink-600", text: "text-yellow-300" },
  Emotional: { bg: "from-indigo-600 to-rose-700", text: "text-rose-300" },
  Lonely: { bg: "from-blue-900 to-slate-900", text: "text-blue-300" },
  Urban: { bg: "from-neutral-600 to-zinc-900", text: "text-zinc-300" }
};

const DYNAMIC_PALETTES = [
  { bg: "from-pink-500 to-purple-600", text: "text-pink-400" },
  { bg: "from-cyan-400 to-blue-600", text: "text-cyan-400" },
  { bg: "from-amber-400 to-rose-500", text: "text-amber-400" },
  { bg: "from-emerald-400 to-teal-600", text: "text-emerald-400" },
  { bg: "from-violet-500 to-indigo-600", text: "text-violet-400" },
  { bg: "from-rose-400 to-red-600", text: "text-rose-400" }
];

export function getMoodStyle(mood: string): { bg: string, text: string } {
  if (!mood) return DYNAMIC_PALETTES[0];
  
  // Direct match or partial match
  const normalized = mood.toLowerCase().trim();
  for (const [key, style] of Object.entries(KNOWN_MOOD_STYLES)) {
    if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
      return style;
    }
  }

  // Fallback hash to pick deterministic palette from array
  let hash = 0;
  for (let i = 0; i < mood.length; i++) {
    hash = mood.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % DYNAMIC_PALETTES.length;
  return DYNAMIC_PALETTES[index];
}

