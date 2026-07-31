"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Video } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  mediaType: string;
  mediaUrl?: string;
  isPublished: boolean;
  createdAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function NewsSection({ articles }: { articles: NewsArticle[] }) {
  return (
    <section id="news" className="py-24 bg-white border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <AnimateOnScroll direction="up" className="w-full flex flex-col sm:flex-row sm:items-end justify-between">
            <div>
              <span className="section-eyebrow">Blue Spotlight</span>
              <h2 className="font-display text-4xl md:text-5xl font-black mt-3 text-[var(--color-text-primary)]">
                Latest News
              </h2>
            </div>
            <Link href="/blog" id="news-view-all" className="btn-outline btn-sm flex-shrink-0 mt-4 sm:mt-0 font-bold">
              Our Blog <ArrowRight size={14} />
            </Link>
          </AnimateOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <AnimateOnScroll key={article.id} direction="up" delay={i * 0.12} className="flex">
              <article className={`card flex flex-col bg-white w-full hover:border-[var(--color-heritage-gold)] ${i === 0 ? "card-gold" : ""}`}>
                <div className="aspect-card relative overflow-hidden rounded-t-xl min-h-[180px]">
                  {article.mediaUrl ? (
                    <Image
                      src={article.mediaUrl}
                      alt={article.title}
                      fill
                      className={`img-cover object-cover ${
                        article.mediaUrl.includes("theophilus") ? "object-[center_17%]" : ""
                      }`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-white">
                      <Video size={28} className="text-[var(--color-heritage-gold)]" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-gold">{article.mediaType.toUpperCase()}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-[var(--color-text-light)] mb-2 font-semibold">{formatDate(article.createdAt)}</p>
                  <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] leading-snug mb-3 flex-1 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-5 font-light">
                    {article.content}
                  </p>
                  <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-heritage-gold)] hover:gap-3 transition-all">
                    Read &amp; Watch <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
