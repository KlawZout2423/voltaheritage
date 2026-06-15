"use client";

import React, { useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Plus,
  Save,
  Globe,
  Settings as SettingsIcon,
  X,
  FilePlus,
  PlayCircle,
  Award,
} from "lucide-react";
import { useCms } from "@/context/CmsContext";

export default function AdminContentManager() {
  const { draftState, updateDraft, saveDraft, publishState, currentUser } = useCms();
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Modal form states
  const [newSectionType, setNewSectionType] = useState("spotlight");
  const [newSectionName, setNewSectionName] = useState("");
  const [newSectionPlacement, setNewSectionPlacement] = useState("bottom");

  // Local message state
  const [saveStatus, setSaveStatus] = useState<"unsaved" | "saved" | "published">("unsaved");

  const isReadOnly = currentUser.role === "contributor";

  // Reorder sections
  const moveSection = (index: number, direction: "up" | "down") => {
    if (isReadOnly) return;
    const newOrder = [...draftState.sectionsOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    // Swap
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    updateDraft((prev) => ({ ...prev, sectionsOrder: newOrder }));
    setSaveStatus("unsaved");
  };

  // Toggle section visibility
  const toggleVisibility = (section: string) => {
    if (isReadOnly) return;
    updateDraft((prev) => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [section]: !prev.sectionVisibility[section],
      },
    }));
    setSaveStatus("unsaved");
  };

  // Update Hero fields
  const handleHeroChange = (key: string, value: any) => {
    if (isReadOnly) return;
    updateDraft((prev) => ({
      ...prev,
      heroContent: {
        ...prev.heroContent,
        [key]: value,
      },
    }));
    setSaveStatus("unsaved");
  };

  // Update Hero Stat
  const handleStatChange = (index: number, key: "value" | "label", value: string) => {
    if (isReadOnly) return;
    const updatedStats = [...draftState.heroContent.stats];
    updatedStats[index] = { ...updatedStats[index], [key]: value };
    handleHeroChange("stats", updatedStats);
  };

  // Handle Add Section
  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;

    const sectionId = newSectionName.toLowerCase().trim().replace(/\s+/g, "-") || `custom-${newSectionType}-${Date.now()}`;

    // Add to order
    let newOrder = [...draftState.sectionsOrder];
    if (newSectionPlacement === "top") {
      newOrder.unshift(sectionId);
    } else if (newSectionPlacement === "mid") {
      const midPoint = Math.floor(newOrder.length / 2);
      newOrder.splice(midPoint, 0, sectionId);
    } else {
      newOrder.push(sectionId);
    }

    updateDraft((prev) => ({
      ...prev,
      sectionsOrder: newOrder,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [sectionId]: true,
      },
    }));

    setSaveStatus("unsaved");
    setModalOpen(false);
    setNewSectionName("");
  };

  // Save changes
  const handleSave = () => {
    if (isReadOnly) return;
    saveDraft();
    setSaveStatus("saved");
    alert("Draft changes saved successfully to local storage!");
  };

  // Publish changes
  const handlePublish = () => {
    if (isReadOnly) return;
    publishState();
    setSaveStatus("published");
    alert("CMS changes published live! Check the homepage to see edits in real-time.");
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Page Header */}
      <div className="flex justify-between items-center bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <div>
          <h1 className="font-display text-2xl font-black text-[#1C1208]">Content Manager</h1>
          <p className="text-xs text-[#7A6A57] mt-0.5">
            Customize homepage section order, visibility, hero texts, and layout templates.
          </p>
        </div>
        <button
          disabled={isReadOnly}
          onClick={() => setModalOpen(true)}
          className="btn-primary text-xs flex items-center gap-2 py-2.5 px-4 rounded-xl disabled:opacity-50 cursor-pointer"
        >
          <Plus size={14} /> Add Section
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Side: Section Reorder & Visibility List */}
        <div className="lg:col-span-2 bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-display font-black text-base text-[#1C1208] mb-1">Homepage Sections Order</h3>
            <p className="text-[11px] text-[#7A6A57]">Use arrows to reorder sections. Hide sections by clicking the eye icon.</p>
          </div>

          <div className="space-y-3">
            {draftState.sectionsOrder.map((section, idx) => {
              const isVisible = draftState.sectionVisibility[section] !== false;
              const isFirst = idx === 0;
              const isLast = idx === draftState.sectionsOrder.length - 1;

              return (
                <div
                  key={section}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    isVisible
                      ? "bg-[#FAF7F2] border-[#E8DDD0]"
                      : "bg-[#FAF7F2]/40 border-[#E8DDD0]/50 opacity-60"
                  }`}
                >
                  {/* Label */}
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[var(--color-heritage-gold)]/10 text-[var(--color-heritage-gold)] flex items-center justify-center text-[10px] font-black font-mono">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold capitalize text-[#1C1208]">
                      {section.replace("-", " ")}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    {/* Toggle eye */}
                    <button
                      disabled={isReadOnly}
                      onClick={() => toggleVisibility(section)}
                      className="p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#E8DDD0] text-[#7A6A57] transition-all cursor-pointer disabled:opacity-50"
                      title={isVisible ? "Hide section" : "Show section"}
                    >
                      {isVisible ? <Eye size={13} /> : <EyeOff size={13} />}
                    </button>

                    {/* Move Up */}
                    <button
                      disabled={isReadOnly || isFirst}
                      onClick={() => moveSection(idx, "up")}
                      className="p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#E8DDD0] text-[#7A6A57] transition-all disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp size={13} />
                    </button>

                    {/* Move Down */}
                    <button
                      disabled={isReadOnly || isLast}
                      onClick={() => moveSection(idx, "down")}
                      className="p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#E8DDD0] text-[#7A6A57] transition-all disabled:opacity-30 cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Hero Content Editor */}
        <div className="lg:col-span-3 bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-display font-black text-base text-[#1C1208] mb-1">Hero Copy Editor</h3>
            <p className="text-[11px] text-[#7A6A57]">Modify the text fields and stats shown in the main Hero section.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Location Tag</label>
              <input
                disabled={isReadOnly}
                type="text"
                className="form-input text-xs"
                value={draftState.heroContent.location}
                onChange={(e) => handleHeroChange("location", e.target.value)}
              />
            </div>

            <div>
              <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Main Title Headline</label>
              <input
                disabled={isReadOnly}
                type="text"
                className="form-input text-xs"
                value={draftState.heroContent.title}
                onChange={(e) => handleHeroChange("title", e.target.value)}
              />
            </div>

            <div>
              <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Subtitle / Description</label>
              <textarea
                disabled={isReadOnly}
                rows={3}
                className="form-input text-xs resize-none"
                value={draftState.heroContent.subtitle}
                onChange={(e) => handleHeroChange("subtitle", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Primary Button Text</label>
                <input
                  disabled={isReadOnly}
                  type="text"
                  className="form-input text-xs"
                  value={draftState.heroContent.ctaPrimaryText}
                  onChange={(e) => handleHeroChange("ctaPrimaryText", e.target.value)}
                />
              </div>
              <div>
                <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Secondary Button Text</label>
                <input
                  disabled={isReadOnly}
                  type="text"
                  className="form-input text-xs"
                  value={draftState.heroContent.ctaSecondaryText}
                  onChange={(e) => handleHeroChange("ctaSecondaryText", e.target.value)}
                />
              </div>
            </div>

            {/* Stats Row Editor */}
            <div className="border-t border-[#E8DDD0] pt-4 mt-2">
              <label className="form-label font-black text-xs text-[#1C1208] mb-3 block uppercase tracking-wider">
                Statistics Row
              </label>
              <div className="space-y-3">
                {draftState.heroContent.stats.map((stat, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <input
                        disabled={isReadOnly}
                        type="text"
                        placeholder="Value (e.g. 20+)"
                        className="form-input text-xs font-bold text-center"
                        value={stat.value}
                        onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        disabled={isReadOnly}
                        type="text"
                        placeholder="Label (e.g. Years Preserved)"
                        className="form-input text-xs"
                        value={stat.label}
                        onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Quick-Action Bar ── */}
      <div className="fixed bottom-6 left-6 lg:left-80 right-6 z-40 bg-[#1C1208]/95 backdrop-blur-md border border-[#E8DDD0]/15 rounded-2xl px-6 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-heritage-gold)] animate-pulse" />
          <div>
            <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">CMS Status</p>
            <p className="text-xs font-bold text-white leading-tight capitalize">
              {saveStatus === "unsaved"
                ? "Draft changes unsaved"
                : saveStatus === "saved"
                ? "Draft changes saved"
                : "Changes published live"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <button
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 border border-white/20 hover:border-white text-xs font-bold text-white rounded-xl transition-all cursor-pointer"
          >
            <Globe size={13} /> Preview Live
          </button>
          <button
            disabled={isReadOnly}
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold text-white rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            <Save size={13} /> Save Draft
          </button>
          <button
            disabled={isReadOnly}
            onClick={handlePublish}
            className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] text-xs font-bold text-white rounded-xl shadow-lg shadow-[var(--color-heritage-gold)]/20 transition-all cursor-pointer disabled:opacity-50"
          >
            Publish Live
          </button>
        </div>
      </div>

      {/* ── Add Section Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#E8DDD0] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-[#E8DDD0]">
              <div className="flex items-center gap-2">
                <FilePlus size={18} className="text-[var(--color-heritage-gold)]" />
                <h3 className="font-display font-black text-lg text-[#1C1208]">Add New Section</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-[#7A6A57] hover:text-[#1C1208] transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddSection} className="p-5 space-y-4 text-xs">
              <div>
                <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Section Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Spotlight Section"
                  className="form-input text-xs"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Layout Template *</label>
                <select
                  className="form-input text-xs"
                  value={newSectionType}
                  onChange={(e) => setNewSectionType(e.target.value)}
                >
                  <option value="spotlight">Spotlight (Interactive Carousel)</option>
                  <option value="categories">Categories Grid (Living Archive)</option>
                  <option value="trust-badges">Trust Badges (Partners/Logos)</option>
                  <option value="cta-banner">Call-to-Action Connect Banner</option>
                </select>
              </div>

              <div>
                <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Position Placement *</label>
                <select
                  className="form-input text-xs"
                  value={newSectionPlacement}
                  onChange={(e) => setNewSectionPlacement(e.target.value)}
                >
                  <option value="top">Top (Directly below Hero)</option>
                  <option value="mid">Middle of Page</option>
                  <option value="bottom">Bottom of Page</option>
                </select>
              </div>

              {/* Layout Preview Frame */}
              <div className="border border-[#E8DDD0] rounded-xl p-3 bg-[#FAF7F2] space-y-2">
                <p className="text-[10px] font-black uppercase text-[#7A6A57] tracking-wider">Layout Preview</p>
                <div className="bg-white border border-[#E8DDD0] rounded-lg p-2.5 text-center min-h-[70px] flex flex-col justify-center items-center">
                  {newSectionType === "spotlight" && (
                    <>
                      <PlayCircle size={20} className="text-[var(--color-heritage-gold)] mb-1" />
                      <p className="font-bold text-[10px] text-[#1C1208]">Carousel Media Spotlight</p>
                      <p className="text-[8px] text-[#7A6A57]">Horizontal cards slider with category indicators</p>
                    </>
                  )}
                  {newSectionType === "categories" && (
                    <>
                      <SettingsIcon size={20} className="text-[var(--color-heritage-green)] mb-1" />
                      <p className="font-bold text-[10px] text-[#1C1208]">Living Archive Grid</p>
                      <p className="text-[8px] text-[#7A6A57]">Four-column grid of cultural topics and sub-links</p>
                    </>
                  )}
                  {newSectionType === "trust-badges" && (
                    <>
                      <Award size={20} className="text-[var(--color-heritage-red)] mb-1" />
                      <p className="font-bold text-[10px] text-[#1C1208]">Trust Credibility Badges</p>
                      <p className="text-[8px] text-[#7A6A57]">Clean inline strip listing organizations or partners</p>
                    </>
                  )}
                  {newSectionType === "cta-banner" && (
                    <>
                      <Globe size={20} className="text-[var(--color-heritage-gold)] mb-1" />
                      <p className="font-bold text-[10px] text-[#1C1208]">Direct Call-To-Action Connect</p>
                      <p className="text-[8px] text-[#7A6A57]">Full-width banner with header title and book buttons</p>
                    </>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-[#E8DDD0] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-outline text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs px-4 py-2 rounded-xl shadow-lg cursor-pointer"
                >
                  Add Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Live Preview Simulator Drawer ── */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-[#1C1208]/90 backdrop-blur-md p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4 text-white">
            <div>
              <h3 className="font-display font-black text-xl">Homepage Layout Preview</h3>
              <p className="text-xs text-white/50">Simulator showing the homepage with draft reorderings and hero title.</p>
            </div>
            <button
              onClick={() => setPreviewOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Simulator Box */}
          <div className="flex-1 bg-[#FAF7F2] rounded-2xl border border-white/10 p-5 overflow-y-auto text-[#1C1208]">
            <div className="mx-auto max-w-2xl bg-white border border-[#E8DDD0] rounded-xl shadow-2xl p-6 space-y-12">
              {/* Header simulation */}
              <div className="flex justify-between items-center border-b border-[#E8DDD0] pb-4">
                <span className="font-display font-black text-sm">Volta Heritage Ensemble</span>
                <div className="flex gap-3 text-[10px] font-bold text-[#7A6A57]">
                  <span>Home</span>
                  <span>About</span>
                  <span>Heritage</span>
                  <span>Events</span>
                </div>
              </div>

              {/* Dynamic sections rendering mock */}
              {draftState.sectionsOrder.map((section) => {
                const isVisible = draftState.sectionVisibility[section] !== false;
                if (!isVisible) return null;

                if (section === "hero") {
                  return (
                    <div key={section} className="bg-[#1C1208] text-white p-6 rounded-xl border border-white/05 space-y-4 text-center">
                      <p className="text-[8px] font-black text-[var(--color-heritage-gold)] uppercase tracking-widest">
                        {draftState.heroContent.location}
                      </p>
                      <h2 className="font-display text-2xl font-black text-white">
                        {draftState.heroContent.title}
                      </h2>
                      <p className="text-[10px] text-white/70 max-w-md mx-auto leading-relaxed">
                        {draftState.heroContent.subtitle}
                      </p>
                      <div className="flex justify-center gap-3 mt-2">
                        <span className="btn-primary text-[8px] px-3 py-1.5 rounded-lg">
                          {draftState.heroContent.ctaPrimaryText}
                        </span>
                        <span className="btn-outline text-white border-white/30 text-[8px] px-3 py-1.5 rounded-lg">
                          {draftState.heroContent.ctaSecondaryText}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
                        {draftState.heroContent.stats.map((st, i) => (
                          <div key={i}>
                            <p className="font-black text-sm text-[var(--color-heritage-gold)]">{st.value}</p>
                            <p className="text-[7px] text-white/50 uppercase">{st.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Generic Section Mock
                return (
                  <div key={section} className="border border-dashed border-[#E8DDD0] bg-[#FAF7F2]/60 p-5 rounded-xl text-center">
                    <span className="text-[9px] uppercase font-black text-[#7A6A57] tracking-wider block">
                      Section Template: {section.replace("-", " ")}
                    </span>
                    <p className="text-[8px] text-[#7A6A57]/60 mt-0.5">Interactive contents dynamically bound</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
