"use client";

import React, { useState } from "react";
import {
  ArrowUp, ArrowDown, Eye, EyeOff, Plus, Save, Globe,
  X, FilePlus, PlayCircle, Award, GripVertical, CheckCircle2,
  Settings as SettingsIcon, AlertTriangle, Layers,
} from "lucide-react";
import { useCms } from "@/context/CmsContext";

// ── Section display metadata ───────────────────────────────────
const sectionMeta: Record<string, { label: string; desc: string; color: string }> = {
  hero:      { label: "Hero Banner",       desc: "Main headline, subtitle & CTA buttons", color: "bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)]" },
  events:    { label: "Upcoming Events",   desc: "Festival & performance schedule grid",  color: "bg-[var(--color-heritage-green-light)] text-[var(--color-heritage-green)]" },
  heritage:  { label: "Living Archive",    desc: "Cultural heritage categories explorer", color: "bg-[var(--color-heritage-red-light)] text-[var(--color-heritage-red)]" },
  about:     { label: "About the Ensemble",desc: "Team story & founding history",         color: "bg-[#FAF7F2] text-[#7A6A57]" },
  services:  { label: "Services & Offers", desc: "Performance packages & workshops",      color: "bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)]" },
  news:      { label: "News & Stories",    desc: "Cultural articles & announcements",     color: "bg-[var(--color-heritage-green-light)] text-[var(--color-heritage-green)]" },
  connect:   { label: "Connect / Contact", desc: "Booking enquiry form & contact info",   color: "bg-[var(--color-heritage-red-light)] text-[var(--color-heritage-red)]" },
};

// ── Character limit helper ─────────────────────────────────────
function CharCount({ value, max }: { value: string; max: number }) {
  const len  = value.length;
  const pct  = len / max;
  const color = pct >= 1 ? "text-red-500" : pct >= 0.85 ? "text-amber-500" : "text-[#A8957E]";
  return (
    <span className={`text-[10px] font-semibold tabular-nums ${color}`}>
      {len}/{max}
    </span>
  );
}

// ── Labelled field wrapper ─────────────────────────────────────
function Field({
  label, hint, children, charCountEl,
}: {
  label: string; hint?: string; children: React.ReactNode; charCountEl?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57]">{label}</label>
        {charCountEl}
      </div>
      {hint && <p className="text-[10px] text-[#A8957E] font-light -mt-0.5">{hint}</p>}
      {children}
    </div>
  );
}

// ── Add Section Modal ──────────────────────────────────────────
const layoutOptions = [
  { value: "spotlight", label: "Media Spotlight Carousel", icon: PlayCircle, color: "text-[var(--color-heritage-gold)]",  desc: "Horizontal card slider with category indicators" },
  { value: "categories",label: "Living Archive Grid",      icon: SettingsIcon,color: "text-[var(--color-heritage-green)]",desc: "Four-column grid of cultural topics and sub-links" },
  { value: "trust",     label: "Partners / Trust Badges",  icon: Award,       color: "text-[var(--color-heritage-red)]",  desc: "Inline strip listing organisations or sponsors" },
  { value: "cta",       label: "Call-To-Action Banner",    icon: Globe,       color: "text-[var(--color-heritage-gold)]", desc: "Full-width banner with headline and book button" },
];

