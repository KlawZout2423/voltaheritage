"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { services as defaultServices, events as defaultEvents } from "@/lib/data";
import { Service, Event } from "@/lib/types";

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  enquiryType: string;
  eventDate?: string;
  venueLocation?: string;
  audienceSize?: string;
  participantCount?: string;
  targetAge?: string;
  groupSize?: string;
  subject: string;
  message: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "contributor";
  status: "active" | "invited";
}

export interface HeroData {
  location: string;
  title: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  stats: { value: string; label: string }[];
}

export interface CmsSettings {
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  primaryColorAccent: "gold" | "red" | "green";
}

export interface CmsState {
  sectionsOrder: string[];
  sectionVisibility: Record<string, boolean>;
  heroContent: HeroData;
  services: Service[];
  events: Event[];
  bookings: Booking[];
  users: UserAccount[];
  settings: CmsSettings;
}

interface CmsContextType {
  state: CmsState;
  draftState: CmsState;
  updateDraft: (updater: (prev: CmsState) => CmsState) => void;
  saveDraft: () => void;
  publishState: () => void;
  resetAll: () => void;
  addBooking: (booking: Omit<Booking, "id" | "status" | "createdAt">) => void;
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
  deleteBooking: (id: string) => void;
  currentUser: UserAccount;
  setCurrentUserRole: (role: UserAccount["role"]) => void;
}

const defaultHeroContent: HeroData = {
  location: "Ho, Volta Region, Ghana",
  title: "We Perform to Educate",
  subtitle: "Volta Heritage Dance Ensemble preserves and shares Ewe cultural traditions through authentic dance, drumming, storytelling, and education.",
  ctaPrimaryText: "Book Performance",
  ctaSecondaryText: "Watch Performances",
  stats: [
    { value: "20+", label: "Years Preserving Culture" },
    { value: "8+", label: "Countries Performed In" },
    { value: "24", label: "Active Performers" },
  ],
};

const defaultSettings: CmsSettings = {
  siteTitle: "Volta Heritage Dance Ensemble",
  siteDescription: "Preserving and sharing Ewe cultural traditions through authentic dance, drumming, storytelling, and education.",
  contactEmail: "info@voltaheritage.art",
  contactPhone: "+233 XX XXX XXXX",
  primaryColorAccent: "gold",
};

const defaultUsers: UserAccount[] = [
  { id: "usr-1", name: "Eugene Kingdom", email: "eugene@voltaheritage.art", role: "admin", status: "active" },
  { id: "usr-2", name: "Kofi Mensah", email: "kofi.m@voltaheritage.art", role: "editor", status: "active" },
  { id: "usr-3", name: "Afua Adzo", email: "afua@voltaheritage.art", role: "contributor", status: "active" },
];

const defaultBookings: Booking[] = [
  {
    id: "bk-1",
    name: "Akosua Dake",
    email: "akosua.d@ghanafest.org",
    phone: "+233 24 412 3456",
    enquiryType: "performance",
    eventDate: "2026-11-20",
    venueLocation: "Accra International Conference Centre",
    audienceSize: "500-1000",
    subject: "GhanaFest Opening Ceremony Performance",
    message: "We would love to book the full ensemble for the grand opening ceremony on November 20th. We require a 30-minute high-energy Agbadza and Borborbor showcase.",
    status: "pending",
    createdAt: "2026-06-02T10:15:00Z",
  },
  {
    id: "bk-2",
    name: "Prof. John Larson",
    email: "j.larson@nyu.edu",
    phone: "+1 212 555 0192",
    enquiryType: "workshop",
    eventDate: "2026-08-25",
    venueLocation: "University of Ghana, Legon",
    audienceSize: "under-100",
    subject: "Study Abroad Cultural Immersion Workshop",
    message: "Requesting a drumming and dance workshop for 25 visiting students from NYU. We want a focus on Atsimevu notation and Husago migration movements.",
    status: "confirmed",
    createdAt: "2026-06-01T14:32:00Z",
  },
  {
    id: "bk-3",
    name: "Mawuli Gbeda",
    email: "mawuli@voltaholidays.com",
    phone: "+233 20 889 7766",
    enquiryType: "tourism",
    eventDate: "2026-07-12",
    venueLocation: "Agotime Kpetoe Kente Village",
    groupSize: "12",
    subject: "Private Tour Group Experience",
    message: "Booking a private cultural package for a group of French tourists. We want a Kente double-weave demonstration followed by a private drum circle performance.",
    status: "completed",
    createdAt: "2026-05-28T09:12:00Z",
  },
];

