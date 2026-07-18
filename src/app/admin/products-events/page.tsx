"use client";

import React, { useState } from "react";
import {
  Plus, Trash2, Calendar, MapPin, X, Star, Music,
  ChevronDown, ChevronUp, AlertTriangle,
} from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { Service, Event } from "@/lib/types";

// ── Color accent meta ──────────────────────────────────────────
const colorMeta = {
  gold:  { badge: "bg-[var(--color-heritage-gold-light)]  text-[var(--color-heritage-gold-dark)]  border-[var(--color-heritage-gold)]/30",  dot: "bg-[var(--color-heritage-gold)]",  label: "Heritage Gold"  },
  red:   { badge: "bg-[var(--color-heritage-red-light)]   text-[var(--color-heritage-red)]         border-[var(--color-heritage-red)]/30",    dot: "bg-[var(--color-heritage-red)]",   label: "Heritage Red"   },
  green: { badge: "bg-[var(--color-heritage-green-light)] text-[var(--color-heritage-green)]       border-[var(--color-heritage-green)]/30",  dot: "bg-[var(--color-heritage-green)]", label: "Heritage Green" },
};

const categoryMeta: Record<string, string> = {
  performance: "bg-[var(--color-heritage-gold-light)]  text-[var(--color-heritage-gold-dark)]",
  festival:    "bg-[var(--color-heritage-red-light)]   text-[var(--color-heritage-red)]",
  workshop:    "bg-[var(--color-heritage-green-light)] text-[var(--color-heritage-green)]",
  exhibition:  "bg-[#FAF7F2] text-[#7A6A57]",
  other:       "bg-[#FAF7F2] text-[#7A6A57]",
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

// ── Service Card ───────────────────────────────────────────────
function ServiceCard({ svc, isReadOnly, onDelete }: { svc: Service; isReadOnly: boolean; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const cm = colorMeta[svc.color] ?? colorMeta.gold;
  return (
    <div className="bg-white border border-[#E8DDD0] rounded-2xl shadow-sm hover:shadow-md hover:border-[var(--color-heritage-gold)]/40 transition-all flex flex-col overflow-hidden group">
      {/* Accent top bar */}
      <div className={`h-1 w-full ${cm.dot}`} />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-start gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${cm.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cm.dot}`} />
            {cm.label}
          </span>
          <button disabled={isReadOnly} onClick={() => onDelete(svc.id)}
            className="p-1.5 rounded-lg text-[#C8B99A] hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer disabled:opacity-30 opacity-0 group-hover:opacity-100">
            <Trash2 size={13} />
          </button>
        </div>
        <div>
          <h3 className="font-display font-black text-sm text-[#1C1208] leading-snug mb-1">{svc.title}</h3>
          <p className={`text-[11px] text-[#7A6A57] leading-relaxed font-light ${expanded ? "" : "line-clamp-2"}`}>{svc.description}</p>
        </div>
        <div className="border-t border-[#E8DDD0] pt-3 mt-auto">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-black uppercase tracking-wider text-[#A8957E]">Features</p>
            {svc.features.length > 2 && (
              <button onClick={() => setExpanded(!expanded)} className="text-[9px] font-bold text-[var(--color-heritage-gold)] flex items-center gap-0.5 cursor-pointer">
                {expanded ? <><ChevronUp size={10} /> Less</> : <><ChevronDown size={10} /> +{svc.features.length - 2} more</>}
              </button>
            )}
          </div>
          <ul className="space-y-1">
            {(expanded ? svc.features : svc.features.slice(0, 2)).map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-[10px] text-[#7A6A57] font-medium">
                <span className={`w-1 h-1 rounded-full shrink-0 ${cm.dot}`} /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Event Card ─────────────────────────────────────────────────
function EventCard({ evt, isReadOnly, onDelete }: { evt: Event; isReadOnly: boolean; onDelete: (id: string) => void }) {
  const catClass = categoryMeta[evt.category] ?? categoryMeta.other;
  return (
    <div className="bg-white border border-[#E8DDD0] rounded-2xl shadow-sm hover:shadow-md hover:border-[var(--color-heritage-gold)]/40 transition-all flex flex-col overflow-hidden group">
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-start gap-2">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${catClass}`}>
            {evt.category}
          </span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {evt.isFeatured && <Star size={13} className="text-[var(--color-heritage-gold)] fill-[var(--color-heritage-gold)]" />}
            <button disabled={isReadOnly} onClick={() => onDelete(evt.id)}
              className="p-1.5 rounded-lg text-[#C8B99A] hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer disabled:opacity-30">
              <Trash2 size={13} />
            </button>
          </div>
        </div>
        <div>
          <h3 className="font-display font-black text-sm text-[#1C1208] leading-snug mb-1">{evt.title}</h3>
          <p className="text-[11px] text-[#7A6A57] leading-relaxed font-light line-clamp-2">{evt.description}</p>
        </div>
        <div className="border-t border-[#E8DDD0] pt-3 mt-auto space-y-1.5">
          <div className="flex items-center gap-2 text-[10px] text-[#7A6A57] font-semibold">
            <Calendar size={11} className="text-[var(--color-heritage-gold)] shrink-0" />
            {formatDate(evt.date)}{evt.endDate ? ` — ${formatDate(evt.endDate)}` : ""}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#7A6A57] font-semibold">
            <MapPin size={11} className="text-[var(--color-heritage-gold)] shrink-0" />
            <span className="truncate">{evt.venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Add Service Modal ──────────────────────────────────────────
function AddServiceModal({ onClose, onAdd }: {
  onClose: () => void;
  onAdd: (s: Omit<Service, "id" | "icon">) => void;
}) {
  const [form, setForm] = useState<Partial<Service>>({
    title: "", description: "", color: "gold", features: ["", ""],
  });

  return (
    <Modal title="Add Performance Service" onClose={onClose}>
      <form
        onSubmit={(e) => { e.preventDefault(); onAdd({ title: form.title!, description: form.description!, color: form.color!, features: form.features!.filter(Boolean) }); }}
        className="p-6 space-y-4 text-xs"
      >
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Service Title *</label>
          <input required type="text" placeholder="e.g. Masterclass Drumming Program" className="form-input text-xs"
            value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Description *</label>
          <textarea required rows={3} placeholder="Duration, scope, and what's included…" className="form-input text-xs resize-none"
            value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-2 block">Accent Colour</label>
          <div className="flex gap-2">
            {(["gold", "red", "green"] as const).map((c) => {
              const cm = colorMeta[c];
              return (
                <button key={c} type="button" onClick={() => setForm({ ...form, color: c })}
                  className={`flex-1 flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer text-[10px] font-bold ${
                    form.color === c ? `${cm.badge} shadow-sm` : "border-[#E8DDD0] hover:bg-[#FAF7F2] text-[#7A6A57]"
                  }`}>
                  <span className={`w-3 h-3 rounded-full shrink-0 ${cm.dot}`} />
                  {cm.label.split(" ")[1]}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Key Features</label>
          <div className="space-y-2">
            {[0, 1].map((i) => (
              <input key={i} required type="text" placeholder={`Feature ${i + 1} (e.g. 24-member troupe)`}
                className="form-input text-xs"
                value={form.features?.[i] ?? ""}
                onChange={(e) => { const f = [...(form.features ?? [])]; f[i] = e.target.value; setForm({ ...form, features: f }); }} />
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-3 border-t border-[#E8DDD0]">
          <button type="button" onClick={onClose} className="btn-outline text-xs px-4 py-2 rounded-xl cursor-pointer">Cancel</button>
          <button type="submit" className="btn-primary text-xs px-4 py-2 rounded-xl shadow-lg cursor-pointer">Create Service</button>
        </div>
      </form>
    </Modal>
  );
}

// ── Add Event Modal ────────────────────────────────────────────
function AddEventModal({ onClose, onAdd }: {
  onClose: () => void;
  onAdd: (e: Omit<Event, "id">) => void;
}) {
  const [form, setForm] = useState<Partial<Event>>({
    title: "", description: "", date: "", venue: "",
    category: "performance",
    imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.25.jpeg",
    isFeatured: false,
  });

  return (
    <Modal title="Schedule New Event" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd({
            title: form.title!, description: form.description!,
            date: form.date!, venue: form.venue!,
            category: form.category!, imageUrl: form.imageUrl!,
            isFeatured: form.isFeatured ?? false,
          });
        }}
        className="p-6 space-y-4 text-xs"
      >
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Event Title *</label>
          <input required type="text" placeholder="e.g. Hogbetsotso Cultural Showcase" className="form-input text-xs"
            value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Description *</label>
          <textarea required rows={3} placeholder="Outline performance details and highlights…" className="form-input text-xs resize-none"
            value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Event Date *</label>
            <input required type="date" className="form-input text-xs" value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Category *</label>
            <select className="form-input text-xs" value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Event["category"] })}>
              <option value="performance">Stage Performance</option>
              <option value="festival">Cultural Festival</option>
              <option value="workshop">Workshop</option>
              <option value="exhibition">Exhibition</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[#7A6A57] mb-1.5 block">Venue *</label>
          <input required type="text" placeholder="e.g. Ho Cultural Centre, Volta Region" className="form-input text-xs"
            value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
        </div>
        <label className="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0] cursor-pointer hover:bg-[#F2EBE0] transition-colors">
          <input type="checkbox" className="w-4 h-4 accent-[var(--color-heritage-gold)]"
            checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
          <div>
            <p className="font-bold text-[#1C1208]">Pin as Featured Event</p>
            <p className="text-[10px] text-[#7A6A57] font-light mt-0.5">Highlights this event at the top of the public Events page</p>
          </div>
        </label>
        <div className="flex justify-end gap-2 pt-3 border-t border-[#E8DDD0]">
          <button type="button" onClick={onClose} className="btn-outline text-xs px-4 py-2 rounded-xl cursor-pointer">Cancel</button>
          <button type="submit" className="btn-primary text-xs px-4 py-2 rounded-xl shadow-lg cursor-pointer">Schedule Event</button>
        </div>
      </form>
    </Modal>
  );
}

// ── Main Page ──────────────────────────────────────────────────
export default function AdminProductsEvents() {
  const { state, addEvent, deleteEvent, addService, deleteService, currentUser } = useCms();
  const [activeTab, setActiveTab] = useState<"services" | "events">("services");
  const [addOpen, setAddOpen]     = useState(false);

  const isReadOnly = currentUser.role === "contributor";

  const handleDeleteService = (id: string) => {
    if (isReadOnly) return;
    if (!confirm("Delete this service?")) return;
    deleteService(id);
  };

  const handleDeleteEvent = (id: string) => {
    if (isReadOnly) return;
    if (!confirm("Delete this event?")) return;
    deleteEvent(id);
  };

  const handleAddService = (data: Omit<Service, "id" | "icon">) => {
    addService(data);
    setAddOpen(false);
  };

  const handleAddEvent = (data: Omit<Event, "id">) => {
    addEvent(data);
    setAddOpen(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-heritage-gold)] mb-1">Catalogue</p>
          <h1 className="font-display text-2xl font-black text-[#1C1208] tracking-tight">Products & Events</h1>
          <p className="text-xs text-[#7A6A57] mt-1">Manage performance service packages and the upcoming events schedule.</p>
        </div>
        <button disabled={isReadOnly} onClick={() => setAddOpen(true)}
          className="btn-primary flex items-center gap-1.5 text-xs py-2.5 px-4 rounded-xl disabled:opacity-50 cursor-pointer shrink-0">
          <Plus size={14} /> Add {activeTab === "services" ? "Service" : "Event"}
        </button>
      </div>

      {isReadOnly && (
        <div className="flex items-center gap-2.5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-semibold">
          <AlertTriangle size={14} className="shrink-0" />
          View-Only: your role cannot add or remove catalogue items.
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-[#FAF7F2] border border-[#E8DDD0] rounded-xl w-fit">
        {([["services", "Performances & Services"], ["events", "Upcoming Events"]] as const).map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab
                ? "bg-white shadow-sm text-[#1C1208] border border-[#E8DDD0]"
                : "text-[#7A6A57] hover:text-[#1C1208]"
            }`}>
            {label} ({tab === "services" ? state.services.length : state.events.length})
          </button>
        ))}
      </div>

      {/* Grid */}
      {activeTab === "services" ? (
        state.services.length === 0 ? (
          <EmptyState icon={Music} label="No services yet" sub="Add your first performance package above" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {state.services.map((svc) => (
              <ServiceCard key={svc.id} svc={svc} isReadOnly={isReadOnly} onDelete={handleDeleteService} />
            ))}
          </div>
        )
      ) : (
        state.events.length === 0 ? (
          <EmptyState icon={Calendar} label="No events scheduled" sub="Schedule your first event above" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {state.events.map((evt) => (
              <EventCard key={evt.id} evt={evt} isReadOnly={isReadOnly} onDelete={handleDeleteEvent} />
            ))}
          </div>
        )
      )}

      {/* Modals */}
      {addOpen && activeTab === "services" && <AddServiceModal onClose={() => setAddOpen(false)} onAdd={handleAddService} />}
      {addOpen && activeTab === "events"   && <AddEventModal   onClose={() => setAddOpen(false)} onAdd={handleAddEvent} />}
    </div>
  );
}

function EmptyState({ icon: Icon, label, sub }: { icon: React.ElementType; label: string; sub: string }) {
  return (
    <div className="bg-white border border-dashed border-[#E8DDD0] rounded-2xl p-16 flex flex-col items-center text-center gap-3">
      <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8DDD0] flex items-center justify-center text-[#C8B99A]">
        <Icon size={22} />
      </div>
      <p className="font-display font-black text-sm text-[#1C1208]">{label}</p>
      <p className="text-xs text-[#7A6A57] font-light">{sub}</p>
    </div>
  );
}
