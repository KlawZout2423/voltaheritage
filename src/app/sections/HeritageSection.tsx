"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { HeritageCategory } from "@/lib/types";

export default function HeritageSection({ categories }: { categories: HeritageCategory[] }) {
  const highlights = categories.slice(0, 4);
  return (
    <section id="heritage" className="py-24 bg-[var(--color-bg-secondary)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimateOnScroll direction="up">
            <span className="section-eyebrow">Living Archive</span>
            <h2 className="font-display text-4xl md:text-5xl font-black mt-3 mb-4 text-[var(--color-text-primary)] leading-tight">
              Our Cultural <span className="text-gradient-gold">Heritage</span>
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed font-light">
              From the spiritual language of drums to the story-woven threads of Kente cloth — explore the
              pillars of Ewe culture that the ensemble preserves and performs.
            </p>
          </AnimateOnScroll>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((cat, i) => (
            <AnimateOnScroll key={cat.id} direction="up" delay={i * 0.1} className="flex">
              <Link href={`/heritage/${cat.slug}`} id={`heritage-card-${cat.slug}`}
                className="card group relative overflow-hidden flex flex-col w-full hover:border-[var(--color-heritage-gold)]">
                <div className="aspect-heritage relative overflow-hidden rounded-t-xl">
                  <Image src={cat.imageUrl} alt={cat.name} fill
                    className="img-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className={`badge badge-${cat.color}`}>{cat.name}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 bg-white">
                  <p className="text-xs font-bold text-[var(--color-text-light)] uppercase tracking-wider mb-2">{cat.tagline}</p>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3 flex-1 font-light">{cat.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-heritage-gold)] group-hover:gap-3 transition-all">
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="mt-12 text-center">
          <AnimateOnScroll direction="up" delay={0.2}>
            <Link href="/heritage" id="heritage-view-all" className="btn-outline">
              View All Heritage Categories <ArrowRight size={15} />
            </Link>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
