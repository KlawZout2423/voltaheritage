"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const supabase = createClient();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("error") === "unauthorized") {
        setTimeout(() => {
          setError("Your account is not authorized to access the CMS portal. Please sign in with an administrator account.");
        }, 0);
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#1C1208] flex items-center justify-center p-4">

      {/* Kente strip top */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 kente-strip" />

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative w-full max-w-sm">

        {/* Logo card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-heritage-gold)] shadow-xl shadow-[var(--color-heritage-gold)]/30 mb-4">
            <span className="font-black text-white text-lg">VH</span>
          </div>
          <h1 className="font-display font-black text-2xl text-white tracking-tight">
            Volta Heritage
          </h1>
          <p className="text-[11px] font-black uppercase tracking-widest text-[var(--color-heritage-gold)] mt-1">
            CMS Portal
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-7 shadow-2xl">
          <h2 className="font-display font-black text-lg text-white mb-1">
            Sign in to Admin
          </h2>
          <p className="text-[11px] text-white/40 font-medium mb-6">
            Use your Supabase Auth credentials
          </p>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl mb-5 text-xs text-red-400 font-medium">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/50">
                Email Address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="you@voltaheritage.art"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.08] border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[var(--color-heritage-gold)]/40 focus:border-[var(--color-heritage-gold)]/60 transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/50">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.08] border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[var(--color-heritage-gold)]/40 focus:border-[var(--color-heritage-gold)]/60 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 px-3.5 flex items-center text-white/30 hover:text-white/70 transition-colors cursor-pointer"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 mt-2 bg-[var(--color-heritage-gold)] hover:bg-[var(--color-heritage-gold-dark)] text-white font-bold text-sm rounded-xl shadow-lg shadow-[var(--color-heritage-gold)]/25 transition-all disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 size={15} className="animate-spin" /> Signing in…</>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-[10px] text-white/20 font-medium mt-6">
          Access is restricted to authorised team members only.
        </p>
      </div>
    </div>
  );
}
