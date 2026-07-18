import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Eye, Lightbulb, Drum, Mic2, Users, BookOpen } from "lucide-react";
import { institution, team } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Our Roots",
  description:
    "Learn about the Volta Heritage Dance Ensemble — founded 31st July 2012 in Ho-Dome, our mission to preserve Ewe culture, our vision, and the leadership team driving our work.",
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
              Over a Decade of{" "}
              <span className="text-gradient-gold">Cultural Stewardship</span>
            </h2>
            <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed font-light">
              <p>
                The Volta Heritage Dance Ensemble was formally established on{" "}
                <strong className="text-[var(--color-text-primary)] font-bold">{institution.foundedFull}</strong> in{" "}
                <strong className="text-[var(--color-text-primary)] font-bold">Ho-Dome</strong>, Volta Region of Ghana,
                with a founding mandate that was both simple and profound: to ensure that the living
                cultural traditions of the Ewe people and other ethnic groups native to the Volta Region
                were not lost to the passage of time.
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
              <p className="font-display text-3xl font-black">{institution.founded}</p>
              <p className="text-xs font-bold uppercase tracking-wider opacity-85">Est. Ho-Dome</p>
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

      {/* ── Organizational Structure ── */}
      <section id="structure" className="py-24 bg-white border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <AnimateOnScroll direction="up">
              <span className="section-eyebrow">How We Are Organised</span>
              <h2 className="font-display text-4xl md:text-5xl font-black mt-3 text-[var(--color-text-primary)] leading-tight">
                Structure &amp; <span className="text-gradient-gold">Leadership</span>
              </h2>
              <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed font-light">
                A traditional Volta dance ensemble is built around interconnected layers of leadership,
                performance, and cultural knowledge — each essential to the integrity of every show.
              </p>
            </AnimateOnScroll>
          </div>

          {/* Leadership */}
          <AnimateOnScroll direction="up" delay={0.1}>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-heritage-gold-light)] flex items-center justify-center">
                  <Users size={20} className="text-[var(--color-heritage-gold-dark)]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">1. Leadership Structure</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    role: "The Master Drummer",
                    subtitle: "Vuga / Azagunua",
                    desc: "The musical and operational director. The heart of the organisation — controlling pace, signalling transitions, and holding deep historical knowledge of what each rhythm signifies: war, celebration, or mourning.",
                    color: "gold",
                  },
                  {
                    role: "Dance Lead & Choreographer",
                    subtitle: "Principal Choreographer",
                    desc: "Responsible for teaching precise movements, postures, and formations to the dance troupe. Ensures traditional accuracy while adapting the space for stage or durbar (festival) presentations.",
                    color: "red",
                  },
                  {
                    role: "Elders & Patrons",
                    subtitle: "Cultural Advisors",
                    desc: "Often linked to local chieftaincies or the Centre for National Culture. They act as advisors, ensuring performances respect sacred traditions, taboos, and historical accuracy.",
                    color: "green",
                  },
                ].map((item) => (
                  <div
                    key={item.role}
                    className={`p-6 rounded-2xl border bg-[var(--color-bg-secondary)] hover:border-[var(--color-heritage-gold)] transition-colors ${
                      item.color === "gold"
                        ? "border-[rgba(200,135,10,0.3)]"
                        : item.color === "red"
                        ? "border-[rgba(180,30,30,0.2)]"
                        : "border-[rgba(30,120,60,0.2)]"
                    }`}
                  >
                    <p className="font-bold text-[var(--color-text-primary)] mb-0.5">{item.role}</p>
                    <p className="text-xs font-semibold text-[var(--color-heritage-gold)] mb-3 uppercase tracking-wider">{item.subtitle}</p>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Core Performance Units */}
          <AnimateOnScroll direction="up" delay={0.15}>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-heritage-red-light)] flex items-center justify-center">
                  <Drum size={20} className="text-[var(--color-heritage-red)]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">2. Core Performance Units</h3>
              </div>
              <p className="text-[var(--color-text-muted)] font-light mb-6 max-w-3xl">
                An ensemble is divided into three interconnected sections that must communicate seamlessly during every performance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Drum size={22} className="text-[var(--color-heritage-gold-dark)]" />,
                    bg: "bg-[var(--color-heritage-gold-light)]",
                    title: "Drumming Section",
                    subtitle: "Percussion",
                    points: [
                      "Atoke / Gankogui (iron bell) — foundational time-line",
                      "Kaganu & Kidi — supporting drums",
                      "Atsimevu / Sogo — master drums leading the dialogue",
                    ],
                  },
                  {
                    icon: <Mic2 size={22} className="text-[var(--color-heritage-red)]" />,
                    bg: "bg-[var(--color-heritage-red-light)]",
                    title: "Vocal Section",
                    subtitle: "Choristers",
                    points: [
                      "Led by the song leader (Heno)",
                      "Call-and-response songs set the narrative context",
                      "Lay out the historical meaning of each performance",
                    ],
                  },
                  {
                    icon: <Users size={22} className="text-[var(--color-heritage-green)]" />,
                    bg: "bg-[var(--color-heritage-green-light)]",
                    title: "Dance Troupe",
                    subtitle: "Performers",
                    points: [
                      "Interpret the drum language visually",
                      "Veterans lead complex syncopated routines",
                      "Newer members follow baseline steps and develop",
                    ],
                  },
                ].map((unit) => (
                  <div key={unit.title} className="p-6 rounded-2xl border border-[var(--color-border)] bg-white hover:border-[var(--color-heritage-gold)] transition-colors shadow-sm">
                    <div className={`w-10 h-10 rounded-xl ${unit.bg} flex items-center justify-center mb-4`}>
                      {unit.icon}
                    </div>
                    <p className="font-bold text-[var(--color-text-primary)] mb-0.5">{unit.title}</p>
                    <p className="text-xs font-semibold text-[var(--color-heritage-gold)] mb-3 uppercase tracking-wider">{unit.subtitle}</p>
                    <ul className="space-y-2">
                      {unit.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)] font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-heritage-gold)] mt-1.5 flex-shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Repertoire */}
          <AnimateOnScroll direction="up" delay={0.2}>
            <div className="bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border)] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-heritage-green-light)] flex items-center justify-center">
                  <BookOpen size={20} className="text-[var(--color-heritage-green)]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">3. Repertoire Management</h3>
              </div>
              <p className="text-[var(--color-text-muted)] font-light mb-6 max-w-3xl">
                An organisation&apos;s primary asset is its repertoire. A standard Volta ensemble
                categorises its performances into three main pillars:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { num: "I", label: "Ceremonial Repertoire", desc: "Ritual dances tied to funerals, festivals, and ancestral commemorations — performed with strict adherence to sacred protocol." },
                  { num: "II", label: "Recreational Repertoire", desc: "Social and celebratory dances like Borborbor and Kinka, designed for community gatherings and public festivals." },
                  { num: "III", label: "Educational Repertoire", desc: "Adapted performances and workshop formats designed for schools, tourists, and cultural education programmes." },
                ].map((pillar) => (
                  <div key={pillar.num} className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[var(--color-border)] shadow-sm hover:border-[var(--color-heritage-gold)] transition-colors">
                    <span className="w-9 h-9 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] text-sm font-black flex items-center justify-center flex-shrink-0 shadow-sm">
                      {pillar.num}
                    </span>
                    <div>
                      <p className="font-bold text-sm text-[var(--color-text-primary)] mb-1">{pillar.label}</p>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed font-light">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Funding & Socio-Economic Operation */}
          <AnimateOnScroll direction="up" delay={0.25}>
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-heritage-gold-light)] flex items-center justify-center">
                  <Lightbulb size={20} className="text-[var(--color-heritage-gold-dark)]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">4. Funding &amp; Socio-Economic Operation</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    label: "Community & State Alignment",
                    icon: "🏛️",
                    desc: "Operating under the umbrella of the Centre for National Culture (CNC) in Ho grants the ensemble institutional recognition for national assignments, while largely relying on self-funding and community backing for day-to-day operations.",
                  },
                  {
                    label: "Apprenticeship Model",
                    icon: "🥁",
                    desc: "The ensemble functions as a living educational institution. Young, talented individuals join as apprentices — learning instrument fabrication, drumming patterns, and dance steps over years of dedicated observation and practice.",
                  },
                  {
                    label: "Socio-Cultural Cohesion",
                    icon: "🤝",
                    desc: "Beyond entertainment, the ensemble is organised as a mutual-aid community. Members receive financial and social support during major life events — marriages, outdoorings (naming ceremonies), and funerals — reinforcing bonds between culture and care.",
                  },
                ].map((item) => (
                  <div key={item.label} className="p-6 rounded-2xl bg-[var(--color-heritage-gold-light)] border border-[rgba(200,135,10,0.25)] hover:border-[var(--color-heritage-gold)] transition-colors">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <p className="font-bold text-[var(--color-text-primary)] mb-3">{item.label}</p>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-light">{item.desc}</p>
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
