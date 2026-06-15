"use client";

import React, { useState } from "react";
import { Users as UsersIcon, Plus, ShieldCheck, Mail, ShieldAlert, X } from "lucide-react";
import { useCms, UserAccount } from "@/context/CmsContext";

export default function AdminUsers() {
  const { state, updateDraft, publishState, currentUser, setCurrentUserRole } = useCms();
  const [modalOpen, setModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "editor" as UserAccount["role"] });

  const users = state.users;
  const isReadOnly = currentUser.role === "contributor";

  // Change user role
  const handleRoleChange = (userId: string, role: UserAccount["role"]) => {
    if (isReadOnly) return;
    const updatedUsers = users.map((u) => (u.id === userId ? { ...u, role } : u));
    updateDraft((prev) => ({ ...prev, users: updatedUsers }));
    publishState(); // auto publish

    // Sync self role state in provider if editing self
    if (userId === currentUser.id) {
      setCurrentUserRole(role);
    }
  };

  // Add new user
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;

    const freshUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "invited",
    };

    updateDraft((prev) => ({ ...prev, users: [...prev.users, freshUser] }));
    publishState(); // auto publish

    setModalOpen(false);
    setNewUser({ name: "", email: "", role: "editor" });
  };

  // Delete user
  const handleDeleteUser = (id: string) => {
    if (isReadOnly) return;
    if (id === currentUser.id) {
      alert("You cannot delete your own account.");
      return;
    }
    if (confirm("Are you sure you want to remove this user's administrative access?")) {
      const updated = users.filter((u) => u.id !== id);
      updateDraft((prev) => ({ ...prev, users: updated }));
      publishState(); // auto publish
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <div>
          <h1 className="font-display text-2xl font-black text-[#1C1208]">Users & Access Roles</h1>
          <p className="text-xs text-[#7A6A57] mt-0.5">
            Manage your administrative team, assign editing permissions, and invite new content contributors.
          </p>
        </div>
        <button
          disabled={isReadOnly}
          onClick={() => setModalOpen(true)}
          className="btn-primary text-xs flex items-center gap-2 py-2.5 px-4 rounded-xl disabled:opacity-50 cursor-pointer"
        >
          <Plus size={14} /> Invite User
        </button>
      </div>

      {/* Role explanation alert */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-white border border-[#E8DDD0] rounded-xl flex gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-heritage-gold-light)] flex items-center justify-center text-[var(--color-heritage-gold-dark)] shrink-0 font-bold">
            AD
          </div>
          <div>
            <p className="font-bold text-[#1C1208]">Administrator (Admin)</p>
            <p className="text-[#7A6A57] mt-0.5 font-light leading-relaxed">
              Full system capabilities. Can manage homepage layouts, catalog settings, and approve role assignments.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white border border-[#E8DDD0] rounded-xl flex gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-heritage-green-light)] flex items-center justify-center text-[var(--color-heritage-green)] shrink-0 font-bold">
            ED
          </div>
          <div>
            <p className="font-bold text-[#1C1208]">Editor</p>
            <p className="text-[#7A6A57] mt-0.5 font-light leading-relaxed">
              Content editing rights. Can reorder homepage blocks, modify text inputs, and add products or events.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white border border-[#E8DDD0] rounded-xl flex gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E8DDD0] flex items-center justify-center text-[#7A6A57] shrink-0 font-bold">
            CO
          </div>
          <div>
            <p className="font-bold text-[#1C1208]">Contributor (Viewer)</p>
            <p className="text-[#7A6A57] mt-0.5 font-light leading-relaxed">
              Auditor status. Can inspect the entire dashboard backend and preview live layout states, but cannot commit changes.
            </p>
          </div>
        </div>
      </div>

      {/* Users List card */}
      <div className="bg-white border border-[#E8DDD0] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] text-[#7A6A57] font-black uppercase tracking-wider text-[10px] border-b border-[#E8DDD0]">
                <th className="p-4">User</th>
                <th className="p-4">Status</th>
                <th className="p-4">Access Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DDD0]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-[#1C1208]">{u.name}</p>
                    <p className="text-[10px] text-[#7A6A57] mt-0.5 flex items-center gap-1">
                      <Mail size={10} /> {u.email}
                    </p>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        u.status === "active"
                          ? "bg-[var(--color-heritage-green-light)] text-[var(--color-heritage-green)]"
                          : "bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)]"
                      }`}
                    >
                      {u.status === "active" ? "Active" : "Invited"}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      disabled={isReadOnly}
                      className="form-input text-xs py-1 px-2.5 max-w-[150px] font-bold"
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                    >
                      <option value="admin">Administrator</option>
                      <option value="editor">Editor</option>
                      <option value="contributor">Contributor</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      disabled={isReadOnly || u.id === currentUser.id}
                      onClick={() => handleDeleteUser(u.id)}
                      className="text-xs font-bold text-[var(--color-heritage-red)] hover:underline disabled:opacity-30 cursor-pointer"
                    >
                      Revoke Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Invite User Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#E8DDD0] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-[#E8DDD0]">
              <h3 className="font-display font-black text-lg text-[#1C1208]">Invite Team Member</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#7A6A57] hover:text-[#1C1208] transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddUser} className="p-5 space-y-4 text-xs">
              <div>
                <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. John Doe"
                  className="form-input text-xs"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Email Address *</label>
                <input
                  required
                  type="email"
                  placeholder="e.g. john@voltaheritage.art"
                  className="form-input text-xs"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Access Role Assignment *</label>
                <select
                  className="form-input text-xs font-bold"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                >
                  <option value="admin">Administrator</option>
                  <option value="editor">Editor</option>
                  <option value="contributor">Contributor</option>
                </select>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-[#E8DDD0] flex justify-end gap-2.5">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-outline text-xs px-4 py-2 rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs px-4 py-2 rounded-xl shadow-lg">
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
