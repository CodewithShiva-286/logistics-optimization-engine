import {
  Boxes,
  Compass,
  Gauge,
  Map,
  Settings,
  SunMoon,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const iconMap = {
  overview: Gauge,
  shipments: Boxes,
  map: Map,
  insights: Compass,
  settings: Settings,
};

export function AppSidebar({ role = "user" }) {
  return (
    <aside className="hidden w-[92px] shrink-0 lg:flex">
      <div className="mirror-panel relative flex min-h-[calc(100vh-3rem)] w-full flex-col items-center rounded-[30px] px-4 py-6">
        <div className="absolute inset-x-4 top-0 h-px bg-white/18" />
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-[0_18px_30px_rgba(255,255,255,0.12)]">
          <Truck className="h-5 w-5" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-4">
          {Object.entries(iconMap).map(([key, Icon], index) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className={cn(
                "group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/55 transition-all duration-300 hover:border-white/14 hover:bg-white/[0.07] hover:text-white",
                index === 0 &&
                  "border-white/16 bg-[linear-gradient(135deg,rgba(83,168,255,0.16),rgba(123,97,255,0.16))] text-white",
              )}
              aria-label={key}
            >
              <Icon className="h-[18px] w-[18px]" />
              <span className="pointer-events-none absolute left-[calc(100%+12px)] rounded-full border border-white/10 bg-[#0e1527]/90 px-2 py-1 text-[11px] text-white/72 opacity-0 transition duration-300 group-hover:opacity-100">
                {key}
              </span>
            </motion.button>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-center gap-3">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-white/[0.04] text-white/60 transition hover:text-white">
            <SunMoon className="h-4 w-4" />
          </button>
          <div className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/40">
            {role}
          </div>
        </div>
      </div>
    </aside>
  );
}
