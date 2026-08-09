"use client";

import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";

export function AnimatedGradientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* ================= DARK MODE — DEEP CHARCOAL / MIDNIGHT NAVY ATMOSPHERE ================= */}
      <div className="absolute inset-0 bg-[#0b111c] opacity-0 dark:opacity-100 transition-opacity duration-700">
        {/* Subtle Futuristic Grid */}
        <div className="absolute inset-0 bg-grid-dark opacity-35" />

        {/* Ambient Deep Blue / Navy Center Burst */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,_rgba(30,58,138,0.35),_rgba(14,165,233,0.15),_transparent_65%)]" />

        {/* Deep Charcoal Vignette for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(6,10,18,0.92)_100%)]" />

        {/* 1. Subtle Top-Left Deep Blue Glow */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 140, 0],
            y: [0, -80, 0],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[15%] w-[70vw] h-[70vw] rounded-full bg-blue-700/40 blur-[130px]"
        />

        {/* 2. Subtle Top-Right Midnight Cyan Glow */}
        <motion.div
          animate={{
            scale: [1.1, 0.9, 1.25],
            x: [0, -130, 0],
            y: [0, 100, 0],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[15%] -right-[20%] w-[75vw] h-[75vw] rounded-full bg-cyan-500/30 blur-[140px]"
        />

        {/* 3. Subtle Bottom Purple Accent Glow (Subtle 10% Accent) */}
        <motion.div
          animate={{
            scale: [1, 1.35, 1],
            x: [0, 90, -70, 0],
            y: [0, 60, -50, 0],
            opacity: [0.2, 0.38, 0.2],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[25%] left-[15%] w-[65vw] h-[65vw] rounded-full bg-purple-600/25 blur-[130px]"
        />

        {/* 4. Center Indigo / Slate Glow */}
        <motion.div
          animate={{
            scale: [1.2, 0.9, 1.2],
            x: [0, -80, 70, 0],
            y: [0, -60, 60, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/40 blur-[130px]"
        />

        {/* Shifting Deep Navy & Subtle Purple Wave Mesh */}
        <div className="absolute inset-0 opacity-30 animate-aurora bg-[radial-gradient(ellipse_at_bottom_left,_rgba(37,99,235,0.25),_rgba(168,85,247,0.12),_transparent_70%)]" />
      </div>

      {/* ================= LIGHT MODE — "DAYLIGHT PASTEL AURORA" LAYER (100% UNCHANGED) ================= */}
      <div className="absolute inset-0 bg-[#F7F4FD] opacity-100 dark:opacity-0 transition-opacity duration-700">
        {/* Subtle Soft Dot Matrix */}
        <div className="absolute inset-0 bg-dots-light opacity-60" />

        {/* Soft Pastel Center Ambient Burst */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,_rgba(244,114,182,0.2),_transparent_65%)]" />

        {/* Light Soft Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(241,235,255,0.75)_100%)]" />

        {/* 1. Large Top-Left Soft Lavender Orb */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 110, 0],
            y: [0, -60, 0],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[15%] -left-[15%] w-[70vw] h-[70vw] rounded-full bg-purple-300/80 blur-[100px]"
        />

        {/* 2. Large Top-Right Baby Blue Orb */}
        <motion.div
          animate={{
            scale: [1.15, 0.95, 1.3],
            x: [0, -120, 0],
            y: [0, 80, 0],
            opacity: [0.65, 0.85, 0.65],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[15%] -right-[20%] w-[75vw] h-[75vw] rounded-full bg-sky-300/75 blur-[110px]"
        />

        {/* 3. Large Bottom Soft Pink Orb */}
        <motion.div
          animate={{
            scale: [1, 1.35, 1],
            x: [0, 80, -80, 0],
            y: [0, 50, -60, 0],
            opacity: [0.65, 0.85, 0.65],
          }}
          transition={{ duration: 23, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] left-[10%] w-[65vw] h-[65vw] rounded-full bg-pink-300/75 blur-[100px]"
        />

        {/* 4. Center Soft Peach / Amber Orb */}
        <motion.div
          animate={{
            scale: [1.2, 0.9, 1.2],
            x: [0, -60, 70, 0],
            y: [0, -50, 60, 0],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] right-[15%] w-[60vw] h-[60vw] rounded-full bg-amber-200/80 blur-[105px]"
        />

        {/* Soft Pastel Aurora Wave Mesh */}
        <div className="absolute inset-0 opacity-50 animate-aurora bg-[radial-gradient(ellipse_at_top_right,_rgba(233,213,255,0.5),_rgba(251,207,232,0.4),_transparent_70%)]" />
      </div>

      {/* Floating Particles (Theme-aware via CSS dark: classes) */}
      <FloatingParticles />
    </div>
  );
}
