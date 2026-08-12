import { cn } from "@/lib/utils";

export function SectionHeading({ title, subtitle, className }: { title: string, subtitle?: string, className?: string }) {
  // Parse markdown syntax *word* to apply bold gradient text highlights without italics
  const parts = title.split(/(\*[^*]+\*)/g);

  return (
    <div className={cn("space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 text-center sm:text-left", className)}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground transition-colors duration-500">
        {parts.map((part, i) => {
          if (part.startsWith('*') && part.endsWith('*')) {
            const cleanText = part.slice(1, -1);
            return (
              <span 
                key={i} 
                className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-sky-500 dark:from-neonPink dark:via-neonPurple dark:to-neonCyan px-1 inline-block"
              >
                {cleanText}
              </span>
            );
          }
          return part;
        })}
      </h2>
      {subtitle && <p className="text-xs sm:text-sm md:text-base text-muted-foreground transition-colors duration-500 font-medium">{subtitle}</p>}
    </div>
  );
}
