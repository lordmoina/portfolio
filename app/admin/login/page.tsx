"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      });
      if (res.ok) {
        router.push("/admin/general");
      } else {
        setError("ACCESS DENIED");
      }
    } catch {
      setError("CONNECTION ERROR");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#080b12] grid-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="font-['Share_Tech_Mono'] text-[#00c8ff] text-xl tracking-widest mb-1">
            R_SILVA
          </p>
          <p className="font-['Share_Tech_Mono'] text-[#00c8ff]/40 text-xs tracking-widest">
            // ADMIN PANEL
          </p>
        </div>

        {/* Form card */}
        <div className="relative border border-[#1e2d3d] bg-[#0d1117] p-8 rounded-sm">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00c8ff]/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00c8ff]/40" />

          <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-6">
            // AUTHENTICATION REQUIRED
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="border border-[#ff2d6b]/30 bg-[#ff2d6b]/5 px-3 py-2 rounded-sm">
                <p className="font-['Share_Tech_Mono'] text-xs text-[#ff2d6b] tracking-widest">
                  ✕ {error}
                </p>
              </div>
            )}

            <div>
              <label className="block font-['Share_Tech_Mono'] text-xs text-slate-400 tracking-widest mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#080b12] border border-[#1e2d3d] focus:border-[#00c8ff] focus:outline-none text-slate-200 px-3 py-2.5 rounded-sm text-sm font-['Share_Tech_Mono'] tracking-widest transition-colors placeholder-slate-700"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 bg-[#00c8ff] text-[#080b12] font-bold font-['Share_Tech_Mono'] text-sm tracking-widest rounded-sm hover:bg-[#00c8ff]/90 hover:shadow-[0_0_24px_rgba(0,200,255,0.3)] transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "VERIFYING..." : "ACCESS"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
