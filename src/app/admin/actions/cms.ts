"use server";

import { createClient } from "@/lib/supabase/server";
import { Booking, UserAccount, CmsState, BlogPost } from "@/context/CmsContext";
import { Event, Service, HeritageCategory, GalleryItem } from "@/lib/types";
import { v2 as cloudinary } from "cloudinary";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

interface DbGalleryItem {
  id: string;
  type: "photo" | "video";
  url: string;
  caption: string;
  category?: string | null;
  thumbnail_url?: string | null;
  storage_path?: string | null;
  created_at: string;
}

interface DbBooking {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  enquiry_type: string;
  event_date?: string | null;
  venue_location?: string | null;
  audience_size?: string | null;
  participant_count?: string | null;
  target_age?: string | null;
  group_size?: string | null;
  subject: string;
  message: string;
  status: Booking["status"];
  created_at: string;
}

interface DbEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  end_date?: string | null;
  venue: string;
  category: Event["category"];
  image_url: string;
  is_featured: boolean;
}

interface DbService {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: Service["color"];
  features: string[] | null;
}

interface DbUser {
  id: string;
  name: string;
  email: string;
  role: UserAccount["role"];
  status: UserAccount["status"];
}

interface DbBlogPost {
  id: string;
  title: string;
  content: string;
  media_type: BlogPost["mediaType"];
  media_url?: string | null;
  is_published: boolean;
  created_at: string;
}

interface DbPillar {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  color: string;
}

interface DbItem {
  id: string;
  pillar_id: string;
  name: string;
  description: string;
  significance: string;
  image_url: string;
}

// Helper to handle casing differences between DB and UI if needed
function mapBookingFromDB(b: DbBooking): Booking {
  return {
    id: b.id,
    name: b.name,
    email: b.email,
    phone: b.phone || undefined,
    enquiryType: b.enquiry_type,
    eventDate: b.event_date || undefined,
    venueLocation: b.venue_location || undefined,
    audienceSize: b.audience_size || undefined,
    participantCount: b.participant_count || undefined,
    targetAge: b.target_age || undefined,
    groupSize: b.group_size || undefined,
    subject: b.subject,
    message: b.message,
    status: b.status,
    createdAt: b.created_at,
  };
}

function mapEventFromDB(e: DbEvent): Event {
  return {
    id: e.id,
    title: e.title,
    description: e.description,
    date: e.date,
    endDate: e.end_date || undefined,
    venue: e.venue,
    category: e.category,
    imageUrl: e.image_url,
    isFeatured: e.is_featured,
  };
}

function mapServiceFromDB(s: DbService): Service {
  return {
    id: s.id,
    title: s.title,
    description: s.description,
    icon: s.icon,
    color: s.color,
    features: s.features || [],
  };
}

function mapUserFromDB(u: DbUser): UserAccount {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
  };
}

function mapBlogPostFromDB(b: DbBlogPost): BlogPost {
  return {
    id: b.id,
    title: b.title,
    content: b.content,
    mediaType: b.media_type,
    mediaUrl: b.media_url || undefined,
    isPublished: b.is_published,
    createdAt: b.created_at,
  };
}

function mapGalleryFromDB(g: DbGalleryItem): GalleryItem {
  return {
    id: g.id,
    type: g.type,
    url: g.url,
    caption: g.caption || "",
    category: g.category || undefined,
    thumbnailUrl: g.thumbnail_url || undefined,
  };
}

// ============================================================================
// DATA FETCHING (Used by AdminLayout to seed context)
// ============================================================================

