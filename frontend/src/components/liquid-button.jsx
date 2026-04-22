import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

let rippleId = 0;

export function LiquidButton({
  className,
  children,
  variant = "primary",
  icon: Icon,
  onClick,
  ...props
}) {
  const [ripples, setRipples] = useState([]);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  const variants = useMemo(
    () => ({
      primary:
        "bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(214,228,255,0.92))] text-slate-950 shadow-[0_14px_34px_rgba(255,255,255,0.18)]",
      secondary:
        "border border-white/10 bg-white/[0.06] text-white shadow-[0_14px_34px_rgba(3,8,20,0.32)]",
    }),
    [],
  );

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const newRipple = {
      id: rippleId++,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    setRipples((current) => [...current, newRipple]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((item) => item.id !== newRipple.id));
    }, 800);
    onClick?.(event);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-sm font-medium transition-all duration-500",
        variants[variant],
        className,
      )}
      onMouseMove={handleMove}
      onClick={handleClick}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.35), transparent 42%)`,
        }}
      />
      <motion.span
        className="pointer-events-none absolute inset-x-0 bottom-[-140%] h-[220%] rounded-[50%] bg-[radial-gradient(circle,rgba(83,168,255,0.34),transparent_58%)]"
        animate={{ y: [0, -22, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="pointer-events-none absolute inset-x-[10%] top-[-120%] h-[200%] rounded-[50%] bg-[radial-gradient(circle,rgba(255,138,61,0.18),transparent_55%)]"
        animate={{ y: [0, 18, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/35"
          initial={{ width: 0, height: 0, opacity: 0.55, x: ripple.x, y: ripple.y }}
          animate={{ width: 240, height: 240, opacity: 0, x: ripple.x - 120, y: ripple.y - 120 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
      <span className="relative z-10 flex items-center gap-2">
        {Icon ? <Icon className="h-4 w-4" /> : null}
        {children}
      </span>
    </motion.button>
  );
}
