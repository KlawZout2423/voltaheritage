"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { institution } from "@/lib/data";

const navLinks = [
  { label: "Home", href: "/", tagline: "Home" },
  {
    label: "Our Roots",
    href: "/about",
    tagline: "About Us",
    children: [
      { label: "Our Story", href: "/about#history" },
      { label: "Mission & Vision", href: "/about#mission" },
      { label: "Leadership Team", href: "/about#team" },
    ],
  },
  {
    label: "Living Archive",
    href: "/heritage",
    tagline: "Ewe Culture",
    children: [
      { label: "Traditional Dance", href: "/heritage/dance" },
      { label: "Music & Drumming", href: "/heritage/music" },
      { label: "Ewe Kente Weaving", href: "/heritage/kente" },
      { label: "Traditional Festivals", href: "/heritage/festivals" },
      { label: "Chieftaincy & Customs", href: "/heritage/chieftaincy" },
      { label: "Traditional Foods", href: "/heritage/foods" },
    ],
  },
  { label: "In Orbit", href: "/events", tagline: "Events" },
  { label: "Gallery", href: "/gallery", tagline: "Gallery" },
  { label: "Offerings", href: "/services", tagline: "Services" },
  { label: "Blog", href: "/blog", tagline: "Blog" },
  { label: "Connect", href: "/contact", tagline: "Contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleLogoClick = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastClickTime < 1500) {
      const nextClicks = logoClicks + 1;
      setLogoClicks(nextClicks);
      if (nextClicks >= 5) {
        e.preventDefault();
        setLogoClicks(0);
        router.push("/admin/login");
      }
    } else {
      setLogoClicks(1);
    }
    setLastClickTime(now);
  };
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const isAdmin = pathname && pathname.startsWith("/admin");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (isAdmin) return null;

  return (
    <>
      {/* ── Kente strip at very top ── */}
      <div className="kente-strip" />

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-[var(--color-border)]"
            : "bg-white border-b border-[var(--color-border)]"
        }`}
      >
        {/* ── Scroll Progress Line ── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-heritage-gold)] z-50 origin-left"
          style={{ scaleX }}
        />

        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* ── Logo ── */}
            <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Volta Heritage Dance Ensemble Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <span className="absolute text-xs font-black text-[var(--color-heritage-gold)] leading-none select-none hidden">
                  VHDE
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="font-display font-black text-sm text-[var(--color-text-primary)] leading-tight group-hover:text-[var(--color-heritage-gold)] transition-colors">
                  Volta Heritage
                </p>
                <p className="text-[10px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase leading-tight">
                  Dance Ensemble
                </p>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <div 
              className="hidden lg:flex items-center gap-1 relative"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navLinks.map((link, idx) => {
                const linkId = `nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`;
                const isLinkActive =
                  pathname === link.href ||
                  (link.children && link.children.some((c) => pathname === c.href || pathname.startsWith(c.href)));

                return link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => {
                      setActiveDropdown(link.label);
                      setHoveredIndex(idx);
                    }}
                    onMouseLeave={() => {
                      setActiveDropdown(null);
                    }}
                  >
                    <button
                      id={linkId}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                        isLinkActive
                          ? "text-[var(--color-heritage-gold)]"
                          : "text-[var(--color-text-secondary)] hover:text-[var(--color-heritage-gold)]"
                      }`}
                    >
                      <span className="relative z-10">{link.label}</span>
                      <ChevronDown
                        size={13}
                        className={`relative z-10 transition-transform duration-250 ${
                          activeDropdown === link.label ? "rotate-180 text-[var(--color-heritage-gold)]" : ""
                        }`}
                      />

                      {/* Active indicator dot */}
                      {isLinkActive && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-heritage-gold)]" />
                      )}

                      {/* Shared sliding background capsule */}
                      {hoveredIndex === idx && (
                        <motion.div
                          layoutId="navbar-hover-bg"
                          className="absolute inset-0 bg-[var(--color-heritage-gold-glow)] rounded-lg -z-10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    {/* Dropdown with animation */}
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-[var(--color-border)] py-2 z-50 origin-top-left"
                        >
                          {link.children.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`block px-4 py-2 text-sm transition-colors ${
                                  isChildActive
                                    ? "text-[var(--color-heritage-gold)] font-bold bg-[var(--color-bg-secondary)]"
                                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-heritage-gold)] hover:bg-[var(--color-bg-secondary)]"
                                }`}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    id={linkId}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    className={`relative px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center ${
                      isLinkActive
                        ? "text-[var(--color-heritage-gold)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-heritage-gold)]"
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>

                    {/* Active indicator dot */}
                    {isLinkActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-heritage-gold)]" />
                    )}

                    {/* Shared sliding background capsule */}
                    {hoveredIndex === idx && (
                      <motion.div
                        layoutId="navbar-hover-bg"
                        className="absolute inset-0 bg-[var(--color-heritage-gold-glow)] rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── CTA + hamburger ── */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                id="nav-book-us"
                className="hidden sm:inline-flex btn-primary btn-sm"
              >
                Book Us
              </Link>
              <button
                id="nav-mobile-toggle"
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                aria-label="Toggle navigation"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-[var(--color-border)] px-4 pb-4 pt-2 space-y-1 overflow-hidden"
            >
              {navLinks.map((link) => {
                const isLinkActive =
                  pathname === link.href ||
                  (link.children && link.children.some((c) => pathname === c.href || pathname.startsWith(c.href)));

                return link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                      }
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                        isLinkActive
                          ? "text-[var(--color-heritage-gold)] bg-[var(--color-bg-secondary)]"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                      }`}
                    >
                      <span className="text-left">{link.label}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${mobileExpanded === link.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileExpanded === link.label && (
                      <div className="ml-3 mt-1 space-y-1 border-l-2 border-[var(--color-border)] pl-3">
                        {link.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                isChildActive
                                  ? "text-[var(--color-heritage-gold)] font-bold"
                                  : "text-[var(--color-text-muted)] hover:text-[var(--color-heritage-gold)] hover:bg-[var(--color-bg-secondary)]"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-bold transition-colors text-left ${
                      isLinkActive
                        ? "text-[var(--color-heritage-gold)] bg-[var(--color-bg-secondary)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-heritage-gold)] hover:bg-[var(--color-bg-secondary)]"
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <div className="pt-2">
                <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">
                  Book Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
