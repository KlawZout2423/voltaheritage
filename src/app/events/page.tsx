import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { events } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import EventsContent from "./EventsContent";

export const metadata: Metadata = {
  title: "In Orbit",
  description:
    "Upcoming performances, festivals, workshops, and exhibitions by the Volta Heritage Dance Ensemble in Ho, Volta Region, Ghana and beyond.",
};

export default function EventsPage() {
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

      {/* ── Interactive View (List / Timeline) ── */}
      <EventsContent events={events} />

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
