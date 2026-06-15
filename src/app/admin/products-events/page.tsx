"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Calendar, Tag, DollarSign, X } from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { Service, Event } from "@/lib/types";

export default function AdminProductsEvents() {
  const { state, updateDraft, publishState, currentUser } = useCms();
  const [activeTab, setActiveTab] = useState<"services" | "events">("services");
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [serviceForm, setServiceForm] = useState<Partial<Service>>({
    title: "",
    description: "",
    color: "gold",
    features: ["", ""],
  });

  const [eventForm, setEventForm] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: "",
    venue: "",
    category: "performance",
    imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.25.jpeg",
    isFeatured: false,
  });

  const isReadOnly = currentUser.role === "contributor";

  // Handle delete service
  const handleDeleteService = (id: string) => {
    if (isReadOnly) return;
    if (confirm("Are you sure you want to delete this service?")) {
      const updated = state.services.filter((s) => s.id !== id);
      updateDraft((prev) => ({ ...prev, services: updated }));
      publishState(); // auto publish catalog updates
    }
  };

  // Handle delete event
  const handleDeleteEvent = (id: string) => {
    if (isReadOnly) return;
    if (confirm("Are you sure you want to delete this event?")) {
      const updated = state.events.filter((e) => e.id !== id);
      updateDraft((prev) => ({ ...prev, events: updated }));
      publishState(); // auto publish catalog updates
    }
  };

  // Submit service form
  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;

    const newService: Service = {
      id: `svc-${Date.now()}`,
      title: serviceForm.title || "Untitled Performance",
      description: serviceForm.description || "",
      icon: "Music",
      color: serviceForm.color || "gold",
      features: serviceForm.features?.filter(Boolean) || [],
    };

    updateDraft((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
    publishState(); // auto publish to live catalog

    setModalOpen(false);
    setServiceForm({ title: "", description: "", color: "gold", features: ["", ""] });
  };

  // Submit event form
  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;

    const newEvent: Event = {
      id: `evt-${Date.now()}`,
      title: eventForm.title || "Untitled Event",
      description: eventForm.description || "",
      date: eventForm.date || new Date().toISOString().split("T")[0],
      venue: eventForm.venue || "Volta Region, Ghana",
      category: eventForm.category || "performance",
      imageUrl: eventForm.imageUrl || "/images/WhatsApp Image 2026-06-02 at 10.54.25.jpeg",
      isFeatured: eventForm.isFeatured || false,
    };

    updateDraft((prev) => ({
      ...prev,
      events: [newEvent, ...prev.events],
    }));
    publishState(); // auto publish to live catalog

    setModalOpen(false);
    setEventForm({
      title: "",
      description: "",
      date: "",
      venue: "",
      category: "performance",
      imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.25.jpeg",
      isFeatured: false,
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center bg-white border border-[#E8DDD0] rounded-2xl p-6 shadow-sm">
        <div>
          <h1 className="font-display text-2xl font-black text-[#1C1208]">Products & Events Catalog</h1>
          <p className="text-xs text-[#7A6A57] mt-0.5">
            Manage your service package pricing, descriptions, and dynamic upcoming event schedules.
          </p>
        </div>
        <button
          disabled={isReadOnly}
          onClick={() => setModalOpen(true)}
          className="btn-primary text-xs flex items-center gap-2 py-2.5 px-4 rounded-xl disabled:opacity-50 cursor-pointer"
        >
          <Plus size={14} /> Add {activeTab === "services" ? "Service" : "Event"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#E8DDD0] pb-px">
        <button
          onClick={() => setActiveTab("services")}
          className={`px-4 py-2.5 text-xs font-black capitalize select-none transition-colors border-b-2 cursor-pointer ${
            activeTab === "services"
              ? "border-[var(--color-heritage-gold)] text-[var(--color-heritage-gold-dark)]"
              : "border-transparent text-[#7A6A57] hover:text-[#1C1208]"
          }`}
        >
          Performances & Services ({state.services.length})
        </button>
        <button
          onClick={() => setActiveTab("events")}
          className={`px-4 py-2.5 text-xs font-black capitalize select-none transition-colors border-b-2 cursor-pointer ${
            activeTab === "events"
              ? "border-[var(--color-heritage-gold)] text-[var(--color-heritage-gold-dark)]"
              : "border-transparent text-[#7A6A57] hover:text-[#1C1208]"
          }`}
        >
          Upcoming Events ({state.events.length})
        </button>
      </div>

      {/* Grid of Items */}
      {activeTab === "services" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.services.map((svc) => (
            <div
              key={svc.id}
              className={`bg-white border border-[#E8DDD0] rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-[var(--color-heritage-gold)] transition-colors card-${svc.color}`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      svc.color === "gold"
                        ? "bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)]"
                        : svc.color === "red"
                        ? "bg-[var(--color-heritage-red-light)] text-[var(--color-heritage-red)]"
                        : "bg-[var(--color-heritage-green-light)] text-[var(--color-heritage-green)]"
                    }`}
                  >
                    {svc.color} package
                  </span>
                  <button
                    disabled={isReadOnly}
                    onClick={() => handleDeleteService(svc.id)}
                    className="p-1.5 rounded-lg hover:bg-[var(--color-heritage-red-light)]/40 text-[#7A6A57] hover:text-[var(--color-heritage-red)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <h3 className="font-display font-black text-base text-[#1C1208] mb-2">{svc.title}</h3>
                <p className="text-xs text-[#7A6A57] leading-relaxed mb-4 font-light">{svc.description}</p>
              </div>

              <div className="border-t border-[#E8DDD0] pt-4 mt-2">
                <p className="text-[10px] font-black uppercase text-[#7A6A57] tracking-wider mb-2">Key Features</p>
                <ul className="space-y-1 text-[11px] text-[#7A6A57] font-medium">
                  {svc.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-heritage-gold)] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.events.map((evt) => (
            <div
              key={evt.id}
              className="bg-white border border-[#E8DDD0] rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-[var(--color-heritage-gold)] transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#FAF7F2] border border-[#E8DDD0] text-[#7A6A57]">
                    {evt.category}
                  </span>
                  <div className="flex gap-1">
                    <button
                      disabled={isReadOnly}
                      onClick={() => handleDeleteEvent(evt.id)}
                      className="p-1.5 rounded-lg hover:bg-[var(--color-heritage-red-light)]/40 text-[#7A6A57] hover:text-[var(--color-heritage-red)] transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                <h3 className="font-display font-black text-base text-[#1C1208] mb-2">{evt.title}</h3>
                <p className="text-xs text-[#7A6A57] leading-relaxed mb-4 line-clamp-3 font-light">{evt.description}</p>
              </div>

              <div className="border-t border-[#E8DDD0] pt-4 mt-2 space-y-1.5 text-[10px] text-[#7A6A57] font-semibold">
                <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-[var(--color-heritage-gold)]" />
                  <span>Date: {evt.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={12} className="text-[var(--color-heritage-gold)]" />
                  <span>Venue: {evt.venue}</span>
                </div>
                {evt.isFeatured && (
                  <span className="badge badge-gold bg-[var(--color-heritage-gold-light)]/80 text-[8px] mt-1 shadow-none inline-block">
                    ★ Featured Event
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add Item Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#E8DDD0] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-[#E8DDD0]">
              <h3 className="font-display font-black text-lg text-[#1C1208]">
                Add New {activeTab === "services" ? "Performance Service" : "Upcoming Event"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-[#7A6A57] hover:text-[#1C1208] transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            {activeTab === "services" ? (
              <form onSubmit={handleServiceSubmit} className="p-5 space-y-4 text-xs">
                <div>
                  <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Service Title *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Masterclass Drumming Program"
                    className="form-input text-xs"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Description *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide pricing, duration, and performance specs..."
                    className="form-input text-xs resize-none"
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Accent Color Profile *</label>
                    <select
                      className="form-input text-xs"
                      value={serviceForm.color}
                      onChange={(e) => setServiceForm({ ...serviceForm, color: e.target.value as any })}
                    >
                      <option value="gold">Gold Accent</option>
                      <option value="red">Red Accent</option>
                      <option value="green">Green Accent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Key Features (max 2) *</label>
                  <div className="space-y-2">
                    <input
                      required
                      type="text"
                      placeholder="Feature 1 (e.g. 24-member troupe)"
                      className="form-input text-xs"
                      value={serviceForm.features?.[0] || ""}
                      onChange={(e) => {
                        const feats = [...(serviceForm.features || [])];
                        feats[0] = e.target.value;
                        setServiceForm({ ...serviceForm, features: feats });
                      }}
                    />
                    <input
                      required
                      type="text"
                      placeholder="Feature 2 (e.g. Traditional kente costumes)"
                      className="form-input text-xs"
                      value={serviceForm.features?.[1] || ""}
                      onChange={(e) => {
                        const feats = [...(serviceForm.features || [])];
                        feats[1] = e.target.value;
                        setServiceForm({ ...serviceForm, features: feats });
                      }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DDD0] flex justify-end gap-2.5">
                  <button type="button" onClick={() => setModalOpen(false)} className="btn-outline text-xs px-4 py-2 rounded-xl">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs px-4 py-2 rounded-xl shadow-lg">
                    Create Service
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleEventSubmit} className="p-5 space-y-4 text-xs">
                <div>
                  <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Event Title *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Hogbetsotso Festival Gala"
                    className="form-input text-xs"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Description *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Outline performance details, tickets, and highlights..."
                    className="form-input text-xs resize-none"
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Event Date *</label>
                    <input
                      required
                      type="date"
                      className="form-input text-xs"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Category *</label>
                    <select
                      className="form-input text-xs"
                      value={eventForm.category}
                      onChange={(e) => setEventForm({ ...eventForm, category: e.target.value as any })}
                    >
                      <option value="performance">Stage Performance</option>
                      <option value="festival">Cultural Festival</option>
                      <option value="workshop">Interactive Workshop</option>
                      <option value="exhibition">Exhibition Showcase</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label font-bold text-[#1C1208] mb-1.5 block">Venue Location *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Volta Regional Museum, Ho"
                    className="form-input text-xs"
                    value={eventForm.venue}
                    onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                  />
                </div>

                <div className="flex items-center gap-2 p-1.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDD0]">
                  <input
                    type="checkbox"
                    id="evt-featured"
                    className="w-4 h-4 accent-[var(--color-heritage-gold)]"
                    checked={eventForm.isFeatured}
                    onChange={(e) => setEventForm({ ...eventForm, isFeatured: e.target.checked })}
                  />
                  <label htmlFor="evt-featured" className="font-bold text-[#1c1208]">
                    Pin as Featured Event (Highlights at top of Events page)
                  </label>
                </div>

                <div className="pt-3 border-t border-[#E8DDD0] flex justify-end gap-2.5">
                  <button type="button" onClick={() => setModalOpen(false)} className="btn-outline text-xs px-4 py-2 rounded-xl">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs px-4 py-2 rounded-xl shadow-lg">
                    Schedule Event
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
