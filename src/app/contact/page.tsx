"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send, CheckCircle, ShieldCheck, Star } from "lucide-react";
import { institution } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const inputVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const testimonials = [
  {
    quote: "Volta Heritage brought electric energy to our festival. Extremely professional and culturally authentic!",
    author: "K. Addo, Event Coordinator",
    stars: 5,
  },
  {
    quote: "The drumming and dance workshops were a masterclass in Ewe culture. Our students loved every second.",
    author: "Dr. F. Mensah, Volta School District",
    stars: 5,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    enquiryType: "performance",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-[var(--color-bg-secondary)] overflow-x-hidden">

      {/* ── Page Header ── */}
      <div className="bg-[var(--color-heritage-black)] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/WhatsApp Image 2026-06-02 at 10.54.26 (1).jpeg" 
            alt="Volta Heritage Ensemble header background" 
            fill 
            className="object-cover opacity-15" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-heritage-black)] via-[rgba(28,18,8,0.88)] to-[var(--color-heritage-black)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="kente-strip w-12 mb-6" />
          <span className="section-eyebrow text-[var(--color-heritage-gold)] mb-3 block">Get In Touch</span>
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4">Connect</h1>
          <p className="text-white/65 max-w-xl leading-relaxed font-light">
            For performance bookings, workshop requests, media enquiries, or simply to learn more about
            the Volta Heritage Dance Ensemble — we&apos;d love to hear from you.
          </p>
          <nav className="flex items-center gap-2 mt-6 text-sm text-white/40 font-bold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Connect</span>
          </nav>
        </div>
      </div>

      {/* ── Main content ── */}
      <section className="py-20 bg-white border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-5 gap-14">

          {/* Left: Contact info + Trust Signals */}
          <div className="lg:col-span-2 space-y-8">
            <AnimateOnScroll direction="left">
              <div>
                <span className="section-eyebrow">Direct Connections</span>
                <h2 className="font-display text-3xl font-black mt-3 mb-6 text-[var(--color-text-primary)]">
                  Get in <span className="text-gradient-gold">Touch</span>
                </h2>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-heritage-gold)] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-heritage-gold-light)] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MapPin size={18} className="text-[var(--color-heritage-gold-dark)]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[var(--color-text-primary)] mb-1">Our Location</p>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed font-light">{institution.address}</p>
                  </div>
                </div>

                <a
                  href={`mailto:${institution.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-heritage-gold)] transition-all group shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-heritage-gold-light)] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail size={18} className="text-[var(--color-heritage-gold-dark)]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[var(--color-text-primary)] mb-1">Email Us</p>
                    <p className="text-sm text-[var(--color-heritage-gold)] group-hover:underline font-bold">{institution.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${institution.phone.replace(/\s+/g, "")}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-heritage-gold)] transition-all group shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-heritage-gold-light)] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Phone size={18} className="text-[var(--color-heritage-gold-dark)]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[var(--color-text-primary)] mb-1">Call Us</p>
                    <p className="text-sm text-[var(--color-heritage-gold)] group-hover:underline font-bold">{institution.phone}</p>
                  </div>
                </a>
              </div>

              {/* Response time note / Trust Signal Badge */}
              <div className="p-5 rounded-xl bg-[var(--color-heritage-gold-light)] border border-[rgba(200,135,10,0.25)] flex gap-4 items-start shadow-sm mt-6">
                <ShieldCheck size={26} className="text-[var(--color-heritage-gold-dark)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-[var(--color-heritage-gold-dark)] mb-1">
                    48-Hour Response Guarantee
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-light">
                    We aim to respond to all enquiries within 48 hours on business days. For urgent booking requests, please call us directly.
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="pt-4 border-t border-[var(--color-border)]">
                <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-4">
                  Follow Our Journey
                </p>
                <div className="flex items-center gap-3">
                  <a href={institution.facebook} target="_blank" rel="noopener noreferrer" id="contact-facebook"
                    className="w-10 h-10 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-heritage-gold)] hover:border-[var(--color-heritage-gold)] hover:text-white flex items-center justify-center transition-all text-[var(--color-text-muted)] shadow-sm">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a href={institution.youtube} target="_blank" rel="noopener noreferrer" id="contact-youtube"
                    className="w-10 h-10 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-heritage-gold)] hover:border-[var(--color-heritage-gold)] hover:text-white flex items-center justify-center transition-all text-[var(--color-text-muted)] shadow-sm">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a href={institution.tiktok} target="_blank" rel="noopener noreferrer" id="contact-tiktok"
                    className="w-10 h-10 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-heritage-gold)] hover:border-[var(--color-heritage-gold)] hover:text-white flex items-center justify-center transition-all text-[var(--color-text-muted)] shadow-sm">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Testimonials */}
              <div className="pt-6 border-t border-[var(--color-border)] space-y-4">
                <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">
                  Client Experiences
                </p>
                {testimonials.map((test, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] space-y-2">
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(test.stars)].map((_, idx) => (
                        <Star key={idx} size={13} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-xs italic text-[var(--color-text-muted)] font-light leading-relaxed">
                      &ldquo;{test.quote}&rdquo;
                    </p>
                    <p className="text-[10px] font-bold text-[var(--color-text-secondary)]">
                      — {test.author}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right: Form with Staggered Input Fields */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shadow-sm"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--color-heritage-green-light)] flex items-center justify-center mb-5 shadow-sm">
                  <CheckCircle size={28} className="text-[var(--color-heritage-green)]" />
                </div>
                <h2 className="font-display text-3xl font-black text-[var(--color-text-primary)] mb-3">
                  Message Sent!
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-6 max-w-sm font-light">
                  Thank you for reaching out. We will review your message and get back to you within 48 hours.
                </p>
                <button
                  onClick={() => { 
                    setSubmitted(false); 
                    setForm({ name: "", email: "", phone: "", subject: "", message: "", enquiryType: "performance" }); 
                  }}
                  className="btn-outline btn-sm font-bold"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit} 
                id="contact-form" 
                className="space-y-5"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <motion.div variants={inputVariants}>
                    <label htmlFor="contact-name" className="form-label">Full Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      className="form-input"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </motion.div>
                  <motion.div variants={inputVariants}>
                    <label htmlFor="contact-email" className="form-label">Email Address *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      className="form-input"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <motion.div variants={inputVariants}>
                    <label htmlFor="contact-phone" className="form-label">Phone Number</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      placeholder="+233 XX XXX XXXX"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </motion.div>
                  <motion.div variants={inputVariants}>
                    <label htmlFor="contact-enquiry" className="form-label">Enquiry Type *</label>
                    <select
                      id="contact-enquiry"
                      name="enquiryType"
                      required
                      className="form-input"
                      value={form.enquiryType}
                      onChange={handleChange}
                    >
                      <option value="performance">Performance Booking</option>
                      <option value="workshop">Workshop / Education</option>
                      <option value="school">School Outreach</option>
                      <option value="tourism">Tourism Experience</option>
                      <option value="media">Media / Press</option>
                      <option value="research">Cultural Research</option>
                      <option value="general">General Enquiry</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div variants={inputVariants}>
                  <label htmlFor="contact-subject" className="form-label">Subject *</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    className="form-input"
                    placeholder="Brief subject of your message"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.div variants={inputVariants}>
                  <label htmlFor="contact-message" className="form-label">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    className="form-input resize-none"
                    placeholder="Please describe your event, requirements, or question in detail..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.button 
                  id="contact-submit" 
                  type="submit" 
                  className="btn-primary w-full justify-center"
                  variants={inputVariants}
                >
                  <Send size={16} />
                  Send Message
                </motion.button>

                <motion.p className="text-xs text-[var(--color-text-light)] text-center font-light" variants={inputVariants}>
                  Your information is kept confidential and will only be used to respond to your enquiry.
                </motion.p>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* ── Map placeholder ── */}
      <section className="bg-[var(--color-bg-secondary)]">
        <div className="w-full h-72 bg-[var(--color-bg-tertiary)] flex items-center justify-center border-t border-[var(--color-border)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image 
              src="/images/WhatsApp Image 2026-06-02 at 10.54.33 (2).jpeg" 
              alt="Volta background texture" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="relative z-10 text-center">
            <MapPin size={32} className="text-[var(--color-heritage-gold)] mx-auto mb-3" />
            <p className="font-display text-xl font-black text-[var(--color-text-primary)]">Ho, Volta Region, Ghana</p>
            <a
              href="https://maps.google.com/?q=Ho,+Volta+Region,+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-heritage-gold)] hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
