"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  CalendarRange,
  Inbox,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Search,
  Bell,
  ShieldAlert,
  ChevronRight,
  Video,
  Archive,
} from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { signOut } from "@/app/admin/auth/actions";

// ── Nav structure ──────────────────────────────────────────────
const navGroups = [
  {
    label: "Overview",
    links: [
      { label: "Dashboard",       href: "/admin/dashboard",       icon: LayoutDashboard },
    ],
  },
  {
    label: "Content",
    links: [
      { label: "Content Manager", href: "/admin/content",         icon: FileText },
      { label: "Products & Events", href: "/admin/products-events", icon: CalendarRange },
      { label: "Living Archive",   href: "/admin/heritage",        icon: Archive },
      { label: "Blog & Media",     href: "/admin/blog",            icon: Video },
    ],
  },
  {
    label: "Operations",
    links: [
      { label: "Bookings & Inquiries", href: "/admin/bookings",   icon: Inbox },
      { label: "Users & Roles",        href: "/admin/users",      icon: Users },
    ],
  },
  {
    label: "System",
    links: [
      { label: "Settings",        href: "/admin/settings",        icon: Settings },
    ],
  },
];

// All flat links (for breadcrumb lookup)
const allLinks = navGroups.flatMap((g) => g.links);

// ── Breadcrumb ─────────────────────────────────────────────────
function Breadcrumb({ pathname }: { pathname: string }) {
  const current = allLinks.find((l) => l.href === pathname);
  if (!current || pathname === "/admin/dashboard") return null;
  return (
    <nav className="hidden md:flex items-center gap-1.5 text-[10px] font-semibold text-[#A8957E]">
      <Link href="/admin/dashboard" className="hover:text-[#1C1208] transition-colors">Dashboard</Link>
      <ChevronRight size={10} className="text-[#C8B99A]" />
      <span className="text-[#1C1208] font-bold">{current.label}</span>
    </nav>
  );
}

// ── Notification badge (pending bookings) ─────────────────────
function PendingBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--color-heritage-red)] text-white text-[8px] font-black flex items-center justify-center leading-none">
      {count > 9 ? "9+" : count}
    </span>
  );
}

// ── Role badge colors ──────────────────────────────────────────
const roleMeta = {
  admin:       { label: "Administrator", dot: "bg-[var(--color-heritage-gold)]",  text: "text-[var(--color-heritage-gold)]"  },
  editor:      { label: "Editor",        dot: "bg-[var(--color-heritage-green)]", text: "text-[var(--color-heritage-green)]" },
  contributor: { label: "Contributor",   dot: "bg-[#7A6A57]",                     text: "text-[#A8957E]"                    },
};

