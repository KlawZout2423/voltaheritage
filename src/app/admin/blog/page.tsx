"use client";

import React, { useState } from "react";
import {
  Plus, Trash2, Video, Globe, X, Eye, EyeOff, Link as LinkIcon, Edit2, AlertTriangle, FileText, Loader2
} from "lucide-react";
import { useCms, BlogPost } from "@/context/CmsContext";
import { uploadMediaAction } from "@/app/admin/actions/cms";

// Color maps for different media types
const mediaMeta = {
  image:            { label: "Image", bg: "bg-blue-50 text-blue-700 border-blue-200/50", dot: "bg-blue-500" },
  youtube:          { label: "YouTube Video", bg: "bg-red-50 text-red-700 border-red-200/50", dot: "bg-red-500" },
  tiktok:           { label: "TikTok", bg: "bg-neutral-100 text-neutral-800 border-neutral-300/50", dot: "bg-neutral-900" },
  cloudinary_video: { label: "Cloudinary Video", bg: "bg-purple-50 text-purple-700 border-purple-200/50", dot: "bg-purple-500" },
};

function formatDate(d: string) {
  if (!d) return "TBD";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// ── Shared modal shell ─────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
      <div className="bg-white border border-[#E8DDD0] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#E8DDD0] shrink-0">
          <h3 className="font-display font-black text-lg text-[#1C1208]">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#7A6A57] hover:text-[#1C1208] hover:bg-[#FAF7F2] transition-colors cursor-pointer"><X size={16} /></button>
        </div>
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

// ── Post Card ──────────────────────────────────────────────────
function PostCard({ post, isReadOnly, onEdit, onDelete }: { post: BlogPost; isReadOnly: boolean; onEdit: () => void; onDelete: () => void }) {
  const mm = mediaMeta[post.mediaType] ?? mediaMeta.image;
  return (
    <div className="bg-white border border-[#E8DDD0] rounded-2xl shadow-sm hover:shadow-md hover:border-[var(--color-heritage-gold)]/40 transition-all flex flex-col overflow-hidden group">
      {/* Accent top bar */}
      <div className={`h-1 w-full ${mm.dot}`} />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-start gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${mm.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${mm.dot}`} />
            {mm.label}
          </span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button disabled={isReadOnly} onClick={onEdit}
              className="p-1.5 rounded-lg text-[#C8B99A] hover:text-[#1C1208] hover:bg-[#FAF7F2] transition-all cursor-pointer">
              <Edit2 size={13} />
            </button>
            <button disabled={isReadOnly} onClick={onDelete}
              className="p-1.5 rounded-lg text-[#C8B99A] hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer disabled:opacity-30">
              <Trash2 size={13} />
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="font-display font-black text-sm text-[#1C1208] leading-snug mb-1 truncate">{post.title}</h3>
          <p className="text-[11px] text-[#7A6A57] leading-relaxed font-light line-clamp-3">{post.content}</p>
        </div>

        <div className="border-t border-[#E8DDD0] pt-3 mt-auto flex items-center justify-between text-[10px] text-[#A8957E] font-medium">
          <span className="flex items-center gap-1">
            {post.isPublished ? (
              <><Eye size={12} className="text-emerald-500" /> Published</>
            ) : (
              <><EyeOff size={12} className="text-red-400" /> Draft</>
            )}
          </span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

// ── Edit/Add Post Modal ────────────────────────────────────────
function PostModal({ post, onClose, onSave }: {
  post?: BlogPost;
  onClose: () => void;
  onSave: (data: Omit<BlogPost, "id" | "createdAt"> & { id?: string }) => void;
}) {
  const [form, setForm] = useState<Partial<BlogPost>>({
    title: post?.title ?? "",
    content: post?.content ?? "",
    mediaType: post?.mediaType ?? "image",
    mediaUrl: post?.mediaUrl ?? "",
    isPublished: post?.isPublished ?? true,
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setUploadError("File size exceeds 50MB limit");
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
          mediaUrl: publicUrl,
          mediaType: file.type.startsWith("video/") ? "cloudinary_video" : "image",
        }));
      } catch (err: any) {
        setUploadError(err.message || "Failed to upload file");
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
    <Modal title={post ? "Edit Post & Media" : "Add Post & Media"} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            title: form.title!,
            content: form.content!,
            mediaType: form.mediaType!,
            mediaUrl: form.mediaUrl!,
            isPublished: form.isPublished!,
            id: post?.id,
          });
        }}
        className="p-6 space-y-4 text-xs"
      >
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Title *</label>
          <input required type="text" placeholder="e.g. Traditional Dance Performance at Volta Festival" className="form-input text-xs"
            value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Content / Description *</label>
          <textarea required rows={4} placeholder="Write details about the update, event or dance video..." className="form-input text-xs resize-none"
            value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Media Type *</label>
            <select className="form-input text-xs" value={form.mediaType}
              onChange={(e) => setForm({ ...form, mediaType: e.target.value as BlogPost["mediaType"] })}>
              <option value="image">Image Link</option>
              <option value="youtube">YouTube Video</option>
              <option value="tiktok">TikTok Video</option>
              <option value="cloudinary_video">Cloudinary Video</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Publish Status</label>
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-[var(--color-heritage-gold)]"
                checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
              <span className="font-bold text-[#1C1208]">Publish Immediately</span>
            </label>
          </div>
        </div>

        {(form.mediaType === "image" || form.mediaType === "cloudinary_video") && (
          <div className="border border-dashed border-[#E8DDD0] rounded-xl p-4 bg-[#FAF7F2] flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold text-[#7A6A57] uppercase tracking-wider">
              {form.mediaType === "image" ? "Upload Local Image" : "Upload Local Video"}
            </span>
            <input
              type="file"
              accept={form.mediaType === "image" ? "image/*" : "video/*"}
              onChange={handleFileUpload}
              disabled={uploading}
              className="text-[10px] text-[#7A6A57] file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-[var(--color-heritage-gold)] file:text-white hover:file:bg-[var(--color-heritage-gold-dark)] file:cursor-pointer disabled:opacity-50"
            />
            {uploading && (
              <div className="flex items-center gap-1.5 text-[9px] text-[#A8957E] font-medium mt-1">
                <Loader2 size={12} className="animate-spin text-[var(--color-heritage-gold)]" />
                Uploading to Supabase (with Cloudinary fallback)...
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
          <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Media URL / Embed Link</label>
          <input type="text" placeholder="Paste the public image, video or share URL" className="form-input text-xs"
            value={form.mediaUrl} onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })} />
          <p className="text-[9px] text-[#A8957E] mt-1 font-light">
            {form.mediaType === "youtube" && "Provide the standard YouTube video link or embed URL (e.g. https://www.youtube.com/watch?v=...)."}
            {form.mediaType === "tiktok" && "Paste the standard TikTok share link (e.g. https://www.tiktok.com/@username/video/...)."}
            {form.mediaType === "cloudinary_video" && "Provide the direct URL to the video on Cloudinary."}
            {form.mediaType === "image" && "Provide a direct image URL (Unsplash, Cloudinary, etc.) to use as a cover."}
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-[#E8DDD0]">
          <button type="button" onClick={onClose} className="btn-outline text-xs px-4 py-2 rounded-xl cursor-pointer">Cancel</button>
          <button type="submit" className="btn-primary text-xs px-4 py-2 rounded-xl shadow-lg cursor-pointer">Save Post</button>
        </div>
      </form>
    </Modal>
  );
}

// ── Main Page ──────────────────────────────────────────────────
export default function AdminBlogManager() {
  const { state, addBlogPost, deleteBlogPost, updateBlogPost, currentUser } = useCms();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>(undefined);

  const isReadOnly = currentUser.role === "contributor";

  const handleDelete = (id: string) => {
    if (isReadOnly) return;
    if (!confirm("Delete this blog post?")) return;
    deleteBlogPost(id);
  };

  const handleSave = (data: Omit<BlogPost, "id" | "createdAt"> & { id?: string }) => {
    if (data.id) {
      const originalPost = state.blogPosts.find(p => p.id === data.id);
      if (originalPost) {
        updateBlogPost({
          ...originalPost,
          title: data.title,
          content: data.content,
          mediaType: data.mediaType,
          mediaUrl: data.mediaUrl,
          isPublished: data.isPublished,
        });
      }
    } else {
      addBlogPost(data);
    }
    setModalOpen(false);
    setEditingPost(undefined);
  };

  const posts = state.blogPosts || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-heritage-gold)] mb-1">Articles & Media</p>
          <h1 className="font-display text-2xl font-black text-[#1C1208] tracking-tight">Blog & Media Manager</h1>
          <p className="text-xs text-[#7A6A57] mt-1">Publish recent performance videos, announcements, and TikTok embeds to your community.</p>
        </div>
        <button disabled={isReadOnly} onClick={() => { setEditingPost(undefined); setModalOpen(true); }}
          className="btn-primary flex items-center gap-1.5 text-xs py-2.5 px-4 rounded-xl disabled:opacity-50 cursor-pointer shrink-0">
          <Plus size={14} /> Create Post
        </button>
      </div>

      {isReadOnly && (
        <div className="flex items-center gap-2.5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-semibold">
          <AlertTriangle size={14} className="shrink-0" />
          View-Only: your role cannot add, update, or remove blog posts.
        </div>
      )}

      {/* Grid */}
      {posts.length === 0 ? (
        <div className="bg-white border border-dashed border-[#E8DDD0] rounded-2xl p-16 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD0] flex items-center justify-center text-[#C8B99A]">
            <Video size={22} />
          </div>
          <p className="font-display font-black text-sm text-[#1C1208]">No posts yet</p>
          <p className="text-xs text-[#7A6A57] font-light">Add your first update or video embed above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isReadOnly={isReadOnly}
              onEdit={() => { setEditingPost(post); setModalOpen(true); }}
              onDelete={() => handleDelete(post.id)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {modalOpen && (
        <PostModal
          post={editingPost}
          onClose={() => { setModalOpen(false); setEditingPost(undefined); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
