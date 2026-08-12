import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-purple-200/40 dark:border-white/10 bg-background/70 backdrop-blur-md py-8 transition-colors duration-500">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-neonCyan" />
          <span className="font-semibold text-foreground">GlowGram</span>
        </div>
        <p className="text-sm text-muted-foreground text-center md:text-right">
          Your moments. Your mood. Your soundtrack.
        </p>
      </div>
    </footer>
  );
}
