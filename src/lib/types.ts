export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;         // ISO date string e.g. "2026-08-15"
  endDate?: string;
  venue: string;
  category: "festival" | "workshop" | "exhibition" | "performance" | "other";
  imageUrl: string;
  isFeatured?: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;       // HTML or Markdown
  thumbnailUrl: string;
  category: "news" | "cultural-story" | "announcement" | "education";
  publishedAt: string;   // ISO date string
  author: string;
}

export interface HeritageCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  color: "gold" | "red" | "green";
  items: HeritageItem[];
}

export interface HeritageItem {
  id: string;
  name: string;
  description: string;
  significance: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  type: "photo" | "video";
  url: string;           // photo URL or TikTok/YouTube embed URL
  caption: string;
  category?: string;
  thumbnailUrl?: string; // for videos
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;          // lucide icon name
  color: "gold" | "red" | "green";
  features: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}
