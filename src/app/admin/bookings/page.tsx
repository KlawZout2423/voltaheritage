"use client";

import React, { useState } from "react";
import { Mail, Phone, Calendar, MapPin, Users as UsersIcon, Clock, CheckCircle, XCircle, Trash2, X } from "lucide-react";
import { useCms, Booking } from "@/context/CmsContext";

export default function AdminBookings() {
  const { state, updateBookingStatus, deleteBooking, currentUser } = useCms();
  const [filter, setFilter] = useState<"all" | Booking["status"]>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const bookings = state.bookings;
  const filteredBookings = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const isReadOnly = currentUser.role === "contributor";

  const handleStatusChange = (id: string, status: Booking["status"]) => {
    if (isReadOnly) return;
    updateBookingStatus(id, status);
    // Sync selected booking modal details
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status });
    }
  };

  const handleDelete = (id: string) => {
    if (isReadOnly) return;
    if (confirm("Are you sure you want to delete this booking request from the database?")) {
      deleteBooking(id);
      setSelectedBooking(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <h1 className="font-display text-2xl font-black text-[#1C1208]">Bookings & Inquiries Manager</h1>
        <p className="text-xs text-[#7A6A57] mt-0.5">
          Process performance reservations, workshop signups, and client messages from the contact form.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 border-b border-[#E8DDD0] pb-px">
        {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => {
          const count = f === "all" ? bookings.length : bookings.filter((b) => b.status === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2.5 text-xs font-black capitalize select-none transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                filter === f
                  ? "border-[var(--color-heritage-gold)] text-[var(--color-heritage-gold-dark)]"
                  : "border-transparent text-[#7A6A57] hover:text-[#1C1208]"
              }`}
            >
              {f} ({count})
            </button>
          );
        })}
      </div>

      {/* Bookings Table card */}
      <div className="bg-white border border-[#E8DDD0] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] text-[#7A6A57] font-black uppercase tracking-wider text-[10px] border-b border-[#E8DDD0]">
                <th className="p-4">Client Contact</th>
                <th className="p-4">Enquiry Type</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Event Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DDD0]">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-xs text-[#7A6A57] font-light">
                    No booking inquiries found matching the selected status.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelectedBooking(b)}
                    className="hover:bg-[#FAF7F2]/50 transition-colors cursor-pointer"
                  >
                    <td className="p-4">
                      <p className="font-bold text-[#1C1208]">{b.name}</p>
                      <p className="text-[10px] text-[#7A6A57] mt-0.5 flex items-center gap-1">
                        <Mail size={10} /> {b.email}
                      </p>
                    </td>
                    <td className="p-4 capitalize font-semibold">{b.enquiryType}</td>
                    <td className="p-4 max-w-xs truncate font-medium text-[#7A6A57]">{b.subject}</td>
                    <td className="p-4 font-bold text-[#7A6A57]">{b.eventDate || "TBD"}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          b.status === "pending"
                            ? "bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] border border-yellow-200"
                            : b.status === "confirmed"
                            ? "bg-[var(--color-heritage-green-light)] text-[var(--color-heritage-green)] border border-green-200"
                            : b.status === "completed"
                            ? "bg-slate-100 text-slate-700 border border-slate-200"
                            : "bg-[var(--color-heritage-red-light)] text-[var(--color-heritage-red)] border border-red-200"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-1">
                        <button
                          disabled={isReadOnly}
                          onClick={() => handleDelete(b.id)}
                          className="p-1.5 rounded-lg hover:bg-[var(--color-heritage-red-light)]/40 text-[#7A6A57] hover:text-[var(--color-heritage-red)] transition-all cursor-pointer disabled:opacity-50"
                          title="Delete Request"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Booking Inspection Drawer Modal ── */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-in-left p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-[#E8DDD0] pb-4">
                <div>
                  <span className="text-[9px] uppercase font-black tracking-widest text-[#7A6A57]">
                    Inquiry Inspection
                  </span>
                  <h3 className="font-display font-black text-xl text-[#1C1208] mt-1">
                    Request Details
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#E8DDD0]/50 flex items-center justify-center text-[#7A6A57] hover:text-[#1C1208] transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Status Ribbon */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DDD0]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-heritage-gold)] animate-pulse" />
                  <span className="text-xs font-bold text-[#1C1208]">Status:</span>
                  <span className="text-xs font-black uppercase text-[var(--color-heritage-gold-dark)]">
                    {selectedBooking.status}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    disabled={isReadOnly || selectedBooking.status === "confirmed"}
                    onClick={() => handleStatusChange(selectedBooking.id, "confirmed")}
                    className="flex items-center gap-1 bg-[var(--color-heritage-green)] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle size={10} /> Approve
                  </button>
                  <button
                    disabled={isReadOnly || selectedBooking.status === "cancelled"}
                    onClick={() => handleStatusChange(selectedBooking.id, "cancelled")}
                    className="flex items-center gap-1 bg-white border border-[#E8DDD0] text-[#1C1208]/70 text-[10px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <XCircle size={10} /> Cancel
                  </button>
                </div>
              </div>

              {/* Client Card */}
              <div className="space-y-3.5 text-xs">
                <div>
                  <h4 className="font-black text-[#1C1208] uppercase tracking-wider text-[9px] mb-1">
                    Client Contact
                  </h4>
                  <p className="font-bold text-sm text-[#1C1208]">{selectedBooking.name}</p>
                  <div className="space-y-1 mt-1 text-[#7A6A57] font-semibold">
                    <p className="flex items-center gap-2">
                      <Mail size={12} className="text-[var(--color-heritage-gold)]" />
                      {selectedBooking.email}
                    </p>
                    {selectedBooking.phone && (
                      <p className="flex items-center gap-2">
                        <Phone size={12} className="text-[var(--color-heritage-gold)]" />
                        {selectedBooking.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-[#E8DDD0] pt-4">
                  <div>
                    <h4 className="font-black text-[#1C1208] uppercase tracking-wider text-[9px] mb-1">
                      Event Date
                    </h4>
                    <p className="font-semibold text-xs text-[#7A6A57]">
                      {selectedBooking.eventDate || "Not Specified"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-black text-[#1C1208] uppercase tracking-wider text-[9px] mb-1">
                      Enquiry Category
                    </h4>
                    <p className="font-semibold text-xs text-[#7A6A57] capitalize">
                      {selectedBooking.enquiryType}
                    </p>
                  </div>
                </div>

                {selectedBooking.venueLocation && (
                  <div className="border-t border-[#E8DDD0] pt-4">
                    <h4 className="font-black text-[#1C1208] uppercase tracking-wider text-[9px] mb-1">
                      Venue Location
                    </h4>
                    <p className="font-semibold text-xs text-[#7A6A57]">
                      {selectedBooking.venueLocation}
                    </p>
                  </div>
                )}

                {selectedBooking.audienceSize && (
                  <div className="border-t border-[#E8DDD0] pt-4">
                    <h4 className="font-black text-[#1C1208] uppercase tracking-wider text-[9px] mb-1">
                      Audience Size
                    </h4>
                    <p className="font-semibold text-xs text-[#7A6A57]">
                      {selectedBooking.audienceSize} people
                    </p>
                  </div>
                )}

                <div className="border-t border-[#E8DDD0] pt-4">
                  <h4 className="font-black text-[#1C1208] uppercase tracking-wider text-[9px] mb-1">
                    Subject Heading
                  </h4>
                  <p className="font-bold text-xs text-[#1c1208]">{selectedBooking.subject}</p>
                </div>

                <div className="border-t border-[#E8DDD0] pt-4">
                  <h4 className="font-black text-[#1C1208] uppercase tracking-wider text-[9px] mb-1">
                    Client Description / Message
                  </h4>
                  <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DDD0] text-[#7A6A57] leading-relaxed font-light whitespace-pre-wrap">
                    {selectedBooking.message}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="border-t border-[#E8DDD0] pt-4 mt-6 flex justify-between items-center">
              <button
                disabled={isReadOnly}
                onClick={() => handleDelete(selectedBooking.id)}
                className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-heritage-red)] hover:bg-[var(--color-heritage-red-light)]/40 p-2 rounded-xl transition-all cursor-pointer disabled:opacity-50"
              >
                <Trash2 size={13} /> Delete Request
              </button>
              <button
                onClick={() => setSelectedBooking(null)}
                className="btn-outline text-xs px-4 py-2 rounded-xl cursor-pointer"
              >
                Close details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
