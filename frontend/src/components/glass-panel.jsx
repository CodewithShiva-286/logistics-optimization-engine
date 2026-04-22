import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function GlassPanel({ className, children, hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mirror-panel group relative overflow-hidden rounded-[28px]", className)}
      {...props}
    >
      <motion.div
        className="mirror-highlight pointer-events-none absolute inset-0"
        initial={{ x: "-120%" }}
        whileHover={{ x: "120%" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.07),transparent_28%,transparent_72%,rgba(255,255,255,0.03))]" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
