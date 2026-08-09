import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { UploadZone } from "@/components/upload/UploadZone";
import { FilePreviewGrid } from "@/components/upload/FilePreviewGrid";
import { AnalysisSection } from "@/components/analysis/AnalysisSection";
import { CustomizationStudio } from "@/components/customize/CustomizationStudio";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-neonPurple/30">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        <section id="upload" className="py-20 relative z-10 bg-background/50 backdrop-blur-3xl border-t border-white/5">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Start Here</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Upload your images or videos to analyze the mood, generate captions, 
                and discover the perfect soundtrack for your moment.
              </p>
            </div>
            
            <UploadZone />
            <FilePreviewGrid />
          </div>
        </section>

        <AnalysisSection />
        <CustomizationStudio />
      </main>

      <Footer />
    </div>
  );
}
