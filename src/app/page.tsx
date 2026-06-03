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
      <section id="hero" className="relative min-h-[95vh] flex items-center overflow-hidden bg-[#1c1400] py-20 lg:py-0">

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
              <Link href="/gallery" id="hero-cta-gallery" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white border border-[rgba(255,255,255,0.25)] bg-white/5 hover:bg-white/15 hover:border-white/50 transition-all duration-200 text-sm">
                <Play size={16} /> Watch Performances
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div className="mt-12" variants={heroItemVariants}>
              <div className="border-t border-[rgba(200,149,26,0.2)] pt-6 flex flex-wrap gap-0">
                {[
                  { value: "20+", label: "Years of Service" },
                  { value: "8+", label: "Countries Performed" },
                  { value: "24", label: "Ensemble Members" },
                ].map((stat, i) => (
                  <div key={stat.label} className={`pr-8 ${i > 0 ? "pl-8 border-l border-[rgba(200,149,26,0.2)]" : ""}`}>
                    <p className="font-display text-3xl font-black text-[var(--color-heritage-gold)]">{stat.value}</p>
                    <p className="text-xs text-white/50 mt-0.5 uppercase tracking-wider font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Circle + Event Card */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-6 lg:gap-0">
            {/* Circle wrapper — carries the ring, image, breakout */}
            <motion.div
              className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px] flex items-center justify-center flex-shrink-0"
              variants={heroImageVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Outer green ring — sits outside the rotating gold ring */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: "0 0 0 3px #1c1400, 0 0 0 5px #006400",
                  zIndex: 30,
                }}
              />

              {/* Rotating gold border */}
              <div className="absolute inset-0 rounded-full rotating-gold-ring p-[7px] shadow-[0_25px_60px_rgba(0,0,0,0.65)]">
                <div className="w-full h-full rounded-full bg-[#1c1400]" />
              </div>

              {/* Circle image */}
              <div className="w-[calc(100%-18px)] h-[calc(100%-18px)] rounded-full overflow-hidden border-[5px] border-[#1c1400] relative z-10">
                <Image
                  src="/images/WhatsApp Image 2026-06-02 at 16.38.10.jpeg"
                  alt="Volta Heritage Dance Ensemble stage performance"
                  fill
                  className="object-cover object-top brightness-[1.08] contrast-[1.02] scale-[1.05] transition-transform duration-700"
                  priority
                />
              </div>

              {/* Breakout mask — hides bottom of circle so subject steps out */}
              <div
                className="absolute bottom-[-2px] left-0 right-0 z-20 pointer-events-none"
                style={{ height: "18%", background: "#1c1400" }}
              />
            </motion.div>

            {/* Featured Event Card — below circle on mobile, offset bottom-left on desktop */}
            {featuredEvents[0] && (
              <motion.div
                className="w-full max-w-[260px] lg:max-w-[240px] lg:-mt-8 lg:self-start lg:ml-4 bg-[#120d00] backdrop-blur-xl border border-[var(--color-heritage-gold)]/40 rounded-2xl p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.7)] lg:-rotate-1 hover:rotate-0 transition-transform duration-300 z-30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <span className="badge badge-gold mb-2 text-[9px] font-bold bg-[var(--color-heritage-gold)]/20 text-[var(--color-heritage-gold-light)] border-[var(--color-heritage-gold)]/30">Featured Event</span>
                <h3 className="font-display text-sm font-bold mb-2 line-clamp-2 text-white leading-snug">{featuredEvents[0].title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
                  <Calendar size={10} className="text-[var(--color-heritage-gold)]" />
                  <span>{formatDate(featuredEvents[0].date)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/70 mb-3">
                  <MapPin size={10} className="text-[var(--color-heritage-gold)]" />
                  <span className="line-clamp-1">{featuredEvents[0].venue}</span>
                </div>
                <Link href="/events" className="btn-primary btn-sm w-full py-1.5 justify-center text-xs font-bold">
                  Learn More
                </Link>
              </motion.div>
            )}
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
