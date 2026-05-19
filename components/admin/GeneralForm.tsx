"use client";

import { useState } from "react";
import type { Content } from "@/types/content";

const inputCls =
  "w-full bg-[#080b12] border border-[#1e2d3d] focus:border-[#00c8ff] focus:outline-none text-slate-200 px-3 py-2 rounded-sm text-sm font-['Share_Tech_Mono'] transition-colors placeholder-slate-600";
const labelCls =
  "block font-['Share_Tech_Mono'] text-xs text-slate-400 tracking-widest mb-1.5";
const sectionTitle =
  "font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-5 pt-2";

interface GeneralFormProps {
  initialContent: Content;
}

export default function GeneralForm({ initialContent }: GeneralFormProps) {
  const [nav, setNav] = useState(initialContent.nav);
  const [hero, setHero] = useState(initialContent.hero);
  const [about, setAbout] = useState(initialContent.about);
  const [footer, setFooter] = useState(initialContent.footer);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");

  async function handleSave() {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nav, hero, about, footer }),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
    setTimeout(() => setStatus("idle"), 2500);
  }

  function addBioPara() {
    setAbout((p) => ({ ...p, bio: [...p.bio, ""] }));
  }

  function updateBioPara(i: number, val: string) {
    const bio = [...about.bio];
    bio[i] = val;
    setAbout((p) => ({ ...p, bio }));
  }

  function removeBioPara(i: number) {
    setAbout((p) => ({ ...p, bio: p.bio.filter((_, idx) => idx !== i) }));
  }

  return (
    <div className="space-y-10">
      {/* NAV */}
      <div>
        <p className={sectionTitle}>// NAV</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>LOGO TEXT</label>
            <input
              className={inputCls}
              value={nav.logo}
              onChange={(e) => setNav((p) => ({ ...p, logo: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelCls}>STATUS BADGE</label>
            <input
              className={inputCls}
              value={nav.status}
              onChange={(e) => setNav((p) => ({ ...p, status: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* HERO */}
      <div>
        <p className={sectionTitle}>// HERO</p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>SECTION LABEL</label>
            <input
              className={inputCls}
              value={hero.label}
              onChange={(e) => setHero((p) => ({ ...p, label: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelCls}>TITLE</label>
            <input
              className={inputCls}
              value={hero.title}
              onChange={(e) => setHero((p) => ({ ...p, title: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelCls}>SUBTITLE</label>
            <input
              className={inputCls}
              value={hero.subtitle}
              onChange={(e) =>
                setHero((p) => ({ ...p, subtitle: e.target.value }))
              }
            />
          </div>
          <div>
            <label className={labelCls}>DESCRIPTION</label>
            <textarea
              rows={3}
              className={inputCls}
              value={hero.description}
              onChange={(e) =>
                setHero((p) => ({ ...p, description: e.target.value }))
              }
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>CTA PRIMARY</label>
              <input
                className={inputCls}
                value={hero.ctaPrimary}
                onChange={(e) =>
                  setHero((p) => ({ ...p, ctaPrimary: e.target.value }))
                }
              />
            </div>
            <div>
              <label className={labelCls}>CTA SECONDARY</label>
              <input
                className={inputCls}
                value={hero.ctaSecondary}
                onChange={(e) =>
                  setHero((p) => ({ ...p, ctaSecondary: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div>
        <p className={sectionTitle}>// ABOUT</p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>PAGE TITLE</label>
            <input
              className={inputCls}
              value={about.pageTitle}
              onChange={(e) =>
                setAbout((p) => ({ ...p, pageTitle: e.target.value }))
              }
            />
          </div>
          <div>
            <label className={labelCls}>BIO PARAGRAPHS</label>
            <div className="space-y-2">
              {about.bio.map((para, i) => (
                <div key={i} className="flex gap-2">
                  <textarea
                    rows={3}
                    className={`${inputCls} flex-1`}
                    value={para}
                    onChange={(e) => updateBioPara(i, e.target.value)}
                    placeholder={`Paragraph ${i + 1}`}
                  />
                  {about.bio.length > 1 && (
                    <button
                      onClick={() => removeBioPara(i)}
                      className="px-2 text-slate-500 hover:text-[#ff2d6b] transition-colors font-['Share_Tech_Mono'] text-xs"
                      title="Remove paragraph"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addBioPara}
                className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 hover:text-[#00c8ff] tracking-widest transition-colors"
              >
                + ADD PARAGRAPH
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div>
        <p className={sectionTitle}>// FOOTER</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>COPYRIGHT TEXT</label>
            <input
              className={inputCls}
              value={footer.copyright}
              onChange={(e) =>
                setFooter((p) => ({ ...p, copyright: e.target.value }))
              }
            />
          </div>
          <div>
            <label className={labelCls}>COORDINATES</label>
            <input
              className={inputCls}
              value={footer.coordinates}
              onChange={(e) =>
                setFooter((p) => ({ ...p, coordinates: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={handleSave}
          disabled={status === "saving"}
          className="px-6 py-2.5 bg-[#00c8ff] text-[#080b12] font-semibold text-sm rounded-sm hover:bg-[#00c8ff]/90 transition-colors disabled:opacity-50 font-['Share_Tech_Mono'] tracking-widest"
        >
          {status === "saving" ? "SAVING..." : "SAVE CHANGES"}
        </button>
        {status === "ok" && (
          <span className="font-['Share_Tech_Mono'] text-xs text-emerald-400 tracking-widest">
            ✓ SAVED
          </span>
        )}
        {status === "err" && (
          <span className="font-['Share_Tech_Mono'] text-xs text-[#ff2d6b] tracking-widest">
            ✕ ERROR
          </span>
        )}
      </div>
    </div>
  );
}
