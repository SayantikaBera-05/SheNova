import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { UploadZone } from "@/components/upload/UploadZone";
import { FilePreviewGrid } from "@/components/upload/FilePreviewGrid";
import { AnalysisSection } from "@/components/analysis/AnalysisSection";
import { CustomizationStudio } from "@/components/customize/CustomizationStudio";
import { AnimatedGradientBackground } from "@/components/shared/AnimatedGradientBackground";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-foreground relative">
      {/* Global Theme-Aware Animated Background */}
      <AnimatedGradientBackground />

      <Navbar />
      
      <main className="flex-1 relative z-10">
        <HeroSection />
        
        <section id="upload" className="py-20 relative z-10 bg-purple-100/5 dark:bg-black/10 backdrop-blur-xl border-t border-purple-200/20 dark:border-white/10 transition-colors duration-500">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-3 transition-colors duration-500">
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-sky-500 dark:from-neonPink dark:via-neonPurple dark:to-neonCyan animate-gradient-x px-1 inline-block">Start Here</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto transition-colors duration-500">
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
