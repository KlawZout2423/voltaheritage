"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Video, FileText, ExternalLink } from "lucide-react";
import { useCms, BlogPost } from "@/context/CmsContext";
import { articles } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function VideoEmbed({ post }: { post: BlogPost }) {
  if (post.mediaType === "youtube" && post.mediaUrl) {
    const ytId = getYouTubeId(post.mediaUrl);
    if (ytId) {
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}`}
            title={post.title}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      );
    }
  }

  if (post.mediaType === "cloudinary_video" && post.mediaUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-black">
        <video
          src={post.mediaUrl}
          controls
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  if (post.mediaType === "tiktok" && post.mediaUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-neutral-900 flex flex-col items-center justify-center p-6 text-center text-white border-b border-[#E8DDD0]">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-tr from-pink-500 to-cyan-500" />
        </div>
        <Video size={30} className="text-[var(--color-heritage-gold)] mb-2 relative z-10" />
        <p className="text-[10px] font-bold tracking-wider uppercase mb-1.5 relative z-10">TikTok spotlight</p>
        <a
          href={post.mediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-neutral-100 font-bold text-[9px] transition-all shadow-lg hover:scale-105 relative z-10"
        >
          Watch on TikTok <ExternalLink size={10} />
        </a>
      </div>
    );
  }

  if (post.mediaUrl) {
    return (
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
        <Image
          src={post.mediaUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="relative h-48 w-full bg-[#FAF7F2] flex items-center justify-center text-[#C8B99A] rounded-t-xl border-b border-[#E8DDD0]">
      <FileText size={36} />
    </div>
  );
}

export default function BlogPage() {
  const { state } = useCms();
  const dbPosts = (state.blogPosts || []).filter((p) => p.isPublished);

  // Fallback to static articles if there are no database blog posts yet
  const displayPosts: BlogPost[] = dbPosts.length > 0 
    ? dbPosts 
    : articles.map((art) => ({
        id: art.id,
        title: art.title,
        content: art.excerpt,
        mediaType: "image" as const,
        mediaUrl: art.thumbnailUrl,
        isPublished: true,
        createdAt: art.publishedAt,
      }));

  const [featured, ...rest] = displayPosts;

  return (
    <div className="bg-[var(--color-bg-secondary)] overflow-x-hidden pb-16">
      {/* ── Page Header ── */}
      <div className="bg-[var(--color-heritage-black)] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-heritage-black)] via-[rgba(28,18,8,0.88)] to-[var(--color-heritage-black)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="kente-strip w-12 mb-6" />
          <span className="section-eyebrow text-[var(--color-heritage-gold)] mb-3 block">Stories & Updates</span>
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4">Our Blog & Vlog</h1>
          <p className="text-white/65 max-w-xl leading-relaxed font-light text-xs md:text-sm">
            Performance reviews, cultural deep-dives, video highlights, and updates from the heart
            of the Volta Region.
          </p>
          <nav className="flex items-center gap-2 mt-6 text-xs text-white/40 font-bold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Blog</span>
          </nav>
        </div>
      </div>

      {/* ── Featured Article ── */}
      {featured && (
        <section className="py-12 bg-white border-b border-[var(--color-border)]">
          <div className="mx-auto max-w-7xl px-6">
            <AnimateOnScroll direction="up">
              <span className="section-eyebrow mb-6 block">Featured Story</span>
            </AnimateOnScroll>
            
            <AnimateOnScroll direction="up" delay={0.1}>
              <div className="card card-gold overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-white border border-[#E8DDD0] rounded-2xl hover:border-[var(--color-heritage-gold)]">
                <div className="relative min-h-[250px] lg:min-h-[350px]">
                  <VideoEmbed post={featured} />
                </div>
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-[10px] text-[var(--color-text-light)] mb-3 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-[var(--color-heritage-gold)]" />
                      {formatDate(featured.createdAt)}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl font-black text-[var(--color-text-primary)] mb-3 leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-[var(--color-text-muted)] text-xs leading-relaxed mb-4 font-light whitespace-pre-line">
                    {featured.content}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* ── All Articles ── */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateOnScroll direction="up">
            <span className="section-eyebrow mb-6 block">All Stories</span>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <AnimateOnScroll 
                key={post.id} 
                direction="up" 
                delay={i * 0.1}
                className="flex"
              >
                <div className="card flex flex-col bg-white w-full border border-[#E8DDD0] rounded-2xl hover:border-[var(--color-heritage-gold)] transition-colors overflow-hidden">
                  <VideoEmbed post={post} />
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[10px] text-[var(--color-text-light)] mb-2 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} className="text-[var(--color-heritage-gold)]" /> {formatDate(post.createdAt)}
                      </span>
                    </div>
                    <h2 className="font-display text-base font-bold text-[var(--color-text-primary)] leading-snug mb-2">
                      {post.title}
                    </h2>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-3 mb-4 font-light whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 bg-[var(--color-bg-tertiary)] border-t border-[var(--color-border)] rounded-2xl mx-6">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimateOnScroll direction="up">
            <h2 className="font-display text-2xl font-bold mb-3 text-[var(--color-text-primary)]">
              Stay Connected
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] mb-5 leading-relaxed font-light">
              Follow us on social media for live updates, performance clips, and cultural stories from the
              heart of the Volta Region.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-xs">
              <Link href="/events" className="btn-primary">Upcoming Events <ArrowRight size={14} /></Link>
              <Link href="/contact" className="btn-outline">Connect With Us</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
