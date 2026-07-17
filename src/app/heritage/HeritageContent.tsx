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
            {categories.map((cat, i) => (
              <AnimateOnScroll 
                key={cat.id} 
                direction="up" 
                delay={i * 0.1}
                className="flex"
              >
                <Link
                  href={`/heritage/${cat.slug}`}
                  id={`heritage-${cat.slug}`}
                  className="card group overflow-hidden flex flex-col bg-white w-full hover:border-[var(--color-heritage-gold)]"
                >
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl bg-neutral-100">
                    {cat.imageUrl ? (
                      <Image
                        src={cat.imageUrl}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-200" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className={`badge badge-${cat.color} shadow-sm`}>{cat.items?.length || 0} traditions</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-1">
                      {cat.name}
                    </h2>
                    <p className="text-xs italic text-[var(--color-heritage-gold)] font-bold mb-3">{cat.tagline}</p>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3 flex-1 font-light">
                      {cat.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-heritage-gold)] group-hover:gap-4 transition-all">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
