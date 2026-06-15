"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Users as UsersIcon,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useCms } from "@/context/CmsContext";

export default function AdminDashboard() {
  const { state, updateBookingStatus, currentUser } = useCms();
  const bookings = state.bookings;

  // Derive simple statistics
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const completedBookings = bookings.filter((b) => b.status === "completed").length;

  const isReadOnly = currentUser.role === "contributor";

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight text-[#1C1208]">
            Good Day, {currentUser.name}
          </h1>
          <p className="text-xs text-[#7A6A57] mt-1 font-medium">
            Here is what is happening with the Volta Heritage Dance Ensemble today.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/content" className="btn-primary text-xs py-2 px-4 rounded-xl">
            Edit Homepage Content
          </Link>
        </div>
      </div>

      {/* Role Notice */}
      {isReadOnly && (
        <div className="p-4 bg-[var(--color-heritage-red-light)] border border-[var(--color-heritage-red)]/20 rounded-xl text-xs text-[var(--color-heritage-red)] font-semibold flex items-center gap-2">
          ⚠️ <strong>View-Only Mode:</strong> Your role is set to <strong>{currentUser.role}</strong>. You can view all dashboard analytics and settings but cannot commit changes.
        </div>
      )}

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1 */}
        <div className="bg-white border border-[#E8DDD0] rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#7A6A57]">Bookings</span>
            <div className="w-8 h-8 rounded-lg bg-[var(--color-heritage-gold-light)] flex items-center justify-center text-[var(--color-heritage-gold-dark)]">
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-[#1C1208]">{totalBookings}</h3>
            <p className="text-[10px] text-[#7A6A57] mt-1 flex items-center gap-1 font-semibold">
              <span className="text-[var(--color-heritage-green)] font-bold">{pendingBookings} pending</span>
              in queue
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-[#E8DDD0] rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#7A6A57]">Performers</span>
            <div className="w-8 h-8 rounded-lg bg-[var(--color-heritage-green-light)] flex items-center justify-center text-[var(--color-heritage-green)]">
              <UsersIcon size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-[#1C1208]">24</h3>
            <p className="text-[10px] text-[#7A6A57] mt-1 font-semibold">Active performers & artists</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-[#E8DDD0] rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#7A6A57]">Total Events</span>
            <div className="w-8 h-8 rounded-lg bg-[var(--color-heritage-gold-light)] flex items-center justify-center text-[var(--color-heritage-gold-dark)]">
              <Calendar size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-[#1C1208]">{state.events.length}</h3>
            <p className="text-[10px] text-[#7A6A57] mt-1 font-semibold">Scheduled in 2026</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-[#E8DDD0] rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#7A6A57]">Site Traffic</span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E8DDD0] flex items-center justify-center text-[#7A6A57]">
              <Eye size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-[#1C1208]">1,840</h3>
            <p className="text-[10px] text-[#7A6A57] mt-1 font-semibold">Monthly unique visitors</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Bookings Queue & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings Queue */}
        <div className="bg-white border border-[#E8DDD0] rounded-2xl shadow-sm lg:col-span-2 overflow-hidden flex flex-col justify-between">
          <div className="p-6 border-b border-[#E8DDD0] flex justify-between items-center">
            <div>
              <h2 className="font-display text-lg font-black text-[#1C1208]">Active Bookings Queue</h2>
              <p className="text-[11px] text-[#7A6A57] mt-0.5">Manage pending and confirmed performance requests.</p>
            </div>
            <Link href="/admin/bookings" className="text-xs font-bold text-[var(--color-heritage-gold)] hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] text-[#7A6A57] font-black uppercase tracking-wider text-[10px] border-b border-[#E8DDD0]">
                  <th className="p-4">Client</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDD0]">
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-[#1C1208]">{booking.name}</p>
                      <p className="text-[10px] text-[#7A6A57]">{booking.email}</p>
                    </td>
                    <td className="p-4 capitalize">{booking.enquiryType}</td>
                    <td className="p-4 font-medium text-[#7A6A57]">{booking.eventDate || "TBD"}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          booking.status === "pending"
                            ? "bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] border border-yellow-200"
                            : booking.status === "confirmed"
                            ? "bg-[var(--color-heritage-green-light)] text-[var(--color-heritage-green)] border border-green-200"
                            : booking.status === "completed"
                            ? "bg-slate-100 text-slate-700 border border-slate-200"
                            : "bg-[var(--color-heritage-red-light)] text-[var(--color-heritage-red)] border border-red-200"
                        }`}
                      >
                        {booking.status === "pending" && <Clock size={10} />}
                        {booking.status === "confirmed" && <CheckCircle size={10} />}
                        {booking.status === "completed" && <CheckCircle size={10} />}
                        {booking.status === "cancelled" && <XCircle size={10} />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {booking.status === "pending" ? (
                        <div className="flex justify-end gap-1.5">
                          <button
                            disabled={isReadOnly}
                            onClick={() => updateBookingStatus(booking.id, "confirmed")}
                            className="bg-[var(--color-heritage-green)] hover:bg-[var(--color-heritage-green)]/90 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            disabled={isReadOnly}
                            onClick={() => updateBookingStatus(booking.id, "cancelled")}
                            className="bg-white border border-[#E8DDD0] hover:bg-[#FAF7F2] text-[#1C1208]/70 text-[10px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-[#7A6A57] font-semibold">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-[#FAF7F2]/30 border-t border-[#E8DDD0] text-center text-[10px] text-[#7A6A57] font-medium">
            Showing the 5 most recent requests. Submissions from the public Connect page appear here automatically.
          </div>
        </div>

        {/* Activity & CMS Overview */}
        <div className="space-y-6">
          {/* CMS Overview Widget */}
          <div className="bg-[#1C1208] text-white rounded-2xl p-6 shadow-sm border border-[#E8DDD0]/15 space-y-4">
            <h3 className="font-display text-lg font-black">CMS Overview</h3>
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center text-white/70">
                <span>Active homepage sections:</span>
                <span className="font-bold text-white">{state.sectionsOrder.length}</span>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>Services managed:</span>
                <span className="font-bold text-white">{state.services.length}</span>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>Published events count:</span>
                <span className="font-bold text-white">{state.events.length}</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-semibold">Quick Action Bar status:</span>
                <span className="badge badge-gold bg-[var(--color-heritage-gold)]/20 text-[9px] border-[var(--color-heritage-gold)]/40 shadow-none">
                  Sync Active
                </span>
              </div>
            </div>
            <Link href="/admin/content" className="w-full justify-center btn-primary text-xs py-2.5 rounded-xl block text-center">
              Configure Homepage Sections
            </Link>
          </div>

          {/* Quick Stats Summary List */}
          <div className="bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-black text-sm text-[#1C1208]">Bookings breakdown</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E8DDD0]">
                <p className="text-lg font-black text-[#1C1208]">{pendingBookings}</p>
                <p className="text-[9px] uppercase font-black text-[#7A6A57]">Pending</p>
              </div>
              <div className="bg-[var(--color-heritage-green-light)]/40 p-2.5 rounded-xl border border-green-100">
                <p className="text-lg font-black text-[var(--color-heritage-green)]">{confirmedBookings}</p>
                <p className="text-[9px] uppercase font-black text-[#7A6A57]">Confirmed</p>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <p className="text-lg font-black text-slate-700">{completedBookings}</p>
                <p className="text-[9px] uppercase font-black text-[#7A6A57]">Done</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