// ── Sidebar Nav Link ───────────────────────────────────────────
function NavLink({
  href, label, icon: Icon, isActive, pendingCount, onClick,
}: {
  href: string; label: string; icon: React.ElementType;
  isActive: boolean; pendingCount?: number; onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[11px] font-bold transition-all group ${
        isActive
          ? "bg-[var(--color-heritage-gold)] text-white shadow-md shadow-[var(--color-heritage-gold)]/25"
          : "text-white/60 hover:text-white hover:bg-white/[0.07]"
      }`}
    >
      <Icon
        size={15}
        className={isActive ? "text-white" : "text-white/45 group-hover:text-white/80 transition-colors"}
      />
      <span className="leading-none">{label}</span>
      {pendingCount !== undefined && pendingCount > 0 && (
        <span className="ml-auto flex items-center justify-center w-4 h-4 rounded-full bg-[var(--color-heritage-red)] text-white text-[8px] font-black leading-none">
          {pendingCount > 9 ? "9+" : pendingCount}
        </span>
      )}
    </Link>
  );
}

// ── Sidebar ────────────────────────────────────────────────────
function Sidebar({
  pathname, pendingCount, currentUser, onReset, mobile = false, onClose,
}: {
  pathname: string; pendingCount: number;
  currentUser: ReturnType<typeof useCms>["currentUser"];
  onReset: () => void; mobile?: boolean; onClose?: () => void;
}) {
  const role = roleMeta[currentUser.role] || roleMeta["contributor"];

  return (
    <div className="flex flex-col h-full bg-[#1C1208] text-white">
      {/* Kente accent strip */}
      <div className="kente-strip h-1 shrink-0" />

      {/* Brand */}
      <div className="flex items-center justify-between px-5 pt-6 pb-5">
        <Link href="/" className="flex items-center gap-3 group" onClick={onClose}>
          <div className="w-9 h-9 rounded-xl bg-[var(--color-heritage-gold)] flex items-center justify-center font-black text-white text-sm shadow-lg shadow-[var(--color-heritage-gold)]/30 group-hover:scale-105 transition-transform">
            VH
          </div>
          <div className="leading-tight">
            <p className="font-display font-black text-sm tracking-tight text-white">Volta Heritage</p>
            <p className="text-[9px] text-[var(--color-heritage-gold)] font-black uppercase tracking-widest mt-0.5">
              CMS Portal
            </p>
          </div>
        </Link>
        {mobile && (
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-white/[0.08] mb-4" />

      {/* Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto space-y-5 pb-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3.5 mb-1.5 text-[9px] font-black uppercase tracking-widest text-white/30">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.links.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  isActive={pathname === link.href}
                  pendingCount={link.href === "/admin/bookings" ? pendingCount : undefined}
                  onClick={onClose}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="mx-5 h-px bg-white/[0.08] mb-3" />
      <div className="px-3 pb-5 space-y-1.5">
        {/* Current user */}
        <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-white/[0.05] border border-white/[0.07]">
          <div className="w-8 h-8 rounded-full bg-[var(--color-heritage-gold)] text-white flex items-center justify-center font-black text-xs shrink-0 shadow">
            {currentUser.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="leading-tight min-w-0">
            <p className="text-[11px] font-bold text-white truncate">{currentUser.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${role.dot}`} />
              <span className={`text-[9px] font-black uppercase tracking-wider ${role.text}`}>
                {role.label}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onReset}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[10px] font-bold text-white/45 hover:text-white/80 hover:bg-white/[0.06] transition-colors cursor-pointer"
        >
          <ShieldAlert size={13} />
          Reset to Defaults
        </button>

        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[10px] font-bold text-white/45 hover:text-white/80 hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </form>
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[10px] font-bold text-white/45 hover:text-white/80 hover:bg-white/[0.06] transition-colors"
        >
          Back to Site
        </Link>
      </div>
    </div>
  );
}

