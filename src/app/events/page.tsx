import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Star } from "lucide-react";
import { events } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "In Orbit",
  description:
    "Upcoming performances, festivals, workshops, and exhibitions by the Volta Heritage Dance Ensemble in Ho, Volta Region, Ghana and beyond.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categoryColors: Record<string, string> = {
  festival: "badge-red",
  workshop: "badge-green",
  exhibition: "badge-gold",
  performance: "badge-gold",
  other: "badge-gold",
};

export default function EventsPage() {
  const featured = events.filter((e) => e.isFeatured);
  const all = events;

  return (
    <div className="bg-[var(--color-bg-secondary)] overflow-x-hidden">

      {/* ── Page Header ── */}
      <div className="bg-[var(--color-heritage-black)] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/WhatsApp Image 2026-06-02 at 16.38.11.jpeg" 
            alt="Volta Heritage Ensemble events calendar backdrop" 
            fill 
            className="object-cover opacity-15" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-heritage-black)] via-[rgba(28,18,8,0.88)] to-[var(--color-heritage-black)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="kente-strip w-12 mb-6" />
          <span className="section-eyebrow text-[var(--color-heritage-gold)] mb-3 block">Cultural Calendar</span>
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4">In Orbit</h1>
          <p className="text-white/65 max-w-xl leading-relaxed font-light">
            Performances, festivals, workshops, and exhibitions — join us in celebrating and preserving
            Ewe cultural traditions across Ghana and internationally.
          </p>
          <nav className="flex items-center gap-2 mt-6 text-sm text-white/40 font-bold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">In Orbit</span>
          </nav>
        </div>
      </div>

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
                  <div className="card card-gold overflow-hidden bg-white w-full hover:border-[var(--color-heritage-gold)]">
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

      {/* ── All Events ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateOnScroll direction="up">
            <span className="section-eyebrow mb-8 block">All Active Orbits</span>
          </AnimateOnScroll>

          <div className="space-y-5">
            {all.map((event, i) => (
              <AnimateOnScroll 
                key={event.id} 
                direction="up" 
                delay={i * 0.1}
              >
                <div className="card overflow-hidden bg-white hover:border-[var(--color-heritage-gold)]">
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
                    <div className="relative sm:w-48 flex-shrink-0 min-h-[120px]">
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
          </div>
        </div>
      </section>

      {/* ── Book CTA ── */}
      <section className="py-20 bg-[var(--color-heritage-black)] text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimateOnScroll direction="up">
            <h2 className="font-display text-4xl font-black mb-5 leading-tight">
              Want us to perform at your event?
            </h2>
            <p className="text-white/60 leading-relaxed mb-8 font-light">
              The Volta Heritage Dance Ensemble is available for bookings locally and internationally.
              Contact us to discuss your event requirements.
            </p>
            <Link href="/contact" className="btn-primary">
              Book the Ensemble <ArrowRight size={15} />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
