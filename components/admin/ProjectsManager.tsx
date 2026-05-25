"use client";

import { useState } from "react";
import type { Project } from "@/types/content";

const inputCls =
  "w-full bg-[#080b12] border border-[#1e2d3d] focus:border-[#00c8ff] focus:outline-none text-slate-200 px-3 py-2 rounded-sm text-sm font-['Share_Tech_Mono'] transition-colors placeholder-slate-600";
const labelCls =
  "block font-['Share_Tech_Mono'] text-xs text-slate-400 tracking-widest mb-1.5";

const tagColorOpts = [
  { value: "cyan", label: "Cyan" },
  { value: "magenta", label: "Magenta" },
  { value: "purple", label: "Purple" },
] as const;

const accentMap: Record<string, string> = {
  cyan: "#00c8ff",
  magenta: "#ff2d6b",
  purple: "#a855f7",
};

const blankProject = (): Omit<Project, "id"> => ({
  title: "",
  description: "",
  tags: [],
  tagColor: "cyan",
  stack: [],
  category: "",
  order: 0,
});

interface EditState {
  mode: "add" | "edit";
  id?: string;
  data: Omit<Project, "id">;
}

interface ProjectsManagerProps {
  initialProjects: Project[];
}

export default function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>(
    [...initialProjects].sort((a, b) => a.order - b.order)
  );
  const [editing, setEditing] = useState<EditState | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");

  async function persistProjects(updated: Project[]) {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects: updated }),
      });
      setSaveStatus(res.ok ? "ok" : "err");
    } catch {
      setSaveStatus("err");
    }
    setTimeout(() => setSaveStatus("idle"), 2500);
  }

  function startAdd() {
    setEditing({
      mode: "add",
      data: { ...blankProject(), order: projects.length },
    });
  }

  function startEdit(p: Project) {
    setEditing({ mode: "edit", id: p.id, data: { ...p } });
  }

  function cancelEdit() {
    setEditing(null);
  }

  async function commitEdit() {
    if (!editing) return;
    let updated: Project[];
    if (editing.mode === "add") {
      const newProject: Project = {
        ...editing.data,
        id: Date.now().toString(),
      };
      updated = [...projects, newProject];
    } else {
      updated = projects.map((p) =>
        p.id === editing.id ? { ...editing.data, id: p.id } : p
      );
    }
    setProjects(updated);
    setEditing(null);
    await persistProjects(updated);
  }

  async function deleteProject(id: string) {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    await persistProjects(updated);
  }

  function updateField<K extends keyof Omit<Project, "id">>(
    key: K,
    value: Omit<Project, "id">[K]
  ) {
    setEditing((prev) =>
      prev ? { ...prev, data: { ...prev.data, [key]: value } } : prev
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest">
          // {projects.length} PROJECTS
        </p>
        <div className="flex items-center gap-4">
          {saveStatus === "ok" && (
            <span className="font-['Share_Tech_Mono'] text-xs text-emerald-400 tracking-widest">
              ✓ SAVED
            </span>
          )}
          {saveStatus === "err" && (
            <span className="font-['Share_Tech_Mono'] text-xs text-[#ff2d6b] tracking-widest">
              ✕ ERROR
            </span>
          )}
          {!editing && (
            <button
              onClick={startAdd}
              className="px-4 py-2 border border-[#00c8ff]/40 text-[#00c8ff] font-['Share_Tech_Mono'] text-xs rounded-sm hover:bg-[#00c8ff]/10 transition-colors tracking-widest"
            >
              + ADD PROJECT
            </button>
          )}
        </div>
      </div>

      {/* Add form (shown at top) */}
      {editing?.mode === "add" && (
        <ProjectForm
          data={editing.data}
          onChange={updateField}
          onSave={commitEdit}
          onCancel={cancelEdit}
          title="NEW PROJECT"
        />
      )}

      {/* Project list */}
      <div className="space-y-3">
        {projects.map((p) => {
          const accent = accentMap[p.tagColor];
          const isEditing = editing?.mode === "edit" && editing.id === p.id;

          return (
            <div key={p.id}>
              {isEditing ? (
                <ProjectForm
                  data={editing!.data}
                  onChange={updateField}
                  onSave={commitEdit}
                  onCancel={cancelEdit}
                  title="EDIT PROJECT"
                />
              ) : (
                <div
                  className="border border-[#1e2d3d] bg-[#0d1117] rounded-sm p-4 flex items-start justify-between gap-4"
                  style={{ borderLeftColor: accent, borderLeftWidth: 2 }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-['Share_Tech_Mono'] text-xs text-slate-500">
                        #{p.order}
                      </span>
                      <p className="text-sm font-semibold text-slate-100 truncate">
                        {p.title}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="font-['Share_Tech_Mono'] text-xs px-1.5 py-0.5 rounded-sm"
                          style={{
                            color: accent,
                            background: `${accent}10`,
                            border: `1px solid ${accent}30`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(p)}
                      className="font-['Share_Tech_Mono'] text-xs text-slate-400 hover:text-[#00c8ff] transition-colors px-2 py-1"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => deleteProject(p.id)}
                      className="font-['Share_Tech_Mono'] text-xs text-slate-400 hover:text-[#ff2d6b] transition-colors px-2 py-1"
                    >
                      DEL
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProjectForm({
  data,
  onChange,
  onSave,
  onCancel,
  title,
}: {
  data: Omit<Project, "id">;
  onChange: <K extends keyof Omit<Project, "id">>(
    k: K,
    v: Omit<Project, "id">[K]
  ) => void;
  onSave: () => void;
  onCancel: () => void;
  title: string;
}) {
  return (
    <div className="border border-[#00c8ff]/20 bg-[#0d1117] rounded-sm p-5 mb-4">
      <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-4">
        // {title}
      </p>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>TITLE</label>
            <input
              className={inputCls}
              value={data.title}
              onChange={(e) => onChange("title", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>ORDER</label>
            <input
              type="number"
              className={inputCls}
              value={data.order}
              onChange={(e) => onChange("order", Number(e.target.value))}
            />
          </div>
        </div>
        <div>
          <label className={labelCls}>DESCRIPTION</label>
          <textarea
            rows={3}
            className={inputCls}
            value={data.description}
            onChange={(e) => onChange("description", e.target.value)}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>TAGS (comma-separated)</label>
            <input
              className={inputCls}
              value={data.tags.join(", ")}
              onChange={(e) =>
                onChange(
                  "tags",
                  e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                )
              }
              placeholder="n8n, HubSpot, AI"
            />
          </div>
          <div>
            <label className={labelCls}>ACCENT COLOR</label>
            <select
              className={inputCls}
              value={data.tagColor}
              onChange={(e) =>
                onChange("tagColor", e.target.value as Project["tagColor"])
              }
            >
              {tagColorOpts.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={labelCls}>CATEGORY</label>
          <select
            className={inputCls}
            value={data.category}
            onChange={(e) => onChange("category", e.target.value)}
          >
            <option value="">— select section —</option>
            <option value="AI Agents & LLM Workflows">AI Agents &amp; LLM Workflows</option>
            <option value="Growth & CRM Automation">Growth &amp; CRM Automation</option>
            <option value="Document & PDF Automation">Document &amp; PDF Automation</option>
            <option value="E-commerce & Order Operations">E-commerce &amp; Order Operations</option>
            <option value="Internal Tools & Forms">Internal Tools &amp; Forms</option>
            <option value="Data Pipelines & Integrations">Data Pipelines &amp; Integrations</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>STACK (comma-separated)</label>
          <input
            className={inputCls}
            value={data.stack.join(", ")}
            onChange={(e) =>
              onChange(
                "stack",
                e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
              )
            }
            placeholder="n8n, HubSpot, Webhooks"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <button
          onClick={onSave}
          className="px-5 py-2 bg-[#00c8ff] text-[#080b12] font-semibold font-['Share_Tech_Mono'] text-xs rounded-sm hover:bg-[#00c8ff]/90 transition-colors tracking-widest"
        >
          SAVE
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2 border border-[#1e2d3d] text-slate-400 font-['Share_Tech_Mono'] text-xs rounded-sm hover:text-slate-200 hover:border-slate-500 transition-colors tracking-widest"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}

