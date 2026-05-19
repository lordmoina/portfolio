"use client";

import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import type { Content } from "@/types/content";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.09 },
  }),
};

export default function ProjectsClient({ content }: { content: Content }) {
  const sorted = [...content.projects].sort((a, b) => a.order - b.order);

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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((project, i) => (
              <motion.div
                key={project.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

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
