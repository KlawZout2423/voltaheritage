import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";
import { articles } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "long",
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div className="bg-[var(--color-bg-secondary)] overflow-x-hidden">

      {/* ── Page Header ── */}
      <div className="bg-[var(--color-heritage-black)] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={article.thumbnailUrl} alt="" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-heritage-black)] via-[rgba(28,18,8,0.9)] to-[var(--color-heritage-black)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 mb-6 text-sm text-white/40 font-bold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-white transition-colors">Blue Spotlight</Link>
            <span>/</span>
            <span className="text-white line-clamp-1">{article.title}</span>
          </nav>
          <span className={`badge ${categoryStyles[article.category] ?? "badge-gold"} mb-4 shadow-sm`}>
            {article.category.replace("-", " ")}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black leading-[1.1] mb-5">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/60 font-semibold">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[var(--color-heritage-gold)]" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={13} className="text-[var(--color-heritage-gold)]" />
              {article.author}
            </span>
          </div>
        </div>
      </div>

      {/* ── Article Body ── */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          {/* Hero image */}
          <div className="rounded-2xl overflow-hidden mb-10 aspect-[16/8] relative shadow-lg">
            <Image
              src={article.thumbnailUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Excerpt */}
          <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed font-semibold border-l-4 border-[var(--color-heritage-gold)] pl-5 mb-8 italic bg-[var(--color-bg-secondary)] py-4 pr-4 rounded-r-xl">
            {article.excerpt}
          </p>

          {/* Content */}
          <div
            className="prose-article font-light leading-loose text-base"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-heritage-gold)] hover:gap-4 transition-all">
              <ArrowLeft size={14} /> Back to Blue Spotlight
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <section className="py-16 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-7xl px-6">
            <span className="section-eyebrow mb-8 block">More Stories</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((rel, i) => (
                <AnimateOnScroll 
                  key={rel.id} 
                  direction="up" 
                  delay={i * 0.15}
                  className="flex"
                >
                  <Link href={`/news/${rel.slug}`} className="card flex flex-col group bg-white w-full hover:border-[var(--color-heritage-gold)]">
                    <div className="aspect-[16/9] relative overflow-hidden rounded-t-xl">
                      <Image src={rel.thumbnailUrl} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-xs text-[var(--color-text-light)] mb-2 font-semibold">{formatDate(rel.publishedAt)}</p>
                      <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-heritage-gold)] transition-colors leading-snug">
                        {rel.title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-heritage-gold)] group-hover:gap-3 transition-all mt-auto">
                        Read Article <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
