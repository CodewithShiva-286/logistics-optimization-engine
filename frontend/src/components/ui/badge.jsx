import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[0.02em]",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/8 text-white/80",
        success: "border-emerald-400/20 bg-emerald-400/12 text-emerald-300",
        warning: "border-orange-400/20 bg-orange-400/12 text-orange-200",
        accent: "border-sky-400/20 bg-sky-400/12 text-sky-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
