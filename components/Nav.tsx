"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { NavContent, CvMeta } from "@/types/content";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

interface NavProps {
  nav: NavContent;
  cv?: CvMeta;
}

export default function Nav({ nav, cv }: NavProps) {
  const pathname = usePathname();
  const showCv = nav.showCvDownload && !!cv?.filename;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2d3d] bg-[#080b12]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-['Share_Tech_Mono'] text-[#00c8ff] text-lg tracking-widest hover:text-glow-cyan transition-all duration-300"
        >
          {nav.logo}
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-['Share_Tech_Mono'] text-sm tracking-wider transition-colors duration-200 ${
                pathname === link.href
                  ? "text-[#00c8ff]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {showCv && (
            <a
              href="/api/cv"
              download="cv.pdf"
              className="font-['Share_Tech_Mono'] text-xs px-3 py-1.5 border border-[#00c8ff]/40 text-[#00c8ff] rounded-sm hover:bg-[#00c8ff]/10 hover:border-[#00c8ff]/70 transition-all duration-200 tracking-widest"
            >
              ↓ CV
            </a>
          )}
        </div>

        {/* Status badge */}
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 border border-emerald-500/30 rounded-sm bg-emerald-500/5"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-['Share_Tech_Mono'] text-xs text-emerald-400 tracking-widest">
            {nav.status}
          </span>
        </motion.div>
      </div>
    </nav>
  );
}
