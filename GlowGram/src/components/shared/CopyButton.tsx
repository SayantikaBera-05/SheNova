"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
}

export function CopyButton({ text, className, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className={cn(
        "bg-purple-100/80 hover:bg-purple-200/80 text-purple-950 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white transition-all duration-300",
        className
      )}
      onClick={handleCopy}
    >
      {copied ? <Check className="w-4 h-4 mr-2 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-300" />}
      {label || (copied ? "Copied" : "Copy")}
    </Button>
  );
}
