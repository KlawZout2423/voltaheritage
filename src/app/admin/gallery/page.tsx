"use client";

import React, { useState } from "react";
import {
  Plus, Trash2, Image as ImageIcon, X, Edit2, AlertTriangle, Loader2, Play
} from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { GalleryItem } from "@/lib/types";
import { uploadMediaAction } from "@/app/admin/actions/cms";

// Category badges
const categoryMeta = {
  performance: { label: "Performance", bg: "bg-emerald-50 text-emerald-700 border-emerald-200/50", dot: "bg-emerald-500" },
  workshop:    { label: "Workshop",    bg: "bg-blue-50 text-blue-700 border-blue-200/50", dot: "bg-blue-500" },
  festival:    { label: "Festival",    bg: "bg-purple-50 text-purple-700 border-purple-200/50", dot: "bg-purple-500" },
  heritage:    { label: "Heritage",    bg: "bg-amber-50 text-amber-700 border-amber-200/50", dot: "bg-amber-500" },
};

// ── Shared modal shell ─────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
      <div className="bg-white border border-[#E8DDD0] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#E8DDD0] shrink-0">
          <h3 className="font-display font-black text-lg text-[#1C1208]">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#7A6A57] hover:text-[#1C1208] hover:bg-[#FAF7F2] transition-colors cursor-pointer">
            <X size={16} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

