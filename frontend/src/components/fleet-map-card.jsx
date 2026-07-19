import { motion } from "framer-motion";
import { Plane, ShipWheel, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/glass-panel";

const nodes = [
  { top: "18%", left: "23%", icon: Plane, color: "text-sky-300 bg-sky-500/12" },
  { top: "26%", left: "57%", icon: Truck, color: "text-orange-300 bg-orange-500/12" },
  { top: "12%", left: "73%", icon: ShipWheel, color: "text-cyan-300 bg-cyan-500/12" },
  { top: "62%", left: "14%", icon: ShipWheel, color: "text-cyan-300 bg-cyan-500/12" },
  { top: "68%", left: "46%", icon: Plane, color: "text-sky-300 bg-sky-500/12" },
];

export function FleetMapCard({ title, caption, role = "user" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassPanel className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="section-title">{title}</h2>
            <p className="section-copy mt-1">{caption}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">Air</Badge>
            <Badge variant="warning">Road</Badge>
            <Badge variant="success">Sea</Badge>
          </div>
        </div>
        <div className="relative mt-5 overflow-hidden rounded-[26px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,138,61,0.10),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(83,168,255,0.12),transparent_24%)]" />
          <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_80%)]">
            <svg viewBox="0 0 900 460" className="h-full w-full text-white/7">
              <path fill="currentColor" d="M206 91h150l64 64h118l58-48h116l54 50v161l-50 43H557l-78 51H301l-37-34H167l-57-44V157z" />
            </svg>
          </div>
          <svg viewBox="0 0 900 460" className="relative z-10 h-[320px] w-full">
            <path
              d="M40 310 C180 160, 320 170, 445 240 S690 360, 860 125"
              fill="none"
              stroke="rgba(255,255,255,0.26)"
              strokeDasharray="7 10"
              strokeWidth="2.5"
            />
            <path
              d="M140 100 C280 210, 380 320, 540 255 S745 100, 860 205"
              fill="none"
              stroke="rgba(83,168,255,0.18)"
              strokeDasharray="6 11"
              strokeWidth="2.5"
            />
            <motion.circle
              cx="438"
              cy="244"
              r="10"
              fill="#7b61ff"
              initial={{ opacity: 0.4, scale: 0.8 }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.5, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.circle
              cx="84"
              cy="313"
              r="4"
              fill="white"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={`${node.left}-${node.top}`}
                className={`absolute flex h-11 w-11 items-center justify-center rounded-full border border-white/8 ${node.color}`}
                style={{ top: node.top, left: node.left }}
                animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }}
                transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon className="h-4 w-4" />
              </motion.div>
            );
          })}
          <motion.div
            className="absolute bottom-[22%] left-[40%] rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-950"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          >
            {role === "driver" ? "Dock ETA 55m" : "In Transit 5h"}
          </motion.div>
          <div className="absolute right-4 top-5 w-full max-w-[220px] rounded-[24px] border border-white/10 bg-[#0a1020]/82 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[linear-gradient(135deg,#5ed5ff,#99e5ff)]">
              <div className="aspect-[4/3] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_30%),linear-gradient(145deg,#85eaff,#4bbbe0)]" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-white">{role === "driver" ? "#RT-914" : "#SH-2026-014"}</p>
              <ul className="mt-3 space-y-2 text-xs text-white/58">
                <li className="flex items-center justify-between"><span>Packaging</span><span>08:15</span></li>
                <li className="flex items-center justify-between text-white/85"><span>In Transit</span><span>12:00</span></li>
                <li className="flex items-center justify-between"><span>Dock Assigned</span><span>15:20</span></li>
                <li className="flex items-center justify-between"><span>Delivered</span><span>18:40</span></li>
              </ul>
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
