"use client";

import { MediaFile } from "@/types";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVibeStore } from "@/lib/store/useVibeStore";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function FilePreviewCard({ file }: { file: MediaFile }) {
  const { removeFile } = useVibeStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="group relative rounded-2xl overflow-hidden bg-white/70 border border-purple-200/50 dark:bg-white/5 dark:border-white/10 aspect-square shadow-sm transition-all duration-300"
    >
      {file.type === "video" ? (
        <video 
          src={file.previewUrl} 
          className="w-full h-full object-cover opacity-90" 
          muted 
          loop 
          playsInline
          onMouseOver={(e) => e.currentTarget.play()}
          onMouseOut={(e) => e.currentTarget.pause()}
        />
      ) : (
        <img src={file.previewUrl} alt={file.file.name} className="w-full h-full object-cover opacity-90" />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3.5 flex flex-col justify-end">
        <p className="text-white text-xs font-semibold truncate">{file.file.name}</p>
        <p className="text-gray-300 text-[11px] font-mono">{file.sizeMB.toFixed(2)} MB</p>
      </div>

      <Badge 
        variant="secondary" 
        className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white border-none text-[10px] px-2 py-0.5"
      >
        {file.status}
      </Badge>

      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 shadow-md"
        onClick={(e) => {
          e.stopPropagation();
          removeFile(file.id);
        }}
      >
        <X className="w-3.5 h-3.5" />
      </Button>
    </motion.div>
  );
}
