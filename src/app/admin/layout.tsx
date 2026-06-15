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
  Plus,
  ShieldAlert,
} from "lucide-react";
import { useCms } from "@/context/CmsContext";

const adminNavLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Content Manager", href: "/admin/content", icon: FileText },
  { label: "Products & Events", href: "/admin/products-events", icon: CalendarRange },
  { label: "Bookings & Orders", href: "/admin/bookings", icon: Inbox },
  { label: "Users & Roles", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, setCurrentUserRole, resetAll } = useCms();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Role names
  const roleDisplay = {
    admin: "Administrator",
    editor: "Editor",
    contributor: "Contributor",
  };

  const handleRoleChange = (role: "admin" | "editor" | "contributor") => {
    setCurrentUserRole(role);
    setProfileDropdownOpen(false);
    // Force refresh the page to update context rendering
    router.refresh();
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all CMS overrides to their defaults?")) {
      resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1208]/05 flex text-[#1C1208] font-sans">
      {/* ── Kente strip at the very top of the admin area ── */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-[60] kente-strip" />

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#1C1208] text-white border-r border-[#E8DDD0]/20 pt-8 shrink-0 relative">
        {/* Brand */}
        <div className="px-6 mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-heritage-gold)] flex items-center justify-center font-bold text-white text-sm">
              VH
            </div>
            <div>
              <p className="font-display font-black text-sm tracking-tight text-white leading-tight">
                Volta Heritage
              </p>
              <p className="text-[10px] text-[var(--color-heritage-gold)] font-bold uppercase tracking-wider">
                CMS Portal
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1.5">
          {adminNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[var(--color-heritage-gold)] text-white shadow-md shadow-[var(--color-heritage-gold)]/20"
                    : "text-white/70 hover:text-white hover:bg-white/05"
                }`}
              >
                <Icon size={16} className={isActive ? "text-white" : "text-white/55"} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {/* Role Indicator Widget */}
          <div className="bg-white/05 rounded-xl p-3 border border-white/05">
            <p className="text-[9px] uppercase font-black text-white/40 tracking-wider">Active Role</p>
            <p className="text-xs font-bold text-[var(--color-heritage-gold)] mt-0.5 capitalize">
              {roleDisplay[currentUser.role]}
            </p>
          </div>
          <button
            onClick={handleReset}
            className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-bold text-white/50 hover:text-white hover:bg-white/05 transition-colors cursor-pointer"
          >
            <ShieldAlert size={14} />
            Reset Defaults
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-bold text-white/50 hover:text-white hover:bg-white/05 transition-colors"
          >
            <LogOut size={14} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* ── Mobile Sidebar Drawer ── */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`w-64 max-w-xs h-full bg-[#1C1208] text-white flex flex-col pt-8 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 mb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-heritage-gold)] flex items-center justify-center font-bold text-white text-sm">
                VH
              </div>
              <span className="font-display font-black text-sm tracking-tight text-white">Volta Admin</span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1.5">
            {adminNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[var(--color-heritage-gold)] text-white"
                      : "text-white/70 hover:text-white hover:bg-white/05"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-white" : "text-white/55"} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <div className="bg-white/05 rounded-xl p-3 border border-white/05">
              <p className="text-[9px] uppercase font-black text-white/40 tracking-wider">Active Role</p>
              <p className="text-xs font-bold text-[var(--color-heritage-gold)] mt-0.5 capitalize">
                {roleDisplay[currentUser.role]}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-bold text-white/50 hover:text-white hover:bg-white/05 transition-colors cursor-pointer"
            >
              <ShieldAlert size={14} />
              Reset Defaults
            </button>
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-bold text-white/50 hover:text-white hover:bg-white/05 transition-colors"
            >
              <LogOut size={14} />
              Back to Site
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Panel Content Wrapper ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-[#E8DDD0] h-16 flex items-center justify-between px-6 shadow-sm">
          {/* Left Area: Toggle Drawer & Breadcrumbs */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#1C1208]/70 hover:text-[#1C1208] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              <Menu size={20} />
            </button>

            {/* Global search bar placeholder */}
            <div className="relative hidden md:block w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#1C1208]/40">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Search resources, bookings..."
                className="w-full pl-9 pr-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8DDD0] text-xs focus:outline-none focus:border-[var(--color-heritage-gold)] transition-colors text-[#1C1208]"
              />
            </div>
          </div>

          {/* Right Area: Alerts & Profile Dropdown */}
          <div className="flex items-center gap-4">
            {/* Notification Bell Mockup */}
            <button className="p-2 rounded-full hover:bg-[#FAF7F2] text-[#1C1208]/70 relative transition-colors cursor-pointer">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-heritage-red)] rounded-full" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1 rounded-full hover:bg-[#FAF7F2] transition-colors text-left cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--color-heritage-gold)] text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-bold leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-[#7A6A57] font-semibold leading-tight capitalize">
                    {currentUser.role}
                  </p>
                </div>
                <ChevronDown size={14} className="text-[#7A6A57]" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E8DDD0] rounded-xl shadow-xl z-50 py-2">
                  <div className="px-4 py-2 border-b border-[#E8DDD0]">
                    <p className="text-[10px] font-black uppercase text-[#7A6A57] tracking-wider">
                      Switch Role (Testing)
                    </p>
                  </div>
                  <button
                    onClick={() => handleRoleChange("admin")}
                    className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
                      currentUser.role === "admin"
                        ? "text-[var(--color-heritage-gold)] bg-[var(--color-heritage-gold-light)]/40"
                        : "text-[#1C1208] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    👑 Administrator (Full access)
                  </button>
                  <button
                    onClick={() => handleRoleChange("editor")}
                    className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
                      currentUser.role === "editor"
                        ? "text-[var(--color-heritage-gold)] bg-[var(--color-heritage-gold-light)]/40"
                        : "text-[#1C1208] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    📝 Editor (Modify content)
                  </button>
                  <button
                    onClick={() => handleRoleChange("contributor")}
                    className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
                      currentUser.role === "contributor"
                        ? "text-[var(--color-heritage-gold)] bg-[var(--color-heritage-gold-light)]/40"
                        : "text-[#1C1208] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    👥 Contributor (View only)
                  </button>
                  <div className="border-t border-[#E8DDD0] mt-2 pt-1">
                    <button
                      onClick={handleReset}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-[var(--color-heritage-red)] hover:bg-[var(--color-heritage-red-light)]/30 transition-colors cursor-pointer"
                    >
                      Reset All Data
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Inner Content Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#FAF7F2]/40 relative">
          {children}

          {/* ── Mobile Floating Action Button (FAB) ── */}
          <Link
            href="/admin/products-events"
            className="lg:hidden fixed bottom-6 right-6 w-12 h-12 bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 z-30"
          >
            <Plus size={22} />
          </Link>
        </main>
      </div>
    </div>
  );
}
