import { motion } from "framer-motion";

import { GlassPanel } from "@/components/glass-panel";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export function PerformanceCard({ title = "Fleet Status", items }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.58, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassPanel className="h-full bg-[radial-gradient(circle_at_top_right,rgba(60,229,211,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0))] p-5">
        <h2 className="section-title">{title}</h2>
        <p className="section-copy mt-1">Performance signals with soft glow feedback.</p>
        <div className="mt-7 space-y-6">
          {items.map((item, index) => (
            <div key={item.name}>
              <div className="flex items-end justify-between gap-4">
                <span className="text-4xl font-semibold tracking-tight text-white">{item.value}%</span>
                <span className="text-sm text-white/56">{item.name}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/46">{item.copy}</p>
              <Progress
                value={item.value}
                className="mt-4"
                indicatorClassName={
                  index === 0
                    ? "bg-[linear-gradient(90deg,#53a8ff,#7b61ff)]"
                    : index === 1
                      ? "bg-[linear-gradient(90deg,#ff8a3d,#ff4d5f)]"
                      : "bg-[linear-gradient(90deg,#3ce5d3,#53a8ff)]"
                }
              />
              {index < items.length - 1 ? <Separator className="mt-6" /> : null}
            </div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
}
