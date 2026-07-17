"use client";

import React, { useState } from "react";
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
  Inbox,
  Sparkles,
  Music,
  MapPin,
  Activity,
  AlertCircle,
} from "lucide-react";
import { useCms } from "@/context/CmsContext";

// ── Helpers ──────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const statusConfig = {
  pending:   { label: "Pending",   icon: Clock,        bg: "bg-amber-50",   text: "text-amber-700",  border: "border-amber-200",  dot: "bg-amber-400"  },
  confirmed: { label: "Confirmed", icon: CheckCircle,  bg: "bg-emerald-50", text: "text-emerald-700",border: "border-emerald-200", dot: "bg-emerald-500"},
  completed: { label: "Completed", icon: CheckCircle,  bg: "bg-slate-100",  text: "text-slate-600",  border: "border-slate-200",  dot: "bg-slate-400"  },
  cancelled: { label: "Cancelled", icon: XCircle,      bg: "bg-red-50",     text: "text-red-700",    border: "border-red-200",    dot: "bg-red-400"    },
};

const enquiryLabels: Record<string, string> = {
  performance: "Stage Performance",
  workshop:    "Workshop",
  tourism:     "Cultural Tourism",
  education:   "Education",
  other:       "General Enquiry",
};

// ── Activity Feed items derived from bookings ─────────────────
function buildActivity(bookings: ReturnType<typeof useCms>["state"]["bookings"]) {
  return [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6)
    .map((b) => ({
      id: b.id,
      icon: b.status === "confirmed" ? CheckCircle : b.status === "cancelled" ? XCircle : Inbox,
      color:
        b.status === "confirmed"
          ? "text-emerald-600 bg-emerald-50"
          : b.status === "cancelled"
          ? "text-red-500 bg-red-50"
          : "text-amber-600 bg-amber-50",
      label:
        b.status === "pending"
          ? `New inquiry from ${b.name}`
          : b.status === "confirmed"
          ? `Booking confirmed — ${b.name}`
          : b.status === "cancelled"
          ? `Booking cancelled — ${b.name}`
          : `Booking completed — ${b.name}`,
      sub: b.subject,
      time: timeAgo(b.createdAt),
    }));
}

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({
  label, value, sub, icon: Icon, iconBg, iconColor, href,
}: {
  label: string; value: string | number; sub: string;
  icon: React.ElementType; iconBg: string; iconColor: string; href?: string;
}) {
  const inner = (
    <div className="bg-white border border-[#E8DDD0] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[var(--color-heritage-gold)]/40 transition-all group space-y-4">
      <div className="flex justify-between items-start">
        <span className="text-[10px] uppercase font-black tracking-widest text-[#7A6A57]">{label}</span>
        <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} transition-transform group-hover:scale-105`}>
          <Icon size={16} />
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-black text-[#1C1208] leading-none">{value}</h3>
        <p className="text-[10px] text-[#7A6A57] mt-1.5 font-semibold leading-snug">{sub}</p>
      </div>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : <div>{inner}</div>;
}

// ── Main Component ─────────────────────────────────────────────
export default function AdminDashboard() {
  const { state, updateBookingStatus, currentUser } = useCms();
  const { bookings, events, services } = state;

  const totalBookings    = bookings.length;
  const pendingBookings  = bookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const completedBookings = bookings.filter((b) => b.status === "completed").length;

  const isReadOnly = currentUser.role === "contributor";

  const activityFeed = buildActivity(bookings);

  // Pipeline counts
  const pipeline = [
    { label: "Pending",   count: pendingBookings,   color: "bg-amber-400"   },
    { label: "Confirmed", count: confirmedBookings,  color: "bg-emerald-500" },
    { label: "Completed", count: completedBookings,  color: "bg-slate-400"   },
    { label: "Cancelled", count: bookings.filter((b) => b.status === "cancelled").length, color: "bg-red-400" },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="space-y-7">

      {/* ── Welcome Banner ─────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#1C1208] rounded-2xl p-7 shadow-lg">
        {/* decorative kente accent */}
        <div className="absolute top-0 left-0 right-0 h-1 kente-strip opacity-80" />
        {/* subtle texture dots */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-heritage-gold)] mb-1">
              CMS Portal · Volta Heritage Dance Ensemble
            </p>
            <h1 className="font-display text-3xl font-black text-white tracking-tight">
              {greeting}, {currentUser.name.split(" ")[0]} 👋
            </h1>
            <p className="text-xs text-white/50 mt-1.5 font-medium max-w-md">
              {pendingBookings > 0
                ? `You have ${pendingBookings} pending booking${pendingBookings > 1 ? "s" : ""} awaiting your response.`
                : "All bookings are up to date. Here's your site overview."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              href="/admin/content"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] text-white text-xs font-bold rounded-xl shadow-lg shadow-[var(--color-heritage-gold)]/20 transition-all"
            >
              <Sparkles size={13} /> Edit Homepage
            </Link>
            <Link
              href="/admin/bookings"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl border border-white/10 transition-all"
            >
              <Inbox size={13} /> View Bookings
            </Link>
          </div>
        </div>

        {/* Role badge */}
        {isReadOnly && (
          <div className="relative mt-5 flex items-center gap-2 text-xs text-amber-300 bg-amber-400/10 border border-amber-400/20 rounded-xl px-4 py-2.5 font-semibold">
            <AlertCircle size={13} />
            <span>
              <strong>View-Only Mode:</strong> You&apos;re signed in as <strong>{currentUser.role}</strong>. Content changes are disabled.
            </span>
          </div>
        )}
      </div>

      {/* ── Stat Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Bookings"
          value={totalBookings}
          sub={`${pendingBookings} pending · ${confirmedBookings} confirmed`}
          icon={TrendingUp}
          iconBg="bg-[var(--color-heritage-gold-light)]"
          iconColor="text-[var(--color-heritage-gold-dark)]"
          href="/admin/bookings"
        />
        <StatCard
          label="Active Performers"
          value="24"
          sub="Full ensemble · Ho-Dome, Volta Region"
          icon={UsersIcon}
          iconBg="bg-[var(--color-heritage-green-light)]"
          iconColor="text-[var(--color-heritage-green)]"
        />
        <StatCard
          label="Upcoming Events"
          value={events.length}
          sub="Scheduled across 2026"
          icon={Calendar}
          iconBg="bg-[var(--color-heritage-gold-light)]"
          iconColor="text-[var(--color-heritage-gold-dark)]"
          href="/admin/products-events"
        />
        <StatCard
          label="Site Visitors"
          value="1,840"
          sub="Monthly unique visits · +12% MoM"
          icon={Eye}
          iconBg="bg-[#FAF7F2]"
          iconColor="text-[#7A6A57]"
        />
      </div>

      {/* ── Booking Pipeline ─────────────────────────────── */}
      <div className="bg-white border border-[#E8DDD0] rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-display font-black text-sm text-[#1C1208]">Booking Pipeline</h3>
            <p className="text-[10px] text-[#7A6A57] mt-0.5">Current status distribution across all requests</p>
          </div>
          <Link href="/admin/bookings" className="text-[10px] font-bold text-[var(--color-heritage-gold)] hover:underline flex items-center gap-1">
            Manage all <ArrowRight size={11} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {pipeline.map((p) => (
            <div key={p.label} className="text-center">
              <div className="text-2xl font-black text-[#1C1208]">{p.count}</div>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <span className={`w-2 h-2 rounded-full ${p.color} shrink-0`} />
                <span className="text-[10px] font-semibold text-[#7A6A57]">{p.label}</span>
              </div>
            </div>
          ))}
        </div>
        {/* progress bar */}
        <div className="mt-4 h-2 rounded-full bg-[#FAF7F2] border border-[#E8DDD0] overflow-hidden flex">
          {totalBookings > 0 && pipeline.map((p) => (
            <div
              key={p.label}
              className={`${p.color} transition-all`}
              style={{ width: `${(p.count / totalBookings) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* ── Main Grid ────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Bookings Queue */}
        <div className="xl:col-span-2 bg-white border border-[#E8DDD0] rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-[#E8DDD0] flex justify-between items-center">
            <div>
              <h2 className="font-display text-base font-black text-[#1C1208]">Active Bookings Queue</h2>
              <p className="text-[10px] text-[#7A6A57] mt-0.5">Latest requests · click a row to open details</p>
            </div>
            <Link href="/admin/bookings" className="text-[10px] font-bold text-[var(--color-heritage-gold)] hover:underline flex items-center gap-1">
              View all <ArrowRight size={11} />
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] text-[#7A6A57] font-black uppercase tracking-wider text-[10px] border-b border-[#E8DDD0]">
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3 hidden sm:table-cell">Type</th>
                  <th className="px-5 py-3 hidden md:table-cell">Date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDD0]">
                {bookings.slice(0, 5).map((b) => {
                  const cfg = statusConfig[b.status];
                  const StatusIcon = cfg.icon;
                  return (
                    <tr key={b.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] flex items-center justify-center text-[10px] font-black shrink-0">
                            {b.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-[#1C1208] leading-tight">{b.name}</p>
                            <p className="text-[10px] text-[#7A6A57]">{b.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 hidden sm:table-cell font-semibold text-[#7A6A57] capitalize">
                        {enquiryLabels[b.enquiryType] ?? b.enquiryType}
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell font-medium text-[#7A6A57]">
                        {b.eventDate ? formatDate(b.eventDate) : "TBD"}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                          <StatusIcon size={9} />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {b.status === "pending" ? (
                          <div className="flex justify-end gap-1">
                            <button
                              disabled={isReadOnly}
                              onClick={() => updateBookingStatus(b.id, "confirmed")}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold px-2.5 py-1 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-40"
                            >
                              Approve
                            </button>
                            <button
                              disabled={isReadOnly}
                              onClick={() => updateBookingStatus(b.id, "cancelled")}
                              className="bg-white border border-[#E8DDD0] hover:bg-[#FAF7F2] text-[#1C1208]/70 text-[9px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-[#A8957E] font-semibold">Processed</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 bg-[#FAF7F2]/50 border-t border-[#E8DDD0] text-center text-[10px] text-[#7A6A57] font-medium">
            Showing 5 most recent · public submissions from the Connect page appear here automatically
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">

          {/* CMS Overview */}
          <div className="bg-[#1C1208] text-white rounded-2xl p-5 shadow-sm border border-[#E8DDD0]/10 space-y-4">
            <h3 className="font-display text-base font-black flex items-center gap-2">
              <Activity size={15} className="text-[var(--color-heritage-gold)]" />
              CMS Overview
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { label: "Homepage sections",  value: state.sectionsOrder.length },
                { label: "Services listed",    value: services.length },
                { label: "Events scheduled",   value: events.length },
                { label: "Admin users",        value: state.users.length },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center text-white/70">
                  <span>{row.label}</span>
                  <span className="font-black text-white tabular-nums">{row.value}</span>
                </div>
              ))}
              <div className="h-px bg-white/10" />
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-[11px]">Live sync</span>
                <span className="flex items-center gap-1.5 text-[9px] font-black text-emerald-400 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
            </div>
            <Link
              href="/admin/content"
              className="w-full justify-center flex items-center gap-1.5 px-4 py-2.5 bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] text-white text-xs font-bold rounded-xl shadow-lg shadow-[var(--color-heritage-gold)]/20 transition-all"
            >
              <Sparkles size={13} /> Configure Sections
            </Link>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white border border-[#E8DDD0] rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="font-display text-sm font-black text-[#1C1208]">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Add Event",          href: "/admin/products-events", icon: Calendar,  color: "text-[var(--color-heritage-gold-dark)] bg-[var(--color-heritage-gold-light)]" },
                { label: "Manage Users",        href: "/admin/users",           icon: UsersIcon, color: "text-[var(--color-heritage-green)] bg-[var(--color-heritage-green-light)]" },
                { label: "Site Settings",       href: "/admin/settings",        icon: Activity,  color: "text-[#7A6A57] bg-[#FAF7F2]" },
                { label: "View Live Site",      href: "/",                      icon: Eye,       color: "text-[var(--color-heritage-red)] bg-[var(--color-heritage-red-light)]" },
              ].map(({ label, href, icon: Icon, color }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#FAF7F2] transition-colors group"
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                    <Icon size={13} />
                  </div>
                  <span className="text-xs font-bold text-[#1C1208] group-hover:text-[var(--color-heritage-gold-dark)] transition-colors">{label}</span>
                  <ArrowRight size={12} className="ml-auto text-[#C8B99A] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white border border-[#E8DDD0] rounded-2xl p-5 shadow-sm">
            <h3 className="font-display text-sm font-black text-[#1C1208] mb-4">Recent Activity</h3>
            <div className="space-y-3.5">
              {activityFeed.length === 0 ? (
                <p className="text-xs text-[#7A6A57] text-center py-4 font-light">No recent activity</p>
              ) : (
                activityFeed.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex items-start gap-2.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}>
                        <Icon size={11} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-[#1C1208] leading-snug truncate">{item.label}</p>
                        <p className="text-[10px] text-[#7A6A57] font-light truncate">{item.sub}</p>
                      </div>
                      <span className="text-[9px] text-[#A8957E] font-semibold shrink-0 mt-0.5">{item.time}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── Next Events Strip ──────────────────────────────── */}
      {events.length > 0 && (
        <div className="bg-white border border-[#E8DDD0] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#E8DDD0] flex justify-between items-center">
            <h3 className="font-display text-base font-black text-[#1C1208]">Upcoming Events</h3>
            <Link href="/admin/products-events" className="text-[10px] font-bold text-[var(--color-heritage-gold)] hover:underline flex items-center gap-1">
              Manage <ArrowRight size={11} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E8DDD0]">
            {events.slice(0, 4).map((evt) => (
              <div key={evt.id} className="p-5 hover:bg-[#FAF7F2]/40 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-[#FAF7F2] border border-[#E8DDD0] text-[#7A6A57]">
                    {evt.category}
                  </span>
                  {evt.isFeatured && (
                    <span className="text-[var(--color-heritage-gold)] text-[10px]">★</span>
                  )}
                </div>
                <h4 className="font-display font-black text-xs text-[#1C1208] leading-snug line-clamp-2 mb-2">{evt.title}</h4>
                <div className="space-y-0.5 text-[10px] text-[#7A6A57] font-semibold">
                  <div className="flex items-center gap-1">
                    <Calendar size={10} className="text-[var(--color-heritage-gold)] shrink-0" />
                    {formatDate(evt.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={10} className="text-[var(--color-heritage-gold)] shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
