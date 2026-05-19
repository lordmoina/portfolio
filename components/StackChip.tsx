"use client";

import { motion } from "framer-motion";

interface StackChipProps {
  label: string;
  icon?: string;
  delay?: number;
}

export default function StackChip({ label, icon, delay = 0 }: StackChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{
        y: -3,
        boxShadow: "0 8px 24px rgba(0,200,255,0.2), 0 0 0 1px rgba(0,200,255,0.4)",
        borderColor: "rgba(0,200,255,0.5)",
      }}
      className="flex items-center gap-2 px-4 py-2 border border-[#1e2d3d] bg-[#0d1117] rounded-sm cursor-default group transition-all duration-200"
    >
      {icon && <span className="text-base">{icon}</span>}
      <span className="font-['Share_Tech_Mono'] text-sm text-slate-300 group-hover:text-[#00c8ff] transition-colors duration-200">
        {label}
      </span>
    </motion.div>
  );
}
