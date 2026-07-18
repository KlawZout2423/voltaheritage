"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCms } from "@/context/CmsContext";
import { HeritageCategory, HeritageItem } from "@/lib/types";
import { uploadMediaAction } from "@/app/admin/actions/cms";
import { Edit2, Plus, Trash2, Save, X, ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react";

export default function AdminHeritagePage() {
  const { state, updateHeritagePillar, addHeritageItem, updateHeritageItem, deleteHeritageItem } = useCms();
  const categories = state.heritageCategories || [];

  const [selectedPillar, setSelectedPillar] = useState<HeritageCategory | null>(null);
  const [editingPillar, setEditingPillar] = useState<boolean>(false);
  const [pillarForm, setPillarForm] = useState<HeritageCategory | null>(null);

  const [editingItem, setEditingItem] = useState<HeritageItem | null>(null);
  const [itemForm, setItemForm] = useState<Omit<HeritageItem, "id"> & { id?: string }>({
    name: "",
    description: "",
    significance: "",
    imageUrl: "",
  });
  const [isNewItem, setIsNewItem] = useState<boolean>(false);

  const [savingPillar, setSavingPillar] = useState<boolean>(false);
  const [savingItem, setSavingItem] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Sync selected pillar with live state updates
  const currentPillar = categories.find((c) => c.id === selectedPillar?.id) || selectedPillar;

  const handlePillarClick = (pillar: HeritageCategory) => {
    setSelectedPillar(pillar);
    setEditingPillar(false);
    setEditingItem(null);
    setIsNewItem(false);
  };

  const handleEditPillar = () => {
    if (!currentPillar) return;
    setPillarForm({ ...currentPillar });
    setEditingPillar(true);
  };

  const handleCancelPillarEdit = () => {
    setEditingPillar(false);
    setPillarForm(null);
  };

  const handleSavePillar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pillarForm) return;
    setSavingPillar(true);
    try {
      await updateHeritagePillar(pillarForm);
      setEditingPillar(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingPillar(false);
    }
  };

  const handleEditItem = (item: HeritageItem) => {
    setEditingItem(item);
    setItemForm({ ...item });
    setIsNewItem(false);
  };

  const handleAddNewItem = () => {
    setEditingItem(null);
    setItemForm({
      name: "",
      description: "",
      significance: "",
      imageUrl: "",
    });
    setIsNewItem(true);
  };

  const handleCancelItemEdit = () => {
    setEditingItem(null);
    setIsNewItem(false);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPillar) return;
    setSavingItem(true);
    try {
      if (isNewItem) {
        await addHeritageItem({
          name: itemForm.name,
          description: itemForm.description,
          significance: itemForm.significance,
          imageUrl: itemForm.imageUrl,
          pillarId: currentPillar.id,
        });
      } else if (editingItem) {
        await updateHeritageItem({
          id: editingItem.id,
          name: itemForm.name,
          description: itemForm.description,
          significance: itemForm.significance,
          imageUrl: itemForm.imageUrl,
          pillarId: currentPillar.id,
        });
      }
      setEditingItem(null);
      setIsNewItem(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingItem(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!currentPillar) return;
    if (confirm("Are you sure you want to delete this sub-item?")) {
      try {
        await deleteHeritageItem(itemId, currentPillar.id);
        if (editingItem?.id === itemId) {
          setEditingItem(null);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isForPillar: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setUploadError("File size exceeds 20MB limit");
      return;
    }

    setUploading(true);
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      try {
        const publicUrl = await uploadMediaAction(base64, file.type);
        if (isForPillar) {
          setPillarForm((prev) => prev ? { ...prev, imageUrl: publicUrl } : null);
        } else {
          setItemForm((prev) => ({ ...prev, imageUrl: publicUrl }));
        }
      } catch (err) {
        const error = err as Error;
        setUploadError(error.message || "Failed to upload image");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-heritage-gold)] mb-1">Pillars</p>
          <h1 className="font-display text-2xl font-black text-[#1C1208] tracking-tight">Living Archive Manager</h1>
          <p className="text-xs text-[#7A6A57] mt-1">
            Edit the cultural pillars, taglines, descriptions, and media items representing Ewe heritage.
          </p>
        </div>
      </div>

      {!currentPillar ? (
        // Grid of 6 pillars
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => handlePillarClick(pillar)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-[#E8DDD0] bg-white p-5 transition-all hover:border-[var(--color-heritage-gold)] hover:shadow-md duration-300 flex flex-col h-full"
            >
              <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-[#FAF7F2] border border-[#E8DDD0]">
                {pillar.imageUrl ? (
                  <Image
                    src={pillar.imageUrl}
                    alt={pillar.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-103"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#C8B99A]">
                    <ImageIcon size={32} />
                  </div>
                )}
                <div className="absolute top-2 right-2 rounded-full px-2.5 py-1 text-[8px] font-black uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#1C1208] border border-[#E8DDD0] shadow-sm">
                  {pillar.color}
                </div>
              </div>
              <h3 className="font-display font-black text-[#1C1208] group-hover:text-[var(--color-heritage-gold)] transition-colors text-sm">
                {pillar.name}
              </h3>
              <p className="mt-1 text-xs text-[#7A6A57] line-clamp-2 font-light leading-relaxed">{pillar.tagline}</p>
            </div>
          ))}
        </div>
      ) : (
        // Detailed Pillar & Sub-items Editor View
        <div className="space-y-6">
          <button
            onClick={() => setSelectedPillar(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A6A57] hover:text-[#1C1208] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Pillars
          </button>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Pillar Meta Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-2xl border border-[#E8DDD0] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#E8DDD0] pb-3 mb-4">
                  <h3 className="font-display font-black text-[#1C1208] text-sm">Pillar Details</h3>
                  {!editingPillar && (
                    <button
                      onClick={handleEditPillar}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8DDD0] hover:bg-[#FAF7F2] text-xs font-bold text-[#1C1208] transition-colors cursor-pointer"
                    >
                      <Edit2 size={11} /> Edit
                    </button>
                  )}
                </div>

                {editingPillar && pillarForm ? (
                  <form onSubmit={handleSavePillar} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5">
                        Pillar Name
                      </label>
                      <input
                        type="text"
                        required
                        value={pillarForm.name}
                        onChange={(e) => setPillarForm({ ...pillarForm, name: e.target.value })}
                        className="form-input text-xs w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5">
                        Tagline
                      </label>
                      <input
                        type="text"
                        required
                        value={pillarForm.tagline}
                        onChange={(e) => setPillarForm({ ...pillarForm, tagline: e.target.value })}
                        className="form-input text-xs w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5">
                        Description
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={pillarForm.description}
                        onChange={(e) => setPillarForm({ ...pillarForm, description: e.target.value })}
                        className="form-input text-xs w-full resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5">
                        Accent Color
                      </label>
                      <select
                        value={pillarForm.color}
                        onChange={(e) =>
                          setPillarForm({ ...pillarForm, color: e.target.value as "gold" | "red" | "green" })
                        }
                        className="form-input text-xs w-full"
                      >
                        <option value="gold">Gold</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5">
                        Cover Image
                      </label>
                      <div className="space-y-2">
                        {pillarForm.imageUrl && (
                          <div className="relative h-28 w-full rounded-xl border border-[#E8DDD0] overflow-hidden bg-[#FAF7F2]">
                            <Image
                              src={pillarForm.imageUrl}
                              alt="Pillar preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, true)}
                          className="w-full text-xs text-[#7A6A57] file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-[#E8DDD0] file:text-[10px] file:font-black file:bg-[#FAF7F2] file:text-[#1C1208] hover:file:bg-[#F2EBE0] cursor-pointer file:transition-colors"
                        />
                      </div>
                    </div>

                    {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={savingPillar || uploading}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-[var(--color-heritage-gold)]/20 cursor-pointer"
                      >
                        {savingPillar ? <Loader2 className="animate-spin" size={12} /> : <Save size={12} />} Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelPillarEdit}
                        className="px-4 py-2 rounded-xl border border-[#E8DDD0] hover:bg-[#FAF7F2] text-[#1C1208] text-xs font-bold transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4 text-xs">
                    <div className="relative h-32 w-full overflow-hidden rounded-xl border border-[#E8DDD0] bg-[#FAF7F2]">
                      {currentPillar.imageUrl ? (
                        <Image
                          src={currentPillar.imageUrl}
                          alt={currentPillar.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#C8B99A]">
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-[#A8957E]">Pillar Name</h4>
                      <p className="font-display font-black text-[#1C1208] mt-0.5 text-sm">{currentPillar.name}</p>
                    </div>
                    <div>
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-[#A8957E]">Tagline</h4>
                      <p className="text-xs italic text-[var(--color-heritage-gold)] font-bold mt-0.5">{currentPillar.tagline}</p>
                    </div>
                    <div>
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-[#A8957E]">Description</h4>
                      <p className="text-xs text-[#7A6A57] mt-1 leading-relaxed whitespace-pre-line font-light">
                        {currentPillar.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-[#A8957E]">Accent Color</h4>
                      <span className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#FAF7F2] border border-[#E8DDD0] text-[#1C1208]">
                        {currentPillar.color}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sub-items Editor Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8DDD0] pb-3">
                <h3 className="font-display font-black text-[#1C1208] text-sm">Cultural Sub-Items ({currentPillar.items.length})</h3>
                {!editingItem && !isNewItem && (
                  <button
                    onClick={handleAddNewItem}
                    className="btn-primary flex items-center gap-1.5 text-xs py-2 px-4 rounded-xl cursor-pointer"
                  >
                    <Plus size={13} /> Add Sub-Item
                  </button>
                )}
              </div>

              {/* Form to create/edit item */}
              {(editingItem || isNewItem) && (
                <div className="rounded-2xl border border-[#E8DDD0] bg-white p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#E8DDD0] pb-2 mb-2">
                    <h4 className="font-display font-black text-[#1C1208] text-xs">
                      {isNewItem ? "Add New Sub-Item" : `Edit Sub-Item: ${editingItem?.name}`}
                    </h4>
                    <button
                      onClick={handleCancelItemEdit}
                      className="text-[#7A6A57] hover:text-[#1C1208] transition-colors cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5">
                          Item Name
                        </label>
                        <input
                          type="text"
                          required
                          value={itemForm.name}
                          onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                          className="form-input text-xs w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5">
                          Media Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, false)}
                          className="w-full text-xs text-[#7A6A57] file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-[#E8DDD0] file:text-[10px] file:font-black file:bg-[#FAF7F2] file:text-[#1C1208] hover:file:bg-[#F2EBE0] cursor-pointer file:transition-colors"
                        />
                      </div>
                    </div>

                    {itemForm.imageUrl && (
                      <div className="relative h-36 w-full max-w-sm rounded-xl border border-[#E8DDD0] overflow-hidden bg-[#FAF7F2]">
                        <Image
                          src={itemForm.imageUrl}
                          alt="Sub item preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5">
                        Detailed Description
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={itemForm.description}
                        onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                        className="form-input text-xs w-full resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5">
                        Cultural Significance
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={itemForm.significance}
                        onChange={(e) => setItemForm({ ...itemForm, significance: e.target.value })}
                        className="form-input text-xs w-full resize-none"
                      />
                    </div>

                    {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={savingItem || uploading}
                        className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-[var(--color-heritage-gold)]/20 cursor-pointer"
                      >
                        {savingItem ? <Loader2 className="animate-spin" size={12} /> : <Save size={12} />} Save Sub-Item
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelItemEdit}
                        className="px-4 py-2 rounded-xl border border-[#E8DDD0] hover:bg-[#FAF7F2] text-[#1C1208] text-xs font-bold transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-4">
                {currentPillar.items.length === 0 ? (
                  <div className="bg-white border border-dashed border-[#E8DDD0] rounded-2xl p-12 flex flex-col items-center text-center gap-2 text-xs text-[#7A6A57] font-light">
                    No sub-items added yet. Click &quot;Add Sub-Item&quot; to create one.
                  </div>
                ) : (
                  currentPillar.items.map((item) => (
                    <div
                      key={item.id}
                      className="group flex flex-col sm:flex-row gap-4 overflow-hidden rounded-2xl border border-[#E8DDD0] bg-white p-4 transition-all hover:border-[var(--color-heritage-gold)]/40 hover:shadow-sm"
                    >
                      <div className="relative h-28 w-full sm:w-40 shrink-0 overflow-hidden rounded-xl bg-[#FAF7F2] border border-[#E8DDD0]">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 160px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[#C8B99A]">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <h4 className="font-display font-black text-[#1C1208] text-sm">{item.name}</h4>
                          <p className="text-xs text-[#7A6A57] line-clamp-2 leading-relaxed font-light">
                            {item.description}
                          </p>
                          <div className="text-[10px] text-[#A8957E] leading-relaxed font-light italic bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E8DDD0] mt-1.5">
                            <span className="font-black uppercase text-[8px] text-[var(--color-heritage-gold)] not-italic mr-1.5 block mb-0.5">
                              Cultural Significance:
                            </span>
                            {item.significance}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 justify-end mt-3 pt-3 border-t border-[#E8DDD0]">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8DDD0] hover:bg-[#FAF7F2] text-[10px] font-bold text-[#1C1208] transition-colors cursor-pointer"
                          >
                            <Edit2 size={10} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-[10px] font-bold text-red-600 transition-colors cursor-pointer"
                          >
                            <Trash2 size={10} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
