"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Upload", href: "#upload" },
    { name: "Analyze", href: "#analyze" },
    { name: "Music", href: "#music" },
    { name: "Customize", href: "#customize" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-purple-200/30 dark:border-white/10 shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 flex items-center justify-center shadow-md shrink-0">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <span className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground transition-colors duration-500">
            Glow<span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-sky-500 dark:from-neonPink dark:via-neonPurple dark:to-neonCyan">Gram</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle — Deterministic CSS-based visibility to prevent hydration errors */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full border-purple-200/60 dark:border-white/20 bg-white/70 dark:bg-white/10 hover:bg-purple-100 dark:hover:bg-white/20 text-foreground transition-all duration-300 gap-1.5 px-2.5 sm:px-3 h-8 sm:h-9"
          >
            {/* Daylight Theme Option (Hidden when .dark class is on <html>) */}
            <span className="flex items-center gap-1.5 dark:hidden">
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 animate-spin-slow" />
              <span className="text-xs font-semibold text-purple-900 hidden xs:inline">Daylight</span>
            </span>

            {/* Neon Vibe Theme Option (Visible when .dark class is on <html>) */}
            <span className="hidden items-center gap-1.5 dark:flex">
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 animate-spin-slow" />
              <span className="text-xs font-semibold text-purple-300 hidden xs:inline">Neon</span>
            </span>
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button 
            className="hidden sm:inline-flex rounded-full px-4 sm:px-5 h-8 sm:h-9 bg-purple-950 text-white hover:bg-purple-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 font-medium text-xs shadow-md transition-all duration-300 hover:scale-105" 
            onClick={() => {
              document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Started
          </Button>

          <Sheet>
            <SheetTrigger className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted transition-colors">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-popover border-purple-200/40 dark:border-white/10 w-[280px] sm:w-[350px]">
              <SheetTitle className="text-foreground mb-4 font-bold">Navigation</SheetTitle>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-base sm:text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
