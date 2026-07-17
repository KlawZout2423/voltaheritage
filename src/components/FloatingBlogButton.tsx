"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Video } from "lucide-react";

export default function FloatingBlogButton() {
  const pathname = usePathname();

  // Don't show the floating button on admin dashboard pages
  if (pathname && (pathname.startsWith("/admin") || pathname === "/blog")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#1C1208] text-[var(--color-heritage-gold)] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-[var(--color-heritage-gold)]/20">
        Our Blog & Vlog
      </span>

      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-full bg-[var(--color-heritage-gold)] opacity-30 animate-ping" />

      {/* Floating Button */}
      <Link
        href="/blog"
        className="relative flex w-14 h-14 items-center justify-center rounded-full bg-[var(--color-heritage-gold)] text-white shadow-2xl hover:bg-[var(--color-heritage-gold-dark)] active:scale-95 transition-all duration-200 border border-white/10"
        title="Check out our Blog & Vlog"
      >
        <Video size={20} className="text-white" />
      </Link>
    </div>
  );
}
