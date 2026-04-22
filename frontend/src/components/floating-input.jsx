import { useState } from "react";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function FloatingInput({ label, value, icon: Icon, className, ...props }) {
  const [focused, setFocused] = useState(false);
  const active = Boolean(value || focused);

  return (
    <div className={cn("relative", className)}>
      {Icon ? (
        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/34">
          <Icon className="h-4 w-4" />
        </div>
      ) : null}
      <Input
        value={value}
        className={cn("peer h-14 rounded-[20px] pt-6", Icon ? "pl-11" : "pl-4")}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      <motion.label
        animate={{
          y: active ? -8 : 0,
          scale: active ? 0.84 : 1,
          color: active ? "rgba(144, 198, 255, 0.9)" : "rgba(255,255,255,0.42)",
        }}
        transition={{ duration: 0.25 }}
        className={cn(
          "pointer-events-none absolute left-4 top-4 origin-left text-sm",
          Icon ? "left-11" : "left-4",
        )}
      >
        {label}
      </motion.label>
    </div>
  );
}
