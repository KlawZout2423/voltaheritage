"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Send, CheckCircle, ShieldCheck, Star, X, Printer } from "lucide-react";
import { institution } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useCms } from "@/context/CmsContext";

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
  const { addBooking } = useCms();
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    enquiryType: "performance",
    eventDate: "",
    venueLocation: "",
    audienceSize: "100-500",
    participantCount: "",
    targetAge: "mixed",
    groupSize: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (["performance", "workshop", "school", "tourism"].includes(form.enquiryType) && !agreed) {
      alert("You must agree to the Performance Engagement Agreement & Terms to submit booking.");
      return;
    }
    addBooking({
      name: form.name,
      email: form.email,
      phone: form.phone,
      enquiryType: form.enquiryType,
      eventDate: form.eventDate,
      venueLocation: form.venueLocation,
      audienceSize: form.audienceSize,
      subject: form.subject,
      message: form.message,
    });
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
                  {institution.facebook && (
                    <a href={institution.facebook} target="_blank" rel="noopener noreferrer" id="contact-facebook"
                      className="w-10 h-10 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-heritage-gold)] hover:border-[var(--color-heritage-gold)] hover:text-white flex items-center justify-center transition-all text-[var(--color-text-muted)] shadow-sm">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                  )}
                  {institution.youtube && (
                    <a href={institution.youtube} target="_blank" rel="noopener noreferrer" id="contact-youtube"
                      className="w-10 h-10 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-heritage-gold)] hover:border-[var(--color-heritage-gold)] hover:text-white flex items-center justify-center transition-all text-[var(--color-text-muted)] shadow-sm">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  )}
                  {institution.tiktok && (
                    <a href={institution.tiktok} target="_blank" rel="noopener noreferrer" id="contact-tiktok"
                      className="w-10 h-10 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-heritage-gold)] hover:border-[var(--color-heritage-gold)] hover:text-white flex items-center justify-center transition-all text-[var(--color-text-muted)] shadow-sm">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z" />
                      </svg>
                    </a>
                  )}
                  {institution.instagram && (
                    <a href={institution.instagram} target="_blank" rel="noopener noreferrer" id="contact-instagram"
                      className="w-10 h-10 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-heritage-gold)] hover:border-[var(--color-heritage-gold)] hover:text-white flex items-center justify-center transition-all text-[var(--color-text-muted)] shadow-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </a>
                  )}
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
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                      enquiryType: "performance",
                      eventDate: "",
                      venueLocation: "",
                      audienceSize: "100-500",
                      participantCount: "",
                      targetAge: "mixed",
                      groupSize: "",
                    }); 
                    setAgreed(false);
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

                {/* Dynamic Funnel Fields */}
                <AnimatePresence mode="wait">
                  {form.enquiryType === "performance" && (
                    <motion.div
                      key="funnel-performance"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                        <div>
                          <label htmlFor="contact-event-date" className="form-label text-xs">Event Date *</label>
                          <input
                            id="contact-event-date"
                            name="eventDate"
                            type="date"
                            required={form.enquiryType === "performance"}
                            className="form-input text-xs"
                            value={form.eventDate}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-venue" className="form-label text-xs">Venue Location *</label>
                          <input
                            id="contact-venue"
                            name="venueLocation"
                            type="text"
                            required={form.enquiryType === "performance"}
                            className="form-input text-xs"
                            placeholder="e.g. Ho Cultural Centre"
                            value={form.venueLocation}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-audience" className="form-label text-xs">Expected Audience *</label>
                          <select
                            id="contact-audience"
                            name="audienceSize"
                            className="form-input text-xs"
                            value={form.audienceSize}
                            onChange={handleChange}
                          >
                            <option value="under-100">Under 100 people</option>
                            <option value="100-500">100 - 500 people</option>
                            <option value="500-1000">500 - 1,000 people</option>
                            <option value="1000+">1,000+ people</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {(form.enquiryType === "workshop" || form.enquiryType === "school") && (
                    <motion.div
                      key="funnel-education"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                        <div>
                          <label htmlFor="contact-workshop-date" className="form-label text-xs">Preferred Date *</label>
                          <input
                            id="contact-workshop-date"
                            name="eventDate"
                            type="date"
                            required={form.enquiryType === "workshop" || form.enquiryType === "school"}
                            className="form-input text-xs"
                            value={form.eventDate}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-participants" className="form-label text-xs">Expected Attendees *</label>
                          <input
                            id="contact-participants"
                            name="participantCount"
                            type="number"
                            required={form.enquiryType === "workshop" || form.enquiryType === "school"}
                            className="form-input text-xs"
                            placeholder="e.g. 40"
                            value={form.participantCount}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-age" className="form-label text-xs">Target Age Group *</label>
                          <select
                            id="contact-age"
                            name="targetAge"
                            className="form-input text-xs"
                            value={form.targetAge}
                            onChange={handleChange}
                          >
                            <option value="kids">Children (under 12)</option>
                            <option value="teens">Teens (13 - 18)</option>
                            <option value="adults">Adults (18+)</option>
                            <option value="mixed">Mixed Age Groups</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {form.enquiryType === "tourism" && (
                    <motion.div
                      key="funnel-tourism"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                        <div>
                          <label htmlFor="contact-tour-date" className="form-label text-xs">Preferred Tour Date *</label>
                          <input
                            id="contact-tour-date"
                            name="eventDate"
                            type="date"
                            required={form.enquiryType === "tourism"}
                            className="form-input text-xs"
                            value={form.eventDate}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-group-size" className="form-label text-xs">Group Size *</label>
                          <input
                            id="contact-group-size"
                            name="groupSize"
                            type="number"
                            required={form.enquiryType === "tourism"}
                            className="form-input text-xs"
                            placeholder="e.g. 5"
                            value={form.groupSize}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

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

                {/* Terms & Conditions Checkbox */}
                {["performance", "workshop", "school", "tourism"].includes(form.enquiryType) && (
                  <motion.div variants={inputVariants} className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                    <input
                      id="contact-agreed"
                      name="agreed"
                      type="checkbox"
                      required
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 text-[var(--color-heritage-gold)] border-[var(--color-border)] rounded focus:ring-[var(--color-heritage-gold)] animate-fade-in"
                    />
                    <label htmlFor="contact-agreed" className="text-xs text-[var(--color-text-secondary)] leading-relaxed select-none">
                      I agree to the{" "}
                      <button
                        type="button"
                        onClick={() => setShowTermsModal(true)}
                        className="text-[var(--color-heritage-gold)] font-bold hover:underline cursor-pointer focus:outline-none"
                      >
                        Performance Engagement Agreement & Terms & Conditions
                      </button>{" "}
                      and liability waiver.
                    </label>
                  </motion.div>
                )}

                <motion.button 
                  id="contact-submit" 
                  type="submit" 
                  disabled={["performance", "workshop", "school", "tourism"].includes(form.enquiryType) && !agreed}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
            <p className="font-display text-xl font-black text-[var(--color-text-primary)]">Ho-Dome, Ho, Volta Region, Ghana</p>
            <a
              href="https://maps.google.com/?q=Ho-Dome,+Ho,+Volta+Region,+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-heritage-gold)] hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>
      {/* ── Terms and Conditions Modal ── */}
      <AnimatePresence>
        {showTermsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-[#E8DDD0] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-[var(--color-text-primary)]"
            >
              {/* Header */}
              <div className="relative p-6 border-b border-[#E8DDD0] bg-[#1C1208] text-white">
                <div className="absolute top-0 left-0 right-0 h-1 kente-strip" />
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-heritage-gold)] mb-1 block">
                      Ensemble Agreement
                    </span>
                    <h3 className="font-display font-black text-xl leading-tight text-white">
                      Performance Engagement & Waiver
                    </h3>
                    <p className="text-[10px] text-white/50 mt-1 font-medium">
                      Volta Heritage Dance Ensemble · Custodians of Ewe Culture (CNC Affiliate)
                    </p>
                  </div>
                  <button
                    onClick={() => setShowTermsModal(false)}
                    className="p-1.5 rounded-lg text-white/60 hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#7A6A57] leading-relaxed">
                {/* Part 1: Liability Waiver */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[var(--color-heritage-gold-dark)]" />
                    <h4 className="font-bold text-[var(--color-heritage-gold-dark)] font-display text-sm">
                      Engagement & Liability Waiver
                    </h4>
                  </div>
                  <p className="font-light text-[#1C1208]/90">
                    Together as one we perform to educate. I agree to engage the <strong>Volta Heritage Dance Ensemble</strong>. 
                    I shall undertake all exercises at my own risk to satisfy the Ensemble and promise in high esteem to abide by them. 
                    I verify that my agreement/signature is proof of my intention to execute a complete and unconditional waiver 
                    and release of all liability to the fullest extent of the laws. I am at least 18 years and above and am mentally competent 
                    to enter into this agreement.
                  </p>
                </div>

                {/* Part 2: Terms and Conditions */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-[#1C1208] border-b border-[#E8DDD0] pb-2 font-display">
                    Terms & Conditions
                  </h4>

                  <div className="space-y-3 font-light text-[#1C1208]/80">
                    <div className="flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        1
                      </span>
                      <p>
                        <strong>Program Details:</strong> You shall give us appropriate time, location and concrete details concerning your program for proper preparations and technical arrangements per your demands.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        2
                      </span>
                      <p>
                        <strong>Transportation:</strong> It is your responsibility to provide a safe and convenient source of transport to convey the ensemble TO and FRO unless otherwise agreed.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        3
                      </span>
                      <p>
                        <strong>Ground Safety:</strong> The event grounds on which artisans would perform should be well catered and prepared to avoid unexpected injuries or damages.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        4
                      </span>
                      <p>
                        <strong>Catering & Changing Rooms:</strong> The group will be first refreshed and offered a convenient dressing room to keep them mentally and physically fit for the performance.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        5
                      </span>
                      <p>
                        <strong>Payment Terms:</strong> The group under the leadership will receive at least 50% of the charged amount as agreed or bargained on before start of performance unless otherwise agreed.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        6
                      </span>
                      <p>
                        <strong>Performer Packages:</strong> Regardless of your program, the artisan&apos;s food, drink, souvenirs and any other related packages will be reserved based on the number of artisans present.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        7
                      </span>
                      <p>
                        <strong>Security Liaison:</strong> You shall provide positive security who will be in communication with the group organizer due to unexpected occurrences.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        8
                      </span>
                      <p>
                        <strong>Promotion & Media:</strong> You shall also use your program or event as a medium to advertise as well as promote the group with a humble appeal.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        9
                      </span>
                      <p>
                        <strong>Technical Changes:</strong> Any technical changes in regards to your program lined up should be communicated earlier to avoid any inconvenience.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notable box */}
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 space-y-1">
                  <p className="font-bold uppercase tracking-wider text-[10px]">Important Notice:</p>
                  <p className="font-light">
                    Any special request aside agreements will attract extra charges. Failure to abide by any of the above stated terms and conditions may hold you responsible and reported to law enforcement agencies.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DDD0] flex justify-between items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-[#E8DDD0] bg-white hover:bg-[#FAF7F2] text-[#1C1208]/75 font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer size={13} /> Print
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(false)}
                    className="px-4 py-2 border border-[#E8DDD0] hover:bg-[#FAF7F2] text-[#1C1208]/75 font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAgreed(true);
                      setShowTermsModal(false);
                    }}
                    className="px-4 py-2 bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] text-white font-bold rounded-xl shadow-lg shadow-[var(--color-heritage-gold)]/20 transition-all cursor-pointer"
                  >
                    I Agree
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
