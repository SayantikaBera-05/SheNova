"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Film, Image as ImageIcon } from "lucide-react";
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
          "border-2 border-dashed transition-all duration-300 ease-in-out text-center py-16",
          isDragActive ? "border-neonPurple bg-neonPurple/10" : "border-white/20 hover:border-white/40 hover:bg-white/5"
        )}
      >
        <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
          isDragActive ? "bg-neonPurple/20 text-neonPurple" : "bg-white/10 text-white"
        )}>
          <Upload className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {isDragActive ? "Drop files now" : "Drag & drop your moments here"}
          </h3>
          <p className="text-muted-foreground text-sm">
            Supports Images & Videos (Max {process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || 25}MB)
          </p>
        </div>
        <div className="mt-4 flex gap-2 text-xs text-muted-foreground bg-black/20 px-4 py-2 rounded-full">
          <ImageIcon className="w-4 h-4" /> JPEG, PNG, WEBP
          <span className="mx-2">|</span>
          <Film className="w-4 h-4" /> MP4, MOV
        </div>
      </div>
    </GlassCard>
    </div>
  );
}
