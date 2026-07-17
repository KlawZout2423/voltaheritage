"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { services as defaultServices, events as defaultEvents, heritageCategories as defaultHeritageCategories } from "@/lib/data";
import { Service, Event, HeritageCategory, HeritageItem } from "@/lib/types";
import {
  updateBookingStatusAction,
  deleteBookingAction,
  updateCmsStateAction,
  upsertEventAction,
  deleteEventAction,
  upsertServiceAction,
  deleteServiceAction,
  upsertBlogPostAction,
  deleteBlogPostAction,
  upsertHeritagePillarAction,
  upsertHeritageItemAction,
  deleteHeritageItemAction,
  getCmsData,
} from "@/app/admin/actions/cms";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  mediaType: "image" | "youtube" | "tiktok" | "cloudinary_video";
  mediaUrl?: string;
  isPublished: boolean;
  createdAt: string;
}

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
  blogPosts: BlogPost[];
  heritageCategories: HeritageCategory[];
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
  addEvent: (event: Omit<Event, "id">) => void;
  deleteEvent: (id: string) => void;
  addService: (service: Omit<Service, "id" | "icon">) => void;
  deleteService: (id: string) => void;
  addBlogPost: (post: Omit<BlogPost, "id" | "createdAt">) => void;
  deleteBlogPost: (id: string) => void;
  updateBlogPost: (post: BlogPost) => void;
  updateHeritagePillar: (pillar: HeritageCategory) => Promise<void>;
  addHeritageItem: (item: Omit<HeritageItem, "id"> & { pillarId: string }) => Promise<void>;
  updateHeritageItem: (item: HeritageItem & { pillarId: string }) => Promise<void>;
  deleteHeritageItem: (id: string, pillarId: string) => Promise<void>;
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
  contactPhone: "+233 24 952 7440",
  primaryColorAccent: "gold",
};

