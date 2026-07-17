"use client";

import React, { useState, useMemo } from "react";
import {
  Mail, Phone, Calendar, MapPin, Users as UsersIcon,
  Clock, CheckCircle, XCircle, Trash2, X, Search,
  ChevronRight, MessageSquare, AlertTriangle, Filter,
} from "lucide-react";
import { useCms, Booking } from "@/context/CmsContext";

// ── Status config ──────────────────────────────────────────────
const statusConfig: Record<Booking["status"], {
  label: string; icon: React.ElementType;
  bg: string; text: string; border: string; dot: string;
}> = {
  pending:   { label: "Pending",   icon: Clock,       bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-400"   },
  confirmed: { label: "Confirmed", icon: CheckCircle, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  completed: { label: "Completed", icon: CheckCircle, bg: "bg-slate-100",  text: "text-slate-600",   border: "border-slate-200",   dot: "bg-slate-400"   },
  cancelled: { label: "Cancelled", icon: XCircle,     bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200",     dot: "bg-red-400"     },
};

const enquiryLabel: Record<string, string> = {
  performance: "Stage Performance",
  workshop:    "Workshop",
  tourism:     "Cultural Tourism",
  education:   "Education",
  other:       "General Enquiry",
};

function formatDate(iso?: string) {
  if (!iso) return "Not specified";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function formatCreated(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

// ── Status Badge ───────────────────────────────────────────────
function StatusBadge({ status }: { status: Booking["status"] }) {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <Icon size={9} strokeWidth={2.5} /> {cfg.label}
    </span>
  );
}

// ── Avatar initials ────────────────────────────────────────────
function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] flex items-center justify-center text-[11px] font-black shrink-0">
      {initials}
    </div>
  );
}

// ── Detail Drawer ──────────────────────────────────────────────
function BookingDrawer({ booking, isReadOnly, onClose, onStatus, onDelete }: {
  booking: Booking; isReadOnly: boolean;
  onClose: () => void;
  onStatus: (id: string, s: Booking["status"]) => void;
  onDelete: (id: string) => void;
}) {
  const cfg = statusConfig[booking.status];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end bg-black/60 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer panel */}
      <div className="relative w-full sm:max-w-lg h-full sm:h-auto sm:max-h-[92vh] bg-white shadow-2xl flex flex-col rounded-t-3xl sm:rounded-l-3xl sm:rounded-r-none overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#E8DDD0] shrink-0">
          <div className="flex items-center gap-3">
            <Avatar name={booking.name} />
            <div>
              <h3 className="font-display font-black text-lg text-[#1C1208] leading-tight">{booking.name}</h3>
              <p className="text-[10px] text-[#7A6A57] font-medium mt-0.5">{formatCreated(booking.createdAt)}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#FAF7F2] hover:bg-[#E8DDD0] flex items-center justify-center text-[#7A6A57] hover:text-[#1C1208] transition-colors cursor-pointer shrink-0">
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">

          {/* Status + actions */}
          <div className="flex items-center justify-between p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0]">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${cfg.dot} ${booking.status === "pending" ? "animate-pulse" : ""}`} />
              <StatusBadge status={booking.status} />
            </div>
            {!isReadOnly && (
              <div className="flex gap-1.5">
                <button
                  disabled={booking.status === "confirmed" || booking.status === "completed"}
                  onClick={() => onStatus(booking.id, "confirmed")}
                  className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-30">
                  <CheckCircle size={11} /> Approve
                </button>
                <button
                  disabled={booking.status === "completed"}
                  onClick={() => onStatus(booking.id, "completed")}
                  className="flex items-center gap-1 bg-slate-600 hover:bg-slate-700 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-30">
                  Mark Done
                </button>
                <button
                  disabled={booking.status === "cancelled"}
                  onClick={() => onStatus(booking.id, "cancelled")}
                  className="flex items-center gap-1 bg-white border border-[#E8DDD0] hover:bg-[#FAF7F2] text-[#1C1208]/70 text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-30">
                  <XCircle size={11} /> Cancel
                </button>
              </div>
            )}
          </div>

          {/* Contact */}
          <section className="space-y-2">
            <h4 className="text-[9px] font-black uppercase tracking-widest text-[#A8957E]">Contact Details</h4>
            <a href={`mailto:${booking.email}`}
              className="flex items-center gap-2 text-[11px] text-[#3D3020] font-semibold hover:text-[var(--color-heritage-gold-dark)] transition-colors">
              <Mail size={13} className="text-[var(--color-heritage-gold)] shrink-0" /> {booking.email}
            </a>
            {booking.phone && (
              <a href={`tel:${booking.phone}`}
                className="flex items-center gap-2 text-[11px] text-[#3D3020] font-semibold hover:text-[var(--color-heritage-gold-dark)] transition-colors">
                <Phone size={13} className="text-[var(--color-heritage-gold)] shrink-0" /> {booking.phone}
              </a>
            )}
          </section>

          {/* Event details */}
          <section className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-[9px] font-black uppercase tracking-widest text-[#A8957E] mb-1.5">Enquiry Type</h4>
              <p className="text-[11px] font-semibold text-[#3D3020] capitalize">{enquiryLabel[booking.enquiryType] ?? booking.enquiryType}</p>
            </div>
            <div>
              <h4 className="text-[9px] font-black uppercase tracking-widest text-[#A8957E] mb-1.5">Event Date</h4>
              <p className="text-[11px] font-semibold text-[#3D3020]">{formatDate(booking.eventDate)}</p>
            </div>
            {booking.venueLocation && (
              <div className="col-span-2">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-[#A8957E] mb-1.5">Venue</h4>
                <div className="flex items-start gap-1.5 text-[11px] text-[#3D3020] font-semibold">
                  <MapPin size={12} className="text-[var(--color-heritage-gold)] shrink-0 mt-0.5" />
                  {booking.venueLocation}
                </div>
              </div>
            )}
            {booking.audienceSize && (
              <div>
                <h4 className="text-[9px] font-black uppercase tracking-widest text-[#A8957E] mb-1.5">Audience</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#3D3020] font-semibold">
                  <UsersIcon size={12} className="text-[var(--color-heritage-gold)]" />
                  {booking.audienceSize}
                </div>
              </div>
            )}
          </section>

          {/* Subject + Message */}
          <section className="space-y-2">
            <h4 className="text-[9px] font-black uppercase tracking-widest text-[#A8957E]">Subject</h4>
            <p className="text-[11px] font-bold text-[#1C1208]">{booking.subject}</p>
          </section>
          <section className="space-y-2">
            <h4 className="text-[9px] font-black uppercase tracking-widest text-[#A8957E]">Message</h4>
            <div className="bg-[#FAF7F2] border border-[#E8DDD0] rounded-xl p-4 text-[11px] text-[#3D3020] leading-relaxed font-light whitespace-pre-wrap">
              {booking.message}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#E8DDD0] flex justify-between items-center shrink-0">
          <button disabled={isReadOnly} onClick={() => onDelete(booking.id)}
            className="flex items-center gap-1.5 text-[11px] font-bold text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-all cursor-pointer disabled:opacity-30">
            <Trash2 size={13} /> Delete Request
          </button>
          <button onClick={onClose} className="btn-outline text-xs px-4 py-2 rounded-xl cursor-pointer">Close</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────
export default function AdminBookings() {
  const { state, updateBookingStatus, deleteBooking, currentUser } = useCms();
  const [filter, setFilter]   = useState<"all" | Booking["status"]>("all");
  const [search, setSearch]   = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);

  const isReadOnly = currentUser.role === "contributor";

  const filtered = useMemo(() => {
    let list = state.bookings;
    if (filter !== "all") list = list.filter((b) => b.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((b) =>
        b.name.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.subject.toLowerCase().includes(q)
      );
    }
    return list;
  }, [state.bookings, filter, search]);

  const handleStatus = (id: string, status: Booking["status"]) => {
    if (isReadOnly) return;
    updateBookingStatus(id, status);
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
  };

  const handleDelete = (id: string) => {
    if (isReadOnly) return;
    if (!confirm("Permanently delete this booking request?")) return;
    deleteBooking(id);
    setSelected(null);
  };

  const tabs = (["all", "pending", "confirmed", "completed", "cancelled"] as const).map((s) => ({
    key: s,
    label: s === "all" ? "All" : statusConfig[s].label,
    count: s === "all" ? state.bookings.length : state.bookings.filter((b) => b.status === s).length,
    dot: s !== "all" ? statusConfig[s].dot : undefined,
  }));

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-heritage-gold)] mb-1">Operations</p>
        <h1 className="font-display text-2xl font-black text-[#1C1208] tracking-tight">Bookings & Inquiries</h1>
        <p className="text-xs text-[#7A6A57] mt-1">Process performance reservations, workshop signups, and client messages.</p>
      </div>

      {isReadOnly && (
        <div className="flex items-center gap-2.5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-semibold">
          <AlertTriangle size={14} className="shrink-0" /> View-Only: your role cannot update or delete bookings.
        </div>
      )}

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Status tabs */}
        <div className="flex gap-1 p-1 bg-[#FAF7F2] border border-[#E8DDD0] rounded-xl overflow-x-auto no-scrollbar shrink-0">
          {tabs.map(({ key, label, count, dot }) => (
            <button key={key} onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                filter === key
                  ? "bg-white shadow-sm text-[#1C1208] border border-[#E8DDD0]"
                  : "text-[#7A6A57] hover:text-[#1C1208]"
              }`}>
              {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />}
              {label}
              <span className={`ml-0.5 text-[9px] font-black ${filter === key ? "text-[#7A6A57]" : "text-[#A8957E]"}`}>
                ({count})
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute inset-y-0 left-3 my-auto text-[#A8957E] pointer-events-none" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, subject…"
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#E8DDD0] text-[11px] placeholder:text-[#A8957E] focus:outline-none focus:ring-2 focus:ring-[var(--color-heritage-gold)]/25 focus:border-[var(--color-heritage-gold)] transition-all text-[#1C1208]" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E8DDD0] rounded-2xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD0] flex items-center justify-center text-[#C8B99A]">
              <MessageSquare size={22} />
            </div>
            <p className="font-display font-black text-sm text-[#1C1208]">No bookings found</p>
            <p className="text-xs text-[#7A6A57] font-light">Try changing the filter or search term</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] text-[#7A6A57] font-black uppercase tracking-wider text-[10px] border-b border-[#E8DDD0]">
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3 hidden sm:table-cell">Type</th>
                  <th className="px-5 py-3 hidden md:table-cell">Subject</th>
                  <th className="px-5 py-3 hidden lg:table-cell">Date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDD0]">
                {filtered.map((b) => (
                  <tr key={b.id}
                    onClick={() => setSelected(b)}
                    className="hover:bg-[#FAF7F2]/60 transition-colors cursor-pointer group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={b.name} />
                        <div>
                          <p className="font-bold text-[#1C1208] leading-tight">{b.name}</p>
                          <p className="text-[10px] text-[#7A6A57]">{b.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell text-[#7A6A57] font-semibold capitalize">
                      {enquiryLabel[b.enquiryType] ?? b.enquiryType}
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell max-w-[200px]">
                      <p className="truncate text-[#7A6A57] font-medium">{b.subject}</p>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell font-semibold text-[#7A6A57]">
                      {b.eventDate ? new Date(b.eventDate).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric"}) : "TBD"}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end items-center gap-1">
                        {b.status === "pending" && !isReadOnly && (
                          <button onClick={() => handleStatus(b.id, "confirmed")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold px-2.5 py-1 rounded-lg shadow-sm transition-colors cursor-pointer">
                            Approve
                          </button>
                        )}
                        <button onClick={() => setSelected(b)}
                          className="p-1.5 rounded-lg text-[#A8957E] hover:text-[#1C1208] hover:bg-[#FAF7F2] transition-colors cursor-pointer opacity-0 group-hover:opacity-100">
                          <ChevronRight size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-5 py-3 bg-[#FAF7F2]/50 border-t border-[#E8DDD0] flex justify-between text-[10px] text-[#A8957E] font-medium">
          <span>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          <span>Public submissions from the Connect page appear here automatically</span>
        </div>
      </div>

      {/* Detail Drawer */}
      {selected && (
        <BookingDrawer
          booking={selected}
          isReadOnly={isReadOnly}
          onClose={() => setSelected(null)}
          onStatus={handleStatus}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
