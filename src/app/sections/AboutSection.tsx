"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function AboutSection({ founded }: { founded: string }) {
  return (
    <section id="about" className="bg-white py-24 border-y border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 relative">
          <AnimateOnScroll direction="left" duration={0.9}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] relative shadow-lg">
              <Image src="/images/WhatsApp Image 2026-06-02 at 10.54.28.jpeg"
                alt="Volta Heritage Dance Ensemble in full regalia" fill className="img-cover" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[var(--color-heritage-gold)] text-white rounded-2xl p-5 shadow-lg z-10">
              <p className="font-display text-3xl font-black">{founded}</p>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-90">Est. in Ho</p>
            </div>
          </AnimateOnScroll>
        </div>

        <div className="lg:col-span-7">
          <AnimateOnScroll direction="right" duration={0.9}>
            <span className="section-eyebrow">Our Roots</span>
            <h2 className="font-display text-4xl md:text-5xl font-black mt-3 mb-6 text-[var(--color-text-primary)] leading-tight">
              Culture is not the past —<br />
              <span className="text-gradient-gold">it is who we are</span>
            </h2>
            <div className="text-[var(--color-text-muted)] leading-relaxed space-y-4 mb-8 font-light">
              <p>
                The Volta Heritage Dance Ensemble was founded on a simple but profound conviction: the living
                traditions of the Ewe people — our dances, our drums, our festivals, our cloth — are not museum
                pieces. They are a breathing, evolving testament to who we are as a people.
              </p>
              <p>
                For over two decades, we have carried this conviction from village squares to international stages,
                from classrooms to cultural festivals. Every performance is both a celebration and an act of preservation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" id="about-learn-more" className="btn-primary">Our Full Story <ArrowRight size={15} /></Link>
              <Link href="/about#team" id="about-meet-team" className="btn-outline">Meet the Team</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
