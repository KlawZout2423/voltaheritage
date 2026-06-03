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
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const heroImageVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -3 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
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
              <Link href="/gallery" id="hero-cta-gallery" className="btn-outline !text-white !border-white/30 hover:!border-[var(--color-heritage-gold)] hover:!bg-[var(--color-heritage-gold-glow)] hover:!text-[var(--color-heritage-gold)] font-bold">
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

          {/* Right Column: Circular Image Frame + Rotating Gradient Border + Floating Event Card */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative">
            <motion.div 
              className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] lg:w-[400px] lg:h-[400px] flex items-center justify-center"
              variants={heroImageVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Rotating Gradient Outer Border */}
              <div className="absolute inset-0 rounded-full rotating-gradient-ring opacity-90 blur-[1px] p-[6px]">
                <div className="w-full h-full rounded-full bg-[var(--color-heritage-black)]" />
              </div>

              {/* Inner Circle Image */}
              <div className="w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full overflow-hidden border-4 border-[var(--color-heritage-black)] relative z-10 shadow-2xl">
                <Image
                  src="/images/WhatsApp Image 2026-06-02 at 16.38.10.jpeg"
                  alt="Volta Heritage Dance Ensemble stage performance"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Floating Featured Event Overlay Card */}
              {featuredEvents[0] && (
                <motion.div 
                  className="absolute -bottom-6 -left-6 sm:-left-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white max-w-xs z-20 shadow-2xl shadow-black/45"
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="badge badge-gold mb-3 text-[9px] font-bold">Featured Event</span>
                  <h3 className="font-display text-base font-bold mb-2 line-clamp-1">{featuredEvents[0].title}</h3>
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
