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
      className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 aspect-square"
    >
      {file.type === "video" ? (
        <video 
          src={file.previewUrl} 
          className="w-full h-full object-cover opacity-80" 
          muted 
          loop 
          playsInline
          onMouseOver={(e) => e.currentTarget.play()}
          onMouseOut={(e) => e.currentTarget.pause()}
        />
      ) : (
        <img src={file.previewUrl} alt={file.file.name} className="w-full h-full object-cover opacity-80" />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
        <p className="text-white text-sm font-medium truncate">{file.file.name}</p>
        <p className="text-gray-400 text-xs">{file.sizeMB.toFixed(2)} MB</p>
      </div>

      <Badge 
        variant="secondary" 
        className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-white border-none"
      >
        {file.status}
      </Badge>

      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100"
        onClick={(e) => {
          e.stopPropagation();
          removeFile(file.id);
        }}
      >
        <X className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}
