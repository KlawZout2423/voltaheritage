"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

interface Photo {
  src: string;
  caption: string;
  category: string;
}

interface Video {
  id: string;
  type: "photo" | "video";
  url: string;
  caption: string;
  category?: string;
  thumbnailUrl?: string;
}

interface GalleryContentProps {
  photos: Photo[];
  videos: Video[];
}

const categories = ["all", "performance", "festival", "heritage", "workshop"];

const categoryColors: Record<string, string> = {
  performance: "badge-gold",
  festival: "badge-red",
  heritage: "badge-red",
  workshop: "badge-green",
};

export default function GalleryContent({ photos, videos }: GalleryContentProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPhotos =
    activeCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      {/* ── Photo Section with Filters ── */}
      <section className="py-16 bg-white border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="section-eyebrow">Photography</span>
              <h2 className="font-display text-3xl font-black mt-2 text-[var(--color-text-primary)]">
                Visions Gallery
              </h2>
            </div>

            {/* Premium Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-[var(--color-bg-secondary)] p-1.5 rounded-full border border-[var(--color-border)]">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-4 py-2 text-xs font-bold rounded-full capitalize transition-colors cursor-pointer select-none ${
                      isActive
                        ? "text-white"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-heritage-gold)]"
                    }`}
                  >
                    <span className="relative z-10">{cat === "all" ? "All Visions" : cat}</span>
                    {isActive && (
                      <motion.div
                        layoutId="gallery-active-pill"
                        className="absolute inset-0 bg-[var(--color-heritage-gold)] rounded-full shadow-sm z-0"
                        transition={{ type: "spring", stiffness: 385, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Masonry Image Grid */}
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  key={photo.src}
                  className="gallery-item break-inside-avoid relative group rounded-xl overflow-hidden border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative overflow-hidden cursor-pointer">
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      width={600}
                      height={450}
                      className="w-full h-auto block transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`badge ${categoryColors[photo.category] ?? "badge-gold"} shadow-sm`}>
                        {photo.category}
                      </span>
                    </div>

                    {/* Gradient & Glassmorphism Text Slide-up Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/45 to-transparent translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-350 ease-out pointer-events-none z-10">
                      <p className="text-[10px] font-black tracking-widest uppercase text-[var(--color-heritage-gold)] mb-1">
                        {photo.category}
                      </p>
                      <p className="text-white text-xs font-semibold leading-snug">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Videos ── */}
      {videos.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
              <div>
                <span className="section-eyebrow">Video Performances</span>
                <h2 className="font-display text-3xl font-black mt-2 text-[var(--color-text-primary)]">
                  Watch Us Perform
                </h2>
              </div>
              <a
                href="https://tiktok.com/@voltaheritage"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-sm font-bold"
              >
                Follow on TikTok
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="card overflow-hidden bg-white hover:border-[var(--color-heritage-gold)] group">
                  <div className="relative aspect-[16/9] bg-[var(--color-bg-tertiary)] overflow-hidden">
                    {video.thumbnailUrl ? (
                      <>
                        <Image 
                          src={video.thumbnailUrl} 
                          alt={video.caption} 
                          fill 
                          className="object-cover group-hover:scale-103 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-colors group-hover:bg-black/35">
                          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform group-hover:scale-108 transition-all duration-300 cursor-pointer">
                            <Play size={20} className="text-[var(--color-heritage-gold)] ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Play size={32} className="text-[var(--color-text-light)]" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-sm font-bold text-[var(--color-text-primary)]">{video.caption}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 font-light">TikTok • Volta Heritage Dance Ensemble</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
