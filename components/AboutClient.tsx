"use client";

import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Content } from "@/types/content";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.12 },
  }),
};

export default function AboutClient({ content }: { content: Content }) {
  return (
    <div className="min-h-screen grid-bg">
      <Nav nav={content.nav} cv={content.cv} />
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-4"
          >
            // ABOUT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-slate-100 mb-8"
          >
            {content.about.pageTitle}
          </motion.h1>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="border-l-2 border-[#00c8ff]/30 pl-6 mb-16"
          >
            {content.about.bio.map((para, i) => (
              <p
                key={i}
                className={`${i === 0 ? "text-slate-300 text-lg" : "text-slate-400"} leading-relaxed ${i < content.about.bio.length - 1 ? "mb-4" : ""}`}
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-['Share_Tech_Mono'] text-xs text-[#ff2d6b]/60 tracking-widest mb-8"
          >
            // WORK PHILOSOPHY
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {content.about.philosophy.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border border-[#1e2d3d] bg-[#0d1117] rounded-sm p-6 hover:border-[#00c8ff]/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl text-[#00c8ff]">{item.icon}</span>
                  <h3 className="font-semibold text-slate-100">{item.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 flex items-center gap-3"
          >
            <span className="font-['Share_Tech_Mono'] text-xs text-slate-600 tracking-wider">
              {content.footer.coordinates}
            </span>
            <div className="flex-1 h-px bg-[#1e2d3d]" />
          </motion.div>
        </div>
      </main>
      <Footer footer={content.footer} />
    </div>
  );
}
