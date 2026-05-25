"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import type { Content, Project } from "@/types/content";

const CATEGORIES = [
  "AI Agents & LLM Workflows",
  "Growth & CRM Automation",
  "Document & PDF Automation",
  "E-commerce & Order Operations",
  "Internal Tools & Forms",
  "Data Pipelines & Integrations",
] as const;

// Show the first 3 sections by default; the remaining 3 are behind "Show all"
const FEATURED_SECTIONS = 3;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: Math.min(i * 0.06, 0.9) },
  }),
};

function SectionHeading({
  index,
  name,
  count,
}: {
  index: number;
  name: string;
  count: number;
}) {
  return (
    <div className="col-span-full mt-14 mb-1 first:mt-0">
      <div className="flex items-center gap-3">
        <span className="font-['Share_Tech_Mono'] text-xs text-[#ff2d6b]/60 tracking-widest shrink-0">
          // {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-slate-200 font-semibold text-base tracking-wide shrink-0">
          {name}
        </h2>
        <span className="font-['Share_Tech_Mono'] text-xs text-slate-600 shrink-0">
          [{count}]
        </span>
        <div className="flex-1 border-t border-[#1e2d3d]" />
      </div>
    </div>
  );
}

export default function ProjectsClient({ content }: { content: Content }) {
  const [showAll, setShowAll] = useState(false);

  const sorted = [...content.projects].sort((a, b) => a.order - b.order);

  const grouped = CATEGORIES.map((cat) => ({
    name: cat,
    projects: sorted.filter((p) => p.category === cat),
  })).filter((g) => g.projects.length > 0);

  const visibleGroups = showAll ? grouped : grouped.slice(0, FEATURED_SECTIONS);
  const hiddenCount = sorted.length - visibleGroups.reduce((acc, g) => acc + g.projects.length, 0);

  // Build a global card index for stagger animation
  let globalIdx = 0;

  return (
    <div className="min-h-screen grid-bg">
      <Nav nav={content.nav} cv={content.cv} />
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-['Share_Tech_Mono'] text-xs text-[#ff2d6b]/60 tracking-widest mb-4"
          >
            // ALL PROJECTS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4"
          >
            Automations built
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-slate-400 mb-14 max-w-lg"
          >
            A complete archive of flows, integrations, and AI-powered pipelines.
          </motion.p>

          {/* Sections */}
          {visibleGroups.map((group) => {
            const sectionStartIdx = globalIdx;
            globalIdx += group.projects.length;

            return (
              <div key={group.name}>
                <SectionHeading
                  index={CATEGORIES.indexOf(group.name as (typeof CATEGORIES)[number])}
                  name={group.name}
                  count={group.projects.length}
                />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 mb-2">
                  {group.projects.map((project: Project, j: number) => (
                    <motion.div
                      key={project.id}
                      custom={sectionStartIdx + j}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Show all / collapse toggle */}
          {grouped.length > FEATURED_SECTIONS && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-col items-center gap-3"
            >
              <button
                onClick={() => setShowAll((v) => !v)}
                className="group relative font-['Share_Tech_Mono'] text-sm border border-[#1e2d3d] bg-[#0d1117] px-8 py-3 rounded-sm text-slate-400 hover:text-[#00c8ff] hover:border-[#00c8ff]/40 transition-all duration-200"
              >
                <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00c8ff]/0 group-hover:border-[#00c8ff]/60 transition-all duration-200" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#00c8ff]/0 group-hover:border-[#00c8ff]/60 transition-all duration-200" />
                {showAll
                  ? "// COLLAPSE"
                  : `// SHOW ALL — ${hiddenCount} MORE WORKFLOWS`}
              </button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 font-['Share_Tech_Mono'] text-xs text-slate-600 tracking-widest text-center"
          >
            // {sorted.length} CASES LOADED
          </motion.div>
        </div>
      </main>
      <Footer footer={content.footer} />
    </div>
  );
}
