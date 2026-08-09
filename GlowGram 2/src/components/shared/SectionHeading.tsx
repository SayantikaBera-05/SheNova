import { cn } from "@/lib/utils";

export function SectionHeading({ title, subtitle, className }: { title: string, subtitle?: string, className?: string }) {
  return (
    <div className={cn("space-y-2 mb-8", className)}>
      <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
