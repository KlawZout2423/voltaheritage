import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { heritageCategories } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return heritageCategories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = heritageCategories.find((c) => c.slug === slug);
  if (!cat) return { title: "Heritage Not Found" };
  return {
    title: cat.name,
    description: cat.description,
  };
}

const colorStyles = {
  gold: {
    badge: "badge-gold",
    card: "card-gold",
    bullet: "border-[var(--color-heritage-gold)]",
    heading: "text-[var(--color-heritage-gold)]",
    dot: "bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)]",
  },
  red: {
    badge: "badge-red",
    card: "card-red",
    bullet: "border-[var(--color-heritage-red)]",
    heading: "text-[var(--color-heritage-red)]",
    dot: "bg-[var(--color-heritage-red-light)] text-[var(--color-heritage-red)]",
  },
  green: {
    badge: "badge-green",
    card: "card-green",
    bullet: "border-[var(--color-heritage-green)]",
    heading: "text-[var(--color-heritage-green)]",
    dot: "bg-[var(--color-heritage-green-light)] text-[var(--color-heritage-green)]",
  },
};

export default async function HeritageCategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = heritageCategories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const styles = colorStyles[cat.color];

  // Adjacent categories for navigation
  const idx = heritageCategories.findIndex((c) => c.slug === slug);
  const prev = heritageCategories[idx - 1] ?? null;
  const next = heritageCategories[idx + 1] ?? null;

  return (
    <div className="bg-[var(--color-bg-secondary)] overflow-x-hidden">

      {/* ── Page Header ── */}
      <div className="bg-[var(--color-heritage-black)] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-heritage-black)] via-[rgba(28,18,8,0.88)] to-[var(--color-heritage-black)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="kente-strip w-12 mb-6" />
          <nav className="flex items-center gap-2 mb-5 text-sm text-white/40 font-bold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/heritage" className="hover:text-white transition-colors">Living Archive</Link>
            <span>/</span>
            <span className="text-white">{cat.name}</span>
          </nav>
          <span className={`badge ${styles.badge} mb-4 shadow-sm`}>{cat.items.length} Traditions</span>
          <h1 className="font-display text-5xl md:text-6xl font-black mb-3">{cat.name}</h1>
          <p className="text-[var(--color-heritage-gold)] italic font-bold text-lg mb-4">
            &ldquo;{cat.tagline}&rdquo;
          </p>
          <p className="text-white/65 max-w-xl leading-relaxed font-light">{cat.description}</p>
        </div>
      </div>

      {/* ── Hero image ── */}
      <div className="relative h-80 overflow-hidden">
        <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-heritage-black)]/40 to-[var(--color-bg-secondary)]" />
      </div>

      {/* ── Items ── */}
      <section className="py-16 bg-white border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <AnimateOnScroll direction="up">
              <span className="section-eyebrow">Traditions & Practices</span>
              <h2 className="font-display text-4xl font-black mt-3 text-[var(--color-text-primary)]">
                Exploring <span className="text-gradient-gold">{cat.name}</span>
              </h2>
            </AnimateOnScroll>
          </div>

          <div className="space-y-8">
            {cat.items.map((item, i) => (
              <AnimateOnScroll 
                key={item.id} 
                direction="up" 
                delay={i * 0.1}
              >
                <div
                  id={`tradition-${item.id}`}
                  className={`card ${styles.card} overflow-hidden grid grid-cols-1 lg:grid-cols-5 group bg-white hover:border-[var(--color-heritage-gold)]`}
                >
                  {/* Number + image column */}
                  <div className="lg:col-span-2 relative min-h-[220px]">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={`absolute top-4 left-4 w-9 h-9 rounded-xl ${styles.dot} flex items-center justify-center font-black text-sm shadow-sm`}>
                      {i + 1}
                    </div>
                  </div>

                  {/* Text column */}
                  <div className="lg:col-span-3 p-8 flex flex-col justify-center gap-4">
                    <h3 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                      {item.name}
                    </h3>

                    <div>
                      <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                        Description
                      </p>
                      <p className="text-[var(--color-text-muted)] leading-relaxed text-sm font-light">
                        {item.description}
                      </p>
                    </div>

                    <div className={`p-4 rounded-xl bg-[var(--color-bg-secondary)] border-l-4 ${styles.bullet} shadow-sm`}>
                      <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">
                        Cultural Significance
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed italic font-light">
                        {item.significance}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category navigation ── */}
      <section className="py-10 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between gap-4">
          {prev ? (
            <Link href={`/heritage/${prev.slug}`} className="flex items-center gap-3 group">
              <ArrowLeft size={16} className="text-[var(--color-heritage-gold)] group-hover:-translate-x-1 transition-transform" />
              <div>
                <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Previous</p>
                <p className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-heritage-gold)] transition-colors text-sm">
                  {prev.name}
                </p>
              </div>
            </Link>
          ) : <div />}

          <Link href="/heritage" className="btn-outline btn-sm font-bold">
            All Heritage Categories
          </Link>

          {next ? (
            <Link href={`/heritage/${next.slug}`} className="flex items-center gap-3 group text-right">
              <div>
                <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Next</p>
                <p className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-heritage-gold)] transition-colors text-sm">
                  {next.name}
                </p>
              </div>
              <ArrowRight size={16} className="text-[var(--color-heritage-gold)] group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[var(--color-heritage-black)] text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimateOnScroll direction="up">
            <h2 className="font-display text-4xl font-black mb-5 leading-tight">
              Experience {cat.name} <span className="text-[var(--color-heritage-gold)]">Live</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-7 font-light">
              The Volta Heritage Dance Ensemble brings these living traditions to life on stage.
              Book a performance or attend one of our upcoming events.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/events" className="btn-primary">
                Upcoming Events <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="btn-outline !text-white !border-white/30 hover:!border-[var(--color-heritage-gold)] hover:!text-[var(--color-heritage-gold)] font-bold">
                Book a Performance
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
