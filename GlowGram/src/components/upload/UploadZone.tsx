"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Film, Image as ImageIcon } from "lucide-react";
import { useVibeStore } from "@/lib/store/useVibeStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { GlassCard } from "../shared/GlassCard";

export function UploadZone() {
  const { addFiles, files } = useVibeStore();
  
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      toast.error("Some files were rejected. Check size limits or file types.");
    }
    
    if (acceptedFiles.length > 0) {
      addFiles(acceptedFiles);
    }
  }, [addFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov']
    },
    maxSize: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || "25") * 1024 * 1024,
    maxFiles: parseInt(process.env.NEXT_PUBLIC_MAX_FILES || "10") - files.length
  });

  return (
    <div {...getRootProps()} className={cn("cursor-pointer transition-all duration-300", isDragActive ? "scale-[1.02]" : "")}>
      <GlassCard 
        className={cn(
          "border-2 border-dashed transition-all duration-300 ease-in-out text-center py-10 sm:py-16 px-4 sm:px-8 rounded-2xl sm:rounded-3xl",
          isDragActive 
            ? "border-purple-500 bg-purple-500/15 dark:border-neonPurple dark:bg-neonPurple/10" 
            : "border-purple-200/60 hover:border-purple-400/80 hover:bg-purple-50/50 dark:border-white/20 dark:hover:border-white/40 dark:hover:bg-white/5"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
          <div className={cn(
            "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-colors shadow-inner",
            isDragActive 
              ? "bg-purple-200 text-purple-700 dark:bg-neonPurple/20 dark:text-neonPurple" 
              : "bg-purple-100 text-purple-600 dark:bg-white/10 dark:text-white"
          )}>
            <Upload className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 transition-colors duration-500">
              {isDragActive ? "Drop files now" : "Drag & drop your moments here"}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm transition-colors duration-500">
              Supports Images & Videos (Max {process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || 25}MB)
            </p>
          </div>
          <div className="mt-2 sm:mt-3 flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-xs font-medium text-muted-foreground bg-purple-100/60 dark:bg-black/40 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-purple-200/40 dark:border-white/10 transition-colors duration-500">
            <span className="flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5 text-pink-500 dark:text-neonPink shrink-0" /> JPEG, PNG, WEBP</span>
            <span className="opacity-40 hidden xs:inline">|</span>
            <span className="flex items-center gap-1.5"><Film className="w-3.5 h-3.5 text-cyan-500 dark:text-neonCyan shrink-0" /> MP4, MOV</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
