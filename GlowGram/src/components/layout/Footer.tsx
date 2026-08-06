import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-md py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-neonCyan" />
          <span className="font-semibold text-white">GlowGram</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Built for the AI in Entertainment & Content Creation Hackathon.
        </p>
      </div>
    </footer>
  );
}
