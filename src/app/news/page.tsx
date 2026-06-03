import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { articles } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Blue Spotlight",
  description:
    "Latest news, cultural stories, and announcements from the Volta Heritage Dance Ensemble — performances, outreach, and Ewe cultural education.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categoryStyles: Record<string, string> = {
  news: "badge-gold",
  "cultural-story": "badge-red",
  announcement: "badge-green",
  education: "badge-green",
};

export default function NewsPage() {
  const [featured, ...rest] = articles;

  return (
    <div className="bg-[var(--color-bg-secondary)] overflow-x-hidden">

      {/* ── Page Header ── */}
      <div className="bg-[var(--color-heritage-black)] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/WhatsApp Image 2026-06-02 at 10.54.26 (1).jpeg" 
            alt="Volta Heritage Ensemble news backdrop" 
            fill 
            className="object-cover opacity-15" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-heritage-black)] via-[rgba(28,18,8,0.88)] to-[var(--color-heritage-black)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="kente-strip w-12 mb-6" />
          <span className="section-eyebrow text-[var(--color-heritage-gold)] mb-3 block">Stories & Updates</span>
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4">Blue Spotlight</h1>
          <p className="text-white/65 max-w-xl leading-relaxed font-light">
            Performance reviews, cultural deep-dives, programme announcements, and stories from the heart
            of the Volta Region.
          </p>
          <nav className="flex items-center gap-2 mt-6 text-sm text-white/40 font-bold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Blue Spotlight</span>
          </nav>
        </div>
      </div>

      {/* ── Featured Article ── */}
      {featured && (
        <section className="py-16 bg-white border-b border-[var(--color-border)]">
          <div className="mx-auto max-w-7xl px-6">
            <AnimateOnScroll direction="up">
              <span className="section-eyebrow mb-8 block">Featured Story</span>
            </AnimateOnScroll>
            
            <AnimateOnScroll direction="up" delay={0.1}>
              <Link href={`/news/${featured.slug}`} id={`article-${featured.id}`} className="group block">
                <div className="card card-gold overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-white hover:border-[var(--color-heritage-gold)]">
                  <div className="relative aspect-[16/9] lg:aspect-auto min-h-[280px] overflow-hidden">
                    <Image
                      src={featured.thumbnailUrl}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`badge ${categoryStyles[featured.category] ?? "badge-gold"} shadow-sm`}>
                        {featured.category.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-xs text-[var(--color-text-light)] mb-4 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-[var(--color-heritage-gold)]" />
                        {formatDate(featured.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User size={12} className="text-[var(--color-heritage-gold)]" />
                        {featured.author}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl font-black text-[var(--color-text-primary)] mb-4 leading-snug group-hover:text-[var(--color-heritage-gold)] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-[var(--color-text-muted)] leading-relaxed mb-6 font-light">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-heritage-gold)] group-hover:gap-4 transition-all">
                      Read Full Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* ── All Articles ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateOnScroll direction="up">
            <span className="section-eyebrow mb-8 block">All Stories</span>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <AnimateOnScroll 
                key={article.id} 
                direction="up" 
                delay={i * 0.15}
                className="flex"
              >
                <Link
                  href={`/news/${article.slug}`}
                  id={`article-card-${article.id}`}
                  className="card flex flex-col group bg-white w-full hover:border-[var(--color-heritage-gold)]"
                >
                  <div className="aspect-[16/9] relative overflow-hidden rounded-t-xl">
                    <Image
                      src={article.thumbnailUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`badge ${categoryStyles[article.category] ?? "badge-gold"} shadow-sm`}>
                        {article.category.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-[var(--color-text-light)] mb-3 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} className="text-[var(--color-heritage-gold)]" /> {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)] leading-snug mb-3 flex-1 group-hover:text-[var(--color-heritage-gold)] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-4 font-light">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-heritage-gold)] group-hover:gap-3 transition-all">
                      Read More <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[var(--color-bg-tertiary)] border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimateOnScroll direction="up">
            <h2 className="font-display text-3xl font-bold mb-4 text-[var(--color-text-primary)] animate-pulse">
              Stay Connected
            </h2>
            <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed font-light">
              Follow us on social media for live updates, performance clips, and cultural stories from the
              heart of the Volta Region.
            </p>
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
