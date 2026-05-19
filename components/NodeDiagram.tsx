"use client";

import { motion } from "framer-motion";

interface Node {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  icon: string;
  x: number;
  y: number;
}

const nodes: Node[] = [
  {
    id: "webhook",
    label: "Webhook",
    sublabel: "// TRIGGER",
    color: "#00c8ff",
    icon: "⚡",
    x: 0,
    y: 0,
  },
  {
    id: "gpt",
    label: "GPT-4o",
    sublabel: "// PROCESS",
    color: "#a855f7",
    icon: "◈",
    x: 0,
    y: 1,
  },
  {
    id: "hubspot",
    label: "HubSpot",
    sublabel: "// OUTPUT",
    color: "#ff2d6b",
    icon: "◉",
    x: 0,
    y: 2,
  },
];

export default function NodeDiagram() {
  return (
    <div className="relative w-full max-w-xs mx-auto select-none">
      {/* Ambient glow behind diagram */}
      <div className="absolute inset-0 bg-[#00c8ff]/5 rounded-2xl blur-3xl" />

      <div className="relative flex flex-col gap-4">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex flex-col items-center">
            {/* Node card */}
            <motion.div
              className="w-full border rounded-sm px-4 py-3 bg-[#0d1117] relative overflow-hidden"
              style={{ borderColor: `${node.color}40` }}
              animate={{
                boxShadow: [
                  `0 0 8px ${node.color}20`,
                  `0 0 20px ${node.color}40`,
                  `0 0 8px ${node.color}20`,
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2"
                style={{ borderColor: node.color }}
              />
              <div
                className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2"
                style={{ borderColor: node.color }}
              />

              <div className="flex items-center gap-3">
                <span className="text-xl" style={{ color: node.color }}>
                  {node.icon}
                </span>
                <div>
                  <p className="font-semibold text-slate-100 text-sm leading-none">
                    {node.label}
                  </p>
                  <p
                    className="font-['Share_Tech_Mono'] text-xs mt-0.5"
                    style={{ color: `${node.color}99` }}
                  >
                    {node.sublabel}
                  </p>
                </div>

                {/* Activity dot */}
                <motion.div
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: node.color }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              </div>
            </motion.div>

            {/* Connector between nodes */}
            {i < nodes.length - 1 && (
              <div className="relative flex flex-col items-center my-1 h-8">
                <svg width="2" height="32" className="overflow-visible">
                  {/* Static base line */}
                  <line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="32"
                    stroke={`${nodes[i + 1].color}30`}
                    strokeWidth="2"
                  />
                  {/* Animated flowing dash */}
                  <motion.line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="32"
                    stroke={nodes[i + 1].color}
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                    animate={{ strokeDashoffset: [-30, -60] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "linear" as const,
                      delay: i * 0.3,
                    }}
                  />
                </svg>

                {/* Arrow tip */}
                <div
                  className="absolute bottom-0 translate-y-1"
                  style={{ color: nodes[i + 1].color }}
                >
                  <svg width="8" height="6" viewBox="0 0 8 6">
                    <polygon
                      points="4,6 0,0 8,0"
                      fill="currentColor"
                      opacity="0.8"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Data packets floating animation */}
      <motion.div
        className="absolute left-1/2 top-8 w-2 h-2 rounded-full bg-[#00c8ff]/60"
        animate={{ y: [0, 140], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        style={{ marginLeft: "-4px" }}
      />
      <motion.div
        className="absolute left-1/2 top-8 w-1.5 h-1.5 rounded-full bg-[#a855f7]/60"
        animate={{ y: [0, 140], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 1.2 }}
        style={{ marginLeft: "-3px" }}
      />
    </div>
  );
}
