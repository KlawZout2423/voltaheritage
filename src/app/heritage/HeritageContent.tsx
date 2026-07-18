"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCms } from "@/context/CmsContext";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function HeritageContent() {
  const { state } = useCms();
  const categories = state.heritageCategories || [];

  return (
    <div className="bg-[var(--color-bg-secondary)] overflow-x-hidden">
      {/* Header */}
      <div className="bg-[var(--color-heritage-black)] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/WhatsApp Image 2026-06-02 at 10.54.34.jpeg" 
            alt="Volta Heritage Ensemble cultural heritage backdrop" 
            fill 
            priority
            className="object-cover opacity-15" 
          />
          <div className="absolute inset-0 bg-[rgba(28,18,8,0.85)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="kente-strip w-12 mb-6" />
          <span className="section-eyebrow text-[var(--color-heritage-gold)] mb-3 block">Ewe Culture</span>
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4">Living Archive</h1>
          <p className="text-white/65 max-w-xl leading-relaxed font-light">
            Six pillars of Ewe cultural tradition — each one a living, breathing expression of identity,
            history, and community that the Ensemble preserves and shares with the world.
          </p>
          <nav className="flex items-center gap-2 mt-6 text-sm text-white/40 font-bold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Living Archive</span>
          </nav>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => {
              const borderColors = {
                red: "hover:border-[var(--color-heritage-red)]",
                gold: "hover:border-[var(--color-heritage-gold)]",
                green: "hover:border-[var(--color-heritage-green)]"
              };
              const kenteColors = {
                red: "from-[var(--color-heritage-red)] to-red-500",
                gold: "from-[var(--color-heritage-gold)] to-amber-500",
                green: "from-[var(--color-heritage-green)] to-emerald-600"
              };
              const hoverTextColors = {
                red: "group-hover:text-[var(--color-heritage-red)]",
                gold: "group-hover:text-[var(--color-heritage-gold)]",
                green: "group-hover:text-[var(--color-heritage-green)]"
              };
              const circleHoverBg = {
                red: "group-hover:bg-[var(--color-heritage-red)]",
                gold: "group-hover:bg-[var(--color-heritage-gold)]",
                green: "group-hover:bg-[var(--color-heritage-green)]"
              };

              const borderCol = borderColors[cat.color] || borderColors.gold;
              const kenteCol = kenteColors[cat.color] || kenteColors.gold;
              const textCol = hoverTextColors[cat.color] || hoverTextColors.gold;
              const circleBg = circleHoverBg[cat.color] || circleHoverBg.gold;

              return (
                <AnimateOnScroll 
                  key={cat.id} 
                  direction="up" 
                  delay={i * 0.1}
                  className="flex"
                >
                  <Link
                    href={`/heritage/${cat.slug}`}
                    id={`heritage-${cat.slug}`}
                    className={`card group overflow-hidden flex flex-col bg-white w-full border border-[var(--color-border)] ${borderCol} hover:shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-2xl`}
                  >
                    {/* Image Area */}
                    <div className="aspect-[16/10] w-full relative overflow-hidden bg-[var(--color-bg-secondary)]">
                      {cat.imageUrl ? (
                        <Image
                          src={cat.imageUrl}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-250" />
                      )}
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      
                      {/* Top-Right traditions count badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className={`badge badge-${cat.color} text-[9px] font-black px-3 py-1 shadow-md uppercase tracking-wider backdrop-blur-sm bg-white/95 text-[var(--color-text-primary)] border border-[#E8DDD0]`}>
                          {cat.items?.length || 0} Traditions
                        </span>
                      </div>
                    </div>

                    {/* Colored Category Stripe */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${kenteCol} shrink-0`} />

                    {/* Content area */}
                    <div className="p-6 flex flex-col flex-1 gap-1">
                      <h2 className={`font-display text-2xl font-black text-[var(--color-text-primary)] transition-colors duration-300 ${textCol}`}>
                        {cat.name}
                      </h2>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-light)] mb-3">
                        {cat.tagline}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-3 flex-1 font-light">
                        {cat.description}
                      </p>
                      
                      {/* Interactive Footer */}
                      <div className="pt-4 mt-4 border-t border-[var(--color-bg-secondary)] flex items-center justify-between shrink-0 font-bold">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-secondary)]">
                          Explore Pillar
                        </span>
                        <span className={`w-8 h-8 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] ${circleBg} group-hover:text-white flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 shadow-sm`}>
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