// ── Item Card ──────────────────────────────────────────────────
function GalleryItemCard({
  item,
  isReadOnly,
  onEdit,
  onDelete,
}: {
  item: GalleryItem;
  isReadOnly: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const cat = categoryMeta[item.category as keyof typeof categoryMeta] ?? {
    label: item.category || "Uncategorized",
    bg: "bg-neutral-50 text-neutral-700 border-neutral-200/50",
    dot: "bg-neutral-500",
  };

  return (
    <div className="bg-white border border-[#E8DDD0] rounded-2xl shadow-sm hover:shadow-md hover:border-[var(--color-heritage-gold)]/40 transition-all flex flex-col overflow-hidden group">
      {/* Media Preview */}
      <div className="relative aspect-video bg-neutral-900 overflow-hidden flex items-center justify-center">
        {item.type === "video" ? (
          <>
            {item.thumbnailUrl ? (
              <img
                src={item.thumbnailUrl}
                alt={item.caption}
                className="w-full h-full object-cover opacity-80"
              />
            ) : (
              <div className="w-full h-full bg-neutral-950 flex items-center justify-center">
                <Play className="text-white opacity-50" size={32} />
              </div>
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <span className="p-2.5 rounded-full bg-[var(--color-heritage-gold)] text-white shadow-lg">
                <Play size={16} fill="white" />
              </span>
            </div>
          </>
        ) : (
          <img
            src={item.url}
            alt={item.caption}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            loading="lazy"
          />
        )}

        {/* Media type badge */}
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-black uppercase text-white tracking-widest">
          {item.type}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2.5 flex-1 justify-between">
        <div className="flex justify-between items-start gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${cat.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
            {cat.label}
          </span>
          
          <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <button
              disabled={isReadOnly}
              onClick={onEdit}
              className="p-1.5 rounded-lg text-[#C8B99A] hover:text-[#1C1208] hover:bg-[#FAF7F2] transition-all cursor-pointer disabled:opacity-30"
            >
              <Edit2 size={12} />
            </button>
            <button
              disabled={isReadOnly}
              onClick={onDelete}
              className="p-1.5 rounded-lg text-[#C8B99A] hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer disabled:opacity-30"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        <p className="text-[11px] text-[#1C1208] font-medium leading-relaxed line-clamp-2">
          {item.caption || "No caption provided"}
        </p>
      </div>
    </div>
  );
}

// ── Add/Edit Item Modal ────────────────────────────────────────
function GalleryModal({
  item,
  onClose,
  onSave,
}: {
  item?: GalleryItem;
  onClose: () => void;
  onSave: (data: Omit<GalleryItem, "id"> & { id?: string }) => void;
}) {
  const [form, setForm] = useState<Partial<GalleryItem>>({
    type: item?.type ?? "photo",
    url: item?.url ?? "",
    caption: item?.caption ?? "",
    category: item?.category ?? "performance",
    thumbnailUrl: item?.thumbnailUrl ?? "",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setUploadError("Image size exceeds 15MB limit");
      return;
    }

    setUploading(true);
    setUploadError(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      try {
        const publicUrl = await uploadMediaAction(base64, file.type);
        setForm((prev) => ({
          ...prev,
          url: publicUrl,
        }));
      } catch (err) {
        const error = err as Error;
        setUploadError(error.message || "Failed to upload file");
      } finally {
        setUploading(false);
      }
    };
    reader.onerror = () => {
      setUploadError("Failed to read file");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal title={item ? "Edit Gallery Item" : "Add Gallery Item"} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            type: form.type!,
            url: form.url!,
            caption: form.caption!,
            category: form.category,
            thumbnailUrl: form.thumbnailUrl,
            id: item?.id,
          });
        }}
        className="p-6 space-y-4 text-xs"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Media Type *</label>
            <select
              className="form-input text-xs"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as "photo" | "video" })}
            >
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Category *</label>
            <select
              className="form-input text-xs"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="performance">Performance</option>
              <option value="workshop">Workshop / School</option>
              <option value="festival">Festival</option>
              <option value="heritage">Heritage / Culture</option>
            </select>
          </div>
        </div>

        {form.type === "photo" && (
          <div className="border border-dashed border-[#E8DDD0] rounded-xl p-4 bg-[#FAF7F2] flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold text-[#7A6A57] uppercase tracking-wider">Upload Local Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="text-[10px] text-[#7A6A57] file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-[var(--color-heritage-gold)] file:text-white hover:file:bg-[var(--color-heritage-gold-dark)] file:cursor-pointer disabled:opacity-50"
            />
            {uploading && (
              <div className="flex items-center gap-1.5 text-[9px] text-[#A8957E] font-medium mt-1">
                <Loader2 size={12} className="animate-spin text-[var(--color-heritage-gold)]" />
                Uploading image to storage...
              </div>
            )}
            {uploadError && (
              <span className="text-[9px] text-red-500 font-semibold mt-1">
                Error: {uploadError}
              </span>
            )}
          </div>
        )}

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">
            {form.type === "video" ? "Embed Link / Video URL *" : "Photo URL *"}
          </label>
          <input
            required
            type="text"
            placeholder={form.type === "video" ? "e.g. YouTube watch URL or TikTok link" : "Paste direct image link if uploaded externally"}
            className="form-input text-xs"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>

        {form.type === "video" && (
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">
              Video Thumbnail URL (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Cover image link for the video"
              className="form-input text-xs"
              value={form.thumbnailUrl}
              onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
            />
          </div>
        )}

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Caption *</label>
          <input
            required
            type="text"
            placeholder="Describe this gallery item..."
            className="form-input text-xs"
            value={form.caption}
            onChange={(e) => setForm({ ...form, caption: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-[#E8DDD0]">
          <button type="button" onClick={onClose} className="btn-outline text-xs px-4 py-2 rounded-xl cursor-pointer">
            Cancel
          </button>
          <button type="submit" className="btn-primary text-xs px-4 py-2 rounded-xl shadow-lg cursor-pointer">
            Save Item
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ── Main Dashboard Manager ──────────────────────────────────────
export default function AdminGalleryManager() {
  const { state, addGalleryItem, deleteGalleryItem, updateGalleryItem, currentUser } = useCms();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | undefined>(undefined);

  const isReadOnly = currentUser.role === "contributor";

  const handleDelete = (id: string) => {
    if (isReadOnly) return;
    if (!confirm("Delete this gallery item?")) return;
    deleteGalleryItem(id);
  };

  const handleSave = (data: Omit<GalleryItem, "id"> & { id?: string }) => {
    if (data.id) {
      updateGalleryItem({
        id: data.id,
        type: data.type,
        url: data.url,
        caption: data.caption,
        category: data.category,
        thumbnailUrl: data.thumbnailUrl,
      });
    } else {
      addGalleryItem(data);
    }
    setModalOpen(false);
    setEditingItem(undefined);
  };

  const items = state.gallery || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-heritage-gold)] mb-1">
            Media Library
          </p>
          <h1 className="font-display text-2xl font-black text-[#1C1208] tracking-tight">Gallery Manager</h1>
          <p className="text-xs text-[#7A6A57] mt-1">
            Add, update, or remove photos and video embeds that appear in the public media gallery.
          </p>
        </div>
        <button
          disabled={isReadOnly}
          onClick={() => {
            setEditingItem(undefined);
            setModalOpen(true);
          }}
          className="btn-primary flex items-center gap-1.5 text-xs py-2.5 px-4 rounded-xl disabled:opacity-50 cursor-pointer shrink-0"
        >
          <Plus size={14} /> Add Media
        </button>
      </div>

      {isReadOnly && (
        <div className="flex items-center gap-2.5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-semibold">
          <AlertTriangle size={14} className="shrink-0" />
          View-Only: your role cannot add, edit, or delete gallery items.
        </div>
      )}

      {/* Grid */}
      {items.length === 0 ? (
        <div className="bg-white border border-dashed border-[#E8DDD0] rounded-2xl p-16 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD0] flex items-center justify-center text-[#C8B99A]">
            <ImageIcon size={22} />
          </div>
          <p className="font-display font-black text-sm text-[#1C1208]">No gallery items yet</p>
          <p className="text-xs text-[#7A6A57] font-light">Add your first photo upload or video embed above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => (
            <GalleryItemCard
              key={item.id}
              item={item}
              isReadOnly={isReadOnly}
              onEdit={() => {
                setEditingItem(item);
                setModalOpen(true);
              }}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {modalOpen && (
        <GalleryModal
          item={editingItem}
          onClose={() => {
            setModalOpen(false);
            setEditingItem(undefined);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
