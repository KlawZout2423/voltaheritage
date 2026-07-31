"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function ConnectSection() {
  return (
    <section id="connect" className="py-20 bg-[var(--color-bg-tertiary)] border-t border-[var(--color-border)]">
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
  );
}