const defaultUsers: UserAccount[] = [
  { id: "usr-1", name: "Eugene Kingdom", email: "eugene@voltaheritage.art", role: "admin", status: "active" },
  { id: "usr-2", name: "Kofi Mensah", email: "kofi.m@voltaheritage.art", role: "editor", status: "active" },
  { id: "usr-3", name: "Afua Adzo", email: "afua@voltaheritage.art", role: "contributor", status: "active" },
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
  bookings: [],
  users: defaultUsers,
  settings: defaultSettings,
  blogPosts: [],
  heritageCategories: defaultHeritageCategories,
};

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export function CmsProvider({ children, initialData }: { children: ReactNode, initialData?: Partial<CmsState> }) {
  // Merge initial state
  const mergedInitialState = {
    ...initialCmsState,
    ...initialData,
    settings: initialData?.settings || initialCmsState.settings,
    heroContent: initialData?.heroContent || initialCmsState.heroContent,
    sectionsOrder: initialData?.sectionsOrder || initialCmsState.sectionsOrder,
    sectionVisibility: initialData?.sectionVisibility || initialCmsState.sectionVisibility,
  };

  const [state, setState] = useState<CmsState>(mergedInitialState);
  const [draftState, setDraftState] = useState<CmsState>(mergedInitialState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userRole, setUserRole] = useState<UserAccount["role"]>("admin");

  useEffect(() => {
    // Only restoring Role from localStorage for demo purposes
    try {
      const storedRole = localStorage.getItem("vhde_cms_role");
      if (storedRole) setUserRole(storedRole as UserAccount["role"]);
    } catch (e) {
      console.error(e);
    }

    // Client-side fetch if not seeded by layout (e.g. on public pages)
    if (!initialData) {
      getCmsData()
        .then((data) => {
          setState((prev) => ({
            ...prev,
            ...data,
            settings: data.settings || prev.settings,
            heroContent: data.heroContent || prev.heroContent,
            sectionsOrder: data.sectionsOrder || prev.sectionsOrder,
            sectionVisibility: data.sectionVisibility || prev.sectionVisibility,
          }));
          setDraftState((prev) => ({
            ...prev,
            ...data,
            settings: data.settings || prev.settings,
            heroContent: data.heroContent || prev.heroContent,
            sectionsOrder: data.sectionsOrder || prev.sectionsOrder,
            sectionVisibility: data.sectionVisibility || prev.sectionVisibility,
          }));
        })
        .catch((err) => console.error("Failed to fetch public CMS data:", err));
    }

    setIsLoaded(true);
  }, [initialData]);

  const updateDraft = (updater: (prev: CmsState) => CmsState) => {
    setDraftState(updater);
  };

  const saveDraft = () => {
    // Drafts are currently only in memory, but could be saved to local storage if desired
  };

  const publishState = async () => {
    // Optimistic update
    setState(draftState);
    
    try {
      await updateCmsStateAction({
        settings: draftState.settings,
        heroContent: draftState.heroContent,
        sectionsOrder: draftState.sectionsOrder,
        sectionVisibility: draftState.sectionVisibility,
      });
    } catch (error) {
      console.error("Failed to publish to Supabase", error);
      alert("Failed to save changes to database.");
    }
  };

  const resetAll = () => {
    setState(mergedInitialState);
    setDraftState(mergedInitialState);
  };

  // Add booking uses an API route or direct server action if we were calling it from frontend
  // For the CMS context, it's mostly used to simulate adding one, but realistically it's done via a public form
  const addBooking = (newBookingData: Omit<Booking, "id" | "status" | "createdAt">) => {
    const freshBooking: Booking = {
      ...newBookingData,
      id: `bk-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({ ...prev, bookings: [freshBooking, ...prev.bookings] }));
    setDraftState((prev) => ({ ...prev, bookings: [freshBooking, ...prev.bookings] }));
  };

  const updateBookingStatus = async (id: string, status: Booking["status"]) => {
    // Optimistic
    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      bookings: prev.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
    });
    setState(updater);
    setDraftState(updater);

    try {
      await updateBookingStatusAction(id, status);
    } catch (error) {
      console.error("Failed to update booking status", error);
      // Revert could be implemented here
    }
  };

  const deleteBooking = async (id: string) => {
    // Optimistic
    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      bookings: prev.bookings.filter((b) => b.id !== id),
    });
    setState(updater);
    setDraftState(updater);

    try {
      await deleteBookingAction(id);
    } catch (error) {
      console.error("Failed to delete booking", error);
    }
  };

  const addEvent = async (newEventData: Omit<Event, "id">) => {
    const tempId = `new-evt-${Date.now()}`;
    const freshEvent: Event = { ...newEventData, id: tempId };
    
    // Optimistic
    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      events: [freshEvent, ...prev.events],
    });
    setState(updater);
    setDraftState(updater);

    try {
      const dbEvent = await upsertEventAction(freshEvent);
      // Replace temp id with real id
      const swapUpdater = (prev: CmsState): CmsState => ({
        ...prev,
        events: prev.events.map((e) => e.id === tempId ? dbEvent : e),
      });
      setState(swapUpdater);
      setDraftState(swapUpdater);
    } catch (error) {
      console.error("Failed to add event", error);
    }
  };

  const deleteEvent = async (id: string) => {
    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    });
    setState(updater);
    setDraftState(updater);

    try {
      await deleteEventAction(id);
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  const addService = async (newServiceData: Omit<Service, "id" | "icon">) => {
    const tempId = `new-svc-${Date.now()}`;
    const freshService: Service = { ...newServiceData, id: tempId, icon: "Music" };

    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      services: [...prev.services, freshService],
    });
    setState(updater);
    setDraftState(updater);

    try {
      const dbService = await upsertServiceAction(freshService);
      const swapUpdater = (prev: CmsState): CmsState => ({
        ...prev,
        services: prev.services.map((s) => s.id === tempId ? dbService : s),
      });
      setState(swapUpdater);
      setDraftState(swapUpdater);
    } catch (error) {
      console.error("Failed to add service", error);
    }
  };

  const deleteService = async (id: string) => {
    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    });
    setState(updater);
    setDraftState(updater);

    try {
      await deleteServiceAction(id);
    } catch (error) {
      console.error("Failed to delete service", error);
    }
  };

  const addBlogPost = async (newPostData: Omit<BlogPost, "id" | "createdAt">) => {
    const tempId = `new-post-${Date.now()}`;
    const freshPost: BlogPost = {
      ...newPostData,
      id: tempId,
      createdAt: new Date().toISOString()
    };

    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      blogPosts: [freshPost, ...prev.blogPosts],
    });
    setState(updater);
    setDraftState(updater);

    try {
      const dbPost = await upsertBlogPostAction(freshPost);
      const swapUpdater = (prev: CmsState): CmsState => ({
        ...prev,
        blogPosts: prev.blogPosts.map((p) => p.id === tempId ? dbPost : p),
      });
      setState(swapUpdater);
      setDraftState(swapUpdater);
    } catch (error) {
      console.error("Failed to add blog post", error);
    }
  };

  const deleteBlogPost = async (id: string) => {
    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      blogPosts: prev.blogPosts.filter((p) => p.id !== id),
    });
    setState(updater);
    setDraftState(updater);

    try {
      await deleteBlogPostAction(id);
    } catch (error) {
      console.error("Failed to delete blog post", error);
    }
  };

  const updateBlogPost = async (post: BlogPost) => {
    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      blogPosts: prev.blogPosts.map((p) => p.id === post.id ? post : p),
    });
    setState(updater);
    setDraftState(updater);

    try {
      await upsertBlogPostAction(post);
    } catch (error) {
      console.error("Failed to update blog post", error);
    }
  };

  const updateHeritagePillar = async (pillar: HeritageCategory) => {
    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      heritageCategories: prev.heritageCategories.map((c) => c.id === pillar.id ? pillar : c),
    });
    setState(updater);
    setDraftState(updater);

    try {
      await upsertHeritagePillarAction({
        id: pillar.id,
        slug: pillar.slug,
        name: pillar.name,
        tagline: pillar.tagline,
        description: pillar.description,
        imageUrl: pillar.imageUrl,
        color: pillar.color,
      });
    } catch (error) {
      console.error("Failed to update heritage pillar", error);
    }
  };

  const addHeritageItem = async (newItemData: Omit<HeritageItem, "id"> & { pillarId: string }) => {
    const tempId = `new-item-${Date.now()}`;
    const freshItem: HeritageItem = {
      id: tempId,
      name: newItemData.name,
      description: newItemData.description,
      significance: newItemData.significance,
      imageUrl: newItemData.imageUrl,
    };

    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      heritageCategories: prev.heritageCategories.map((c) => {
        if (c.id === newItemData.pillarId) {
          return { ...c, items: [...c.items, freshItem] };
        }
        return c;
      }),
    });
    setState(updater);
    setDraftState(updater);

    try {
      const dbItem = await upsertHeritageItemAction({
        id: tempId,
        pillarId: newItemData.pillarId,
        name: newItemData.name,
        description: newItemData.description,
        significance: newItemData.significance,
        imageUrl: newItemData.imageUrl,
      });
      const swapUpdater = (prev: CmsState): CmsState => ({
        ...prev,
        heritageCategories: prev.heritageCategories.map((c) => {
          if (c.id === newItemData.pillarId) {
            return {
              ...c,
              items: c.items.map((it) => it.id === tempId ? {
                id: dbItem.id,
                name: dbItem.name,
                description: dbItem.description,
                significance: dbItem.significance,
                imageUrl: dbItem.image_url
              } : it)
            };
          }
          return c;
        }),
      });
      setState(swapUpdater);
      setDraftState(swapUpdater);
    } catch (error) {
      console.error("Failed to add heritage item", error);
    }
  };

  const updateHeritageItem = async (item: HeritageItem & { pillarId: string }) => {
    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      heritageCategories: prev.heritageCategories.map((c) => {
        if (c.id === item.pillarId) {
          return {
            ...c,
            items: c.items.map((it) => it.id === item.id ? item : it)
          };
        }
        return c;
      }),
    });
    setState(updater);
    setDraftState(updater);

    try {
      await upsertHeritageItemAction({
        id: item.id,
        pillarId: item.pillarId,
        name: item.name,
        description: item.description,
        significance: item.significance,
        imageUrl: item.imageUrl,
      });
    } catch (error) {
      console.error("Failed to update heritage item", error);
    }
  };

  const deleteHeritageItem = async (id: string, pillarId: string) => {
    const updater = (prev: CmsState): CmsState => ({
      ...prev,
      heritageCategories: prev.heritageCategories.map((c) => {
        if (c.id === pillarId) {
          return { ...c, items: c.items.filter((it) => it.id !== id) };
        }
        return c;
      }),
    });
    setState(updater);
    setDraftState(updater);

    try {
      await deleteHeritageItemAction(id);
    } catch (error) {
      console.error("Failed to delete heritage item", error);
    }
  };

  const setCurrentUserRole = (role: UserAccount["role"]) => {
    setUserRole(role);
    localStorage.setItem("vhde_cms_role", role);
  };

  // Build the current user based on users array if possible, else default
  const defaultUser = state.users.find(u => u.role === userRole) || {
    id: "usr-1",
    name: "Eugene Kingdom",
    email: "eugene@voltaheritage.art",
    role: userRole,
    status: "active",
  };

  const currentUser: UserAccount = {
    ...defaultUser,
    role: userRole,
  };

  if (!isLoaded) return null;

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
        addEvent,
        deleteEvent,
        addService,
        deleteService,
        addBlogPost,
        deleteBlogPost,
        updateBlogPost,
        updateHeritagePillar,
        addHeritageItem,
        updateHeritageItem,
        deleteHeritageItem,
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