const initialCmsState: CmsState = {
  sectionsOrder: ["hero", "events", "heritage", "about", "services", "news", "connect"],
  sectionVisibility: {
    hero: true,
    events: true,
    heritage: true,
    about: true,
    services: true,
    news: true,
    connect: true,
  },
  heroContent: defaultHeroContent,
  services: defaultServices,
  events: defaultEvents,
  bookings: defaultBookings,
  users: defaultUsers,
  settings: defaultSettings,
};

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export function CmsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CmsState>(initialCmsState);
  const [draftState, setDraftState] = useState<CmsState>(initialCmsState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userRole, setUserRole] = useState<UserAccount["role"]>("admin");

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const storedPublished = localStorage.getItem("vhde_cms_published");
      const storedDraft = localStorage.getItem("vhde_cms_draft");
      const storedRole = localStorage.getItem("vhde_cms_role");

      if (storedPublished) {
        setState(JSON.parse(storedPublished));
      }
      if (storedDraft) {
        setDraftState(JSON.parse(storedDraft));
      } else if (storedPublished) {
        setDraftState(JSON.parse(storedPublished));
      }

      if (storedRole) {
        setUserRole(storedRole as UserAccount["role"]);
      }
    } catch (e) {
      console.error("Failed to load CMS data from local storage", e);
    }
    setIsLoaded(true);
  }, []);

  const updateDraft = (updater: (prev: CmsState) => CmsState) => {
    setDraftState((prev) => {
      const next = updater(prev);
      localStorage.setItem("vhde_cms_draft", JSON.stringify(next));
      return next;
    });
  };

  const saveDraft = () => {
    localStorage.setItem("vhde_cms_draft", JSON.stringify(draftState));
  };

  const publishState = () => {
    setState(draftState);
    localStorage.setItem("vhde_cms_published", JSON.stringify(draftState));
  };

  const resetAll = () => {
    localStorage.removeItem("vhde_cms_published");
    localStorage.removeItem("vhde_cms_draft");
    setState(initialCmsState);
    setDraftState(initialCmsState);
  };

  const addBooking = (newBookingData: Omit<Booking, "id" | "status" | "createdAt">) => {
    const freshBooking: Booking = {
      ...newBookingData,
      id: `bk-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Auto-update published state for bookings so they submit immediately!
    setState((prev) => {
      const updatedBookings = [freshBooking, ...prev.bookings];
      const next = { ...prev, bookings: updatedBookings };
      localStorage.setItem("vhde_cms_published", JSON.stringify(next));
      return next;
    });

    setDraftState((prev) => {
      const updatedBookings = [freshBooking, ...prev.bookings];
      const next = { ...prev, bookings: updatedBookings };
      localStorage.setItem("vhde_cms_draft", JSON.stringify(next));
      return next;
    });
  };

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      bookings: prev.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
    });

    // Sync bookings status immediately on actions
    setState((prev) => {
      const next = updater(prev);
      localStorage.setItem("vhde_cms_published", JSON.stringify(next));
      return next;
    });
    setDraftState((prev) => {
      const next = updater(prev);
      localStorage.setItem("vhde_cms_draft", JSON.stringify(next));
      return next;
    });
  };

  const deleteBooking = (id: string) => {
    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      bookings: prev.bookings.filter((b) => b.id !== id),
    });

    setState((prev) => {
      const next = updater(prev);
      localStorage.setItem("vhde_cms_published", JSON.stringify(next));
      return next;
    });
    setDraftState((prev) => {
      const next = updater(prev);
      localStorage.setItem("vhde_cms_draft", JSON.stringify(next));
      return next;
    });
  };

  const setCurrentUserRole = (role: UserAccount["role"]) => {
    setUserRole(role);
    localStorage.setItem("vhde_cms_role", role);
  };

  const currentUser: UserAccount = {
    id: "usr-1",
    name: "Eugene Kingdom",
    email: "eugene@voltaheritage.art",
    role: userRole,
    status: "active",
  };

  // Prevent hydration flicker by returning null or empty layouts until loaded
  if (!isLoaded) {
    return null;
  }

  return (
    <CmsContext.Provider
      value={{
        state,
        draftState,
        updateDraft,
        saveDraft,
        publishState,
        resetAll,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        currentUser,
        setCurrentUserRole,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error("useCms must be used within a CmsProvider");
  }
  return context;
}
