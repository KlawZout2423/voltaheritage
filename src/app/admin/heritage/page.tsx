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
      } catch (err: any) {
        setUploadError(err.message || "Failed to upload image");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Living Archive Manager</h1>
          <p className="text-sm text-neutral-400">
            Edit the cultural pillars, tags, descriptions, and media items representing the Ewe heritage.
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
              className="group cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 transition-all hover:border-[var(--color-heritage-gold)] hover:bg-neutral-900"
            >
              <div className="relative mb-4 h-40 w-full overflow-hidden rounded-lg bg-neutral-800">
                {pillar.imageUrl ? (
                  <Image
                    src={pillar.imageUrl}
                    alt={pillar.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-103"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-neutral-600">
                    <ImageIcon size={32} />
                  </div>
                )}
                <div className="absolute top-2 right-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-black/60 text-white border border-neutral-700">
                  {pillar.color}
                </div>
              </div>
              <h3 className="font-semibold text-white group-hover:text-[var(--color-heritage-gold)] transition-colors">
                {pillar.name}
              </h3>
              <p className="mt-1 text-xs text-neutral-400 line-clamp-2">{pillar.tagline}</p>
            </div>
          ))}
        </div>
      ) : (
        // Detailed Pillar & Sub-items Editor View
        <div className="space-y-6">
          <button
            onClick={() => setSelectedPillar(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Pillars
          </button>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Pillar Meta Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                  <h3 className="font-bold text-white text-sm">Pillar Details</h3>
                  {!editingPillar && (
                    <button
                      onClick={handleEditPillar}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-750 text-xs font-semibold text-white transition-colors"
                    >
                      <Edit2 size={11} /> Edit
                    </button>
                  )}
                </div>

                {editingPillar && pillarForm ? (
                  <form onSubmit={handleSavePillar} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                        Pillar Name
                      </label>
                      <input
                        type="text"
                        required
                        value={pillarForm.name}
                        onChange={(e) => setPillarForm({ ...pillarForm, name: e.target.value })}
                        className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[var(--color-heritage-gold)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                        Tagline
                      </label>
                      <input
                        type="text"
                        required
                        value={pillarForm.tagline}
                        onChange={(e) => setPillarForm({ ...pillarForm, tagline: e.target.value })}
                        className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[var(--color-heritage-gold)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                        Description
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={pillarForm.description}
                        onChange={(e) => setPillarForm({ ...pillarForm, description: e.target.value })}
                        className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[var(--color-heritage-gold)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                        Accent Color
                      </label>
                      <select
                        value={pillarForm.color}
                        onChange={(e) =>
                          setPillarForm({ ...pillarForm, color: e.target.value as "gold" | "red" | "green" })
                        }
                        className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[var(--color-heritage-gold)]"
                      >
                        <option value="gold">Gold</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                        Cover Image
                      </label>
                      <div className="space-y-2">
                        {pillarForm.imageUrl && (
                          <div className="relative h-28 w-full rounded border border-neutral-800 overflow-hidden">
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
                          className="w-full text-xs text-neutral-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-neutral-850 file:text-white hover:file:bg-neutral-750"
                        />
                      </div>
                    </div>

                    {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={savingPillar || uploading}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] disabled:opacity-50 text-black text-xs font-bold transition-all"
                      >
                        {savingPillar ? <Loader2 className="animate-spin" size={12} /> : <Save size={12} />} Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelPillarEdit}
                        className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4 text-xs">
                    <div className="relative h-32 w-full overflow-hidden rounded-lg">
                      {currentPillar.imageUrl ? (
                        <Image
                          src={currentPillar.imageUrl}
                          alt={currentPillar.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-neutral-800 text-neutral-600">
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase text-neutral-500">Pillar Name</h4>
                      <p className="font-semibold text-white mt-0.5">{currentPillar.name}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase text-neutral-500">Tagline</h4>
                      <p className="text-neutral-300 mt-0.5 font-light">{currentPillar.tagline}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase text-neutral-500">Description</h4>
                      <p className="text-neutral-400 mt-1 leading-relaxed whitespace-pre-line font-light">
                        {currentPillar.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase text-neutral-500">Accent Color</h4>
                      <span className="mt-1 inline-block rounded-full bg-neutral-800 border border-neutral-700 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                        {currentPillar.color}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sub-items Editor Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="font-bold text-white text-sm">Cultural Sub-Items ({currentPillar.items.length})</h3>
                {!editingItem && !isNewItem && (
                  <button
                    onClick={handleAddNewItem}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] text-black text-xs font-bold transition-all"
                  >
                    <Plus size={13} /> Add Sub-Item
                  </button>
                )}
              </div>

              {/* Form to create/edit item */}
              {(editingItem || isNewItem) && (
                <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
                    <h4 className="font-bold text-white text-xs">
                      {isNewItem ? "Add New Sub-Item" : `Edit Sub-Item: ${editingItem?.name}`}
                    </h4>
                    <button
                      onClick={handleCancelItemEdit}
                      className="text-neutral-400 hover:text-white"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                          Item Name
                        </label>
                        <input
                          type="text"
                          required
                          value={itemForm.name}
                          onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                          className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-1.5 text-white focus:outline-none focus:border-[var(--color-heritage-gold)]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                          Media Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, false)}
                          className="w-full file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-neutral-850 file:text-white hover:file:bg-neutral-750"
                        />
                      </div>
                    </div>

                    {itemForm.imageUrl && (
                      <div className="relative h-36 w-full max-w-sm rounded border border-neutral-800 overflow-hidden bg-neutral-800">
                        <Image
                          src={itemForm.imageUrl}
                          alt="Sub item preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                        Detailed Description
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={itemForm.description}
                        onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                        className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-1.5 text-white focus:outline-none focus:border-[var(--color-heritage-gold)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                        Cultural Significance
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={itemForm.significance}
                        onChange={(e) => setItemForm({ ...itemForm, significance: e.target.value })}
                        className="w-full rounded bg-neutral-800 border border-neutral-700 px-3 py-1.5 text-white focus:outline-none focus:border-[var(--color-heritage-gold)]"
                      />
                    </div>

                    {uploadError && <p className="text-[10px] text-red-500 font-semibold">{uploadError}</p>}

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={savingItem || uploading}
                        className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] disabled:opacity-50 text-black font-bold transition-all"
                      >
                        {savingItem ? <Loader2 className="animate-spin" size={12} /> : <Save size={12} />} Save Sub-Item
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelItemEdit}
                        className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white font-semibold transition-all"
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
                  <div className="rounded-xl border border-dashed border-neutral-800 p-8 text-center text-neutral-500 text-xs">
                    No sub-items added yet. Click "Add Sub-Item" to create one.
                  </div>
                ) : (
                  currentPillar.items.map((item) => (
                    <div
                      key={item.id}
                      className="group flex flex-col sm:flex-row gap-4 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 transition-all hover:border-neutral-700"
                    >
                      <div className="relative h-28 w-full sm:w-40 shrink-0 overflow-hidden rounded-lg bg-neutral-800">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 160px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-neutral-600">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-sm">{item.name}</h4>
                          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light">
                            {item.description}
                          </p>
                          <p className="text-[10px] text-neutral-400/80 leading-relaxed font-light italic">
                            <span className="font-bold uppercase text-[9px] text-[var(--color-heritage-gold)] not-italic mr-1">
                              Significance:
                            </span>
                            {item.significance}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 justify-end mt-2 pt-2 border-t border-neutral-850">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-850 hover:bg-neutral-800 text-[10px] font-semibold text-white transition-colors"
                          >
                            <Edit2 size={10} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 text-[10px] font-semibold text-red-400 transition-colors"
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
