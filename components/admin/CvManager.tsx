"use client";

import { useRef, useState } from "react";
import type { Content } from "@/types/content";

interface CvManagerProps {
  initialContent: Content;
}

export default function CvManager({ initialContent }: CvManagerProps) {
  const [cvMeta, setCvMeta] = useState(initialContent.cv);
  const [showDownload, setShowDownload] = useState(initialContent.nav.showCvDownload);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "ok" | "err">("idle");
  const [toggleStatus, setToggleStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setUploadStatus("err");
      return;
    }
    setUploading(true);
    setUploadStatus("idle");
    try {
      const fd = new FormData();
      fd.append("cv", file);
      const res = await fetch("/api/admin/cv", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        setCvMeta({ filename: data.filename, uploadedAt: data.uploadedAt });
        setUploadStatus("ok");
        if (fileRef.current) fileRef.current.value = "";
      } else {
        setUploadStatus("err");
      }
    } catch {
      setUploadStatus("err");
    }
    setUploading(false);
    setTimeout(() => setUploadStatus("idle"), 3000);
  }

  async function handleToggle(val: boolean) {
    setToggleStatus("saving");
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nav: { ...initialContent.nav, showCvDownload: val },
          hero: initialContent.hero,
          about: initialContent.about,
          footer: initialContent.footer,
        }),
      });
      if (res.ok) {
        setShowDownload(val);
        setToggleStatus("ok");
      } else {
        setToggleStatus("err");
      }
    } catch {
      setToggleStatus("err");
    }
    setTimeout(() => setToggleStatus("idle"), 2500);
  }

  return (
    <div className="space-y-8">
      {/* Current status */}
      <div className="border border-[#1e2d3d] bg-[#0d1117] rounded-sm p-5">
        <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-4">
          // CURRENT CV
        </p>
        {cvMeta.filename ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-['Share_Tech_Mono'] text-xs text-slate-400">FILE:</span>
              <span className="font-['Share_Tech_Mono'] text-sm text-slate-200">
                {cvMeta.filename}
              </span>
            </div>
            {cvMeta.uploadedAt && (
              <div className="flex items-center gap-2">
                <span className="font-['Share_Tech_Mono'] text-xs text-slate-400">
                  UPLOADED:
                </span>
                <span className="font-['Share_Tech_Mono'] text-xs text-slate-400">
                  {new Date(cvMeta.uploadedAt).toLocaleString()}
                </span>
              </div>
            )}
            <div className="pt-2">
              <a
                href="/cv/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-['Share_Tech_Mono'] text-xs text-[#00c8ff] hover:text-[#00c8ff]/70 transition-colors tracking-widest"
              >
                ↓ DOWNLOAD CURRENT CV
              </a>
            </div>
          </div>
        ) : (
          <p className="font-['Share_Tech_Mono'] text-sm text-slate-500">
            No CV uploaded yet.
          </p>
        )}
      </div>

      {/* Upload form */}
      <div className="border border-[#1e2d3d] bg-[#0d1117] rounded-sm p-5">
        <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-4">
          // UPLOAD NEW CV
        </p>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block font-['Share_Tech_Mono'] text-xs text-slate-400 tracking-widest mb-1.5">
              PDF FILE
            </label>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,application/pdf"
              className="w-full bg-[#080b12] border border-[#1e2d3d] focus:border-[#00c8ff] focus:outline-none text-slate-200 px-3 py-2 rounded-sm text-sm font-['Share_Tech_Mono'] transition-colors file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-[#00c8ff]/10 file:text-[#00c8ff] file:font-['Share_Tech_Mono'] file:text-xs file:rounded-sm file:cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={uploading}
              className="px-5 py-2 bg-[#00c8ff] text-[#080b12] font-semibold font-['Share_Tech_Mono'] text-xs rounded-sm hover:bg-[#00c8ff]/90 transition-colors disabled:opacity-50 tracking-widest"
            >
              {uploading ? "UPLOADING..." : "UPLOAD CV"}
            </button>
            {uploadStatus === "ok" && (
              <span className="font-['Share_Tech_Mono'] text-xs text-emerald-400 tracking-widest">
                ✓ UPLOADED
              </span>
            )}
            {uploadStatus === "err" && (
              <span className="font-['Share_Tech_Mono'] text-xs text-[#ff2d6b] tracking-widest">
                ✕ ERROR — PDF only
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Show/hide toggle */}
      <div className="border border-[#1e2d3d] bg-[#0d1117] rounded-sm p-5">
        <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-4">
          // VISIBILITY
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-['Share_Tech_Mono'] text-sm text-slate-200 mb-1">
              Show CV download button
            </p>
            <p className="text-xs text-slate-500">
              Displays a download link in the navigation bar.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {toggleStatus === "saving" && (
              <span className="font-['Share_Tech_Mono'] text-xs text-slate-500">saving...</span>
            )}
            {toggleStatus === "ok" && (
              <span className="font-['Share_Tech_Mono'] text-xs text-emerald-400">✓</span>
            )}
            <button
              onClick={() => handleToggle(!showDownload)}
              disabled={toggleStatus === "saving"}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                showDownload ? "bg-[#00c8ff]/80" : "bg-[#1e2d3d]"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  showDownload ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
