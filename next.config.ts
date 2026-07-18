import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseHost = "yxkdpcbsjrtwsupyzzxx.supabase.co"; // fallback default

if (supabaseUrl) {
  try {
    const url = new URL(supabaseUrl);
    supabaseHost = url.hostname;
  } catch (e) {
    console.error("Invalid NEXT_PUBLIC_SUPABASE_URL in config", e);
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHost,
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