export async function getCmsData() {
  try {
    const supabase = await createClient();

    // Fetch all required tables
    const [
      bookingsResult,
      eventsResult,
      servicesResult,
      settingsResult,
      usersResult,
      blogPostsResult,
      pillarsResult,
      itemsResult,
      galleryResult
    ] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("events").select("*").order("date", { ascending: true }),
      supabase.from("services").select("*").order("created_at", { ascending: true }),
      supabase.from("cms_settings").select("*").limit(1).maybeSingle(),
      supabase.from("admin_users").select("*").order("name", { ascending: true }),
      supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
      supabase.from("heritage_pillars").select("*").order("created_at", { ascending: true }),
      supabase.from("heritage_items").select("*").order("created_at", { ascending: true }),
      supabase.from("gallery").select("*").order("created_at", { ascending: false })
    ]);

    const bookings = bookingsResult.data;
    const events = eventsResult.data;
    const services = servicesResult.data;
    const settingsData = settingsResult.data;
    const users = usersResult.data;
    const blogPosts = blogPostsResult.data;
    const pillars = pillarsResult.data;
    const items = itemsResult.data;
    const gallery = galleryResult.data;

    const mappedPillars: HeritageCategory[] = ((pillars || []) as DbPillar[]).map((p: DbPillar) => {
      const pillarItems = ((items || []) as DbItem[])
        .filter((it: DbItem) => it.pillar_id === p.id)
        .map((it: DbItem) => ({
          id: it.id,
          name: it.name,
          description: it.description,
          significance: it.significance,
          imageUrl: it.image_url
        }));
      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        description: p.description,
        imageUrl: p.image_url,
        color: p.color as "gold" | "red" | "green",
        items: pillarItems
      };
    });

    return {
      bookings: ((bookings || []) as DbBooking[]).map(mapBookingFromDB),
      events: ((events || []) as DbEvent[]).map(mapEventFromDB),
      services: ((services || []) as DbService[]).map(mapServiceFromDB),
      users: ((users || []) as DbUser[]).map(mapUserFromDB),
      blogPosts: ((blogPosts || []) as DbBlogPost[]).map(mapBlogPostFromDB),
      gallery: ((gallery || []) as DbGalleryItem[]).map(mapGalleryFromDB),
      heritageCategories: mappedPillars,
      settings: settingsData ? {
        siteTitle: settingsData.site_title,
        siteDescription: settingsData.site_description,
        contactEmail: settingsData.contact_email,
        contactPhone: settingsData.contact_phone,
        primaryColorAccent: settingsData.primary_color_accent,
      } : null,
      heroContent: settingsData?.hero_content || null,
      sectionsOrder: settingsData?.sections_order || null,
      sectionVisibility: settingsData?.section_visibility || null,
    };
  } catch (error) {
    console.error("Error fetching CMS data from Supabase:", error);
    return {
      bookings: [],
      events: [],
      services: [],
      users: [],
      blogPosts: [],
      gallery: [],
      heritageCategories: [],
      settings: null,
      heroContent: null,
      sectionsOrder: null,
      sectionVisibility: null,
    };
  }
}

// ============================================================================
// BOOKINGS
// ============================================================================

export async function updateBookingStatusAction(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true };
}

export async function deleteBookingAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true };
}

// ============================================================================
// CMS SETTINGS & CONTENT
// ============================================================================

export async function updateCmsStateAction(newState: Partial<CmsState>) {
  const supabase = await createClient();

  // Extract what goes into cms_settings
  const updatePayload: Record<string, unknown> = {};
  if (newState.settings) {
    updatePayload.site_title = newState.settings.siteTitle;
    updatePayload.site_description = newState.settings.siteDescription;
    updatePayload.contact_email = newState.settings.contactEmail;
    updatePayload.contact_phone = newState.settings.contactPhone;
    updatePayload.primary_color_accent = newState.settings.primaryColorAccent;
  }
  if (newState.heroContent) {
    updatePayload.hero_content = newState.heroContent;
  }
  if (newState.sectionsOrder) {
    updatePayload.sections_order = newState.sectionsOrder;
  }
  if (newState.sectionVisibility) {
    updatePayload.section_visibility = newState.sectionVisibility;
  }

  if (Object.keys(updatePayload).length > 0) {
    // Hack to update the singleton row assuming there is only one
    const { error } = await supabase.from("cms_settings").update(updatePayload).neq("id", "00000000-0000-0000-0000-000000000000"); 
    if (error) throw new Error(error.message);
  }

  return { success: true };
}

// ============================================================================
// EVENTS (Draft)
// ============================================================================

export async function upsertEventAction(event: Partial<Event> & { id?: string }) {
  const supabase = await createClient();
  const payload: Record<string, unknown> = {
    title: event.title,
    description: event.description,
    date: event.date,
    end_date: event.endDate,
    venue: event.venue,
    category: event.category,
    image_url: event.imageUrl,
    is_featured: event.isFeatured,
  };
  
  if (event.id && !event.id.startsWith("evt-") && !event.id.startsWith("new-")) {
    payload.id = event.id;
  }

  const { data, error } = await supabase
    .from("events")
    .upsert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapEventFromDB(data as DbEvent);
}

export async function deleteEventAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true };
}

// ============================================================================
// SERVICES (Draft)
// ============================================================================

export async function upsertServiceAction(service: Partial<Service> & { id?: string }) {
  const supabase = await createClient();
  const payload: Record<string, unknown> = {
    title: service.title,
    description: service.description,
    icon: service.icon,
    color: service.color,
    features: service.features,
  };

  if (service.id && !service.id.startsWith("svc-") && !service.id.startsWith("new-")) {
    payload.id = service.id;
  }

  const { data, error } = await supabase
    .from("services")
    .upsert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapServiceFromDB(data as DbService);
}

export async function deleteServiceAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true };
}

// ============================================================================
// BLOG POSTS
// ============================================================================

export async function upsertBlogPostAction(post: Partial<BlogPost> & { id?: string }) {
  const supabase = await createClient();
  const payload: Record<string, unknown> = {
    title: post.title,
    content: post.content,
    media_type: post.mediaType,
    media_url: post.mediaUrl,
    is_published: post.isPublished,
  };

  if (post.id && !post.id.startsWith("new-post-") && !post.id.startsWith("new-")) {
    payload.id = post.id;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .upsert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapBlogPostFromDB(data as DbBlogPost);
}

export async function deleteBlogPostAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true };
}

