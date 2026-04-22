import { Bell, CalendarDays, LogOut, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LiquidButton } from "@/components/liquid-button";

export function DashboardHeader({
  role = "user",
  title,
  subtitle,
  primaryLabel,
  secondaryLabel = "Refresh",
  onPrimaryAction,
  onSecondaryAction,
  onLogout,
  userName = "CargoFlux",
}) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mirror-panel relative rounded-[30px] px-5 py-4 md:px-6"
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/38">{subtitle}</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {title}
          </h1>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white/48">
            <Search className="h-4 w-4" />
            Search routes, requests, fleet
          </div>
          <div className="flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white/72">
            <CalendarDays className="h-4 w-4" />
            {formattedDate}
          </div>
          <div className="flex items-center gap-2">
            <LiquidButton
              variant="secondary"
              icon={Plus}
              className="h-11 px-4"
              onClick={onSecondaryAction}
            >
              {secondaryLabel}
            </LiquidButton>
            <LiquidButton icon={Plus} className="h-11 px-4" onClick={onPrimaryAction}>
              {primaryLabel || (role === "driver" ? "New Availability" : "New Shipment")}
            </LiquidButton>
          </div>
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-white/[0.04] text-white/68 transition hover:bg-white/[0.07] hover:text-white">
            <Bell className="h-4 w-4" />
          </button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-white/[0.04] text-white/68 transition hover:bg-white/[0.07] hover:text-white"
            onClick={onLogout}
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
          <Avatar>
            <AvatarFallback>{initials || "CF"}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.header>
  );
}
