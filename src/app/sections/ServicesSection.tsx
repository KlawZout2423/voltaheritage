"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Service } from "@/lib/types";

export default function ServicesSection({ services }: { services: Service[] }) {
  return (
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
            <AnimateOnScroll key={svc.id} direction="up" delay={i * 0.1} className="flex">
              <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/25 transition-all w-full flex flex-col justify-between`}>
                <div>
                  <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center text-sm font-black ${
                    svc.color === "gold" ? "bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)]"
                    : svc.color === "red" ? "bg-[var(--color-heritage-red-light)] text-[var(--color-heritage-red)]"
                    : "bg-[var(--color-heritage-green-light)] text-[var(--color-heritage-green)]"
                  }`}>
                    {svc.title.slice(0, 2)}
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">{svc.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed mb-4 line-clamp-3 font-light">{svc.description}</p>
                </div>
                <ul className="space-y-1.5 mt-2">
                  {svc.features.slice(0, 2).map((f) => (
                    <li key={f} className="text-xs text-white/40 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-heritage-gold)] flex-shrink-0" /> {f}
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
  );
}
