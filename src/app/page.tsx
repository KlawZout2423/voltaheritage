"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Play, Users, Music, Star, Globe } from "lucide-react";
import { events, articles, heritageCategories, services, institution } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";

// ── helpers ──────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const heroImageVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -3 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.4 },
  },
};

// ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const featuredEvents = events.filter((e) => e.isFeatured).slice(0, 2);
  const upcomingEvents = events.slice(0, 3);
  const latestArticles = articles.slice(0, 3);
  const heritageHighlights = heritageCategories.slice(0, 4);

  return (
    <div className="bg-[var(--color-bg-secondary)] overflow-x-hidden">

      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-[95vh] flex items-center overflow-hidden mesh-gradient py-20 lg:py-0">
        {/* Background image & overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/WhatsApp Image 2026-06-02 at 16.38.11.jpeg"
            alt="Volta Heritage Dance Ensemble background"
            fill
            className="object-cover object-center opacity-25 filter blur-[3px]"
            priority
          />
          {/* Dark cinematic gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(28,18,8,0.92)] via-[rgba(28,18,8,0.75)] to-[rgba(28,18,8,0.40)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,18,8,0.85)] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column: Animated Text Content */}
          <motion.div 
            className="lg:col-span-7"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow badge */}
            <motion.div className="inline-flex items-center gap-2 mb-6" variants={heroItemVariants}>
              <span className="w-8 h-0.5 bg-[var(--color-heritage-gold)]" />
              <span className="badge badge-gold text-[10px] tracking-widest font-black">Ho, Volta Region, Ghana</span>
            </motion.div>

            <motion.h1 
              className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6 tracking-tight"
              variants={heroItemVariants}
            >
              We <span className="text-[var(--color-heritage-gold)]">Perform</span>,
              <br />
              to <span className="text-[var(--color-heritage-gold)]">Educate</span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-white/75 leading-relaxed mb-8 max-w-xl font-light"
              variants={heroItemVariants}
            >
              The Volta Heritage Dance Ensemble preserves the living cultural traditions
              of the Ewe people through authentic dance, drumming, and education —
              sharing Ghana's heritage with the world.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" variants={heroItemVariants}>
              <Link href="/events" id="hero-cta-events" className="btn-primary">
                Upcoming Events <ArrowRight size={16} />
              </Link>
              <Link href="/gallery" id="hero-cta-gallery" className="btn-outline !text-white/90 !border-white/40 bg-white/5 hover:!bg-white/15 hover:!border-white/80 hover:!text-white font-bold transition-all duration-200 shadow-sm">
                <Play size={16} /> Watch Performances
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div className="mt-12 flex flex-wrap gap-8" variants={heroItemVariants}>
              {[
                { value: "20+", label: "Years of Service" },
                { value: "8+", label: "Countries Performed" },
                { value: "24", label: "Ensemble Members" },
              ].map((stat) => (
                <div key={stat.label} className="border-l border-white/10 pl-4 first:border-0 first:pl-0">
                  <p className="font-display text-3xl font-black text-[var(--color-heritage-gold)]">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-0.5 uppercase tracking-wider font-bold">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Africa Map Silhouette Frame + Rotating Gradient Border + Floating Event Card */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative">
            <motion.div 
              className="relative w-[360px] h-[405px] sm:w-[440px] sm:h-[495px] lg:w-[500px] lg:h-[562px] flex items-center justify-center"
              variants={heroImageVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Outer breathing halo */}
              <div className="map-halo absolute inset-[-30px] z-[-2] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 58%, rgba(200,135,10,0.22) 0%, rgba(185,28,28,0.14) 40%, rgba(22,101,52,0.08) 70%, transparent 100%)", filter: "blur(28px)" }} />

              {/* Orbiting conic-gradient ring */}
              <div className="map-orbit-ring absolute inset-[-14px] z-[-1] rounded-[40%_60%_55%_45%/50%_45%_55%_50%] pointer-events-none" style={{ background: "conic-gradient(from 0deg, #C8870A, #B91C1C, #166534, #C8870A)", opacity: 0.55, filter: "blur(8px)" }} />

              {/* Ambient core glow */}
              <div className="absolute inset-[-4px] z-[-1] map-glow-pulse-slow" style={{ filter: "blur(16px)", background: "radial-gradient(ellipse at 50% 55%, rgba(200,135,10,0.5) 0%, rgba(185,28,28,0.32) 45%, rgba(22,101,52,0.18) 75%, transparent 100%)" }} />

              {/* Africa Map SVG outline */}
              <svg viewBox="0 0 109.39 122.88" className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
                <defs>
                  <linearGradient id="africa-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C8870A" />
                    <stop offset="33%" stopColor="#B91C1C" />
                    <stop offset="66%" stopColor="#166534" />
                    <stop offset="100%" stopColor="#C8870A" />
                  </linearGradient>
                  <filter id="map-glow-filter">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {/* Base filled shape */}
                <path
                  d="M96.96,97.74c-1.23,0.04-2.61,0.09-3.09,0.11C93.39,97.87,93,97.84,93,97.8c0-0.17-0.18-0.01-0.89,0.82 c-1.73,2-2.86,2.99-4.08,3.57c-0.59,0.28-0.76,0.31-1.67,0.32c-0.9,0.02-1.09,0.05-1.59,0.3c-0.74,0.37-1.44,1.07-1.8,1.79 c-0.23,0.46-0.3,0.77-0.35,1.54c-0.11,1.55-0.43,2.24-1.93,4.1c-1.55,1.93-1.88,2.64-1.88,4.1c0,0.79,0.04,1.02,0.23,1.41 c0.34,0.67,1.01,1.3,1.65,1.54c0.7,0.27,0.92,0.26,1.66-0.03l0.61-0.25l3.26,0.13l3.26,0.13l0.48-0.25 c0.57-0.32,1.07-0.87,2.12-2.44c0.44-0.65,1.33-1.92,2-2.81c1.57-2.14,4.21-6.12,5.21-7.83c1-1.71,1.06-1.96,0.97-4.08 c-0.03-0.87-0.09-1.72-0.12-1.9c-0.06-0.31-0.08-0.32-0.52-0.3C99.39,97.65,98.18,97.7,96.96,97.74L96.96,97.74L96.96,97.74z M27.02,0.1c-0.3,0.08-0.94,0.37-1.43,0.64c-1.56,0.86-2.46,1.27-2.97,1.36c-0.77,0.15-1.29,0.4-1.94,0.91 c-0.72,0.57-1.36,1.39-1.76,2.22c-0.52,1.1-1.61,1.82-3.7,2.46c-1.82,0.56-2.82,0.94-3.34,1.24c-0.67,0.4-2.79,2.2-4.98,4.22 C4.43,15.44,4.32,15.64,3.65,19c-0.62,3.15-0.98,4.08-2.01,5.28c-0.71,0.82-1.1,1.51-1.41,2.52C0.04,27.43,0,27.76,0,28.88 c0.01,1.51,0.18,2.31,0.8,3.65c0.75,1.6,1.61,3.93,2.21,6c0.43,1.49,0.64,1.94,1.5,3.21c0.94,1.41,3.17,4.17,3.62,4.48 c0.73,0.5,1.48,0.66,3.07,0.66c0.78,0,1.56-0.03,1.74-0.07c0.47-0.09,1.56,0.22,2.86,0.79c1.71,0.76,1.85,0.8,3.01,0.79 c0.77,0,1.46-0.09,2.7-0.34l1.66-0.33l0.51,0.21c1.27,0.52,1.93,0.58,3.8,0.36l0.52-0.07l0.43,0.46c0.26,0.29,0.66,0.94,1.03,1.68 c0.96,1.93,1.71,2.51,3.47,2.63c1.07,0.08,1.54,0.27,2.23,0.91c0.24,0.22,0.55,0.65,0.7,0.96c0.24,0.47,0.28,0.66,0.27,1.34 c-0.02,1.12-0.24,1.84-1.13,3.71c-1,2.09-1.13,2.56-1.13,3.74c0,1.34,0.19,1.85,1.3,3.49c1.63,2.4,2.46,4.36,2.68,6.31 c0.28,2.44,0.62,8.74,0.51,9.14c-0.25,0.86-0.81,1.66-2.67,3.78c-1.17,1.34-1.51,2.02-1.75,3.46c-0.4,2.41-0.04,4.28,1.69,8.84 c0.4,1.03,0.77,2.12,0.84,2.42c0.08,0.34,0.15,1.81,0.2,3.9c0.09,3.92,0.05,3.74,1.26,6.57c1.32,3.06,1.7,4.62,1.49,6.12 c-0.06,0.41-0.08,0.96-0.05,1.23c0.13,1.15,1.13,2.44,2.11,2.75c0.3,0.1,1.12,0.17,2.28,0.21c2.43,0.09,3.21,0.21,3.42,0.52 c0.36,0.53,0.55,0.55,4.09,0.38c1.77-0.09,4.04-0.15,5.05-0.14c1.62,0.02,1.93-0.01,2.7-0.21c2.03-0.52,4.21-1.68,6.84-3.63 c1.73-1.28,2.92-2.54,3.61-3.77c0.68-1.24,1.3-1.74,2.96-2.38c1.54-0.59,2.31-1.17,2.67-2c0.19-0.43,0.23-0.77,0.29-2.43 c0.09-2.22,0.18-2.55,0.91-3.26c1.11-1.08,2.44-1.74,5.57-2.78c2.69-0.89,3.08-1.06,3.65-1.58c1.04-0.96,1.53-2.55,1.95-6.27 c0.09-0.85,0.09-1.53,0-3.06c-0.27-4.71-0.06-7.18,0.81-9.3c0.47-1.18,1.41-2.29,2.64-3.15c0.3-0.22,1.86-1.36,3.46-2.56 c1.6-1.2,3.59-2.59,4.4-3.1c3.15-1.98,4.51-3.06,5.67-4.51c0.97-1.2,3.47-5.36,4.43-7.36c0.48-1.02,0.54-1.19,0.49-1.6 c-0.16-1.3-1.48-2.45-2.71-2.32c-0.26,0.02-0.9,0.13-1.41,0.22c-0.56,0.11-1.41,0.18-2.12,0.18c-1.01,0-1.3-0.04-1.98-0.26 c-0.95-0.31-1.63-0.77-2.07-1.39c-0.39-0.55-0.52-0.9-1.05-2.73c-0.61-2.17-0.73-2.37-2.3-3.84c-1.2-1.12-2.26-3.04-2.88-5.25 c-0.17-0.58-0.54-1.46-0.99-2.32c-0.85-1.64-1.13-2.44-1.13-3.25c0-1.47-0.51-3.15-1.64-5.41c-0.8-1.6-1.28-2.78-1.52-3.68 c-0.1-0.38-0.6-1.84-1.12-3.22c-1.01-2.72-1.95-5.47-2.13-6.28c-0.31-1.3-1.64-1.98-4.26-2.16c-1.85-0.13-4.02-1.07-8-3.43 l-1.94-1.15l-3.82-0.43c-3.59-0.4-3.83-0.42-4.08-0.28l-0.27,0.17l-0.62-0.71c-1.17-1.33-2.33-2.11-3.5-2.33 c-0.74-0.14-1.25-0.42-1.8-0.95c-0.99-0.97-1.17-1.88-0.68-3.31c0.53-1.53,0.52-2.2-0.01-2.8c-0.3-0.35-0.31-0.35-1.11-0.35 c-1.45,0-2.38-0.16-6.33-1.09c-2.42-0.57-3.92-0.7-5.38-0.46c-0.7,0.12-0.92,0.1-4.05-0.35c-1.82-0.26-3.49-0.46-3.71-0.46 c-0.54-0.01-1.22,0.23-2.23,0.8l-0.85,0.47l-0.66-0.15c-0.87-0.21-1.51-0.45-2.09-0.81C28.33,0,27.73-0.09,27.02,0.1L27.02,0.1 L27.02,0.1z"
                  fill="var(--color-heritage-black)"
                  stroke="none"
                  className="drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
                />
                {/* Animated stroke-draw outline */}
                <path
                  d="M96.96,97.74c-1.23,0.04-2.61,0.09-3.09,0.11C93.39,97.87,93,97.84,93,97.8c0-0.17-0.18-0.01-0.89,0.82 c-1.73,2-2.86,2.99-4.08,3.57c-0.59,0.28-0.76,0.31-1.67,0.32c-0.9,0.02-1.09,0.05-1.59,0.3c-0.74,0.37-1.44,1.07-1.8,1.79 c-0.23,0.46-0.3,0.77-0.35,1.54c-0.11,1.55-0.43,2.24-1.93,4.1c-1.55,1.93-1.88,2.64-1.88,4.1c0,0.79,0.04,1.02,0.23,1.41 c0.34,0.67,1.01,1.3,1.65,1.54c0.7,0.27,0.92,0.26,1.66-0.03l0.61-0.25l3.26,0.13l3.26,0.13l0.48-0.25 c0.57-0.32,1.07-0.87,2.12-2.44c0.44-0.65,1.33-1.92,2-2.81c1.57-2.14,4.21-6.12,5.21-7.83c1-1.71,1.06-1.96,0.97-4.08 c-0.03-0.87-0.09-1.72-0.12-1.9c-0.06-0.31-0.08-0.32-0.52-0.3C99.39,97.65,98.18,97.7,96.96,97.74L96.96,97.74L96.96,97.74z M27.02,0.1c-0.3,0.08-0.94,0.37-1.43,0.64c-1.56,0.86-2.46,1.27-2.97,1.36c-0.77,0.15-1.29,0.4-1.94,0.91 c-0.72,0.57-1.36,1.39-1.76,2.22c-0.52,1.1-1.61,1.82-3.7,2.46c-1.82,0.56-2.82,0.94-3.34,1.24c-0.67,0.4-2.79,2.2-4.98,4.22 C4.43,15.44,4.32,15.64,3.65,19c-0.62,3.15-0.98,4.08-2.01,5.28c-0.71,0.82-1.1,1.51-1.41,2.52C0.04,27.43,0,27.76,0,28.88 c0.01,1.51,0.18,2.31,0.8,3.65c0.75,1.6,1.61,3.93,2.21,6c0.43,1.49,0.64,1.94,1.5,3.21c0.94,1.41,3.17,4.17,3.62,4.48 c0.73,0.5,1.48,0.66,3.07,0.66c0.78,0,1.56-0.03,1.74-0.07c0.47-0.09,1.56,0.22,2.86,0.79c1.71,0.76,1.85,0.8,3.01,0.79 c0.77,0,1.46-0.09,2.7-0.34l1.66-0.33l0.51,0.21c1.27,0.52,1.93,0.58,3.8,0.36l0.52-0.07l0.43,0.46c0.26,0.29,0.66,0.94,1.03,1.68 c0.96,1.93,1.71,2.51,3.47,2.63c1.07,0.08,1.54,0.27,2.23,0.91c0.24,0.22,0.55,0.65,0.7,0.96c0.24,0.47,0.28,0.66,0.27,1.34 c-0.02,1.12-0.24,1.84-1.13,3.71c-1,2.09-1.13,2.56-1.13,3.74c0,1.34,0.19,1.85,1.3,3.49c1.63,2.4,2.46,4.36,2.68,6.31 c0.28,2.44,0.62,8.74,0.51,9.14c-0.25,0.86-0.81,1.66-2.67,3.78c-1.17,1.34-1.51,2.02-1.75,3.46c-0.4,2.41-0.04,4.28,1.69,8.84 c0.4,1.03,0.77,2.12,0.84,2.42c0.08,0.34,0.15,1.81,0.2,3.9c0.09,3.92,0.05,3.74,1.26,6.57c1.32,3.06,1.7,4.62,1.49,6.12 c-0.06,0.41-0.08,0.96-0.05,1.23c0.13,1.15,1.13,2.44,2.11,2.75c0.3,0.1,1.12,0.17,2.28,0.21c2.43,0.09,3.21,0.21,3.42,0.52 c0.36,0.53,0.55,0.55,4.09,0.38c1.77-0.09,4.04-0.15,5.05-0.14c1.62,0.02,1.93-0.01,2.7-0.21c2.03-0.52,4.21-1.68,6.84-3.63 c1.73-1.28,2.92-2.54,3.61-3.77c0.68-1.24,1.3-1.74,2.96-2.38c1.54-0.59,2.31-1.17,2.67-2c0.19-0.43,0.23-0.77,0.29-2.43 c0.09-2.22,0.18-2.55,0.91-3.26c1.11-1.08,2.44-1.74,5.57-2.78c2.69-0.89,3.08-1.06,3.65-1.58c1.04-0.96,1.53-2.55,1.95-6.27 c0.09-0.85,0.09-1.53,0-3.06c-0.27-4.71-0.06-7.18,0.81-9.3c0.47-1.18,1.41-2.29,2.64-3.15c0.3-0.22,1.86-1.36,3.46-2.56 c1.6-1.2,3.59-2.59,4.4-3.1c3.15-1.98,4.51-3.06,5.67-4.51c0.97-1.2,3.47-5.36,4.43-7.36c0.48-1.02,0.54-1.19,0.49-1.6 c-0.16-1.3-1.48-2.45-2.71-2.32c-0.26,0.02-0.9,0.13-1.41,0.22c-0.56,0.11-1.41,0.18-2.12,0.18c-1.01,0-1.3-0.04-1.98-0.26 c-0.95-0.31-1.63-0.77-2.07-1.39c-0.39-0.55-0.52-0.9-1.05-2.73c-0.61-2.17-0.73-2.37-2.3-3.84c-1.2-1.12-2.26-3.04-2.88-5.25 c-0.17-0.58-0.54-1.46-0.99-2.32c-0.85-1.64-1.13-2.44-1.13-3.25c0-1.47-0.51-3.15-1.64-5.41c-0.8-1.6-1.28-2.78-1.52-3.68 c-0.1-0.38-0.6-1.84-1.12-3.22c-1.01-2.72-1.95-5.47-2.13-6.28c-0.31-1.3-1.64-1.98-4.26-2.16c-1.85-0.13-4.02-1.07-8-3.43 l-1.94-1.15l-3.82-0.43c-3.59-0.4-3.83-0.42-4.08-0.28l-0.27,0.17l-0.62-0.71c-1.17-1.33-2.33-2.11-3.5-2.33 c-0.74-0.14-1.25-0.42-1.8-0.95c-0.99-0.97-1.17-1.88-0.68-3.31c0.53-1.53,0.52-2.2-0.01-2.8c-0.3-0.35-0.31-0.35-1.11-0.35 c-1.45,0-2.38-0.16-6.33-1.09c-2.42-0.57-3.92-0.7-5.38-0.46c-0.7,0.12-0.92,0.1-4.05-0.35c-1.82-0.26-3.49-0.46-3.71-0.46 c-0.54-0.01-1.22,0.23-2.23,0.8l-0.85,0.47l-0.66-0.15c-0.87-0.21-1.51-0.45-2.09-0.81C28.33,0,27.73-0.09,27.02,0.1L27.02,0.1 L27.02,0.1z"
                  fill="none"
                  stroke="url(#africa-border-grad)"
                  strokeWidth="1.8"
                  className="map-stroke-draw"
                  filter="url(#map-glow-filter)"
                />
              </svg>

              {/* Inner Image Masked to Africa Silhouette */}
              <div 
                className="absolute inset-[4px] z-10 overflow-hidden"
                style={{
                  maskImage: "url('/images/africa-silhouette.svg')",
                  WebkitMaskImage: "url('/images/africa-silhouette.svg')",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center"
                }}
              >
                <Image
                  src="/images/WhatsApp Image 2026-06-02 at 16.38.10.jpeg"
                  alt="Volta Heritage Dance Ensemble stage performance"
                  fill
                  className="object-cover object-center brightness-[1.12] contrast-[1.04] saturate-[1.06] scale-[1.05] group-hover:scale-[1.12] transition-transform duration-700"
                  priority
                />
              </div>

              {/* Floating Featured Event Overlay Card */}
              {featuredEvents[0] && (
                <motion.div 
                  className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 lg:left-[-40px] lg:translate-x-0 lg:bottom-[-20px] w-[90%] max-w-[280px] bg-[var(--color-heritage-black)]/85 backdrop-blur-xl border border-[var(--color-heritage-gold)]/30 rounded-2xl p-5 text-white z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-0 lg:-rotate-2 hover:lg:rotate-0 transition-transform duration-300"
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  <span className="badge badge-gold mb-3 text-[9px] font-bold bg-[var(--color-heritage-gold)]/25 text-[var(--color-heritage-gold-light)] border-[var(--color-heritage-gold)]/30">Featured Event</span>
                  <h3 className="font-display text-base font-bold mb-2 line-clamp-1 text-white">{featuredEvents[0].title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
                    <Calendar size={11} className="text-[var(--color-heritage-gold)]" />
                    <span>{formatDate(featuredEvents[0].date)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/70 mb-3">
                    <MapPin size={11} className="text-[var(--color-heritage-gold)]" />
                    <span className="line-clamp-1">{featuredEvents[0].venue}</span>
                  </div>
                  <Link href="/events" className="btn-primary btn-sm w-full py-2 justify-center text-xs font-bold">
                    Learn More
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          <span className="text-[10px] text-white/40 tracking-widest uppercase font-semibold">Scroll</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          WELCOME / INTRO STRIP
      ════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-[var(--color-border)] py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[var(--color-text-muted)] text-sm max-w-xl leading-relaxed font-light">
            <span className="font-bold text-[var(--color-text-primary)]">Volta Heritage Dance Ensemble</span> is
            an established cultural institution based in Ho, Volta Region. Since{" "}
            {institution.founded}, we have safeguarded and celebrated the living traditions of the Ewe people.
          </p>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            {[
              { icon: <Music size={14} />, label: "Dance & Drumming" },
              { icon: <Users size={14} />, label: "Cultural Education" },
              { icon: <Globe size={14} />, label: "Global Showcases" },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-secondary)] shadow-sm"
              >
                <span className="text-[var(--color-heritage-gold)]">{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CULTURAL HERITAGE HIGHLIGHTS (LIVING ARCHIVE)
      ════════════════════════════════════════════════ */}
      <section id="heritage" className="py-24 bg-[var(--color-bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <AnimateOnScroll direction="up">
              <span className="section-eyebrow">Living Archive</span>
              <h2 className="font-display text-4xl md:text-5xl font-black mt-3 mb-4 text-[var(--color-text-primary)] leading-tight">
                Our Cultural <span className="text-gradient-gold">Heritage</span>
              </h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed font-light">
                From the spiritual language of drums to the story-woven threads of Kente cloth — explore the
                pillars of Ewe culture that the ensemble preserves and performs.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {heritageHighlights.map((cat, i) => (
              <AnimateOnScroll 
                key={cat.id} 
                direction="up" 
                delay={i * 0.1}
                className="flex"
              >
                <Link
                  href={`/heritage/${cat.slug}`}
                  id={`heritage-card-${cat.slug}`}
                  className="card group relative overflow-hidden flex flex-col w-full hover:border-[var(--color-heritage-gold)]"
                >
                  <div className="aspect-heritage relative overflow-hidden rounded-t-xl">
                    <Image
                      src={cat.imageUrl}
                      alt={cat.name}
                      fill
                      className="img-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className={`badge badge-${cat.color}`}>{cat.name}</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1 bg-white">
                    <p className="text-xs font-bold text-[var(--color-text-light)] uppercase tracking-wider mb-2">{cat.tagline}</p>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3 flex-1 font-light">
                      {cat.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-heritage-gold)] group-hover:gap-3 transition-all">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>

          <div className="mt-12 text-center">
            <AnimateOnScroll direction="up" delay={0.2}>
              <Link href="/heritage" id="heritage-view-all" className="btn-outline">
                View All Heritage Categories <ArrowRight size={15} />
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          ABOUT STRIP — Our Roots
      ════════════════════════════════════════════════ */}
      <section id="about" className="bg-white py-24 border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-16 items-center">
          {/* Image side */}
          <div className="lg:col-span-5 relative">
            <AnimateOnScroll direction="left" duration={0.9}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] relative shadow-lg">
                <Image
                  src="/images/WhatsApp Image 2026-06-02 at 10.54.28.jpeg"
                  alt="Volta Heritage Dance Ensemble in full regalia"
                  fill
                  className="img-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-[var(--color-heritage-gold)] text-white rounded-2xl p-5 shadow-lg z-10">
                <p className="font-display text-3xl font-black">{institution.founded}</p>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-90">Est. in Ho</p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Text side */}
          <div className="lg:col-span-7">
            <AnimateOnScroll direction="right" duration={0.9}>
              <span className="section-eyebrow">Our Roots</span>
              <h2 className="font-display text-4xl md:text-5xl font-black mt-3 mb-6 text-[var(--color-text-primary)] leading-tight">
                Culture is not the past —
                <br />
                <span className="text-gradient-gold">it is who we are</span>
              </h2>
              <div className="text-[var(--color-text-muted)] leading-relaxed space-y-4 mb-8 font-light">
                <p>
                  The Volta Heritage Dance Ensemble was founded on a simple but profound conviction: the
                  living traditions of the Ewe people — our dances, our drums, our festivals, our cloth —
                  are not museum pieces. They are a breathing, evolving testament to who we are as a people.
                </p>
                <p>
                  For over two decades, we have carried this conviction from village squares to international
                  stages, from classrooms to cultural festivals. Every performance is both a celebration and an
                  act of preservation.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/about" id="about-learn-more" className="btn-primary">
                  Our Full Story <ArrowRight size={15} />
                </Link>
                <Link href="/about#team" id="about-meet-team" className="btn-outline">
                  Meet the Team
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          UPCOMING EVENTS (IN ORBIT)
      ════════════════════════════════════════════════ */}
      <section id="events" className="py-24 bg-[var(--color-bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <AnimateOnScroll direction="up" className="w-full flex flex-col sm:flex-row sm:items-end justify-between">
              <div>
                <span className="section-eyebrow">In Orbit</span>
                <h2 className="font-display text-4xl md:text-5xl font-black mt-3 text-[var(--color-text-primary)]">
                  Upcoming Events
                </h2>
              </div>
              <Link href="/events" id="events-view-all" className="btn-outline btn-sm flex-shrink-0 mt-4 sm:mt-0 font-bold">
                All Events <ArrowRight size={14} />
              </Link>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <AnimateOnScroll 
                key={event.id} 
                direction="up" 
                delay={i * 0.15}
                className="flex"
              >
                <div className="card flex flex-col bg-white w-full hover:border-[var(--color-heritage-gold)]">
                  <div className="aspect-card relative overflow-hidden rounded-t-xl">
                    <Image src={event.imageUrl} alt={event.title} fill className="img-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {event.isFeatured && (
                      <span className="absolute top-3 left-3 badge badge-gold">
                        <Star size={9} /> Featured
                      </span>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <span className={`badge badge-${event.category === "festival" ? "red" : event.category === "workshop" ? "green" : "gold"}`}>
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-3 leading-snug">
                      {event.title}
                    </h3>
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-semibold">
                        <Calendar size={12} className="text-[var(--color-heritage-gold)]" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-semibold">
                        <MapPin size={12} className="text-[var(--color-heritage-gold)]" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3 flex-1 font-light">
                      {event.description}
                    </p>
                    <Link href="/events" className="mt-5 btn-outline btn-sm justify-center font-bold">
                      Learn More <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SERVICES STRIP (OFFERINGS)
      ════════════════════════════════════════════════ */}
      <section id="services" className="py-24 bg-[var(--color-heritage-black)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <AnimateOnScroll direction="up">
              <span className="section-eyebrow">Offerings</span>
              <h2 className="font-display text-4xl md:text-5xl font-black mt-3 mb-4 text-white">
                Our <span className="text-[var(--color-heritage-gold)]">Services</span>
              </h2>
              <p className="text-white/60 leading-relaxed font-light">
                From stage performances to school workshops, we bring Ewe cultural heritage to life for
                audiences of all backgrounds and settings.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.slice(0, 6).map((svc, i) => (
              <AnimateOnScroll 
                key={svc.id} 
                direction="up" 
                delay={i * 0.1}
                className="flex"
              >
                <div
                  className={`bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/25 transition-all group card-${svc.color} w-full flex flex-col justify-between`}
                >
                  <div>
                    <div
                      className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center text-sm font-black ${
                        svc.color === "gold"
                          ? "bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)]"
                          : svc.color === "red"
                          ? "bg-[var(--color-heritage-red-light)] text-[var(--color-heritage-red)]"
                          : "bg-[var(--color-heritage-green-light)] text-[var(--color-heritage-green)]"
                      }`}
                    >
                      {svc.title.slice(0, 2)}
                    </div>
                    <h3 className="font-display font-bold text-lg text-white mb-2">{svc.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed mb-4 line-clamp-3 font-light">{svc.description}</p>
                  </div>
                  <ul className="space-y-1.5 mt-2">
                    {svc.features.slice(0, 2).map((f) => (
                      <li key={f} className="text-xs text-white/40 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-heritage-gold)] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <div className="mt-12 text-center">
            <AnimateOnScroll direction="up" delay={0.2}>
              <Link href="/services" id="services-view-all" className="btn-primary">
                View All Services <ArrowRight size={15} />
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          LATEST NEWS (BLUE SPOTLIGHT)
      ════════════════════════════════════════════════ */}
      <section id="news" className="py-24 bg-white border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <AnimateOnScroll direction="up" className="w-full flex flex-col sm:flex-row sm:items-end justify-between">
              <div>
                <span className="section-eyebrow">Blue Spotlight</span>
                <h2 className="font-display text-4xl md:text-5xl font-black mt-3 text-[var(--color-text-primary)]">
                  Latest News
                </h2>
              </div>
              <Link href="/news" id="news-view-all" className="btn-outline btn-sm flex-shrink-0 mt-4 sm:mt-0 font-bold">
                All Articles <ArrowRight size={14} />
              </Link>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.map((article, i) => (
              <AnimateOnScroll 
                key={article.id} 
                direction="up" 
                delay={i * 0.15}
                className="flex"
              >
                <article className={`card flex flex-col bg-white w-full hover:border-[var(--color-heritage-gold)] ${i === 0 ? "card-gold" : ""}`}>
                  <div className="aspect-card relative overflow-hidden rounded-t-xl">
                    <Image
                      src={article.thumbnailUrl}
                      alt={article.title}
                      fill
                      className="img-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`badge ${
                        article.category === "news" ? "badge-gold"
                        : article.category === "cultural-story" ? "badge-red"
                        : "badge-green"
                      }`}>
                        {article.category.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-[var(--color-text-light)] mb-2 font-semibold">
                      {formatDate(article.publishedAt)} · {article.author}
                    </p>
                    <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] leading-snug mb-3 flex-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-5 font-light">
                      {article.excerpt}
                    </p>
                    <Link href={`/news/${article.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-heritage-gold)] hover:gap-3 transition-all">
                      Read Article <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CTA — CONTACT BANNER (CONNECT)
      ════════════════════════════════════════════════ */}
      <section className="py-20 bg-[var(--color-bg-tertiary)] border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimateOnScroll direction="up">
            <span className="section-eyebrow">Connect</span>
            <h2 className="font-display text-4xl md:text-5xl font-black mt-3 mb-5 text-[var(--color-text-primary)]">
              Bring Volta Heritage to{" "}
              <span className="text-gradient-gold">Your Event</span>
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-8 max-w-lg mx-auto font-light">
              Whether you are planning a state ceremony, international showcase, school programme, or
              cultural festival — we would be honoured to share our heritage with you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" id="cta-book-us" className="btn-primary">
                Book a Performance <ArrowRight size={15} />
              </Link>
              <Link href="/services" id="cta-our-services" className="btn-outline">
                Explore Our Offerings
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
