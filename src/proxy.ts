import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export default async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session so it doesn't expire
  const { data: { user } } = await supabase.auth.getUser();

  // Role validation: check if user is an authorised active admin/editor/contributor
  let isAuthorizedAdmin = false;
  if (user) {
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("role, status")
      .eq("id", user.id)
      .single();

    if (adminUser && adminUser.status === "active" && ["admin", "editor", "contributor"].includes(adminUser.role)) {
      isAuthorizedAdmin = true;
    }
  }

  // Protect all /admin routes except /admin/login
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage  = request.nextUrl.pathname === "/admin/login";

  // Redirect to login if accessing admin routes and not authorized
  if (isAdminRoute && !isLoginPage && !isAuthorizedAdmin) {
    if (user) {
      await supabase.auth.signOut();
    }
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(loginUrl);
  }

  // Already logged in and authorized — redirect away from login page
  if (isLoginPage && isAuthorizedAdmin) {
    const dashUrl = request.nextUrl.clone();
    dashUrl.pathname = "/admin/dashboard";
    return NextResponse.redirect(dashUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
