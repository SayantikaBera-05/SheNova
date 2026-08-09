import { create } from 'zustand';
import { MediaFile, MoodAnalysisResult, CaptionVariant } from '@/types';

interface VibeStore {
  files: MediaFile[];
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;

  isAnalyzing: boolean;
  analysisResult: MoodAnalysisResult | null;
  runAnalysis: () => Promise<void>;

  // customization state
  editedCaptions: CaptionVariant[];
  updateCaption: (id: string, newText: string) => void;
  activeHashtags: Record<string, boolean>; // tag -> selected
  toggleHashtag: (tag: string) => void;
  customKeywords: string;
  setCustomKeywords: (val: string) => void;
  regenerateTone: (tone: string) => Promise<void>;
  swapTrack: (trackId: string) => Promise<void>;

  isDemoMode: boolean;
}

export const useVibeStore = create<VibeStore>((set, get) => ({
  files: [],
  addFiles: (newFiles: File[]) => {
    const fileLimit = parseInt(process.env.NEXT_PUBLIC_MAX_FILES || "10", 10);
    const sizeLimitMB = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || "25", 10);
    
    set((state) => {
      if (state.files.length + newFiles.length > fileLimit) {
        return state; 
      }
      const mediaFiles: MediaFile[] = newFiles.map(file => ({
        id: Math.random().toString(36).substring(7),
        file,
        previewUrl: URL.createObjectURL(file),
        type: (file.type.startsWith("video") ? "video" : "image") as "image" | "video",
        sizeMB: file.size / (1024 * 1024),
        status: "pending" as const
      })).filter(f => f.sizeMB <= sizeLimitMB);

      return { files: [...state.files, ...mediaFiles] };
    });
  },
  removeFile: (id: string) => {
    set((state) => {
      const fileToRemove = state.files.find(f => f.id === id);
      if (fileToRemove) URL.revokeObjectURL(fileToRemove.previewUrl);
      return { files: state.files.filter(f => f.id !== id) };
    });
  },
  clearFiles: () => {
    set((state) => {
      state.files.forEach(f => URL.revokeObjectURL(f.previewUrl));
      return { files: [] };
    });
  },

  isAnalyzing: false,
  analysisResult: null,
  
  runAnalysis: async () => {
    set({ isAnalyzing: true });
    try {
      const files = get().files;
      const formData = new FormData();
      files.forEach(f => {
        formData.append("files", f.file);
      });
      if (get().customKeywords) {
        formData.append("userKeywords", get().customKeywords);
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data: MoodAnalysisResult & { mock?: boolean } = await response.json();
      
      const activeHashtags: Record<string, boolean> = {};
      data.hashtags.forEach(group => {
        group.tags.forEach(tag => activeHashtags[tag] = true);
      });

      set({ 
        analysisResult: data,
        editedCaptions: data.captions,
        activeHashtags,
        isDemoMode: !!data.mock
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isAnalyzing: false });
    }
  },

  editedCaptions: [],
  updateCaption: (id: string, newText: string) => {
    set((state) => ({
      editedCaptions: state.editedCaptions.map(c => c.id === id ? { ...c, text: newText } : c)
    }));
  },
  
  activeHashtags: {},
  toggleHashtag: (tag: string) => {
    set((state) => ({
      activeHashtags: {
        ...state.activeHashtags,
        [tag]: !state.activeHashtags[tag]
      }
    }));
  },
  
  customKeywords: "",
  setCustomKeywords: (val: string) => set({ customKeywords: val }),
  
  regenerateTone: async (tone: string) => {
    const result = get().analysisResult;
    if (!result) return;
    
    try {
      const response = await fetch('/api/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: "captions", 
          mood: result.detectedMood, 
          playlistTheme: result.playlistTheme,
          contextDescription: result.contextDescription,
          tone,
          keywords: get().customKeywords 
        })
      });
      const data = await response.json();
      
      if (data.captions && data.captions.length > 0) {
        set((state) => ({
          editedCaptions: state.editedCaptions.map(c => 
            c.tone === tone ? { ...c, text: data.captions[0].text } : c
          )
        }));
      }
    } catch (error) {
      console.error("Failed to regenerate tone", error);
    }
  },
  
  swapTrack: async (trackId: string) => {
    const result = get().analysisResult;
    if (!result) return;
    
    try {
      const response = await fetch('/api/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: "tracks", 
          mood: result.detectedMood,
          playlistTheme: result.playlistTheme,
          contextDescription: result.contextDescription,
          keywords: get().customKeywords
        })
      });
      const data = await response.json();
      
      if (data.recommendedTracks && data.recommendedTracks.length > 0) {
        const newTrack = data.recommendedTracks[0];
        set((state) => ({
          analysisResult: state.analysisResult ? {
            ...state.analysisResult,
            recommendedTracks: state.analysisResult.recommendedTracks.map(t => 
              t.id === trackId ? newTrack : t
            )
          } : null
        }));
      }
    } catch (error) {
      console.error("Failed to swap track", error);
    }
  },

  isDemoMode: false,
}));
