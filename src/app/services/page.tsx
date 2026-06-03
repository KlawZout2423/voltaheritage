import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Music, BookOpen, GraduationCap, Archive, MapPin, Compass } from "lucide-react";
import { services, institution } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Offerings",
  description:
    "Book the Volta Heritage Dance Ensemble for cultural performances, workshops, school outreach, heritage documentation, tourism experiences, and event consultancy.",
};

const iconMap: Record<string, React.ReactNode> = {
  Music: <Music size={24} />,
  BookOpen: <BookOpen size={24} />,
  GraduationCap: <GraduationCap size={24} />,
  Archive: <Archive size={24} />,
  MapPin: <MapPin size={24} />,
  Compass: <Compass size={24} />,
};

const colorStyles = {
  gold: {
    icon: "bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)]",
    badge: "badge-gold",
    card: "card-gold",
    check: "text-[var(--color-heritage-gold)]",
  },
  red: {
    icon: "bg-[var(--color-heritage-red-light)] text-[var(--color-heritage-red)]",
    badge: "badge-red",
    card: "card-red",
    check: "text-[var(--color-heritage-red)]",
  },
  green: {
    icon: "bg-[var(--color-heritage-green-light)] text-[var(--color-heritage-green)]",
    badge: "badge-green",
    card: "card-green",
    check: "text-[var(--color-heritage-green)]",
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-[var(--color-bg-secondary)] overflow-x-hidden">

      {/* ── Page Header ── */}
      <div className="bg-[var(--color-heritage-black)] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/WhatsApp Image 2026-06-02 at 10.54.40.jpeg" 
            alt="Volta Heritage Ensemble drumming backdrop" 
            fill 
            className="object-cover opacity-15" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-heritage-black)] via-[rgba(28,18,8,0.88)] to-[var(--color-heritage-black)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="kente-strip w-12 mb-6" />
          <span className="section-eyebrow text-[var(--color-heritage-gold)] mb-3 block">What We Offer</span>
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4">Offerings</h1>
          <p className="text-white/65 max-w-xl leading-relaxed font-light">
            From world-class stage performances to intimate school workshops — we bring the living
            traditions of the Ewe people to any audience, anywhere.
          </p>
          <nav className="flex items-center gap-2 mt-6 text-sm text-white/40 font-bold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Offerings</span>
          </nav>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <section className="py-20 bg-white border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <AnimateOnScroll direction="up">
              <span className="section-eyebrow">Capabilities</span>
              <h2 className="font-display text-4xl md:text-5xl font-black mt-3 mb-4 text-[var(--color-text-primary)]">
                Six Ways We Can <span className="text-gradient-gold">Serve You</span>
              </h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed font-light">
                Whether you are an event organiser, a school, a tourism operator, or a cultural researcher —
                we have a service tailored to your needs.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((svc, i) => {
              const styles = colorStyles[svc.color];
              return (
                <AnimateOnScroll 
                  key={svc.id} 
                  direction="up" 
                  delay={(i % 2) * 0.15}
                  className="flex"
                >
                  <div id={`service-${svc.id}`} className={`card ${styles.card} p-8 flex flex-col gap-5 bg-white w-full hover:border-[var(--color-heritage-gold)]`}>
                    <div className="flex items-start gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${styles.icon}`}>
                        {iconMap[svc.icon] ?? <Music size={24} />}
                      </div>
                      <div>
                        <span className={`badge ${styles.badge} mb-2 shadow-sm`}>{svc.color === "gold" ? "Premium" : svc.color === "red" ? "Specialist" : "Community"}</span>
                        <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)] leading-tight">
                          {svc.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-[var(--color-text-muted)] leading-relaxed text-sm font-light">
                      {svc.description}
                    </p>

                    <div>
                      <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
                        What's Included
                      </p>
                      <ul className="space-y-2">
                        {svc.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)] font-light">
                            <CheckCircle size={15} className={`${styles.check} flex-shrink-0 mt-0.5`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-4 border-t border-[var(--color-border)]">
                      <Link href="/contact" className="btn-primary btn-sm font-bold">
                        Enquire About This Service <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <AnimateOnScroll direction="up">
              <span className="section-eyebrow">Why VHDE</span>
              <h2 className="font-display text-4xl font-black mt-3 text-[var(--color-text-primary)]">
                Authentic. Experienced. <span className="text-gradient-gold">Award-Winning.</span>
              </h2>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "20+", label: "Years of Experience", desc: "Established in 2002 in Ho, Volta Region." },
              { value: "8+", label: "Countries Performed", desc: "From Ghana to international stages across Africa." },
              { value: "24", label: "Ensemble Members", desc: "Full troupe of dancers, drummers, and vocalists." },
              { value: "100+", label: "Events Annually", desc: "Festivals, schools, galas, and private bookings." },
            ].map((stat, i) => (
              <AnimateOnScroll 
                key={stat.label} 
                direction="up" 
                delay={i * 0.1}
                className="flex"
              >
                <div className="card p-6 text-center bg-white w-full hover:border-[var(--color-heritage-gold)]">
                  <p className="font-display text-4xl font-black text-[var(--color-heritage-gold)] mb-1">{stat.value}</p>
                  <p className="font-bold text-[var(--color-text-primary)] text-sm mb-2">{stat.label}</p>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed font-light">{stat.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[var(--color-heritage-black)] text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimateOnScroll direction="up">
            <span className="section-eyebrow mb-3 block">Ready to Book?</span>
            <h2 className="font-display text-4xl md:text-5xl font-black mb-5 leading-tight">
              Let&apos;s Bring Volta Heritage to <span className="text-[var(--color-heritage-gold)]">Your Event</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8 max-w-lg mx-auto font-light">
              Contact our bookings team to discuss your event, budget, and requirements. We respond to all
              enquiries within 48 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" id="services-cta-contact" className="btn-primary">
                Make an Enquiry <ArrowRight size={15} />
              </Link>
              <a
                href={`mailto:${institution.email}`}
                className="btn-outline !text-white !border-white/30 hover:!border-[var(--color-heritage-gold)] hover:!text-[var(--color-heritage-gold)] font-bold"
              >
                Email Us Directly
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
