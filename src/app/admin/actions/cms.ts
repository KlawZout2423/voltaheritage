"use server";

import { createClient } from "@/lib/supabase/server";
import { Booking, UserAccount, CmsState, BlogPost } from "@/context/CmsContext";
import { Event, Service, HeritageCategory, HeritageItem } from "@/lib/types";
import { v2 as cloudinary } from "cloudinary";

// Helper to handle casing differences between DB and UI if needed
function mapBookingFromDB(b: any): Booking {
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

function mapEventFromDB(e: any): Event {
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

function mapServiceFromDB(s: any): Service {
  return {
    id: s.id,
    title: s.title,
    description: s.description,
    icon: s.icon,
    color: s.color,
    features: s.features || [],
  };
}

function mapUserFromDB(u: any): UserAccount {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
  };
}

function mapBlogPostFromDB(b: any): BlogPost {
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

// ============================================================================
// DATA FETCHING (Used by AdminLayout to seed context)
// ============================================================================

export async function getCmsData() {
  const supabase = await createClient();

  // Fetch all required tables
  const [
    { data: bookings },
    { data: events },
    { data: services },
    { data: settingsData },
    { data: users },
    { data: blogPosts },
    { data: pillars },
    { data: items }
  ] = await Promise.all([
    supabase.from("bookings").select("*").order("created_at", { ascending: false }),
    supabase.from("events").select("*").order("date", { ascending: true }),
    supabase.from("services").select("*").order("created_at", { ascending: true }),
    supabase.from("cms_settings").select("*").limit(1).maybeSingle(),
    supabase.from("admin_users").select("*").order("name", { ascending: true }),
    supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
    supabase.from("heritage_pillars").select("*").order("created_at", { ascending: true }),
    supabase.from("heritage_items").select("*").order("created_at", { ascending: true })
  ]);

  const mappedPillars: HeritageCategory[] = (pillars || []).map((p: any) => {
    const pillarItems = (items || [])
      .filter((it: any) => it.pillar_id === p.id)
      .map((it: any) => ({
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
    bookings: (bookings || []).map(mapBookingFromDB),
    events: (events || []).map(mapEventFromDB),
    services: (services || []).map(mapServiceFromDB),
    users: (users || []).map(mapUserFromDB),
    blogPosts: (blogPosts || []).map(mapBlogPostFromDB),
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
  const updatePayload: any = {};
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
  const payload: any = {
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
  return mapEventFromDB(data);
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
  const payload: any = {
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
  return mapServiceFromDB(data);
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
  const payload: any = {
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
  return mapBlogPostFromDB(data);
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
    const { data, error } = await supabase.storage
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
  } catch (supabaseError: any) {
    console.warn(`[Upload] Supabase upload failed (${supabaseError.message}). Falling back to Cloudinary...`);
    
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
    } catch (cloudinaryError: any) {
      console.error("[Upload] Cloudinary fallback failed:", cloudinaryError.message);
      throw new Error(`Upload failed on both Supabase and Cloudinary. Supabase: ${supabaseError.message}. Cloudinary: ${cloudinaryError.message}`);
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