// ── Client Layout Wrapper ──────────────────────────────────────
export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const { state, currentUser, setCurrentUserRole, resetAll } = useCms();

  const [mobileOpen,        setMobileOpen]        = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchValue,        setSearchValue]        = useState("");

  const pendingCount = state.bookings.filter((b) => b.status === "pending").length;

  const handleRoleChange = (role: "admin" | "editor" | "contributor") => {
    setCurrentUserRole(role);
    setProfileDropdownOpen(false);
    router.refresh();
  };

  const handleReset = () => {
    if (confirm("Reset all CMS overrides to their defaults? This cannot be undone.")) {
      resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5EFE7]/40 text-[#1C1208] font-sans">

      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 sticky top-0 h-screen overflow-hidden border-r border-[#E8DDD0]/60 shadow-xl shadow-black/10">
        <Sidebar
          pathname={pathname}
          pendingCount={pendingCount}
          currentUser={currentUser}
          onReset={handleReset}
        />
      </aside>

      {/* ── Mobile Sidebar Overlay ──────────────────────────── */}
      <div
        aria-hidden={!mobileOpen}
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute inset-y-0 left-0 w-64 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar
            pathname={pathname}
            pendingCount={pendingCount}
            currentUser={currentUser}
            onReset={handleReset}
            mobile
            onClose={() => setMobileOpen(false)}
          />
        </div>
      </div>

      {/* ── Content Area ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8DDD0] h-14 flex items-center px-5 gap-4 shadow-sm">

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-[#7A6A57] hover:text-[#1C1208] hover:bg-[#FAF7F2] transition-colors cursor-pointer shrink-0"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>

          {/* Breadcrumb */}
          <Breadcrumb pathname={pathname} />

          {/* Search */}
          <div className="relative hidden md:block flex-1 max-w-xs">
            <Search
              size={13}
              className="absolute inset-y-0 left-3 my-auto text-[#A8957E] pointer-events-none"
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search bookings, events…"
              className="w-full pl-9 pr-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8DDD0] text-[11px] placeholder:text-[#A8957E] focus:outline-none focus:ring-2 focus:ring-[var(--color-heritage-gold)]/30 focus:border-[var(--color-heritage-gold)] transition-all text-[#1C1208]"
            />
          </div>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-2">

            {/* Notification Bell */}
            <Link
              href="/admin/bookings"
              className="relative p-2 rounded-lg hover:bg-[#FAF7F2] text-[#7A6A57] hover:text-[#1C1208] transition-colors"
              title={pendingCount > 0 ? `${pendingCount} pending booking${pendingCount > 1 ? "s" : ""}` : "No pending bookings"}
            >
              <Bell size={16} />
              <PendingBadge count={pendingCount} />
            </Link>

            {/* Divider */}
            <div className="h-6 w-px bg-[#E8DDD0] mx-1" />

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                aria-haspopup="true"
                aria-expanded={profileDropdownOpen}
              >
                <div className="w-7 h-7 rounded-full bg-[var(--color-heritage-gold)] text-white flex items-center justify-center font-black text-[10px] shadow">
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left leading-tight">
                  <p className="text-[11px] font-bold text-[#1C1208] leading-none">{currentUser.name}</p>
                  <p className="text-[9px] text-[#7A6A57] font-semibold capitalize mt-0.5">{currentUser.role}</p>
                </div>
                <ChevronDown size={13} className="text-[#A8957E] hidden sm:block" />
              </button>

              {profileDropdownOpen && (
                <>
                  {/* Click-away backdrop */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-[#E8DDD0] rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in-up">
                    {/* User info header */}
                    <div className="px-4 py-3 bg-[#FAF7F2] border-b border-[#E8DDD0]">
                      <p className="text-[11px] font-bold text-[#1C1208]">{currentUser.name}</p>
                      <p className="text-[9px] text-[#7A6A57] mt-0.5">{currentUser.email}</p>
                    </div>

                    {/* Role switcher */}
                    <div className="p-2">
                      <p className="px-2 py-1 text-[9px] font-black uppercase tracking-widest text-[#A8957E]">
                        Switch Role (Demo)
                      </p>
                      {(["admin", "editor", "contributor"] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => handleRoleChange(r)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                            currentUser.role === r
                              ? "bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)]"
                              : "text-[#3D3020] hover:bg-[#FAF7F2]"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${roleMeta[r].dot}`} />
                          {roleMeta[r].label}
                          {currentUser.role === r && (
                            <span className="ml-auto text-[8px] font-black uppercase text-[var(--color-heritage-gold-dark)]">Active</span>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Footer actions */}
                    <div className="border-t border-[#E8DDD0] p-2 space-y-0.5">
                      <Link
                        href="/admin/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold text-[#3D3020] hover:bg-[#FAF7F2] transition-colors"
                      >
                        <Settings size={13} className="text-[#7A6A57]" /> Site Settings
                      </Link>
                      <form action={signOut}>
                        <button type="submit"
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold text-[#3D3020] hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                          <LogOut size={13} className="text-[#7A6A57]" /> Sign Out
                        </button>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 md:p-7 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
