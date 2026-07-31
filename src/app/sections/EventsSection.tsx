"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Star } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Event } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function EventsSection({ events }: { events: Event[] }) {
  return (
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
          {events.slice(0, 3).map((event, i) => (
            <AnimateOnScroll key={event.id} direction="up" delay={i * 0.12} className="flex">
              <div className="card flex flex-col bg-white w-full hover:border-[var(--color-heritage-gold)]">
                <div className="aspect-card relative overflow-hidden rounded-t-xl">
                  <Image src={event.imageUrl} alt={event.title} fill className="img-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {event.isFeatured && (
                    <span className="absolute top-3 left-3 badge badge-gold"><Star size={9} /> Featured</span>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <span className={`badge badge-${event.category === "festival" ? "red" : event.category === "workshop" ? "green" : "gold"}`}>
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-3 leading-snug">{event.title}</h3>
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
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3 flex-1 font-light">{event.description}</p>
                  {/* Task 7: Book/Enquire CTA */}
                  <div className="mt-5 flex gap-2">
                    <Link href="/events" className="btn-outline btn-sm flex-1 justify-center font-bold">
                      Details <ArrowRight size={13} />
                    </Link>
                    <Link
                      href={`/contact?type=performance&subject=${encodeURIComponent(event.title)}`}
                      className="btn-primary btn-sm flex-1 justify-center font-bold"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
