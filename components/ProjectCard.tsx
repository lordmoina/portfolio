"use client";

import { motion } from "framer-motion";
import type { Project } from "@/types/content";

export type { Project };

const tagColors = {
  cyan: "border-[#00c8ff]/40 text-[#00c8ff] bg-[#00c8ff]/5",
  magenta: "border-[#ff2d6b]/40 text-[#ff2d6b] bg-[#ff2d6b]/5",
  purple: "border-purple-500/40 text-purple-400 bg-purple-500/5",
};

const accentColors = {
  cyan: "#00c8ff",
  magenta: "#ff2d6b",
  purple: "#a855f7",
};

export default function ProjectCard({ project }: { project: Project }) {
  const accent = accentColors[project.tagColor];

  return (
    <motion.div
      className="group relative border border-[#1e2d3d] bg-[#0d1117] rounded-sm p-6 cursor-pointer h-full"
      whileHover={{
        y: -6,
        boxShadow: `0 20px 40px ${accent}20, 0 0 0 1px ${accent}40`,
        borderColor: `${accent}60`,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-all duration-300 group-hover:w-6 group-hover:h-6"
        style={{ borderColor: accent }}
      />
      <div
        className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-all duration-300 group-hover:w-6 group-hover:h-6"
        style={{ borderColor: accent }}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`font-['Share_Tech_Mono'] text-xs px-2 py-0.5 border rounded-sm ${tagColors[project.tagColor]}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-white transition-colors">
        {project.title}
      </h3>

      <p className="text-slate-400 text-sm leading-relaxed mb-5">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tool) => (
          <span
            key={tool}
            className="font-['Share_Tech_Mono'] text-xs text-slate-500 px-2 py-0.5 bg-[#161b27] border border-[#1e2d3d] rounded-sm"
          >
            {tool}
          </span>
        ))}
      </div>

      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span
          className="font-['Share_Tech_Mono'] text-xs"
          style={{ color: accent }}
        >
          VIEW →
        </span>
      </div>
    </motion.div>
  );
}
