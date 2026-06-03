"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Play, Users, Music, Star, Globe, ChevronDown } from "lucide-react";
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

function Counter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/\d/g, ""); // e.g. "+"

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * numericValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [numericValue, duration]);

  return <>{count}{suffix}</>;
}

// ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const featuredEvents = events.filter((e) => e.isFeatured).slice(0, 2);
  const upcomingEvents = events.slice(0, 3);
  const latestArticles = articles.slice(0, 3);
  const heritageHighlights = heritageCategories.slice(0, 4);

  return (
    <div className="bg-[var(--color-bg-secondary)] overflow-x-hidden">

      <section id="hero" className="relative min-h-[95vh] flex items-center overflow-visible lg:overflow-hidden bg-[#1c1400] py-20 lg:py-0 pb-32 lg:pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(200,135,10,0.08)_0%,transparent_75%)] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column: Animated Text Content */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Location badge */}
            <motion.div className="inline-flex items-center gap-2 mb-6" variants={heroItemVariants}>
              <span className="w-8 h-0.5 bg-[var(--color-heritage-gold)]" />
              <span className="badge badge-gold text-[10px] tracking-widest font-black bg-[var(--color-heritage-gold)]/20 text-[var(--color-heritage-gold-light)] border-[var(--color-heritage-gold)]/30">Ho, Volta Region, Ghana</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6 tracking-tight text-left"
              variants={heroItemVariants}
            >
              We <span className="text-[var(--color-heritage-gold)]">Perform</span> to <span className="text-[var(--color-heritage-gold)]">Educate</span>
            </motion.h1>

            {/* Subtitle / Paragraph */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-white/75 leading-relaxed mb-6 max-w-xl font-light text-left"
              variants={heroItemVariants}
            >
              Volta Heritage Dance Ensemble preserves and shares Ewe cultural traditions through authentic dance, drumming, storytelling, and education.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-wrap items-center gap-6 mb-6"
              variants={heroItemVariants}
            >
              <Link href="/contact" id="hero-cta-book" className="btn-primary">
                Book Performance <ArrowRight size={16} />
              </Link>
              <Link href="/gallery" id="hero-cta-watch" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white border border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40 hover:scale-[1.02] active:scale-100 transition-all duration-200 text-sm">
                <Play size={14} className="fill-current text-white" /> Watch Performances
              </Link>
            </motion.div>

            {/* Stats Section with breathing room */}
            <motion.div 
              className="w-full border-y border-[rgba(200,149,26,0.15)] py-6 my-6"
              variants={heroItemVariants}
            >
              <div className="grid grid-cols-3 w-full gap-2 sm:gap-4">
                {[
                  { value: "20+", label: "Years Preserving Culture" },
                  { value: "8+", label: "Countries Performed In" },
                  { value: "24", label: "Active Performers" },
                ].map((stat, i) => (
                  <div 
                    key={stat.label} 
                    className={`flex flex-col items-start pr-4 ${
                      i > 0 ? "pl-4 border-l border-[rgba(200,149,26,0.15)]" : ""
                    }`}
                  >
                    <p className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-[var(--color-heritage-gold)] mb-0.5">
                      <Counter value={stat.value} />
                    </p>
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] text-white/55 uppercase tracking-widest font-black leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Proof Badges */}
            <motion.div 
              className="hidden sm:flex flex-wrap items-center gap-x-6 gap-y-3 w-full"
              variants={heroItemVariants}
            >
              <span className="text-[10px] uppercase tracking-widest font-black text-white/40">Featured at:</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80">
                <span className="text-sm">🏛</span> National Festivals
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80">
                <span className="text-sm">🎓</span> Educational Institutions
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80">
                <span className="text-sm">🌍</span> International Cultural Events
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column: Large centered image container with float and zoom */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end w-full">
            <motion.div 
              className="relative w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] flex items-center justify-center flex-shrink-0 animate-float"
              variants={heroImageVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Radial Glow */}
              <div className="absolute w-[120%] h-[120%] rounded-full bg-[radial-gradient(circle,rgba(200,135,10,0.22)_0%,transparent_70%)] blur-3xl pointer-events-none z-0" />

              {/* SVG Tribal & Adinkra patterns */}
              <svg className="absolute w-[130%] h-[130%] -top-[15%] -left-[15%] text-[var(--color-heritage-gold)]/22 pointer-events-none z-0" viewBox="0 0 500 500" fill="none">
                <circle cx="250" cy="250" r="220" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8 8" className="animate-[spin_120s_linear_infinite]" />
                <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="1.8" strokeDasharray="4 4" className="animate-[spin_90s_linear_infinite_reverse]" />
                
                <path d="M250,15 L245,30 L255,30 Z M250,485 L245,470 L255,470 Z M15,250 L30,245 L30,255 Z M485,250 L470,245 L470,255 Z" fill="currentColor" />
                
                {/* Top Left - Dwennimmen */}
                <g transform="translate(85, 85) scale(0.5)" stroke="currentColor" strokeWidth="5.5" fill="none">
                  <path d="M 20,50 C 5,50 5,20 20,20 C 35,20 35,50 20,50 Z" />
                  <path d="M 80,50 C 95,50 95,20 80,20 C 65,20 65,50 80,50 Z" />
                  <path d="M 50,20 L 50,80" />
                  <path d="M 30,80 A 20,20 0 0,1 70,80" />
                </g>
                
                {/* Top Right - Gye Nyame */}
                <g transform="translate(365, 85) scale(0.5)" stroke="currentColor" strokeWidth="5.5" fill="none">
                  <circle cx="50" cy="50" r="15" />
                  <path d="M 50,15 C 20,15 15,40 15,50 C 15,60 20,85 50,85" />
                  <path d="M 50,15 C 80,15 85,40 85,50 C 85,60 80,85 50,85" />
                  <path d="M 15,50 L 35,50" />
                  <path d="M 85,50 L 65,50" />
                </g>

                {/* Bottom Left - Mate Masie */}
                <g transform="translate(85, 365) scale(0.5)" stroke="currentColor" strokeWidth="5.5" fill="none">
                  <rect x="25" y="25" width="50" height="50" rx="10" />
                  <circle cx="50" cy="50" r="10" />
                  <line x1="50" y1="25" x2="50" y2="75" />
                  <line x1="25" y1="50" x2="75" y2="50" />
                </g>

                {/* Bottom Right - Asase Yaa */}
                <g transform="translate(365, 365) scale(0.5)" stroke="currentColor" strokeWidth="5.5" fill="none">
                  <circle cx="50" cy="50" r="30" />
                  <path d="M 20,50 L 80,50 M 50,20 L 50,80" />
                  <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.25" />
                </g>
              </svg>

              {/* Outer green ring — sits outside the rotating gold ring */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: "0 0 0 3px #1c1400, 0 0 0 5px #006400",
                  zIndex: 30,
                }}
              />

              {/* Rotating gold border */}
              <div className="absolute inset-0 rounded-full rotating-gold-ring p-[7px] shadow-[0_25px_60px_rgba(0,0,0,0.65)] z-10">
                <div className="w-full h-full rounded-full bg-[#1c1400]" />
              </div>

              {/* Circle image */}
              <div className="w-[calc(100%-18px)] h-[calc(100%-18px)] rounded-full overflow-hidden border-[5px] border-[#1c1400] relative z-20">
                <Image
                  src="/images/WhatsApp Image 2026-06-02 at 16.38.10.jpeg"
                  alt="Volta Heritage Dance Ensemble stage performance"
                  fill
                  className="object-cover object-top brightness-[1.08] contrast-[1.02] scale-[1.05] animate-slow-zoom"
                  priority
                />
              </div>


            </motion.div>
          </div>
        </div>

        {/* Bouncing Chevron down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-white/45"
          >
            <ChevronDown size={28} strokeWidth={1.5} />
          </motion.div>
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
