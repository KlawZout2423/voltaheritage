"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Star, ArrowRight, List, GitCommit } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  venue: string;
  category: "festival" | "workshop" | "performance" | "exhibition" | "other";
  imageUrl: string;
  isFeatured?: boolean;
}

interface EventsContentProps {
  events: EventItem[];
}

const categoryColors: Record<string, string> = {
  festival: "badge-red",
  workshop: "badge-green",
  exhibition: "badge-gold",
  performance: "badge-gold",
  other: "badge-gold",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventsContent({ events }: EventsContentProps) {
  const [viewMode, setViewMode] = useState<"list" | "timeline">("list");
  
  // Sort events chronologically (ascending for timeline, descending/default for lists)
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const featured = events.filter((e) => e.isFeatured);

  return (
    <>
      {/* ── Featured Events ── */}
      {featured.length > 0 && (
        <section className="py-16 bg-white border-b border-[var(--color-border)]">
          <div className="mx-auto max-w-7xl px-6">
            <AnimateOnScroll direction="up">
              <span className="section-eyebrow mb-8 block">Featured Events</span>
            </AnimateOnScroll>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featured.map((event, i) => (
                <AnimateOnScroll 
                  key={event.id} 
                  direction="up" 
                  delay={i * 0.15}
                  className="flex"
                >
                  <div className="card card-gold overflow-hidden bg-white w-full hover:border-[var(--color-heritage-gold)] hover:shadow-md transition-all">
                    <div className="relative aspect-[16/7] overflow-hidden">
                      <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="badge badge-gold shadow-sm">
                          <Star size={9} /> Featured
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className={`badge ${categoryColors[event.category]} mb-2 shadow-sm`}>{event.category}</span>
                        <h2 className="font-display text-2xl font-black text-white leading-tight">{event.title}</h2>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-4 mb-4 font-semibold text-xs text-[var(--color-text-muted)]">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-[var(--color-heritage-gold)]" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-[var(--color-heritage-gold)]" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed font-light">{event.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Events section with Toggle ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
            <div>
              <span className="section-eyebrow">Interactive Calendar</span>
              <h2 className="font-display text-3xl font-black mt-2 text-[var(--color-text-primary)]">
                All Active Orbits
              </h2>
            </div>

            {/* View Mode Switcher */}
            <div className="flex bg-[var(--color-bg-secondary)] p-1 rounded-xl border border-[var(--color-border)] self-stretch sm:self-auto justify-center">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer select-none ${
                  viewMode === "list"
                    ? "bg-[var(--color-heritage-gold)] text-white shadow-sm"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-heritage-gold)]"
                }`}
              >
                <List size={14} />
                List View
              </button>
              <button
                onClick={() => setViewMode("timeline")}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer select-none ${
                  viewMode === "timeline"
                    ? "bg-[var(--color-heritage-gold)] text-white shadow-sm"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-heritage-gold)]"
                }`}
              >
                <GitCommit size={14} />
                Timeline View
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === "list" ? (
              <motion.div
                key="list-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                {events.map((event, i) => (
                  <AnimateOnScroll key={event.id} direction="up" delay={i * 0.08}>
                    <div className="card overflow-hidden bg-white hover:border-[var(--color-heritage-gold)] hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row">
                        {/* Date block */}
                        <div className="bg-[var(--color-heritage-gold)] text-white sm:w-28 flex-shrink-0 flex flex-col items-center justify-center py-6 px-4 shadow-sm">
                          <p className="text-3xl font-display font-black">
                            {new Date(event.date).getDate()}
                          </p>
                          <p className="text-xs font-bold uppercase tracking-wider opacity-90 mt-0.5">
                            {new Date(event.date).toLocaleString("en-GB", { month: "short" })}
                          </p>
                          <p className="text-[10px] opacity-70 mt-0.5">{new Date(event.date).getFullYear()}</p>
                        </div>
                        {/* Image */}
                        <div className="relative sm:w-48 flex-shrink-0 min-h-[140px] sm:min-h-auto">
                          <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                        </div>
                        {/* Content */}
                        <div className="p-6 flex flex-col justify-center flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`badge ${categoryColors[event.category]} shadow-sm`}>{event.category}</span>
                            {event.isFeatured && <span className="badge badge-gold shadow-sm"><Star size={9} /> Featured</span>}
                          </div>
                          <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2 leading-snug">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] mb-3 font-semibold">
                            <MapPin size={12} className="text-[var(--color-heritage-gold)]" />
                            <span>{event.venue}</span>
                          </div>
                          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2 font-light">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="timeline-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative border-l-2 border-[var(--color-heritage-gold)]/40 ml-4 md:ml-32 pl-6 md:pl-8 space-y-12 py-4"
              >
                {sortedEvents.map((event, i) => (
                  <div key={event.id} className="relative group">
                    {/* Timeline dot */}
                    <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-[var(--color-heritage-gold)] flex items-center justify-center z-10 transition-transform group-hover:scale-110 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-heritage-gold)]" />
                    </div>

                    {/* Timeline side date label (desktop only) */}
                    <div className="hidden md:block absolute -left-36 top-1 text-right w-28">
                      <p className="text-lg font-display font-black text-[var(--color-text-primary)]">
                        {new Date(event.date).getDate()} {new Date(event.date).toLocaleString("en-GB", { month: "short" })}
                      </p>
                      <p className="text-[10px] font-bold text-[var(--color-text-light)] uppercase tracking-wider">
                        {new Date(event.date).getFullYear()}
                      </p>
                    </div>

                    {/* Timeline Event Card */}
                    <div className="card p-6 bg-white border border-[var(--color-border)] hover:border-[var(--color-heritage-gold)] hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
                      {/* Image */}
                      <div className="relative w-full md:w-36 h-28 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                      </div>
                      
                      {/* Text */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {/* Mobile-only date label */}
                          <span className="md:hidden text-xs font-bold text-[var(--color-heritage-gold)]">
                            {new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                          <span className={`badge ${categoryColors[event.category]} shadow-sm`}>{event.category}</span>
                          {event.isFeatured && <span className="badge badge-gold shadow-sm"><Star size={9} /> Featured</span>}
                        </div>
                        
                        <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] mb-1">
                          {event.title}
                        </h3>
                        
                        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] mb-3 font-semibold">
                          <MapPin size={11} className="text-[var(--color-heritage-gold)]" />
                          <span>{event.venue}</span>
                        </div>
                        
                        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed font-light line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
