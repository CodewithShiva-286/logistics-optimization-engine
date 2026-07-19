import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function Progress({ value, className, indicatorClassName }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-white/8", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "h-full rounded-full bg-[linear-gradient(90deg,#53a8ff,#7b61ff)]",
          indicatorClassName,
        )}
      />
    </div>
  );
}
