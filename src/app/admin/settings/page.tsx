"use client";

import React, { useState } from "react";
import { Save, ShieldCheck } from "lucide-react";
import { useCms } from "@/context/CmsContext";

export default function AdminSettings() {
  const { draftState, updateDraft, saveDraft, publishState, currentUser } = useCms();
  const settings = draftState.settings;

  // Local message state
  const [saveStatus, setSaveStatus] = useState<"unsaved" | "saved" | "published">("unsaved");

  const isReadOnly = currentUser.role === "contributor";

  const handleChange = (key: string, value: string) => {
    if (isReadOnly) return;
    updateDraft((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value,
      },
    }));
    setSaveStatus("unsaved");
  };

  const handleSave = () => {
    if (isReadOnly) return;
    saveDraft();
    setSaveStatus("saved");
    alert("Draft settings saved locally!");
  };

  const handlePublish = () => {
    if (isReadOnly) return;
    publishState();
    setSaveStatus("published");
    alert("Branding and configuration settings published live!");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div className="flex justify-between items-center bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <div>
          <h1 className="font-display text-2xl font-black text-[#1C1208]">Global Site Settings</h1>
          <p className="text-xs text-[#7A6A57] mt-0.5">
            Configure site metadata, branding elements, and core organizational contact parameters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Settings Form */}
        <div className="md:col-span-2 bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-display font-black text-base text-[#1C1208] mb-1">General Configurations</h3>
            <p className="text-[11px] text-[#7A6A57]">Standard meta tags and agency parameters.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Site Title (Metadata)</label>
              <input
                disabled={isReadOnly}
                type="text"
                className="form-input text-xs"
                value={settings.siteTitle}
                onChange={(e) => handleChange("siteTitle", e.target.value)}
              />
            </div>

            <div>
              <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Meta Description</label>
              <textarea
                disabled={isReadOnly}
                rows={3}
                className="form-input text-xs resize-none"
                value={settings.siteDescription}
                onChange={(e) => handleChange("siteDescription", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Contact Email</label>
                <input
                  disabled={isReadOnly}
                  type="email"
                  className="form-input text-xs"
                  value={settings.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                />
              </div>
              <div>
                <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Contact Phone Number</label>
                <input
                  disabled={isReadOnly}
                  type="text"
                  className="form-input text-xs"
                  value={settings.contactPhone}
                  onChange={(e) => handleChange("contactPhone", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Branding & Theme Sidebar */}
        <div className="bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-display font-black text-base text-[#1C1208] mb-1">Color Theme Accents</h3>
            <p className="text-[11px] text-[#7A6A57]">Select the active brand color theme for headings and cards.</p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              {/* Option 1: Gold */}
              <button
                disabled={isReadOnly}
                onClick={() => handleChange("primaryColorAccent", "gold")}
                className={`flex-1 p-3 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  settings.primaryColorAccent === "gold"
                    ? "border-[var(--color-heritage-gold)] bg-[var(--color-heritage-gold-light)]/20 shadow-sm"
                    : "border-[#E8DDD0] hover:bg-[#FAF7F2]"
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-[var(--color-heritage-gold)] border border-yellow-600 shadow-sm" />
                <span className="text-[10px] font-bold text-[#1C1208]">Heritage Gold</span>
              </button>

              {/* Option 2: Red */}
              <button
                disabled={isReadOnly}
                onClick={() => handleChange("primaryColorAccent", "red")}
                className={`flex-1 p-3 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  settings.primaryColorAccent === "red"
                    ? "border-[var(--color-heritage-red)] bg-[var(--color-heritage-red-light)]/20 shadow-sm"
                    : "border-[#E8DDD0] hover:bg-[#FAF7F2]"
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-[var(--color-heritage-red)] border border-red-800 shadow-sm" />
                <span className="text-[10px] font-bold text-[#1C1208]">Heritage Red</span>
              </button>
            </div>

            <div className="flex gap-4">
              {/* Option 3: Green */}
              <button
                disabled={isReadOnly}
                onClick={() => handleChange("primaryColorAccent", "green")}
                className={`w-1/2 p-3 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  settings.primaryColorAccent === "green"
                    ? "border-[var(--color-heritage-green)] bg-[var(--color-heritage-green-light)]/20 shadow-sm"
                    : "border-[#E8DDD0] hover:bg-[#FAF7F2]"
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-[var(--color-heritage-green)] border border-green-800 shadow-sm" />
                <span className="text-[10px] font-bold text-[#1C1208]">Heritage Green</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end gap-3.5 border-t border-[#E8DDD0] pt-6 mt-4">
        <span className="text-xs text-[#7A6A57] font-semibold flex items-center gap-2 mr-auto">
          Status: {saveStatus.replace("-", " ")}
        </span>
        <button
          disabled={isReadOnly}
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 border border-[#E8DDD0] hover:border-[#1C1208] text-xs font-bold text-[#1C1208] rounded-xl transition-all cursor-pointer disabled:opacity-50"
        >
          <Save size={13} /> Save Draft
        </button>
        <button
          disabled={isReadOnly}
          onClick={handlePublish}
          className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] text-xs font-bold text-white rounded-xl shadow-lg shadow-[var(--color-heritage-gold)]/20 transition-all cursor-pointer disabled:opacity-50"
        >
          Publish Settings
        </button>
      </div>
    </div>
  );
}
