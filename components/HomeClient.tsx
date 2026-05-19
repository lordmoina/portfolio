"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NodeDiagram from "@/components/NodeDiagram";
import TypewriterText from "@/components/TypewriterText";
import StackChip from "@/components/StackChip";
import ProjectCard from "@/components/ProjectCard";
import type { Content } from "@/types/content";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function HomeClient({ content }: { content: Content }) {
  const sorted = [...content.projects].sort((a, b) => a.order - b.order);
  const preview = sorted.slice(0, 3);

  return (
    <div className="min-h-screen grid-bg">
      <Nav nav={content.nav} cv={content.cv} />

      {/* ── Hero ── */}
      <section className="min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-6"
              >
                {content.hero.label}
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-slate-100">
                <TypewriterText
                  text={content.hero.title}
                  speed={55}
                  delay={300}
                  className="text-glow-cyan"
                />
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="font-['Share_Tech_Mono'] text-[#ff2d6b] text-sm tracking-widest mb-6"
              >
                {content.hero.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.1, duration: 0.6 }}
                className="text-slate-400 text-base leading-relaxed max-w-md mb-10"
              >
                {content.hero.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/projects"
                  className="px-6 py-3 bg-[#00c8ff] text-[#080b12] font-semibold text-sm rounded-sm hover:bg-[#00c8ff]/90 hover:shadow-[0_0_24px_rgba(0,200,255,0.4)] transition-all duration-200"
                >
                  {content.hero.ctaPrimary}
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-[#ff2d6b]/50 text-[#ff2d6b] font-semibold text-sm rounded-sm hover:bg-[#ff2d6b]/10 hover:border-[#ff2d6b] hover:shadow-[0_0_24px_rgba(255,45,107,0.2)] transition-all duration-200"
                >
                  {content.hero.ctaSecondary}
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex justify-center lg:justify-end"
            >
              <NodeDiagram />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section className="py-20 border-t border-[#1e2d3d]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-8"
          >
            // STACK
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {content.stack.map((tool, i) => (
              <StackChip
                key={tool.label}
                label={tool.label}
                icon={tool.icon}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects preview ── */}
      <section className="py-20 border-t border-[#1e2d3d]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-['Share_Tech_Mono'] text-xs text-[#ff2d6b]/60 tracking-widest mb-2"
              >
                // SELECTED WORK
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-slate-100"
              >
                Recent automations
              </motion.h2>
            </div>
            <Link
              href="/projects"
              className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff] hover:text-[#00c8ff]/70 tracking-widest transition-colors hidden sm:block"
            >
              ALL PROJECTS →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {preview.map((project, i) => (
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
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 border-t border-[#1e2d3d]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-4"
          >
            // CONNECT
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-100 mb-4"
          >
            Ready to automate?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mb-8 max-w-md mx-auto"
          >
            Let&apos;s talk about what we can build together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-4 border border-[#ff2d6b]/50 text-[#ff2d6b] font-semibold rounded-sm hover:bg-[#ff2d6b]/10 hover:shadow-[0_0_32px_rgba(255,45,107,0.3)] transition-all duration-200"
            >
              GET IN TOUCH
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer footer={content.footer} />
    </div>
  );
}
