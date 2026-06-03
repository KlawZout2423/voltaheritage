import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { galleryItems } from "@/lib/data";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos and videos of the Volta Heritage Dance Ensemble's performances, workshops, and cultural events — a visual journey through Ewe cultural traditions.",
};

// All real photos — interleaved so different aspect-ratio images
// are spread across masonry columns rather than clustering by orientation.
const rawPhotos = [
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.25.jpeg",      caption: "Ensemble performance",         category: "performance" },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.10.jpeg",      caption: "Stage performance",             category: "performance" },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.26.jpeg",      caption: "Traditional dance showcase",    category: "performance" },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.10 (1).jpeg",  caption: "Ensemble on stage",             category: "performance" },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.26 (1).jpeg",  caption: "Cultural celebration",          category: "festival"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.11.jpeg",      caption: "Traditional regalia",           category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.27.jpeg",      caption: "Drumming ceremony",             category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.11 (1).jpeg",  caption: "Ewe dance showcase",            category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.27 (1).jpeg",  caption: "Ewe dance tradition",           category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.11 (2).jpeg",  caption: "Cultural programme",            category: "festival"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.27 (2).jpeg",  caption: "Community gathering",           category: "festival"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.11 (3).jpeg",  caption: "Dance traditions",              category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.28.jpeg",      caption: "Ensemble in full regalia",      category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.11 (4).jpeg",  caption: "Workshop participants",         category: "workshop"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.28 (1).jpeg",  caption: "Youth workshop session",        category: "workshop"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.12.jpeg",      caption: "Heritage performance",          category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.29.jpeg",      caption: "Heritage dance practice",       category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.12 (1).jpeg",  caption: "Cultural showcase",             category: "festival"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.29 (1).jpeg",  caption: "Volta Heritage performance",    category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.12 (2).jpeg",  caption: "Drumming practice",             category: "workshop"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.30.jpeg",      caption: "Festival celebration",          category: "festival"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.12 (3).jpeg",  caption: "Ewe cultural heritage",         category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.30 (1).jpeg",  caption: "Cultural showcase",             category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.13.jpeg",      caption: "Ensemble arts",                 category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.30 (2).jpeg",  caption: "Traditional costumes",          category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.13 (1).jpeg",  caption: "Community event",               category: "festival"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.31.jpeg",      caption: "Agbadza war dance",             category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.13 (2).jpeg",  caption: "Cultural celebration",          category: "festival"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.32.jpeg",      caption: "Ewe cultural arts",             category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.13 (3).jpeg",  caption: "Traditional arts",              category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.32 (1).jpeg",  caption: "Borborbor dance circle",        category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.14.jpeg",      caption: "Volta Heritage showcase",       category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.33.jpeg",      caption: "Ensemble rehearsal",            category: "workshop"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.38.14 (1).jpeg",  caption: "Grand performance",             category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.33 (1).jpeg",  caption: "Master drummer",                category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.33 (2).jpeg",  caption: "Festival opening",              category: "festival"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.33 (3).jpeg",  caption: "Traditional drumming",          category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.34.jpeg",      caption: "Cultural immersion",            category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.34 (1).jpeg",  caption: "Dance education",               category: "workshop"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.35.jpeg",      caption: "Husago ritual dance",           category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.35 (1).jpeg",  caption: "Kinka youth dance",             category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.35 (2).jpeg",  caption: "Ensemble full cast",            category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.36.jpeg",      caption: "Grand performance stage",       category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.38.jpeg",      caption: "Festival grounds",              category: "festival"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.39.jpeg",      caption: "Cultural showcase",             category: "festival"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.39 (1).jpeg",  caption: "Ensemble in action",            category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.40.jpeg",      caption: "Heritage celebration",          category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.40 (1).jpeg",  caption: "Dance workshop",                category: "workshop"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.40 (2).jpeg",  caption: "Traditional arts",              category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.42.jpeg",      caption: "Volta Region culture",          category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.42 (1).jpeg",  caption: "Ewe dance forms",               category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.42 (2).jpeg",  caption: "Community performance",         category: "festival"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.42 (3).jpeg",  caption: "Cultural gathering",            category: "festival"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.43.jpeg",      caption: "Ensemble showcase",             category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.43 (1).jpeg",  caption: "Drumming ensemble",             category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.43 (2).jpeg",  caption: "Heritage documentation",        category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.43 (3).jpeg",  caption: "Cultural education",            category: "workshop"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.44.jpeg",      caption: "Ewe festival dance",            category: "festival"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.44 (1).jpeg",  caption: "Youth participation",           category: "workshop"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.44 (2).jpeg",  caption: "Dance performance",             category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.44 (3).jpeg",  caption: "Cultural arts display",         category: "heritage"     },
  { src: "/images/WhatsApp Image 2026-06-02 at 10.54.45.jpeg",      caption: "Grand finale",                  category: "performance"  },
  { src: "/images/WhatsApp Image 2026-06-02 at 16.33.30.jpeg",      caption: "VHDE logo",                     category: "heritage"     },
];

// Interleave first-half and second-half of the list so images
// from different aspect-ratio groups are distributed evenly.
const mid = Math.ceil(rawPhotos.length / 2);
const realPhotos = rawPhotos.reduce<typeof rawPhotos>((acc, _, i, arr) => {
  if (i < mid) {
    acc.push(arr[i]);
    if (arr[i + mid]) acc.push(arr[i + mid]);
  }
  return acc;
}, []);

const videos = galleryItems.filter((g) => g.type === "video");

export default function GalleryPage() {
  return (
    <div className="bg-[var(--color-bg-secondary)]">

      {/* ── Page Header ── */}
      <div className="bg-[var(--color-heritage-black)] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/WhatsApp Image 2026-06-02 at 10.54.26 (1).jpeg" 
            alt="Volta Heritage Ensemble backdrop" 
            fill 
            className="object-cover opacity-15" 
          />
          <div className="absolute inset-0 bg-[rgba(28,18,8,0.85)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="kente-strip w-12 mb-6" />
          <span className="section-eyebrow text-[var(--color-heritage-gold)] mb-3 block">Gallery</span>
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4">Media Gallery</h1>
          <p className="text-white/65 max-w-xl leading-relaxed font-light">
            A visual journey through our performances, cultural celebrations, workshops, and heritage moments
            captured across the Volta Region and beyond.
          </p>
          <nav className="flex items-center gap-2 mt-6 text-sm text-white/40 font-bold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Gallery</span>
          </nav>
        </div>
      </div>

      {/* ── Client Content (Interactive photo grid & filters) ── */}
      <GalleryContent photos={realPhotos} videos={videos} />

      {/* ── CTA ── */}
      <section className="py-16 bg-[var(--color-bg-tertiary)] border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold mb-4 text-[var(--color-text-primary)]">
            Want to see us live?
          </h2>
          <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed font-light">
            Check our upcoming events or book a private performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events" className="btn-primary">View Events <ArrowRight size={15} /></Link>
            <Link href="/contact" className="btn-outline">Book a Performance</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
