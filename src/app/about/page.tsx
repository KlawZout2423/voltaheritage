import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Eye, Lightbulb } from "lucide-react";
import { institution, team } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Our Roots",
  description:
    "Learn about the Volta Heritage Dance Ensemble — our history since 2002, our mission to preserve Ewe culture, our vision, and the leadership team driving our work.",
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-bg-secondary)]">

      {/* ── Page Header ── */}
      <div className="bg-[var(--color-heritage-black)] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/WhatsApp Image 2026-06-02 at 16.38.12.jpeg" 
            alt="Volta Heritage Ensemble traditional show" 
            fill 
            className="object-cover opacity-20" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-heritage-black)] via-[rgba(28,18,8,0.85)] to-[var(--color-heritage-black)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="kente-strip w-12 mb-6" />
          <span className="section-eyebrow text-[var(--color-heritage-gold)] mb-3 block">Who We Are</span>
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4">Our Roots</h1>
          <p className="text-white/65 max-w-xl leading-relaxed font-light">
            The story of the Volta Heritage Dance Ensemble — our founding, our purpose,
            and the people who dedicate their lives to keeping Ewe culture alive.
          </p>
          <nav className="flex items-center gap-2 mt-6 text-sm text-white/40 font-bold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Our Roots</span>
          </nav>
        </div>
      </div>

      {/* ── History (Our Journey) ── */}
      <section id="history" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll direction="left">
            <span className="section-eyebrow">Our Journey</span>
            <h2 className="font-display text-4xl font-black mt-3 mb-6 text-[var(--color-text-primary)]">
              Over Two Decades of{" "}
              <span className="text-gradient-gold">Cultural Stewardship</span>
            </h2>
            <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed font-light">
              <p>
                The Volta Heritage Dance Ensemble was established in{" "}
                <strong className="text-[var(--color-text-primary)] font-bold">{institution.founded}</strong> in Ho, the
                capital of the Volta Region of Ghana, with a founding mandate that was both simple and
                profound: to ensure that the living cultural traditions of the Ewe people were not lost to
                the passage of time.
              </p>
              <p>
                What began as a small group of dedicated performers and cultural custodians has grown into one
                of Ghana&apos;s most respected traditional cultural ensembles. Our membership spans three
                generations — from elder master drummers who carry decades of embodied knowledge to young
                dancers learning the vocabulary of Agbadza and Borborbor for the first time.
              </p>
              <p>
                We have performed across Ghana and in eight countries internationally, represented Ghana at
                state functions, and taken the stage at major Pan-African cultural festivals. Yet our deepest
                work happens close to home — in the schools, village squares, and community halls of the Volta
                Region.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] relative shadow-lg">
              <Image 
                src="/images/WhatsApp Image 2026-06-02 at 10.54.26 (1).jpeg" 
                alt="Ensemble historical performance" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-[var(--color-heritage-gold)] text-white rounded-2xl p-5 shadow-lg">
              <p className="font-display text-4xl font-black">{institution.founded}</p>
              <p className="text-xs font-bold uppercase tracking-wider opacity-85">Year Founded</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Mission, Vision, Objectives ── */}
      <section id="mission" className="py-24 bg-[var(--color-bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <AnimateOnScroll direction="up">
              <span className="section-eyebrow">Purpose & Direction</span>
              <h2 className="font-display text-4xl md:text-5xl font-black mt-3 text-[var(--color-text-primary)] leading-tight">
                Mission, Vision &{" "}
                <span className="text-gradient-gold">Core Objectives</span>
              </h2>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Mission */}
            <AnimateOnScroll direction="up" delay={0.1} className="flex">
              <div className="card card-gold p-8 flex flex-col bg-white w-full hover:border-[var(--color-heritage-gold)]">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-heritage-gold-light)] flex items-center justify-center mb-5">
                  <Target size={22} className="text-[var(--color-heritage-gold-dark)]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-4">Our Mission</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed font-light">
                  To preserve, promote, and transmit the authentic cultural traditions of the Ewe people of
                  the Volta Region through high-quality performance, education, and community engagement —
                  ensuring these living traditions are experienced and valued by present and future generations.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Vision */}
            <AnimateOnScroll direction="up" delay={0.2} className="flex">
              <div className="card card-red p-8 flex flex-col bg-white w-full hover:border-[var(--color-heritage-red)]">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-heritage-red-light)] flex items-center justify-center mb-5">
                  <Eye size={22} className="text-[var(--color-heritage-red)]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-4">Our Vision</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed font-light">
                  A world that recognises, celebrates, and is enriched by the cultural wealth of the Volta
                  Region — where Ewe dance, music, and artistic traditions are a source of pride for Ghanaians
                  and a source of wonder for the global community.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Values */}
            <AnimateOnScroll direction="up" delay={0.3} className="flex">
              <div className="card card-green p-8 flex flex-col bg-white w-full hover:border-[var(--color-heritage-green)]">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-heritage-green-light)] flex items-center justify-center mb-5">
                  <Lightbulb size={22} className="text-[var(--color-heritage-green)]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-4">Our Values</h3>
                <ul className="space-y-2 text-[var(--color-text-muted)] text-sm leading-relaxed font-light">
                  {[
                    "Authenticity — we honour traditions as they were taught to us",
                    "Education — every performance is a teaching moment",
                    "Inclusion — Ewe culture belongs to all humanity",
                    "Excellence — we hold ourselves to the highest standard of craft",
                    "Community — we serve the people of the Volta Region first",
                  ].map((v) => (
                    <li key={v} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-heritage-green)] mt-1.5 flex-shrink-0" />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Objectives */}
          <AnimateOnScroll direction="up" delay={0.1}>
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8">
              <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                Strategic Objectives
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Preserve and document endangered Ewe dance and music traditions",
                  "Provide cultural education in schools across the Volta Region",
                  "Represent Ghana at national and international cultural events",
                  "Build a digital archive of Ewe cultural heritage for global access",
                  "Train the next generation of Ewe cultural practitioners",
                  "Promote heritage tourism through cultural immersion experiences",
                ].map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-bg-secondary)] hover:bg-[var(--color-heritage-gold-glow)] transition-colors">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      {i + 1}
                    </span>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-light">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Ensemble Keepers ── */}
      <section id="team" className="py-24 bg-white border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <AnimateOnScroll direction="up">
              <span className="section-eyebrow">Ensemble Keepers</span>
              <h2 className="font-display text-4xl md:text-5xl font-black mt-3 text-[var(--color-text-primary)]">
                Meet the <span className="text-gradient-gold">Keepers</span>
              </h2>
              <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed font-light">
                The people who pour their lives into keeping Ewe cultural traditions alive and shared with the world.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <AnimateOnScroll 
                key={member.id} 
                direction="up" 
                delay={i * 0.15}
                className="flex"
              >
                <div className="card text-center p-8 bg-white w-full hover:border-[var(--color-heritage-gold)]">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-5 border-4 border-[var(--color-heritage-gold-light)] relative shadow-md">
                    <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-1">{member.name}</h3>
                  <p className="text-sm font-semibold text-[var(--color-heritage-gold)] mb-4">{member.title}</p>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed font-light">{member.bio}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[var(--color-bg-tertiary)] border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimateOnScroll direction="up">
            <h2 className="font-display text-4xl font-black mb-5 text-[var(--color-text-primary)]">
              Ready to experience our <span className="text-gradient-gold">heritage?</span>
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/events" className="btn-primary">Upcoming Events <ArrowRight size={15} /></Link>
              <Link href="/contact" className="btn-outline">Connect With Us</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