function AddSectionModal({ onClose, onAdd }: {
  onClose: () => void;
  onAdd: (name: string, type: string, placement: string) => void;
}) {
  const [name, setName]           = useState("");
  const [type, setType]           = useState("spotlight");
  const [placement, setPlacement] = useState("bottom");
  const selected = layoutOptions.find((o) => o.value === type)!;
  const Icon = selected.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
      <div className="bg-white border border-[#E8DDD0] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="flex justify-between items-center p-5 border-b border-[#E8DDD0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-heritage-gold-light)] flex items-center justify-center text-[var(--color-heritage-gold-dark)]">
              <FilePlus size={16} />
            </div>
            <h3 className="font-display font-black text-lg text-[#1C1208]">Add New Section</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#7A6A57] hover:text-[#1C1208] hover:bg-[#FAF7F2] transition-colors cursor-pointer"><X size={16} /></button>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); onAdd(name, type, placement); }}
          className="p-5 space-y-4 text-xs"
        >
          <Field label="Section Name" hint="Used as the section ID and display label">
            <input required type="text" placeholder="e.g. Partners Spotlight"
              className="form-input text-xs"
              value={name} onChange={(e) => setName(e.target.value)} />
          </Field>

          {/* Layout picker */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57]">Layout Template</label>
            <div className="grid grid-cols-2 gap-2">
              {layoutOptions.map((opt) => {
                const LIcon = opt.icon;
                return (
                  <button key={opt.value} type="button"
                    onClick={() => setType(opt.value)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      type === opt.value
                        ? "border-[var(--color-heritage-gold)] bg-[var(--color-heritage-gold-light)]/30 shadow-sm"
                        : "border-[#E8DDD0] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <LIcon size={14} className={`${opt.color} mb-1.5`} />
                    <p className="font-bold text-[10px] text-[#1C1208] leading-snug">{opt.label}</p>
                    <p className="text-[9px] text-[#7A6A57] mt-0.5 font-light leading-snug">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <Field label="Position">
            <select className="form-input text-xs" value={placement} onChange={(e) => setPlacement(e.target.value)}>
              <option value="top">Top — directly below Hero</option>
              <option value="mid">Middle of page</option>
              <option value="bottom">Bottom of page</option>
            </select>
          </Field>

          {/* Preview chip */}
          <div className="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0]">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DDD0] flex items-center justify-center shrink-0">
              <Icon size={15} className={selected.color} />
            </div>
            <div>
              <p className="font-bold text-[10px] text-[#1C1208]">{selected.label}</p>
              <p className="text-[9px] text-[#7A6A57] font-light">{selected.desc}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E8DDD0] flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn-outline text-xs px-4 py-2 rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" className="btn-primary text-xs px-4 py-2 rounded-xl shadow-lg cursor-pointer">Add Section</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Preview Simulator ──────────────────────────────────────────
function PreviewModal({ draftState, onClose }: {
  draftState: ReturnType<typeof useCms>["draftState"]; onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[#1C1208]/92 backdrop-blur-md flex flex-col p-5 gap-4">
      <div className="flex justify-between items-center text-white shrink-0">
        <div>
          <h3 className="font-display font-black text-xl">Homepage Preview</h3>
          <p className="text-xs text-white/50 mt-0.5">Simulated layout using current draft state</p>
        </div>
        <button onClick={onClose}
          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#FAF7F2] rounded-2xl border border-white/10 p-5">
        <div className="mx-auto max-w-xl bg-white rounded-xl border border-[#E8DDD0] shadow-2xl overflow-hidden">
          {/* mock nav */}
          <div className="flex justify-between items-center px-5 py-3 border-b border-[#E8DDD0]">
            <span className="font-display font-black text-xs text-[#1C1208]">Volta Heritage</span>
            <div className="flex gap-3 text-[9px] font-bold text-[#7A6A57]">
              {["Home","Roots","Archive","Events","Gallery"].map((l) => <span key={l}>{l}</span>)}
            </div>
          </div>

          <div className="p-4 space-y-3">
            {draftState.sectionsOrder.map((section) => {
              const visible = draftState.sectionVisibility[section] !== false;
              if (!visible) return null;

              if (section === "hero") {
                return (
                  <div key={section} className="bg-[#1C1208] text-white p-5 rounded-xl space-y-3 text-center">
                    <p className="text-[8px] font-black text-[var(--color-heritage-gold)] uppercase tracking-widest">{draftState.heroContent.location}</p>
                    <h2 className="font-display text-lg font-black">{draftState.heroContent.title}</h2>
                    <p className="text-[9px] text-white/60 max-w-xs mx-auto leading-relaxed">{draftState.heroContent.subtitle}</p>
                    <div className="flex justify-center gap-2">
                      <span className="btn-primary text-[8px] px-3 py-1.5 rounded-lg">{draftState.heroContent.ctaPrimaryText}</span>
                      <span className="border border-white/30 text-white text-[8px] px-3 py-1.5 rounded-lg">{draftState.heroContent.ctaSecondaryText}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
                      {draftState.heroContent.stats.map((s, i) => (
                        <div key={i}>
                          <p className="font-black text-sm text-[var(--color-heritage-gold)]">{s.value}</p>
                          <p className="text-[7px] text-white/50 uppercase">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              const meta = sectionMeta[section];
              return (
                <div key={section} className="border border-dashed border-[#E8DDD0] bg-[#FAF7F2]/60 p-4 rounded-xl flex items-center gap-3">
                  <Layers size={14} className="text-[#C8B99A] shrink-0" />
                  <div>
                    <p className="text-[9px] font-black text-[#7A6A57] uppercase tracking-wider">{meta?.label ?? section}</p>
                    <p className="text-[8px] text-[#A8957E] font-light">{meta?.desc ?? "Custom section"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────
export default function AdminContentManager() {
  const { draftState, updateDraft, saveDraft, publishState, currentUser } = useCms();
  const [modalOpen,   setModalOpen]   = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saveStatus,  setSaveStatus]  = useState<"idle" | "saved" | "published">("idle");

  const isReadOnly = currentUser.role === "contributor";

  // ── Section actions ──────────────────────────────────────────
  const moveSection = (index: number, dir: "up" | "down") => {
    if (isReadOnly) return;
    const order = [...draftState.sectionsOrder];
    const target = dir === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= order.length) return;
    [order[index], order[target]] = [order[target], order[index]];
    updateDraft((p) => ({ ...p, sectionsOrder: order }));
    setSaveStatus("idle");
  };

  const toggleVisibility = (section: string) => {
    if (isReadOnly) return;
    updateDraft((p) => ({
      ...p,
      sectionVisibility: { ...p.sectionVisibility, [section]: !p.sectionVisibility[section] },
    }));
    setSaveStatus("idle");
  };

  const removeSection = (section: string) => {
    if (isReadOnly) return;
    if (!confirm(`Remove the "${section}" section from the homepage?`)) return;
    updateDraft((p) => ({
      ...p,
      sectionsOrder: p.sectionsOrder.filter((s) => s !== section),
    }));
    setSaveStatus("idle");
  };

  // ── Hero field helpers ───────────────────────────────────────
  const setHero = (key: string, value: string) => {
    if (isReadOnly) return;
    updateDraft((p) => ({ ...p, heroContent: { ...p.heroContent, [key]: value } }));
    setSaveStatus("idle");
  };

  const setStat = (idx: number, key: "value" | "label", val: string) => {
    if (isReadOnly) return;
    const stats = [...draftState.heroContent.stats];
    stats[idx] = { ...stats[idx], [key]: val };
    updateDraft((p) => ({ ...p, heroContent: { ...p.heroContent, stats } }));
    setSaveStatus("idle");
  };

  // ── Add Section ──────────────────────────────────────────────
  const handleAddSection = (name: string, type: string, placement: string) => {
    const id = name.toLowerCase().trim().replace(/\s+/g, "-") || `${type}-${Date.now()}`;
    const order = [...draftState.sectionsOrder];
    if (placement === "top") order.unshift(id);
    else if (placement === "mid") order.splice(Math.floor(order.length / 2), 0, id);
    else order.push(id);
    updateDraft((p) => ({ ...p, sectionsOrder: order, sectionVisibility: { ...p.sectionVisibility, [id]: true } }));
    setSaveStatus("idle");
    setModalOpen(false);
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

  const visibleCount = draftState.sectionsOrder.filter((s) => draftState.sectionVisibility[s] !== false).length;

  return (
    <div className="space-y-6 pb-28">

      {/* ── Page header ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-heritage-gold)] mb-1">CMS</p>
          <h1 className="font-display text-2xl font-black text-[#1C1208] tracking-tight">Content Manager</h1>
          <p className="text-xs text-[#7A6A57] mt-1">
            Reorder homepage sections, control visibility, and edit hero copy — then publish live.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 border border-[#E8DDD0] hover:border-[#1C1208] text-xs font-bold text-[#3D3020] rounded-xl transition-all cursor-pointer">
            <Globe size={13} /> Preview
          </button>
          <button disabled={isReadOnly} onClick={() => setModalOpen(true)}
            className="btn-primary flex items-center gap-1.5 text-xs py-2.5 px-4 rounded-xl disabled:opacity-50 cursor-pointer">
            <Plus size={14} /> Add Section
          </button>
        </div>
      </div>

      {/* ── Read-only notice ──────────────────────────────── */}
      {isReadOnly && (
        <div className="flex items-center gap-2.5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-semibold">
          <AlertTriangle size={14} className="shrink-0" />
          <span><strong>View-Only:</strong> Your role ({currentUser.role}) cannot commit changes.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Left: Section Order & Visibility ────────────── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#E8DDD0] rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8DDD0] flex justify-between items-center">
              <div>
                <h3 className="font-display font-black text-sm text-[#1C1208]">Homepage Sections</h3>
                <p className="text-[10px] text-[#7A6A57] mt-0.5">{visibleCount} of {draftState.sectionsOrder.length} visible</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-heritage-gold-light)] border border-[var(--color-heritage-gold)]/20">
                <Layers size={11} className="text-[var(--color-heritage-gold-dark)]" />
                <span className="text-[9px] font-black text-[var(--color-heritage-gold-dark)]">{draftState.sectionsOrder.length} sections</span>
              </div>
            </div>

            <div className="p-3 space-y-2">
              {draftState.sectionsOrder.map((section, idx) => {
                const isVisible = draftState.sectionVisibility[section] !== false;
                const isFirst   = idx === 0;
                const isLast    = idx === draftState.sectionsOrder.length - 1;
                const meta      = sectionMeta[section];
                const isCore    = Object.keys(sectionMeta).includes(section);

                return (
                  <div key={section}
                    className={`group flex items-center gap-2.5 p-3 rounded-xl border transition-all ${
                      isVisible ? "bg-[#FAF7F2] border-[#E8DDD0]" : "bg-white border-[#E8DDD0]/50 opacity-55"
                    }`}
                  >
                    {/* Drag handle (decorative) */}
                    <GripVertical size={13} className="text-[#C8B99A] shrink-0 cursor-grab" />

                    {/* Index + label */}
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0"
                      style={{ background: "var(--color-heritage-gold-light)", color: "var(--color-heritage-gold-dark)" }}>
                      {idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-[#1C1208] capitalize leading-none">
                        {meta?.label ?? section.replace(/-/g, " ")}
                      </p>
                      {meta?.desc && (
                        <p className="text-[9px] text-[#A8957E] font-light mt-0.5 truncate">{meta.desc}</p>
                      )}
                    </div>

                    {/* Action cluster */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button disabled={isReadOnly} onClick={() => toggleVisibility(section)}
                        title={isVisible ? "Hide" : "Show"}
                        className="p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#E8DDD0] text-[#A8957E] hover:text-[#1C1208] transition-all cursor-pointer disabled:opacity-40">
                        {isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                      </button>
                      <button disabled={isReadOnly || isFirst} onClick={() => moveSection(idx, "up")}
                        title="Move up"
                        className="p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#E8DDD0] text-[#A8957E] transition-all disabled:opacity-25 cursor-pointer">
                        <ArrowUp size={12} />
                      </button>
                      <button disabled={isReadOnly || isLast} onClick={() => moveSection(idx, "down")}
                        title="Move down"
                        className="p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#E8DDD0] text-[#A8957E] transition-all disabled:opacity-25 cursor-pointer">
                        <ArrowDown size={12} />
                      </button>
                      {!isCore && (
                        <button disabled={isReadOnly} onClick={() => removeSection(section)}
                          title="Remove custom section"
                          className="p-1.5 rounded-lg hover:bg-red-50 text-[#C8B99A] hover:text-red-500 transition-all cursor-pointer disabled:opacity-40">
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right: Hero Copy Editor ──────────────────────── */}
        <div className="lg:col-span-3 bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display font-black text-sm text-[#1C1208]">Hero Copy Editor</h3>
              <p className="text-[10px] text-[#7A6A57] mt-0.5">Edit the text fields and statistics shown on the main hero banner.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)] border border-[var(--color-heritage-gold)]/20">
              Live Section
            </span>
          </div>

          <div className="space-y-4">
            <Field label="Location Tag" hint="Shown above the headline in gold — keep short"
              charCountEl={<CharCount value={draftState.heroContent.location} max={50} />}>
              <input disabled={isReadOnly} type="text" className="form-input text-xs"
                value={draftState.heroContent.location} maxLength={50}
                onChange={(e) => setHero("location", e.target.value)} />
            </Field>

            <Field label="Main Headline" hint="The primary display title — bold impact statement"
              charCountEl={<CharCount value={draftState.heroContent.title} max={60} />}>
              <input disabled={isReadOnly} type="text" className="form-input text-xs"
                value={draftState.heroContent.title} maxLength={60}
                onChange={(e) => setHero("title", e.target.value)} />
            </Field>

            <Field label="Subtitle / Description" hint="Shown below headline — 1–2 sentences recommended"
              charCountEl={<CharCount value={draftState.heroContent.subtitle} max={200} />}>
              <textarea disabled={isReadOnly} rows={3}
                className="form-input text-xs resize-none leading-relaxed"
                value={draftState.heroContent.subtitle} maxLength={200}
                onChange={(e) => setHero("subtitle", e.target.value)} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Primary CTA Label"
                charCountEl={<CharCount value={draftState.heroContent.ctaPrimaryText} max={30} />}>
                <input disabled={isReadOnly} type="text" className="form-input text-xs"
                  value={draftState.heroContent.ctaPrimaryText} maxLength={30}
                  onChange={(e) => setHero("ctaPrimaryText", e.target.value)} />
              </Field>
              <Field label="Secondary CTA Label"
                charCountEl={<CharCount value={draftState.heroContent.ctaSecondaryText} max={30} />}>
                <input disabled={isReadOnly} type="text" className="form-input text-xs"
                  value={draftState.heroContent.ctaSecondaryText} maxLength={30}
                  onChange={(e) => setHero("ctaSecondaryText", e.target.value)} />
              </Field>
            </div>

            {/* Stats grid */}
            <div className="border-t border-[#E8DDD0] pt-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-3">
                Statistics Strip — {draftState.heroContent.stats.length} items
              </p>
              <div className="space-y-2.5">
                {draftState.heroContent.stats.map((stat, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2.5 items-center">
                    <div className="col-span-1">
                      <input disabled={isReadOnly} type="text" placeholder="e.g. 20+"
                        className="form-input text-xs font-bold text-center"
                        value={stat.value}
                        onChange={(e) => setStat(idx, "value", e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <input disabled={isReadOnly} type="text" placeholder="e.g. Years Preserving Culture"
                        className="form-input text-xs"
                        value={stat.label}
                        onChange={(e) => setStat(idx, "label", e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Action Bar ────────────────────────────── */}
      <div className="fixed bottom-5 left-5 lg:left-[calc(15rem+1.25rem)] right-5 z-40">
        <div className="bg-[#1C1208]/96 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-2xl shadow-black/30 gap-4">
          {/* Status */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-2 h-2 rounded-full shrink-0 ${
              saveStatus === "published" ? "bg-emerald-400" :
              saveStatus === "saved"     ? "bg-[var(--color-heritage-gold)]" :
                                           "bg-white/30 animate-pulse"
            }`} />
            <div className="min-w-0">
              <p className="text-[9px] text-white/40 font-bold uppercase tracking-wider">CMS Status</p>
              <p className="text-[11px] font-bold text-white leading-tight truncate">
                {saveStatus === "published" ? "Changes published live" :
                 saveStatus === "saved"     ? "Draft saved — not yet live" :
                                              "Unsaved changes in draft"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setPreviewOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 border border-white/15 hover:border-white/40 text-[11px] font-bold text-white rounded-xl transition-all cursor-pointer">
              <Globe size={12} /> Preview
            </button>
            <button disabled={isReadOnly} onClick={handleSave}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/15 text-[11px] font-bold text-white rounded-xl transition-all cursor-pointer disabled:opacity-40">
              <Save size={12} /> Save Draft
            </button>
            <button disabled={isReadOnly} onClick={handlePublish}
              className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] text-[11px] font-bold text-white rounded-xl shadow-lg shadow-[var(--color-heritage-gold)]/25 transition-all cursor-pointer disabled:opacity-40">
              {saveStatus === "published" ? <CheckCircle2 size={12} /> : null}
              Publish Live
            </button>
          </div>
        </div>
      </div>

      {/* ── Modals ───────────────────────────────────────── */}
      {modalOpen   && <AddSectionModal onClose={() => setModalOpen(false)} onAdd={handleAddSection} />}
      {previewOpen && <PreviewModal draftState={draftState} onClose={() => setPreviewOpen(false)} />}
    </div>
  );
}
