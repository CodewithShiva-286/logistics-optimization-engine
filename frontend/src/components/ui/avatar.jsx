import * as React from "react";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/10",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, alt, ...props }) {
  return <img alt={alt} className={cn("h-full w-full object-cover", className)} {...props} />;
}

function AvatarFallback({ className, ...props }) {
  return (
    <span
      className={cn("text-sm font-semibold uppercase text-white/80", className)}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
