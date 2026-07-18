"use client";

import React, { useState } from "react";
import { Save, Globe, Phone, Mail, Palette, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { useCms } from "@/context/CmsContext";

// ── Section wrapper ────────────────────────────────────────────
function SettingsSection({ title, desc, icon: Icon, children }: {
  title: string; desc: string; icon: React.ElementType; children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-[#E8DDD0] rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-[#E8DDD0] flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[var(--color-heritage-gold-light)] flex items-center justify-center text-[var(--color-heritage-gold-dark)] shrink-0">
          <Icon size={16} />
        </div>
        <div>
          <h3 className="font-display font-black text-sm text-[#1C1208]">{title}</h3>
          <p className="text-[10px] text-[#7A6A57] mt-0.5 font-light">{desc}</p>
        </div>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

// ── Field ──────────────────────────────────────────────────────
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] block">{label}</label>
      {hint && <p className="text-[10px] text-[#A8957E] font-light">{hint}</p>}
      {children}
    </div>
  );
}

// ── Color swatch button ────────────────────────────────────────
const accentMeta = {
  gold: {
    label: "Heritage Gold",
    hex: "#C8870A",
    bg: "bg-[var(--color-heritage-gold)]",
    ring: "ring-[var(--color-heritage-gold)]",
    selectedBg: "bg-[var(--color-heritage-gold-light)] border-[var(--color-heritage-gold)]",
    selectedText: "text-[var(--color-heritage-gold-dark)]",
    desc: "Warm gold — primary brand tone",
  },
  red: {
    label: "Heritage Red",
    hex: "#B91C1C",
    bg: "bg-[var(--color-heritage-red)]",
    ring: "ring-[var(--color-heritage-red)]",
    selectedBg: "bg-[var(--color-heritage-red-light)] border-[var(--color-heritage-red)]",
    selectedText: "text-[var(--color-heritage-red)]",
    desc: "Bold red — high-contrast accent",
  },
  green: {
    label: "Heritage Green",
    hex: "#166534",
    bg: "bg-[var(--color-heritage-green)]",
    ring: "ring-[var(--color-heritage-green)]",
    selectedBg: "bg-[var(--color-heritage-green-light)] border-[var(--color-heritage-green)]",
    selectedText: "text-[var(--color-heritage-green)]",
    desc: "Earthy green — cultural prestige tone",
  },
};

// ── Main Page ──────────────────────────────────────────────────
export default function AdminSettings() {
  const { draftState, updateDraft, saveDraft, publishState, currentUser } = useCms();
  const settings = draftState.settings;

  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "published">("idle");
  const isReadOnly = currentUser.role === "contributor";

  const set = (key: string, value: string) => {
    if (isReadOnly) return;
    updateDraft((p) => ({ ...p, settings: { ...p.settings, [key]: value } }));
    setSaveStatus("idle");
  };

  const handleSave = () => {
    if (isReadOnly) return;
    saveDraft();
    setSaveStatus("saved");
  };

  const handlePublish = () => {
    if (isReadOnly) return;
    publishState();
    setSaveStatus("published");
  };

  return (
    <div className="space-y-6 max-w-3xl">

      {/* Header */}
      <div className="bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-heritage-gold)] mb-1">System</p>
        <h1 className="font-display text-2xl font-black text-[#1C1208] tracking-tight">Global Site Settings</h1>
        <p className="text-xs text-[#7A6A57] mt-1">Configure site metadata, branding, and core contact parameters.</p>
      </div>

      {isReadOnly && (
        <div className="flex items-center gap-2.5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-semibold">
          <AlertTriangle size={14} className="shrink-0" /> View-Only: your role cannot change settings.
        </div>
      )}

      {/* Site Identity */}
      <SettingsSection title="Site Identity" desc="Metadata used in browser tabs, search results, and social sharing" icon={Globe}>
        <Field label="Site Title" hint="Shown in the browser tab and as the SEO page title">
          <input disabled={isReadOnly} type="text" className="form-input text-xs"
            value={settings.siteTitle} onChange={(e) => set("siteTitle", e.target.value)} />
        </Field>
        <Field label="Meta Description" hint="Used by search engines — aim for 120–160 characters">
          <div className="relative">
            <textarea disabled={isReadOnly} rows={3} className="form-input text-xs resize-none"
              value={settings.siteDescription} onChange={(e) => set("siteDescription", e.target.value)} />
            <span className={`absolute bottom-2 right-3 text-[9px] font-semibold tabular-nums pointer-events-none ${
              settings.siteDescription.length > 160 ? "text-red-500" : "text-[#A8957E]"
            }`}>
              {settings.siteDescription.length}/160
            </span>
          </div>
        </Field>
      </SettingsSection>

      {/* Contact Information */}
      <SettingsSection title="Contact Information" desc="Displayed in the site footer and on the Connect page" icon={Phone}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Contact Email">
            <div className="relative">
              <Mail size={13} className="absolute inset-y-0 left-3 my-auto text-[#A8957E] pointer-events-none" />
              <input disabled={isReadOnly} type="email" className="form-input text-xs pl-9"
                value={settings.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
            </div>
          </Field>
          <Field label="Contact Phone">
            <div className="relative">
              <Phone size={13} className="absolute inset-y-0 left-3 my-auto text-[#A8957E] pointer-events-none" />
              <input disabled={isReadOnly} type="text" className="form-input text-xs pl-9"
                value={settings.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} />
            </div>
          </Field>
        </div>
      </SettingsSection>

      {/* Colour Theme */}
      <SettingsSection title="Brand Colour Theme" desc="Sets the primary accent colour for headings, buttons, and card highlights" icon={Palette}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["gold", "red", "green"] as const).map((c) => {
            const meta = accentMeta[c];
            const active = settings.primaryColorAccent === c;
            return (
              <button key={c} disabled={isReadOnly} type="button"
                onClick={() => set("primaryColorAccent", c)}
                className={`relative flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all cursor-pointer disabled:cursor-not-allowed ${
                  active ? `${meta.selectedBg} shadow-sm` : "border-[#E8DDD0] bg-white hover:bg-[#FAF7F2]"
                }`}>
                {/* Swatch */}
                <div className={`w-8 h-8 rounded-lg ${meta.bg} shadow-md shrink-0 mt-0.5`} />
                <div className="min-w-0">
                  <p className={`font-bold text-xs ${active ? meta.selectedText : "text-[#1C1208]"}`}>{meta.label}</p>
                  <p className="text-[10px] text-[#7A6A57] font-light mt-0.5">{meta.desc}</p>
                </div>
                {active && (
                  <div className={`absolute top-2 right-2 w-4 h-4 rounded-full ${meta.bg} flex items-center justify-center`}>
                    <CheckCircle2 size={10} className="text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <div className="flex items-start gap-2 p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] text-[10px] text-[#7A6A57]">
          <Info size={12} className="shrink-0 mt-0.5 text-[#A8957E]" />
          <span>Colour changes apply to buttons, section headings, and card accents across the public site after publishing.</span>
        </div>
      </SettingsSection>

      {/* Save / Publish */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 py-2">
        {/* Status */}
        <div className="flex items-center gap-2 text-xs text-[#7A6A57] font-semibold">
          <div className={`w-2 h-2 rounded-full ${
            saveStatus === "published" ? "bg-emerald-500" :
            saveStatus === "saved"     ? "bg-[var(--color-heritage-gold)]" :
                                         "bg-[#C8B99A] animate-pulse"
          }`} />
          {saveStatus === "published" ? "Settings published live"     :
           saveStatus === "saved"     ? "Draft saved — not yet live"  :
                                        "Unsaved changes"}
        </div>

        <div className="flex gap-2.5 shrink-0">
          <button disabled={isReadOnly} onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2.5 border border-[#E8DDD0] hover:border-[#1C1208] text-xs font-bold text-[#3D3020] rounded-xl transition-all cursor-pointer disabled:opacity-40">
            <Save size={13} /> Save Draft
          </button>
          <button disabled={isReadOnly} onClick={handlePublish}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] text-xs font-bold text-white rounded-xl shadow-lg shadow-[var(--color-heritage-gold)]/20 transition-all cursor-pointer disabled:opacity-40">
            {saveStatus === "published" ? <CheckCircle2 size={13} /> : <Globe size={13} />}
            Publish Settings
          </button>
        </div>
      </div>

    </div>
  );
}
