"use client";

import React, { useState } from "react";
import { Plus, Mail, X, ShieldCheck, ShieldAlert, Eye, AlertTriangle, UserPlus } from "lucide-react";
import { useCms, UserAccount } from "@/context/CmsContext";

// ── Role config ────────────────────────────────────────────────
const roleMeta: Record<UserAccount["role"], {
  label: string; desc: string;
  bg: string; text: string; border: string; dot: string; initBg: string; initText: string;
  icon: React.ElementType;
}> = {
  admin: {
    label: "Administrator", desc: "Full access — manage layout, catalogue, roles, and settings",
    bg: "bg-[var(--color-heritage-gold-light)]", text: "text-[var(--color-heritage-gold-dark)]",
    border: "border-[var(--color-heritage-gold)]/30", dot: "bg-[var(--color-heritage-gold)]",
    initBg: "bg-[var(--color-heritage-gold)]", initText: "text-white",
    icon: ShieldCheck,
  },
  editor: {
    label: "Editor", desc: "Content editing — reorder sections, add events and services",
    bg: "bg-[var(--color-heritage-green-light)]", text: "text-[var(--color-heritage-green)]",
    border: "border-[var(--color-heritage-green)]/30", dot: "bg-[var(--color-heritage-green)]",
    initBg: "bg-[var(--color-heritage-green)]", initText: "text-white",
    icon: ShieldAlert,
  },
  contributor: {
    label: "Contributor", desc: "View-only — inspect dashboard and preview layouts without editing",
    bg: "bg-[#FAF7F2]", text: "text-[#7A6A57]",
    border: "border-[#E8DDD0]", dot: "bg-[#A8957E]",
    initBg: "bg-[#E8DDD0]", initText: "text-[#7A6A57]",
    icon: Eye,
  },
};

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

