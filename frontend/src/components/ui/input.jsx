import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/28 transition-all duration-300 focus:border-sky-300/40 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(83,168,255,0.08)]",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";

export { Input };
