"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category.toLowerCase() === activeCategory.toLowerCase());

  useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePhotoIndex(null);
      if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, filteredPhotos]);

  return (
    <>
      {/* ── Photo Section with Filters ── */}
      <section className="py-16 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="section-eyebrow">Photography</span>
              <h2 className="font-display text-3xl font-black mt-2 text-[var(--color-text-primary)]">
                Photo Gallery
              </h2>
            </div>

            {/* Premium Category Filter Tabs */}
            <div className="flex overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 py-1 gap-1.5 shrink-0">
              <div className="flex gap-1.5 bg-white p-1.5 rounded-full border border-[var(--color-border)] whitespace-nowrap shadow-sm">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setActivePhotoIndex(null);
                      }}
                      className={`relative px-4 py-2 text-xs font-bold rounded-full capitalize transition-colors cursor-pointer select-none ${
                        isActive
                          ? "text-white"
                          : "text-[var(--color-text-secondary)] hover:text-[var(--color-heritage-gold)]"
                      }`}
                    >
                      <span className="relative z-10">{cat === "all" ? "All Media" : cat}</span>
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
          </div>

          {/* ── True Pinterest-style Masonry — images keep their natural height ── */}
          <motion.div
            layout
            className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  key={photo.src}
                  className="break-inside-avoid mb-2 relative group rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setActivePhotoIndex(i)}
                >
                  {/* Image — renders at its natural aspect ratio */}
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    width={600}
                    height={800}
                    className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />

                  {/* Elegant bottom gradient & text info fading in on hover */}
                  <div className="absolute inset-x-0 bottom-0 px-3 pb-4 pt-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end">
                    <span className="text-[var(--color-heritage-gold)] text-[8px] font-black uppercase tracking-widest mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-50">
                      {photo.category}
                    </span>
                    <p className="text-white text-[10px] font-semibold leading-snug line-clamp-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {photo.caption}
                    </p>
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md select-none p-4"
          >
            {/* Top Bar / Close Header */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
              <span className="text-white/40 text-xs font-semibold uppercase tracking-wider hidden sm:inline">
                {activePhotoIndex + 1} / {filteredPhotos.length}
              </span>
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Gallery Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Lightbox Main Container */}
            <div className="relative flex items-center justify-center w-full max-w-5xl h-full max-h-[75vh]">
              {/* Prev Button */}
              <button
                onClick={() =>
                  setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1))
                }
                className="absolute left-0 sm:left-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Lightbox Image wrapper */}
              <motion.div
                key={activePhotoIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full max-w-[90%] max-h-[70vh] flex items-center justify-center"
              >
                <img
                  src={filteredPhotos[activePhotoIndex].src}
                  alt={filteredPhotos[activePhotoIndex].caption}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={() =>
                  setActivePhotoIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0))
                }
                className="absolute right-0 sm:right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption Info */}
            <motion.div 
              key={`caption-${activePhotoIndex}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-center mt-6 px-4 max-w-xl z-10"
            >
              <span className="text-[var(--color-heritage-gold)] text-xs font-black uppercase tracking-widest mb-2 block font-sans">
                {filteredPhotos[activePhotoIndex].category}
              </span>
              <p className="text-white text-base font-semibold leading-relaxed">
                {filteredPhotos[activePhotoIndex].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