export async function uploadMediaAction(base64Data: string, fileType: string) {
  const supabase = await createClient();

  const base64Content = base64Data.split(";base64,").pop();
  if (!base64Content) throw new Error("Invalid base64 media data");
  const buffer = Buffer.from(base64Content, "base64");

  const isVideo = fileType.startsWith("video/");
  const fileExt = fileType.split("/").pop() || (isVideo ? "mp4" : "png");
  const fileName = `upload-${Date.now()}.${fileExt}`;
  const bucketName = isVideo ? "videos" : "gallery";

  try {
    console.log(`[Upload] Attempting Supabase storage upload to bucket: ${bucketName}...`);
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, buffer, {
        contentType: fileType,
        upsert: true
      });

    if (error) {
      throw new Error(error.message);
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    console.log(`[Upload] Supabase upload succeeded! Public URL: ${publicUrl}`);
    return publicUrl;
  } catch (supabaseError) {
    const sError = supabaseError as Error;
    console.warn(`[Upload] Supabase upload failed (${sError.message}). Falling back to Cloudinary...`);
    
    try {
      if (!process.env.CLOUDINARY_URL) {
        throw new Error("CLOUDINARY_URL environment variable is missing");
      }
      
      const uploadResult = await cloudinary.uploader.upload(base64Data, {
        resource_type: "auto",
        folder: "volta_heritage_cms",
      });

      console.log(`[Upload] Cloudinary upload succeeded! URL: ${uploadResult.secure_url}`);
      return uploadResult.secure_url;
    } catch (cloudinaryError) {
      const cError = cloudinaryError as Error;
      console.error("[Upload] Cloudinary fallback failed:", cError.message);
      throw new Error(`Upload failed on both Supabase and Cloudinary. Supabase: ${sError.message}. Cloudinary: ${cError.message}`);
    }
  }
}

// ============================================================================
// LIVING ARCHIVE (HERITAGE PILLARS & ITEMS)
// ============================================================================

export async function upsertHeritagePillarAction(pillar: {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  color: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("heritage_pillars")
    .upsert({
      id: pillar.id.startsWith("new-") || pillar.id.startsWith("hc-") ? undefined : pillar.id,
      slug: pillar.slug,
      name: pillar.name,
      tagline: pillar.tagline,
      description: pillar.description,
      image_url: pillar.imageUrl,
      color: pillar.color,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function upsertHeritageItemAction(item: {
  id: string;
  pillarId: string;
  name: string;
  description: string;
  significance: string;
  imageUrl: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("heritage_items")
    .upsert({
      id: item.id.startsWith("new-") || item.id.startsWith("hc-") ? undefined : item.id,
      pillar_id: item.pillarId,
      name: item.name,
      description: item.description,
      significance: item.significance,
      image_url: item.imageUrl,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteHeritageItemAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("heritage_items")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true };
}

export async function upsertGalleryItemAction(item: Partial<GalleryItem> & { id?: string }) {
  const supabase = await createClient();
  const payload: Record<string, any> = {
    type: item.type || "photo",
    url: item.url,
    caption: item.caption || "",
    category: item.category || null,
    thumbnail_url: item.thumbnailUrl || null,
  };

  if (item.id && !item.id.startsWith("new-") && !item.id.startsWith("g-")) {
    payload.id = item.id;
  }

  const { data, error } = await supabase
    .from("gallery")
    .upsert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapGalleryFromDB(data as DbGalleryItem);
}

export async function deleteGalleryItemAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true };
}

export async function createCmsUserAction(name: string, email: string, role: "admin" | "editor" | "contributor", password: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase credentials for Admin API");
  }

  const supabaseAdmin = createSupabaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  });

  // 1. Create user in Supabase Auth
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name }
  });

  if (authError) {
    throw new Error(authError.message);
  }

  const userId = authData.user.id;

  // 2. Insert into public.admin_users
  const { data: userData, error: dbError } = await supabaseAdmin
    .from("admin_users")
    .upsert({
      id: userId,
      name,
      email,
      role,
      status: "active"
    })
    .select()
    .single();

  if (dbError) {
    await supabaseAdmin.auth.admin.deleteUser(userId);
    throw new Error(dbError.message);
  }

  return mapUserFromDB(userData);
}

export async function deleteCmsUserAction(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase credentials for Admin API");
  }

  const supabaseAdmin = createSupabaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  });

  // 1. Delete from public.admin_users
  const { error: dbError } = await supabaseAdmin
    .from("admin_users")
    .delete()
    .eq("id", id);

  if (dbError) throw new Error(dbError.message);

  // 2. Delete from Supabase Auth
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);
  if (authError) {
    console.error("Auth delete error for user:", id, authError);
  }

  return { success: true };
}

export async function updateCmsUserRoleAction(id: string, role: "admin" | "editor" | "contributor") {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("admin_users")
    .update({ role })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapUserFromDB(data);
}