// ── Invite User Modal ──────────────────────────────────────────
function InviteModal({ onClose, onAdd }: {
  onClose: () => void;
  onAdd: (u: Pick<UserAccount, "name" | "email" | "role">) => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", role: "editor" as UserAccount["role"] });
  const rm = roleMeta[form.role];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
      <div className="bg-white border border-[#E8DDD0] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#E8DDD0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-heritage-gold-light)] flex items-center justify-center text-[var(--color-heritage-gold-dark)]">
              <UserPlus size={16} />
            </div>
            <h3 className="font-display font-black text-lg text-[#1C1208]">Invite Team Member</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#7A6A57] hover:bg-[#FAF7F2] transition-colors cursor-pointer"><X size={16} /></button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onAdd(form); }} className="p-6 space-y-5 text-xs">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57]">Full Name *</label>
            <input required type="text" placeholder="e.g. Kofi Acheampong" className="form-input text-xs"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57]">Email Address *</label>
            <input required type="email" placeholder="e.g. kofi@voltaheritage.art" className="form-input text-xs"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>

          {/* Role picker */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57]">Access Role *</label>
            <div className="space-y-2">
              {(["admin", "editor", "contributor"] as const).map((r) => {
                const meta = roleMeta[r];
                const RIcon = meta.icon;
                return (
                  <button key={r} type="button" onClick={() => setForm({ ...form, role: r })}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      form.role === r ? `${meta.bg} ${meta.border} shadow-sm` : "border-[#E8DDD0] hover:bg-[#FAF7F2]"
                    }`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${form.role === r ? meta.initBg : "bg-[#F2EBE0]"}`}>
                      <RIcon size={13} className={form.role === r ? meta.initText : "text-[#7A6A57]"} />
                    </div>
                    <div>
                      <p className={`font-bold text-[11px] ${form.role === r ? meta.text : "text-[#1C1208]"}`}>{meta.label}</p>
                      <p className="text-[10px] text-[#7A6A57] font-light mt-0.5">{meta.desc}</p>
                    </div>
                    {form.role === r && (
                      <span className={`ml-auto text-[8px] font-black uppercase tracking-wider ${meta.text} shrink-0 mt-0.5`}>Selected</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#E8DDD0]">
            <button type="button" onClick={onClose} className="btn-outline text-xs px-4 py-2 rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" className="btn-primary text-xs px-4 py-2 rounded-xl shadow-lg cursor-pointer flex items-center gap-1.5">
              <UserPlus size={13} /> Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────
export default function AdminUsers() {
  const { state, updateDraft, publishState, currentUser, setCurrentUserRole } = useCms();
  const [modalOpen, setModalOpen] = useState(false);

  const isReadOnly = currentUser.role === "contributor";
  const users = state.users;

  const handleRoleChange = (userId: string, role: UserAccount["role"]) => {
    if (isReadOnly) return;
    updateDraft((p) => ({ ...p, users: p.users.map((u) => u.id === userId ? { ...u, role } : u) }));
    publishState();
    if (userId === currentUser.id) setCurrentUserRole(role);
  };

  const handleDelete = (id: string) => {
    if (isReadOnly) return;
    if (id === currentUser.id) { alert("You cannot remove your own account."); return; }
    if (!confirm("Remove this user's administrative access?")) return;
    updateDraft((p) => ({ ...p, users: p.users.filter((u) => u.id !== id) }));
    publishState();
  };

  const handleAdd = (data: Pick<UserAccount, "name" | "email" | "role">) => {
    const fresh: UserAccount = { id: `usr-${Date.now()}`, status: "invited", ...data };
    updateDraft((p) => ({ ...p, users: [...p.users, fresh] }));
    publishState();
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-heritage-gold)] mb-1">Operations</p>
          <h1 className="font-display text-2xl font-black text-[#1C1208] tracking-tight">Users & Access Roles</h1>
          <p className="text-xs text-[#7A6A57] mt-1">Manage your admin team and assign editing permissions.</p>
        </div>
        <button disabled={isReadOnly} onClick={() => setModalOpen(true)}
          className="btn-primary flex items-center gap-1.5 text-xs py-2.5 px-4 rounded-xl disabled:opacity-50 cursor-pointer shrink-0">
          <Plus size={14} /> Invite User
        </button>
      </div>

      {isReadOnly && (
        <div className="flex items-center gap-2.5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-semibold">
          <AlertTriangle size={14} className="shrink-0" /> View-Only: your role cannot manage users.
        </div>
      )}

      {/* Role explanation cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(["admin", "editor", "contributor"] as const).map((r) => {
          const meta = roleMeta[r];
          const RIcon = meta.icon;
          const count = users.filter((u) => u.role === r).length;
          return (
            <div key={r} className={`p-4 rounded-2xl border ${meta.bg} ${meta.border} flex items-start gap-3`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${meta.initBg}`}>
                <RIcon size={15} className={meta.initText} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <p className={`font-bold text-xs ${meta.text}`}>{meta.label}</p>
                  <span className={`text-[10px] font-black ${meta.text}`}>{count} user{count !== 1 ? "s" : ""}</span>
                </div>
                <p className="text-[10px] text-[#7A6A57] font-light leading-relaxed">{meta.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Users table */}
      <div className="bg-white border border-[#E8DDD0] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] text-[#7A6A57] font-black uppercase tracking-wider text-[10px] border-b border-[#E8DDD0]">
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3 hidden sm:table-cell">Status</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DDD0]">
              {users.map((u) => {
                const rm = roleMeta[u.role];
                const isSelf = u.id === currentUser.id;
                return (
                  <tr key={u.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${rm.initBg} ${rm.initText}`}>
                          {getInitials(u.name)}
                        </div>
                        <div>
                          <p className="font-bold text-[#1C1208] leading-tight flex items-center gap-1.5">
                            {u.name}
                            {isSelf && <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)]">You</span>}
                          </p>
                          <p className="flex items-center gap-1 text-[10px] text-[#7A6A57] mt-0.5">
                            <Mail size={10} /> {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                        u.status === "active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] border-[var(--color-heritage-gold)]/30"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${u.status === "active" ? "bg-emerald-500" : "bg-[var(--color-heritage-gold)]"}`} />
                        {u.status === "active" ? "Active" : "Invited"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select disabled={isReadOnly} value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as UserAccount["role"])}
                        className={`form-input text-xs py-1.5 px-3 max-w-[160px] font-bold ${rm.text} cursor-pointer disabled:cursor-not-allowed`}>
                        <option value="admin">Administrator</option>
                        <option value="editor">Editor</option>
                        <option value="contributor">Contributor</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button disabled={isReadOnly || isSelf} onClick={() => handleDelete(u.id)}
                        className="text-[11px] font-bold text-red-600 hover:underline disabled:opacity-30 disabled:no-underline cursor-pointer disabled:cursor-not-allowed">
                        Revoke Access
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 bg-[#FAF7F2]/50 border-t border-[#E8DDD0] text-[10px] text-[#A8957E] font-medium">
          {users.length} team member{users.length !== 1 ? "s" : ""} · Role changes take effect immediately
        </div>
      </div>

      {modalOpen && <InviteModal onClose={() => setModalOpen(false)} onAdd={handleAdd} />}
    </div>
  );
}
