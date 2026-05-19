"use client";

import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Content, ContactLink } from "@/types/content";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1 },
  }),
};

function LinkCard({ link, index }: { link: ContactLink; index: number }) {
  const isEmail = link.href.startsWith("mailto:");
  const displayValue = isEmail
    ? link.href.replace("mailto:", "")
    : link.href.replace(/^https?:\/\//, "");

  return (
    <motion.a
      href={link.href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 32px rgba(0,200,255,0.15), 0 0 0 1px rgba(0,200,255,0.3)",
        borderColor: "rgba(0,200,255,0.4)",
      }}
      transition={{ duration: 0.2 }}
      className="group relative border border-[#1e2d3d] bg-[#0d1117] rounded-sm p-6 flex items-center gap-5 cursor-pointer"
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00c8ff]/30 group-hover:border-[#00c8ff]/70 transition-colors duration-200" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00c8ff]/30 group-hover:border-[#00c8ff]/70 transition-colors duration-200" />

      {/* Icon */}
      <div className="w-12 h-12 border border-[#1e2d3d] group-hover:border-[#00c8ff]/40 bg-[#080b12] rounded-sm flex items-center justify-center shrink-0 transition-colors duration-200">
        <span className="font-['Share_Tech_Mono'] text-lg text-[#00c8ff]">
          {link.icon}
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-['Share_Tech_Mono'] text-xs text-slate-500 tracking-widest mb-0.5">
          {link.label.toUpperCase()}
        </p>
        <p className="text-slate-200 text-sm group-hover:text-white transition-colors truncate">
          {displayValue}
        </p>
      </div>

      {/* Arrow */}
      <span className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/40 group-hover:text-[#00c8ff] transition-colors duration-200 shrink-0">
        →
      </span>
    </motion.a>
  );
}

export default function ContactClient({ content }: { content: Content }) {
  return (
    <div className="min-h-screen grid-bg">
      <Nav nav={content.nav} cv={content.cv} />

      <main className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-4"
          >
            // CONTACT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4"
          >
            {content.contact.heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-slate-400 leading-relaxed mb-12 max-w-md"
          >
            {content.contact.subtext}
          </motion.p>

          {/* Links */}
          {content.contact.links.length > 0 ? (
            <div className="space-y-3">
              {content.contact.links.map((link, i) => (
                <LinkCard key={i} link={link} index={i} />
              ))}
            </div>
          ) : (
            <p className="font-['Share_Tech_Mono'] text-sm text-slate-600 tracking-wider">
              // NO LINKS CONFIGURED
            </p>
          )}
        </div>
      </main>

      <Footer footer={content.footer} />
    </div>
  );
}
