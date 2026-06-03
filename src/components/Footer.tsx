import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { institution } from "@/lib/data";

const heritageLinks = [
  { label: "Traditional Dance", href: "/heritage/dance" },
  { label: "Music & Drumming", href: "/heritage/music" },
  { label: "Ewe Kente Weaving", href: "/heritage/kente" },
  { label: "Traditional Festivals", href: "/heritage/festivals" },
  { label: "Chieftaincy & Customs", href: "/heritage/chieftaincy" },
  { label: "Traditional Foods", href: "/heritage/foods" },
];

const quickLinks = [
  { label: "Our Roots (About Us)", href: "/about" },
  { label: "In Orbit (Upcoming Events)", href: "/events" },
  { label: "Gallery (Photos & Videos)", href: "/gallery" },
  { label: "Offerings (Our Services)", href: "/services" },
  { label: "Blue Spotlight (Latest News)", href: "/news" },
  { label: "Connect (Contact & Book)", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-heritage-black)] text-white">
      {/* Kente strip at top of footer */}
      <div className="kente-strip" />

      {/* Main footer body */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand column ── */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="VHDE Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-white leading-tight">Volta Heritage</p>
                <p className="text-[10px] font-semibold text-white/50 tracking-wider uppercase">Dance Ensemble</p>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Preserving and promoting the living cultural traditions of the Ewe people through authentic performance, education, and heritage documentation.
            </p>
            <p className="text-xs font-bold text-[var(--color-heritage-gold)] uppercase tracking-widest mb-3">Follow Us</p>
            <div className="flex items-center gap-3">
              <a
                href={institution.facebook}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[var(--color-heritage-gold)] flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={institution.youtube}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-youtube"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[var(--color-heritage-gold)] flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
              <a
                href={institution.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-tiktok"
                aria-label="TikTok"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[var(--color-heritage-gold)] flex items-center justify-center transition-colors"
              >
                {/* TikTok icon via SVG */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Cultural Heritage ── */}
          <div>
            <p className="text-xs font-bold text-[var(--color-heritage-gold)] uppercase tracking-widest mb-4">
              Cultural Heritage
            </p>
            <ul className="space-y-2">
              {heritageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white hover:text-[var(--color-heritage-gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <p className="text-xs font-bold text-[var(--color-heritage-gold)] uppercase tracking-widest mb-4">
              Quick Links
            </p>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="text-sm text-white/30 hover:text-white/60 transition-colors flex items-center gap-1"
                >
                  Admin Login <ExternalLink size={10} />
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Contact (Connect) ── */}
          <div>
            <p className="text-xs font-bold text-[var(--color-heritage-gold)] uppercase tracking-widest mb-4">
              Connect
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[var(--color-heritage-gold)] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/60 leading-relaxed">{institution.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[var(--color-heritage-gold)] flex-shrink-0" />
                <a
                  href={`mailto:${institution.email}`}
                  id="footer-email"
                  className="text-sm text-white/60 hover:text-[var(--color-heritage-gold)] transition-colors"
                >
                  {institution.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[var(--color-heritage-gold)] flex-shrink-0" />
                <a
                  href={`tel:${institution.phone.replace(/\s+/g, "")}`}
                  id="footer-phone"
                  className="text-sm text-white/60 hover:text-[var(--color-heritage-gold)] transition-colors"
                >
                  {institution.phone}
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/50 leading-relaxed">
                <span className="text-[var(--color-heritage-gold)] font-semibold">Booking Enquiries:</span> For
                performance bookings, workshop requests, and cultural consultancy, please use our contact form or
                email directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} Volta Heritage Dance Ensemble. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with pride in Ghana 🇬🇭
          </p>
        </div>
      </div>
    </footer>
  );
}
