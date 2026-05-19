"use client";

import { useState } from "react";
import type { StackItem } from "@/types/content";

const inputCls =
  "w-full bg-[#080b12] border border-[#1e2d3d] focus:border-[#00c8ff] focus:outline-none text-slate-200 px-3 py-2 rounded-sm text-sm font-['Share_Tech_Mono'] transition-colors placeholder-slate-600";
const labelCls =
  "block font-['Share_Tech_Mono'] text-xs text-slate-400 tracking-widest mb-1.5";

const colorOptions: Array<{ value: StackItem["color"]; dot: string }> = [
  { value: "cyan", dot: "#00c8ff" },
  { value: "magenta", dot: "#ff2d6b" },
  { value: "green", dot: "#00ff88" },
  { value: "purple", dot: "#a855f7" },
];

interface StackManagerProps {
  initialStack: StackItem[];
}

export default function StackManager({ initialStack }: StackManagerProps) {
  const [stack, setStack] = useState<StackItem[]>(initialStack);
  const [newItem, setNewItem] = useState<StackItem>({
    label: "",
    icon: "◈",
    color: "cyan",
  });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "ok" | "err">(
    "idle"
  );

  async function persistStack(updated: StackItem[]) {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/stack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stack: updated }),
      });
      setSaveStatus(res.ok ? "ok" : "err");
    } catch {
      setSaveStatus("err");
    }
    setTimeout(() => setSaveStatus("idle"), 2500);
  }

  async function addItem() {
    if (!newItem.label.trim()) return;
    const updated = [...stack, { ...newItem, label: newItem.label.trim() }];
    setStack(updated);
    setNewItem({ label: "", icon: "◈", color: "cyan" });
    await persistStack(updated);
  }

  async function removeItem(i: number) {
    const updated = stack.filter((_, idx) => idx !== i);
    setStack(updated);
    await persistStack(updated);
  }

  const dotColor = colorOptions.find((c) => c.value === newItem.color)?.dot ?? "#00c8ff";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest">
          // {stack.length} CHIPS
        </p>
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
      </div>

      {/* Current chips */}
      <div className="space-y-2 mb-8">
        {stack.map((item, i) => {
          const dot = colorOptions.find((c) => c.value === item.color)?.dot ?? "#00c8ff";
          return (
            <div
              key={i}
              className="flex items-center justify-between border border-[#1e2d3d] bg-[#0d1117] rounded-sm px-4 py-2.5"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dot }} />
                <span className="text-lg">{item.icon}</span>
                <span className="font-['Share_Tech_Mono'] text-sm text-slate-200">
                  {item.label}
                </span>
                <span
                  className="font-['Share_Tech_Mono'] text-xs px-1.5 py-0.5 rounded-sm border"
                  style={{ color: dot, borderColor: `${dot}40`, background: `${dot}10` }}
                >
                  {item.color}
                </span>
              </div>
              <button
                onClick={() => removeItem(i)}
                className="font-['Share_Tech_Mono'] text-xs text-slate-500 hover:text-[#ff2d6b] transition-colors px-2"
              >
                REMOVE
              </button>
            </div>
          );
        })}
      </div>

      {/* Add form */}
      <div className="border border-[#1e2d3d] bg-[#0d1117] rounded-sm p-5">
        <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-4">
          // ADD CHIP
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className={labelCls}>LABEL</label>
            <input
              className={inputCls}
              value={newItem.label}
              onChange={(e) =>
                setNewItem((p) => ({ ...p, label: e.target.value }))
              }
              placeholder="n8n"
              onKeyDown={(e) => e.key === "Enter" && addItem()}
            />
          </div>
          <div>
            <label className={labelCls}>ICON</label>
            <input
              className={inputCls}
              value={newItem.icon}
              onChange={(e) =>
                setNewItem((p) => ({ ...p, icon: e.target.value }))
              }
              placeholder="◈"
            />
          </div>
          <div>
            <label className={labelCls}>COLOR</label>
            <select
              className={inputCls}
              value={newItem.color}
              onChange={(e) =>
                setNewItem((p) => ({
                  ...p,
                  color: e.target.value as StackItem["color"],
                }))
              }
            >
              {colorOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={addItem}
          disabled={!newItem.label.trim() || saveStatus === "saving"}
          className="px-5 py-2 border font-['Share_Tech_Mono'] text-xs rounded-sm transition-colors tracking-widest disabled:opacity-40"
          style={{ borderColor: `${dotColor}60`, color: dotColor }}
        >
          {saveStatus === "saving" ? "SAVING..." : "+ ADD CHIP"}
        </button>
      </div>
    </div>
  );
}
