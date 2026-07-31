"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Video, FileText, ExternalLink, X } from "lucide-react";
import { useCms, BlogPost } from "@/context/CmsContext";
import { articles } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { sanitizeHtml } from "@/lib/sanitize";

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

function VideoEmbed({ post, isFeatured = false }: { post: BlogPost; isFeatured?: boolean }) {
  if (post.mediaType === "youtube" && post.mediaUrl) {
    const ytId = getYouTubeId(post.mediaUrl);
    if (ytId) {
      return (
        <div className={`relative aspect-video w-full overflow-hidden bg-black ${
          isFeatured ? "rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none lg:rounded-br-none h-full" : "rounded-t-xl"
        }`}>
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
      <div className={`relative aspect-video w-full overflow-hidden bg-black ${
        isFeatured ? "rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none lg:rounded-br-none h-full" : "rounded-t-xl"
      }`}>
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
      <div className={`relative aspect-video w-full overflow-hidden bg-neutral-900 flex flex-col items-center justify-center p-6 text-center text-white border-b border-[#E8DDD0] ${
        isFeatured ? "rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none lg:rounded-br-none h-full" : "rounded-t-xl"
      }`}>
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
      <div className={`relative overflow-hidden w-full ${
        isFeatured 
          ? "h-full min-h-[250px] lg:min-h-[350px] rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none lg:rounded-br-none" 
          : "h-48 rounded-t-xl"
      }`}>
        <Image
          src={post.mediaUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover group-hover:scale-103 transition-transform duration-500 ${
            post.mediaUrl.includes("theophilus") ? "object-[center_17%]" : ""
          }`}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`relative bg-[#FAF7F2] flex items-center justify-center text-[#C8B99A] border-b border-[#E8DDD0] ${
      isFeatured 
        ? "h-full min-h-[250px] lg:min-h-[350px] w-full rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none lg:rounded-br-none" 
        : "h-48 w-full rounded-t-xl"
    }`}>
      <FileText size={36} />
    </div>
  );
}

function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

function getPostExcerpt(post: BlogPost & { excerpt?: string }) {
  if (post.excerpt) return post.excerpt;
  const clean = stripHtml(post.content);
  if (clean.length <= 150) return clean;
  return clean.slice(0, 150) + "...";
}

export default function BlogPage() {
  const { state } = useCms();
  const [activeFilter, setActiveFilter] = useState<"all" | "articles" | "videos">("all");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const dbPosts = (state.blogPosts || []).filter((p) => p.isPublished);

  // Combine database posts and static articles (overriding static articles with DB versions if ID matches)
  const displayPosts: (BlogPost & { excerpt?: string })[] = [
    ...dbPosts,
    ...articles
      .filter((art) => !dbPosts.some((p) => p.id === art.id))
      .map((art) => ({
        id: art.id,
        title: art.title,
        content: art.content, // full HTML content
        excerpt: art.excerpt,
        mediaType: "image" as const,
        mediaUrl: art.thumbnailUrl,
        isPublished: true,
        createdAt: art.publishedAt,
      }))
  ];

  // Sort by published date descending
  displayPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Filter posts based on tab
  const filteredPosts = displayPosts.filter((post) => {
    if (activeFilter === "articles") {
      return post.mediaType === "image";
    }
    if (activeFilter === "videos") {
      return post.mediaType !== "image";
    }
    return true;
  });

  const [featured, ...rest] = filteredPosts;

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

      {/* ── Category Filter Bar ── */}
      <div className="bg-white border-b border-[var(--color-border)] py-4 sticky top-0 z-30 shadow-sm shrink-0">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-[var(--color-heritage-gold)] text-white shadow-md shadow-[var(--color-heritage-gold)]/25"
                  : "bg-[#FAF7F2] text-[#7A6A57] hover:bg-[#FAF7F2]/80 border border-[#E8DDD0]"
              }`}
            >
              All Content
            </button>
            <button
              onClick={() => setActiveFilter("articles")}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                activeFilter === "articles"
                  ? "bg-[var(--color-heritage-gold)] text-white shadow-md shadow-[var(--color-heritage-gold)]/25"
                  : "bg-[#FAF7F2] text-[#7A6A57] hover:bg-[#FAF7F2]/80 border border-[#E8DDD0]"
              }`}
            >
              Articles & News
            </button>
            <button
              onClick={() => setActiveFilter("videos")}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                activeFilter === "videos"
                  ? "bg-[var(--color-heritage-gold)] text-white shadow-md shadow-[var(--color-heritage-gold)]/25"
                  : "bg-[#FAF7F2] text-[#7A6A57] hover:bg-[#FAF7F2]/80 border border-[#E8DDD0]"
              }`}
            >
              Videos & Vlogs
            </button>
          </div>
          <div className="text-[10px] text-[#A8957E] font-medium hidden sm:block">
            Showing {filteredPosts.length} post{filteredPosts.length !== 1 && "s"}
          </div>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="mx-auto max-w-md text-center py-20 px-6">
          <div className="w-12 h-12 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[var(--color-heritage-gold)] mx-auto mb-4 border border-[#E8DDD0]">
            <Video size={20} />
          </div>
          <h3 className="font-display font-black text-sm text-[#1C1208] mb-1">No posts found</h3>
          <p className="text-xs text-[#7A6A57] font-light">There are no posts matching this filter right now.</p>
        </div>
      ) : (
        <>
          {/* ── Featured Article ── */}
          {featured && (
            <section className="py-12 bg-white border-b border-[var(--color-border)]">
              <div className="mx-auto max-w-7xl px-6">
                <AnimateOnScroll direction="up">
                  <span className="section-eyebrow mb-6 block">Featured Story</span>
                </AnimateOnScroll>
                
                <AnimateOnScroll direction="up" delay={0.1}>
                  <div 
                    onClick={() => setSelectedPost(featured)}
                    className="card card-gold overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-white border border-[#E8DDD0] rounded-2xl hover:border-[var(--color-heritage-gold)] cursor-pointer transition-all hover:shadow-lg group"
                  >
                    <div className="relative min-h-[250px] lg:min-h-[350px] flex">
                      <VideoEmbed post={featured} isFeatured={true} />
                    </div>
                    <div className="p-6 lg:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-[10px] text-[var(--color-text-light)] mb-3 font-bold">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={11} className="text-[var(--color-heritage-gold)]" />
                          {formatDate(featured.createdAt)}
                        </span>
                        <span className="bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8DDD0]/55 font-black uppercase text-[8px]">
                          {featured.mediaType === "image" ? "Article" : "Video"}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl lg:text-3xl font-black text-[var(--color-text-primary)] mb-3 leading-snug group-hover:text-[var(--color-heritage-gold)] transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-[var(--color-text-muted)] text-xs leading-relaxed mb-6 font-light line-clamp-3">
                        {getPostExcerpt(featured)}
                      </p>
                      <div className="mt-auto pt-3 border-t border-[#FAF7F2] flex items-center justify-between text-[10px] font-bold text-[var(--color-heritage-gold)]">
                        <span>{featured.mediaType === "image" ? "Read Full Story" : "Watch Video Spotlight"}</span>
                        <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </section>
          )}

          {/* ── All Articles ── */}
          {rest.length > 0 && (
            <section className="py-12">
              <div className="mx-auto max-w-7xl px-6">
                <AnimateOnScroll direction="up">
                  <span className="section-eyebrow mb-6 block">More Updates</span>
                </AnimateOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, i) => (
                    <AnimateOnScroll 
                      key={post.id} 
                      direction="up" 
                      delay={i * 0.1}
                      className="flex"
                    >
                      <div 
                        onClick={() => setSelectedPost(post)}
                        className="card flex flex-col bg-white w-full border border-[#E8DDD0] rounded-2xl hover:border-[var(--color-heritage-gold)] hover:shadow-lg cursor-pointer transition-all overflow-hidden group"
                      >
                        <VideoEmbed post={post} />
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-3 text-[10px] text-[var(--color-text-light)] mb-2 font-semibold">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={11} className="text-[var(--color-heritage-gold)]" /> {formatDate(post.createdAt)}
                            </span>
                            <span className="bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8DDD0]/55 font-black uppercase text-[8px]">
                              {post.mediaType === "image" ? "Article" : "Video"}
                            </span>
                          </div>
                          <h2 className="font-display text-base font-bold text-[var(--color-text-primary)] leading-snug mb-2 group-hover:text-[var(--color-heritage-gold)] transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-3 mb-6 font-light">
                            {getPostExcerpt(post)}
                          </p>
                          <div className="mt-auto pt-3 border-t border-[#FAF7F2] flex items-center justify-between text-[10px] font-bold text-[var(--color-heritage-gold)]">
                            <span>{post.mediaType === "image" ? "Read Article" : "Watch Vlog"}</span>
                            <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </AnimateOnScroll>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ── Reader Modal Overlay ── */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white border border-[#E8DDD0] rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in-up">
            {/* Header Banner */}
            <div className="relative h-48 sm:h-72 w-full bg-neutral-950 shrink-0 flex items-center justify-center overflow-hidden">
              {selectedPost.mediaType === "image" ? (
                selectedPost.mediaUrl ? (
                  <Image
                    src={selectedPost.mediaUrl}
                    alt={selectedPost.title}
                    fill
                    className="object-cover object-[center_17%]"
                  />
                ) : (
                  <div className="text-[var(--color-heritage-gold)] opacity-40"><FileText size={48} /></div>
                )
              ) : (
                <div className="w-full h-full"><VideoEmbed post={selectedPost} isFeatured={true} /></div>
              )}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-20 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title / Meta */}
            <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-[#E8DDD0] shrink-0">
              <div className="flex items-center gap-3 text-[10px] text-[var(--color-heritage-gold)] uppercase tracking-wider font-bold mb-2">
                <span className="flex items-center gap-1">
                  <Calendar size={11} /> {formatDate(selectedPost.createdAt)}
                </span>
                <span>•</span>
                <span className="bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8DDD0]/55 font-black text-[8px]">
                  {selectedPost.mediaType === "image" ? "Article" : "Video Spotlight"}
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-black text-[#1C1208] leading-tight">
                {selectedPost.title}
              </h2>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 font-light text-xs sm:text-sm text-[#3E3427] leading-relaxed prose max-w-none">
              {selectedPost.content && (selectedPost.content.includes("<p>") || selectedPost.content.includes("<div")) ? (
                <div
                  className="rich-text-content space-y-4"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(selectedPost.content) }}
                />
              ) : (
                <p className="whitespace-pre-line">{selectedPost.content}</p>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#E8DDD0] shrink-0 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="btn-primary text-xs px-5 py-2.5 rounded-xl shadow-lg cursor-pointer"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

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
