"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/general", label: "General", icon: "⬚" },
  { href: "/admin/projects", label: "Projects", icon: "◈" },
  { href: "/admin/stack", label: "Stack", icon: "▣" },
  { href: "/admin/contact", label: "Contact", icon: "✉" },
  { href: "/admin/cv", label: "CV", icon: "↑" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin/login");
  }

  return (
    <aside className="w-56 shrink-0 border-r border-[#1e2d3d] bg-[#0d1117] flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#1e2d3d]">
        <p className="font-['Share_Tech_Mono'] text-[#00c8ff] text-sm tracking-widest">
          Ricardo Mota
        </p>
        <p className="font-['Share_Tech_Mono'] text-[#00c8ff]/40 text-xs tracking-widest">
          // ADMIN
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-3 font-['Share_Tech_Mono'] text-xs tracking-wider transition-all duration-150 ${
                active
                  ? "text-[#00c8ff] bg-[#00c8ff]/5 border-r-2 border-[#00c8ff]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <span>{item.icon}</span>
              {item.label.toUpperCase()}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-5 py-4 border-t border-[#1e2d3d]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 font-['Share_Tech_Mono'] text-xs text-slate-500 hover:text-[#ff2d6b] tracking-wider transition-colors duration-150"
        >
          <span>⎋</span>
          LOGOUT
        </button>
      </div>
    </aside>
  );
}
