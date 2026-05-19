"use client";

import { useState } from "react";
import type { ContactContent, ContactLink } from "@/types/content";

const inputCls =
  "w-full bg-[#080b12] border border-[#1e2d3d] focus:border-[#00c8ff] focus:outline-none text-slate-200 px-3 py-2 rounded-sm text-sm font-['Share_Tech_Mono'] transition-colors placeholder-slate-600";
const labelCls =
  "block font-['Share_Tech_Mono'] text-xs text-slate-400 tracking-widest mb-1.5";

const blankLink = (): ContactLink => ({ label: "", href: "", icon: "✉" });

interface ContactFormProps {
  initialContact: ContactContent;
}

export default function ContactForm({ initialContact }: ContactFormProps) {
  const [contact, setContact] = useState<ContactContent>(initialContact);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [newLink, setNewLink] = useState<ContactLink>(blankLink());
  const [showAdd, setShowAdd] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");

  async function handleSave() {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact }),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
    setTimeout(() => setStatus("idle"), 2500);
  }

  function updateLink(i: number, field: keyof ContactLink, val: string) {
    const links = [...contact.links];
    links[i] = { ...links[i], [field]: val };
    setContact((p) => ({ ...p, links }));
  }

  function removeLink(i: number) {
    setContact((p) => ({ ...p, links: p.links.filter((_, idx) => idx !== i) }));
    if (editIdx === i) setEditIdx(null);
  }

  function addLink() {
    if (!newLink.label.trim() || !newLink.href.trim()) return;
    setContact((p) => ({ ...p, links: [...p.links, { ...newLink }] }));
    setNewLink(blankLink());
    setShowAdd(false);
  }

  return (
    <div className="space-y-8">
      {/* Header fields */}
      <div>
        <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-5">
          // PAGE TEXT
        </p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>HEADING</label>
            <input
              className={inputCls}
              value={contact.heading}
              onChange={(e) =>
                setContact((p) => ({ ...p, heading: e.target.value }))
              }
            />
          </div>
          <div>
            <label className={labelCls}>SUBTEXT</label>
            <textarea
              rows={2}
              className={inputCls}
              value={contact.subtext}
              onChange={(e) =>
                setContact((p) => ({ ...p, subtext: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      {/* Links */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest">
            // LINKS — {contact.links.length}
          </p>
          {!showAdd && (
            <button
              onClick={() => setShowAdd(true)}
              className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 hover:text-[#00c8ff] tracking-widest transition-colors"
            >
              + ADD LINK
            </button>
          )}
        </div>

        {/* Add form */}
        {showAdd && (
          <div className="border border-[#00c8ff]/20 bg-[#0d1117] rounded-sm p-4 mb-4">
            <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-3">
              // NEW LINK
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              <div>
                <label className={labelCls}>LABEL</label>
                <input
                  className={inputCls}
                  value={newLink.label}
                  onChange={(e) =>
                    setNewLink((p) => ({ ...p, label: e.target.value }))
                  }
                  placeholder="LinkedIn"
                />
              </div>
              <div>
                <label className={labelCls}>ICON</label>
                <input
                  className={inputCls}
                  value={newLink.icon}
                  onChange={(e) =>
                    setNewLink((p) => ({ ...p, icon: e.target.value }))
                  }
                  placeholder="in"
                />
              </div>
              <div>
                <label className={labelCls}>URL / HREF</label>
                <input
                  className={inputCls}
                  value={newLink.href}
                  onChange={(e) =>
                    setNewLink((p) => ({ ...p, href: e.target.value }))
                  }
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={addLink}
                disabled={!newLink.label.trim() || !newLink.href.trim()}
                className="px-4 py-1.5 bg-[#00c8ff] text-[#080b12] font-['Share_Tech_Mono'] text-xs rounded-sm hover:bg-[#00c8ff]/90 disabled:opacity-40 transition-colors tracking-widest"
              >
                ADD
              </button>
              <button
                onClick={() => { setShowAdd(false); setNewLink(blankLink()); }}
                className="px-4 py-1.5 border border-[#1e2d3d] text-slate-400 font-['Share_Tech_Mono'] text-xs rounded-sm hover:text-slate-200 transition-colors tracking-widest"
              >
                CANCEL
              </button>
            </div>
          </div>
        )}

        {/* Link list */}
        <div className="space-y-2">
          {contact.links.map((link, i) => (
            <div key={i} className="border border-[#1e2d3d] bg-[#0d1117] rounded-sm">
              {editIdx === i ? (
                <div className="p-4">
                  <div className="grid sm:grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className={labelCls}>LABEL</label>
                      <input
                        className={inputCls}
                        value={link.label}
                        onChange={(e) => updateLink(i, "label", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>ICON</label>
                      <input
                        className={inputCls}
                        value={link.icon}
                        onChange={(e) => updateLink(i, "icon", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>URL / HREF</label>
                      <input
                        className={inputCls}
                        value={link.href}
                        onChange={(e) => updateLink(i, "href", e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setEditIdx(null)}
                    className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 hover:text-[#00c8ff] tracking-widest transition-colors"
                  >
                    ✓ DONE
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4 px-4 py-3">
                  <span className="font-['Share_Tech_Mono'] text-base text-[#00c8ff] w-6 text-center shrink-0">
                    {link.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Share_Tech_Mono'] text-xs text-slate-400">
                      {link.label}
                    </p>
                    <p className="text-slate-500 text-xs truncate">{link.href}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => setEditIdx(i)}
                      className="font-['Share_Tech_Mono'] text-xs text-slate-400 hover:text-[#00c8ff] transition-colors px-2"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => removeLink(i)}
                      className="font-['Share_Tech_Mono'] text-xs text-slate-400 hover:text-[#ff2d6b] transition-colors px-2"
                    >
                      DEL
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {contact.links.length === 0 && (
            <p className="font-['Share_Tech_Mono'] text-xs text-slate-600 tracking-wider py-2">
              No links added yet.
            </p>
          )}
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
