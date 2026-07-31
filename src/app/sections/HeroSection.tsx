"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { HeroData } from "@/context/CmsContext";

// ── Animation variants ─────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};
const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -3 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.4 } },
};

// ── Counter — only animates when visible on screen ─────────────
function Counter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/\d/g, "");

  // Intersection Observer — fire animation only once when in view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTs: number | null = null;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      setCount(Math.floor(progress * numeric));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, numeric, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Component ──────────────────────────────────────────────────
export default function HeroSection({ heroContent }: { heroContent: HeroData }) {
  return (
    <section id="hero" className="relative min-h-[95vh] flex items-center overflow-visible lg:overflow-hidden bg-[#1c1400] py-20 lg:py-0 pb-32 lg:pb-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(200,135,10,0.08)_0%,transparent_75%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center w-full">

        {/* ── Left: Text ── */}
        <motion.div
          className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full"
          variants={containerVariants} initial="hidden" animate="visible"
        >
          <motion.div className="inline-flex items-center gap-2 mb-6" variants={itemVariants}>
            <span className="w-8 h-0.5 bg-[var(--color-heritage-gold)]" />
            <span className="badge badge-gold text-[10px] tracking-widest font-black bg-[var(--color-heritage-gold)]/20 text-[var(--color-heritage-gold-light)] border-[var(--color-heritage-gold)]/30">
              {heroContent.location}
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6 tracking-tight text-center lg:text-left"
            variants={itemVariants}
          >
            {heroContent.title.includes("Perform") && heroContent.title.includes("Educate") ? (
              <>We <span className="text-[var(--color-heritage-gold)]">Perform</span> to <span className="text-[var(--color-heritage-gold)]">Educate</span></>
            ) : heroContent.title}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/75 leading-relaxed mb-6 max-w-xl font-light text-center lg:text-left mx-auto lg:mx-0"
            variants={itemVariants}
          >
            {heroContent.subtitle}
          </motion.p>

          <motion.div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-6" variants={itemVariants}>
            <Link href="/contact" id="hero-cta-book" className="btn-primary">
              {heroContent.ctaPrimaryText} <ArrowRight size={16} />
            </Link>
            <Link href="/gallery" id="hero-cta-watch"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white border border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 hover:scale-[1.02] active:scale-100 transition-all duration-200 text-sm">
              <Play size={14} className="fill-current text-white" /> {heroContent.ctaSecondaryText}
            </Link>
          </motion.div>

          {/* Stats — Counter fires only when scrolled into view */}
          <motion.div className="w-full border-y border-[rgba(200,149,26,0.15)] py-6 my-6" variants={itemVariants}>
            <div className="grid grid-cols-3 w-full gap-2 sm:gap-4">
              {heroContent.stats.map((stat, i) => (
                <div key={stat.label}
                  className={`flex flex-col items-center lg:items-start px-2 sm:px-4 ${i > 0 ? "border-l border-[rgba(200,149,26,0.15)]" : ""}`}>
                  <p className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-[var(--color-heritage-gold)] mb-0.5 text-center lg:text-left">
                    <Counter value={stat.value} />
                  </p>
                  <p className="text-[8px] sm:text-[9px] md:text-[10px] text-white/55 uppercase tracking-widest font-black leading-tight text-center lg:text-left">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="hidden sm:flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 w-full" variants={itemVariants}>
            <span className="text-[10px] uppercase tracking-widest font-black text-white/40">Featured at:</span>
            {[["🏛", "National Festivals"], ["🎓", "Educational Institutions"], ["🌍", "International Cultural Events"]].map(([icon, label]) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80">
                <span className="text-sm">{icon}</span> {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Image ── */}
        <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center lg:items-end w-full">
          <motion.div
            className="relative w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] flex items-center justify-center flex-shrink-0 animate-float"
            variants={imageVariants} initial="hidden" animate="visible"
          >
            <div className="absolute w-[120%] h-[120%] rounded-full bg-[radial-gradient(circle,rgba(200,135,10,0.22)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />

            <svg className="absolute w-[130%] h-[130%] -top-[15%] -left-[15%] text-[var(--color-heritage-gold)]/22 pointer-events-none z-0" viewBox="0 0 500 500" fill="none">
              <circle cx="250" cy="250" r="220" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8 8" className="animate-[spin_120s_linear_infinite]" />
              <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="1.8" strokeDasharray="4 4" className="animate-[spin_90s_linear_infinite_reverse]" />
              <path d="M250,15 L245,30 L255,30 Z M250,485 L245,470 L255,470 Z M15,250 L30,245 L30,255 Z M485,250 L470,245 L470,255 Z" fill="currentColor" />
              <g transform="translate(85,85) scale(0.5)" stroke="currentColor" strokeWidth="5.5" fill="none">
                <path d="M 20,50 C 5,50 5,20 20,20 C 35,20 35,50 20,50 Z" /><path d="M 80,50 C 95,50 95,20 80,20 C 65,20 65,50 80,50 Z" /><path d="M 50,20 L 50,80" /><path d="M 30,80 A 20,20 0 0,1 70,80" />
              </g>
              <g transform="translate(365,85) scale(0.5)" stroke="currentColor" strokeWidth="5.5" fill="none">
                <circle cx="50" cy="50" r="15" /><path d="M 50,15 C 20,15 15,40 15,50 C 15,60 20,85 50,85" /><path d="M 50,15 C 80,15 85,40 85,50 C 85,60 80,85 50,85" /><path d="M 15,50 L 35,50" /><path d="M 85,50 L 65,50" />
              </g>
              <g transform="translate(85,365) scale(0.5)" stroke="currentColor" strokeWidth="5.5" fill="none">
                <rect x="25" y="25" width="50" height="50" rx="10" /><circle cx="50" cy="50" r="10" /><line x1="50" y1="25" x2="50" y2="75" /><line x1="25" y1="50" x2="75" y2="50" />
              </g>
              <g transform="translate(365,365) scale(0.5)" stroke="currentColor" strokeWidth="5.5" fill="none">
                <circle cx="50" cy="50" r="30" /><path d="M 20,50 L 80,50 M 50,20 L 50,80" /><circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.25" />
              </g>
            </svg>

            <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: "0 0 0 3px #1c1400, 0 0 0 5px #006400", zIndex: 30 }} />
            <div className="absolute inset-0 rounded-full rotating-gold-ring p-[7px] shadow-[0_25px_60px_rgba(0,0,0,0.65)] z-10">
              <div className="w-full h-full rounded-full bg-[#1c1400]" />
            </div>
            <div className="w-[calc(100%-18px)] h-[calc(100%-18px)] rounded-full overflow-hidden border-[5px] border-[#1c1400] relative z-20">
              <Image src="/images/WhatsApp Image 2026-06-02 at 16.38.10.jpeg"
                alt="Volta Heritage Dance Ensemble stage performance"
                fill className="object-cover object-top brightness-[1.08] contrast-[1.02] scale-[1.05] animate-slow-zoom" priority />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="text-white/45">
          <ChevronDown size={28} strokeWidth={1.5} />
        </motion.div>
      </div>
    </section>
  );
}
